import React from "react";
import Head from "next/head";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";

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
        <div
          className="for-tenant-slider"
          style={{ backgroundColor: "#faf8fa" }}
        >
          <img
            className="h-32 object-contain absolute"
            src="https://animoto.com/static/YellowCorner-d367eaf0eeff2a90f1d4d374e3b1c3e8.svg"
          />
          <div className="max-w-6xl h-full w-full mx-auto grid grid-cols-1 md:grid-cols-2 md:space-x-5">
            <div className="flex h-full justify-end md:-mt-10 flex-col pb-10 md:pr-10">
              <h1 style={{ fontFamily: "Opensans-bold" }} className="mb-4">
                Join
              </h1>
              <h1 style={{ fontFamily: "Opensans-bold" }}>Our Team</h1>
              <p
                style={{ fontFamily: "Opensans-regular" }}
                className="text-lg mt-5"
              >
                Rent-A-Roof is a revolutionary business plan to give all
                brokers/real estate agents the platform to join together and
                form an association of Real Estate Agents throughout Delhi NCR
                and ultimately all of India.
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
            <div className="flex flex-col justify-end pb-20">
              <img
                className="rounded-t-full rounded-b-md"
                src="https://img.freepik.com/free-vector/business-team-brainstorm-idea-lightbulb-from-jigsaw-working-team-collaboration-enterprise-cooperation-colleagues-mutual-assistance-concept-pinkish-coral-bluevector-isolated-illustration_335657-1651.jpg?w=740"
              />
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "rgba(0,0,0,.01)" }} className="pb-10">
          <div
            className="h-128"
            style={{
              backgroundImage:
                "url(https://img.freepik.com/free-vector/real-estate-agency-interior-flat-composition-with-realtor-helping-family-couple-buyers-choosing-first-house_1284-61532.jpg?w=826)",
            }}
          />
          <div className="bg-white shadow-md text-center max-w-6xl w-full m-auto p-10 rounded-3xl -mt-20">
            <h3 style={{ fontFamily: "Opensans-bold" }} className="my-5">
              Section Title
            </h3>
            <p
              className="text-lg mt-3"
              style={{ fontFamily: "Opensans-regular" }}
            >
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content. Lorem ipsum may
              be used as a placeholder before the final copy is testing.
            </p>
          </div>
        </div>

        <div style={{ backgroundColor: "#faf8fa" }} className="py-10">
          <div className="max-w-6xl w-full mx-auto">
            <h3
              className=" text-gray-700"
              style={{ fontFamily: "Opensans-bold" }}
            >
              What are the benefits of joining
              <br /> our team?
            </h3>
            <div className="grid mt-16 grid-cols-1 md:grid-cols-3 md:space-x-5 md:space-y-5 space-y-5">
              <div className="flex items-start justify-between mt-5">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1253/1253323.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Brand Name
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    When you join our team you will be given R-A-R gear
                    providing greater trust to clients & customers.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/852/852967.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Pre-defined documentation process
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    One of the biggest benefits of joining R-A-R has to be our
                    process right through our website and app.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1255/1255740.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Payment gateway
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    To provide greater trust to clients & customers we have the
                    option of the payment being processed through our payment
                    gateway guaranteeing a systematic and trustworthy payment
                    procedure.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1118/1118193.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Service Charges
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Service Charges will be deposited to all agents who work
                    hard and close deals. There is no cap to the incentives you
                    can earn with R-A-R!
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1245/1245813.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    New properties
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    One disadvantage of being a local Real estate agent is
                    limited number of properties in your personal database but
                    with R-A-R you don’t need to worry about that as agents will
                    have the opportunity to show and facilitate unassigned
                    properties posted by homeowners.
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between">
                <img
                  className="h-20 object-contain"
                  src="https://cdn-icons-png.flaticon.com/512/1241/1241603.png?w=740"
                />
                <div className="ml-5">
                  <h4 style={{ fontFamily: "Opensans-semi-bold" }}>
                    Support & Training
                  </h4>
                  <p
                    className="text-lg mt-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    Special support will be provided to all agents who join our
                    team. And all new joining agents will be provided soft
                    skills training as well as basic guidelines that all R-A-R
                    agents must follow along with the training on how to use our
                    platform for maximising it’s potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-10 pt-5 max-w-6xl w-full m-auto bg-white">
          <div className="mt-12 text-gray-700">
            <h3 className="text-center" style={{ fontFamily: "Opensans-bold" }}>
              What are the duties of a Real Estate Agent?
            </h3>
            <div
              className="mt-20 grid grid-cols-1 md:grid-cols-3 md:space-x-10 space-y-5 md:space-y-0"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <div className="flex flex-col items-center">
                <img
                  className="w-40 h-40 object-cover"
                  src="https://img.freepik.com/free-vector/messaging-fun-concept-illustration_114360-1870.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Respond to texts, emails, <br />
                  and phone calls.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-40 h-40 object-cover"
                  src="https://img.freepik.com/free-vector/document-signing-partnership-deal-business-consultation-work-arrangement-client-assistant-writing-contract-cartoon-characters_335657-2342.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Process real estate documents, agreements, and lease records.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <img
                  className="w-40 h-40 object-cover"
                  src="https://img.freepik.com/free-vector/appointment-booking-mobile-design_23-2148573175.jpg?w=740"
                />
                <p className="text-center text-lg">
                  Coordinate appointments, showings, open houses, and meetings.
                </p>
              </div>
            </div>
            <div className="mt-14 flex justify-center">
              <Link href="/signup/ibo">
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
        <div className="pb-10 bg-gray-50">
          <div className="max-w-6xl w-full m-auto">
            <div className="pt-3">
              <h3 className="my-10" style={{ fontFamily: "Opensans-bold" }}>
                Learn more about our process
              </h3>

              <div className="grid grid-cols-1 mt-3 md:grid-cols-2 md:space-x-5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 pr-5  border-r border-dotted">
                  <img
                    className="h-48 w-full object-cover border border-white-50 rounded-md"
                    src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1647429955~exp=1647430555~hmac=595d778a3f770ce6001794409c8cf93c840f8a09b83b33b1312583ecd7d08c60&w=740"
                  />
                  <div>
                    <h6 style={{ fontFamily: "Opensans-semi-bold" }}>
                      Sign up on Rent-A-Roof as agent
                    </h6>
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Opensans-regular",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      Signing up as an agent is easy simply click the sign in
                      button and enter your details.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                  <div>
                    <h6 style={{ fontFamily: "Opensans-semi-bold" }}>
                      Mobile & email verification
                    </h6>
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Opensans-regular",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      After signing up you’ll be sent an otp on your mobile and
                      email for verification & official purposes.
                    </p>
                  </div>
                  <img
                    className="h-48 w-full object-cover border border-white-50 rounded-md"
                    src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5488.jpg?t=st=1647428895~exp=1647429495~hmac=65640e67ad10995f23ac79b0416667ef9c070156504a142cd00a76a871d3abf0&w=740"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 pt-6 md:grid-cols-2 md:space-x-5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 pr-5  border-r border-dotted">
                  <img
                    className="h-48 w-full object-cover border border-white-50 rounded-md"
                    src="https://img.freepik.com/free-vector/verified-concept-illustration_114360-5138.jpg?t=st=1647427515~exp=1647428115~hmac=357de46eb98106b4b4f98d78bcf733d22b084b1e15b256b12aff694fad68d27d&w=740"
                  />
                  <div>
                    <h6 style={{ fontFamily: "Opensans-semi-bold" }}>
                      KYC verification
                    </h6>
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Opensans-regular",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      As we have to hold a certain standard and wish to provide
                      trust to our clients, we facilitate KYC procedure for all
                      our agents in order to improve not only the services we
                      provide to our customers but also better support for our
                      agents.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                  <div>
                    <h6 style={{ fontFamily: "Opensans-semi-bold" }}>
                      Post new properties
                    </h6>
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Opensans-regular",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      Once your account has been setup and approved from the
                      backend you can easily start posting properties which will
                      then be needed to be verified and upon verifying every new
                      property. Agents can earn points which they can exchange
                      for various vouchers and coupons from our redeemable
                      sections.
                    </p>
                  </div>
                  <img
                    className="h-48 w-full object-cover border border-white-50 rounded-md"
                    src="https://img.freepik.com/free-vector/man-standing-flipchart-with-list_1262-19830.jpg?t=st=1647430161~exp=1647430761~hmac=4196e612c41ff05f34791bde9d6f2b219230dd97f36d999dbda22b0c6b0030c7&w=740"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 pt-6 md:grid-cols-2 md:space-x-5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 pr-5  border-r border-dotted">
                  <img
                    className="h-48 w-full object-cover border border-white-50 rounded-md"
                    src="https://img.freepik.com/free-vector/businessman-planning-events-deadlines-agenda_74855-6274.jpg?t=st=1647427876~exp=1647428476~hmac=8f7423372acaa60fec71a58a736cb4daf209046687a9d624f32069affa86c62b&w=740"
                  />
                  <div>
                    <h6 style={{ fontFamily: "Opensans-semi-bold" }}>
                      Manage upcoming appointments
                    </h6>
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Opensans-regular",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      All verified properties will be viewable through our
                      website and app allowing clients to easily book house
                      showings and appointments. You can easily manage all your
                      upcoming appointments right from your dashboard. All
                      agents will have to show up on time of the appointment and
                      guide their client’s throughout their visit answering any
                      questions that they might have.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                  <div>
                    <h6 style={{ fontFamily: "Opensans-semi-bold" }}>
                      Facilitating negotiations
                    </h6>
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Opensans-regular",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      If any client makes an offer, it will be your
                      responsibility to connect with both the owner and client
                      in order to facilitate the entire negotiation process
                      until the final deal. To make this process easier we have
                      provided integrated feature in the chat box where clients
                      can easily make their offer and the agent can either
                      accept it or reject it after consulting with the
                      homeowner.
                    </p>
                  </div>
                  <img
                    className="h-48 w-full object-cover border border-white-50 rounded-md"
                    src="https://img.freepik.com/free-vector/business-deal_52683-6262.jpg?t=st=1647427568~exp=1647428168~hmac=a3813dfaf1081f4bf6d9fb3600a5bb1ce1e0cb7b2ccaf38d7a7d4781f3ae2e62&w=740"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 pt-6 md:grid-cols-2 md:space-x-5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5 pr-5  border-r border-dotted">
                  <img
                    className="h-48 w-full object-cover border border-white-50 rounded-md"
                    src="https://img.freepik.com/free-vector/online-document-concept-illustration_114360-5563.jpg?t=st=1647429488~exp=1647430088~hmac=ee8d7c9d87485129fec67bbcceb05148d52fd53b30802e202740bbbd7c3b2bc6&w=740"
                  />
                  <div>
                    <h6 style={{ fontFamily: "Opensans-semi-bold" }}>
                      Manage documents
                    </h6>
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Opensans-regular",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      After the final offer price has been decided all agents
                      will need to go forward with helping their client’s and
                      homeowners through the documentation process. KYC, Police
                      verification & final rent agreement can be processed
                      through our dashboard providing pre-defined formats to
                      make the entire process easy flowing and quick.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-5">
                  <div>
                    <h6 style={{ fontFamily: "Opensans-semi-bold" }}>
                      Closing the deal
                    </h6>
                    <p
                      className="mt-3"
                      style={{
                        fontFamily: "Opensans-regular",
                        fontSize: "15px",
                        lineHeight: "1.5",
                      }}
                    >
                      Once the final rent agreement has been formed and the
                      client has made the first payment through our gateway.
                    </p>
                  </div>
                  <img
                    className="h-48 w-full object-cover border border-white-50 rounded-md"
                    src="https://img.freepik.com/free-vector/payment-information-concept-illustration_114360-2886.jpg?t=st=1647428102~exp=1647428702~hmac=36dc8301aa44e8629d0ace171ac716db19d10cefd1ffa5f9f2e8ef9f33fb23b6&w=740"
                  />
                </div>
              </div>

              <div className="mt-10 flex items-center justify-center">
                <Link href="/signup/ibo">
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
      </>
      <Footer />
    </>
  );
}

export default Ibo;
