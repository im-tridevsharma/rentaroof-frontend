import Head from "next/head";
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

function Index() {
  const [play, setPlay] = useState(false);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="w-full h-auto flex flex-col">
        {/**header */}
        <Header />
        {/**banner */}
        <Banner />
        {/**counts */}
        <div
          className="grid sm:grid-cols-3 sm:space-x-10 px-10 py-7 text-gray-50"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          {/**1st */}
          <CountIcon
            Icon={<img src="/icons/home/home_icon1.png" alt="property" />}
            bold1="432,592"
            bold2="New Properties"
            text="added within the last 30 days"
          />
          {/**2nd */}
          <CountIcon
            Icon={<img src="/icons/home/home_icon2.png" alt="websites" />}
            bold1="28,998"
            bold2="Visited our website"
            text="within the last 30 days"
          />
          {/**3rd */}
          <CountIcon
            Icon={<img src="/icons/home/home_icon3.png" alt="support" />}
            bold1="CUSTOMER SUPPORT"
            bold2="Week Days"
            text="from 10:00-16:00"
          />
        </div>

        {/**About us section */}
        <div
          className="relative grid grid-cols-1 sm:grid-cols-2 sm:space-x-5 px-10 sm:px-32 text-center sm:text-left py-10 h-128
          "
          style={{
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9)), url(http://cdn.cnn.com/cnnnext/dam/assets/200310023921-dubai-buildings-skyline.jpg)",
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/**images */}
          <div className="hidden sm:flex">
            <div className="flex flex-col mt-20">
              <div
                className="w-40 h-32 mb-3"
                style={{ backgroundColor: "#b9a0ca" }}
              ></div>
              <div className="w-40 h-48 bg-red-300 overflow-hidden">
                <img
                  src="/images/website/building.jpg"
                  alt="img1"
                  className="object-cover h-48"
                />
              </div>
            </div>
            <div className="flex flex-col mt-3">
              <div className="w-40 h-48 bg-red-300 mb-3 ml-3">
                <img
                  src="/images/website/office-buildings.jpg"
                  alt="img2"
                  className="object-cover h-48"
                />
              </div>
              <div
                className="w-40 h-32 ml-3"
                style={{ backgroundColor: "#b9a0ca" }}
              ></div>
            </div>
          </div>
          {/**about content */}
          <div className="flex flex-col mt-20 sm:mt-0 sm:py-10">
            <b className="text-sm">ABOUT US</b>
            <h1
              className="font-thin text-gray-700 text-3xl w-full sm:w-72 my-3"
              style={{ fontFamily: "Opensans-light" }}
            >
              The Ease of Renting with Rent a Roof
            </h1>
            <p
              className="text-gray-700 text-xs"
              style={{ fontFamily: "Opensans-regular" }}
            >
              We are the ones who are bringing the system of renting, which is
              never seen in the Indian market. Experience over 2 decades in the
              real estate sector in India, we are here with new systematic and
              organized services with the help of our experience and technology.
              The premium services for you to feel the warmth. We have colossal
              connectivity to ensure the best-in-class assistance to the
              customers at Rent a Roof.
            </p>
            <div className="mt-7">
              <Link href="/">
                <a
                  className="py-1 px-2 rounded-md text-white"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  BOOK NOW
                </a>
              </Link>
            </div>
          </div>
        </div>

        {/**rental section */}
        <div className="flex flex-col items-center justify-center p-10">
          <h3
            className="text-2xl font-semibold text-center"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Are you looking for a rental home?{" "}
          </h3>
          <div className="grid sm:grid-cols-3 sm:space-x-10 p-10">
            <Option
              Icon={<img src="/icons/home/home_icon4.png" alt="properties" />}
              title="All Properties in one place"
              description="To find a property you need to do 20 things, join here and leave Everything to us."
            />
            <Option
              Icon={<img src="/icons/home/home_icon5.png" alt="money" />}
              title="Compare and Save Money"
              description="Compare every aspect before renting a home. We offer the best deals for you."
            />
            <Option
              Icon={<img src="/icons/home/home_icon6.png" alt="contact" />}
              title="Quick Connect"
              description="Connect easily and set meetings with us to fulfil your renting requirement."
            />
          </div>
        </div>

        {/**video section */}
        <div className="h-128 w-full bg-white flex flex-col items-center relative">
          <div className="h-1/2 w-full bg-gray-100 flex flex-col items-center p-7">
            <h5 className="font-semibold max-w-2xl w-full text-center text-gray-700">
              They say trust is everything, and for 92 years you've trusted us
              to look after your real estate needs.
            </h5>
            <p className="my-2 text-gray-800 text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
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
                  src="https://www.youtube.com/embed/7Qivx2om0MM"
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

        {/**testimonial section */}
        <Testimonial
          bgImage="/images/website/night.jpg"
          title="Our Customer’s Verdict"
          testimonials={[
            {
              author: "Tridev Sharma",
              subtitle: "-",
              text: "Rent A Roof has always been a tremendous help to me. Their services are one of the best in town. I love how they provide you with the opportunity to compare prices and other such things. I could find the perfect home for myself. They have prompt support. It allowed me to reach the crucial decision in just a few seconds. ",
            },
            {
              author: "Mithesh Sharma",
              subtitle: "-",
              text: "I had to change from my last house because of the landlord. It was quite a hassle. But when I learned about Rent a Roof, it changed my view to get a roof over my head. It was one of the best experiences so far. Thank you, Rent A Roof, for providing such an excellent service for reaching the landlord. It was so comfortable that I forgot how to go to the house to look at it physically. Their assistance is indeed one of the best in Real Estate",
            },
          ]}
        />

        {/**blogs */}
        <div className="flex flex-col items-center justify-between bg-white p-10">
          <h5
            className="font-bold mb-5 text-center"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Have you read our real estate blog?
          </h5>
          <div className="flex flex-col sm:flex-row">
            <BlogItem />
            <BlogItem />
            <BlogItem />
          </div>
        </div>
        {/**footer */}
        <Footer />
      </div>
    </>
  );
}

export default Index;
