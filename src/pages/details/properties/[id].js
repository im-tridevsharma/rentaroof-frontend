import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../../components/website/Header";
import Footer from "../../../components/website/Footer";
import Breadcrumb from "../../../components/website/Breadcrumb";
import PropertyIbo from "../../../components/website/PropertyIbo";
import { FiCheck, FiStar } from "react-icons/fi";
import {
  getPropertyByCode,
  getUserProperty,
  saveUserProperty,
} from "../../../lib/frontend/properties";
import Loader from "../../../components/loader";
import moment from "moment";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import EssentialItem from "../../../components/website/EssentialItem";
import { __d } from "../../../server";

function Index() {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [propertyCode, setPropertyCode] = useState(null);
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("key-features");
  const [essential, setEssential] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [amenities, setAmenities] = useState(null);
  const [address, setAddress] = useState(null);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    setPropertyCode(router.query.id);
    //fetch property details
    setIsLoading(true);
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
        if (response?.data.posted_by_data) {
          setUser(response?.data.posted_by_data);
        }
        if (response?.data.amenities_data) {
          setAmenities(response?.data.amenities_data);
        }
        if (response?.data.address) {
          setAddress(response?.data.address);
        }

        const u = localStorage.getItem("LU")
          ? JSON.parse(__d(localStorage.getItem("LU")))
          : false;
        if (u) {
          setProfile(u);
          const updata = {
            user_id: u.id,
            property_id: response?.data.id,
            property_code: response?.data.property_code,
            front_image: response?.data.front_image,
            rating: "",
            type: "visited",
            property_name: response?.data.name,
            property_short_description: response?.data.short_description,
            property_posted_by: response?.data.posted_by_data.first,
          };
          const sres = await saveUserProperty(updata);
          if (sres?.status) {
            setIsLoading(false);
          } else {
            console.error(sres?.error || sres.message);
          }
        }
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
      }

      //check is this property in saved list
      const upres = await getUserProperty({
        type: "saved",
        property_code: router.query.id,
      });
      if (upres?.status) {
        setIsSaved(upres?.data?.length > 0 ? true : false);
      }
    })();
  }, []);

  const changeImage = (e) => {
    document.querySelector("#main-image").src = e.target.src;
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
        type: "saved",
        property_name: property?.name,
        property_short_description: property?.short_description,
        property_posted_by: property?.posted_by_data.first,
      };
      const sres = await saveUserProperty(updata);
      if (sres?.status) {
        setIsLoading(false);
        setIsSaved(true);
        alert("Property saved successfully.");
      } else {
        console.error(sres?.error || sres.message);
        setIsLoading(false);
      }
    } else {
      localStorage.setItem("redirect", router.asPath);
      router.push("/login");
    }
  };

  return (
    <>
      <Head>
        <title>Property - {propertyCode}</title>
      </Head>
      {isLoading && <Loader />}
      <Header />
      <Breadcrumb
        tagline={`Details of selected property ${propertyCode}`}
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
          <div className="flex max-w-3xl w-full flex-col">
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
                  className="w-7 h-7 object-contain"
                />
                <span
                  style={{ borderRightWidth: "1px" }}
                  className="border-gray-200 h-7 mx-4"
                ></span>
                <img
                  src="/icons/proprtydetls/icon_2.png"
                  alt="bookmark"
                  className="w-7 h-7 object-contain cursor-pointer"
                  onClick={saveProperty}
                  title={isSaved ? "Saved Already" : "Save this"}
                />
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
                  Amenities
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
              <p
                style={{
                  fontSize: "1rem",
                  fontFamily: "Opensans-bold",
                }}
                className="text-gray-700 my-3"
              >
                {address?.full_address || "-"}, {address?.pincode || "-"}
              </p>
              <div className="w-full border-gray-200 border-2 rounded-md bg-gray-50">
                <iframe
                  title="Property on map"
                  width="100%"
                  className="h-52 sm:h-80"
                  id="gmap_canvas"
                  src={`https://maps.google.com/maps?q=${
                    encodeURI(address?.full_address) || "India"
                  }&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                ></iframe>
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

              <PropertyIbo />
              <PropertyIbo />
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
          <div className="flex flex-col flex-grow md:ml-5 md:mt-0 mt-5">
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
                  <a className="mt-3 underline block">
                    More properties from this IBO
                  </a>
                </Link>
              ) : (
                <Link href={`/details/landlord/${user?.system_userid}`}>
                  <a className="mt-3 underline block">
                    More properties from this Landlord
                  </a>
                </Link>
              )}
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
                <form name="meeting">
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
                      className="form-input border-gray-200 rounded-md pl-10 h-11"
                      style={{ fontSize: ".95rem" }}
                    />
                  </div>

                  <div className="form-element relative">
                    <label className="form-label" htmlFor="phone">
                      Phone
                      <img
                        src="/icons/proprtydetls/icon_8.png"
                        alt="user"
                        className="absolute top-10 w-5 h-5 object-contain left-3"
                      />
                    </label>
                    <input
                      type="text"
                      id="phone"
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
                    <input
                      type="date"
                      id="date"
                      className="form-input border-gray-200 rounded-md pl-10 h-11"
                      style={{ fontSize: ".95rem" }}
                    />
                  </div>

                  <div className="form-element relative">
                    <label className="form-label" htmlFor="time">
                      Selec Time
                      <img
                        src="/icons/proprtydetls/icon_11.png"
                        alt="user"
                        className="absolute top-10 w-5 h-5 object-contain left-3"
                      />
                    </label>
                    <input
                      type="time"
                      id="time"
                      className="form-input border-gray-200 rounded-md pl-10 h-11"
                      style={{ fontSize: ".95rem" }}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      value="yes"
                      className="h-5 w-5 border-gray-200 mr-2"
                    />
                    <label htmlFor="terms">Accept Terms and Conditions</label>
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
              <p
                className="flex items-center justify-center my-2 border-gray-200 pb-4 mx-3"
                style={{ color: "var(--orange)", borderBottomWidth: "1px" }}
              >
                <FiStar className="mx-2 text-xl" />
                <FiStar className="mx-2 text-xl" />
                <FiStar className="mx-2 text-xl" />
                <FiStar className="mx-2 text-xl" />
                <FiStar className="mx-2 text-xl" />
              </p>
              <div
                className="flex flex-col mx-4 flex-grow md:mt-3 mt-5"
                style={{ fontFamily: "Opensans-bold", fontSize: "1rem" }}
              >
                <p className="flex flex-col">
                  <b style={{ fontFamily: "Opensans-bold" }}>Write a Review</b>
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
                <form name="review" className="w-full mt-5">
                  <div className="form-element">
                    <textarea className="h-40 border-gray-200 rounded-md text-sm"></textarea>
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
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
