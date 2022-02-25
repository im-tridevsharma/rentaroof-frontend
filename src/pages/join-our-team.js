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
        <div className="pb-10 pt-5 max-w-6xl w-full m-auto bg-white">
          <h2
            style={{ fontFamily: "Opensans-bold" }}
            className="my-7 text-gray-700 px-10 md:px-0"
          >
            Join Our Team
          </h2>

          <p
            className="text-lg text-gray-700"
            style={{ fontFamily: "Opensans-regular" }}
          >
            Rent-A-Roof is a revolutionary business plan to give all
            brokers/real estate agents the platform to join together and form an
            association of Real Estate Agents throughout Delhi NCR and
            ultimately all of India.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-10">
            <div className="md:pr-10 text-gray-700">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                What are the duties of a Real Estate Agent?
              </h3>
              <ul
                className="text-gray-700 mt-10"
                style={{ fontSize: "16px", fontFamily: "Opensans-regular" }}
              >
                <li className="flex items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Respond to texts, emails, and phone calls
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Process real estate documents, agreements, and lease records
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">
                    Coordinate appointments, showings, open houses, and meetings
                  </p>
                </li>

                <li className="flex mt-2 items-center">
                  <img src="icons/home/point-icon.png" width="35" height="35" />
                  <p className="ml-3">Update databases</p>
                </li>
              </ul>
              <div className="mt-10 flex items-center">
                <Link href="/signup/ibo">
                  <a
                    className="px-10 py-3 border-2 text-lg text-blue-600 border-blue-600 rounded-md"
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
                backgroundImage: "url(images/website/post-property.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
          <h3
            className="mt-16 text-gray-700"
            style={{ fontFamily: "Opensans-bold" }}
          >
            What are the benefits of joining our team?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 text-center mt-10 md:space-x-5">
            <div className="border rounded-md border-gray-300  pb-5">
              <div className="mx-auto my-10 w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                className="text-gray-700 px-10"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Brand name
              </h4>
              <p
                className="text-gray-700 mt-5 px-10"
                style={{ fontFamily: "Opensans-regular", fontSize: "16px" }}
              >
                When you join our team you will be given R-A-R gear providing
                greater trust to clients & customers.
              </p>
            </div>
            <div className="border rounded-md border-gray-300  pb-5">
              <div className="mx-auto my-10 w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                className="text-gray-700 px-5"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Pre-defined documentation process
              </h4>
              <p
                className="text-gray-700 mt-5 px-10"
                style={{ fontFamily: "Opensans-regular", fontSize: "16px" }}
              >
                One of the biggest benefits of joining R-A-R has to be our
                integrated documentation process which can be accessed and
                process right through our website and app.
              </p>
            </div>
            <div className="border rounded-md border-gray-300  pb-5">
              <div className="mx-auto my-10 w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                className="text-gray-700 px-10"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Payment gateway
              </h4>
              <p
                className="text-gray-700 mt-5 px-10"
                style={{ fontFamily: "Opensans-regular", fontSize: "16px" }}
              >
                To provide greater trust to clients & customers we have the
                option of the payment being processed through our payment
                gateway guaranteeing a systematic and trustworthy payment
                procedure.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 text-center mt-10 md:space-x-5">
            <div className="border rounded-md border-gray-300  pb-5">
              <div className="mx-auto my-10 w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                className="text-gray-700 px-10"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Incentives
              </h4>
              <p
                className="text-gray-700 mt-5 px-10"
                style={{ fontFamily: "Opensans-regular", fontSize: "16px" }}
              >
                Incentives will be deposited to all agents who work hard and
                close deals. There is no cap to the incentives you can earn with
                R-A-R! The more you close the more you can earn. <br />
                All incentives/brokerage will always be factored into the signed
                agreement.
              </p>
            </div>
            <div className="border rounded-md border-gray-300  pb-5">
              <div className="mx-auto my-10 w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                className="text-gray-700 px-5"
                style={{ fontFamily: "Opensans-bold" }}
              >
                New properties
              </h4>
              <p
                className="text-gray-700 mt-5 px-10"
                style={{ fontFamily: "Opensans-regular", fontSize: "16px" }}
              >
                One disadvantage of being a local Real estate agent is limited
                number of properties in your personal database but with R-A-R
                you don’t need to worry about that as agents will have the
                opportunity to show and facilitate unassigned properties posted
                by homeowners.
              </p>
            </div>
            <div className="border rounded-md border-gray-300  pb-5">
              <div className="mx-auto my-10 w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                className="text-gray-700 px-10"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Support & Training
              </h4>
              <p
                className="text-gray-700 mt-5 px-10"
                style={{ fontFamily: "Opensans-regular", fontSize: "16px" }}
              >
                Special support will be provided to all agents who join our
                team. And all new joining agents will be provided soft skills
                training as well as basic guidelines that all R-A-R agents must
                follow along with the training on how to use our platform for
                maximising it’s potential.
              </p>
            </div>
          </div>

          <div className="text-center mt-20">
            <h2
              style={{ fontFamily: "Opensans-bold" }}
              className="my-7 text-gray-700"
            >
              Start a journey with R-A-R
            </h2>
            <p className="mt-10">
              <Link href="/signup/ibo">
                <a
                  className="py-3 px-10 text-lg rounded-full text-white"
                  style={{ background: "var(--blue)" }}
                >
                  Join Now
                </a>
              </Link>
            </p>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}

export default Ibo;
