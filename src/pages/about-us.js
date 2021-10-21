import React from "react";
import Header from "../components/website/Header";
import Footer from "../components/website/Footer";
import Head from "next/head";

function AboutUs() {
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
              Know More About Us
            </h2>
          </div>
        </div>
        {/**e2nds **/}
        <div className="md:p-10 p-3 bg-white grid grid-cols-1 md:grid-cols-2 ">
          <div className="md:mr-5 h-96">
            <img
              src="/images/website/aboutus1.jpg"
              className="w-full h-full object-cover"
              alt="aboutus"
            />
          </div>
          <div className="md:ml-5 md:mt-0 mt-5">
            <h5 className="mt-1" style={{ fontFamily: "Opensans-semi-bold" }}>
              Welcome to our company website
            </h5>
            <div
              className="mt-3 leading-5 text-justify"
              style={{ fontFamily: "Opensans-regular", fontSize: "14px" }}
            >
              <p className="text-gray-500 block">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters.
              </p>
              <p className="text-gray-500 block mt-3">
                As opposed to using 'Content here, content here', making it look
                like readable English. Many desktop publishing packages and web
                page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover many web sites still
                in their infancy.
              </p>
              <p className="text-gray-500 block mt-3">
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
          </div>
        </div>
        <hr className=" my-3 w-full" />
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
