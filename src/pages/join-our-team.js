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
import { FiCheckCircle, FiPlayCircle } from "react-icons/fi";
import { GrClose } from "react-icons/gr";

function Ibo() {
  const [play, setPlay] = React.useState(false);

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
          className="h-96"
          style={{
            backgroundImage: "url(images/website/rarimages/careers_bg.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="relative">
          <div
            className="joinot-video relative"
            style={{
              backgroundImage: "url(logos/logo.png)",
              backgroundSize: "contain",
              backgroundPosition: "center",
            }}
          ></div>
          <FiPlayCircle
            onClick={() => setPlay(true)}
            className="absolute top-1/2 left-1/2 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{ fontSize: "150px" }}
          />

          {/**play video */}
          {play && (
            <div
              className="fixed top-0 left-0 w-full h-screen z-20 flex items-center justify-center"
              style={{
                backgroundColor: "rgba(0,0,0,.3)",
              }}
            >
              <div
                className="bg-gray-100 relative"
                style={{
                  maxWidth: "800px",
                  width: "100%",
                  height: "350px",
                }}
              >
                <iframe
                  style={{
                    maxWidth: "800px",
                    width: "100%",
                    height: "350px",
                  }}
                  src="https://www.youtube.com/embed/A5oVCzik_pA"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <span
                  onClick={() => setPlay(false)}
                  className="absolute -right-2 cursor-pointer -top-1 w-10 h-10 bg-white rounded-full flex items-center justify-center"
                >
                  <GrClose />
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="relative flex py-5">
          <div className="py-4 max-w-6xl w-full mx-auto flex-1">
            <h2
              className="text-center text-6xl"
              style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}
            >
              R-A-R
            </h2>
            <h2
              className="text-center mt-5"
              style={{ fontFamily: "Opensans-bold", fontSize: "63px" }}
            >
              Real Estate Agents Association
            </h2>
            <p
              style={{ fontFamily: "Opensans-regular" }}
              className="text-3xl mt-10 text-center"
            >
              Rent-A-Roof is a revolutionary business plan to give all
              brokers/real estate agents the platform to join together and form
              an association of Real Estate Agents throughout Delhi NCR and
              ultimately all of India. It will be a centralised directory of
              agents registered and certified by us with the aim to raise the
              profile of all established agents across Delhi NCR.
            </p>
          </div>
        </div>

        <div className="relative flex py-5">
          <div className="py-4 max-w-7xl mt-5 w-full mx-auto flex-1">
            <h3
              className="text-center text-6xl"
              style={{ fontFamily: "Opensans-bold", lineHeight: "78px" }}
            >
              How will joining R-A-R make <br />a difference for you?
            </h3>
            <div className="grid grid-cols-1 mt-14 md:grid-cols-2 md:space-x-5">
              <div className="py-5 md:py-1 text-center">
                <img
                  src="images/website/rarimages/03.png"
                  className="object-cover h-96"
                />
                <h4
                  style={{ fontFamily: "Opensans-bold" }}
                  className="text-4xl my-4"
                >
                  Guaranteed Visibility
                </h4>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-2xl mt-3"
                >
                  Indian online property search activity has reached its
                  historic peak. So post your property with us and don’t miss
                  out on access to countless potential clients!
                </p>
              </div>
              <div className="md:px-5 py-5 text-center md:py-1">
                <img
                  src="images/website/rarimages/04.png"
                  className="object-cover h-96"
                />
                <h4
                  style={{ fontFamily: "Opensans-bold" }}
                  className="text-4xl my-4"
                >
                  Better Responses
                </h4>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-2xl mt-3"
                >
                  Our platform is designed in a way that will help agents and
                  clients to communicate in a much systematic way through our
                  integrated chat feature being able to easily set appointments
                  too.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-5 md:grid-cols-2">
              <div className=" py-5 text-center md:py-1">
                <img
                  src="images/website/rarimages/05.png"
                  className="object-cover h-96"
                />
                <h4
                  style={{ fontFamily: "Opensans-bold" }}
                  className="my-4 text-4xl"
                >
                  Access to new properties
                </h4>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-2xl mt-3"
                >
                  Apart from the properties in your personal database. Agents
                  will have the opportunity to show and facilitate unassigned
                  properties posted by homeowners.
                </p>
              </div>
              <div className="md:px-5 text-center py-5 md:py-1">
                <img
                  src="images/website/rarimages/06.png"
                  className="object-cover h-96"
                />
                <h4
                  style={{ fontFamily: "Opensans-bold" }}
                  className="my-4 text-4xl"
                >
                  Support & Training
                </h4>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-2xl mt-3"
                >
                  All new joining agents will be provided soft skills training
                  as well as basic guidelines that all R-A-R agents must follow.
                  There are guides and how to use videos to help agents use our
                  platform for maximising its potential. In case of any issue
                  all agents will get special support to resolve their issues.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex-col py-32 flex items-center justify-center"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundImage: "url(images/website/rarimages/07.png)",
          }}
        >
          <div className="max-w-5xl w-full text-center text-white">
            <h3 style={{ fontFamily: "Opensans-bold" }} className="text-5xl">
              Encouraging Women representation in the Real Estate Sector
            </h3>
            <p
              className="text-2xl mt-8"
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
              className="text-center text-6xl my-3"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Offering skill development
            </h3>
            <div className="grid mt-8 grid-cols-1 md:grid-cols-2 md:space-x-5 space-y-5">
              <p
                className="text-2xl mt-5"
                style={{ fontFamily: "Opensans-regular" }}
              >
                We wish to make a difference by offering support and training to
                women and students who want to earn a livelihood. We provide the
                necessary knowledge, skills & guidance to be able to make a
                career in this field. The structural format of Rentaroof is easy
                to understand and the guides can be accessed through our website
                and app. Assistance will be provided throughout the entire
                process until you are ready to go out and perform the necessary
                real estate agent administrative duties.
              </p>
              <img
                src="images/website/rarimages/panopto-online-presentations-2400x1600.jpg"
                alt="offering skill development"
                className="rounded-md border-2 border-gray-700"
              />
            </div>
          </div>

          <div className="grid p-0 grid-cols-1 mt-10 md:grid-cols-2">
            <img
              className="z-30"
              src="images/website/rarimages/02.png"
              alt="why rar"
            />
            <div
              className="py-10 pl-5 z-0 -ml-14"
              style={{ backgroundColor: "#f4f5f4" }}
            >
              <h3
                className="text-5xl -ml-28 px-1"
                style={{ fontFamily: "Opensans-bold" }}
              >
                All you need is these three things to start!
              </h3>

              <div className="pl-10 mt-10">
                <p
                  className="text-4xl flex "
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  <FiCheckCircle
                    size={50}
                    className="mr-5"
                    style={{ color: "var(--blue)" }}
                  />
                  Is real estate the right
                  <br /> field for you?
                </p>

                <p
                  className="text-4xl my-8 flex"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  <FiCheckCircle
                    size={50}
                    className="mr-5"
                    style={{ color: "var(--blue)" }}
                  />
                  Do you know your
                  <br /> locality well?
                </p>

                <p
                  className="text-4xl flex"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  <FiCheckCircle
                    size={50}
                    className="mr-5"
                    style={{ color: "var(--blue)" }}
                  />
                  Do you have good
                  <br /> interpersonal skills?
                </p>
              </div>
            </div>
          </div>
          <div
            className="px-10 py-8 flex items-center justify-between"
            style={{ backgroundColor: "#f29625" }}
          >
            <h1
              className="text-4xl text-white"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Wondering how to signup with us?
            </h1>
            <Link href="/signup/ibo">
              <a
                style={{ fontFamily: "Opensans-regular" }}
                className="px-20 py-5 text-3xl rounded-md uppercase bg-gray-800 hover:bg-gray-700 text-white"
              >
                Signup
              </a>
            </Link>
          </div>
          <div className="max-w-6xl w-full mx-auto">
            <h5
              className="mt-20 text-6xl text-center"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Want to know <br />
              how you can join Rentaroof?
            </h5>

            <div className="mt-20 grid grid-cols-1 md:grid-cols-4 md:space-x-5">
              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <RiTeamLine size={50} />
                </div>
                <p
                  className="mt-5 text-center text-gray-600 text-xl"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Go through the guides and training provided by our team
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaRegEdit size={50} />
                </div>
                <p
                  className="mt-5 text-center text-gray-600 text-xl"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Register as a verified agent with R-A-R
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaListUl size={50} />
                </div>
                <p
                  className="mt-5 text-center text-gray-600 text-xl"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Easily List properties as an agent
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaLink size={50} />
                </div>
                <p
                  className="mt-5 text-center text-gray-600 text-xl"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Connect with potential clients through Rentaroof
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-5">
              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaCalendarAlt size={50} />
                </div>
                <p
                  className="mt-5 text-center text-gray-600 text-xl"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Manage appointments through your dashboard
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaFileAlt size={50} />
                </div>
                <p
                  className="mt-5 text-center text-gray-600 text-xl"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Follow our documentation process
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaCheckCircle size={50} />
                </div>
                <p
                  className="mt-5 text-center text-gray-600 text-xl"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Close the deal
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div
                  className="w-20 h-20 flex items-center justify-center text-white rounded-full"
                  style={{ background: "var(--blue)" }}
                >
                  <FaPercent size={50} />
                </div>
                <p
                  className="mt-5 text-center text-gray-600 text-xl"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Get your commission!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 mt-10  bg-gray-50">
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
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}

export default Ibo;
