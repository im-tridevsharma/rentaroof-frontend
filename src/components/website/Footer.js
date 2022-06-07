import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  FiAlertTriangle,
  FiCheckCircle,
  FiMail,
  FiPhoneCall,
} from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";
import server, { __d } from "../../server";
import Links from "./Links";
import { useSelector, shallowEqual } from "react-redux";
import { FaTimes } from "react-icons/fa";
import Loader from "../loader";
import addEnquiry from "../../lib/frontend/enquiry";
import ReactTooltip from "react-tooltip";
import { createSOS, getIsSOS } from "../../lib/frontend/share";
import { toast, ToastContainer } from "react-toastify";

const getPages = async () => {
  let pages = false;
  await server
    .get("/pages")
    .then((response) => {
      pages = response?.data;
    })
    .catch((error) => {
      pages = error?.response?.data;
    });

  return pages;
};

const getBlogs = async () => {
  let blogs = false;
  await server
    .get("/blogs?limit=5")
    .then((response) => {
      blogs = response?.data;
    })
    .catch((error) => {
      blogs = error?.response?.data;
    });

  return blogs;
};

function Footer() {
  const [isLoading, setIsLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [termsAndCondition, setTermsAndCondition] = useState(false);
  const [enquiry, setEnquiry] = useState({
    first_name: "",
    last_name: "",
    name: "",
    email: "",
    mobile: "",
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const [user, setUser] = useState(false);
  const [isSos, setIsSos] = useState(false);

  const router = useRouter();

  useEffect(() => {
    //if user is logged in fill their details
    const user = JSON.parse(__d(localStorage.getItem("LU")));
    setUser(user);
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

    const _isSos = async () => {
      const res = await getIsSOS();
      if (res?.status) {
        setIsSos(res?.data);
      }
    };

    _isSos();
  }, [isAdded]);

  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

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

  const handleSOS = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        fireSos(location);
      });
    } else {
      toast.error("Please allow your current location.");
    }
  };

  const fireSos = async (location) => {
    setIsLoading(true);
    const res = await createSOS({
      sos_content: `${user?.first} ${user?.last} pressed SOS button.`,
      lat: location?.coords?.latitude,
      lng: location?.coords?.longitude,
    });
    if (res?.status) {
      setIsLoading(false);
      toast.success(
        "Your SOS message sent to Rent A Roof team. We will call you asap."
      );
    } else {
      toast.error(res?.error || res?.message);
      setIsLoading(false);
    }
  };

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
      });
    } else if (response?.error) {
      setIsLoading(false);
      setErrors(response.error);
    }
  };

  let links = [
    {
      title: "Blogs/Recent News",
      links: blogs,
    },
    {
      title: "Information",
      links: [{ href: "/", value: "Home" }, ...pages],
    },
    {
      title: "Our Services",
      links: [
        { href: "/", value: "Home" },
        { href: "/list-property", value: "Listing Properties" },
        { href: "/join-our-team", value: "Join Our Team" },
        { href: "/for-homeowner", value: "Owners" },
        { href: "/for-tenant", value: "Tenants" },
      ],
    },
  ];

  useEffect(() => {
    if (router?.query?.enquiry) {
      setIsClosed(false);
    }
  }, [router?.query]);

  useEffect(() => {
    (async () => {
      const data = await getPages();
      const bdata = await getBlogs();
      if (data?.status) {
        let newpages = [];
        data.data.forEach((p) => {
          newpages.push({ href: p.slug, value: p.name });
        });
        setPages(newpages);
      }
      if (bdata?.status) {
        let newblogs = [];
        bdata.data.forEach((b) => {
          newblogs.push({ href: b.slug, value: b.title });
        });
        setBlogs(newblogs);
      }
    })();
  }, []);

  const handleFindAgent = (e) => {
    e.preventDefault();
    const search = document.forms.agentFinder.agent.value;
    router.push(`/find-an-agent?search=${search}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      {/**global enquiry form */}
      <div
        data-tip="Enquiry"
        onClick={() => setIsClosed(false)}
        className="fixed right-5 cursor-pointer bottom-10 z-50 bg-white shadow-lg drop-shadow-md rounded-full w-10 h-10 flex items-center justify-center"
      >
        <FaQuestionCircle className="text-2xl" />
        <ReactTooltip backgroundColor="black" textColor="white" />
      </div>
      <div
        className={`fixed right-0 bottom-0 bg-white ${
          isClosed ? "h-0 opacity-0" : "h-screen opacity-100"
        } overflow-hidden z-40 transition-all duration-300 ease-linear`}
      >
        <div className="flex flex-col md:flex-row p-5 relative">
          {/**enquiry */}
          <div className="flex flex-col max-w-4xl w-full">
            <h5
              className="uppercase flex items-center justify-between text-gray-600 relative"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Enquiry
              <FaTimes
                className="text-red-500 cursor-pointer"
                onClick={() => setIsClosed(true)}
              />
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
                    <a href="" onClick={() => setTermsAndCondition(true)}>
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
      </div>
      {/**agent finder */}
      {false && (
        <form
          className="flex items-center justify-center p-3"
          style={{
            backgroundColor: "var(--primary-color)",
            fontFamily: "Opensans-regular",
          }}
          name="agentFinder"
          onSubmit={handleFindAgent}
        >
          <label
            className="uppercase font-bold text-white"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            Find an Agent
          </label>
          <input
            type="text"
            name="agent"
            placeholder="Agent Name/Place..."
            className="border-2 max-w-xl w-full text-sm py-4 h-3 text-gray-600 border-gray-100 rounded-md bg-white ml-5"
          />
          <button
            type="submit"
            className="bg-gray-400 ml-2 py-2 px-8 rounded-md text-white"
          >
            <img
              src="/icons/home/home_search_icon.png"
              className="h-4 object-contain"
              alt="search"
            />
          </button>
        </form>
      )}

      {router.pathname === "/" && (
        <section style={{ backgroundColor: "#21201c" }}>
          <div className="max-w-3xl w-full bg-blue-500 p-6 mx-auto -mt-14 flex items-center justify-between overflow-hidden">
            <div
              className=" wow slideInLeft"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            >
              <h2
                style={{ fontFamily: "Opensans-bold" }}
                className="text-white"
              >
                Looking for a dream home?
              </h2>
              <p className="text-gray-50 mt-2">
                We can help you realize your dream of new home.
              </p>
            </div>
            <button
              onClick={() =>
                document
                  .querySelector("#banner")
                  .scrollIntoView({ behaviour: "smooth" })
              }
              className="px-5 py-3 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white wow slideInRight"
              data-wow-delay="0.3s"
              data-wow-duration="1s"
            >
              Explore Properties
            </button>
          </div>
        </section>
      )}
      <div
        className="flex flex-col p-10 pb-0"
        style={{ backgroundColor: "#21201c" }}
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 sm:space-x-5 pb-6">
          {links?.length > 0 &&
            links.map((item, i) => (
              <Links key={i} title={item.title} links={item.links} />
            ))}

          {/**payment */}
          <div className="flex flex-col mt-3 sm:mt-0 text-white">
            <h5 style={{ fontFamily: "Opensans-bold" }}>Secure Payments</h5>
            <span className="w-12 h-1 rounded-full bg-yellow-500"></span>
            <div className="grid grid-cols-2 mt-3">
              <div className="my-1 mr-1 flex items-center justify-center">
                <img src="/icons/home/razorpay.png" alt="razorpay" />
              </div>
              <div className="my-1 mr-1 flex items-center justify-center">
                <img src="/icons/home/paytm.png" alt="paytm" />
              </div>
              <div className="my-1 mr-1 flex items-center justify-center">
                <img src="/icons/home/upi.png" alt="upi" />
              </div>
              <div className="my-1 mr-1 flex items-center justify-center">
                <img src="/icons/home/mastercard.png" alt="mastercard" />
              </div>
            </div>
          </div>
          {/**questions */}
          <div className="flex flex-col sm:pl-20 mt-3 sm:mt-0 text-white">
            <h5 style={{ fontFamily: "Opensans-bold" }}>Have questions?</h5>
            <span className="w-12 h-1 rounded-full bg-yellow-500"></span>
            <div
              className="flex flex-col items-start mt-3"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <div className="flex text-white">
                <FiPhoneCall className="mt-1" />
                <p className="flex flex-col ml-2 leading-3">
                  <span>Toll Free</span>
                  <span className="text-xs text-white">
                    {website?.tollfree_number}
                  </span>
                </p>
              </div>
              <div className="flex text-white mt-3">
                <FiMail className="mt-1" />
                <p className="flex flex-col ml-2 leading-3">
                  <span>Email</span>
                  <span className="text-xs text-gray-500">
                    {website?.company_email}
                  </span>
                </p>
              </div>
              <div className="mt-3 flex flex-col">
                <b
                  className="uppercase text-white"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Follow Us
                </b>
                <div className="flex text-xl text-white mt-1">
                  <a href={website?.facebook_url}>
                    <img src="/icons/home/fb_grey.png" alt="fb" />
                  </a>
                  <a href={website?.twitter_url} className="ml-2">
                    <img src="/icons/home/twt_grey.png" alt="twitter" />
                  </a>
                  <a href={website?.instagram_url} className="ml-2">
                    <img src="/icons/home/instagrey.png" alt="insa" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center p-5 bg-black -mx-10">
          <p
            className="uppercase text-white"
            style={{ fontFamily: "Opensans-regular" }}
          >
            &copy; 2021 Rent a Roof | All Rights Reserved.
          </p>
        </div>
      </div>
      {user && ["ibo", "tenant"].includes(user.role) && isSos === "yes" && (
        <div
          className="fixed bottom-24 right-4"
          style={{ fontFamily: "Opensans-bold" }}
        >
          <button
            onClick={handleSOS}
            className="p-3 rounded-full bg-red-600 text-white"
          >
            SOS
          </button>
        </div>
      )}
    </>
  );
}

export default Footer;
