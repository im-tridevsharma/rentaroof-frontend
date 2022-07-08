import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiSettings, FiMenu, FiBell, FiMessageSquare } from "react-icons/fi";
import Dropdown1 from "./dropdown-1";
import Dropdown5 from "./dropdown-5";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import getUser, {
  getAdminNotification,
  removeAuthToken,
} from "../../lib/authentication";
import { __d } from "../../server";
import Cookies from "universal-cookie";
import { Router } from "next/router";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  let { rightSidebar, collapsed } = { ...config };
  const { user } = { ...config };

  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [notification, setNotification] = useState(0);
  const [chat, setChat] = useState(0);
  const [sos, setSOS] = useState(null);

  const playBell = () => {
    const bell = new Audio("/music/notification.wav");
    bell.play();
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getAdminNotification(true);
      if (res?.status) {
        setNotification(res?.data);
      } else {
        console.log(res?.message);
      }
    };

    fetchNotifications();

    if (typeof Echo !== "undefined") {
      Echo.connector.options.auth.headers["Authorization"] =
        "Bearer " + __d(cookies.get("__NEXT"));
      if (Echo.connector.options.auth.headers["Authorization"]) {
        Echo.private("admin")
          .listen("AdminNotificationSent", (e) => {
            if (user?.role === "admin") {
              if (e?.notification?.id) {
                setNotification((prev) => prev + 1);
              }
              playBell();
            }
          })
          .listen("AdminNotificationSeen", (e) => {
            if (user?.role === "admin") {
              if (e?.notification?.id) {
                setNotification((prev) => prev - 1);
              }
            }
          })
          .listen("SOSFired", (e) => {
            if (user?.role === "admin") {
              if (e) {
                playBell();
                setSOS(e.sos);
              }
            }
          });
      }
    }

    return () => {
      Echo.private("admin")
        .stopListening("AdminNotificationSent")
        .stopListening("AdminNotificationSeen");
    };
  }, [Router?.asPath]);

  useEffect(() => {
    if (!user?.user_id) {
      (async () => {
        const response = await getUser(true);
        if (response?.user) {
          dispatch({
            type: "SET_CONFIG_KEY",
            key: "user",
            value: {
              user_id: response?.user?.id,
              name: response.user?.fullname,
              email: response.user?.email,
              role: response.user?.role,
              permissions: response.user?.permissions || [],
              profile_pic: response.user?.profile_pic,
            },
          });
        } else {
          removeAuthToken();
        }
      })();
    }
  }, []);

  return (
    <div className="navbar navbar-1 border-b z-40">
      <div className="navbar-inner w-full flex items-center justify-start">
        <button
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "collapsed",
              value: !collapsed,
            })
          }
          className="mx-4"
        >
          <FiMenu size={20} data-tip="Toggle Sidebar" />
        </button>
        <span className="ml-auto"></span>
        {false && <Dropdown1 />}

        <div className="hidden lg:flex relative">
          <Link href="/admin/chat">
            <a className="flex items-center justify-center h-16 w-12">
              <FiMessageSquare size={18} data-tip="Chat" />
              <span
                className="absolute uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full bg-blue-500 text-white"
                style={{ top: 14, right: 8 }}
              >
                {chat}
              </span>
            </a>
          </Link>
        </div>
        <div className="hidden lg:flex relative">
          <Link href="/admin/notifications">
            <a className="flex items-center justify-center h-16 w-12">
              <FiBell size={18} data-tip="Notifications" />
              <span
                className="absolute uppercase font-bold inline-flex text-center p-0 leading-none text-2xs h-4 w-4 inline-flex items-center justify-center rounded-full bg-yellow-500 text-white"
                style={{ top: 14, right: 8 }}
              >
                {notification}
              </span>
            </a>
          </Link>
        </div>
        <Dropdown5 />
        <div className="mx-4"></div>
        <button
          className="btn-transparent hidden items-center justify-center h-16 w-8 mx-4"
          onClick={() =>
            dispatch({
              type: "SET_CONFIG_KEY",
              key: "rightSidebar",
              value: !rightSidebar,
            })
          }
        >
          <FiSettings size={18} data-tip="UI Customization" />
          <ReactTooltip />
        </button>
      </div>

      {/**sos popup */}
      {sos && (
        <div
          className="fixed top-0 right-0 bg-white p-5 max-w-sm w-full z-40 shadow-md border"
          style={{ fontFamily: "Opensans-regular" }}
        >
          <FaTimes
            className="text-red-400 text-xl cursor-pointer absolute right-1 top-1"
            onClick={() => setSOS(null)}
          />
          <div className="flex flex-col items-start">
            <h5
              className="text-red-500"
              style={{ fontFamily: "Opensans-bold" }}
            >
              SOS Alert
            </h5>
            <h6 className="mt-3">By: {sos?.name}</h6>
            <p>Email: {sos?.email}</p>
            <p>Content: {sos?.sos_content}</p>
            <Link href={`/admin/sos/${sos?.id}`}>
              <a className="p-2 rounded-md bg-blue-500 mt-3 text-white">View</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
