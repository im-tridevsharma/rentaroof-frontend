import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { BiBadgeCheck, BiError } from "react-icons/bi";
import Loader from "../../components/loader";
import {
  emailVerity,
  mobileVerity,
  registerUser,
  setAuthToken,
} from "../../lib/frontend/auth";
import server, { __e } from "../../server";
import Cookies from "universal-cookie";
import { FiEye, FiEyeOff } from "react-icons/fi";

const getWebsiteValues = async (key) => {
  let setting = "";
  await server
    .get("/website/initials/" + key)
    .then((response) => {
      setting = response?.data;
    })
    .catch((error) => {
      setting = error?.response?.data;
    });
  return setting;
};

function Index({ rcode, a }) {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailotp, setEmailOtp] = useState(false);
  const [mobileotp, setMobileOtp] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(false);
  const cookies = new Cookies();

  const [logo, setLogo] = useState("");
  const [state, setState] = useState({
    role: a === "list-property" ? "landlord" : "",
    name: "",
    email: "",
    mobile: "",
    password: "",
    referral_code: rcode || "",
  });
  const [errors, setErrors] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res = await getWebsiteValues("logo");
      if (res?.status) {
        setLogo(res.data.logo);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    setErrors(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const iserror =
      errors && Object.keys(errors).filter((item) => errors[item] !== false);

    if (!iserror) {
      (async () => {
        const response = await registerUser(state);
        if (response?.status) {
          setSuccess(response?.message);
          setErrors(false);
          setIsLoading(false);
          setState({ role: "", name: "", email: "", password: "" });
          document.forms.signup.reset();
          setIsSubmitted("mobile");
          setUser(response?.user);
          setTimeout(() => {
            setSuccess(false);
          }, 5500);
        } else if (response?.error) {
          setErrors(response.error);
          setIsLoading(false);
          setTimeout(() => {
            setErrors(false);
          }, 3000);
        } else {
          setIsLoading(false);
          setErrors([[response?.message]]);
        }
      })();
    } else {
      setIsLoading(false);
    }
  };

  const handleEmailVerification = async (e) => {
    e.preventDefault();
    if (!emailotp) {
      setErrors([["Please enter OTP sent on your email."]]);
    } else {
      setIsLoading(true);
      const res = await emailVerity({ user_id: user?.id, otp: emailotp });
      if (res?.status) {
        setSuccess(res?.message);
        setIsSubmitted("mobile");
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setErrors([[res?.message]]);
        setTimeout(() => {
          setErrors(false);
        }, 3000);
      }
    }
  };

  const handleMobileVerification = async (e) => {
    e.preventDefault();
    if (!mobileotp) {
      setErrors([["Please enter OTP sent on your mobile."]]);
    } else {
      setIsLoading(true);
      const response = await mobileVerity({
        user_id: user?.id,
        otp: mobileotp,
      });
      if (response?.status) {
        setSuccess(response?.message);
        setIsLoading(false);
        setAuthToken(response.token);
        cookies.set("surole", __e(response?.user?.role), { path: "/" });
        Echo.connector.options.auth.headers["Authorization"] =
          "Bearer " + response.access_token;
        //save user
        localStorage.setItem("LU", __e(JSON.stringify(response?.user)));
        setTimeout(() => {
          if (response?.user?.role) {
            const redirect = localStorage.getItem("redirect");

            if (redirect) {
              localStorage.removeItem("redirect");
              router.push(redirect);
            } else {
              if (response?.user?.role === "tenant") {
                router.push(`/`);
              } else if (response?.user?.is_property_updated) {
                const blogin = localStorage.getItem("beforeLoginAdded")
                  ? JSON.parse(localStorage.getItem("beforeLoginAdded"))
                  : false;
                if (blogin) {
                  localStorage.removeItem("beforeLoginAdded");
                  router.push(
                    `/${response?.user?.role}/update-property?step=next&next=GALLERY&id=${blogin?.code}-${blogin?.id}&mode=update`
                  );
                }
              } else {
                router.push(`/${response.user.role}/dashboard`);
              }
            }
          }
        }, 1000);
      } else {
        setIsLoading(false);
        setErrors([[res?.message]]);
        setTimeout(() => {
          setErrors(false);
        }, 3000);
      }
    }
  };

  return (
    <>
      <Head>
        <title>SignUp</title>
      </Head>
      {isLoading && <Loader />}
      <div className="grid sm:grid-cols-2">
        {/**sign up form */}
        <div className="px-5 py-0 absolute sm:relative bg-white w-full h-screen overflow-y-auto">
          <div className="w-28 h-28 overflow-hidden">
            {/**logo */}
            <Link href="/">
              <img
                src={logo || "/images/website/no_photo.png"}
                alt="logo"
                className="h-full w-full object-contain cursor-pointer"
              />
            </Link>
          </div>
          {success && (
            <div className="py-2 px-2 text-green-600">
              <p className="flex items-center">
                <BiBadgeCheck className="text-2xl mr-1" /> {success}
              </p>
            </div>
          )}
          {errors &&
            Object.keys(errors).map((key, i) => (
              <div className="py-2 px-2 text-red-600" key={i}>
                <p className="flex items-center">
                  <BiError className="text-2xl mr-1" /> {errors[key]}
                </p>
              </div>
            ))}

          <div className="flex flex-col items-start mt-5">
            <h6
              className="font-bold ml-3 relative uppercase"
              style={{
                fontFamily: "Opensans-bold",
              }}
            >
              Sign Up
              <span
                className="absolute bottom-0 left-0 w-7 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--orange)",
                }}
              ></span>
            </h6>

            {/**signup form */}
            {!isSubmitted && (
              <form
                name="signup"
                method="POST"
                onSubmit={handleSubmit}
                className="mt-10 px-2 w-full md:max-w-lg"
              >
                <div className="flex items-start justify-between max-w-lg w-full">
                  {a !== "list-property" && (
                    <label htmlFor="tenant" className="font-bold">
                      <input
                        type="radio"
                        name="role"
                        value="tenant"
                        id="tenant"
                        onChange={handleChange}
                      />
                      <span
                        className="ml-3"
                        style={{ fontFamily: "Opensans-bold" }}
                      >
                        Tenant
                      </span>
                    </label>
                  )}
                  <label htmlFor="landlord" className="font-bold">
                    <input
                      type="radio"
                      name="role"
                      value="landlord"
                      id="landlord"
                      checked={state?.role === "landlord"}
                      onChange={handleChange}
                    />
                    <span
                      className="ml-3"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      Landlord
                    </span>
                  </label>

                  <Link
                    href={`/signup/ibo${
                      a === "list-property" ? "?a=list-property" : ""
                    }`}
                  >
                    <a
                      style={{
                        color: "var(--blue)",
                        fontFamily: "Opensans-bold",
                      }}
                    >
                      <input type="radio" className="mr-3" />
                      IBO
                    </a>
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div
                    className="form-element mt-5 text-gray-700"
                    style={{ fontFamily: "Opensans-semi-bold" }}
                  >
                    <div className="form-label">Name</div>
                    <input
                      type="text"
                      name="name"
                      className="form-input rounded-md border-2 border-gray-400"
                      value={state?.name ? state.name : ""}
                      onChange={handleChange}
                      required={true}
                    />
                  </div>
                  <div
                    className="form-element mt-5 text-gray-700 md:ml-2 ml-0"
                    style={{ fontFamily: "Opensans-semi-bold" }}
                  >
                    <div className="form-label">Email</div>
                    <input
                      type="text"
                      name="email"
                      className="form-input rounded-md border-2 border-gray-400"
                      value={state?.email ? state.email : ""}
                      onChange={handleChange}
                      required={true}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div
                    className="form-element mt-0 text-gray-700"
                    style={{ fontFamily: "Opensans-semi-bold" }}
                  >
                    <div className="form-label">Mobile</div>
                    <input
                      type="text"
                      name="mobile"
                      className="form-input rounded-md border-2 border-gray-400"
                      value={state?.mobile ? state.mobile : ""}
                      onChange={handleChange}
                      required={true}
                    />
                  </div>
                  <div
                    className="form-element relative mt-0 text-gray-700 md:ml-2 ml-0"
                    style={{ fontFamily: "Opensans-semi-bold" }}
                  >
                    <div className="form-label">Password</div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-input rounded-md border-2 border-gray-400"
                      value={state?.password ? state.password : ""}
                      onChange={handleChange}
                      required={true}
                    />
                    <p
                      className="absolute right-3 cursor-pointer top-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FiEye /> : <FiEyeOff />}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div
                    className="form-element mt-0 text-gray-700"
                    style={{ fontFamily: "Opensans-semi-bold" }}
                  >
                    <div className="form-label">Referral Code</div>
                    <input
                      type="text"
                      name="referral_code"
                      placeholder="Optional"
                      className="form-input rounded-md border-2 border-gray-400"
                      value={state?.referral_code ? state.referral_code : ""}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-end justify-end">
                    <button
                      type="submit"
                      className="uppercase w-full mb-4 rounded-md p-2 md:ml-2 ml-0 text-white hover:opacity-90"
                      style={{
                        backgroundColor: "var(--blue)",
                        fontFamily: "Opensans-bold",
                      }}
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/**email verification form */}
            {isSubmitted === "email" && (
              <form
                name="email_verification"
                method="POST"
                onSubmit={handleEmailVerification}
                className="mt-10 px-2 w-full md:max-w-lg"
              >
                <h6 style={{ fontFamily: "Opensans-bold" }}>
                  Email Verification
                </h6>
                <div className="grid grid-cols-1">
                  <div
                    className="form-element mt-5 text-gray-700"
                    style={{ fontFamily: "Opensans-semi-bold" }}
                  >
                    <div className="form-label">OTP</div>
                    <input
                      type="text"
                      name="email_otp"
                      className="form-input rounded-md border-2 border-gray-400"
                      value={emailotp ? emailotp : ""}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      placeholder="Enter OTP sent on your email"
                      required={true}
                      maxLength={6}
                      minLength={6}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="uppercase w-full mb-4 rounded-md p-2 text-white hover:opacity-90"
                  style={{
                    backgroundColor: "var(--blue)",
                    fontFamily: "Opensans-bold",
                  }}
                >
                  Verify
                </button>
              </form>
            )}

            {/**otp verification form */}
            {isSubmitted === "mobile" && (
              <form
                name="mobile_verification"
                method="POST"
                onSubmit={handleMobileVerification}
                className="mt-10 px-2 w-full md:max-w-lg"
              >
                <h6 style={{ fontFamily: "Opensans-bold" }}>
                  Mobile Verification
                </h6>
                <div className="grid grid-cols-1">
                  <div
                    className="form-element mt-5 text-gray-700"
                    style={{ fontFamily: "Opensans-semi-bold" }}
                  >
                    <div className="form-label">OTP</div>
                    <input
                      type="text"
                      name="email_otp"
                      className="form-input rounded-md border-2 border-gray-400"
                      value={mobileotp ? mobileotp : ""}
                      onChange={(e) => setMobileOtp(e.target.value)}
                      placeholder="Enter OTP sent on your mobile number."
                      maxLength={6}
                      minLength={6}
                      required={true}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="uppercase w-full mb-4 rounded-md p-2 text-white hover:opacity-90"
                  style={{
                    backgroundColor: "var(--blue)",
                    fontFamily: "Opensans-bold",
                  }}
                >
                  Verify
                </button>
              </form>
            )}

            {/**other signup options */}
            <div className="w-full relative md:max-w-lg border-t-2 border-gray-200 mt-8">
              <p
                className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-white text-gray-500"
                style={{
                  fontFamily: "Opensans-semi-bold",
                }}
              >
                Or connect with
              </p>

              {/**socials */}
              <div className="flex items-center justify-center mt-8 ">
                <img
                  src="/icons/login/fb_icon.png"
                  alt="facebook"
                  className="h-9 object-contain mx-2 cursor-pointer"
                />
                <img
                  src="/icons/login/twt.png"
                  alt="twitter"
                  className="h-9 object-contain mx-2 cursor-pointer"
                />
                <img
                  src="/icons/login/yt.png"
                  alt="instagram"
                  className="h-9 object-contain mx-2 cursor-pointer"
                />
              </div>
              <div
                className="text-center text-gray-500 mt-5"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                Already have an account ?{" "}
                <Link href="/login">
                  <a style={{ color: "var(--blue)" }}>Login</a>
                </Link>
              </div>

              {/**footer */}
              <div
                className="mb-5 uppercase flex items-center justify-center mt-5 text-2xs text-gray-500"
                style={{ fontFamily: "Opensans-regular" }}
              >
                <Link href="/">
                  <a>Home</a>
                </Link>
                <Link href="/about-us">
                  <a className="border-r-2 border-l-2 border-gray-400 px-2 mx-2">
                    About Us
                  </a>
                </Link>
                <Link href="/contact-us">
                  <a>Contact Us</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/**background */}
        <div
          className="h-screen w-full py-20 text-center text-white"
          style={{
            backgroundImage: "url(/images/website/big-city.jpg)",
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundOrigin: "border-box",
          }}
        >
          <h3
            className="text-5xl"
            style={{
              fontFamily: "'Grechen Fuemen', cursive",
            }}
          >
            Searching
          </h3>
          <h3
            className="text-4xl mt-3"
            style={{
              fontFamily: "Opensans-semi-bold",
            }}
          >
            for a house?
          </h3>
          <p
            className="mt-2 text-lg"
            style={{
              fontFamily: "Opensans-semi-bold",
            }}
          >
            We are here to help you!
          </p>
        </div>
      </div>
    </>
  );
}

Index.getInitialProps = ({ query }) => {
  return {
    rcode: query?.referral,
    a: query?.a,
  };
};

export default Index;
