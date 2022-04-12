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
      <>
        <div
          className="for-tenant-slider"
          style={{ backgroundColor: "#faf8fa" }}
        >
          <img
            className="h-32 object-contain absolute"
            src="images/website/yellow.svg"
          />
          <div className="max-w-6xl h-full w-full mx-auto grid grid-cols-1 md:grid-cols-2 md:space-x-5">
            <div className="flex h-full justify-end md:-mt-10 flex-col pb-10 md:pr-10">
              <h1 style={{ fontFamily: "Opensans-bold" }} className="mb-4">
                R-A-R
              </h1>
              <h1 style={{ fontFamily: "Opensans-bold" }}>
                Real Estate Agents association
              </h1>
              <p
                style={{ fontFamily: "Opensans-regular" }}
                className="text-lg mt-5"
              >
                Rent-A-Roof is a revolutionary business plan to give all
                brokers/real estate agents the platform to join together and
                form an association of Real Estate Agents throughout Delhi NCR
                and ultimately all of India. It will be a centralised directory
                of agents registered and certified by us with the aim to raise
                the profile of all established agents across Delhi NCR.
              </p>
              <div className="mt-10">
                <Link href="/list-property">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="px-5 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
                  >
                    Get Started
                  </a>
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-end pb-20">
              <img
                className="rounded-t-full rounded-b-md"
                src="images/website/jotbanner.webp"
              />
            </div>
          </div>
        </div>

        <div className="relative flex py-5">
          <div className="py-4 max-w-6xl w-full mx-auto flex-1">
            <h3 className="text-center" style={{ fontFamily: "Opensans-bold" }}>
              How will joining R-A-R make a difference
              <br /> for you?
            </h3>
            <div className="grid grid-cols-1 mt-14 md:grid-cols-3 md:space-x-5">
              <div className="py-5 md:py-1">
                <h4
                  style={{ fontFamily: "Opensans-bold" }}
                  className="flex items-center"
                >
                  <img
                    src="images/website/visibility.png"
                    className="h-14 object-contain mr-5"
                  />
                  Guaranteed Visibility
                </h4>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-lg mt-3"
                >
                  Indian online property search activity has reached its
                  historic peak. So post your property with us and don’t miss
                  out on access to countless potential clients!
                </p>
              </div>
              <div className="md:px-5 py-5 md:py-1">
                <h4
                  style={{ fontFamily: "Opensans-bold" }}
                  className="flex items-center"
                >
                  <img
                    src="images/website/responses.png"
                    className="h-14 object-contain mr-5"
                  />
                  Better Responses
                </h4>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-lg mt-3"
                >
                  Our platform is designed in a way that will help agents and
                  clients to communicate in a much systematic way through our
                  integrated chat feature being able to easily set appointments
                  too.
                </p>
              </div>
              <div className="md:px-5 py-5 md:py-1">
                <h4
                  style={{ fontFamily: "Opensans-bold" }}
                  className="flex items-center"
                >
                  <img
                    src="images/website/properties.png"
                    className="h-14 object-contain mr-5"
                  />
                  Access to new properties
                </h4>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-lg mt-3"
                >
                  Apart from the properties in your personal database. Agents
                  will have the opportunity to show and facilitate unassigned
                  properties posted by homeowners.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3">
              <div className=" py-5 md:py-1">
                <h4
                  style={{ fontFamily: "Opensans-bold" }}
                  className="flex items-center"
                >
                  <img
                    src="images/website/support.png"
                    className="h-14 object-contain mr-5"
                  />
                  Support & Training
                </h4>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-lg mt-3"
                >
                  All new joining agents will be provided soft skills training
                  as well as basic guidelines that all R-A-R agents must follow.
                  There are guides and how to use videos to help agents use our
                  platform for maximising its potential. In case of any issue
                  all agents will get special support to resolve their issues.
                </p>
              </div>
            </div>
            <div className="mt-10 ml-5">
              <Link href="/list-property">
                <a
                  style={{ fontFamily: "Opensans-bold" }}
                  className="px-5 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
                >
                  List Property
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div
          className="flex-col h-96 flex items-center justify-center"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage:
              "linear-gradient(rgba(7, 88, 135, .9), rgba(13, 71, 104, 0.9)), url(https://img.freepik.com/free-photo/team-unity-friends-meeting-partnership-concept_53876-23043.jpg?h=700&w=1000)",
          }}
        >
          <div className="max-w-4xl w-full text-center text-white">
            <h3 style={{ fontFamily: "Opensans-bold" }}>
              Encouraging Women
              <br /> representation in the Real Estate Sector
            </h3>
            <p
              className="text-lg mt-5"
              style={{ fontFamily: "Opensans-regular" }}
            >
              In India women are undoubtedly under-represented in the field of
              real estate. Not knowing the true potential and the skills
              necessary to monetize this sector.
            </p>
          </div>
        </div>
        <div className=" pt-10 bg-white">
          <div className="max-w-6xl w-full mx-auto">
            <h3
              className="relative"
              style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}
            >
              Offering skill development
              <img
                src="images/website/line.svg"
                className="absolute -bottom-5 transform  h-3 object-contain"
              />
            </h3>
            <p
              className="text-lg mt-10"
              style={{ fontFamily: "Opensans-regular" }}
            >
              We wish to make a difference by offering support and training to
              women and students who want to earn a livelihood. We provide the
              necessary knowledge, skills & guidance to be able to make a career
              in this field. The structural format of Rentaroof is easy to
              understand and the guides can be accessed through our website and
              app. Assistance will be provided throughout the entire process
              until you are ready to go out and perform the necessary real
              estate agent administrative duties.
            </p>

            <div className="flex items-center uppercase mt-5">
              <p
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: "var(--blue)" }}
              ></p>
              <h5 style={{ fontFamily: "Opensans-bold" }}>
                Is real estate the right field for you?
              </h5>
            </div>

            <p
              className="max-w-2xl mt-5 w-full text-lg"
              style={{ fontFamily: "Opensans-regular" }}
            >
              Do you know your locality well? Do you have good interpersonal
              skills? All you need is these three things to start! Wondering how
              to sign up with us?
            </p>

            <h5 className="mt-5" style={{ fontFamily: "Opensans-bold" }}>
              Want to know how you can join Rentaroof?
            </h5>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-4 md:space-x-5">
              <p
                style={{ fontSize: 15, fontFamily: "Opensans-regular" }}
                className=" mb-3 flex items-center"
              >
                <b
                  className="w-16 h-10 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <RiTeamLine size={22} />
                </b>
                <span className="ml-3">
                  Go through the guides and training provided by our team
                </span>
              </p>
              <p
                style={{ fontSize: 15, fontFamily: "Opensans-regular" }}
                className="mb-3 flex items-center"
              >
                <b
                  className="w-10 h-10 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaRegEdit size={22} />
                </b>{" "}
                <span className="ml-3">
                  Register as a verified agent with
                  <br /> R-A_-R
                </span>
              </p>
              <p
                style={{ fontSize: 15, fontFamily: "Opensans-regular" }}
                className="mb-3 flex items-center"
              >
                <b
                  className="w-10 h-10 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaListUl size={22} />
                </b>{" "}
                <span className="ml-3">Easily List properties as an agent</span>
              </p>
              <p
                style={{ fontSize: 15, fontFamily: "Opensans-regular" }}
                className="mb-3 flex items-center"
              >
                <b
                  className="w-16 h-10 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaLink size={22} />
                </b>{" "}
                <span className="ml-3">
                  Connect with potential clients through Rentaroof
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-5">
              <p
                style={{ fontSize: 15, fontFamily: "Opensans-regular" }}
                className="mb-3 flex items-center"
              >
                <b
                  className="w-14 h-10 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaCalendarAlt size={22} />
                </b>{" "}
                <span className="ml-3">
                  Manage appointments through your dashboard
                </span>
              </p>
              <p
                style={{ fontSize: 15, fontFamily: "Opensans-regular" }}
                className="mb-3 flex items-center"
              >
                <b
                  className="w-10 h-10 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaFileAlt size={22} />
                </b>{" "}
                <span className="ml-3">Follow our documentation process</span>
              </p>
              <p
                style={{ fontSize: 15, fontFamily: "Opensans-regular" }}
                className=" mb-3 flex items-center"
              >
                <b
                  className="w-10 h-10 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaCheckCircle size={22} />
                </b>{" "}
                <span className="ml-3"> Close the deal</span>
              </p>
              <p
                style={{ fontSize: 15, fontFamily: "Opensans-regular" }}
                className=" mb-3 flex items-center"
              >
                <b
                  className="w-10 h-10 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaPercent size={22} />
                </b>
                <span className="ml-3">Get your commission!</span>
              </p>
            </div>
            <div className="my-10 flex">
              <Link href="/signup/ibo">
                <a
                  style={{ fontFamily: "Opensans-bold" }}
                  className="px-5 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
                >
                  Sign up to learn more
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="pb-10 pt-10 bg-gray-50">
          <div className="max-w-6xl w-full m-auto">
            <div className="flex">
              <img
                className="h-48 w-48 object-cover border border-white-50 p-1 rounded-md"
                src="images/website/screen.png"
              />
              <div className="ml-5">
                <h4 style={{ fontFamily: "Opensans-bold" }}>
                  Screen Tenants faster!
                </h4>
                <p
                  className="mt-3 text-lg"
                  style={{
                    fontFamily: "Opensans-regular",
                  }}
                >
                  All our properties need to be verified by agents which means
                  only verified properties & details are shared with clients
                  providing the first layer of screening for potential clients.
                  Clients can easily share their interests & queries through the
                  chat feature that will make it easier for agents to respond to
                  queries and set up appointments.
                </p>
              </div>
            </div>

            <div className="flex mt-5">
              <img
                className="h-48 w-48 object-cover border border-white-50 p-1 rounded-md"
                src="images/website/document.png"
              />
              <div className="ml-5">
                <h4 style={{ fontFamily: "Opensans-bold" }}>
                  Quick & Easy Documentation process.
                </h4>
                <p
                  className="mt-3 text-lg"
                  style={{
                    fontFamily: "Opensans-regular",
                  }}
                >
                  All real estates know about the hassles involved in the
                  documentation process of renting a home. So to address that
                  issue, our platform provides a pre-defined and easy to
                  complete online documentation process saving time for clients
                  as well as agents providing a higher closure rate.
                </p>
              </div>
            </div>

            <div className="flex mt-5">
              <img
                className="h-48 w-48 object-cover border border-white-50 p-1 rounded-md"
                src="images/website/paid.png"
              />
              <div className="ml-5">
                <h4 style={{ fontFamily: "Opensans-bold" }}>Get paid!</h4>
                <p
                  className="mt-3 text-lg"
                  style={{
                    fontFamily: "Opensans-regular",
                  }}
                >
                  The more you close the more you get paid! There’s no cap to
                  the amount of commission you can earn with Rentaroof. When you
                  successfully close a deal the service charge of 15 days rent
                  amount, taken from both tenant & owner will be transferred to
                  your registered account within 7 working days of the payment
                  made by the client after a small 15% service charge adjustment
                  for the services provided by Rent-A-Roof.
                </p>
              </div>
            </div>

            <div className="flex mt-5">
              <img
                className="h-48 w-48 object-cover border border-white-50 p-1 rounded-md"
                src="images/website/refer.png"
              />
              <div className="ml-5">
                <h4 style={{ fontFamily: "Opensans-bold" }}>Refer & Earn!</h4>
                <p
                  className="mt-3 text-lg"
                  style={{
                    fontFamily: "Opensans-regular",
                  }}
                >
                  Every process of Rent-A-Roof has been incentivised. From
                  referring homeowners & posting properties to referring
                  clients, you can easily earn points which can later be
                  exchanged for either cash amount or vouchers & coupons. Even
                  everytime an agent goes to verify a property he/she gets
                  incentivized with R-A-R points.
                </p>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center">
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
      </>
      <Footer />
    </>
  );
}

export default Ibo;
