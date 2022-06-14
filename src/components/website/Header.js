import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import isAuthenticated, {
  getUserSavedProperties,
  logoutUser,
  removeAuthToken,
} from "../../lib/frontend/auth";
import server, { __d } from "../../server";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Loader from "../loader";
import {
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaSearch,
  FaTimes,
  FaTwitter,
} from "react-icons/fa";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";

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
  const router = useRouter();
  const [user, setUser] = useState(false);
  const [activeMenu, setActiveMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [savedProperties, setSavedProperties] = useState([]);

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

      if (u) {
        const response = await getUserSavedProperties(u.id);
        if (response?.status) {
          setIsLoading(false);
          const saved = response?.data.filter((p) => p.type === "saved");
          const favorite = response?.data.filter((p) => p.type === "favorite");
          setFavoriteProperties(favorite);
          setSavedProperties(saved);
        } else {
          setIsLoading(false);
          toast.error(response?.error || response?.message);
        }
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
    <div
      className={`flex flex-col ${
        router.pathname === "/" ? "absolute" : "relative"
      } w-full left-1/2 transform -translate-x-1/2`}
      style={{ zIndex: "9999" }}
    >
      {isLoading && <Loader />}
      {/**header top part */}
      <div
        className=" py-2 px-5 md:px-10"
        style={{ backgroundColor: "rgba(0,0,0,.8)" }}
      >
        <div
          className="flex items-center justify-between text-gray-100"
          style={{
            backgroundColor: "transparent",
            fontFamily: "Opensans-regular",
          }}
        >
          {/**header top left */}
          <div
            className="flex items-center wow slideInLeft"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
          >
            <div className="flex items-center mb-1 sm:mb-0">
              <FaEnvelope className="mr-2" />
              <span>{website?.company_email}</span>
            </div>
            <div className="flex items-center ml-3 sm:mb-0">
              <FaPhoneAlt className="mr-2" />
              <span>{website?.company_contact}</span>
            </div>
          </div>
          {/**header top right */}
          <div
            className="flex items-center wow slideInRight"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
          >
            <a href={website?.twitter_url} className="mx-2 hover:text-gray-300">
              <FaTwitter />
            </a>
            <a
              href={website?.facebook_url}
              className="mx-1 hover:text-gray-300"
            >
              <FaFacebookF />
            </a>
            <a
              href={website?.instagram_url}
              className="mx-1 hover:text-gray-300"
            >
              <FaInstagram />
            </a>
            <a
              href={website?.linkedin_url}
              className="mx-1 hover:text-gray-300"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/**header nav part */}
      <div
        className={`py-0 px-5 md:px-10 flex flex-col sm:flex-row items-center sm:justify-between ${
          router.pathname !== "/" ? "shadow-sm sticky top-0" : ""
        }`}
        style={{
          backgroundColor:
            router.pathname === "/"
              ? "rgba(6, 226, 209,.9)"
              : "rgba(6, 226, 209,1)",
        }}
      >
        {/**logo */}
        <div
          className="wow wobble -ml-2 logo"
          data-wow-delay="0.1s"
          data-wow-duration="1s"
        >
          <Link href="/">
            <a className="flex items-center bg-transparent -ml-5">
              <img
                src={website?.logo || "/images/website/no_photo.png"}
                alt="logo"
                style={{ padding: "10px" }}
                className="h-20 object-contain"
              />
            </a>
          </Link>
        </div>
        {/**navigation */}
        <div
          className="flex items-center flex-col sm:flex-row text-gray-700 wow slideInDown"
          style={{ fontFamily: "Opensans-semi-bold" }}
          data-wow-delay="0.1s"
          data-wow-duration="1s"
        >
          <ul className="sm:flex sm:items-center">
            <li className="mx-2 relative parent">
              <Link href="/">
                <a
                  className={`py-2 px-3 border-b-2 border-transparent ${
                    router.pathname === "/" ? "text-white" : ""
                  }`}
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="mx-2 relative parent">
              <Link href="/find-property/map?search">
                <a
                  className={`py-2 px-3 border-b-2 border-transparent ${
                    router.pathname === "/for-tenant" ? "text-white" : ""
                  }`}
                >
                  Rent
                </a>
              </Link>
              <ul className="absolute childs top-8 left-0 text-gray-800 z-40 w-max">
                <li
                  className={`my-2 hover:text-yellow-400 ${
                    router.pathname === "/for-tenant" ? "text-yellow-400" : ""
                  }`}
                >
                  <Link href="/for-tenant">
                    <a className="py-2 px-3 border-b-2 border-transparent">
                      Guide for tenants
                    </a>
                  </Link>
                </li>
                <li className="my-2 hover:text-yellow-400">
                  <Link href="/signup">
                    <a className="py-2 px-3 border-b-2 border-transparent">
                      Sign up as tenant
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`mx-2 parent relative ${
                router.pathname === "/join-our-team" ? "text-white" : ""
              }`}
            >
              <Link href="/join-our-team">
                <a className="py-2 px-3 border-b-2 border-transparent">
                  Agents portal
                </a>
              </Link>
              <ul className="absolute childs top-8 left-0 text-gray-800 z-40 w-max">
                <li className="my-2 hover:text-yellow-400">
                  <Link href="/signup/ibo">
                    <a className="py-2 px-3 border-b-2 border-transparent">
                      Sign up as agent
                    </a>
                  </Link>
                </li>
              </ul>
            </li>

            <li
              className={`mx-2 parent relative ${
                router.pathname === "/list-property" ? "text-white" : ""
              }`}
            >
              <Link
                href={
                  user && user?.role !== "tenant"
                    ? "/" + user?.role + "/add-property"
                    : "/list-property"
                }
              >
                <a
                  className={`py-2 px-3 border-b-2 border-transparent ${
                    router.pathname === "/for-homeowner" ||
                    router.pathname === "/list-property"
                      ? "text-white"
                      : ""
                  }`}
                >
                  List Property
                </a>
              </Link>
              <ul className="absolute childs top-8 left-0 text-gray-800  z-40 w-max">
                <li
                  className={`my-2 hover:text-yellow-400 ${
                    router.pathname === "/for-homeowner"
                      ? "text-yellow-400"
                      : ""
                  }`}
                >
                  <Link href="/for-homeowner">
                    <a className="py-2 px-3 border-b-2 border-transparent">
                      Guide for landlords
                    </a>
                  </Link>
                </li>
                <li className={`my-2 hover:text-yellow-400`}>
                  <Link href="/signup?a=list-property">
                    <a className="py-2 px-3 border-b-2 border-transparent">
                      Sing up as landlord
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`mx-2 ${
                router.pathname === "/our-advantages" ? "text-white" : ""
              }`}
            >
              <Link href="/our-advantages">
                <a className="py-2 px-3 border-b-2 border-transparent">
                  Our Advantages
                </a>
              </Link>
            </li>
          </ul>
          <div className="flex items-center mx-2">
            {["/", "/find-property", "/find-property/map"].indexOf(
              router.pathname
            ) === -1 && (
              <button
                onClick={() => router.push("/find-property/map")}
                className="py-1 px-4 flex mr-2 items-center bg-yellow-400 hover:bg-yellow-500 rounded-full text-white"
                style={{ backgroundColor: "var(--orange)" }}
              >
                <FaSearch className="mr-1" /> Find Property
              </button>
            )}

            {user && user?.role == "tenant" && favoriteProperties && (
              <Link href={`/${user?.role}/properties?type=favorite`}>
                <a
                  className="h-4 w-4 rounded-full mr-5 relative"
                  data-tip="Shortlisted Properties"
                >
                  <img
                    className="object-contain"
                    src="/icons/user-dashboard/favorite.png"
                  />
                  <b
                    style={{ backgroundColor: "var(--primary-color)" }}
                    className="absolute -top-3 -right-2 w-4 h-4 text-xs text-white rounded-full flex items-center justify-center"
                  >
                    {favoriteProperties?.length}
                  </b>
                  <ReactTooltip />
                </a>
              </Link>
            )}

            {!isAuthenticated() ? (
              <>
                <Link href="/signup">
                  <a className="py-1 px-5 bg-yellow-400 hover:bg-yellow-500 rounded-full text-white">
                    Sign Up
                  </a>
                </Link>
                <Link href="/login">
                  <a className="py-1 px-5 bg-blue-500 hover:bg-blue-600 rounded-full text-white ml-2">
                    Login
                  </a>
                </Link>
              </>
            ) : (
              <div className="relative">
                <img
                  src={user?.profile_pic || "/images/faces/icon-user.png"}
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
                    src={user?.profile_pic || "/images/faces/icon-user.png"}
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
