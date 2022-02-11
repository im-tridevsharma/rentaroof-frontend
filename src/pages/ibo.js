import React from "react";
import Head from "next/head";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import Carousel from "react-grid-carousel";

function Ibo() {
  const [content, setContent] = React.useState({
    rental: false,
    screen: false,
    sing: false,
    collect: false,
  });
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
        <div
          className="w-full relative"
          style={{
            height: "600px",
            backgroundPosition: "center",
            backgroundImage: "url(images/website/ibo_header.jpg)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="absolute w-full h-full top-0 left-0"
            style={{ backgroundColor: "rgba(0,0,0,.35)" }}
          ></div>
          <div className="absolute mx-auto text-center top-1/2 left-1/2 max-w-3xl w-full transform -translate-x-1/2 -translate-y-1/2">
            <h1
              className="text-white"
              style={{ fontFamily: "Opensans-bold", lineHeight: "55px" }}
            >
              List your rental. Screen tenants. Sign an agreement. Get paid.
            </h1>
            <h5
              style={{ fontFamily: "Opensans-bold" }}
              className="text-white mt-5 mb-5"
            >
              All at one place with Rent A Roof.
            </h5>

            <div className="mt-10">
              <Link href="/list-property">
                <a
                  className="p-5 rounded-md text-white text-lg"
                  style={{
                    backgroundColor: "var(--blue)",
                    fontFamily: "Opensans-bold",
                  }}
                >
                  List Your First Property
                </a>
              </Link>
              <p className="mt-8 text-white">
                Already have an account ?{" "}
                <Link
                  href="/login"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  <a className="underline">Login</a>
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="py-10 max-w-6xl w-full m-auto bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-10">
            <div className="flex items-center md:mx-10 flex-col text-center">
              <img
                className="h-32 w-32 object-cover"
                src="https://news.maidstone.gov.uk/__data/assets/image/0012/341220/house-illustration-png-7.png"
              />
              <h5 style={{ fontFamily: "Opensans-bold" }}>
                Fill vacancies and manage properties
              </h5>
              <p className="mt-5 text-lg">
                Landlording made simple, whether you have one rental or an
                entire portfolio.
              </p>
            </div>
            <div className="flex items-center md:mx-20 flex-col text-center">
              <img
                className="h-32 w-32 object-cover"
                src="https://st.depositphotos.com/1010751/3812/v/600/depositphotos_38123135-stock-illustration-vector-logo-team-friends-6.jpg"
              />
              <h5 style={{ fontFamily: "Opensans-bold" }}>
                Over 30 million visitors each month*
              </h5>
              <p className="mt-5 text-lg">
                Your property will be listed across World, Trulia and HotPads to
                help you find your perfect renter.
              </p>
            </div>
            <div className="flex items-center md:mx-20 flex-col text-center">
              <img
                className="h-32 w-32 object-cover"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDybOnQFizSLKDvo9nGzsAiWLQrHi_12z_jmv3Mw1IEgLeexFAbYgPc7J34d9ZTsuEwuA&usqp=CAU"
              />
              <h5 style={{ fontFamily: "Opensans-bold" }} className="w-32">
                A brand you can trust
              </h5>
              <p className="mt-5 text-lg">
                Landlord tools built by industry experts and the brand that
                knows real estate.
              </p>
            </div>
          </div>

          <div className="text-center my-32">
            <h2 style={{ fontFamily: "Opensans-bold" }}>
              It's easier than ever to be an ibo
            </h2>
            <p className="text-lg mt-5">
              Save time with our property management tools that help you get
              what you need — signed leases and rent payments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Post a rental property
              </h3>
              <p className="text-lg mt-5">
                Easy-to-use tools let you list your property where millions of
                renters search each month. Plus, messaging and tenant screening
                are integrated into our listing platform to help you find and
                screen applicants faster.
              </p>
              <p className={`text-lg ${!content.rental && "hidden"}`}>
                Easy-to-use tools let you list your property where millions of
                renters search each month. Plus, messaging and tenant screening
                are integrated into our listing platform to help you find and
                screen applicants faster. Easy-to-use tools let you list your
                property where millions of renters search each month. Plus,
                messaging and tenant screening are integrated into our listing
                platform to help you find and screen applicants faster.
              </p>
              <div className="mt-10 flex items-center">
                <Link href="/signup/ibo">
                  <a
                    className="px-10 py-3 border-2 text-lg text-blue-600 border-blue-600 rounded-md"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Get Started
                  </a>
                </Link>
                <a
                  onClick={() =>
                    setContent((prev) => ({ ...prev, rental: !content.rental }))
                  }
                  className="ml-5 border text-blue-800 text-lg border-none"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Learn More
                </a>
              </div>
            </div>
            <div
              className="rounded-md h-96"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/post-property.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-32">
            <div
              className="rounded-md h-96"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/screening.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Screen tenants with online rental applications
              </h3>
              <p className="text-lg mt-5">
                Easy-to-use tools let you list your property where millions of
                renters search each month. Plus, messaging and tenant screening
                are integrated into our listing platform to help you find and
                screen applicants faster.
              </p>
              <p className={`text-lg ${!content.screen && "hidden"}`}></p>
              <div className="mt-10 flex items-center">
                <Link href="/signup/ibo">
                  <a
                    className="px-10 py-3 border-2 text-lg text-blue-600 border-blue-600 rounded-md"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Get Started
                  </a>
                </Link>
                <a
                  onClick={() =>
                    setContent((prev) => ({ ...prev, screen: !content.screen }))
                  }
                  className="ml-5 border text-blue-800 text-lg border-none"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-32">
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Sign a rental agreement
              </h3>
              <p className="text-lg mt-5">
                Create your rental lease using our online lease builder and
                templates drafted with local law firms, or upload your own lease
                and e-sign it with your renters.
              </p>
              <p className={`text-lg ${!content.sing && "hidden"}`}></p>
              <div className="mt-10 flex items-center">
                <Link href="/signup/ibo">
                  <a
                    className="px-10 py-3 border-2 text-lg text-blue-600 border-blue-600 rounded-md"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Create an agreement
                  </a>
                </Link>
                <a
                  onClick={() =>
                    setContent((prev) => ({ ...prev, sing: !content.sing }))
                  }
                  className="ml-5 border text-blue-800 text-lg border-none"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Learn More
                </a>
              </div>
            </div>
            <div
              className="rounded-md h-96"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/sign.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-32">
            <div
              className="rounded-md h-96"
              style={{
                backgroundRepeat: "no-repeat",
                backgroundImage: "url(images/website/payment.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <div className="md:pr-10">
              <h3 style={{ fontFamily: "Opensans-bold" }}>
                Collect rent payments
              </h3>
              <p className="text-lg mt-5">
                The convenient way for landlords to get paid. Rent, utilities,
                move-in fees and more are deposited straight into your bank
                account — at no cost to you.
              </p>
              <p className={`text-lg ${!content.collect && "hidden"}`}></p>
              <div className="mt-10 flex items-center">
                <Link href="/signup/ibo">
                  <a
                    className="px-10 py-3 border-2 text-lg text-blue-600 border-blue-600 rounded-md"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Get Paid
                  </a>
                </Link>
                <a
                  onClick={() =>
                    setContent((prev) => ({
                      ...prev,
                      collect: !content.collect,
                    }))
                  }
                  className="ml-5 border text-blue-800 text-lg border-none"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 bg-gray-100">
          <div className="max-w-6xl w-full m-auto ">
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 mt-32">
              <div className="md:pr-10">
                <h3 style={{ fontFamily: "Opensans-bold" }}>
                  Your first property is waiting
                </h3>
                <ul className="mt-5 text-lg leading-10">
                  <li className="flex items-center">
                    <FiCheck className="text-blue-500 mr-5" /> Posting to
                    RentaRoof, Trulia and HotPads
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-blue-500 mr-5" /> Tenant screening
                    with background and credit checks
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-blue-500 mr-5" /> Online agreements
                  </li>
                  <li className="flex items-center">
                    <FiCheck className="text-blue-500 mr-5" /> Online rent
                    payments
                  </li>
                </ul>
                <div className="mt-10 flex items-center">
                  <Link href="/signup/ibo">
                    <a
                      className="px-10 py-3 text-lg bg-blue-600 text-white rounded-md"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      Get Started
                    </a>
                  </Link>
                </div>
              </div>
              <div
                className="rounded-md h-96"
                style={{
                  backgroundRepeat: "no-repeat",
                  backgroundImage: "url(images/website/property-waiting.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="py-10 max-w-6xl w-full m-auto bg-white">
          <div className="mt-32 text-center">
            <h4 style={{ fontFamily: "Opensans-bold" }} className="mb-10">
              Here’s what others are saying
            </h4>
            <Carousel cols={1} rows={1} gap={10} loop>
              <Carousel.Item>
                <div className="">
                  <p className="text-lg">
                    RentaRoof Rental Manager is awesome! Rented two houses in
                    two days!”
                  </p>
                  <p style={{ fontFamily: "Opensans-bold" }} className="mt-4">
                    Jeff, Property Manager, Chicago, IL
                  </p>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="">
                  <p className="text-lg">
                    "The number and quality of inquiries was amazing. Very
                    pleased by how user-friendly and fast it is."
                  </p>
                  <p style={{ fontFamily: "Opensans-bold" }} className="mt-4">
                    Amanda, IBO, Portland, OR
                  </p>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <div
          className="mt-20 h-96 relative"
          style={{
            backgroundColor: "gray",
            backgroundPosition: "center center",
            backgroundImage:
              "url(https://nodes3cdn.hotpads.com/rental-manager-web/1644263422/media/post-listing-cta-background.130f08bd.webp)",
          }}
        >
          <div className="absolute mx-auto text-center top-1/2 left-1/2 max-w-3xl w-full transform -translate-x-1/2 -translate-y-1/2">
            <h2
              className="text-white"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              Rent with confidence
            </h2>
            <p
              className="text-white mt-5 text-lg"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Take the hassle out of landlording with RentaRoof Rental Manager.
              Post a listing, screen tenants, sign a lease and collect payments
              all in one place.
            </p>
            <div className="mt-10 flex items-center justify-center">
              <Link href="/signup/ibo">
                <a
                  className="px-10 py-3 text-lg bg-blue-600 text-white rounded-md"
                  style={{ fontFamily: "Opensans-regular" }}
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
