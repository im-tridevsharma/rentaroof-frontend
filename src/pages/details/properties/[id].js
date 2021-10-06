import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../../components/website/Header";
import Footer from "../../../components/website/Footer";
import Breadcrumb from "../../../components/website/Breadcrumb";
import PropertyIbo from "../../../components/website/PropertyIbo";
import { FiCheck } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

function Index() {
  const router = useRouter();
  const [property, setProperty] = useState("");
  const [activeTab, setActiveTab] = useState("key-features");

  useEffect(() => {
    setProperty(router.query.id);
  }, []);

  const changeImage = (e) => {
    document.querySelector("#main-image").src = e.target.src;
  };

  return (
    <>
      <Head>
        <title>Property - {property}</title>
      </Head>
      <Header />
      <Breadcrumb
        tagline={`Details of selected property ${property}`}
        path="Home / Property List / Property Details"
      />
      <div className="flex flex-col p-5 relative">
        {/**gallery */}
        <div className="flex md:flex-row flex-col">
          {/**main image */}
          <div className="flex max-w-6xl w-full max-h-128 overflow-hidden md:mr-5">
            <img
              src="/images/website/building.jpg"
              alt="p1"
              id="main-image"
              className="rounded-sm w-full h-full object-cover"
            />
          </div>
          {/**images */}
          <div className="md:w-40 flex md:flex-col flex-row w-full mt-4 md:max-h-128 overflow-hidden md:overflow-y-auto overflow-x-auto md:overflow-x-hidden">
            <img
              src="/images/website/building.jpg"
              alt="p1"
              className="my-1 mx-1 md:mx-0 h-28 object-cover rounded-sm cursor-pointer"
              onClick={changeImage}
            />
            <img
              src="/images/website/big-city.jpg"
              alt="p2"
              className="my-1 mx-1 md:mx-0 h-28 object-cover rounded-sm cursor-pointer"
              onClick={changeImage}
            />
            <img
              src="/images/website/home-house.jpg"
              alt="p3"
              className="my-1 mx-1 md:mx-0 h-28 object-cover rounded-sm cursor-pointer"
              onClick={changeImage}
            />
            <img
              src="/images/website/night.jpg"
              alt="p4"
              className="my-1 mx-1 md:mx-0 h-28 object-cover rounded-sm cursor-pointer"
              onClick={changeImage}
            />
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
                Apartment in the two-family house not far from Berlin
              </p>
              <p className="flex items-center">
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
                  className="w-7 h-7 object-contain"
                />
              </p>
            </div>
            <p
              style={{
                color: "var(--primary-color)",
                fontFamily: "Opensans-bold",
              }}
              className="text-lg"
            >
              Rs. 1,80,000
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
                  3 BHK
                </span>
                <span className="flex items-center py-3 border-gray-200 px-4 border-r-2">
                  <img
                    src="/icons/proprtydetls/icon_4.png"
                    alt="bhk"
                    className="mr-2 w-5 h-5 object-contain"
                  />
                  3 Bathroom
                </span>
                <span className="flex items-center py-3 border-gray-200 px-4 border-r-2">
                  <img
                    src="/icons/proprtydetls/icon_5.png"
                    alt="bhk"
                    className="mr-2 w-5 h-5 object-contain"
                  />
                  2 Floor
                </span>
                <span className="flex items-center py-3">
                  <img
                    src="/icons/proprtydetls/icon_6.png"
                    alt="bhk"
                    className="mr-2 w-5 h-5 object-contain"
                  />
                  2 Balcony
                </span>
              </p>
              <p
                className="px-4 py-1 flex items-center justify-evenly text-gray-600"
                style={{ fontFamily: "Opensans-bold" }}
              >
                <span className="flex flex-col py-1 border-gray-200 pr-10 border-r-2">
                  <b className="uppercase">Property Type</b>
                  <span
                    className="leading-3 text-xs font-semibold"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Detached
                  </span>
                </span>
                <span className="flex flex-col py-1 border-gray-200 pr-10 border-r-2">
                  <b className="uppercase">Built Up Area</b>
                  <span
                    className="leading-3 text-xs font-semibold"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    765 sq.ft
                  </span>
                </span>
                <span className="flex flex-col py-1">
                  <b className="uppercase">Property ID</b>
                  <span
                    className="leading-3 text-xs font-semibold"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    IB8939883
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
                  <ul
                    className="list-inside text-gray-600"
                    style={{
                      fontFamily: "Opensans-regular",
                      listStyleType: "square",
                    }}
                  >
                    <li className="pl-1 my-3">
                      In publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without relying on
                      meaningful content.
                    </li>
                    <li className="pl-1 my-3">
                      In publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without relying on
                      meaningful content.
                    </li>
                  </ul>
                )}

                {activeTab === "about" && (
                  <div className="px-2 text-gray-600 mt-3">
                    <p>
                      In publishing and graphic design, Lorem ipsum is a
                      placeholder text commonly used to demonstrate the visual
                      form of a document or a typeface without relying on
                      meaningful content. In publishing and graphic design,
                      Lorem ipsum is a placeholder text commonly used to
                      demonstrate the visual form of a document or a typeface
                      without relying on meaningful content.
                    </p>
                  </div>
                )}

                {activeTab === "amenities" && (
                  <div
                    className="grid grid-cols-2 md:grid-cols-3 mt-3"
                    style={{ fontFamily: "Opensans-bold" }}
                  >
                    <div className="flex items-center m-1">
                      <img
                        src="https://styles.redditmedia.com/t5_2u559/styles/communityIcon_x0d8uxqbsf411.png"
                        alt="a1"
                        className="h-8 w-8 object-contain"
                      />
                      <p className="mx-3">Security</p>
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheck className="text-green-600" />
                      </span>
                    </div>

                    <div className="flex items-center m-1">
                      <img
                        src="https://iconarchive.com/download/i107558/google/noto-emoji-travel-places/42487-house-with-garden.ico"
                        alt="a1"
                        className="h-8 w-8 object-contain"
                      />
                      <p className="mx-3">Park & Garden</p>
                      <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <FiCheck className="text-green-600" />
                      </span>
                    </div>

                    <div className="flex items-center m-1">
                      <img
                        src="https://www.freeiconspng.com/uploads/summer-swim-icon-33.png"
                        alt="a1"
                        className="h-8 w-8 object-contain"
                      />
                      <p className="mx-3">Swiming pool</p>
                      <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <FaTimes className="text-red-600" />
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === "price" && (
                  <div className="px-2 mt-3 text-gray-600">
                    <p
                      style={{ fontFamily: "Opensans-bold" }}
                      className="text-xl"
                    >
                      Rs. 1,80,000
                    </p>
                    <p className="text-green-600">Available</p>
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
                Darlington Road, Northallerton, DL6 2XB
              </p>
              <div className="w-full border-gray-200 border-2 rounded-md bg-gray-50">
                <iframe
                  title="Property on map"
                  width="100%"
                  className="h-52 sm:h-80"
                  id="gmap_canvas"
                  src="https://maps.google.com/maps?q=Darlington Road, Northallerton, DL6 2XB&t=&z=13&ie=UTF8&iwloc=&output=embed"
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
                <div className="flex items-center justify-between my-1 md:mr-5">
                  <p className="flex items-center py-2">
                    <img
                      src="/icons/proprtydetls/icon_12.png"
                      alt="e1"
                      className="h-5 w-5 object-contain mr-2"
                    />
                    <span>School</span>
                  </p>
                  <span>1 KM</span>
                </div>

                <div className="flex items-center justify-between my-1 md:mr-5">
                  <p className="flex items-center py-2">
                    <img
                      src="/icons/proprtydetls/icon_13.png"
                      alt="e1"
                      className="h-5 w-5 object-contain mr-2"
                    />
                    <span>Hospital</span>
                  </p>
                  <span>1 KM</span>
                </div>
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
              className="p-6 border-gray-200 text-gray-700"
              style={{
                borderWidth: "1px",
                fontFamily: "Opensans-bold",
                fontSize: "1rem",
              }}
            >
              <p>Markated by</p>
              <p className="mt-3">ST George</p>
              <p>Bangalore, Karnataka, India</p>
              <p className="mt-1" style={{ color: "var(--primary-color)" }}>
                Call : 9283928392
              </p>
              <button
                className="p-3 mt-3 shadow-sm text-white text-sm"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Request Details
              </button>
              <Link href="/details/ibo/ID838HD9">
                <a className="mt-3 underline block">
                  More properties from this IBO
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
