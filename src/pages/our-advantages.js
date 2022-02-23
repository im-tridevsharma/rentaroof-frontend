import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import { FiCheck } from "react-icons/fi";

function Advantages() {
  return (
    <>
      <Header />
      <Head>
        <title>Our Advantages</title>
        <meta name="title" content="Advantages" />
        <meta name="keywords" content="services, rental, rent a roof" />
        <meta name="description" content="We offers rental services." />
      </Head>
      <div className=" bg-gray-50">
        <div
          className="h-96 w-full"
          style={{
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundImage:
              "url(https://thumbs.dreamstime.com/b/confident-real-estate-agent-financial-advisor-suit-shaking-hands-client-respect-gratitude-gesture-congratulate-property-138034370.jpg)",
          }}
        ></div>
        <div className="max-w-6xl w-full m-auto">
          <h2
            style={{ fontFamily: "Opensans-bold" }}
            className="my-7 text-gray-700 px-10 md:px-0"
          >
            Our Advantages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3 mt-10">
            <div className="shadow-sm bg-white rounded-md p-10 border border-gray-50">
              <div className="mx-auto w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                style={{ fontFamily: "Opensans-bold" }}
                className="mt-5 text-gray-700"
              >
                Finding Available Homes & pricing experts
              </h4>
              <p
                className="mt-3 leading-6 text-gray-700"
                style={{ fontSize: "16px", fontFamily: "Opensans-regular" }}
              >
                Although most properties can be found online in today’s date and
                you can find all our available options through our website
                itself but then comes fair market pricing into the equation.
                Real estate agents are pricing experts and will always aim to
                get you the best deal possible.
              </p>
            </div>
            <div className="shadow-sm bg-white rounded-md p-10 border border-gray-50">
              <div className="mx-auto w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                style={{ fontFamily: "Opensans-bold" }}
                className="mt-5 text-gray-700"
              >
                Being able to notice the intricate details
              </h4>
              <p
                className="mt-3 leading-6 text-gray-700"
                style={{ fontSize: "16px", fontFamily: "Opensans-regular" }}
              >
                Often, the touchiest part of a real estate negotiation and
                selection has to be the ability to notice the smallest of
                details and can make a big difference when it comes to signing a
                long-term agreement. An R-A-R agent will always be able to
                notice often the tiniest details to get you the right picture
                but also to get you a fair deal.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3 mt-10">
            <div className="shadow-sm bg-white rounded-md p-10 border border-gray-50">
              <div className="mx-auto w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                style={{ fontFamily: "Opensans-bold" }}
                className="mt-5 text-gray-700"
              >
                Avoiding Closing Problems
              </h4>
              <p
                className="mt-3 leading-6 text-gray-700"
                style={{ fontSize: "16px", fontFamily: "Opensans-regular" }}
              >
                "When you're getting close to the closing, you want to make sure
                there aren't any unexpected issues and that all of the
                professionals involved are staying on task and on timeline,"
                <br />
                Real estate agents are used to dealing with these types of
                issues and can work through almost any challenge that arises.
              </p>
            </div>
            <div className="shadow-sm bg-white rounded-md p-10 border border-gray-50">
              <div className="mx-auto w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                style={{ fontFamily: "Opensans-bold" }}
                className="mt-5 text-gray-700"
              >
                Trust
              </h4>
              <p
                className="mt-3 leading-6 text-gray-700"
                style={{ fontSize: "16px", fontFamily: "Opensans-regular" }}
              >
                In todays time the term middleman/broker is looked upon as
                something bad, sites that aim to deduct the Real estate agent
                from the equation. If you study these websites and read the real
                reviews you will surely find multiple hidden charges. With
                Rent-A-Roof you have no hidden charges or beforehand payment.
                The service fee will only be charged once the rent agreement has
                been signed and the keys are handed over.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 mt-10">
            <div className="shadow-sm bg-white rounded-md p-10 border border-gray-50">
              <div className="mx-auto w-20 h-20 flex items-center justify-center bg-green-50 rounded-full">
                <p className="mx-auto w-16 h-16 flex items-center justify-center bg-green-100 rounded-full">
                  <FiCheck className="text-3xl" />
                </p>
              </div>
              <h4
                style={{ fontFamily: "Opensans-bold" }}
                className="mt-5 text-gray-700"
              >
                Tackling the Paperwork
              </h4>
              <p
                className="mt-3 leading-6 text-gray-700"
                style={{ fontSize: "16px", fontFamily: "Opensans-regular" }}
              >
                If you've ever rented a house, you've probably dedicated a full
                binder somewhere to the documents that were involved in the
                transaction. These probably include the written offer, the
                written and signed counteroffer/Rent agreement, the little
                details (like specific repairs) and what exactly was and was not
                included in the rent agreed. The paperwork can be tiresome. This
                is when a good real estate agent can save the day. Often, these
                offers and counteroffers are limited by a time frame and the
                odds of missing something drops substantially when you're
                working with someone who knows the paperwork inside and out.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-white py-5 px-10 md:px-0">
          <div className="max-w-6xl w-full m-auto relative">
            <h2
              style={{ fontFamily: "Opensans-bold" }}
              className="my-7 text-gray-700"
            >
              Real Estate Agent Administrative Duties
            </h2>
            <ul
              className="text-gray-700"
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
            <p
              className="text-lg text-gray-700 mt-5"
              style={{ fontFamily: "Opensans-regular" }}
            >
              Because administrative duties can be very time-consuming, we
              provide pre-defined structures and procedures that can be
              initiated through our app.
            </p>

            <p className="my-10">
              <Link href="/signup">
                <a
                  className="py-3 px-10 text-lg rounded-full text-white"
                  style={{ background: "var(--blue)" }}
                >
                  Get Started
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

export default Advantages;
