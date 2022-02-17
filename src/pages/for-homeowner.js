import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import { FiCheck } from "react-icons/fi";

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

      <div className="pb-20 pt-5 bg-white">
        <div className="max-w-6xl w-full m-auto ">
          <div className="mb-20 relative">
            <h2 style={{ fontFamily: "Opensans-bold" }} className="my-7">
              Renting a house with pleasure.
            </h2>
            <p className="text-lg">
              When homeowners decide they want to put up their home for
              rent/sale, the vast majority will call a real estate brokerage to
              work with an agent to get their homes listed on the local Multiple
              Listing Service (MLS). This database is shared among all local
              brokerage members, who then work to bring in a buyer for the home.
              In listing a home, the real estate agent will be performing the
              following duties and activities:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 relative">
            <div
              className="rounded-md h-96 z-20"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/home-owner.jpg)",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="w-full md:w-1/2 h-full z-10 absolute -bottom-5 -left-0 shadow-lg rounded-md bg-white"></div>
            <div className="md:pl-10">
              <ul className="text-lg" style={{ fontSize: "14px" }}>
                <li className="flex">
                  ✔ Determine the home's value in the current market for a
                  listing price.
                </li>

                <li className="flex mt-2">
                  ✔ Advise the homeowner in readying the home for listing and
                  showings.
                </li>

                <li className="flex mt-2">
                  ✔ Enter the home into Rent-A-Roof database.
                </li>

                <li className="flex mt-2">
                  ✔ Market the home to other agents and brokerage members of
                  R-A-R.
                </li>

                <li className="flex mt-2">
                  ✔ Market the home on traditional media, as well as on the
                  Internet.
                </li>

                <li className="flex mt-2">
                  ✔ Supervise and/or schedule home showings.
                </li>

                <li className="flex mt-2">
                  ✔ Report to the Renter any interest and feedback from clients
                  who have seen the home.
                </li>

                <li className="flex mt-2">
                  ✔ When a client makes an offer, agents help the owner to try
                  to get the price they want and to obtain a signed
                  Rent-agreement.
                </li>

                <li className="flex mt-2">
                  ✔ Coordinate the process from signing the contract to closing
                  the deal, including scheduling inspections, preparing
                  documents and other items necessary to close.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
