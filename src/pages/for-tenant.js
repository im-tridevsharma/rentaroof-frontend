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
                    "url(https://c.wallhere.com/photos/b4/3b/architecture-193766.jpg!d)",
                }}
              >
                <div
                  className="absolute bottom-5 left-20 p-5 rounded-md text-white"
                  style={{ background: "rgba(0,0,0,.3)" }}
                >
                  <h2 style={{ fontFamily: "Opensans-bold" }}>
                    Find Your Dream Home
                  </h2>
                  <h1 style={{ fontFamily: "Opensans-bold" }}>in Delhi</h1>
                  <div className="mt-20">
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
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  className="h-96 w-full"
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
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  className="h-96 w-full"
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
          <div className="grid grid-cols-1 md:grid-cols-2">
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
                  <p className="ml-3">
                    Help them with securing an appointment.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Advise them on the area, market conditions, and if they
                    believe that their homes of interest are priced right or
                    not.
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Work with them to craft the initial offer in a rent
                    agreement.
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
            </div>
            <div
              style={{
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage:
                  "url(https://media.istockphoto.com/vectors/neighbors-keeping-pets-in-their-flats-vector-id1291922442?k=20&m=1291922442&s=612x612&w=0&h=eLpRSdcrO7ZcHvDra73lDmgT1UFwqcZ52W_8UvrX1PE=)",
              }}
            ></div>
          </div>
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
      <Footer />
    </>
  );
}

export default Services;
