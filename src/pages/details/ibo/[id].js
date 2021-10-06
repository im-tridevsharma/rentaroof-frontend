import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../../components/website/Header";
import Footer from "../../../components/website/Footer";
import Breadcrumb from "../../../components/website/Breadcrumb";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { RiChatQuoteLine } from "react-icons/ri";
import { ImQuotesLeft } from "react-icons/im";
import PropertyIbo from "../../../components/website/PropertyIbo";

function Index() {
  const router = useRouter();
  const [ibo, setIbo] = useState("");

  useEffect(() => {
    setIbo(router.query.id);
  }, []);

  return (
    <>
      <Head>
        <title>Details of {ibo}</title>
      </Head>
      <Header />
      <Breadcrumb
        center={true}
        large={true}
        tagline="Find your dream Home. We are here to guide you!"
      />
      <div className="flex flex-col p-5 relative">
        {/**user card */}
        <div
          className="flex items-center justify-between sm:flex-row flex-col p-5 bg-white  max-w-3xl w-full shadow-md -mt-20 border-2 border-gray-300"
          style={{
            marginLeft: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex items-center justify-center flex-col">
            <img
              src="/images/faces/m1.png"
              alt="user"
              className="w-28 h-28 object-cover rounded-full border-2 border-gray-500 mb-2"
            />
            <p className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
              <span className="font-semibold">Status</span>
            </p>
          </div>

          {/**details */}
          <div
            className="sm:border-gray-200 py-5 sm:py-0 sm:px-10 border-transparent"
            style={{ borderLeftWidth: "1px", fontFamily: "Opensans-semi-bold" }}
          >
            <p
              className="uppercase"
              style={{ fontFamily: "Opensans-bold", fontSize: ".95rem" }}
            >
              Agent Details
            </p>
            <p className="mt-2">
              <b className="mr-1">Name:</b>
              <span className="uppercase">St Gorge</span>
            </p>
            <p className="flex items-center">
              <img
                src="/icons/proprtydetls/icon23.png"
                className=" -ml-5 mr-1"
                alt="location"
              />
              <span>Banglore, Karnatka, India</span>
            </p>
            <p style={{ color: "var(--blue)" }} className="my-2">
              Operating since 2010
            </p>
            <p className="flex items-center">
              <img
                src="/icons/proprtydetls/icon24.png"
                className="-ml-5 mr-1"
                alt="location"
              />
              <span className="text-lg" style={{ color: "purple" }}>
                Certified Agent
              </span>
            </p>
          </div>

          {/**details */}
          <div
            className="sm:border-gray-200 sm:px-7 border-transparent"
            style={{ borderLeftWidth: "1px", fontFamily: "Opensans-semi-bold" }}
          >
            <p
              className="uppercase"
              style={{ fontFamily: "Opensans-bold", fontSize: ".95rem" }}
            >
              Contact via:
            </p>

            <p className="flex items-center mt-2">
              <img
                src="/icons/proprtydetls/icon25.png"
                className="mr-1"
                alt="location"
              />
              <span>9985748393</span>
            </p>
            <p className="flex items-center mt-2">
              <img
                src="/icons/proprtydetls/icon26.png"
                className="mr-1 w-5 h-5 object-contain"
                alt="location"
              />
              <span>user@gmail.com</span>
            </p>
            <p className="flex items-center mt-2">
              <img
                src="/icons/proprtydetls/icon27.png"
                className="mr-1 w-5 h-5 object-contain"
                alt="location"
              />
              <Link href="/tenant/chat">
                <a style={{ color: "purple" }}>Chat</a>
              </Link>
            </p>
          </div>
        </div>
        {/**rating card */}
        <div
          style={{ fontFamily: "Opensans-bold" }}
          className="border-2 border-gray-200 py-2 px-5 flex sm:flex-row flex-col items-center bg-white max-w-3xl w-full mx-auto mt-4 rounded-md justify-between"
        >
          <p
            style={{ fontSize: ".95rem", borderRightWidth: "1px" }}
            className="flex items-center flex-col sm:border-gray-200 border-transparent sm:pr-14"
          >
            <b>Properties for Rent</b>
            <span className="mt-3" style={{ color: "purple" }}>
              16
            </span>
          </p>
          <p
            style={{ fontSize: ".95rem" }}
            className="flex items-center flex-col sm:pr-14  mt-3 sm:mt-0"
          >
            <b>Price Range</b>
            <span className="mt-3" style={{ color: "purple" }}>
              Rs. 25,000 - 12 Lacs
            </span>
          </p>
          <p
            style={{ fontSize: ".95rem", borderLeftWidth: "1px" }}
            className="flex items-center flex-col sm:border-gray-200 border-transparent mt-3 sm:mt-0  sm:pl-12"
          >
            <b>Rating & Review</b>
            <span
              className="mt-3 flex items-center"
              style={{ color: "purple" }}
            >
              <span
                className="px-4 py-2 rounded-md flex items-center justify-center text-white"
                style={{ backgroundColor: "var(--blue)" }}
              >
                4.5
              </span>
              <spam className="ml-1">20</spam>
              <div
                className="flex items-center ml-3"
                style={{ color: "var(--orange)" }}
              >
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>
            </span>
          </p>
        </div>
        {/**other section */}
        <div className="flex mt-20 md:flex-row flex-col">
          {/**properties */}
          <div className="flex flex-col flex-grow">
            <p
              style={{ fontFamily: "Opensans-bold", fontSize: "1rem" }}
              className="border-b-2 border-gray-200 pb-3"
            >
              Properties for rent
            </p>

            {/**properties */}
            <div className="md:mx-5 mt-3">
              <PropertyIbo />
              <PropertyIbo />
              <PropertyIbo />
            </div>
            <div
              className="flex items-center cursor-pointer justify-center md:mx-5 mt-2 border-gray-200 rounded-md text-center uppercase bg-white py-3 shadow-sm"
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
          {/**contact details */}
          <div className="flex flex-col max-w-sm w-full">
            <div
              className=" border-gray-200  mx-3 mt-7 pb-5 rounded-md overflow-hidden shadow-md"
              style={{ borderWidth: "1px" }}
            >
              <p
                className="text-center p-5 text-white"
                style={{
                  backgroundColor: "var(--primary-color)",
                  fontFamily: "Opensans-regular",
                }}
              >
                Contact Details
              </p>
              <form
                name="callback"
                className="mx-5 mt-5"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-element">
                  <div className="form-label">Name</div>
                  <input
                    type="text"
                    className="form-input rounded-md border-gray-200 h-10"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label">Email</div>
                  <input
                    type="email"
                    className="form-input rounded-md border-gray-200 h-10"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label">Phone</div>
                  <input
                    type="text"
                    className="form-input rounded-md border-gray-200 h-10"
                  />
                </div>
                <div className="text-center">
                  <button
                    className="uppercase px-5 py-3 text-white rounded-md text-xs"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  >
                    Request a callback
                  </button>
                </div>
              </form>
            </div>
            {/**rate us */}
            <div
              className=" border-gray-200 flex items-center flex-col  mx-3 mt-3 pb-5 rounded-md overflow-hidden shadow-md"
              style={{ borderWidth: "1px" }}
            >
              <p
                className="pt-2 uppercase"
                style={{
                  fontFamily: "Opensans-bold",
                }}
              >
                Rate Us
              </p>
              <p
                className="flex items-center mt-6"
                style={{ color: "var(--orange)" }}
              >
                <FiStar className="mx-4 text-lg" />
                <FiStar className="mx-4 text-lg" />
                <FiStar className="mx-4 text-lg" />
                <FiStar className="mx-4 text-lg" />
                <FiStar className="mx-4 text-lg" />
              </p>
            </div>
          </div>
        </div>
        {/**review section */}
        <div className="border-t-2 border-gray-200 mt-8 px-2 py-4 flex md:flex-row flex-col">
          {/**top review */}
          <div className="flex flex-col max-w-lg w-full">
            <p
              style={{ fontFamily: "Opensans-bold" }}
              className="flex items-center ml-5"
            >
              Top Customer Feedback{" "}
              <RiChatQuoteLine className="text-3xl ml-2" />
            </p>
            <div
              className="flex flex-col p-5 border-gray-200 mt-4 rounded-sm"
              style={{ borderWidth: "1px" }}
            >
              <p>
                <ImQuotesLeft
                  className="text-3xl"
                  style={{ color: "var(--primary-color)" }}
                />
              </p>
              <p className="text-gray-500 mt-2">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>

              <p className="mt-2 text-gray-500">
                It has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
              <p
                className="mt-2"
                style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}
              >
                - by Ommi Shankar
              </p>
            </div>
          </div>
          {/**write a review */}
          <div
            className="flex flex-col md:ml-10 flex-grow md:mt-0 mt-5"
            style={{ fontFamily: "Opensans-regular" }}
          >
            <p className="flex flex-col">
              <b style={{ fontFamily: "Opensans-bold" }}>Write a Review</b>
              <span className="text-gray-600">
                Share your thoughts with another customer.
              </span>
            </p>
            <form name="review" className="w-full mt-5">
              <div className="form-element">
                <textarea className="h-40 border-gray-200 rounded-md text-sm"></textarea>
              </div>
              <button
                className="px-2 py-3 text-white rounded-sm"
                style={{ backgroundColor: "var(--blue)" }}
              >
                Post a review
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
