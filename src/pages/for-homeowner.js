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
        <title>For Homeowner</title>
        <meta name="title" content="Services" />
        <meta name="keywords" content="services, rental, rent a roof" />
        <meta name="description" content="We offers rental services." />
      </Head>

      <div className=" bg-white">
        <div className="py-2" style={{ backgroundColor: "#faf8fa" }}>
          <div className="md:px-20 pb-10 md:pb-28 px-5 grid grid-cols-1 md:grid-cols-2 md:space-x-5 md:space-y-0 space-y-5">
            <div className="relative p-10 md:pt-24">
              <img
                src="images/website/fhs1.svg"
                className="h-32 object-contain absolute left-0"
              />
              <img src="https://img.freepik.com/free-photo/sale-handsome-realtor-waiting-visitors-rent-new-home-ownership-confident-man-outside_545934-6596.jpg?w=740" />
              <img
                src="images/website/fhs2.svg"
                className="h-32 object-contain absolute right-0 bottom-0"
              />
            </div>

            <div className="flex justify-start flex-col md:pt-20 pt-5">
              <h3 style={{ fontFamily: "Opensans-bold" }} className="mb-5">
                Need to get your home rented?
              </h3>
              <p className="text-lg" style={{ fontFamily: "Opensans-regular" }}>
                When homeowners decide they want to put up their home for
                rent/sale, the vast majority will call a real estate brokerage
                firm to work with an agent to get their homes listed on the
                local Listing Services. You can easily list your home on
                Rent-a-roof for free!
              </p>
              <p
                className="text-lg mt-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                This database is shared among all local brokerage members of
                Rent-A-Roof, who then work to bring in a tenant for the home. In
                listing a home, the real estate agent will be performing the
                various duties and activities in volved in the renting process
                such as facilitating house showing, processing documents and
                closing the deal.
              </p>
              <div className="mt-10 mb-5">
                <Link href="/signup">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="px-5 py-4 rounded-full bg-blue-400 hover:bg-blue-500 text-white"
                  >
                    Sign Up
                  </a>
                </Link>
              </div>
              <p style={{ fontFamily: "Opensans-semi-bold" }}>
                Already joined us?
                <Link href="/login">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="text-blue-500 ml-3"
                  >
                    Login
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <h2 style={{ fontFamily: "Opensans-bold" }}>Why choose us?</h2>
          <p
            className="text-lg mt-5"
            style={{ fontFamily: "Opensans-regular" }}
          >
            When a client makes an offer, agents help the owner to try to get
            the price they want and to obtain a signed Rent-agreement.
          </p>
        </div>
        <div
          className="max-w-6xl mt-10 md:mt-20 w-full m-auto  grid grid-cols-1 md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0"
          style={{ fontFamily: "Opensans-regular" }}
        >
          <div className="flex flex-col items-center p-5 border shadow-sm rounded-sm pt-3">
            <img
              className="w-52 h-52 object-cover"
              src="https://img.freepik.com/free-vector/online-document-form-digital-agreement-electronic-contract-internet-questionnaire-list-note-voting-ballot-poll-flat-design-element_335657-2667.jpg?w=740"
            />
            <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
              Free Listing
            </h3>
            <p className="text-center text-lg">
              You can easily post your property on R-A-R for free.
            </p>
          </div>

          <div className="flex flex-col items-center p-5 border shadow-sm rounded-sm pt-3">
            <img
              className="w-52 h-52 object-cover"
              src="https://img.freepik.com/free-vector/real-estate-business-concept-choosing-finding-home-flat-vector-illustration_566886-1053.jpg?w=740"
            />
            <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
              Home Showings
            </h3>
            <p className="text-center text-lg">
              Our agent will Supervise and schedule home showings.
            </p>
          </div>

          <div className="flex flex-col items-center p-5 border shadow-sm rounded-sm pt-3">
            <img
              className="w-52 h-52 object-cover"
              src="https://img.freepik.com/free-vector/satisfied-businessmen-shake-hands-against-signed-agreement_107791-69.jpg?1&t=st=1647417790~exp=1647418390~hmac=72c6ca1d2e1182161ed7a6973822376dd9f35e9ff88bf73a743aa0fdd5cbff85&w=740"
            />
            <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
              Closing the deal
            </h3>
            <p className="text-center text-lg">
              Coordinate the process from signing the contract to closing the
              deal along with preparing documents and other items necessary to
              close.
            </p>
          </div>
        </div>
        <div className="py-10 mt-20" style={{ backgroundColor: "#faf8fa" }}>
          <div className="max-w-6xl w-full m-auto  grid grid-cols-1 md:grid-cols-2 md:space-x-5">
            <div className="flex flex-col justify-center">
              <h2 style={{ fontFamily: "Opensans-bold" }}>
                Leave all your worries to us!
              </h2>
              <p
                className="text-lg mt-5"
                style={{ fontFamily: "Opensans-regular" }}
              >
                If you’ve ever rented out a home then you surely know about the
                various steps and hassles that come with it. Things like keeping
                in touch and screening various applications, keeping up with
                appointments and home showings, negotiations and paperwork. We
                at Rent-A-Roof understand these hassles very clearly and provide
                a very easy interface where all these various tasks are handled
                directly by us making it possible for renting your home with
                ease.
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
            <div className="rounded-md overflow-hidden">
              <video
                controls
                playsinline
                loop
                data-src="https://d2of6bhnpl91ni.cloudfront.net/cms/1920x1080_Final_2020_Real Estate LP-b2c23b6555.mp4"
                src="https://d2of6bhnpl91ni.cloudfront.net/cms/1920x1080_Final_2020_Real Estate LP-b2c23b6555.mp4"
              ></video>
            </div>
          </div>
        </div>

        <div className="py-10 bg-white">
          <div className="max-w-6xl w-full m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 space-y-5 md:space-y-0">
              <div className="-mt-10">
                <img src="https://img.freepik.com/free-vector/coffee-break-concept-illustration_114360-2931.jpg?2&w=740" />
              </div>
              <div className="">
                <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
                  Let us manage your home for you!
                </h3>
                <p
                  className="text-lg mt-3"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  All properties that are listed on Rent-A-Roof are treated as a
                  responsibility towards our clients. All properties are
                  assigned dedicated R-A-R agents who stay in touch with the
                  homeowners, giving them regular updates and help them through
                  any query they might have. You can learn more about the
                  process below.
                </p>
                <div className="mt-10">
                  <Link href="/signup">
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
        </div>

        <div className="py-10 bg-gray-50">
          <div className="max-w-6xl w-full m-auto">
            <h3 style={{ fontFamily: "Opensans-bold" }} className="mb-10">
              It’s simple to get your home rented
            </h3>
            <div className="flex items-start justify-start">
              <img
                className="h-52 w-52 md:mr-10 object-cover rounded-md"
                src="https://img.freepik.com/free-vector/real-estate-floor-plan-abstract-concept-vector-illustration-floor-plan-online-services-real-estate-marketing-house-listing-interactive-property-layout-virtual-staging-abstract-metaphor_335657-4236.jpg?t=st=1647667542~exp=1647668142~hmac=ad1707257e414ec47360a85a3e3d5c11d294ac93c24d70c4f03d0577792f5636&w=740"
              />
              <div className="">
                <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                  List your property for free
                </h5>
                <p
                  className=" mt-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    fontFamily: "Opensans-regular",
                  }}
                >
                  You can easily list your property for free on Rentaroof with
                  all the necessary details required to attract clients.
                </p>
              </div>
            </div>
            <div className="flex items-start mt-10 justify-start">
              <div className="">
                <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                  Connect with agent
                </h5>
                <p
                  className=" mt-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    fontFamily: "Opensans-regular",
                  }}
                >
                  An agent will be assigned to manage all the tasks required in
                  the renting process. An easy chat feature integrated In our
                  app, your agent will easily be able to share regular updates
                  regarding applications.
                </p>
              </div>
              <img
                className="h-52 w-52 md:ml-10 object-cover rounded-md"
                src="https://img.freepik.com/free-vector/connected-world-concept-illustration_114360-3027.jpg?t=st=1647667662~exp=1647668262~hmac=2a26c1d5a54d766189634645c69ef45a8a124fc9180c17d242bdc4da2c94c1ee&w=740"
              />
            </div>
            <div className="flex mt-10 items-start justify-start">
              <img
                className="h-52 w-52 md:mr-10 object-cover rounded-md"
                src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone_23-2148554946.jpg?t=st=1647667723~exp=1647668323~hmac=6e5ebf12eb8fe50e8a18687198abb4b3916f5420c959e0911fcd95a745c0dec6&w=740"
              />
              <div className="">
                <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                  Manage appointments
                </h5>
                <p
                  className=" mt-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    fontFamily: "Opensans-regular",
                  }}
                >
                  All Rent-A-Roof agents are well mannered and qualified
                  executives of Rent-A-Roof. They will manage all the
                  applications and fix appointments as per your instructions.
                </p>
              </div>
            </div>
            <div className="flex items-start mt-10 justify-start">
              <div className="">
                <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                  Negotiations
                </h5>
                <p
                  className=" mt-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    fontFamily: "Opensans-regular",
                  }}
                >
                  All offers of potential client’s will be conveyed to you by
                  our agent and upon finalizing the deal. Our agents will then
                  move on to facilitate the documentation process.
                </p>
              </div>
              <img
                className="h-52 w-52 md:ml-10 object-cover rounded-md"
                src="https://img.freepik.com/free-vector/successful-partnership-negotiation-partners-handshaking_335657-2453.jpg?t=st=1647667775~exp=1647668375~hmac=335c04ae06f1150cc1bcec9cfe380fb7edbffa8d12a83d6dac4be65c81700262&w=740"
              />
            </div>
            <div className="flex mt-10 items-start justify-start">
              <img
                className="h-52 w-52 md:mr-10 object-cover rounded-md"
                src="https://img.freepik.com/free-vector/expert-checking-business-leader-order_74855-10624.jpg?t=st=1647665214~exp=1647665814~hmac=40aa847c688bd620323ff12ba212adad7e6eca3ab4f43babfba4e2e4e263196c&w=740"
              />
              <div className="">
                <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                  Processing documents
                </h5>
                <p
                  className=" mt-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    fontFamily: "Opensans-regular",
                  }}
                >
                  All the documents like the written and signed offer, rent
                  agreement and police verification will be carried out by your
                  agent using our pre-defined guidelines and process.
                </p>
              </div>
            </div>
            <div className="flex items-start mt-10 justify-start">
              <div className="">
                <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                  Closing the deal
                </h5>
                <p
                  className=" mt-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    fontFamily: "Opensans-regular",
                  }}
                >
                  When you are close to closing the deal any hindrance or
                  problem could prove problematic and that’s where our agents
                  come through. Your R-A-R agent will make sure that everything
                  is on the given timeline and that the process flows smoothly
                  for a swifter experience.
                </p>
              </div>
              <img
                className="h-52 w-52 md:ml-10 object-cover rounded-md"
                src="https://img.freepik.com/free-vector/satisfied-businessmen-shake-hands-against-signed-agreement_107791-69.jpg?1&t=st=1647667887~exp=1647668487~hmac=8ca765a4bb1eea533a15a2b5b4859e8cadf84dc6ce9f478d09bb7382cb580361&w=740"
              />
            </div>
            <div className="flex mt-10 items-start justify-start">
              <img
                className="h-52 w-52 md:mr-10 object-cover rounded-md"
                src="https://img.freepik.com/free-vector/business-man-has-idea-with-gold-coin-his-hand_1150-35033.jpg?t=st=1647667950~exp=1647668550~hmac=4b88da2e9fc99f69b69081f3ae5c733f51f520ead9e2d4124e1d4c09d694b5e0&w=740"
              />
              <div className="">
                <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                  Service charge
                </h5>
                <p
                  className=" mt-3"
                  style={{
                    fontSize: "16px",
                    lineHeight: 1.8,
                    fontFamily: "Opensans-regular",
                  }}
                >
                  Upon closure as per our policy we only levy a fee equivalent
                  to the sum of 15 days rent as per the signed agreement for the
                  services provided by the Agent as opposed to the traditional
                  30-60 day rent amount charged by traditional brokers.
                </p>
              </div>
            </div>
            <div className="mt-10 mb-5 text-center">
              <Link href="/signup">
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

export default Services;
