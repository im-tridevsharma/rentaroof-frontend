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
        <div className="md:px-8 px-3">
          <hr className=" my-3 w-full" />
        </div>
        {/**team */}
        <div className="mt-5 md:px-10 px-3">
          <h4
            className="text-center"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            Meet our Team
          </h4>
          <div className="mt-5 grid sm:grid-cols-2 md:grid-cols-4 md:space-x-7 mb-5">
            <div
              className="h-80 flex flex-col items-center justify-end md:m-0 m-4"
              style={{
                backgroundImage:
                  "url(https://pbs.twimg.com/profile_images/1001332003474567169/vDCiE04W_400x400.jpg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.4)",
              }}
            >
              <h5
                style={{ fontFamily: "Opensans-bold" }}
                className="text-white"
              >
                Jessica Melly
              </h5>
              <p
                className="text-gray-100 mb-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                Rent Manager
              </p>
            </div>
            <div
              className="h-80 flex flex-col items-center justify-end md:m-0 m-4"
              style={{
                backgroundImage:
                  "url(https://pbs.twimg.com/profile_images/974736784906248192/gPZwCbdS.jpg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.4)",
              }}
            >
              <h5
                style={{ fontFamily: "Opensans-bold" }}
                className="text-white"
              >
                Peter Melly
              </h5>
              <p
                className="text-gray-100 mb-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                Team Leader
              </p>
            </div>
            <div
              className="h-80 flex flex-col items-center justify-end md:m-0 m-4"
              style={{
                backgroundImage:
                  "url(http://garwaresuncontrol.com/wp-content/uploads/2018/08/sortcode-04-500x500.jpg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",

                boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.4)",
              }}
            >
              <h5
                style={{ fontFamily: "Opensans-bold" }}
                className="text-white"
              >
                Monica Garware
              </h5>
              <p
                className="text-gray-100 mb-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                Head Manager
              </p>
            </div>
            <div
              className="h-80 flex flex-col items-center justify-end md:m-0 m-4"
              style={{
                backgroundImage:
                  "url(https://www.kapsolo.com/images/team/team-3.jpg)",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                boxShadow: "inset 0 0 0 200px rgba(0, 0, 0, 0.4)",
              }}
            >
              <h5
                style={{ fontFamily: "Opensans-bold" }}
                className="text-white"
              >
                Patrick Pool
              </h5>
              <p
                className="text-gray-100 mb-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                Leading Consultant
              </p>
            </div>
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
        {/**terms and conditions */}
        <div className="md:px-16 px-3 mt-5">
          <h4 style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}>
            Our Terms & Conditions
          </h4>
          <div
            className="mt-3 leading-5 text-gray-500 border-b border-gray-300 pb-5 mb-5"
            style={{ fontFamily: "Opensans-regular", fontSize: ".85rem" }}
          >
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
            <p className="mt-3">
              Why do we use it? It is a long established fact that a reader will
              be distracted by the readable content of a page when looking at
              its layout. The point of using Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              'Content here, content here', making it look like readable
              English. Many desktop publishing packages and web page editors now
              use Lorem Ipsum as their default model text, and a search for
              'lorem ipsum' will uncover many web sites still in their infancy.
              Various versions have evolved over the years, sometimes by
              accident, sometimes on purpose (injected humour and the like).
            </p>
          </div>
        </div>
        {/**privacy and policy */}
        <div className="md:px-16 px-3 mt-5">
          <h4 style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}>
            Privacy policy
          </h4>
          <div
            className="mt-3 leading-5 text-gray-500 border-b border-gray-300 pb-5 mb-5"
            style={{ fontFamily: "Opensans-regular", fontSize: ".85rem" }}
          >
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
        {/**refund and policy */}
        <div className="md:px-16 px-3 mt-5">
          <h4 style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}>
            Refund policy
          </h4>
          <div
            className="mt-3 leading-5 mb-5"
            style={{ fontFamily: "Opensans-regular", fontSize: ".85rem" }}
          >
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
