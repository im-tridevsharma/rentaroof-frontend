import Head from "next/head";
import React from "react";
import Link from "next/link";
import Banner from "../components/website/Banner";
import Header from "../components/website/Header";
import { FiPlayCircle } from "react-icons/fi";
import CountIcon from "../components/website/CountIcon";
import Option from "../components/website/Option";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import Testimonial from "../components/website/Testimonial";
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
        {/**banner */}
        <Banner />
        {/**counts */}
        <div className="p-10" style={{ backgroundColor: "#e5eff8" }}>
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
            className="text-gray-100 text-lg"
            style={{ fontFamily: "Opensans-regular" }}
          >
            Are you looking
          </p>
          <h2
            style={{ fontFamily: "Opensans-semi-bold" }}
            className="text-white"
          >
            to rent out ?
          </h2>
          <div className="mt-6">
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
              <div className="">
                <img src="/theme/images/about.png" alt="about us" />
              </div>
              {/**about content */}
              <div className="flex flex-col justify-start mt-12">
                <h1
                  className=" text-gray-900 text-3xl"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  The Ease of Renting <br />
                  with <span className="text-blue-500">Rent a Roof</span>
                </h1>
                <p
                  className="text-gray-700 text-sm mt-5"
                  style={{ fontFamily: "Opensans-regular" }}
                  dangerouslySetInnerHTML={{
                    __html: website?.homepage_aboutus_description,
                  }}
                ></p>
              </div>
            </div>
          </div>
        </section>
        {/**no hidden charges */}

        <div
          className=""
          style={{
            backgroundColor: "var(--primary-color)",
            borderColor: "#fff",
          }}
        >
          <div className="grid overflow-hidden grid-cols-1 md:grid-cols-2 text-white">
            <div className="bg-white flex items-center justify-center">
              <img
                className="object-cover h-full"
                src="images/website/hmnohc.webp"
              />
            </div>
            <div className="relative p-10">
              <h2 className="italic" style={{ fontFamily: "Opensans-bold" }}>
                No hidden upfront service charges!
              </h2>
              <p
                className="text-md mt-5"
                style={{ fontFamily: "Opensans-regular" }}
              >
                After researching into the current renting sites that claim to
                eliminate the need of a Real Estate Agent from the equation do
                so by having hidden service charges. Not just that, we also went
                through all the major sites ourselves noticing that when a
                listing was actually free to interact with. In a lot of these
                cases were actually posted by local real estate agents who will
                still ask you for a brokerage amount, ranging usually from 30-60
                days amount of rent as per Agreement.
              </p>

              <p
                className="text-md mt-5"
                style={{ fontFamily: "Opensans-regular" }}
              >
                Rent-a-Roof wants to eliminate this incoherence in the renting
                sector by being transparent and systemized with our process. As
                per our policy unless and until our clients find the right home
                that fits their requirements with full assistance through the
                entire process to make the already hectic process of shifting
                and renting a new home much easier. A service charge of amount
                equivalent to 15 days rent as per agreement will only be levied
                once the Rent agreement has been signed and our clients are
                happy with our services!
              </p>
            </div>
          </div>
        </div>

        {/**video section */}
        <div className="h-128 w-full bg-white flex flex-col items-center relative">
          <div className="h-1/2 w-full bg-gray-100 flex flex-col items-center p-7">
            <h5 className="font-semibold max-w-2xl w-full text-center text-gray-700">
              {website?.homepage_video_title}
            </h5>
            <p className="my-2 text-gray-800 text-center">
              {website?.homepage_video_description}
            </p>
          </div>
          <div
            className="absolute top-52 sm:top-32 bg-gray-200 overflow-hidden"
            style={{
              maxWidth: "800px",
              width: "100%",
              height: "350px",
            }}
          >
            <img
              className="object-cover"
              style={{ height: "350px", width: "100%" }}
              src="/images/website/playvideo.jpg"
              alt="support"
            />
            <FiPlayCircle
              className="absolute  transform -translate-x-1/2 -translate-y-1/2
            top-1/2 left-1/2 text-white text-6xl z-20 cursor-pointer"
              onClick={() => setPlay(true)}
            />
            <div
              className="absolute h-128 -left-10 z-10 top-1/2"
              style={{
                transform: "rotate(-22deg)",
                width: "1000px",
                backgroundColor: "rgba(0,0,0,.3)",
              }}
            ></div>
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
        </div>

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
