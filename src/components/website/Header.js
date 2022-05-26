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
import { FaSearch, FaTimes, FaTimesCircle } from "react-icons/fa";
import { MdMyLocation } from "react-icons/md";
import AutoComplete from "react-google-autocomplete";
import { toast } from "react-toastify";
import Geocode from "react-geocode";
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
  const [searchModal, setSearchModal] = useState(false);
  const [defaultLocation, setDefaultLocation] = useState("");
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

  const handleFilter = (e) => {
    e.preventDefault();

    const location = localStorage.getItem("current-location")
      ? JSON.parse(localStorage.getItem("current-location"))
      : false;

    const locationString = location
      ? Object.keys(location)
          .map((key) => key + "=" + location[key])
          .join("&")
      : "";
    router.push(
      "/find-property?" + locationString + "&pagination=yes&search_radius=20"
    );
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        Geocode.setApiKey(process?.env?.MAP_API_KEY);
        Geocode.fromLatLng(
          location?.coords?.latitude,
          location?.coords?.longitude
        ).then((response) => {
          handlePlaceSearch(response?.results[0], true);
        });
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handlePlaceSearch = (place, fromLatLng = false) => {
    setIsLoading(true);
    const components = place?.address_components;
    let pincode = "";
    let country = "";
    let state = "";
    let city = "";
    let zone = "";
    let area = "";
    let sub_area = "";
    let route = "";
    let lat = 0.0;
    let lng = 0.0;

    components?.forEach((element) => {
      if (element.types.includes("route")) {
        route = element?.long_name;
      }
      if (element.types.includes("sublocality_level_2")) {
        sub_area = element?.long_name;
      }
      if (element.types.includes("sublocality_level_1")) {
        area = element?.long_name;
      }
      if (element.types.includes("locality")) {
        city = element?.long_name;
      }
      if (element.types.includes("administrative_area_level_2")) {
        zone = element?.long_name;
      }
      if (element.types.includes("administrative_area_level_1")) {
        state = element?.long_name;
      }
      if (element.types.includes("country")) {
        country = element?.long_name;
      }
      if (element.types.includes("postal_code")) {
        pincode = element?.long_name;
      }
    });

    if (fromLatLng) {
      lat = place.geometry?.location?.lat;
      lng = place.geometry?.location?.lng;
    } else {
      lat = place.geometry?.location?.lat("d");
      lng = place.geometry?.location?.lng("d");
    }

    setDefaultLocation(place?.formatted_address);
    localStorage.setItem(
      "current-location",
      JSON.stringify({
        country,
        state,
        city,
        zone,
        area,
        sub_area,
        pincode,
        route,
        lat,
        lng,
      })
    );
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col" style={{ zIndex: "9999" }}>
      {isLoading && <Loader />}
      {/**header top part */}
      {router.pathname === "/" && (
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
              <img
                src="/icons/home/email_icon.png"
                alt="mail"
                className="mr-1"
              />
              <span>{website?.company_email}</span>
            </div>
            <div className="flex items-center mb-1 sm:mb-0">
              <img
                src="/icons/home/phone_icon.png"
                alt="mail"
                className="mr-1"
              />
              <span>{website?.company_contact}</span>
            </div>
            <div className="flex items-center mb-1 sm:mb-0 text-center">
              <span>
                Toll Free:{website?.tollfree_number} (7 Days a week from 9:00am
                to 7:00pm)
              </span>
            </div>
          </div>
          {/**header top right */}
          <div className="flex items-center mt-2 sm:mt-0">
            <a href={website?.twitter_url} className="mx-2 hover:text-gray-300">
              <img src="/icons/home/twitter.png" alt="twitter" />
            </a>
            <a
              href={website?.facebook_url}
              className="mx-2 hover:text-gray-300"
            >
              <img
                src="/icons/home/fb.png"
                alt="facebook"
                className="object-contain h-4"
              />
            </a>
            <a
              href={website?.instagram_url}
              className="mx-2 hover:text-gray-300"
            >
              <img
                src="/icons/home/insta.png"
                alt="instagram"
                className="object-contain h-4"
              />
            </a>
            <a
              href={website?.linkedin_url}
              className="mx-2 hover:text-gray-300"
            >
              <img src="/icons/home/in.png" alt="linkedin" />
            </a>
          </div>
        </div>
      )}

      {searchModal && (
        <div className="p-5 max-w-xl w-full rounded-md fixed top-1 left-1/2 shadow-md z-40 border border-gray-50 transform -translate-x-1/2  bg-white">
          <h4
            className="flex items-center"
            style={{ fontFamily: "Opensans-bold" }}
          >
            <FaSearch className="mr-3" />
            Find your dream home.
          </h4>
          <p className="mt-2" style={{ fontFamily: "Opensans-regular" }}>
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs.
          </p>

          <a
            onClick={() => setSearchModal(false)}
            className="text-red-500 text-xl absolute right-5 top-5"
          >
            <FaTimesCircle />
          </a>

          <div className="flex mt-5 flex-col sm:flex-row items-center">
            <button
              type="button"
              className="p-3 border rounded-sm mx-1 bg-white"
              onClick={getCurrentLocation}
              data-tip="Current Location"
            >
              <MdMyLocation size={22} />
            </button>
            <AutoComplete
              apiKey={process?.env?.MAP_API_KEY}
              defaultValue={defaultLocation}
              onPlaceSelected={(place) => handlePlaceSearch(place)}
              className=" rounded-sm border-gray-200 w-full text-md px-2 h-12"
              placeholder="Enter Your Location..."
              style={{ borderWidth: "1px" }}
              options={{
                types: ["address"],
                componentRestrictions: {
                  country: "in",
                },
              }}
              required
            />
            <button
              type="button"
              onClick={handleFilter}
              className="px-8 sm:px-10 py-2 text-white rounded-md ml-2 mr-1 text-xl"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              <img
                src="/icons/home/home_search_icon.png"
                className="h-5 object-contain"
                alt="search"
              />
            </button>
          </div>
        </div>
      )}

      {/**header nav part */}
      <div className="px-5 py-2 shadow-sm bg-white flex flex-col sm:flex-row items-center sm:justify-between">
        {/**logo */}
        <div>
          <Link href="/">
            <a
              className="flex items-center bg-white -ml-5"
              style={{ height: "52px" }}
            >
              <img
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
          <ul className="sm:flex sm:items-center">
            <li className="mx-2 relative parent">
              <Link href="/">
                <a
                  className={`py-2 px-3 border-b-2 border-transparent ${
                    router.pathname === "/for-tenant" ? "text-blue-600" : ""
                  }`}
                >
                  Rent
                </a>
              </Link>
              <ul className="absolute childs top-6 pt-5 left-0  bg-white px-2 py-1 rounded-md z-40 w-max">
                <li
                  className={`my-2 hover:text-blue-500 ${
                    router.pathname === "/for-tenant" ? "text-blue-500" : ""
                  }`}
                >
                  <Link href="/for-tenant">
                    <a className="py-2 px-3 border-b-2 border-transparent">
                      Guide for tenants
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`mx-2 parent relative ${
                router.pathname === "/join-our-team" ? "text-blue-500" : ""
              }`}
            >
              <Link href="/join-our-team">
                <a className="py-2 px-3 border-b-2 border-transparent">
                  Agents portal
                </a>
              </Link>
            </li>

            <li
              className={`mx-2 parent relative ${
                router.pathname === "/list-property" ? "text-blue-500" : ""
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
                      ? "text-blue-600"
                      : ""
                  }`}
                >
                  List Property
                </a>
              </Link>
              <ul className="absolute childs top-6 pt-5 left-0  bg-white px-2 py-1 rounded-md z-40 w-max">
                <li
                  className={`my-2 hover:text-blue-500 ${
                    router.pathname === "/for-tenant" ? "text-blue-500" : ""
                  }`}
                >
                  <Link href="/for-homeowner">
                    <a className="py-2 px-3 border-b-2 border-transparent">
                      Guide for landlords
                    </a>
                  </Link>
                </li>
              </ul>
            </li>
            <li
              className={`mx-2 ${
                router.pathname === "/our-advantages" ? "text-blue-500" : ""
              }`}
            >
              <Link href="/our-advantages">
                <a className="py-2 px-3 border-b-2 border-transparent">
                  Our Advantages
                </a>
              </Link>
            </li>
          </ul>
          <div className="flex items-center ml-5">
            {router.pathname !== "/" && (
              <button
                onClick={() => setSearchModal(!searchModal)}
                className="py-1 px-4 mr-3 rounded-md text-white flex items-center"
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
                  <a
                    className="py-1 px-4 rounded-md text-white"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    Sign Up
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
