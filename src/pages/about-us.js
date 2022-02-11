import React from "react";
import Header from "../components/website/Header";
import Footer from "../components/website/Footer";
import Head from "next/head";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";

function AboutUs() {
  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  return (
    <>
      <Header />
      <Head>
        <title>About Us</title>
        <meta name="title" content="About Us" />
        <meta name="keywords" content="About Us, Rent a Roof" />
        <meta name="description" content="About Rent a roof" />
      </Head>
      {/**page content goes here */}
      <div className="w-full flex flex-col">
        {/**header */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-56 bg-gray-50">
          <div
            className="h-56"
            style={{
              backgroundImage: "url(/images/website/aboutus2.jpg)",
              backgroundPosition: "left",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="h-full flex items-center px-3">
            <h2 style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}>
              {website?.aboutus_banner_title}
            </h2>
          </div>
        </div>
        {/**e2nds **/}
        <div className="md:p-10 p-3 bg-white grid grid-cols-1 md:grid-cols-2 ">
          <div className="md:mr-5 h-96">
            <img
              src="/images/website/aboutus1.jpg"
              className="w-full h-full object-cover rounded-md"
              alt="aboutus"
            />
          </div>
          <div className="md:ml-5 px-10 md:mt-0 mt-5">
            <h3 className="mt-1" style={{ fontFamily: "Opensans-bold" }}>
              {website?.aboutus_welcome_title}
            </h3>
            <div
              className="mt-5 leading-5 text-justify"
              style={{ fontFamily: "Opensans-regular", fontSize: "14px" }}
            >
              <p className="text-gray-500 block text-lg">
                {website?.aboutus_welcome_description}
              </p>
            </div>
          </div>
        </div>
        {/**e2nds **/}
        <div className="mt-20 bg-white grid grid-cols-1 md:grid-cols-2 ">
          <div className="md:mr-5 px-10 md:mt-0 mt-5">
            <h3 className="mt-1" style={{ fontFamily: "Opensans-bold" }}>
              What we do!
            </h3>
            <div
              className="mt-5 leading-5 text-justify"
              style={{ fontFamily: "Opensans-regular", fontSize: "14px" }}
            >
              <p className="text-gray-500 block text-lg">
                {website?.aboutus_welcome_description}
              </p>
            </div>
          </div>
          <div className="md:mr-10 h-96">
            <img
              src="/images/website/aboutus1.jpg"
              className="w-full h-full object-cover rounded-md"
              alt="aboutus"
            />
          </div>
        </div>

        <div className="px-10 text-gray-500 grid grid-cols-1 md:grid-cols-2 md:space-x-10 mt-20">
          <div className="p-5 shadow-md rounded-lg">
            <h3
              className="text-gray-800"
              style={{ fontFamily: "Opensans-bold" }}
            >
              IBO
            </h3>
            <p className="text-lg mt-5">
              {website?.aboutus_welcome_description}
            </p>
            <p className="mt-5">
              <Link href="/ibo">
                <a className="text-lg text-blue-600">Know More</a>
              </Link>
            </p>
          </div>
          <div className="p-5 shadow-md rounded-lg">
            <h3
              className="text-gray-800"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Landlord
            </h3>
            <p className="text-lg mt-5">
              {website?.aboutus_welcome_description}
            </p>
            <p className="mt-5">
              <Link href="/owners">
                <a className="text-lg text-blue-600">Know More</a>
              </Link>
            </p>
          </div>
        </div>

        {/**3rd */}
        <div
          className="h-60 mt-5 mb-5 flex flex-col items-center justify-center text-white"
          style={{
            backgroundPosition: "center",
            backgroundImage: "url(/images/website/aboutus3.jpg)",
            borderImageRepeat: "no-repeat",
            backgroundSize: "cover",
            fontFamily: "Opensans-bold",
            boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.3)",
          }}
        >
          <h5 className="text-3xl md:ml-10 md:px-0 px-3 text-center">
            We are here to help you
          </h5>
          <h6 className="text-2xl md:ml-60 ml-10 text-center">
            with some of the important points
          </h6>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
