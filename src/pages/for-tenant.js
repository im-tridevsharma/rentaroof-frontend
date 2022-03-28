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

      <div className=" bg-white overflow-hidden">
        <div>
          <Carousel
            cols={1}
            rows={1}
            gap={0}
            autoplay={10000}
            showDots={true}
            hideArrow={true}
            dotColorActive="var(--primary-color)"
            loop
          >
            <Carousel.Item>
              <div
                style={{ height: "520px" }}
                className="grid h-full w-full for-tenant-slider grid-cols-1 md:grid-cols-2 pt-1"
              >
                <img
                  className="h-32 object-contain absolute top-2"
                  src="https://animoto.com/static/TealDots-212c4a91665ce0cc624cdf92514a34d6.svg"
                />
                <div className="flex  justify-center items-center">
                  <div className="flex justify-center flex-col max-w-md w-full">
                    <h2 style={{ fontFamily: "Opensans-bold" }}>
                      Sit back and relax
                    </h2>
                    <p
                      className="text-lg mt-3"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      Easily search through the various listings available on
                      our database to find the right home that meets your
                      requirements. All properties on Rentaroof are verified by
                      our agents providing a more dependable and updated
                      database.
                    </p>

                    <div className="mt-10">
                      <Link href="/signup">
                        <a
                          style={{ fontFamily: "Opensans-bold" }}
                          className="px-10 py-4 rounded-full transition-all bg-yellow-400 hover:bg-yellow-300 text-gray-700"
                        >
                          Get Started
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="w-full"
                  style={{
                    backgroundImage:
                      "url(https://img.freepik.com/free-vector/businessman-character-sitting-relaxed-pose-chair-dreaming-big-house-car_87771-10491.jpg?w=740)",
                  }}
                ></div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="grid h-full grid-cols-1 md:grid-cols-2 pt-1 relative">
                <img
                  src="https://animoto.com/static/LowerRightTealYellow-944790b2ec1f2d1d569c799113cbfc41.svg"
                  className="h-32 absolute object-contain right-0"
                />
                <div
                  className="w-full"
                  style={{
                    backgroundImage:
                      "url(https://img.freepik.com/free-vector/apartment-rent-concept-illustration_114360-2947.jpg?w=740)",
                  }}
                ></div>
                <div className="flex  justify-center items-center">
                  <div className="flex justify-center flex-col max-w-md w-full">
                    <h2 style={{ fontFamily: "Opensans-bold" }}>
                      Feeling confused or have any questions?
                    </h2>
                    <p
                      className="text-lg mt-3"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      If you wish to know more about a neighbourhood or need
                      specific information related to a property you have
                      shortlisted. you can easily connect with one of our agents
                      who will try their best to answer all your queries.
                    </p>

                    <div className="mt-10">
                      <Link href="/signup">
                        <a
                          style={{ fontFamily: "Opensans-bold" }}
                          className="px-10 py-4 rounded-full  transition-all bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          Get Started
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="grid h-full grid-cols-1 md:grid-cols-2 pt-1 relative">
                <img
                  src="https://animoto.com/static/UpperLeftRedBlue-63b6ee2eca1e536576fa136c918c1c54.svg"
                  className="absolute h-32 object-contain"
                />
                <div className="flex  justify-center items-center">
                  <div className="flex justify-center flex-col max-w-md w-full">
                    <h2 style={{ fontFamily: "Opensans-bold" }}>
                      Processing documents & Payments
                    </h2>
                    <p
                      className="text-lg mt-3"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      Not only does Rent-A-Roof help their clients by providing
                      a well-structured documentation process like the final
                      rent agreement but also aim to provide greater levels of
                      safety by processing the initial payment through our
                      platform which will be directly transferred to the
                      landlords registered account.
                    </p>

                    <div className="mt-10">
                      <Link href="/signup">
                        <a
                          style={{
                            fontFamily: "Opensans-bold",
                            backgroundColor: "var(--primary-color)",
                          }}
                          className="px-10 py-4 rounded-full transition-all text-white"
                        >
                          Get Started
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                <div
                  className="w-full"
                  style={{
                    backgroundImage:
                      "url(https://img.freepik.com/free-vector/happy-couple-bought-apartment-realtor-agreement_87689-4369.jpg?w=740)",
                  }}
                ></div>
              </div>
            </Carousel.Item>
          </Carousel>
        </div>
        <div className="bg-gray-50 py-5 mt-10">
          <div className="max-w-6xl mt-10 w-full m-auto ">
            <div className="my-20">
              <div className="max-w-6xl w-full m-auto  grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                <div className="flex flex-col justify-center">
                  <h2 style={{ fontFamily: "Opensans-bold" }}>For Tenant</h2>
                  <p
                    className="text-lg mt-5"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Typically, people don't have in-depth knowledge about the
                    real estate markets where they wish to rent homes. They need
                    agents to guide them through neighbourhoods and find homes
                    that best suit their needs. Some agents specialize in
                    working with tenants. They help their clients navigate all
                    aspects of the home renting process, from finding homes to
                    completing the documentation process.
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
          </div>
        </div>

        <div className="bg-white mb-10">
          <div className="max-w-6xl mt-10 w-full m-auto ">
            <h2
              className="text-center mb-10"
              style={{ fontFamily: "Opensans-bold" }}
            >
              What we offer?
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-52 h-52 object-cover"
                  src="https://img.freepik.com/free-vector/flat-people-asking-questions_23-2148929673.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Help the clients to locate and view homes that meet their
                  requirements.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-52 h-52 object-cover"
                  src="https://img.freepik.com/free-vector/appointment-booking-mobile-design_23-2148573175.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Help them with securing an appointment.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-52 h-52 object-cover"
                  src="https://img.freepik.com/free-vector/document-signing-partnership-deal-business-consultation-work-arrangement-client-assistant-writing-contract-cartoon-characters_335657-2342.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Work with them to craft the initial offer in a rent agreement.
                </p>
              </div>
            </div>

            <div
              className="mt-10 grid grid-cols-1 md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-52 h-52 object-cover"
                  src="https://img.freepik.com/free-vector/b2b-strategy-commercial-transaction-partner-agreement-partnership-arrangement-successful-collaboration-businessmen-shaking-hands-cartoon-characters-vector-isolated-concept-metaphor-illustration_335657-2760.jpg?w=740"
                />
                <p className="text-center text-lg">
                  After the rent agreement is executed, coordinate the
                  transaction process.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-52 h-52 object-cover"
                  src="https://img.freepik.com/free-vector/documents-concept-illustration_114360-138.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Deliver and explain <br />
                  all documents.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-52 h-52 object-cover"
                  src="https://img.freepik.com/free-vector/realty-agent-holding-keys-standing-near-building-isolated-flat-vector-illustration-cartoon-woman-house-sale_74855-8548.jpg?w=826"
                />
                <p className="text-center text-lg">
                  Work with them through the closing and getting their keys.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 pt-5 pb-10">
          <div className="max-w-6xl w-full m-auto">
            <div className="">
              <div>
                <h2 style={{ fontFamily: "Opensans-bold" }} className="my-5">
                  Renting with R-A-R is simple.
                </h2>
                <Carousel
                  cols={1}
                  rows={1}
                  gap={0}
                  autoplay={10000}
                  hideArrow={true}
                  showDots={true}
                  loop
                >
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                      <div className="flex items-start justify-start flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5"
                        >
                          Visit Rentaroof.com
                        </h6>
                        <p
                          style={{ fontFamily: "Opensans-regular" }}
                          className="text-lg"
                        >
                          You can easily search through the various agent
                          verified properties on our database and save them in
                          your favourite’s. There are several filters that you
                          can use to refine your search drastically. In case you
                          are having trouble finding the right home simply share
                          us your requirements and one of our agents will
                          connect with you.
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <img
                          src="https://img.freepik.com/free-vector/www-concept-illustration_114360-2143.jpg?w=740"
                          className="h-80 object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                      <div className="flex justify-start items-start flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5"
                        >
                          Schedule a visit
                        </h6>
                        <p
                          style={{ fontFamily: "Opensans-regular" }}
                          className="text-lg"
                        >
                          We understand that just images don’t justify the real
                          feel of a home and so scheduling a visit to any of the
                          verified properties listed on Rent-A-Roof is very
                          simple. All you need to do is schedule a visit with
                          your preferred time and one of our agents will connect
                          with you and guide you through the entire visit
                          answering any and all questions you may have.
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <img
                          src="https://img.freepik.com/free-vector/appointment-booking-with-smartphone_23-2148554313.jpg?w=740"
                          className="h-80 object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                      <div className="flex justify-start items-start flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5"
                        >
                          Make an offer
                        </h6>
                        <p
                          style={{ fontFamily: "Opensans-regular" }}
                          className="text-lg"
                        >
                          After scheduling visits, once you find the perfect
                          home that meets all your requirements! You can go on
                          to make an offer through the chat feature in our app
                          with your assigned agent who will facilitate the
                          entire negotiation aspect with the landlord for the
                          final deal.
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <img
                          src="https://img.freepik.com/free-vector/contract-billing-deal-terms-fulfillment-successful-transaction-money-transfer-rent-lease-payment-payer-cash-receiver-cartoon-characters-vector-isolated-concept-metaphor-illustration_335657-2871.jpg?w=740"
                          className="h-80 object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                      <div className="flex justify-center flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5"
                        >
                          Documentation process
                        </h6>
                        <p
                          style={{ fontFamily: "Opensans-regular" }}
                          className="text-lg"
                        >
                          Once the final offer is agreed upon, your agent will
                          move forward with assisting you with the entire
                          documentation process. All aspects of the
                          documentation work have been smartly integrated within
                          our platform including the formation of the final rent
                          agreement by your assigned agent making things even
                          simpler.
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <img
                          src="https://img.freepik.com/free-vector/concept-creating-financial-agreement-flat-design_130740-1759.jpg?w=740"
                          className="h-80 object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                      <div className="flex justify-start items-start flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5"
                        >
                          Getting your keys
                        </h6>
                        <p
                          style={{ fontFamily: "Opensans-regular" }}
                          className="text-lg"
                        >
                          With all aspects of the renting process covered. Our
                          Rent-A-Roof executive will then move forward to
                          handover the keys to your new home!
                        </p>
                      </div>
                      <div className="flex items-center justify-center">
                        <img
                          src="https://img.freepik.com/free-vector/apartment-rent-concept-illustration_114360-2947.jpg?w=740"
                          className="h-80 object-cover rounded-full"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link href="/signup">
                <a
                  style={{
                    fontFamily: "Opensans-bold",
                    backgroundColor: "var(--primary-color)",
                  }}
                  className="px-10 py-4 rounded-full transition-all text-white"
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
