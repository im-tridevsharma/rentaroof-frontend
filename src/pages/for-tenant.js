import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import Carousel from "react-grid-carousel";

function Services() {
  return (
    <>
      <Header />
      <Head>
        <title>For Tenant</title>
        <meta name="title" content="Services" />
        <meta name="keywords" content="services, rental, rent a roof" />
        <meta name="description" content="We offers rental services." />
      </Head>

      <div className="pb-20 bg-white">
        <div>
          <Carousel cols={1} rows={1} gap={0} autoplay={5000} loop>
            <Carousel.Item>
              <div
                className="w-full for-tenant-slider"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage: "url(/images/website/fortenant-bg.jpg)",
                }}
              >
                <div
                  className="absolute bottom-1/2 transform translate-y-1/2 left-20 p-5 rounded-md text-white"
                  style={{ background: "rgba(0,0,0,.3)" }}
                >
                  <h2 style={{ fontFamily: "Opensans-bold" }}>
                    Find Your Dream Home
                  </h2>
                  <h1 style={{ fontFamily: "Opensans-bold" }} className="mt-2">
                    in Delhi
                  </h1>
                  <div className="mt-10">
                    <Link href="/">
                      <a
                        style={{ fontFamily: "Opensans-bold" }}
                        className="px-5 py-4 rounded-full bg-white hover:bg-gray-50 text-gray-700"
                      >
                        Find Now
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="grid h-full grid-cols-1 md:grid-cols-2">
                <div
                  className="w-full"
                  style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                      "url(https://img.freepik.com/free-photo/man-by-truck-guy-delivery-uniform-man-with-clipboard_1157-46192.jpg?w=740)",
                  }}
                ></div>
                <div className="max-w-md w-full flex-col mx-auto text-center flex items-center justify-center">
                  <h2 style={{ fontFamily: "Opensans-bold" }}>
                    Deliver and explain all documents.
                  </h2>
                  <p
                    className="mt-5 text-lg"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    They help their clients navigate all aspects of the home
                    renting process, from finding homes to completing the
                    documentation process.
                  </p>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="grid grid-cols-1 h-full md:grid-cols-2">
                <div
                  className=" w-full"
                  style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                      "url(https://img.freepik.com/free-photo/teamwork-concept-business-peoples-stack-hands-unity-team-success-business_28586-696.jpg?w=740)",
                  }}
                ></div>
                <div className="max-w-md w-full flex-col mx-auto text-center flex items-center justify-center">
                  <h2 style={{ fontFamily: "Opensans-bold" }}>
                    Work with them to craft the initial offer in a rent
                    agreement.
                  </h2>
                  <p
                    className="mt-5 text-lg"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    They help their clients navigate all aspects of the home
                    renting process, from finding homes to completing the
                    documentation process.
                  </p>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="max-w-6xl mt-10 w-full m-auto ">
          <div className="my-20">
            <div className="max-w-6xl w-full m-auto  grid grid-cols-1 md:grid-cols-2 md:space-x-5">
              <div className="flex flex-col justify-center">
                <h2 style={{ fontFamily: "Opensans-bold" }}>For Tenant</h2>
                <p
                  className="text-lg mt-5"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  Typically, people don't have in-depth knowledge about the real
                  estate markets where they wish to rent homes. They need agents
                  to guide them through neighbourhoods and find homes that best
                  suit their needs. Some agents specialize in working with
                  tenants. They help their clients navigate all aspects of the
                  home renting process, from finding homes to completing the
                  documentation process.
                </p>

                <div className="mt-10">
                  <Link href="/signup">
                    <a
                      style={{ fontFamily: "Opensans-bold" }}
                      className="px-5 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
                    >
                      Get Started
                    </a>
                  </Link>
                </div>
              </div>
              <div className="rounded-md overflow-hidden">
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

          <div
            className="grid grid-cols-1 md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0"
            style={{ fontFamily: "Opensans-regular" }}
          >
            <div className="flex flex-col items-center">
              <img
                className="w-52 h-52 object-cover"
                src="https://img.freepik.com/free-vector/flat-people-asking-questions_23-2148929673.jpg?w=740"
              />
              <p className="text-center text-lg">
                Help the clients to locate and view homes that meet their
                requirements.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="w-52 h-52 object-cover"
                src="https://img.freepik.com/free-vector/appointment-booking-mobile-design_23-2148573175.jpg?w=740"
              />
              <p className="text-center text-lg">
                Help them with securing an appointment.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="w-52 h-52 object-cover"
                src="https://img.freepik.com/free-vector/document-signing-partnership-deal-business-consultation-work-arrangement-client-assistant-writing-contract-cartoon-characters_335657-2342.jpg?w=740"
              />
              <p className="text-center text-lg">
                Work with them to craft the initial offer in a rent agreement.
              </p>
            </div>
          </div>

          <div
            className="mt-10 grid grid-cols-1 md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0"
            style={{ fontFamily: "Opensans-regular" }}
          >
            <div className="flex flex-col items-center">
              <img
                className="w-52 h-52 object-cover"
                src="https://img.freepik.com/free-vector/b2b-strategy-commercial-transaction-partner-agreement-partnership-arrangement-successful-collaboration-businessmen-shaking-hands-cartoon-characters-vector-isolated-concept-metaphor-illustration_335657-2760.jpg?w=740"
              />
              <p className="text-center text-lg">
                After the rent agreement is executed, coordinate the transaction
                process.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="w-52 h-52 object-cover"
                src="https://img.freepik.com/free-vector/documents-concept-illustration_114360-138.jpg?w=740"
              />
              <p className="text-center text-lg">
                Deliver and explain all documents.
              </p>
            </div>

            <div className="flex flex-col items-center">
              <img
                className="w-52 h-52 object-cover"
                src="https://img.freepik.com/free-vector/realty-agent-holding-keys-standing-near-building-isolated-flat-vector-illustration-cartoon-woman-house-sale_74855-8548.jpg?w=826"
              />
              <p className="text-center text-lg">
                Work with them through the closing and getting their keys.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
