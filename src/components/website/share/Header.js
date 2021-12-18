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

function Header({
  page,
  sideBarToggled,
  setSideBarToggled,
  user,
  setUser,
  setIsHide,
  notifications,
  setNotifications,
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
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
              playBell();
            }
            if (
              user?.role === "tenant" &&
              e?.notification?.tenant_id === user?.id
            ) {
              setNotifications((prev) => prev + 1);
              playBell();
            }
            if (
              user?.role === "landlord" &&
              e?.notification?.landlord_id === user?.id
            ) {
              setNotifications((prev) => prev + 1);
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
      <div className="flex flex-col w-full z-30">
        {/**header top */}
        <div
          className="flex items-center justify-between py-2 px-4 w-full"
          style={{ backgroundColor: "var(--blue)" }}
        >
          {/**toggler */}
          <div
            className="mr-10 cursor-pointer"
            onClick={() => {
              setSideBarToggled(!sideBarToggled);
              setIsHide(false);
            }}
          >
            <img
              src="/icons/user-dashboard/arrow-slider-icon.png"
              alt="toggler"
              className="object-contain"
              style={{ maxWidth: "20px", width: "20px", height: "20px" }}
              data-tip="Toggle Sidebar"
            />
          </div>
          {/**search bar */}
          <div className="flex flex-grow">
            <div className="flex items-center max-w-sm w-full">
              <input
                type="text"
                className="h-7 text-xs focus:ring-0 rounded-lg border-none pl-3 pr-6 my-1 w-full"
              />
              <img
                src="/icons/user-dashboard/search-icon.png"
                alt="search"
                className="filter brightness-0 object-contain -ml-5 cursor-pointer"
                style={{ maxWidth: "12px", width: "12px", height: "12px" }}
                data-tip="Search"
              />
            </div>
          </div>
          {/**user actions */}
          <div className="flex items-center">
            {/**notification */}
            <div className="relative mx-3">
              <Link href={`/${user?.role}/notification`}>
                <a data-tip="Notifications">
                  <img
                    src="/icons/user-dashboard/bell_icon.png"
                    alt="notification"
                    className="object-contain cursor-pointer"
                    style={{ maxWidth: "16px", width: "16px", height: "16px" }}
                  />
                  <span
                    className="absolute -top-1 -right-2 text-3xs text-white rounded-full"
                    style={{ backgroundColor: "var(--orange)" }}
                  >
                    {notifications}
                  </span>
                </a>
              </Link>
            </div>
            {/**chat */}
            <div className="relative mx-3">
              <Link href={`/${user?.role}/chat`}>
                <a data-tip="Messages">
                  <img
                    src="/icons/user-dashboard/chat_icon.png"
                    alt="chat"
                    className="object-contain cursor-pointer"
                    style={{
                      maxWidth: "16px",
                      width: "16px",
                      height: "16px",
                    }}
                  />
                  <span
                    className="absolute -top-1 -right-2 text-3xs text-white rounded-full"
                    style={{ backgroundColor: "var(--orange)" }}
                  >
                    18
                  </span>
                </a>
              </Link>
            </div>
            {/**user profile */}
            <div className="flex" style={{ fontFamily: "Opensans-semi-bold" }}>
              <div className="flex flex-col items-end justify-center text-white leading-2 px-2 text-3xs">
                <p style={{ fontFamily: "Opensans-bold" }}>{`Hi ${
                  user?.first || "-"
                }`}</p>
                <p>{user?.email || "-"}</p>
              </div>
              <div className="relative">
                <img
                  src={user?.profile_pic || "/images/website/no_photo.png"}
                  className="object-cover cursor-pointer rounded-full"
                  style={{ maxWidth: "24px", width: "24px", height: "24px" }}
                  alt="user"
                  onClick={() => setActiveMenu(!activeMenu)}
                  data-tip="Profile"
                />
                <div
                  style={{ fontFamily: "Opensans-regular" }}
                  className={`bg-white flex flex-col py-3 items-center transform duration-300 justify-center sm:absolute ${
                    activeMenu ? "sm:-right-5" : "sm:-right-96"
                  } ${
                    activeMenu ? "right-0" : " -right-full"
                  } top-14 sm:top-11 sm:w-60 h-auto fixed w-screen z-40`}
                >
                  <img
                    src={user?.profile_pic || "/images/website/no_photo.png"}
                    className="w-12 h-12 object-cover rounded-full cursor-pointer"
                    alt="user"
                  />
                  <h6 className="mt-1" style={{ fontFamily: "Opensans-bold" }}>
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
        {/**breadcrumb */}
        <div
          className="flex bg-white shadow-sm items-center justify-between"
          style={{
            color: "var(--blue)",
            fontFamily: "Opensans-semi-bold",
            padding: "6px 15px",
          }}
        >
          <div className="flex items-center">
            <p>Welcome to</p>
            <b style={{ fontFamily: "Opensans-bold" }} className="ml-1">
              {page}
            </b>
          </div>
          <div className="flex items-center">
            <span className="text-gray-400">Dashboard/</span>
            <b className="text-gray-600 ml-1">{page}</b>
          </div>
        </div>
      </div>
    </>
  );
}

export default dynamic(() => Promise.resolve(Header), { ssr: false });
