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
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  useEffect(() => {
    (async () => {
      const res = await getWebsiteValues(
        "logo,company_name,company_email,company_contact,ibo_commision,landlord_commision,referral_bonus_sender_point,referral_bonus_receiver_point"
      );
      if (res?.status) {
        dispatch({ type: "SET_WEBSITE", values: res.data });
      }
    })();

    if (typeof Echo !== "undefined") {
      Echo.connector.options.auth.headers["Authorization"] =
        "Bearer " + __d(cookies.get("_SYNC_"));
    }
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
              <div
                className="rounded-full overflow-hidden"
                style={{ width: "24px", height: "24px" }}
              >
                <img
                  src={user?.profile_pic || "/images/website/no_photo.png"}
                  className="object-cover cursor-pointer"
                  style={{ maxWidth: "24px", width: "24px", height: "24px" }}
                  alt="user"
                  onClick={handleLogout}
                  data-tip="Logout"
                />
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
