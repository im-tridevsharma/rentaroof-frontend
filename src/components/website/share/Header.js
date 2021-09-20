import React from "react";
import { useRouter } from "next/router";
import { logoutUser, removeAuthToken } from "../../../lib/frontend/auth";

function Header({ page }) {
  const router = useRouter();
  const handleLogout = async (e) => {
    e.preventDefault();
    const response = await logoutUser();
    if (response?.success) {
      removeAuthToken();
      router.push("/login");
    } else {
      console.error(response?.message);
    }
  };
  return (
    <div className="flex flex-col w-full z-40">
      {/**header top */}
      <div
        className="flex items-center justify-between py-2 px-4 w-full"
        style={{ backgroundColor: "var(--blue)" }}
      >
        {/**toggler */}
        <div className="mr-10">
          <img
            src="/icons/user-dashboard/arrow-slider-icon.png"
            alt="toggler"
            className="w-5 h-5 object-contain"
          />
        </div>
        {/**search bar */}
        <div className="flex flex-grow">
          <div className="flex items-center">
            <input
              type="text"
              className="h-7 focus:ring-0 rounded-lg border-none pl-3 pr-6 my-1 max-w-xl w-full"
            />
            <img
              src="/icons/user-dashboard/search-icon.png"
              alt="search"
              className="filter brightness-0 h-3 w-3 object-contain -ml-5 cursor-pointer"
            />
          </div>
        </div>
        {/**user actions */}
        <div className="flex items-center">
          {/**notification */}
          <div className="relative mx-3">
            <img
              src="/icons/user-dashboard/bell_icon.png"
              alt="notification"
              className="h-4 w-4 object-contain"
            />
            <span
              className="absolute -top-1 -right-2 text-3xs text-white rounded-full"
              style={{ backgroundColor: "var(--orange)" }}
            >
              10
            </span>
          </div>
          {/**chat */}
          <div className="relative mx-3">
            <img
              src="/icons/user-dashboard/chat_icon.png"
              alt="chat"
              className="h-4 w-4 object-contain"
            />
            <span
              className="absolute -top-1 -right-2 text-3xs text-white rounded-full"
              style={{ backgroundColor: "var(--orange)" }}
            >
              18
            </span>
          </div>
          {/**user profile */}
          <div className="flex" style={{ fontFamily: "Opensans-semi-bold" }}>
            <div className="flex flex-col items-end justify-center text-white leading-2 px-2 text-3xs">
              <p style={{ fontFamily: "Opensans-bold" }}>{`Hi Mike`}</p>
              <p>useremail@gmail.com</p>
            </div>
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src="/icons/user-dashboard/man.png"
                className="w-6 h-6 object-contain cursor-pointer"
                alt="user"
                onClick={handleLogout}
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
          <span className="text-gray-400">{page} /</span>
          <b className="text-gray-600 ml-1">{page}</b>
        </div>
      </div>
    </div>
  );
}

export default Header;
