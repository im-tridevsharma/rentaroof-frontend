import React from "react";
import Header from "../components/website/Header";
import Footer from "../components/website/Footer";
import Head from "next/head";

function AboutUs() {
  return (
    <>
      <Header />
      <Head>
        <title>About Us</title>
        <meta name="title" content="About Us" />
        <meta name="keywords" content="About Us, Rent a Roof" />
        <meta name="description" content="About Rent a roof" />
      </Head>
      {/**page content goes here */}
      <div className="w-full px-2 py-5">
        <p>AboutUs</p>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
