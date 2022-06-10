import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import { FaMinus, FaPlus } from "react-icons/fa";

function Services() {
  const [tab, setTab] = React.useState("01");

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
        <div className="max-w-6xl w-full mx-auto">
          <h2
            className="py-3 mt-3 wow slideInLeft"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Guides for landlords
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 md:space-x-10 space-y-5 md:space-y-0">
            <img
              src="/theme/images/landlord-first.png"
              alt="home rented"
              className="wow slideInLeft"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
            />
            <div className="">
              <h2
                className="text-3xl mt-7 wow slideInRight"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Need to get your{" "}
                <span className="text-blue-500">home rented?</span>
              </h2>
              <div
                className="text-gray-500 wow fadeInUp"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                <p className=" mt-5">
                  When homeowners decide they want to put up their home for
                  rent/sale, the vast majority will call a real estate brokerage
                  firm to work with an agent to get their homes listed on the
                  local Listing Services. You can easily list your home on
                  Rent-a-roof for free!
                  <br />
                  <br />
                  This database is shared among all local brokerage members of
                  Rent-A-Roof, who then work to bring in a tenant for the home.
                  In listing a home, the real estate agent will be performing
                  the various duties and activities in volved in the renting
                  process such as facilitating house showing, processing
                  documents and closing the deal.
                </p>
                <div
                  className="mt-10 mb-5 wow zoomIn"
                  data-wow-delay="0.5s"
                  data-wow-duration="1s"
                >
                  <Link href="/signup">
                    <a
                      style={{ fontFamily: "Opensans-regular" }}
                      className="px-10 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                    >
                      Sign Up
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-gray-50 py-10 mt-10">
          <div className="max-w-6xl w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10 space-x-0 space-y-10 md:space-y-0">
              <div
                className="text-gray-500"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                <h2
                  className="text-3xl mt-10 wow slideInLeft"
                  data-wow-delay="0.1s"
                  data-wow-duration="1s"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  HOW WE CAN HELP YOU TO
                  <br />
                  <span className="text-blue-500">RENT YOUR PROPERTY</span>
                </h2>

                <p
                  className=" mt-5 wow fadeInUp"
                  data-wow-delay="0.2s"
                  data-wow-duration="1s"
                >
                  Rentaroof will take a personal approach to meet your
                  individual needs because we recognise no two landlords are the
                  same. We’ll do everything we can to help you rent out your
                  property at the right price and to the right people.
                </p>
                <p
                  className=" mt-5 wow fadeInUp"
                  data-wow-delay="0.3s"
                  data-wow-duration="1s"
                >
                  Our dedicated team of real estate agents are there to help
                  with any questions you have along the way, from start to
                  finish.
                </p>

                <h6 style={{ fontFamily: "Opensans-bold" }} className="mt-5">
                  VIEWINGS & FEEDBACK
                </h6>

                <p
                  className=" mt-5 wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="1s"
                >
                  We will market your property using our online rental platform,
                  arrange viewings and take potential tenants to see it. These
                  will be on the days that work for you or your current tenants,
                  whether on weekdays, evenings or weekends. We will then
                  provide prompt and honest feedback, together with any
                  suggestions that may help to speed up the process.
                </p>
              </div>
              <img
                src="/theme/images/landlord-second.png"
                alt="homerent"
                className="wow slideInRight"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
              />
            </div>
            <div
              className="text-gray-500"
              style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
            >
              <h6
                style={{ fontFamily: "Opensans-bold" }}
                className="mt-5 wow fadeInUp"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
              >
                ONCE AN OFFER HAS BEEN ACCEPTED
              </h6>

              <p
                className=" mt-5 wow fadeInUp"
                data-wow-delay="0.2s"
                data-wow-duration="1s"
              >
                The application by the tenant will be dealt with by our
                appointed agent. Police verification will be carried out and
                rent agreement details will be agreed upon. Assuming that the
                tenant(s) pass these thorough checks and is approved by you we
                will set a move-in date convenient to all parties.
              </p>

              <h6
                style={{ fontFamily: "Opensans-bold" }}
                className="mt-5 wow fadeInUp"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
              >
                PREPARING THE NEW TENANCY
              </h6>

              <p
                className=" mt-5 wow fadeInUp"
                data-wow-delay="0.4s"
                data-wow-duration="1s"
              >
                Our team will then draw up an Assured Legally binded Rent
                agreement. While much of this is written to be compliant with
                all current lettings laws to ensure both you and the tenants are
                protected during the tenancy, we are also able to tailor clauses
                to suit you and your tenant’s needs.
                <br />
                <br />
                In the run-up to the start of the tenancy, we will help you
                prepare the property and get everything in place for your
                tenants. This may include:
                <ul className="mt-5 list-disc ml-5">
                  <li>Undertaking Maintenance </li>
                  <li>Arranging professional cleaning of your property</li>
                </ul>
                <br />
                On move-in day, we’ll make sure that we have received the first
                month’s rent and relevant security deposit before we release the
                keys to your tenant. We’ll send you the deposit and first
                month’s rent, less our commission, within five working days,
                together with an accounts statement.
                <br />
                <br />
                Once the tenancy has begun, you’ll be your tenants’ contact for
                any repairs or maintenance. You’ll also be responsible for
                taking their rental payments.
                <br />
                <br />
                However, if you’d like us to do this on your behalf, then you
                can choose our full management service instead.
              </p>

              <div
                className="mt-10 wow zoomIn"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
              >
                <Link href="/for-homeowner?enquiry=yes">
                  <a
                    style={{ fontFamily: "Opensans-bold" }}
                    className="px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                  >
                    Contact us for more details
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className=" py-2 mt-10">
          <div className="max-w-6xl mt-10 w-full m-auto ">
            <div className="my-20">
              <div className="max-w-6xl w-full m-auto  grid grid-cols-1 md:grid-cols-2 md:space-x-10">
                <div
                  className="overflow-hidden wow slideInLeft"
                  data-wow-delay="0.1s"
                  data-wow-duration="1s"
                  style={{
                    backgroundImage: "url(/theme/images/tenant-video.png)",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    padding: "2rem",
                  }}
                >
                  <video
                    controls
                    playsinline
                    loop
                    data-src="https://d2of6bhnpl91ni.cloudfront.net/cms/1920x1080_Final_2020_Real Estate LP-b2c23b6555.mp4"
                    src="https://d2of6bhnpl91ni.cloudfront.net/cms/1920x1080_Final_2020_Real Estate LP-b2c23b6555.mp4"
                  ></video>
                </div>
                <div className="flex flex-col justify-center">
                  <h2
                    className="text-3xl mt-5 wow slideInRight"
                    data-wow-delay="0.1s"
                    data-wow-duration="1s"
                    style={{ fontFamily: "Opensans-bold" }}
                  >
                    Leave all your worries to us!
                  </h2>
                  <p
                    className="mt-5 wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
                  >
                    If you’ve ever rented out a home then you surely know about
                    the various steps and hassles that come with it. Things like
                    keeping in touch and screening various applications, keeping
                    up with appointments and home showings, negotiations and
                    paperwork. We at Rent-A-Roof understand these hassles very
                    clearly and provide a very easy interface where all these
                    various tasks are handled directly by us making it possible
                    for renting your home with ease.
                  </p>

                  <div
                    className="mt-10 wow zoomIn"
                    data-wow-delay="0.5s"
                    data-wow-duration="1s"
                  >
                    <Link href="/list-property">
                      <a
                        style={{ fontFamily: "Opensans-bold" }}
                        className="px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                      >
                        Get Started
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-10 bg-blue-50">
          <div className="max-w-6xl w-full m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10 space-y-5 md:space-y-0">
              <div className="">
                <h2
                  className="text-3xl mt-10 wow slideInLeft"
                  data-wow-delay="0.1s"
                  data-wow-duration="1s"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Let us manage your
                  <br /> home for you!
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
                    All properties that are listed on Rent-A-Roof are treated as
                    a responsibility towards our clients. All properties are
                    assigned dedicated R-A-R agents who stay in touch with the
                    homeowners, giving them regular updates and help them
                    through any query they might have. You can learn more about
                    the process below.
                  </p>
                </div>
                <div
                  className="mt-10 wow zoomIn"
                  data-wow-delay="0.5s"
                  data-wow-duration="1s"
                >
                  <Link href="/list-property">
                    <a
                      style={{ fontFamily: "Opensans-bold" }}
                      className="px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                    >
                      Get Started
                    </a>
                  </Link>
                </div>
              </div>
              <img
                src="/theme/images/landlord-third.png"
                alt="search"
                className="wow slideInRight"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
              />
            </div>
          </div>
        </div>

        <div className="py-10 bg-gray-100">
          <div className="max-w-3xl w-full m-auto">
            <h3
              className="text-3xl mt-5 text-center wow fadeInUp"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
              style={{ fontFamily: "Opensans-bold" }}
            >
              It’s simple to get your home rented
            </h3>
            <p
              className="text-gray-500 text-center mb-5 max-w-3xl w-full mx-auto mt-3 wow fadeInUp"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
              style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
            >
              When a client makes an offer, agents help the owner to try to get
              the price they want and to obtain a signed Rent-agreement.
            </p>

            <div
              onClick={() => setTab("01")}
              className="bg-white p-3 mb-3 flex items-center justify-between cursor-pointer"
            >
              <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                List your property for free
              </h5>
              <div>
                <p
                  className={`w-8 h-8 ${
                    tab === "01" ? "hidden" : "flex"
                  } items-center justify-center rounded-full bg-blue-600 text-white`}
                >
                  <FaPlus />
                </p>
                <p
                  className={`w-8 h-8 ${
                    tab === "01" ? "flex" : "hidden"
                  } items-center justify-center rounded-full bg-yellow-400 text-white`}
                >
                  <FaMinus />
                </p>
              </div>
            </div>
            {tab === "01" && (
              <div className="flex items-center bg-white p-3">
                <img
                  className="h-40 w-40 md:mr-10 object-cover"
                  src="images/website/fhomeosr1.webp"
                />
                <div className="">
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Opensans-regular",
                    }}
                  >
                    You can easily list your property for free on Rentaroof with
                    all the necessary details required to attract clients.
                  </p>
                </div>
              </div>
            )}

            <div
              onClick={() => setTab("02")}
              className="bg-white p-3 my-3 flex items-center justify-between cursor-pointer"
            >
              <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                Connect with agent
              </h5>
              <div>
                <p
                  className={`w-8 h-8 ${
                    tab === "02" ? "hidden" : "flex"
                  } items-center justify-center rounded-full bg-blue-600 text-white`}
                >
                  <FaPlus />
                </p>
                <p
                  className={`w-8 h-8 ${
                    tab === "02" ? "flex" : "hidden"
                  } items-center justify-center rounded-full bg-yellow-400 text-white`}
                >
                  <FaMinus />
                </p>
              </div>
            </div>
            {tab === "02" && (
              <div className="flex items-center bg-white p-3">
                <img
                  className="h-40 w-40 md:mr-10 object-cover"
                  src="images/website/fhomeosr3.webp"
                />
                <div className="">
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Opensans-regular",
                    }}
                  >
                    All Rent-A-Roof agents are well mannered and qualified
                    executives of Rent-A-Roof. They will manage all the
                    applications and fix appointments as per your instructions.
                  </p>
                </div>
              </div>
            )}
            <div
              onClick={() => setTab("03")}
              className="bg-white p-3 my-3 flex items-center justify-between cursor-pointer"
            >
              <h5 style={{ fontFamily: "Opensans-semi-bold" }}>Negotiations</h5>
              <div>
                <p
                  className={`w-8 h-8 ${
                    tab === "03" ? "hidden" : "flex"
                  } items-center justify-center rounded-full bg-blue-600 text-white`}
                >
                  <FaPlus />
                </p>
                <p
                  className={`w-8 h-8 ${
                    tab === "03" ? "flex" : "hidden"
                  } items-center justify-center rounded-full bg-yellow-400 text-white`}
                >
                  <FaMinus />
                </p>
              </div>
            </div>
            {tab === "03" && (
              <div className="flex items-center bg-white p-3">
                <img
                  className="h-40 w-40 md:mr-10 object-cover"
                  src="images/website/fhomeosr4.webp"
                />
                <div className="">
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Opensans-regular",
                    }}
                  >
                    All offers of potential client’s will be conveyed to you by
                    our agent and upon finalizing the deal. Our agents will then
                    move on to facilitate the documentation process.
                  </p>
                </div>
              </div>
            )}

            <div
              onClick={() => setTab("04")}
              className="bg-white p-3 my-3 flex items-center justify-between cursor-pointer"
            >
              <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                Processing documents
              </h5>
              <div>
                <p
                  className={`w-8 h-8 ${
                    tab === "04" ? "hidden" : "flex"
                  } items-center justify-center rounded-full bg-blue-600 text-white`}
                >
                  <FaPlus />
                </p>
                <p
                  className={`w-8 h-8 ${
                    tab === "04" ? "flex" : "hidden"
                  } items-center justify-center rounded-full bg-yellow-400 text-white`}
                >
                  <FaMinus />
                </p>
              </div>
            </div>
            {tab === "04" && (
              <div className="flex items-center bg-white p-3">
                <img
                  className="h-40 w-40 md:mr-10 object-cover"
                  src="images/website/fhomeosr5.webp"
                />
                <div className="">
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Opensans-regular",
                    }}
                  >
                    All the documents like the written and signed offer, rent
                    agreement and police verification will be carried out by
                    your agent using our pre-defined guidelines and process.
                  </p>
                </div>
              </div>
            )}

            <div
              onClick={() => setTab("05")}
              className="bg-white p-3 my-3 flex items-center justify-between cursor-pointer"
            >
              <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                Closing the deal
              </h5>
              <div>
                <p
                  className={`w-8 h-8 ${
                    tab === "05" ? "hidden" : "flex"
                  } items-center justify-center rounded-full bg-blue-600 text-white`}
                >
                  <FaPlus />
                </p>
                <p
                  className={`w-8 h-8 ${
                    tab === "05" ? "flex" : "hidden"
                  } items-center justify-center rounded-full bg-yellow-400 text-white`}
                >
                  <FaMinus />
                </p>
              </div>
            </div>
            {tab === "05" && (
              <div className="flex items-center bg-white p-3">
                <img
                  className="h-40 w-40 md:ml-10 object-cover"
                  src="images/website/fhomeosr6.webp"
                />
                <div className="">
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Opensans-regular",
                    }}
                  >
                    When you are close to closing the deal any hindrance or
                    problem could prove problematic and that’s where our agents
                    come through. Your R-A-R agent will make sure that
                    everything is on the given timeline and that the process
                    flows smoothly for a swifter experience.
                  </p>
                </div>
              </div>
            )}

            <div
              onClick={() => setTab("06")}
              className="bg-white p-3 my-3 flex items-center justify-between cursor-pointer"
            >
              <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
                Service charge
              </h5>
              <div>
                <p
                  className={`w-8 h-8 ${
                    tab === "06" ? "hidden" : "flex"
                  } items-center justify-center rounded-full bg-blue-600 text-white`}
                >
                  <FaPlus />
                </p>
                <p
                  className={`w-8 h-8 ${
                    tab === "06" ? "flex" : "hidden"
                  } items-center justify-center rounded-full bg-yellow-400 text-white`}
                >
                  <FaMinus />
                </p>
              </div>
            </div>

            {tab === "06" && (
              <div className="flex items-center bg-white p-3">
                <img
                  className="h-40 w-40 md:mr-10 object-cover"
                  src="images/website/fhomeosr7.webp"
                />
                <div className="">
                  <p
                    className="text-gray-600"
                    style={{
                      fontSize: "15px",
                      fontFamily: "Opensans-regular",
                    }}
                  >
                    Upon closure as per our policy we only levy a fee equivalent
                    to the sum of 15 days rent as per the signed agreement for
                    the services provided by the Agent as opposed to the
                    traditional 30-60 day rent amount charged by traditional
                    brokers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Services;
