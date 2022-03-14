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
        <title>For Homeowner</title>
        <meta name="title" content="Services" />
        <meta name="keywords" content="services, rental, rent a roof" />
        <meta name="description" content="We offers rental services." />
      </Head>

      <div className=" bg-white">
        <div className="py-2" style={{ backgroundColor: "#faf8fa" }}>
          <div className="md:px-20 pb-10 md:pb-28 px-5 grid grid-cols-1 md:grid-cols-2 md:space-x-5 md:space-y-0 space-y-5">
            <div className="relative p-10 md:pt-24">
              <img
                src="https://animoto.com/static/RedSwipe-0a3c66075a383e378d143e27489ce2ca.svg"
                className="h-32 object-contain absolute left-0"
              />
              <img src="https://img.freepik.com/free-photo/sale-handsome-realtor-waiting-visitors-rent-new-home-ownership-confident-man-outside_545934-6596.jpg?w=740" />
              <img
                src="https://animoto.com/static/GreenCircle-181444214f6f5a5b89d3a72a75e25732.svg"
                className="h-32 object-contain absolute right-0 bottom-0"
              />
            </div>

            <div className="flex justify-start flex-col md:pt-20 pt-5">
              <h3 style={{ fontFamily: "Opensans-bold" }} className="mb-5">
                Homeowner Title
              </h3>
              <p className="text-lg" style={{ fontFamily: "Opensans-regular" }}>
                When homeowners decide they want to put up their home for
                rent/sale, the vast majority will call a real estate brokerage
                firm to work with an agent to get their homes listed on the
                local Multiple Listing Service.
              </p>
              <p
                className="text-lg mt-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                This database is shared among all local brokerage members, who
                then work to bring in a tenant for the home. In listing a home,
                the real estate agent will be performing the following duties
                and activities.
              </p>
              <div className="mt-10 mb-5">
                <Link href="/signup">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="px-5 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
                  >
                    Sign Up
                  </a>
                </Link>
              </div>
              <p style={{ fontFamily: "Opensans-semi-bold" }}>
                Already joined us?
                <Link href="/login">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="text-blue-500 ml-3"
                  >
                    Login
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <h2 style={{ fontFamily: "Opensans-bold" }}>How we process?</h2>
          <p
            className="text-lg mt-5"
            style={{ fontFamily: "Opensans-regular" }}
          >
            When a client makes an offer, agents help the owner to try to get
            the price they want and to obtain a signed Rent-agreement.
          </p>
        </div>
        <div
          className="max-w-6xl mt-10 md:mt-20 w-full m-auto  grid grid-cols-1 md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0"
          style={{ fontFamily: "Opensans-regular" }}
        >
          <div className="flex flex-col items-center p-5 border shadow-sm rounded-sm pt-3">
            <img
              className="w-52 h-52 object-cover"
              src="https://img.freepik.com/free-vector/online-document-form-digital-agreement-electronic-contract-internet-questionnaire-list-note-voting-ballot-poll-flat-design-element_335657-2667.jpg?w=740"
            />
            <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
              Renting title
            </h3>
            <p className="text-center text-lg">
              Determine the home's value in the current market for a listing
              price.
            </p>
          </div>

          <div className="flex flex-col items-center p-5 border shadow-sm rounded-sm pt-3">
            <img
              className="w-52 h-52 object-cover"
              src="https://img.freepik.com/free-vector/real-estate-business-concept-choosing-finding-home-flat-vector-illustration_566886-1053.jpg?w=740"
            />
            <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
              Renting title
            </h3>
            <p className="text-center text-lg">
              Advise the homeowner in readying the home for listing and
              showings.
            </p>
          </div>

          <div className="flex flex-col items-center p-5 border shadow-sm rounded-sm pt-3">
            <img
              className="w-52 h-52 object-cover"
              src="https://img.freepik.com/free-vector/flat-design-concept-sales-social-media-digital-marketing_18660-487.jpg?w=740"
            />
            <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
              Renting title
            </h3>
            <p className="text-center text-lg">
              Market the home to other agents and brokerage members of R-A-R.
            </p>
          </div>
        </div>
        <div className="py-10 mt-20" style={{ backgroundColor: "#faf8fa" }}>
          <div className="max-w-6xl w-full m-auto  grid grid-cols-1 md:grid-cols-2 md:space-x-5">
            <div className="flex flex-col justify-center">
              <h2 style={{ fontFamily: "Opensans-bold" }}>
                Reting your house is an ease.
              </h2>
              <p
                className="text-lg mt-5"
                style={{ fontFamily: "Opensans-regular" }}
              >
                In publishing and graphic design, Lorem ipsum is a placeholder
                text commonly used to demonstrate the visual form of a document
                or a typeface without relying on meaningful content. Lorem ipsum
                may be used as a placeholder before the final copy is testing.
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

        <div className="py-10 bg-white">
          <div className="max-w-6xl w-full m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 space-y-5 md:space-y-0">
              <div className="-mt-10">
                <img src="https://img.freepik.com/free-vector/coffee-break-concept-illustration_114360-2931.jpg?2&w=740" />
              </div>
              <div className="">
                <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
                  Section Title
                </h3>
                <p
                  className="text-lg mt-3"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  In publishing and graphic design, Lorem ipsum is a placeholder
                  text commonly used to demonstrate the visual form of a
                  document or a typeface without relying on meaningful content.
                  Lorem ipsum may be used as a placeholder before the final copy
                  is testing.
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
            </div>
          </div>
        </div>

        <div className="py-10 bg-gray-50">
          <div className="max-w-6xl w-full m-auto">
            <h3 style={{ fontFamily: "Opensans-bold" }} className="mb-5">
              Section Title
            </h3>
            <p
              className="text-lg mt-3"
              style={{ fontFamily: "Opensans-regular" }}
            >
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is testing.
            </p>
            <p
              className="text-lg mt-3"
              style={{ fontFamily: "Opensans-regular" }}
            >
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is testing.
            </p>
            <div className="mt-10 mb-5">
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
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
