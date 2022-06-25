import React, { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { logoutUser, removeAuthToken } from "../../../lib/frontend/auth";
import Loader from "../../loader";
import server, { __d } from "../../../server";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import Cookies from "universal-cookie";
import { FaTimes } from "react-icons/fa";

const getWebsiteValues = async (key) => {
  let setting = "";
  await server
    .get("/website/initials/" + key)
    .then((response) => {
      setting = response?.data;
    })
    .catch((error) => {
      setting = error?.response?.data;
    });
  return setting;
};

function Header({ page, user, setUser, notifications, setNotifications }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [notificationPopup, setNotificationPopup] = useState(false);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const playBell = () => {
    const bell = new Audio("/music/notification.wav");
    bell.play();
  };

  useEffect(() => {
    (async () => {
      const res = await getWebsiteValues(
        "logo,company_name,company_email,company_contact,ibo_commision,documentation_cost,landlord_commision,referral_bonus_sender_point,referral_bonus_receiver_point"
      );
      if (res?.status) {
        dispatch({ type: "SET_WEBSITE", values: res.data });
      }
    })();

    if (typeof Echo !== "undefined") {
      Echo.connector.options.auth.headers["Authorization"] =
        "Bearer " + __d(cookies.get("_SYNC_"));
      if (Echo.connector.options.auth.headers["Authorization"]) {
        Echo.channel("notification")
          .listen("NotificationSent", (e) => {
            if (user?.role === "ibo" && e?.notification?.ibo_id === user?.id) {
              setNotifications((prev) => prev + 1);
              setNotificationPopup(e.notification);
              playBell();
            }
            if (
              user?.role === "tenant" &&
              e?.notification?.tenant_id === user?.id
            ) {
              setNotifications((prev) => prev + 1);
              setNotificationPopup(e.notification);
              playBell();
            }
            if (
              user?.role === "landlord" &&
              e?.notification?.landlord_id === user?.id
            ) {
              setNotifications((prev) => prev + 1);
              setNotificationPopup(e.notification);
              playBell();
            }
          })
          .listen("NotificationSeen", (e) => {
            if (user?.role === "ibo" && e?.notification?.ibo_id === user?.id) {
              setNotifications((prev) => (prev > 0 ? prev - 1 : 0));
            }
            if (
              user?.role === "tenant" &&
              e?.notification?.tenant_id === user?.id
            ) {
              setNotifications((prev) => (prev > 0 ? prev - 1 : 0));
            }
            if (
              user?.role === "landlord" &&
              e?.notification?.landlord_id === user?.id
            ) {
              setNotifications((prev) => (prev > 0 ? prev - 1 : 0));
            }
          });
      }
    }

    return () => {
      Echo.channel("notification")
        .stopListening("NotificationSent")
        .stopListening("NotificationSeen");
    };
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await logoutUser();
    if (response?.success) {
      setUser({});
      localStorage.removeItem("LU");
      removeAuthToken();
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      console.error(response?.message);
      setIsLoading(false);
      removeAuthToken();
    }
  };
  return (
    <>
      <ReactTooltip />
      {isLoading && <Loader />}
      {true && (
        <div className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
          {/**header top */}
          <div className="flex items-center justify-between py-2 px-4 w-full">
            <div>
              <p className="text-white text-sm uppercase hidden lg:inline-block font-semibold">
                {page}
              </p>
            </div>
            {/**user actions */}
            <div className="flex items-center">
              {/**notification */}
              <div className="relative">
                <Link href={`/${user?.role}/notification`}>
                  <a data-tip="Notifications">
                    <img
                      src="/icons/user-dashboard/bell_icon.png"
                      alt="notification"
                      className="object-contain cursor-pointer"
                      style={{
                        maxWidth: "22px",
                        width: "22px",
                        height: "22px",
                      }}
                    />
                    <span
                      className="absolute -top-1 -right-2 text-3xs text-white rounded-full"
                      style={{ backgroundColor: "var(--orange)" }}
                    >
                      {notifications || 0}
                    </span>
                  </a>
                </Link>
              </div>
              {/**chat */}
              <div className="relative mx-8">
                <Link href={`/${user?.role}/chat`}>
                  <a data-tip="Messages">
                    <img
                      src="/icons/user-dashboard/chat_icon.png"
                      alt="chat"
                      className="object-contain cursor-pointer"
                      style={{
                        maxWidth: "22px",
                        width: "22px",
                        height: "22px",
                      }}
                    />
                    <span
                      className="absolute -top-1 -right-2 text-3xs text-white rounded-full"
                      style={{ backgroundColor: "var(--orange)" }}
                    >
                      0
                    </span>
                  </a>
                </Link>
              </div>
              {/**user profile */}

              <div
                className="flex"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="relative">
                  <img
                    src={user?.profile_pic || "/images/faces/icon-user.png"}
                    className="object-cover cursor-pointer rounded-full"
                    style={{
                      maxWidth: "30px",
                      width: "30px",
                      height: "30px",
                    }}
                    alt="user"
                    onClick={() => setActiveMenu(!activeMenu)}
                    data-tip="Profile"
                  />
                  <div
                    style={{ fontFamily: "Opensans-regular" }}
                    className={`bg-white rounded-md flex flex-col py-3 items-center transform duration-300 justify-center sm:absolute ${
                      activeMenu ? "sm:-right-5" : "sm:-right-96"
                    } ${
                      activeMenu ? "right-0" : " -right-full"
                    } top-14 sm:top-11 sm:w-60 h-auto fixed w-screen z-40`}
                  >
                    <img
                      src={user?.profile_pic || "/images/faces/icon-user.png"}
                      className="w-12 h-12 object-cover rounded-full cursor-pointer"
                      alt="user"
                    />
                    <h6
                      className="mt-1"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      {user?.first} {user?.last}
                    </h6>
                    <p>{user?.email}</p>
                    <ul className="w-full text-center mt-3">
                      <li>
                        <Link href={`/${user?.role}/dashboard`}>
                          <a className="py-3 bg-gray-50 border-b block hover:bg-gray-200">
                            Dashboard
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={`/${user?.role}/profile`}>
                          <a className="py-3 bg-gray-50 border-b block hover:bg-gray-200">
                            Profile
                          </a>
                        </Link>
                      </li>
                      {user?.role !== "tenant" && (
                        <li>
                          <Link href={`/${user?.role}/settings`}>
                            <a className="py-3 bg-gray-50 border-b block hover:bg-gray-200">
                              Settings
                            </a>
                          </Link>
                        </li>
                      )}
                      <li>
                        <a
                          onClick={handleLogout}
                          className="py-3 bg-gray-50 block hover:bg-gray-200"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {notificationPopup && (
        <div
          className="fixed top-0 right-0 bg-white p-5 max-w-sm w-full z-40 shadow-md border"
          style={{ fontFamily: "Opensans-regular" }}
        >
          <FaTimes
            className="text-red-400 text-xl cursor-pointer absolute right-1 top-1"
            onClick={() => setNotificationPopup(false)}
          />
          <div className="flex flex-col items-start">
            <h5
              className="text-red-500"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Notification
            </h5>
            <h6 className="mt-3">{notificationPopup?.title}</h6>
            <p>{notificationPopup.content}</p>
            <Link href={`${notificationPopup?.redirect}`}>
              <a className="p-2 rounded-md bg-blue-500 mt-3 text-white">View</a>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default dynamic(() => Promise.resolve(Header), { ssr: false });
