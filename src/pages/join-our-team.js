import React from "react";
import Head from "next/head";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";

function Ibo() {
  return (
    <>
      <Header />
      <Head>
        <title>IBO</title>
        <meta name="title" content="IBO" />
        <meta name="keywords" content="About IBO, Our Star IBOs" />
        <meta name="description" content="Our IBOs" />
      </Head>
      <>
        <div
          className="for-tenant-slider"
          style={{ backgroundColor: "#faf8fa" }}
        >
          <img
            className="h-32 object-contain absolute"
            src="https://animoto.com/static/YellowCorner-d367eaf0eeff2a90f1d4d374e3b1c3e8.svg"
          />
          <div className="max-w-6xl h-full w-full mx-auto grid grid-cols-1 md:grid-cols-2 md:space-x-5">
            <div className="flex h-full justify-end flex-col pb-10 md:pr-10">
              <h1 style={{ fontFamily: "Opensans-bold" }} className="my-4">
                Join
              </h1>
              <h1 style={{ fontFamily: "Opensans-bold" }}>Our Team</h1>
              <p
                style={{ fontFamily: "Opensans-regular" }}
                className="text-lg mt-5"
              >
                Rent-A-Roof is a revolutionary business plan to give all
                brokers/real estate agents the platform to join together and
                form an association of Real Estate Agents throughout Delhi NCR
                and ultimately all of India.
              </p>
              <div className="mt-10">
                <Link href="/list-property">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="px-5 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
                  >
                    Get Started
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-end pb-20">
              <video
                controls
                playsinline
                loop
                data-src="https://d2of6bhnpl91ni.cloudfront.net/cms/1920x1080_Final_2020_Real Estate LP-b2c23b6555.mp4"
                src="https://d2of6bhnpl91ni.cloudfront.net/cms/1920x1080_Final_2020_Real Estate LP-b2c23b6555.mp4"
              ></video>
            </div>
          </div>
        </div>
        <div className="pb-10 pt-5 max-w-6xl w-full m-auto bg-white">
          <div className="mt-20 text-gray-700">
            <h3 className="text-center" style={{ fontFamily: "Opensans-bold" }}>
              What are the duties of a Real Estate Agent?
            </h3>
            <div
              className="mt-20 grid grid-cols-1 md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-40 h-40 object-cover"
                  src="https://img.freepik.com/free-vector/messaging-fun-concept-illustration_114360-1870.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Respond to texts, emails, <br />
                  and phone calls.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-40 h-40 object-cover"
                  src="https://img.freepik.com/free-vector/document-signing-partnership-deal-business-consultation-work-arrangement-client-assistant-writing-contract-cartoon-characters_335657-2342.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Process real estate documents, agreements, and lease records.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-40 h-40 object-cover"
                  src="https://img.freepik.com/free-vector/appointment-booking-mobile-design_23-2148573175.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Coordinate appointments, showings, open houses, and meetings.
                </p>
              </div>
            </div>
            <div className="mt-14 flex justify-center">
              <Link href="/signup/ibo">
                <a
                  style={{ fontFamily: "Opensans-bold" }}
                  className="px-5 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
                >
                  Get Started
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#faf8fa" }} className="py-10">
          <div className="max-w-6xl w-full mx-auto">
            <h3
              className=" text-gray-700"
              style={{ fontFamily: "Opensans-bold" }}
            >
              What are the benefits of joining
              <br /> our team?
            </h3>
            <div className="grid mt-16 grid-cols-1 md:grid-cols-3 md:space-x-5 md:space-y-5 space-y-5">
              <div className="flex items-start justify-between mt-5">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1253/1253323.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Brand Name
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    When you join our team you will be given R-A-R gear
                    providing greater trust to clients & customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/852/852967.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Pre-defined documentation process
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    One of the biggest benefits of joining R-A-R has to be our
                    process right through our website and app.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1255/1255740.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Payment gateway
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    To provide greater trust to clients & customers we have the
                    option of the payment being processed through our payment
                    gateway guaranteeing a systematic and trustworthy payment
                    procedure.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1118/1118193.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Service Charges
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Service Charges will be deposited to all agents who work
                    hard and close deals. There is no cap to the incentives you
                    can earn with R-A-R!
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1245/1245813.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    New properties
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    One disadvantage of being a local Real estate agent is
                    limited number of properties in your personal database but
                    with R-A-R you don’t need to worry about that as agents will
                    have the opportunity to show and facilitate unassigned
                    properties posted by homeowners.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1241/1241603.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Support & Training
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Special support will be provided to all agents who join our
                    team. And all new joining agents will be provided soft
                    skills training as well as basic guidelines that all R-A-R
                    agents must follow along with the training on how to use our
                    platform for maximising it’s potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}

export default Ibo;
