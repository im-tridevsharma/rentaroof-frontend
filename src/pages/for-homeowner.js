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

      <div className="pb-20 bg-white">
        <div className="border-b">
          <Carousel
            cols={1}
            rows={1}
            gap={0}
            autoplay={5000}
            hideArrow={true}
            loop
          >
            <Carousel.Item>
              <div
                className="h-96 w-full"
                style={{
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundImage:
                    "url(https://c.wallhere.com/photos/25/ed/world_trip_travel_bridge_blue_red_vacation_italy-622499.jpg!d)",
                }}
              >
                <div
                  className="absolute bottom-5 left-20 p-5 rounded-md text-white"
                  style={{ background: "rgba(0,0,0,.3)" }}
                >
                  <h2 style={{ fontFamily: "Opensans-bold" }}>
                    Be first to Rent a Roof
                  </h2>
                  <h1 style={{ fontFamily: "Opensans-bold" }}>in Delhi</h1>
                  <div className="mt-20">
                    <Link href="/list-property">
                      <a
                        style={{ fontFamily: "Opensans-bold" }}
                        className="px-5 py-4 rounded-full bg-white hover:bg-gray-50 text-gray-700"
                      >
                        Get Started
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="max-w-md w-full flex-col mx-auto text-center flex items-center justify-center">
                  <h2 style={{ fontFamily: "Opensans-bold" }}>
                    Advise the homeowner in readying the home for listing and
                    showings.
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
                <div
                  className="h-96 w-full"
                  style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                      "url(https://img.freepik.com/free-photo/business-brainstorming-graph-chart-report-data-concept_53876-31213.jpg?w=740)",
                  }}
                ></div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="max-w-md w-full flex-col mx-auto text-center flex items-center justify-center">
                  <h2 style={{ fontFamily: "Opensans-bold" }}>
                    Determine the home's value in the current market for a
                    listing price.
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
                <div
                  className="h-96 w-full"
                  style={{
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundImage:
                      "url(https://img.freepik.com/free-photo/businessman-pointing-place-where-should-sign-document_43919-130.jpg?w=740)",
                  }}
                ></div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="max-w-6xl mt-10  w-full m-auto ">
          <div className="mb-20 relative">
            <h2
              style={{ fontFamily: "Opensans-bold" }}
              className="my-7 text-gray-700"
            >
              For Homeowner
            </h2>
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: "Opensans-regular" }}
            >
              When homeowners decide they want to put up their home for
              rent/sale, the vast majority will call a real estate brokerage
              firm to work with an agent to get their homes listed on the local
              Multiple Listing Service. This database is shared among all local
              brokerage members, who then work to bring in a tenant for the
              home. In listing a home, the real estate agent will be performing
              the following duties and activities:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage:
                  "url(https://cdn.dribbble.com/users/1518181/screenshots/3550089/media/16afb3f417a4927b63e5baf94424a91e.jpg)",
              }}
            ></div>
            <div className="w-full relative">
              <ul
                className="text-gray-700"
                style={{ fontSize: "16px", fontFamily: "Opensans-regular" }}
              >
                <li className="flex items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Determine the home's value in the current market for a
                    listing price.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Advise the homeowner in readying the home for listing and
                    showings.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Enter the home into the Rent-A-Roof database.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Market the home to other agents and brokerage members of
                    R-A-R.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Market the home to other agents and brokerage members of
                    R-A-R.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Supervise and/or schedule home showings.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Market the home on traditional media, as well as on the
                    Internet.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Supervise and/or schedule home showings.
                  </p>
                </li>
                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Report to the Rentor any interest and feedback from clients
                    who have seen the home.
                  </p>
                </li>
                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    When a client makes an offer, agents help the owner to try
                    to get the price they want and to obtain a signed
                    Rent-agreement.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center mt-20">
            <h2
              style={{ fontFamily: "Opensans-bold" }}
              className="my-7 text-gray-700"
            >
              List Your First Property
            </h2>
            <p className="mt-10">
              <Link href="/list-property">
                <a
                  className="py-3 px-10 text-lg rounded-full text-white"
                  style={{ background: "var(--blue)" }}
                >
                  List
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
