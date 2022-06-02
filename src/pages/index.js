import Head from "next/head";
import React from "react";
import Link from "next/link";
import Banner from "../components/website/Banner";
import Header from "../components/website/Header";
import CountIcon from "../components/website/CountIcon";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import BlogItem from "../components/website/BlogItem";
import Footer from "../components/website/Footer";
import { shallowEqual, useSelector } from "react-redux";
import server from "../server";
import Carousel from "react-grid-carousel";
import FeaturedProperty from "../components/website/FeaturedProperty";

const getBlogs = async () => {
  let blogs = false;
  await server
    .get("/blogs")
    .then((response) => {
      blogs = response?.data;
    })
    .catch((error) => {
      blogs = error?.response?.data;
    });

  return blogs;
};

function Index() {
  const [play, setPlay] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [dtype, setDType] = useState("tenant");

  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  React.useEffect(() => {
    (async () => {
      const bdata = await getBlogs();
      if (bdata?.status) {
        setBlogs(bdata?.data);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="w-full h-auto flex flex-col bg-gray-50">
        {/**header */}
        <Header />
        <div id="banner">
          {/**banner */}
          <Banner />
        </div>
        {/**counts */}
        <div
          className="p-10 overflow-hidden pt-20"
          style={{ backgroundColor: "#e5eff8" }}
        >
          <div className="max-w-5xl w-full py-5 mx-auto flex items-center justify-between">
            <CountIcon
              Icon={
                <img
                  src="/theme/icons/icon1.png"
                  className="filter w-16 h-16 object-cover"
                  alt="property"
                />
              }
              title="Agent verified properties"
            />
            {/**2nd */}
            <CountIcon
              Icon={
                <img
                  src="/theme/icons/icon2.png"
                  alt="websites"
                  className="filter w-16 h-16 object-cover"
                />
              }
              title="Pay rent securely with our platfform"
            />
            {/**3rd*/}
            <CountIcon
              Icon={
                <img
                  src="/theme/icons/icon3.png"
                  alt="websites"
                  className="filter w-16 h-16 object-cover"
                />
              }
              title="Well-defined documentation process like rent agreement & police verification"
            />

            {/**4th */}
            <CountIcon
              Icon={
                <img
                  src="/theme/icons/icon4.png"
                  alt="support"
                  className="filter w-16 h-16 object-cover"
                />
              }
              title="Integrated chat feature with agent"
            />
          </div>
        </div>

        {/**featured property section */}
        <FeaturedProperty />

        <div className="register-sec">
          <p
            className="text-gray-100 text-lg  wow slideInDown"
            data-wow-delay="0.3s"
            data-wow-duration="1s"
            style={{ fontFamily: "Opensans-regular" }}
          >
            Are you looking
          </p>
          <h2
            style={{ fontFamily: "Opensans-semi-bold" }}
            className="text-white  wow slideInLeft"
            data-wow-delay="0.3s"
            data-wow-duration="1s"
          >
            to rent out ?
          </h2>
          <div
            className="mt-6  wow slideInUp"
            data-wow-delay="0.3s"
            data-wow-duration="1s"
          >
            <Link href="list-property">
              <a className="bg-yellow-500 hover:bg-yellow-600 rounded-full text-xl text-white px-10 py-2">
                LIST NOW
              </a>
            </Link>
          </div>
        </div>

        {/**About us section */}
        <section className="bg-white">
          <div className="max-w-5xl w-full mx-auto py-10">
            <div
              className="relative grid grid-cols-1 md:grid-cols-2 sm:space-x-5  text-center sm:text-left overflow-hidden 
            "
            >
              {/**images */}
              <div
                className=" wow slideInLeft"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
              >
                <img src="/theme/images/about.png" alt="about us" />
              </div>
              {/**about content */}
              <div
                className="flex flex-col justify-start mt-12  wow slideInRight"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
              >
                <h1
                  className=" text-gray-900 text-3xl"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  The Ease of Renting <br />
                  with <span className="text-blue-500">Rent a Roof</span>
                </h1>
                <p
                  className="text-gray-700 text-sm mt-5  wow slideInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="1s"
                  style={{ fontFamily: "Opensans-regular" }}
                  dangerouslySetInnerHTML={{
                    __html: website?.homepage_aboutus_description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{ backgroundColor: "#f6fbff" }}
          className="flex items-center"
        >
          <div className="flex flex-col items-start max-w-xl w-full px-10">
            <h3
              style={{ fontFamily: "Opensans-bold" }}
              className="text-gray-900  wow slideInLeft pt-5"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            >
              Rent a Roof Map Listing
            </h3>
            <p
              className="text-gray-500 mt-4 mb-5  wow slideInUp"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
              style={{ fontFamily: "Opensans-regular" }}
            >
              Delhi is one of the nation's most exciting and best loved cities.
              At Rent-A-Roof, we recognize that searching for an apartment/home
              in a highly competitive market, such as Delhi may seem a bit
              overwhelming at first. Knowledge of what to expect, understanding
              the process and terminology, and learning about the present Delhi
              real estate market will be extremely important in helping you to
              find your perfect home.
              <br />
              <br />
              Our rental agents are trained and ready to help you with all
              aspects of your search. They understand the needs and requirements
              of their clients and have in depth knowledge of the intricate
              details involved in this process such as the tiresome paperwork.
              Their experience and expertise will guarantee that it will be a
              successful, rewarding and enjoyable experience.
            </p>
            <button
              className="px-5 py-3 mb-5 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white  wow slideInUp"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            >
              Read More
            </button>
          </div>
          <div className="flex-1">
            <img
              src="/theme/images/map-image.png"
              alt="map"
              className="object-fill"
            />
          </div>
        </section>
        {/**no hidden charges */}

        <section className="bg-white">
          <div className="max-w-5xl w-full mx-auto py-10">
            <div
              className="relative grid grid-cols-1 md:grid-cols-2 sm:space-x-5  text-center sm:text-left overflow-hidden 
            "
            >
              {/**charges content */}
              <div className="flex flex-col justify-start mt-12">
                <h1
                  className=" text-gray-900 text-3xl  wow slideInLeft"
                  data-wow-delay="0.3s"
                  data-wow-duration="1s"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  No hidden upfront
                  <br /> <span className="text-blue-500">Service charges!</span>
                </h1>
                <p
                  className="text-gray-700 text-sm mt-5  wow slideInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="1s"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  After researching into the current renting sites that claim to
                  eliminate the need of a Real Estate Agent from the equation do
                  so by having hidden service charges. Not just that, we also
                  went through all the major sites ourselves noticing that when
                  a listing was actually free to interact with. In a lot of
                  these cases were actually posted by local real estate agents
                  who will still ask you for a brokerage amount, ranging usually
                  from 30-60 days amount of rent as per Agreement.
                </p>
              </div>
              {/**images */}
              <div
                className=" wow slideInRight"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
              >
                <img src="/theme/images/hidden.png" alt="no hidden charges" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white pt-16 z-40 sticky top-0">
          <div className="max-w-sm shadow-lg w-full bg-white rounded-full px-5 -mb-6 py-1 mx-auto flex items-center justify-evenly">
            <button
              onClick={() => setDType("tenant")}
              className="px-5 py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white  wow zoomIn"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            >
              For Tenants
            </button>
            <button
              onClick={() => setDType("landlord")}
              className="px-5 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white  wow zoomIn"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            >
              For Landlords
            </button>
          </div>
        </section>
        {dtype === "tenant" && (
          <section className="bg-gradient-to-r from-yellow-300 to-yellow-400 p-10">
            <div className="max-w-5xl w-full mx-auto mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/rslider1.webp"
                    alt="visit rent a roof"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Visit Rentaroof.com
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    You can easily search through the various agent verified
                    properties on our database and save them in your
                    favourite’s. There are several filters that you can use to
                    refine your search drastically. In case you are having
                    trouble finding the right home simply share us your
                    requirements and one of our agents will connect with you.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/rslider2.webp"
                    alt="Schedule a visit"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Schedule a visit
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    We understand that just images don’t justify the real feel
                    of a home and so scheduling a visit to any of the verified
                    properties listed on Rent-A-Roof is very simple. All you
                    need to do is schedule a visit with your preferred time and
                    one of our agents will connect with you and guide you
                    through the entire visit answering any and all questions you
                    may have.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/rslider3.webp"
                    alt="Make an offer"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Make an offer
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    After scheduling visits, once you find the perfect home that
                    meets all your requirements! You can go on to make an offer
                    through the chat feature in our app with your assigned agent
                    who will facilitate the entire negotiation aspect with the
                    landlord for the final deal.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 w-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/rslider4.webp"
                    alt="Documentation"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Documentation process
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Once the final offer is agreed upon, your agent will move
                    forward with assisting you with the entire documentation
                    process. All aspects of the documentation work have been
                    smartly integrated within our platform including the
                    formation of the final rent agreement by your assigned agent
                    making things even simpler.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/rslider5.webp"
                    alt="Getting your keys"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Getting your keys
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    With all aspects of the renting process covered. Our
                    Rent-A-Roof executive will then move forward to handover the
                    keys to your new home!
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}
        {dtype === "landlord" && (
          <section className="bg-gradient-to-r from-blue-300 to-blue-400 p-10">
            <div className="max-w-5xl w-full mx-auto mt-10">
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/fhomeosr1.webp"
                    alt="List your property for free"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    List your property for free
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    You can easily list your property for free on Rentaroof with
                    all the necessary details required to attract clients. An
                    agent will be assigned to manage all the tasks required in
                    the renting process. An easy chat feature integrated In our
                    app, your agent will easily be able to share regular updates
                    regarding applications.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/fhomeosr3.webp"
                    alt="Manage appointments"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Manage appointments
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    All Rent-A-Roof agents are well mannered and qualified
                    executives of Rent-A-Roof. They will manage all the
                    applications and fix appointments as per your instructions.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 w-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/fhomeosr4.webp"
                    alt="Negotiations"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Negotiations
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    All offers of potential client’s will be conveyed to you by
                    our agent and upon finalizing the deal. Our agents will then
                    move on to facilitate the documentation process.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 w-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/fhomeosr5.webp"
                    alt="Processing documents"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Processing documents
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    All the documents like the written and signed offer, rent
                    agreement and police verification will be carried out by
                    your agent using our pre-defined guidelines and process.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/fhomeosr6.webp"
                    alt="Closing the deal"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Closing the deal
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    When you are close to closing the deal any hindrance or
                    problem could prove problematic and that’s where our agents
                    come through. Your R-A-R agent will make sure that
                    everything is on the given timeline and that the process
                    flows smoothly for a swifter experience.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-y-10 space-y-10 mt-10">
                <div className="flex items-center justify-start pt-10">
                  <img
                    className="h-72 object-contain p-3 bg-white  rounded-md shadow-lg wow slideInLeft"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    src="/images/website/fhomeosr7.webp"
                    alt="Service charge"
                  />
                </div>
                <div className="text-white">
                  <h1
                    className="title md:pr-10 wow slideInRight"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Service charge
                  </h1>
                  <p
                    className="p text-lg mt-5 wow slideInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                  >
                    Upon closure as per our policy we only levy a fee equivalent
                    to the sum of 15 days rent as per the signed agreement for
                    the services provided by the Agent as opposed to the
                    traditional 30-60 day rent amount charged by traditional
                    brokers.
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="bg-white pb-20 pt-16">
          <div className="max-w-5xl w-full mx-auto py-10">
            <div
              className="relative grid grid-cols-1 md:grid-cols-2 sm:space-x-5  text-center sm:text-left overflow-hidden 
            "
            >
              {/**images */}
              <div
                className="cursor-pointer  wow slideInLeft"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                onClick={() => setPlay(true)}
              >
                <img src="/theme/images/video.png" alt="video" />
              </div>
              {/**about content */}
              <div className="flex flex-col justify-start mt-12">
                <h1
                  className=" text-gray-900 text-3xl  wow slideInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="1s"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  They say trust is everything, and for 92 years you've trusted
                  us to look after your real estate needs.
                </h1>
                <p
                  className="text-gray-700 text-sm mt-5  wow slideInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="1s"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
              </div>
            </div>
          </div>
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
                  src={website?.homepage_video_url}
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
        </section>

        {/**blogs */}
        {false && (
          <div className="flex flex-col items-center justify-between bg-gray-50 p-10">
            <h3
              className="font-bold mb-5 text-center"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Have you read our real estate blog?
            </h3>
            <div className="flex items-center">
              <Carousel cols={3} rows={1} gap={10} loop>
                {blogs?.length > 0 &&
                  blogs?.map((blog, i) => (
                    <Carousel.Item key={i}>
                      <BlogItem data={blog} />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
          </div>
        )}

        {/**footer */}
        <Footer />
      </div>
    </>
  );
}

export default Index;
