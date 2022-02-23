import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";

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
        <div
          className="h-96 w-full"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage:
              "url(https://c.wallhere.com/photos/25/ed/world_trip_travel_bridge_blue_red_vacation_italy-622499.jpg!d)",
          }}
        ></div>
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
          <div className="w-full relative">
            <ul
              className="text-gray-700"
              style={{ fontSize: "16px", fontFamily: "Opensans-regular" }}
            >
              <li className="flex items-center">
                <img src="icons/home/point-icon.png" width="35" height="35" />
                <p className="ml-3">
                  Determine the home's value in the current market for a listing
                  price.
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
                <p className="ml-3">Supervise and/or schedule home showings.</p>
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
                <p className="ml-3">Supervise and/or schedule home showings.</p>
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
                  When a client makes an offer, agents help the owner to try to
                  get the price they want and to obtain a signed Rent-agreement.
                </p>
              </li>
            </ul>
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
      </div>
      <Footer />
    </>
  );
}

export default Services;
