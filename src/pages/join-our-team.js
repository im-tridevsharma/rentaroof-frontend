import React from "react";
import Head from "next/head";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import Link from "next/link";
import { RiTeamLine } from "react-icons/ri";
import {
  FaCalendarAlt,
  FaFileAlt,
  FaLink,
  FaListUl,
  FaPercent,
  FaRegEdit,
  FaCheckCircle,
} from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

function Ibo() {
  return (
    <>
      <Header />
      <Head>
        <title>Join Our Team</title>
        <meta name="title" content="R-A-R Real Estate Agents association" />
        <meta name="keywords" content="rent a roof, join our team, agents" />
        <meta
          name="description"
          content="Join Our Team and starts your journey with Rent a Roof."
        />
      </Head>
      <div className="bg-white">
        <div
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(/theme/images/agent-portal-banner.png)",
            backgroundPosition: "center",
            height: "90vh",
          }}
        >
          <div className="max-w-6xl w-full mx-auto py-10  px-10 md:px-0">
            <h2
              className=" text-4xl md:text-8xl wow slideInLeft uppercase max-w-xl w-full text-gray-200"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
              style={{
                fontFamily: "Opensans-bold",
                textShadow: "0px 1px 3px gray",
              }}
            >
              Maximize Your Full Potential.
            </h2>
            <p
              className="wow slideInLeft text-yellow-200 text-3xl mt-3 italic"
              data-wow-delay="0.3s"
              style={{
                textShadow: "0px 1px 3px gray",
              }}
              data-wow-duration="1s"
            >
              Technical & Sales Training for all those
              <br /> who wish to join the Rentaroof family.
            </p>
            <div
              className="mt-10 wow zoomIn"
              data-wow-delay="0.5s"
              data-wow-duration="1s"
            >
              <Link href="/signup">
                <a
                  style={{ fontFamily: "Opensans-bold" }}
                  className="px-12 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                >
                  Join Now
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="max-w-6xl w-full mx-auto">
          <div className="flex pt-5 flex-col md:flex-row">
            <div className="w-80 pt-5 md:pr-10">
              <h2
                className="text-3xl wow slideInLeft"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Grow your business with R-A-R
              </h2>
              <div
                className="text-gray-500 wow fadeInUp"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                <p className=" mt-5">
                  Experience a platform focused on resources that lift our
                  businesses and each other. Like minded supportive brokers with
                  relevant field insight and values that can make a difference
                  in our communities. <br /> <br />
                  Extensive exposure and connections with industry experts for
                  the best in class support and training for helping our
                  associates maximize their potential.
                </p>
              </div>
            </div>
            <div
              className="flex-1 w-full h-96"
              style={{
                backgroundImage: "url(/theme/images/fixed-agent.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                backgroundPosition: "300px 0px",
                backgroundSize: "contain",
              }}
            ></div>
          </div>
        </div>

        <div className="py-10 mt-10 bg-gray-50">
          <div className="flex flex-col justify-center">
            <h2
              className="text-3xl flex flex-col mt-5 wow slideInRight text-center mb-10"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Be a part of our team & expand your career
              <span className="w-60 mt-3 h-5 bg-yellow-300 mx-auto"></span>
            </h2>
          </div>
          <div
            className="overflow-hidden wow slideInLeft max-w-4xl w-full mx-auto"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
          >
            <video
              controls
              playsinline
              loop
              data-src="https://d2of6bhnpl91ni.cloudfront.net/cms/1920x1080_Final_2020_Real Estate LP-b2c23b6555.mp4"
              src="https://d2of6bhnpl91ni.cloudfront.net/cms/1920x1080_Final_2020_Real Estate LP-b2c23b6555.mp4"
            ></video>
          </div>
        </div>

        <div className="p-10 bg-gradient-to-r from-blue-600 to-red-400 text-white text-center">
          <div className="max-w-6xl w-full mx-auto">
            <h2
              className="text-3xl mt-5 wow slideInLeft"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Learn about our Platform & what we offer
            </h2>
            <p
              className="mt-5 wow fadeInUp"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
              style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
            >
              Rent-A-Roof is a first of its kind business plan to give all
              brokers/real estate agents the platform to join together and form
              an association of Real Estate Agents throughout Delhi NCR and
              ultimately all of India. It will be a centralised directory of
              agents registered and certified by Rentaroof with the aim to raise
              the profile of all agents/brokers across India. With one of our
              main focuses being on maximizing the potential of our associate
              agents by providing them best in class customised sales training
              and knowledge workshops to ensure a constant growth.
            </p>

            <div className="mt-10 text-gray-900 grid grid-cols-1 md:grid-cols-3 md:space-x-5 space-y-5 md:space-y-0">
              <div
                style={{ backgroundColor: "rgba(255,255,255,.15)" }}
                className="rounded-md p-5 text-white wow flipInY"
                data-wow-delay="0.5s"
                data-wow-duration="1s"
              >
                <h2
                  className="text-3xl mt-5"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Guaranteed visibility
                </h2>
                <p
                  className="mt-5"
                  style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
                >
                  Indian online property search activity has reached its
                  historic peak. So post your property with us and don’t miss
                  out on access to countless potential clients!
                </p>
              </div>
              <div
                style={{ backgroundColor: "rgba(255,255,255,.15)" }}
                className="rounded-md p-5 text-white wow flipInY"
                data-wow-delay="0.6s"
                data-wow-duration="1s"
              >
                <h2
                  className="text-3xl mt-5"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Better Responses
                </h2>
                <p
                  className="mt-5"
                  style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
                >
                  Our platform is designed in a way that will help you connect
                  and communicate with potential clients right through our app
                  making it easier to screen tenants.
                </p>
              </div>
              <div
                style={{ backgroundColor: "rgba(255,255,255,.15)" }}
                className="rounded-md p-5 text-white wow flipInY"
                data-wow-delay="0.7s"
                data-wow-duration="1s"
              >
                <h2
                  className="text-3xl mt-5"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Access to new properties
                </h2>
                <p
                  className="mt-5"
                  style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
                >
                  Apart from the properties in your personal database. Agents
                  will have the opportunity to show and facilitate unassigned
                  properties posted by homeowners in their area.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl w-full mx-auto">
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 space-y-5 md:space-y-0">
            <img
              src="/theme/images/agent-women.png"
              alt="Encouraging female"
              className="wow slideInLeft"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
            />
            <div className="">
              <h2
                className="text-3xl mt-7 wow slideInRight"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Encouraging female representation in the real estate sector
              </h2>
              <div
                className="text-gray-500"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                <p
                  className=" mt-5 wow fadeInUp"
                  data-wow-delay="0.5s"
                  data-wow-duration="1s"
                >
                  In India women are undoubtedly under-represented in the field
                  of real estate. Not knowing the true potential and the skills
                  necessary to monetize this sector.
                </p>
              </div>
              <div
                className="mt-10 wow zoomIn"
                data-wow-delay="0.6s"
                data-wow-duration="1s"
              >
                <Link href="/signup">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                  >
                    Join Now
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="p-10 mt-20" style={{ backgroundColor: "#ecf5fc" }}>
          <div className="max-w-6xl w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 space-y-5 md:space-y-0">
              <div className="flex justify-center flex-col">
                <h2
                  className="text-3xl mt-7 wow slideInLeft"
                  data-wow-delay="0.1s"
                  data-wow-duration="1s"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Offering{" "}
                  <span className="text-blue-500">skill development</span>
                </h2>
                <div
                  className="text-gray-500"
                  style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
                >
                  <p
                    className=" mt-5 wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    We offer support and training to women and students who want
                    to earn a livelihood. We provide the necessary knowledge,
                    skills & guidance to be able to make a career in this field.
                    The structural format of Rentaroof is easy to understand and
                    the guides can be accessed through our website and app.
                    Assistance will be provided throughout the entire process
                    until you are ready to go out and perform the necessary real
                    estate agent administrative duties.
                  </p>
                </div>
              </div>
              <img
                src="/theme/images/agent-skill.png"
                alt="Skill"
                className="wow slideInRight"
                data-wow-delay="0.5s"
                data-wow-duration="1s"
              />
            </div>
          </div>
        </div>

        <div className="p-10 bg-gradient-to-r from-blue-600 to-red-400">
          <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 md:space-x-3 space-y-5 md:space-y-0 mx-auto bg-white rounded-xl p-5">
            <div>
              <h2
                className="text-3xl wow fadeIn"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Start your Journey with
                <span className="text-blue-500">R-A-R</span>
              </h2>

              <h2
                className="text-3xl mt-3 flex items-center wow fadeIn"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-bold" }}
              >
                <span className="text-blue-500">2999/- Rs</span>
                <span className="text-sm pl-3">One-time registration fees</span>
              </h2>
              <p
                className="text-gray-500 mt-2 wow fadeIn"
                data-wow-delay="0.4s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Anytime access modules and live workshops
              </p>
              <div
                className="mt-6 wow zoomIn"
                data-wow-delay="0.5s"
                data-wow-duration="1s"
              >
                <Link href="/signup">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                  >
                    Register Now
                  </a>
                </Link>
              </div>
              <p
                className="text-gray-500 mt-5 wow fadeIn"
                data-wow-delay="0.6s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Modules on soft skills
              </p>
              <p
                className="text-gray-500 mt-2 wow fadeIn"
                data-wow-delay="0.7s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Real estate fundamentals
              </p>
              <p
                className="text-gray-500 mt-2 wow fadeIn"
                data-wow-delay="0.8s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Access to live workshops
              </p>
              <p
                className="text-gray-500 mt-2 wow fadeIn"
                data-wow-delay="0.8s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Learn the art of selling
              </p>
              <p
                className="text-gray-500 mt-2 wow fadeIn"
                data-wow-delay="0.8s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Expand your business!
              </p>
            </div>
            <img
              src="/theme/images/agent-start.png"
              alt="start"
              className="wow slideInRight"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            />
          </div>
        </div>

        <div className="max-w-6xl mt-20 w-full mx-auto">
          <h5
            className="text-3xl text-center wow slideInBottom"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Want to know <br />
            how you can join Rentaroof?
          </h5>

          <div
            className="mt-20 grid grid-cols-1 md:grid-cols-4 md:space-x-5 mb-10 wow fadeIn"
            data-wow-delay="0.3s"
            data-wow-duration="1s"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center text-white rounded-full  bg-yellow-400">
                <RiTeamLine size={50} />
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Go through the guides and training provided by our team
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center text-white rounded-full  bg-yellow-400">
                <FaRegEdit size={50} />
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Register as a verified agent with R-A-R
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center text-white rounded-full  bg-yellow-400">
                <FaListUl size={50} />
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Easily List properties as an agent
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center text-white rounded-full  bg-yellow-400">
                <FaLink size={50} />
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Connect with potential clients through Rentaroof
              </p>
            </div>
          </div>
          <div
            className="grid grid-cols-1 md:grid-cols-4 md:space-x-5 wow fadeIn"
            data-wow-delay="0.5s"
            data-wow-duration="1s"
          >
            <div className="flex flex-col items-center text-center mb-20">
              <div className="w-20 h-20 flex items-center justify-center text-white rounded-full  bg-yellow-400">
                <FaCalendarAlt size={50} />
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Manage appointments through your dashboard
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center text-white rounded-full  bg-yellow-400">
                <FaFileAlt size={50} />
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Follow our documentation process
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center text-white rounded-full  bg-yellow-400">
                <FaCheckCircle size={50} />
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Close the deal
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center text-white rounded-full  bg-yellow-400">
                <FaPercent size={50} />
              </div>
              <p
                className="text-gray-500 mt-2"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Get your commission!
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-10">
          <div className="max-w-6xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 md:space-x-5 space-x-0 space-y-5 md:space-y-0">
            <img
              src="/theme/images/agent-refer.png"
              alt="refer"
              className="wow slideInLeft"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
            />
            <div className="pt-5">
              <h5
                className="text-3xl wow slideInLeft"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Refer & Earn!
              </h5>
              <p
                className="text-gray-500 mt-4 wow fadeInUp"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                Every process of Rent-A-Roof has been incentivised. From
                referring homeowners & posting properties to referring clients,
                you can easily earn points which can later be exchanged for
                vouchers & coupons and services. Even everytime an agent goes to
                verify a property he/she gets incentivized with R-A-R points.
              </p>
              <div
                className="mt-10 wow zoomIn"
                data-wow-delay="0.5s"
                data-wow-duration="1s"
              >
                <Link href="/signup">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                  >
                    Join & Refer
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Ibo;
