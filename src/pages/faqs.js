import React from "react";
import Head from "next/head";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import { FaMinus, FaPlus } from "react-icons/fa";

function Faqs() {
  const [toggle, setToggle] = React.useState("");
  return (
    <>
      <Header />
      <Head>
        <title>Faqs</title>
        <meta name="title" content="Faqs" />
        <meta name="keywords" content="services, rental, rent a roof" />
        <meta name="description" content="We offers rental services." />
      </Head>
      <div className="py-20 bg-gray-100">
        <div className="max-w-6xl w-full m-auto ">
          <div className="">
            <h3 style={{ fontFamily: "Opensans-bold" }}>FAQs</h3>
            <p className="text-lg mt-2">Recently resolved questions...</p>
          </div>
          <div
            onClick={() => setToggle((prev) => (prev === "faq1" ? "" : "faq1"))}
            className="mt-10 flex items-center bg-white p-3 cursor-pointer"
          >
            {toggle !== "faq1" ? (
              <FaPlus className="text-2xl text-blue-500" />
            ) : (
              <FaMinus className="text-2xl text-blue-500" />
            )}
            <h4 className="ml-3" style={{ fontFamily: "Opensans-bold" }}>
              How to schedule a visit?
            </h4>
          </div>
          <div className={`${toggle !== "faq1" && "hidden"}`}>
            <p className="text-lg mt-5">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type ...Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type ...
            </p>
          </div>

          <div
            onClick={() => setToggle((prev) => (prev === "faq2" ? "" : "faq2"))}
            className="mt-10 flex items-center bg-white p-3 cursor-pointer"
          >
            {toggle !== "faq2" ? (
              <FaPlus className="text-2xl text-blue-500" />
            ) : (
              <FaMinus className="text-2xl text-blue-500" />
            )}
            <h4 className="ml-3" style={{ fontFamily: "Opensans-bold" }}>
              Why realtor is in between?
            </h4>
          </div>
          <div className={`${toggle !== "faq2" && "hidden"}`}>
            <p className="text-lg mt-5">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type ...Lorem Ipsum has been the industry's
              standard dummy text ever since the 1500s, when an unknown printer
              took a galley of type and scrambled it to make a type ...
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Faqs;
