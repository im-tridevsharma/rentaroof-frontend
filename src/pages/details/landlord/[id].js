import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../../../components/website/Header";
import Footer from "../../../components/website/Footer";
import Breadcrumb from "../../../components/website/Breadcrumb";
import { RiChatQuoteLine } from "react-icons/ri";
import { ImQuotesLeft } from "react-icons/im";
import PropertyIbo from "../../../components/website/PropertyIbo";
import {
  getLandlordProperties,
  getUserByCode,
} from "../../../lib/frontend/auth";
import {
  getLandlordRating,
  saveLandlordNotication,
  saveLandlordRating,
} from "../../../lib/frontend/share";
import Loader from "../../../components/loader";
import StarRatings from "react-star-ratings";
import { FiCheckCircle } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { shallowEqual, useSelector } from "react-redux";
import { __d } from "../../../server";

function Index({ id }) {
  const [landlord, setLandlord] = useState(false);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [viewMore, setViewMore] = useState(false);
  const [rating, setRating] = useState(0);
  const [landlordRatings, setLandlordRatings] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [avgRating, setAvgRating] = useState(0);
  const [topReview, setTopReview] = useState(false);
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [profile, setProfile] = useState(false);

  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setProfile(u);
    }
    setIsLoading(true);
    (async () => {
      const res = await getUserByCode(id);
      if (res?.status) {
        setLandlord(res?.data);
        const pres = await getLandlordProperties(res.data.id);
        if (pres?.status) {
          setProperties(pres.data);
          setMinPrice(
            pres.data.reduce(
              (prev, curr) => {
                return prev.monthly_rent < curr.monthly_rent ? prev : curr;
              },
              [0]
            )
          );
          setMaxPrice(
            pres.data.reduce(
              (prev, curr) => {
                return prev.monthly_rent > curr.monthly_rent ? prev : curr;
              },
              [0]
            )
          );
          setIsLoading(false);
        } else {
          console.error(res?.error || res?.message);
          setIsLoading(false);
        }

        const rres = await getLandlordRating(res.data.id);
        if (rres?.status) {
          setLandlordRatings(rres?.data);
          const top = rres.data.filter((p) => p.rating > 4);
          setTopReview(top[Math.floor(Math.random() * top?.length)]);
          if (rres.data.length > 0) {
            let total = 0;
            rres.data.forEach((r) => {
              total += parseFloat(r.rating);
            });
            setAvgRating(
              parseFloat(parseFloat(total / rres.data.length).toFixed(1))
            );
          }
        } else {
          console.error(rres?.error);
        }
      } else {
        console.error(res?.error || res?.message);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleReview = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const review = document.forms.rating.review.value;
    const res = await saveLandlordRating({
      rating,
      review,
      landlord_id: landlord?.id,
    });

    if (res?.status) {
      setIsAdded(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
      document.forms.rating.reset();
      setRating(0);
    } else {
      console.error(res?.error || res?.message);
      setIsLoading(false);
    }
  };

  const handleCallBack = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.callback);
    formdata.append("title", "Request Callback Notification📞");
    formdata.append("type", "Normal");
    formdata.append("landlord_id", landlord?.id);
    formdata.append(
      "content",
      `Callback request has been made by ${document.forms.callback.name.value}. 
    Email: ${document.forms.callback.email.value} Phone: ${document.forms.callback.mobile.value}`
    );

    const res = await saveLandlordNotication(formdata);
    if (res?.status) {
      setIsSent(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsSent(false);
      }, 2000);
      document.forms.callback.reset();
    } else {
      setIsLoading(false);
      console.error(res?.error || res?.message);
    }
  };

  return (
    <>
      <Head>
        <title>Details of {id}</title>
      </Head>
      {isLoading && <Loader />}
      <Header />
      <Breadcrumb
        center={true}
        large={true}
        tagline="Find your dream Home. We are here to guide you!"
      />
      <div className="flex flex-col p-5 relative">
        {/**user card */}
        <div
          className="flex items-center justify-between sm:flex-row flex-col p-5 bg-white  max-w-3xl w-full shadow-md -mt-20 border-2 border-gray-300"
          style={{
            marginLeft: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="flex items-center justify-center flex-col">
            <img
              src={landlord?.profile_pic || "/images/website/no_photo.png"}
              alt="user"
              className="w-28 h-28 object-cover rounded-full border-2 border-gray-500 mb-2"
            />
            <p className="flex items-center">
              <span
                className={`w-3 h-3 rounded-full ${
                  landlord?.is_logged_in ? "bg-green-500" : "bg-gray-300"
                } mr-1`}
              ></span>
              <span className="font-semlandlordld">Status</span>
            </p>
          </div>

          {/**details */}
          <div
            className="sm:border-gray-200 py-5 sm:py-0 sm:px-10 border-transparent"
            style={{ borderLeftWidth: "1px", fontFamily: "Opensans-semi-bold" }}
          >
            <p
              className="uppercase"
              style={{ fontFamily: "Opensans-bold", fontSize: ".95rem" }}
            >
              Owner Details
            </p>
            <p className="mt-2">
              <b className="mr-1">Name:</b>
              <span className="uppercase">
                {landlord?.first} {landlord?.last}
              </span>
            </p>
            <p className="flex items-center">
              <img
                src="/icons/proprtydetls/icon23.png"
                className=" -ml-5 mr-1"
                alt="location"
              />
              <span>{landlord?.address?.full_address}</span>
            </p>
            {landlord?.operating_since && (
              <p style={{ color: "var(--blue)" }} className="my-2">
                Operating since{" "}
                {new Date().getFullYear() - landlord.operating_since}
              </p>
            )}
            {landlord?.kyc?.is_verified && (
              <p className="flex items-center">
                <img
                  src="/icons/proprtydetls/icon24.png"
                  className="-ml-5 mr-1"
                  alt="location"
                />
                <span className="text-lg" style={{ color: "purple" }}>
                  Certified Owner
                </span>
              </p>
            )}
          </div>

          {/**details */}
          <div
            className="sm:border-gray-200 sm:px-7 border-transparent"
            style={{ borderLeftWidth: "1px", fontFamily: "Opensans-semi-bold" }}
          >
            <p
              className="uppercase"
              style={{ fontFamily: "Opensans-bold", fontSize: ".95rem" }}
            >
              Contact via:
            </p>

            <p className="flex items-center mt-2">
              <img
                src="/icons/proprtydetls/icon25.png"
                className="mr-1"
                alt="location"
              />
              <span>{landlord?.mobile}</span>
            </p>
            <p className="flex items-center mt-2">
              <img
                src="/icons/proprtydetls/icon26.png"
                className="mr-1 w-5 h-5 object-contain"
                alt="location"
              />
              <span>{landlord?.email}</span>
            </p>
            <p className="flex items-center mt-2">
              <img
                src="/icons/proprtydetls/icon27.png"
                className="mr-1 w-5 h-5 object-contain"
                alt="location"
              />
              <Link href="/tenant/chat">
                <a style={{ color: "purple" }}>Chat</a>
              </Link>
            </p>
          </div>
        </div>
        {/**rating card */}
        <div
          style={{ fontFamily: "Opensans-bold" }}
          className="border-2 border-gray-200 py-2 px-5 flex sm:flex-row flex-col items-center bg-white max-w-3xl w-full mx-auto mt-4 rounded-md justify-between"
        >
          <p
            style={{ fontSize: ".95rem", borderRightWidth: "1px" }}
            className="flex items-center flex-col sm:border-gray-200 border-transparent sm:pr-14"
          >
            <b>Properties for Rent</b>
            <span className="mt-3" style={{ color: "purple" }}>
              {properties?.length}
            </span>
          </p>
          <p
            style={{ fontSize: ".95rem" }}
            className="flex items-center flex-col sm:pr-14  mt-3 sm:mt-0"
          >
            <b>Price Range</b>
            <span className="mt-3" style={{ color: "purple" }}>
              Rs. {minPrice.monthly_rent} - {maxPrice.monthly_rent}
            </span>
          </p>
          <p
            style={{ fontSize: ".95rem", borderLeftWidth: "1px" }}
            className="flex items-center flex-col sm:border-gray-200 border-transparent mt-3 sm:mt-0  sm:pl-12"
          >
            <b>Rating & Review</b>
            <span
              className="mt-3 flex items-center"
              style={{ color: "purple" }}
            >
              <span
                className="px-4 py-2 rounded-md flex items-center justify-center text-white"
                style={{ backgroundColor: "var(--blue)" }}
              >
                {avgRating}
              </span>
              <span className="ml-1">{landlordRatings?.length}</span>
              <div
                className="flex items-center ml-3"
                style={{ color: "var(--orange)" }}
              >
                <StarRatings
                  numberOfStars={5}
                  rating={avgRating}
                  starRatedColor="var(--orange)"
                  starDimension="20px"
                  starSpacing="3px"
                  starHoverColor="var(--orange)"
                />
              </div>
            </span>
          </p>
        </div>
        {/**other section */}
        <div className="flex mt-20 md:flex-row flex-col">
          {/**properties */}
          <div className="flex flex-col flex-grow">
            <p
              style={{ fontFamily: "Opensans-bold", fontSize: "1rem" }}
              className="border-b-2 border-gray-200 pb-3"
            >
              Properties for rent
            </p>

            {/**properties */}
            <div className="md:mx-5 mt-3">
              {viewMore
                ? properties.map((p, i) => <PropertyIbo key={i} property={p} />)
                : [1, 2, 3].map((_, i) => (
                    <PropertyIbo key={i} property={properties[i]} />
                  ))}
            </div>
            <div
              className="flex items-center cursor-pointer justify-center md:mx-5 mt-2 border-gray-200 rounded-md text-center uppercase bg-white py-3 shadow-sm"
              style={{
                borderWidth: "1px",
                fontFamily: "Opensans-bold",
                color: "var(--primary-color)",
              }}
              onClick={() => setViewMore(!viewMore)}
            >
              {viewMore ? "View Less" : "View More"}
              <img
                src="/icons/ibo_icons/icon16.png"
                alt="arrow"
                className="ml-1"
              />
            </div>
          </div>
          {/**contact details */}
          <div className="flex flex-col max-w-sm w-full">
            <div
              className=" border-gray-200  mx-3 mt-7 pb-5 rounded-md overflow-hidden shadow-md"
              style={{ borderWidth: "1px" }}
            >
              <p
                className="text-center p-5 text-white"
                style={{
                  backgroundColor: "var(--primary-color)",
                  fontFamily: "Opensans-regular",
                }}
              >
                Contact Details
              </p>
              <form
                name="callback"
                onSubmit={handleCallBack}
                className="mx-5 mt-5"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                {isSent && (
                  <p className="flex items-center text-green-600 py-2">
                    <FiCheckCircle className="mr-1" /> Details sent
                    successfully.
                  </p>
                )}
                <div className="form-element">
                  <div className="form-label">Name</div>
                  <input
                    type="text"
                    name="name"
                    defaultValue={profile?.fullname}
                    onChange={() => {}}
                    required
                    className="form-input rounded-md border-gray-200 h-10"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label">Email</div>
                  <input
                    type="email"
                    name="email"
                    defaultValue={profile?.email}
                    onChange={() => {}}
                    required
                    className="form-input rounded-md border-gray-200 h-10"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label">Phone</div>
                  <input
                    type="text"
                    name="mobile"
                    defaultValue={profile?.mobile}
                    onChange={() => {}}
                    required
                    className="form-input rounded-md border-gray-200 h-10"
                  />
                </div>
                <div className="my-1">
                  <input
                    type="checkbox"
                    required={true}
                    id="terms"
                    value="yes"
                    className="h-5 w-5 border-gray-200 mr-2"
                  />
                  <label htmlFor="terms">
                    Accept{" "}
                    <a
                      href="javascript:;"
                      onClick={() => setTermsAndCondition(true)}
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <div className="text-center mt-3">
                  <button
                    className="uppercase px-5 py-3 text-white rounded-md text-xs"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  >
                    Request a callback
                  </button>
                </div>
              </form>
            </div>
            {/**rate us */}
            <div
              className=" border-gray-200 flex items-center flex-col  mx-3 mt-3 pb-5 rounded-md overflow-hidden shadow-md"
              style={{ borderWidth: "1px" }}
            >
              <p
                className="pt-2 uppercase"
                style={{
                  fontFamily: "Opensans-bold",
                }}
              >
                Rate Us
              </p>
              <div className="flex items-center mt-6">
                <StarRatings
                  changeRating={(newRating) => setRating(newRating)}
                  numberOfStars={5}
                  rating={rating}
                  starRatedColor="var(--orange)"
                  starDimension="30px"
                  starSpacing="8px"
                  starHoverColor="var(--orange)"
                />
              </div>
            </div>
          </div>
        </div>
        {/**review section */}
        <div className="border-t-2 border-gray-200 mt-8 px-2 py-4 flex md:flex-row flex-col">
          {/**top review */}
          <div className="flex flex-col max-w-lg w-full">
            <p
              style={{ fontFamily: "Opensans-bold" }}
              className="flex items-center ml-5"
            >
              Top Customer Feedback{" "}
              <RiChatQuoteLine className="text-3xl ml-2" />
            </p>
            {topReview && (
              <div
                className="flex flex-col p-5 border-gray-200 mt-4 rounded-sm"
                style={{ borderWidth: "1px" }}
              >
                <p>
                  <ImQuotesLeft
                    className="text-3xl"
                    style={{ color: "var(--primary-color)" }}
                  />
                </p>
                <p className="text-gray-500 mt-2">{topReview?.review}</p>
                <p
                  className="mt-2"
                  style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}
                >
                  - by {topReview?.name || "Guest"}
                </p>
              </div>
            )}
          </div>
          {/**write a review */}
          <div
            className="flex flex-col md:ml-10 flex-grow md:mt-0 mt-5"
            style={{ fontFamily: "Opensans-regular" }}
          >
            {isAdded && (
              <p className="flex items-center text-green-600 py-2">
                <FiCheckCircle className="mr-1" /> Review added successfully.
              </p>
            )}
            <p className="flex flex-col">
              <b style={{ fontFamily: "Opensans-bold" }}>Write a Review</b>
              <span className="text-gray-600">
                Share your thoughts with another customer.
              </span>
            </p>
            <form name="rating" onSubmit={handleReview} className="w-full mt-5">
              <div className="form-element">
                <textarea
                  name="review"
                  className="h-40 border-gray-200 rounded-md text-sm"
                  required
                ></textarea>
              </div>
              <button
                className="px-2 py-3 text-white rounded-sm"
                style={{ backgroundColor: "var(--blue)" }}
              >
                Post a review
              </button>
            </form>
          </div>
        </div>
      </div>
      {termsAndCondition && (
        <div className="fixed z-40 max-w-lg w-full p-4 bg-white rounded-md top-0 border border-gray-200 h-screen left-1/2 transform -translate-x-1/2">
          <h4
            style={{ fontFamily: "Opensans-bold" }}
            className="flex items-center justify-between"
          >
            Terms and Conditions
            <FaTimes
              className="text-red-500 cursor-pointer"
              onClick={() => setTermsAndCondition(false)}
            />
          </h4>
          <hr className="my-2" />
          <div
            className="mt-2 h-full overflow-y-auto pb-10"
            dangerouslySetInnerHTML={{
              __html: website?.termsandconditions,
            }}
          ></div>
        </div>
      )}
      <Footer />
    </>
  );
}

Index.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default Index;
