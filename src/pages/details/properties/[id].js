import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../../components/website/Header";
import Footer from "../../../components/website/Footer";
import Breadcrumb from "../../../components/website/Breadcrumb";
import PropertyIbo from "../../../components/website/PropertyIbo";
import { FiAlertTriangle, FiCheck, FiCheckCircle } from "react-icons/fi";
import {
  addPropertyReview,
  fetchSimilarProperties,
  getPropertyByCode,
  getUserProperty,
  saveUserProperty,
} from "../../../lib/frontend/properties";
import Loader from "../../../components/loader";
import moment from "moment";
import {
  FaCheckCircle,
  FaDirections,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";
import EssentialItem from "../../../components/website/EssentialItem";
import { __d } from "../../../server";
import { schedulePropertyVisit } from "../../../lib/frontend/properties";
import StarRatings from "react-star-ratings";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  StreetViewPanorama,
} from "@react-google-maps/api";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import { shallowEqual, useSelector } from "react-redux";

import DatePicker from "react-datepicker";

function Index({ id }) {
  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [propertyCode, setPropertyCode] = useState(null);
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("key-features");
  const [essential, setEssential] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [amenities, setAmenities] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [address, setAddress] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(false);
  const [errors, setErrors] = useState(false);
  const [rating, setRating] = useState(0);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [appointmentTime, setAppointmentTime] = useState(new Date());

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAP_API_KEY, // Add your API key
  });

  useEffect(() => {
    //remove redirect
    localStorage.removeItem("redirect");
    setPropertyCode(id);
    //fetch property details
    setIsLoading(true);
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;

    (async () => {
      const response = await getPropertyByCode(router.query.id);
      if (response?.status) {
        setIsLoading(false);
        setProperty(response.data);
        if (response?.data.gallery) {
          Object.keys(response?.data.gallery).forEach((key) => {
            if (
              ![
                "id",
                "property_id",
                "created_at",
                "updated_at",
                "others",
              ].includes(key)
            ) {
              const images = JSON.parse(response?.data.gallery[key]);
              if (images.length > 0) {
                setGallery((prev) => [...prev, ...images]);
              }
            }
          });
        }
        if (response?.data.essential) {
          setEssential(response?.data.essential);
        }
        setUser(response?.data?.posted_by_data);
      }
      if (response?.data?.posted_by_data) {
        if (response?.data.amenities_data) {
          setAmenities(response?.data.amenities_data);
        }
        if (response?.data.preferences_data) {
          setPreferences(response?.data.preferences_data);
        }
        if (response?.data.address) {
          setAddress(response?.data.address);
        }

        if (u?.id) {
          setProfile(u);
          //fill values of form
          const updata = {
            user_id: u.id,
            property_id: response?.data.id,
            property_code: response?.data.property_code,
            front_image: response?.data.front_image,
            rating: "",
            type: "visited",
            property_name: response?.data.name,
            property_short_description: response?.data.short_description,
            property_posted_by: response?.data?.posted_by_data.first,
          };
          const sres = await saveUserProperty(updata);
          if (sres?.status) {
            setIsLoading(false);
          } else {
            toast.error(sres?.error || sres.message);
          }
        }
      } else {
        toast.error(response?.error || response?.message);
        setIsLoading(false);
      }

      if (u?.id) {
        //check is this property in saved list
        const upres = await getUserProperty({
          type: "saved",
          property_code: router.query.id,
          user_id: u?.id,
        });
        if (upres?.status) {
          setIsSaved(upres?.data?.length > 0 ? true : false);
        }
      }
    })();

    return () => {
      setGallery([]);
    };
  }, [router.query.id]);

  useEffect(() => {
    const getSimilarProperties = async () => {
      setIsLoading(true);
      const response = await fetchSimilarProperties(id, 2);
      if (response?.status) {
        setSimilarProperties(response?.data?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response?.error || response?.message);
      }
    };

    getSimilarProperties();
    return () => {
      setSimilarProperties([]);
    };
  }, [router.query.id]);

  const changeImage = (e) => {
    document.querySelector("#main-image").src = e.target.src;
  };

  const getDirection = (lat, lng) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        window
          .open(
            `https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/${lat},${lng}`,
            "_blank"
          )
          .focus();
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (profile?.id) {
      const formdata = new FormData(document.forms.meeting);
      const response = await schedulePropertyVisit(property?.id, formdata);
      if (response?.status) {
        setIsLoading(false);
        setErrors(false);
        toast.success("You successfully scheduled a visit for this proeprty!");
        document.forms.meeting.reset();
      } else if (response?.error) {
        setIsLoading(false);
        setErrors(response?.error);
      } else {
        toast.error(response?.message);
        setIsLoading(false);
      }
    } else {
      localStorage.setItem("redirect", router.asPath);
      router.push("/login");
    }
  };

  const saveProperty = async () => {
    setIsLoading(true);
    if (profile?.id) {
      const updata = {
        user_id: profile.id,
        property_id: property?.id,
        property_code: property?.property_code,
        front_image: property?.front_image,
        rating: "",
        type: "favorite",
        property_name: property?.name,
        property_short_description: property?.short_description,
        property_posted_by: property?.posted_by_data.first,
      };
      const sres = await saveUserProperty(updata);
      if (sres?.status) {
        setIsLoading(false);
        setIsSaved(true);
      } else {
        toast.error(sres?.error || sres.message);
        setIsLoading(false);
      }
    } else {
      localStorage.setItem("redirect", router.asPath);
      router.push("/login");
    }
  };

  const addReview = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (profile?.id) {
      if (rating) {
        const data = {
          rating,
          review: document.forms.review.review.value,
          property_id: property?.id,
        };
        const response = await addPropertyReview(data);
        if (response?.status) {
          setIsLoading(false);
          document.forms.review.reset();
          setRating(0);
          toast.success("Review added successfully.");
        } else {
          setIsLoading(false);
          toast.error(response?.error || response?.message);
        }
      } else {
        setIsLoading(false);
        toast.error("Something went wrong!");
      }
    } else {
      localStorage.setItem("redirect", router.asPath);
      router.push("/login");
    }
  };

  return (
    <>
      <Head>
        <title>Property - {id}</title>
        <meta name="title" content={property?.name} />
        <meta name="og:title" content={property?.name} />
        <meta name="description" content={property?.short_description} />
        <meta name="og:description" content={property?.short_description} />
        <meta name="og:type" content="website" />
        <meta name="og:url" content={location?.hostname || ""} />
        <meta name="og:site_name" content="RentaRoof" />
        <meta name="og:image" content={property?.front_image} />
      </Head>
      <ToastContainer />
      {isLoading && <Loader />}
      <Header />
      <Breadcrumb
        tagline={`Details of selected property ${id}`}
        path="Home / Property List / Property Details"
      />
      <div className="flex flex-col p-5 relative">
        {/**gallery */}
        <div className="flex md:flex-row flex-col">
          {/**main image */}
          <div className="flex max-w-6xl w-full max-h-128 overflow-hidden md:mr-5">
            <img
              src={property?.front_image || "/images/website/no_photo.png"}
              alt="p1"
              id="main-image"
              className="rounded-sm w-full h-full object-cover"
            />
          </div>
          {/**images */}
          <div className="md:w-40 flex md:flex-col flex-row w-full mt-4 md:max-h-128 overflow-hidden md:overflow-y-auto overflow-x-auto md:overflow-x-hidden">
            {gallery &&
              gallery.map((g, i) => (
                <img
                  src={g}
                  alt="p1"
                  className="my-1 mx-1 md:mx-0 h-28 object-cover rounded-sm cursor-pointer"
                  onClick={changeImage}
                  key={i}
                />
              ))}
          </div>
        </div>

        {/**detials part */}
        <div className="flex md:flex-row flex-col mt-5">
          {/**left */}
          <div className="flex max-w-5xl w-full flex-col">
            <div className="flex items-center justify-between">
              <p
                className="text-lg text-gray-700"
                style={{ fontFamily: "Opensans-bold" }}
              >
                {property?.name || "-"}
              </p>
              <p className="flex items-center relative">
                <img
                  src="/icons/proprtydetls/icon_1.png"
                  alt="share"
                  data-tip="Share"
                  className="w-7 h-7 object-contain cursor-pointer"
                />
                <ReactTooltip />
                <span
                  style={{ borderRightWidth: "1px" }}
                  className="border-gray-200 h-7 mx-4"
                ></span>
                <img
                  src="/icons/proprtydetls/icon_2.png"
                  alt="bookmark"
                  className="w-7 h-7 object-contain cursor-pointer"
                  onClick={saveProperty}
                  data-tip={
                    isSaved ? "Shortlisted Already" : "Shortlist Property"
                  }
                />
                <ReactTooltip />
                {isSaved && (
                  <FaCheckCircle className="absolute right-0 -bottom-2 text-green-600" />
                )}
              </p>
            </div>
            <p
              style={{
                color: "var(--primary-color)",
                fontFamily: "Opensans-bold",
              }}
              className="text-lg"
            >
              Rs. {property?.monthly_rent || "-"}/month
            </p>
            <div
              className="border-gray-200 mt-3"
              style={{ borderWidth: "1px" }}
            >
              <p
                className="flex px-4 py-1 text-gray-600 bg-gray-50 items-center justify-evenly border-gray-200"
                style={{
                  borderBottomWidth: "1px",
                  fontFamily: "Opensans-bold",
                }}
              >
                <span className="flex items-center py-3 border-gray-200 pr-4 border-r-2">
                  <img
                    src="/icons/proprtydetls/icon_3.png"
                    alt="bhk"
                    className="mr-2 w-5 h-5 object-contain"
                  />
                  {property?.bedrooms || "-"} BHK
                </span>
                <span className="flex items-center py-3 border-gray-200 px-4 border-r-2">
                  <img
                    src="/icons/proprtydetls/icon_4.png"
                    alt="bhk"
                    className="mr-2 w-5 h-5 object-contain"
                  />
                  {property?.bathrooms || "-"} Bathroom
                </span>
                <span className="flex items-center py-3 border-gray-200 px-4 border-r-2">
                  <img
                    src="/icons/proprtydetls/icon_5.png"
                    alt="bhk"
                    className="mr-2 w-5 h-5 object-contain"
                  />
                  {property?.floors || "-"} Floor
                </span>
                <span className="flex items-center py-3">
                  <img
                    src="/icons/proprtydetls/icon_6.png"
                    alt="bhk"
                    className="mr-2 w-5 h-5 object-contain"
                  />
                  {property?.balconies || "-"} Balcony
                </span>
              </p>
              <p
                className="px-4 py-1 flex items-center justify-evenly text-gray-600"
                style={{ fontFamily: "Opensans-bold" }}
              >
                <span className="flex flex-col py-1 border-gray-200 pr-10 border-r-2">
                  <b className="uppercase">Property Type</b>
                  <span
                    className="leading-3 text-xs font-semibold capitalize"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    {property?.type}
                  </span>
                </span>
                <span className="flex flex-col py-1 border-gray-200 pr-10 border-r-2">
                  <b className="uppercase">Built Up Area</b>
                  <span
                    className="leading-3 text-xs font-semibold"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    {property?.carpet_area || "-"}{" "}
                    {property?.carpet_area_unit || "-"}
                  </span>
                </span>
                <span className="flex flex-col py-1">
                  <b className="uppercase">Property ID</b>
                  <span
                    className="leading-3 text-xs font-semibold"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    {property?.property_code || "-"}
                  </span>
                </span>
              </p>
            </div>

            {/**key features */}
            <div className="flex flex-col mt-10">
              {/**tabs */}
              <div
                className="flex items-center justify-between border-gray-300"
                style={{
                  borderBottomWidth: "1px",
                  fontFamily: "Opensans-bold",
                }}
              >
                <button
                  className="border-b-2 border-transparent"
                  style={{
                    borderColor: activeTab === "key-features" && "var(--blue)",
                  }}
                  onClick={() => setActiveTab("key-features")}
                >
                  Key Features
                </button>
                <button
                  className="border-b-2 border-transparent"
                  style={{
                    borderColor: activeTab === "about" && "var(--blue)",
                  }}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
                <button
                  className="border-b-2 border-transparent"
                  style={{
                    borderColor: activeTab === "amenities" && "var(--blue)",
                  }}
                  onClick={() => setActiveTab("amenities")}
                >
                  Amenities & Preferences
                </button>
                <button
                  className="border-b-2 border-transparent"
                  style={{
                    borderColor: activeTab === "price" && "var(--blue)",
                  }}
                  onClick={() => setActiveTab("price")}
                >
                  Price & availability
                </button>
              </div>
              {/**tab details */}
              <div className="mt-2">
                {activeTab === "key-features" && (
                  <div
                    className="list-inside text-gray-600 px-2 mt-3"
                    style={{
                      fontFamily: "Opensans-regular",
                      listStyleType: "square",
                    }}
                    dangerouslySetInnerHTML={{ __html: property?.description }}
                  />
                )}

                {activeTab === "about" && (
                  <div
                    className="px-2 text-gray-600 mt-3"
                    style={{
                      fontFamily: "Opensans-regular",
                      listStyleType: "square",
                    }}
                  >
                    <p>{property?.short_description || "-"}</p>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <>
                    <b style={{ fontFamily: "Opensans-semi-bold" }}>
                      Amenities
                    </b>
                    <div
                      className="grid grid-cols-2 md:grid-cols-3 mt-3"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      {amenities &&
                        amenities.map((a, i) => (
                          <div className="flex items-center m-1" key={i}>
                            <img
                              src={a?.icon || "/images/website/no_photo.png"}
                              alt="a1"
                              className="h-8 w-8 object-contain"
                            />
                            <p className="mx-3">{a?.title || "-"}</p>
                            <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                              <FiCheck className="text-green-600" />
                            </span>
                          </div>
                        ))}
                    </div>
                    <b
                      style={{ fontFamily: "Opensans-semi-bold" }}
                      className="mt-3 block"
                    >
                      Preferences
                    </b>
                    <div
                      className="grid grid-cols-2 md:grid-cols-3 mt-3"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      {preferences &&
                        preferences.map((a, i) => (
                          <div className="flex items-center m-1" key={i}>
                            <FaInfoCircle data-tip={a?.description} />
                            <ReactTooltip />
                            <p className="mx-3">{a?.title || "-"}</p>
                          </div>
                        ))}
                    </div>
                  </>
                )}

                {activeTab === "price" && (
                  <div className="px-2 mt-3 text-gray-600">
                    <p
                      style={{ fontFamily: "Opensans-bold" }}
                      className="text-xl"
                    >
                      Rs. {property?.monthly_rent}/month
                    </p>
                    <p className="text-green-600 mt-2">
                      Available from{" "}
                      {moment(property?.available_from).format("DD-MM-YYYY") ||
                        "-"}
                    </p>
                    <p className="flex items-center mt-2">
                      <span className="mr-2">Available immediate</span>
                      {property?.available_immediately ? (
                        <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <FiCheck className="text-green-600" />
                        </span>
                      ) : (
                        <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <FaTimes className="text-red-600" />
                        </span>
                      )}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/**location map */}
            <div className="flex flex-col mt-3">
              <p
                className="uppercase text-lg border-gray-300 pb-1 text-gray-700"
                style={{
                  fontFamily: "Opensans-bold",
                  borderBottomWidth: "1px",
                }}
              >
                Location Map
              </p>
              <div
                style={{
                  fontSize: "1rem",
                  fontFamily: "Opensans-bold",
                }}
                className="text-gray-700 my-3 flex items-center justify-between"
              >
                {address?.full_address || "-"}, {address?.pincode || "-"}
                <div className="flex items-center">
                  <label className="float-right text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={address?.street_view === "yes" ? true : false}
                      onChange={(e) =>
                        setAddress((a) => ({
                          ...a,
                          street_view: e.target.checked ? "yes" : "no",
                        }))
                      }
                    />
                    Street View
                  </label>
                  <div data-tip="Get Direction">
                    <ReactTooltip />
                    <FaDirections
                      className="ml-4 text-lg cursor-pointer"
                      onClick={() => getDirection(address?.lat, address?.long)}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full border-gray-200 border-2 h-96 rounded-md bg-gray-50">
                {isLoaded && address && (
                  <GoogleMap
                    center={{
                      lat: parseFloat(address?.lat),
                      lng: parseFloat(address.long),
                    }}
                    zoom={address ? parseInt(address?.zoom_level) : 5}
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                  >
                    {address && (
                      <Marker
                        key={address.id}
                        position={{
                          lat: parseFloat(address?.lat),
                          lng: parseFloat(address?.long),
                        }}
                        icon="/icons/home/icon-marker.png"
                      ></Marker>
                    )}
                    {address?.street_view === "yes" && (
                      <StreetViewPanorama
                        position={{
                          lat: parseFloat(address?.lat),
                          lng: parseFloat(address.long),
                        }}
                        visible={true}
                      />
                    )}
                  </GoogleMap>
                )}
              </div>
            </div>
            {/**near by essentials */}
            <div className="flex flex-col mt-5">
              <p
                className="text-lg border-gray-300 pb-1 text-gray-700"
                style={{
                  fontFamily: "Opensans-bold",
                  borderBottomWidth: "1px",
                }}
              >
                Nearby Essentials
              </p>
              <div
                className="grid grid-cols-1 md:grid-cols-2 text-gray-600"
                style={{ fontFamily: "Opensans-bold" }}
              >
                {essential?.school && (
                  <EssentialItem
                    icon="/icons/proprtydetls/icon_12.png"
                    name="School"
                    distance={essential.school}
                  />
                )}
                {essential?.hospital && (
                  <EssentialItem
                    icon="/icons/proprtydetls/icon_13.png"
                    name="Hospital"
                    distance={essential.hospital}
                  />
                )}
                {essential?.bus_stop && (
                  <EssentialItem
                    icon="/icons/proprtydetls/icon_14.png"
                    name="Bus Stop"
                    distance={essential.bus_stop}
                  />
                )}
                {essential?.airport && (
                  <EssentialItem
                    icon="/icons/proprtydetls/icon_15.png"
                    name="Airport"
                    distance={essential.airport}
                  />
                )}
                {essential?.train && (
                  <EssentialItem
                    icon="/icons/proprtydetls/icon_14.png"
                    name="Train"
                    distance={essential.train}
                  />
                )}
                {essential?.metro && (
                  <EssentialItem
                    icon="/icons/proprtydetls/icon_14.png"
                    name="Metro"
                    distance={essential.metro}
                  />
                )}
                {essential?.market && (
                  <EssentialItem
                    icon="/icons/proprtydetls/icon_11.png"
                    name="Market"
                    distance={essential.market}
                  />
                )}
                {essential?.restaurent && (
                  <EssentialItem
                    icon="/icons/proprtydetls/icon_12.png"
                    name="Restaurent"
                    distance={essential.restaurent}
                  />
                )}
              </div>
            </div>
            {/**similar properties */}
            <div className="flex flex-col mt-5">
              <p
                className="text-lg border-gray-300 pb-1 text-gray-700 mb-3"
                style={{
                  fontFamily: "Opensans-bold",
                  borderBottomWidth: "1px",
                }}
              >
                Similar Properties
              </p>
              {similarProperties?.length > 0 ? (
                similarProperties.map((p, i) => (
                  <PropertyIbo key={i} property={p} />
                ))
              ) : (
                <p className="text-red-500 p-2">
                  Similar Properties not found!
                </p>
              )}

              <div
                className="flex items-center cursor-pointer justify-center mt-2 border-gray-200 rounded-md text-center uppercase bg-white py-3 shadow-sm"
                style={{
                  borderWidth: "1px",
                  fontFamily: "Opensans-bold",
                  color: "var(--primary-color)",
                }}
              >
                View More{" "}
                <img
                  src="/icons/ibo_icons/icon16.png"
                  alt="arrow"
                  className="ml-1"
                />
              </div>
            </div>
          </div>
          {/**right */}
          <div className="flex flex-col flex-grow md:ml-5 md:mt-0 mt-5 w-96">
            {/**markated by */}
            <div
              className="p-6 border-gray-200 text-gray-700 flex flex-col items-start"
              style={{
                borderWidth: "1px",
                fontFamily: "Opensans-bold",
                fontSize: "1rem",
              }}
            >
              <p>Markated by</p>
              <p className="mt-3">
                {user?.first || "-"} {user?.last || "-"}
              </p>
              <p>{user?.address?.full_address || "-"}</p>
              <p className="mt-1" style={{ color: "var(--primary-color)" }}>
                Call : {user?.mobile || "-"}
              </p>
              <Link href={`/enquiry?property=${property?.property_code}`}>
                <a
                  className="p-3 mt-3 shadow-sm text-white text-sm"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  Request Details
                </a>
              </Link>
              {user?.role === "ibo" ? (
                <Link href={`/details/ibo/${user?.system_userid}`}>
                  <a className="mt-3 underline block">View More</a>
                </Link>
              ) : (
                <Link href={`/details/landlord/${user?.system_userid}`}>
                  <a className="mt-3 underline block">View More</a>
                </Link>
              )}
              <h5 style={{ fontFamily: "Opensans-bold" }} className="my-2">
                Inspection Time
              </h5>
              <p className="capitalize text-xs">{property?.inspection_days}</p>
              <p className="capitalize text-xs">
                {property?.inspection_time_from} -{" "}
                {property?.inspection_time_to}
              </p>
            </div>
            {/**visit this house */}
            <div
              className="flex flex-col border-2 border-gray-200 shadow-md rounded-md px-5 py-2 mt-3"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <h5
                className="text-center text-gray-700"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Visit this house
              </h5>
              <p className="text-center text-gray-700">
                <span
                  style={{
                    color: "var(--primary-color)",
                  }}
                >
                  Free
                </span>{" "}
                Guided Tour with our Executive
              </p>

              <div
                className="border-gray-200 pt-3 mt-2 text-gray-600"
                style={{ borderTopWidth: "1px" }}
              >
                {errors && (
                  <div className="errors">
                    {Object.keys(errors).map((index, i) => (
                      <div className="w-full mb-2" key={i}>
                        <p className="text-red-500 flex items-center">
                          <FiAlertTriangle className="mr-1" /> {errors[index]}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                <form name="meeting" onSubmit={submitHandler}>
                  <div className="form-element relative">
                    <label className="form-label" htmlFor="name">
                      Name
                      <img
                        src="/icons/proprtydetls/icon_7.png"
                        alt="user"
                        className="absolute top-10 w-5 h-5 object-contain left-3"
                      />
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      defaultValue={profile?.fullname || ""}
                      onChange={() => {}}
                      className="form-input border-gray-200 rounded-md pl-10 h-11"
                      style={{ fontSize: ".95rem" }}
                    />
                  </div>

                  <div className="form-element relative">
                    <label className="form-label" htmlFor="email">
                      Email
                      <img
                        src="/icons/proprtydetls/icon_9.png"
                        alt="user"
                        className="absolute top-10 w-5 h-5 object-contain left-3"
                      />
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      defaultValue={profile?.email}
                      onChange={() => {}}
                      className="form-input border-gray-200 rounded-md pl-10 h-11"
                      style={{ fontSize: ".95rem" }}
                    />
                  </div>

                  <div className="form-element relative">
                    <label className="form-label" htmlFor="contact">
                      Contact
                      <img
                        src="/icons/proprtydetls/icon_8.png"
                        alt="user"
                        className="absolute top-10 w-5 h-5 object-contain left-3"
                      />
                    </label>
                    <input
                      type="text"
                      id="contact"
                      name="contact"
                      defaultValue={profile?.mobile}
                      onChange={() => {}}
                      className="form-input border-gray-200 rounded-md pl-10 h-11"
                      style={{ fontSize: ".95rem" }}
                    />
                  </div>

                  <div className="form-element relative">
                    <label className="form-label" htmlFor="date">
                      Select Date
                      <img
                        src="/icons/proprtydetls/icon_10.png"
                        alt="user"
                        className="absolute top-10 w-5 h-5 object-contain left-3"
                      />
                    </label>
                    <DatePicker
                      dateFormat="dd-MM-yyyy"
                      selected={moment(appointmentDate).toDate()}
                      onChange={(date) => setAppointmentDate(date)}
                      minDate={new Date()}
                    />
                    <input
                      type="hidden"
                      name="date"
                      value={moment(appointmentDate).format("YYYY-MM-DD")}
                    />
                  </div>

                  <div className="form-element relative">
                    <label className="form-label" htmlFor="time">
                      Select Time
                      <img
                        src="/icons/proprtydetls/icon_11.png"
                        alt="user"
                        className="absolute top-10 w-5 h-5 object-contain left-3"
                      />
                    </label>
                    <DatePicker
                      selected={appointmentTime}
                      onChange={(date) => setAppointmentTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      minTime={moment(
                        `${moment().format("DD-MM-YYYY")} ${
                          property?.inspection_time_from || "9:00 AM"
                        }`
                      ).toDate()}
                      maxTime={moment(
                        `${moment().format("DD-MM-YYYY")} ${
                          property?.inspection_time_to || "7:00 PM"
                        }`
                      ).toDate()}
                    />
                    <input
                      type="hidden"
                      name="time"
                      value={moment(appointmentTime).format("h:mm A")}
                    />
                  </div>

                  <div className="mt-1">
                    <input
                      type="checkbox"
                      required={true}
                      id="terms"
                      value="yes"
                      className="h-5 w-5 border-gray-200 mr-2"
                    />
                    <label htmlFor="terms">
                      Accept{" "}
                      <a
                        href="javascript:;"
                        onClick={() => setTermsAndCondition(true)}
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                  <div className="text-center">
                    <button
                      className="my-5 p-3 rounded-md text-white"
                      style={{
                        fontSize: "1rem",
                        backgroundColor: "var(--primary-color)",
                      }}
                    >
                      Schedule a Visit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/**review */}
            {false && (
              <div className=" border-gray-200 flex text-center flex-col mt-3 pb-5 overflow-hidden border-2 shadow-md">
                <p
                  className="text-gray-600 pb-3 mt-2 border-gray-200 mx-3"
                  style={{
                    borderBottomWidth: "1px",
                    fontSize: "1rem",
                    fontFamily: "Opensans-bold",
                  }}
                >
                  Rate & Review this Property
                </p>
                <p
                  className="pt-3 uppercase text-gray-600"
                  style={{
                    fontFamily: "Opensans-bold",
                    fontSize: "1rem",
                  }}
                >
                  Rate Us
                </p>
                <div
                  className="flex items-center justify-center my-2 border-gray-200 pb-4 mx-3"
                  style={{ color: "var(--orange)", borderBottomWidth: "1px" }}
                >
                  <StarRatings
                    changeRating={(newRating) => setRating(newRating)}
                    rating={rating}
                    numberOfStars={5}
                    starRatedColor="var(--orange)"
                    starDimension="25px"
                    starSpacing="12px"
                    starHoverColor="var(--orange)"
                  />
                </div>
                <div
                  className="flex flex-col mx-4 flex-grow md:mt-3 mt-5"
                  style={{ fontFamily: "Opensans-bold", fontSize: "1rem" }}
                >
                  <p className="flex flex-col">
                    <b style={{ fontFamily: "Opensans-bold" }}>
                      Write a Review
                    </b>
                    <span
                      className="text-gray-600 max-w-sm mx-auto mt-2"
                      style={{
                        fontFamily: "opensans-regular",
                        fontSize: ".9rem",
                      }}
                    >
                      Share your thoughts with another customer after visiting
                      this property.
                    </span>
                  </p>
                  <form
                    name="review"
                    className="w-full mt-5"
                    onSubmit={addReview}
                  >
                    <div className="form-element">
                      <textarea
                        className="h-40 border-gray-200 rounded-md text-sm"
                        name="review"
                        required
                      ></textarea>
                    </div>
                    <button
                      className="px-5 py-3 text-white rounded-md text-sm"
                      style={{ backgroundColor: "var(--blue)" }}
                    >
                      Post a review
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {termsAndCondition && (
        <div className="fixed z-40 max-w-lg w-full p-4 bg-white rounded-md top-0 border border-gray-200 h-screen left-1/2 transform -translate-x-1/2">
          <h4
            style={{ fontFamily: "Opensans-bold" }}
            className="flex items-center justify-between"
          >
            Terms and Conditions
            <FaTimes
              className="text-red-500 cursor-pointer"
              onClick={() => setTermsAndCondition(false)}
            />
          </h4>
          <hr className="my-2" />
          <div
            className="mt-2 h-full overflow-y-auto pb-10"
            dangerouslySetInnerHTML={{ __html: website?.termsandconditions }}
          ></div>
        </div>
      )}

      <Footer />
    </>
  );
}

Index.getInitialProps = ({ query }) => {
  return {
    id: query.id,
  };
};

export default Index;
