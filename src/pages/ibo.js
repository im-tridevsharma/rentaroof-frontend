import React from "react";
import Head from "next/head";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import Link from "next/link";
import Carousel from "react-grid-carousel";
import { FaStar } from "react-icons/fa";

function Ibo() {
  return (
    <>
      <Header />
      <Head>
        <title>IBO</title>
        <meta name="title" content="IBO" />
        <meta name="keywords" content="About IBO, Our Star IBOs" />
        <meta name="description" content="Our IBOs" />
      </Head>
      <>
        <div className="flex flex-col max-w-6xl w-full m-auto my-10">
          {/**section 1 */}
          <div className="flex flex-col md:flex-row items-center">
            <div
              className="rounded-xl overflow-hidden relative w-128 h-64"
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage:
                  "url(https://www.baautorental.com/wp-content/uploads/2021/01/mcree-ford-staff.png)",
              }}
            ></div>
            <div className="flex-1 md:pl-10">
              <h4 className="mb-5">IBOS AT RENT A ROOF</h4>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
          </div>
        </div>
        <div
          className="py-10 md:px-28 w-full"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          <div className="flex">
            <div className="text-white">
              <h5>Meet The IBO</h5>
              <h5>Our Professionals</h5>
            </div>
            <div className="flex-1 pl-10">
              <p className="text-gray-50 mb-5">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English.{" "}
              </p>
              <Link href="/signup/ibo">
                <a className="px-3 py-2 bg-white rounded-full text-gray-700">
                  Sign Up
                </a>
              </Link>
            </div>
          </div>

          {/**teams */}
          <div className="mt-20">
          <Carousel cols={4} rows={1} gap={10} loop>
            <Carousel.Item>
              <div className="flex items-center justify-center flex-col">
                <img
                  className="w-52 h-52 object-contain rounded-full"
                  src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                  alt="ibo1"
                />
                <h5
                  style={{ fontFamily: "Opensans-bold" }}
                  className="text-white mt-3"
                >
                  Keshav Jain
                </h5>
                <p className="flex items-center">
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                </p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex items-center justify-center flex-col">
                <img
                  className="w-52 h-52 object-contain rounded-full"
                  src="http://i.imgur.com/74sByqd.jpg"
                  alt="ibo1"
                />
                <h5
                  style={{ fontFamily: "Opensans-bold" }}
                  className="text-white mt-3"
                >
                  Rohan Sharma
                </h5>
                <p className="flex items-center">
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                </p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex items-center justify-center flex-col">
                <img
                  className="w-52 h-52 object-contain rounded-full"
                  src="http://bootstrap.gallery/everest-v3/img/user5.jpg"
                  alt="ibo1"
                />
                <h5
                  style={{ fontFamily: "Opensans-bold" }}
                  className="text-white mt-3"
                >
                  Kriti Maurya
                </h5>
                <p className="flex items-center">
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                </p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex items-center justify-center flex-col">
                <img
                  className="w-52 h-52 object-contain rounded-full"
                  src="http://satvision.in/wp-content/uploads/2019/06/user.jpg"
                  alt="ibo1"
                />
                <h5
                  style={{ fontFamily: "Opensans-bold" }}
                  className="text-white mt-3"
                >
                  Vipul Sharma
                </h5>
                <p className="flex items-center">
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                </p>
              </div>
            </Carousel.Item>
            <Carousel.Item>
              <div className="flex items-center justify-center flex-col">
                <img
                  className="w-52 h-52 object-contain rounded-full"
                  src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg"
                  alt="ibo1"
                />
                <h5
                  style={{ fontFamily: "Opensans-bold" }}
                  className="text-white mt-3"
                >
                  Mohan Jain
                </h5>
                <p className="flex items-center">
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                  <FaStar size={25} color="yellow"/>
                </p>
              </div>
            </Carousel.Item>
          </Carousel>
          </div>
        </div>
        {/**bottom section */}
        <div className="py-10 max-w-6xl w-full m-auto">
        <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 md:pr-10">
              <h4 className="mb-5">IBOS AT RENT A ROOF</h4>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
            <div
              className="rounded-xl overflow-hidden relative w-128 h-64"
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage:
                  "url(https://www.baautorental.com/wp-content/uploads/2021/01/mcree-ford-staff.png)",
              }}
            ></div>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}

export default Ibo;
