import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/website/Header";
import Footer from "../components/website/Footer";
import Breadcrumb from "../components/website/Breadcrumb";
import Loader from "../components/loader";
import addEnquiry from "../lib/frontend/enquiry";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { __d } from "../server";
import { getPropertyByCode } from "../lib/frontend/properties";
import { shallowEqual, useSelector } from "react-redux";
import { FaTimes } from "react-icons/fa";

function Enquiry() {
  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [property, setProperty] = useState(null);
  const [user, setUser] = useState(null);
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [enquiry, setEnquiry] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: "",
    mobile: "",
    title: "",
    description: "",
    type: "",
    property_id: "",
  });
  const [errors, setErrors] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setEnquiry((prev) => ({ ...prev, property_id: router.query.property }));
    //if user is logged in fill their details
    const user = JSON.parse(__d(localStorage.getItem("LU")));
    if (user) {
      setEnquiry((prev) => ({
        ...prev,
        first_name: user?.first,
        last_name: user?.last,
        name: user?.fullname,
        email: user?.email,
        mobile: user?.mobile,
      }));
    }
  }, [isAdded]);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getPropertyByCode(router.query.property);
      if (response?.status) {
        setProperty(response.data);
        if (response?.data?.posted_by_data) {
          setUser(response?.data.posted_by_data);
        }
        setIsLoading(false);
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
      }
    })();
  }, []);

  const inputChageHandler = (e) => {
    const { name, value } = e.target;
    setEnquiry((prev) => ({ ...prev, [name]: value }));
    if (enquiry.first_name || enquiry.last_name) {
      setEnquiry((prev) => ({
        ...prev,
        name: `${prev.first_name} ${prev.last_name}`,
      }));
    }
    setErrors(false);
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const iserror = errors
      ? Object.keys(errors).filter((index) => errors[index] !== false)
      : false;
    if (!iserror?.length) {
      submitProfileData(enquiry);
    } else {
      setIsLoading(false);
    }
  };

  const submitProfileData = async (data) => {
    const response = await addEnquiry(data);
    if (response?.status) {
      setIsAdded(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
      setEnquiry({
        first_name: "",
        last_name: "",
        name: "",
        email: "",
        mobile: "",
        title: "",
        description: "",
        type: "",
        property_id: "",
      });
    } else if (response?.error) {
      setIsLoading(false);
      setErrors(response.error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Head>
        <title>Enquiry</title>
      </Head>
      <Header />
      <Breadcrumb
        tagline="You are one step away to make an enquiry!"
        path="Home / Property Details / Enquiry"
      />
      <div className="flex flex-col md:flex-row p-5 relative">
        {/**enquiry */}
        <div className="flex flex-col max-w-4xl w-full">
          <h5
            className="uppercase text-gray-600 relative"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Property Enquiry
            <span
              className="absolute -bottom-1 left-0 w-12 h-1 rounded-md"
              style={{ backgroundColor: "var(--blue)" }}
            ></span>
          </h5>

          <div className="mt-5 leading-3">
            {errors && (
              <div className="errors">
                {Object.keys(errors).map((index, i) => (
                  <div className="w-full mb-2" key={i}>
                    <p className="text-red-500 flex items-center">
                      <FiAlertTriangle className="mr-1" /> {errors[index]}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {isAdded && (
              <p className="flex items-center text-green-600">
                <FiCheckCircle className="mr-1" /> Enquiry information saved
                successfully.
              </p>
            )}
          </div>

          <div
            className="p-4 border-gray-200 mt-5 rounded-sm"
            style={{ borderWidth: "1px" }}
          >
            <form
              name="enquiry"
              style={{
                fontFamily: "Opensans-semi-bold",
              }}
              onSubmit={handleEnquirySubmit}
            >
              <div
                className="flex items-center border-blue-400 pb-4 mb-5"
                style={{
                  borderBottomWidth: "1px",
                }}
              >
                <p
                  style={{ fontFamily: "Opensans-bold" }}
                  className="flex items-center sm:flex-row flex-col w-full sm:w-auto"
                >
                  I would like:
                  <label htmlFor="more" className="ml-5">
                    <input
                      type="radio"
                      name="type"
                      value="More Details"
                      id="more"
                      className="mr-2"
                      checked={enquiry.type === "More Details" ? true : false}
                      onChange={inputChageHandler}
                    />
                    More Details
                  </label>
                  <label htmlFor="view" className="ml-5">
                    <input
                      type="radio"
                      name="type"
                      value="To View a Property"
                      id="view"
                      className="mr-2"
                      onChange={inputChageHandler}
                      checked={
                        enquiry.type === "To View a Property" ? true : false
                      }
                    />
                    To View a Property
                  </label>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-3">
                <div className="form-element text-gray-600">
                  <label className="form-label ">First Name</label>
                  <input
                    type="text"
                    value={enquiry.first_name}
                    name="first_name"
                    onChange={inputChageHandler}
                    className="form-input rounded-md border-gray-200 -mt-1"
                  />
                </div>
                <div className="form-element text-gray-600">
                  <label className="form-label ">Last Name</label>
                  <input
                    type="text"
                    value={enquiry.last_name}
                    name="last_name"
                    onChange={inputChageHandler}
                    className="form-input rounded-md border-gray-200 -mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-3">
                <div className="form-element text-gray-600">
                  <label className="form-label ">Email</label>
                  <input
                    type="email"
                    value={enquiry.email}
                    name="email"
                    onChange={inputChageHandler}
                    className="form-input rounded-md border-gray-200 -mt-1"
                  />
                </div>
                <div className="form-element text-gray-600">
                  <label className="form-label ">Phone</label>
                  <input
                    type="text"
                    value={enquiry.mobile}
                    name="mobile"
                    onChange={inputChageHandler}
                    className="form-input rounded-md border-gray-200 -mt-1"
                  />
                </div>
              </div>
              <div className="form-element text-gray-600">
                <label className="form-label ">Enquiry Title</label>
                <input
                  type="text"
                  value={enquiry.title}
                  name="title"
                  onChange={inputChageHandler}
                  className="form-input rounded-md border-gray-200 -mt-1"
                />
              </div>
              <div className="form-element text-gray-600">
                <label className="form-label ">
                  Your Message (Description)
                </label>
                <textarea
                  className="form-input rounded-md border-gray-200 -mt-1 h-28"
                  value={enquiry.description}
                  name="description"
                  onChange={inputChageHandler}
                ></textarea>
              </div>
              <div className="mt-1">
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
              <div className="text-center my-3">
                <button
                  type="submit"
                  className="text-xs p-4 rounded-md text-white"
                  style={{ backgroundColor: "var(--blue)" }}
                >
                  Submit a Query
                </button>
              </div>
            </form>
          </div>
        </div>
        {/**property details */}
        <div
          className="flex flex-col items-start overflow-hidden border-gray-200 p-1 bg-white max-w-sm w-full text-gray-600 md:ml-10 mt-11 rounded-md"
          style={{ borderWidth: "1px", fontFamily: "Opensans-semi-bold" }}
        >
          <img
            src={property?.front_image || "/images/website/no_photo.png"}
            className="h-52 object-cover w-full rounded-md"
            alt="property"
          />
          <p className="px-5 mt-3 ">
            <b style={{ fontFamily: "Opensans-bold" }}>Property ID: </b>
            <span>{property?.property_code}</span>
          </p>
          <p className="px-5 mt-3 capitalize">
            {property?.bathrooms} Bathrooms {property?.type}
          </p>
          <p
            className="text-lg mx-5 text-gray-900"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Rs. {property?.monthly_rent}/month
          </p>

          <Link href={`/details/properties/${property?.property_code}`}>
            <a
              className="text-white rounded-md px-8 py-4 text-xs mt-3 mx-5"
              style={{ backgroundColor: "var(--blue)" }}
            >
              Know More
            </a>
          </Link>
          <p
            className="mt-5 uppercase mx-5"
            style={{
              color: "var(--primary-color)",
              fontFamily: "Opensans-bold",
            }}
          >
            Markated By
          </p>
          <p
            className="mt-2 mx-5"
            style={{
              fontFamily: "Opensans-bold",
            }}
          >
            {user?.first} {user?.last}
          </p>
          <p className="mx-5 leading-3">{user?.address?.full_address}</p>
          <Link
            href={`/details/${user?.role === "ibo" ? "ibo" : "landlord"}/${
              user?.system_userid
            }`}
          >
            <a
              className="mt-5 uppercase mx-5 mb-3"
              style={{
                color: "var(--primary-color)",
                fontFamily: "Opensans-bold",
              }}
            >
              More Properties from this{" "}
              {user?.role === "ibo" ? "IBO" : "Landlord"}
            </a>
          </Link>
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
            dangerouslySetInnerHTML={{ __html: website?.termsandconditions }}
          ></div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default Enquiry;
