import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import { FiCheck } from "react-icons/fi";

function Documentation() {
  return (
    <>
      <Header />
      <Head>
        <title>Documentation Process</title>
        <meta name="title" content="Documentation" />
        <meta name="keywords" content="services, rental, rent a roof" />
        <meta name="description" content="We offers rental services." />
      </Head>
      <div className="py-20 bg-gray-100">
        <div className="max-w-6xl w-full m-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Documentation Process with an ease
              </h3>
              <ul className="mt-5 text-lg leading-10">
                <li className="flex items-center">
                  <FiCheck className="text-blue-500 mr-5" /> Posting to
                  RentaRoof, Trulia and HotPads
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-blue-500 mr-5" /> Tenant screening
                  with background and credit checks
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-blue-500 mr-5" /> Online agreements
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-blue-500 mr-5" /> Online rent
                  payments
                </li>
              </ul>
              <div className="mt-10 flex items-center">
                <Link href="/signup/ibo">
                  <a
                    className="px-10 py-3 text-lg bg-blue-600 text-white rounded-md"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Get Started
                  </a>
                </Link>
              </div>
            </div>
            <div
              className="rounded-md h-96"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/property-waiting.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Documentation;
