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
            backgroundImage: "url(images/website/oadvs.jpg)",
          }}
        ></div>
        <div className="max-w-6xl mt-10 text-gray-700 w-full m-auto">
          <h2
            style={{ fontFamily: "Opensans-bold" }}
            className="my-7  px-10 md:px-0"
          >
            Our Advantages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-10 mb-20">
            <div
              className="h-80 md:mr-10"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/screening.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Finding Available Homes & pricing experts
              </h3>
              <p
                className="text-lg mt-5"
                style={{ fontFamily: "Opensans-regular" }}
              >
                Although most properties can be found online in today’s date and
                you can find all our available options through our website
                itself but then comes fair market pricing into the equation.
                Real estate agents are pricing experts and will always aim to
                get you the best deal possible.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-10 mb-20">
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Being able to notice the intricate details
              </h3>
              <p
                className="text-lg mt-5"
                style={{ fontFamily: "Opensans-regular" }}
              >
                Often, the touchiest part of a real estate negotiation and
                selection has to be the ability to notice the smallest of
                details and can make a big difference when it comes to signing a
                long-term agreement. An R-A-R agent will always be able to
                notice often the tiniest details to get you the right picture
                but also to get you a fair deal.
              </p>
            </div>
            <div
              className="h-80 ml-5"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage:
                  "url(https://img.freepik.com/free-photo/business-peoples-analyzing-data-together-teamwork-planning-startup-new-project_38335-353.jpg?w=740)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-10 mb-20">
            <div
              className="h-80 mr-5"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/paperwork.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Tackling the Paperwork
              </h3>
              <p
                className="text-lg mt-5"
                style={{ fontFamily: "Opensans-regular" }}
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

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-10 mb-20">
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Avoiding Closing Problems
              </h3>
              <p
                className="text-lg mt-5"
                style={{ fontFamily: "Opensans-regular" }}
              >
                "When you're getting close to the closing, you want to make sure
                there aren't any unexpected issues and that all of the
                professionals involved are staying on task and on timeline,"
                Real estate agents are used to dealing with these types of
                issues and can work through almost any challenge that arises.
              </p>
            </div>
            <div
              className="h-80 mr-5"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/property-waiting.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-10">
            <div
              className="h-80 mr-5"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/payment.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>Trust</h3>
              <p
                className="text-lg mt-5"
                style={{ fontFamily: "Opensans-regular" }}
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
        </div>

        <div className="mt-16 bg-white py-5 px-10 md:px-0">
          <div className="max-w-6xl w-full m-auto relative">
            <h2
              style={{ fontFamily: "Opensans-bold" }}
              className="my-7 text-gray-700 text-center"
            >
              Real Estate Agent Administrative Duties
            </h2>

            <p
              className="text-lg  mt-5 mx-auto text-center w-full"
              style={{ fontFamily: "Opensans-regular", maxWidth: "800px" }}
            >
              Because administrative duties can be very time-consuming, we
              provide pre-defined structures and procedures that can be
              initiated through our app.
            </p>

            <div className="mt-14 flex justify-center">
              <Link href="/signup/ibo">
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

export default Advantages;
