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
        <title>For Tenant</title>
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
              "url(https://c.wallhere.com/photos/b4/3b/architecture-193766.jpg!d)",
          }}
        ></div>
        <div className="max-w-6xl mt-10 w-full m-auto ">
          <div className="mb-20 relative">
            <h2
              style={{ fontFamily: "Opensans-bold" }}
              className="my-7 text-gray-700"
            >
              For Tenant
            </h2>
            <p
              className="text-lg text-gray-700"
              style={{ fontFamily: "Opensans-regular" }}
            >
              Typically, people don't have in-depth knowledge about the real
              estate markets where they wish to rent homes. They need agents to
              guide them through neighbourhoods and find homes that best suit
              their needs. Some agents specialize in working with tenants. They
              help their clients navigate all aspects of the home renting
              process, from finding homes to completing the documentation
              process.
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
                  Help the clients to locate and view homes that meet their
                  requirements.
                </p>
              </li>

              <li className="flex mt-2 items-center">
                <img src="icons/home/point-icon.png" width="35" height="35" />
                <p className="ml-3">Help them with securing an appointment.</p>
              </li>

              <li className="flex mt-2 items-center">
                <img src="icons/home/point-icon.png" width="35" height="35" />
                <p className="ml-3">
                  Advise them on the area, market conditions, and if they
                  believe that their homes of interest are priced right or not.
                </p>
              </li>

              <li className="flex mt-2 items-center">
                <img src="icons/home/point-icon.png" width="35" height="35" />
                <p className="ml-3">
                  Work with them to craft the initial offer in a rent agreement.
                </p>
              </li>

              <li className="flex mt-2 items-center">
                <img src="icons/home/point-icon.png" width="35" height="35" />
                <p className="ml-3">
                  Work with them through negotiations and counter-offers with
                  the Rentor(s).
                </p>
              </li>

              <li className="flex mt-2 items-center">
                <img src="icons/home/point-icon.png" width="35" height="35" />
                <p className="ml-3">
                  After the rent agreement is executed, coordinate the
                  transaction process.
                </p>
              </li>

              <li className="flex mt-2 items-center">
                <img src="icons/home/point-icon.png" width="35" height="35" />
                <p className="ml-3">Deliver and explain all documents.</p>
              </li>
              <li className="flex mt-2 items-center">
                <img src="icons/home/point-icon.png" width="35" height="35" />
                <p className="ml-3">
                  Work with them through the closing and getting their keys.
                </p>
              </li>
            </ul>

            <div className="text-center mt-20">
              <h2
                style={{ fontFamily: "Opensans-bold" }}
                className="my-7 text-gray-700"
              >
                Let’s go find the right home for you
              </h2>
              <p className="mt-10">
                <Link href="/">
                  <a
                    className="py-3 px-10 text-lg rounded-full text-white"
                    style={{ background: "var(--blue)" }}
                  >
                    Search
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
