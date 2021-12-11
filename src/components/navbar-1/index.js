import { useSelector, useDispatch, shallowEqual } from "react-redux";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiSettings, FiMenu, FiBell } from "react-icons/fi";
import Dropdown1 from "./dropdown-1";
import Dropdown4 from "./dropdown-4";
import Dropdown5 from "./dropdown-5";
import ReactTooltip from "react-tooltip";
import { useEffect, useState } from "react";
import getUser, { getAdminNotification } from "../../lib/authentication";
import { __d } from "../../server";
import Cookies from "universal-cookie";
import { Router } from "next/router";

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
                console.log(e);
                setNotification((prev) => prev - 1);
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
    <div className="navbar navbar-1 border-b">
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

        <Dropdown4 />
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
        <button
          className="btn-transparent flex items-center justify-center h-16 w-8 mx-4"
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
    </div>
  );
};

export default dynamic(() => Promise.resolve(Navbar), { ssr: false });
