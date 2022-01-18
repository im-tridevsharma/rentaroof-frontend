import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import isAuthenticated, {
  logoutUser,
  removeAuthToken,
} from "../../lib/frontend/auth";
import server, { __d } from "../../server";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Loader from "../loader";
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

function Header() {
  const [user, setUser] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const u = JSON.parse(__d(localStorage.getItem("LU")));
    setUser(u);
    (async () => {
      const res = await getWebsiteValues(
        "logo,company_name,company_email,termsandconditions,referral_bonus_sender_point,referral_bonus_receiver_point,company_contact,tollfree_number,homepage_search_title,facebook_url,twitter_url,linkedin_url,instagram_url,homepage_aboutus_title,homepage_aboutus_description,homepage_video_title,homepage_video_description,homepage_video_url,aboutus_banner_title,aboutus_welcome_title,aboutus_welcome_description,aboutus_terms_condition,aboutus_privacy_policy,aboutus_refund_policy"
      );
      if (res?.status) {
        dispatch({ type: "SET_WEBSITE", values: res.data });
      }
    })();
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.removeItem("LU");
      localStorage.removeItem("LU");
    }

    setIsMobile(navigator?.userAgent.includes("Mobile"));
  }, []);

  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await logoutUser();
    if (response?.success) {
      setUser({});
      localStorage.removeItem("LU");
      removeAuthToken();
      setTimeout(() => {
        setUser(false);
        setIsLoading(false);
      }, 2000);
    } else {
      console.error(response?.message);
      setIsLoading(false);
      removeAuthToken();
    }
  };

  return (
    <div className="flex flex-col">
      {isLoading && <Loader />}
      {/**header top part */}
      <div
        className="flex flex-col items-center sm:flex-row sm:justify-between px-5 py-3 text-white"
        style={{
          backgroundColor: "var(--primary-color)",
          fontFamily: "Opensans-regular",
        }}
      >
        {/**header top left */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between max-w-3xl w-full">
          <div className="flex items-center mb-1 sm:mb-0">
            <img src="/icons/home/email_icon.png" alt="mail" className="mr-1" />
            <span>{website?.company_email}</span>
          </div>
          <div className="flex items-center mb-1 sm:mb-0">
            <img src="/icons/home/phone_icon.png" alt="mail" className="mr-1" />
            <span>{website?.company_contact}</span>
          </div>
          <div className="flex items-center mb-1 sm:mb-0 text-center">
            <span>
              Toll Free:{website?.tollfree_number} (7 Days a week from 9:00am to
              7:00pm)
            </span>
          </div>
        </div>
        {/**header top right */}
        <div className="flex items-center mt-2 sm:mt-0">
          <a href={website?.twitter_url} className="mx-2 hover:text-gray-300">
            <img src="/icons/home/twitter.png" alt="twitter" />
          </a>
          <a href={website?.facebook_url} className="mx-2 hover:text-gray-300">
            <img
              src="/icons/home/fb.png"
              alt="facebook"
              className="object-contain h-4"
            />
          </a>
          <a href={website?.instagram_url} className="mx-2 hover:text-gray-300">
            <img
              src="/icons/home/insta.png"
              alt="instagram"
              className="object-contain h-4"
            />
          </a>
          <a href={website?.linkedin_url} className="mx-2 hover:text-gray-300">
            <img src="/icons/home/in.png" alt="linkedin" />
          </a>
        </div>
      </div>
      {/**header nav part */}
      <div className="px-5 py-2 bg-white flex flex-col sm:flex-row items-center sm:justify-between">
        {/**logo */}
        <div>
          <Link href="/">
            <a
              className="flex items-center bg-white -ml-5"
              style={{ height: "52px" }}
            >
              <Image
                src={website?.logo || "/images/website/no_photo.png"}
                alt="logo"
                width="110"
                height="85"
                objectFit="contain"
              />
              <p
                className="text-xl md:text-2xl uppercase"
                style={{ fontFamily: "Opensans-bold", color: "var(--orange)" }}
              >
                {website?.company_name}
              </p>
            </a>
          </Link>
        </div>
        {/**navigation */}
        <div
          className="flex items-center flex-col sm:flex-row"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          <ul className="hidden sm:flex sm:items-center">
            <li className="mx-2">
              <Link href="/">
                <a className="py-2 px-3 border-b-2 border-transparent">Home</a>
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href="/ibo"
              >
                <a className="py-2 px-3 border-b-2 border-transparent">
                  IBO
                </a>
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href="/owners"
              >
                <a className="py-2 px-3 border-b-2 border-transparent">
                  Owners
                </a>
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href={
                  user && user.role !== "tenant"
                    ? `/${user.role}/add-property`
                    : "/login"
                }
              >
                <a className="py-2 px-3 border-b-2 border-transparent">
                  List Property
                </a>
              </Link>
            </li>
          </ul>
          <div className="flex ml-5">
            {!isAuthenticated() ? (
              <>
                <Link href="/signup">
                  <a
                    className="py-1 px-4 rounded-md text-white"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    Signup
                  </a>
                </Link>
                <Link href="/login">
                  <a
                    className="py-1 px-4 rounded-md text-white ml-2"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  >
                    Login
                  </a>
                </Link>
              </>
            ) : (
              <div className="relative">
                <img
                  src={user?.profile_pic || "/images/website/no_photo.png"}
                  className="w-6 h-6 object-cover rounded-full cursor-pointer"
                  alt="user"
                  onClick={() => setActiveMenu(!activeMenu)}
                />
                <div
                  style={{ fontFamily: "Opensans-regular" }}
                  className={`bg-white flex flex-col py-3 items-center transform duration-300 justify-center sm:absolute ${
                    activeMenu ? "sm:-right-5" : "sm:-right-96"
                  } ${
                    activeMenu ? "right-0" : " -right-full"
                  } top-56 sm:top-11 sm:w-60 h-auto fixed w-screen z-40`}
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
            )}

            {/**install app popup */}
            {isMobile && (
              <div className="fixed bottom-0 flex items-center justify-center right-0 w-screen bg-white z-50">
                <FaTimes
                  className="absolute right-1 top-1 text-red-500 cursor-pointer"
                  onClick={() => setIsMobile(false)}
                />
                <a href="https://google.com" target="_blank">
                  <img
                    src="/images/website/banner-app-install.png"
                    alt="rent a roof app install"
                    className="object-contain"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
