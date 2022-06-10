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
        <div className="max-w-6xl w-full mx-auto">
          <h2
            className="py-3 mt-3 wow slideInLeft"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Guides for tenants
          </h2>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 md:space-x-10 space-y-5 md:space-y-0">
            <img
              src="/theme/images/tenant-search.png"
              alt="search"
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
                SEARCHING FOR A RENTAL UNIT
              </h2>
              <div
                className="text-gray-500 wow fadeInUp"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                <p
                  className=" mt-5 wow fadeInUp"
                  data-wow-delay="0.4s"
                  data-wow-duration="1s"
                >
                  Searching for an apartment can be frustrating and exhausting.
                  However, if you follow a guideline, such as listed below, your
                  search can go smoothly.
                </p>
                <p
                  className=" mt-5 wow fadeInUP"
                  data-wow-delay="0.5s"
                  data-wow-duration="1s"
                >
                  1. Create a realistic budget. Decide what you can afford in
                  rent, including monthly utilities. Don’t look at any
                  apartments out of your price range.
                </p>
                <p
                  className=" mt-5 wow fadeInUp"
                  data-wow-delay="0.6s"
                  data-wow-duration="1s"
                >
                  2. Consider commute times, your lifestyle needs and local
                  conveniences. Some things to consider when searching for an
                  apartment:
                  <br /> • Transportation Bus and rail routes; are they in
                  walking distance from the rental? <br />• Grocery stores: Is
                  there a grocery or other convenience store(s) within walking
                  distance?
                </p>
              </div>
            </div>
          </div>
          <div
            className="text-gray-500"
            style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
          >
            <p
              className="mt-5 wow fadeInUp"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
            >
              • Schools Do you have a child attending school? What are the local
              schools like?
              <br /> • Activity: Are people out and about in the neighbourhood?
              Are the properties well maintained?
            </p>
            <p
              className="mt-5 wow fadeInUp"
              data-wow-delay="0.2s"
              data-wow-duration="1s"
            >
              3. Look for vacant rental units. You can search for verified
              available rental units in your area on rentaroof easily by
              refining your search using our custom filters.
            </p>
            <p
              className="mt-5 wow fadeInUp"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            >
              4. Keep your housing search organised. You can easily do that on
              rentaroof by saving your favourite properties to view later making
              it easier to organise your search.
            </p>
            <p
              className="mt-5 wow fadeInUp"
              data-wow-delay="0.4s"
              data-wow-duration="1s"
            >
              5. Make appointments to see the apartments. We all know that just
              viewing a property on a website does not justify or portray the
              reality of the place you’ll be choosing to live in. So we have
              aimed to make this process much easier; you can easily share your
              preferred time with the managing agent of the property and he will
              get in touch with you to schedule a visit as per your convenience
              and after getting confirmation from the landlord.
            </p>
          </div>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 md:space-x-10 space-y-5 md:space-y-0">
            <div className="">
              <h2
                className="text-3xl wow slideInLeft"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Scheduling visits and <br />
                taking notes
              </h2>
              <div
                className="text-gray-500 wow fadeInUp"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                <p className=" mt-5">
                  1. Write down what features are important to you, such as
                  parking, proximity to public transportation, security, laundry
                  facilities and number of bedrooms and bathrooms.
                </p>
                <p className=" mt-5">
                  2. Is there parking? If you have a car you’ll want to know if
                  parking is included in the rent, where it is and how safe it
                  is.
                </p>
                <p className=" mt-5">
                  3. Check the locks, turn on light switches, look inside
                  closets, check water pressure and visit the laundry room.
                </p>
                <p className=" mt-5">
                  4. Finally, go over the lease agreement with the landlord.
                  When is the rent due? How much is the late fee? If you give a
                  deposit, make sure it is returnable and get a receipt.
                </p>
              </div>
            </div>
            <img
              src="/theme/images/tenant-work.png"
              alt="search"
              className="wow slideInRight"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
            />
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 md:space-x-10 space-y-5 md:space-y-0">
            <img
              src="/theme/images/tenant-sign.png"
              alt="sign"
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
                SIGNING THE LEASE
              </h2>
              <div
                className="text-gray-500 wow fadeInUp"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
                style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
              >
                <p className=" mt-5">
                  Congratulations! After looking at apartments and houses you
                  have found one that you would like to live in. Now, the
                  landlord has asked you to pay a security deposit and sign the
                  lease. This section will deal with common questions about
                  leases.
                </p>
                <p className=" mt-5">
                  <b className="block">What is a Lease? </b>
                  <br />
                  <span className="-mt-2 block">
                    A lease is a binding legal contract for a rental property
                    between the owner of a property and the tenant. The lease
                    entitles the tenant(s) to receive exclusive possession of
                    the rental unit and the owner to receive rent. A lease may
                    be either verbal or written If the lease is written, it
                    should be written in plain language so that the tenant can
                    understand the terms of the lease.
                  </span>
                  <br />
                  <span className="-mt-2 block">
                    Before you sign a lease, you should make sure that you
                    understand
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            className="text-gray-500 wow fadeInUp"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
            style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
          >
            <p className="mt-5">
              all of the terms in the lease. There are some common parts to a
              lease with which you should be familiar with.
            </p>
            <p className=" mt-5">
              <b className="block">Security Deposit? </b>
              <br />
              <span className="-mt-2 block">
                The security deposit is money that the tenant gives to the
                landlord when first renting the unit. A security deposit is
                intended to cover damages that might be caused by the tenant
                during the term of the lease. It may also be kept by the
                landlord to cover unpaid rent. The amount of security deposit
                paid to the landlord should be written in the lease, and you
                should get a receipt for the security deposit and keep it in
                your records.
              </span>
            </p>
            <p className=" mt-5">
              <b className="block">Term of the Lease </b>
              <br />
              <span className="-mt-2 block">
                A written lease should specify the date on which the lease
                begins and the date on which the lease ends. You have the right
                to possession of the unit from the day the lease begins to the
                day that the lease ends. Be sure you know when those dates are.
                Some leases provide that they shall automatically renew at the
                end of the lease term unless one party has given notice to the
                other party. Look to see the date by which you must give notice
                if you don’t want to renew your lease. You should put that date
                in a calendar or other safe place to remind yourself.
              </span>
            </p>
          </div>
        </div>
        <div className=" py-2 mt-10">
          <div className="max-w-6xl mt-10 w-full m-auto ">
            <div className="my-20">
              <div className="max-w-6xl w-full m-auto  grid grid-cols-1 md:grid-cols-2 md:space-x-10">
                <div className="flex flex-col justify-center">
                  <h2
                    className="text-3xl mt-5 wow slideInLeft"
                    data-wow-delay="0.1s"
                    data-wow-duration="1s"
                    style={{ fontFamily: "Opensans-bold" }}
                  >
                    For Tenant
                  </h2>
                  <p
                    className="mt-5 wow fadeInUp"
                    data-wow-delay="0.3s"
                    data-wow-duration="1s"
                    style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
                  >
                    Typically, people don't have in-depth knowledge about the
                    real estate markets where they wish to rent homes. They need
                    agents to guide them through neighbourhoods and find homes
                    that best suit their needs. Some agents specialize in
                    working with tenants. They help their clients navigate all
                    aspects of the home renting process, from finding homes to
                    completing the documentation process.
                  </p>

                  <div
                    className="mt-10 wow zoomIn"
                    data-wow-delay="0.5s"
                    data-wow-duration="1s"
                  >
                    <Link href="/signup">
                      <a
                        style={{ fontFamily: "Opensans-bold" }}
                        className="px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white"
                      >
                        Get Started
                      </a>
                    </Link>
                  </div>
                </div>
                <div
                  className="overflow-hidden wow slideInRight"
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
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white mb-10">
          <div className="max-w-6xl mt-10 w-full m-auto ">
            <h2
              className="text-3xl mb-10 text-center wow fadeIn"
              data-wow-delay="0.1s"
              data-wow-duration="1s"
              style={{ fontFamily: "Opensans-bold" }}
            >
              What we offer?
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-3 md:space-x-0 space-y-5 md:space-y-0"
              style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
            >
              <div
                className="flex flex-col items-center md:border-b md:border-r px-3 py-5 border-gray-300 wow flipInY"
                data-wow-delay="0.1s"
                data-wow-duration="1s"
              >
                <img
                  className="w-52 h-52 object-cover"
                  src="images/website/wweo1.webp"
                />
                <p className="text-center">
                  Help the clients to locate and view homes that meet their
                  requirements.
                </p>
              </div>

              <div
                className="flex flex-col items-center md:border-b md:border-r px-3 py-5 border-gray-300 wow flipInY"
                data-wow-delay="0.2s"
                data-wow-duration="1s"
              >
                <img
                  className="w-52 h-52 object-cover"
                  src="images/website/wweo2.webp"
                />
                <p className="text-center">
                  Help them with securing an appointment.
                </p>
              </div>

              <div
                className="flex flex-col items-center md:border-b px-3 py-5 border-gray-300 wow flipInY"
                data-wow-delay="0.3s"
                data-wow-duration="1s"
              >
                <img
                  className="w-52 h-52 object-cover"
                  src="images/website/wweo3.webp"
                />
                <p className="text-center">
                  Work with them to craft the initial offer in a rent agreement.
                </p>
              </div>
            </div>

            <div
              className="grid grid-cols-1 md:grid-cols-3 md:space-x-0 space-y-5 md:space-y-0"
              style={{ fontFamily: "Opensans-regular", fontSize: "15px" }}
            >
              <div
                className="flex flex-col items-center md:border-r px-3 py-5 border-gray-300 wow flipInY"
                data-wow-delay="0.4s"
                data-wow-duration="1s"
              >
                <img
                  className="w-52 h-52 object-cover"
                  src="images/website/wweo4.webp"
                />
                <p className="text-center">
                  After the rent agreement is executed, coordinate the
                  transaction process.
                </p>
              </div>

              <div
                className="flex flex-col items-center md:border-r px-3 py-5 border-gray-300 relative wow flipInY"
                data-wow-delay="0.5s"
                data-wow-duration="1s"
              >
                <span className="w-6 h-6 rounded-full bg-blue-500 absolute -left-3 -top-3 md:block hidden"></span>
                <img
                  className="w-52 h-52 object-cover"
                  src="images/website/wweo5.webp"
                />
                <p className="text-center">
                  Deliver and explain <br />
                  all documents.
                </p>
              </div>

              <div
                className="flex flex-col items-center px-3 py-5 relative wow flipInY"
                data-wow-delay="0.6s"
                data-wow-duration="1s"
              >
                <span className="w-6 h-6 rounded-full bg-blue-500 absolute -left-3 -top-3 md:block hidden"></span>
                <img
                  className="w-52 h-52 object-cover"
                  src="images/website/wweo6.webp"
                />
                <p className="text-center">
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
                <h2
                  style={{ fontFamily: "Opensans-bold" }}
                  className="mt-5 mb-10 text-center text-3xl wow fadeIn"
                  data-wow-delay="0.1s"
                  data-wow-duration="1s"
                >
                  Renting with
                  <span className="text-blue-500">R-A-R is simple.</span>
                </h2>
                <Carousel
                  cols={1}
                  rows={1}
                  gap={0}
                  autoplay={10000}
                  hideArrow={true}
                  showDots={true}
                  dotColorActive="blue"
                  dotColorInactive="white"
                  loop
                >
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10">
                      <div className="flex items-start justify-start flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5 text-3xl"
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
                          src="images/website/rslider1.webp"
                          className="h-80 object-cover"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10">
                      <div className="flex justify-start items-start flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5 text-3xl"
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
                          src="images/website/rslider2.webp"
                          className="h-80 object-cover"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10">
                      <div className="flex justify-start items-start flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5 text-3xl"
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
                          src="images/website/rslider3.webp"
                          className="h-80 object-cover"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10">
                      <div className="flex justify-center flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5 text-3xl"
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
                          src="images/website/rslider4.webp"
                          className="h-80 object-cover"
                        />
                      </div>
                    </div>
                  </Carousel.Item>
                  <Carousel.Item>
                    <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-10">
                      <div className="flex justify-start items-start flex-col">
                        <h6
                          style={{ fontFamily: "Opensans-bold" }}
                          className="my-5 text-3xl"
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
                          src="images/website/rslider5.webp"
                          className="h-80 object-cover"
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
                  }}
                  className="px-8 py-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-all text-white"
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
