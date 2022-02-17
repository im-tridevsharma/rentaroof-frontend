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
        <title>For Tenant</title>
        <meta name="title" content="Services" />
        <meta name="keywords" content="services, rental, rent a roof" />
        <meta name="description" content="We offers rental services." />
      </Head>

      <div className="pb-20 pt-5 bg-white">
        <div className="max-w-6xl w-full m-auto ">
          <div className="mb-20 relative">
            <h2 style={{ fontFamily: "Opensans-bold" }} className="my-7">
              Simple Steps makes it bigger.
            </h2>
            <p className="text-lg">
              Homebuyers typically don't have in-depth knowledge about the real
              estate markets where they wish to buy homes. They need agents to
              guide them through neighbourhoods and find homes that best suit
              their needs. Some agents specialize in working with buyers. They
              help their buyer-clients navigate all aspects of the home buying
              process, from finding homes to completing the documentation
              process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 relative">
            <div
              className="rounded-md h-96 z-20"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/for_tenant.png)",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="w-full md:w-1/2 h-full z-10 absolute -bottom-5 -left-0 shadow-lg rounded-md bg-white"></div>
            <div className="md:pl-10">
              <ul className="text-lg" style={{ fontSize: "14px" }}>
                <li className="flex">
                  ✔ Help the buyers to locate and view homes that meet their
                  requirements.
                </li>

                <li className="flex mt-2">
                  ✔ Help them with securing an appointment.
                </li>

                <li className="flex mt-2">
                  ✔ Advise them on the area, market conditions, and if they
                  believe that their homes of interest are priced right or not.
                </li>

                <li className="flex mt-2">
                  ✔ Work with them to craft the initial offer in a rent
                  agreement.
                </li>

                <li className="flex mt-2">
                  ✔ Work with them through negotiations and counter-offers with
                  the Rentor(s).
                </li>

                <li className="flex mt-2">
                  ✔ After the rent agreement is executed, coordinate the
                  transaction process on the tenant side.
                </li>

                <li className="flex mt-2">
                  ✔ Deliver and explain all documents.
                </li>

                <li className="flex mt-2">
                  ✔ Work with them through the closing and getting their keys.
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
