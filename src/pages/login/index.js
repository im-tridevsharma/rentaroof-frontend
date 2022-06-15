import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiBadgeCheck, BiError } from "react-icons/bi";
import Loader from "../../components/loader";
import {
  loginUser,
  sendAuthOTP,
  sendAuthOTPEmail,
  setAuthToken,
} from "../../lib/frontend/auth";
import Cookies from "universal-cookie";
import server, { __e } from "../../server";
import UseAuthentication from "../../hooks/UseAuthentication";
import RenderError from "../../components/website/RenderError";
import { ToastContainer, toast } from "react-toastify";

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

function Index() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [optSent, setOtpSent] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [timerResend, setTimeResend] = useState(60);
  const [showMessage, setShowMessage] = useState(false);
  const [timer, setTimer] = useState(null);
  const [a, setA] = useState(null);
  const [state, setState] = useState({
    email: "",
    password: "",
    otp: "",
    remember_me: "false",
    before_login_added: "",
  });
  const [errors, setErrors] = useState(false);
  const [logo, setLogo] = useState("");
  const router = useRouter();
  const cookies = new Cookies();
  //check is loggedin
  const { isAuthenticated } = UseAuthentication();

  useEffect(() => {
    (async () => {
      const res = await getWebsiteValues("logo");
      if (res?.status) {
        setLogo(res.data.logo);
      }
    })();

    const blogin = localStorage.getItem("beforeLoginAdded")
      ? JSON.parse(localStorage.getItem("beforeLoginAdded"))
      : false;
    if (blogin) {
      setState((prev) => ({
        ...prev,
        before_login_added: blogin?.code + "_" + blogin.id,
      }));
      setA("list-property");
    }
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
        const response = await loginUser(state);
        if (response?.access_token) {
          setSuccess(true);
          setErrors(false);
          setIsLoading(false);
          setState({ email: "", password: "", remember_me: "no" });
          setAuthToken(response.access_token);
          cookies.set("surole", __e(response?.user?.role), { path: "/" });
          Echo.connector.options.auth.headers["Authorization"] =
            "Bearer " + response.access_token;
          //save user
          localStorage.setItem("LU", __e(JSON.stringify(response?.user)));
          setTimeout(() => {
            setSuccess(false);
            if (response?.user?.role) {
              const redirect = localStorage.getItem("redirect");
              clearInterval(timer);
              setTimer(null);
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
          }, 1500);
        } else if (response?.error === "banned") {
          toast.error(
            "Your account has been blocked. Please contact to administrator!"
          );
          setIsLoading(false);
        } else if (response?.error || response?.message) {
          setErrors(response.error || { message: [response.message] });
          setIsLoading(false);
        } else {
          setErrors([[response?.message]]);
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  };

  const sendOTP = async (e) => {
    e.preventDefault();

    if (!state.email) {
      setErrors([["Please enter Email or Mobile number!"]]);
      return false;
    }

    if (isNaN(state.email)) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)) {
        setIsLoading(true);
        const res = await sendAuthOTPEmail({ email: state.email });
        if (res?.status) {
          setIsLoading(false);
          setOtpSent(true);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 2000);
          setShowResend(false);
          setTimer(
            setInterval(() => {
              setTimeResend((prev) => prev - 1);
            }, 1000)
          );
        } else if (res?.error) {
          setErrors(res?.error);
          setIsLoading(false);
        } else {
          setErrors([[res?.message]]);
          setIsLoading(false);
        }
      } else {
        setErrors([["Email is not valid. Please check once!"]]);
      }
    } else if (!isNaN(state.email) && state.email.length !== 10) {
      setErrors([["Mobile number is not valid. Please check once!"]]);
    } else {
      setIsLoading(true);
      const res = await sendAuthOTP({ mobile: state.email });
      if (res?.status) {
        setIsLoading(false);
        setOtpSent(true);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 2000);
        setShowResend(false);
        setTimer(
          setInterval(() => {
            setTimeResend((prev) => prev - 1);
          }, 1000)
        );
      } else if (res?.error) {
        setErrors(res?.error);
        setIsLoading(false);
      } else {
        setErrors([[res?.message]]);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (timerResend === 0) {
      clearInterval(timer);
      setShowResend(true);
      setTimer(null);
      setTimeResend(60);
    }
  }, [timerResend]);

  return !isAuthenticated ? (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <ToastContainer />
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
                <BiBadgeCheck className="text-2xl mr-1" />
                Loggedin successfully! Redirecting ...
              </p>
            </div>
          )}
          {showMessage && (
            <div className="py-2 px-2 text-green-600">
              <p className="flex items-center">
                <BiBadgeCheck className="text-2xl mr-1" />
                OTP Sent Successfully.
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
              Login
              <span
                className="absolute bottom-0 left-0 w-7 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--orange)",
                }}
              ></span>
            </h6>
            {/**signup form */}
            <form
              name="login"
              method="POST"
              onSubmit={handleSubmit}
              className="mt-10 px-2 w-full md:w-96"
            >
              <p
                className="text-gray-700"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                Please login to use the app
              </p>

              <div
                className="form-element mt-5 text-gray-700"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-label">Email / Mobile</div>
                <input
                  type="text"
                  name="email"
                  className="form-input rounded-md border-2 border-gray-400"
                  value={state?.email ? state.email : ""}
                  onChange={handleChange}
                />
              </div>
              {!optSent && (
                <div
                  className="form-element mt-2 text-gray-700"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  <div className="form-label">Password</div>
                  <input
                    type="password"
                    name="password"
                    className="form-input rounded-md border-2 border-gray-400"
                    value={state?.password ? state.password : ""}
                    onChange={handleChange}
                  />
                </div>
              )}
              {optSent && (
                <div
                  className="form-element mt-2 text-gray-700"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  <div className="form-label">OTP</div>
                  <input
                    type="text"
                    name="otp"
                    className="form-input rounded-md border-2 border-gray-400"
                    value={state?.otp ? state.otp : ""}
                    onChange={handleChange}
                    minLength={6}
                    maxLength={6}
                  />
                </div>
              )}
              <p className="mb-4 -mt-2 flex items-center justify-between">
                <label htmlFor="remember_me">
                  <input
                    type="checkbox"
                    name="remember_me"
                    id="remember_me"
                    onChange={(e) => {
                      setState((prev) => ({
                        ...prev,
                        remember_me: e.target.checked ? "yes" : "no",
                      }));
                    }}
                    checked={state?.remember_me === "yes"}
                  />
                  <span className="ml-1">Remember me</span>
                </label>
                <Link href="/forgot-password">
                  <a>Forgot password?</a>
                </Link>
              </p>
              <button
                type="submit"
                className="uppercase w-full rounded-md p-2 text-white hover:opacity-90"
                style={{
                  backgroundColor: "var(--blue)",
                  fontFamily: "Opensans-bold",
                }}
              >
                Login
              </button>
            </form>

            {/**other signup options */}
            <div className="w-full relative md:w-96 border-t-2 border-gray-200 mt-8">
              <p
                className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-white text-gray-500"
                style={{
                  fontFamily: "Opensans-semi-bold",
                }}
              >
                Or
              </p>

              {/**socials */}
              {optSent ? (
                showResend ? (
                  <div className="flex items-center justify-center mt-8 ">
                    <button
                      onClick={sendOTP}
                      className="py-2 px-5 hover:opacity-90 rounded-full text-white"
                      style={{ background: "var(--blue)" }}
                    >
                      Resend OTP
                    </button>
                  </div>
                ) : (
                  <p className="mt-3 text-center">
                    Resend option will appear in {timerResend}s{" "}
                  </p>
                )
              ) : (
                <div className="flex items-center justify-center mt-8 ">
                  <button
                    onClick={sendOTP}
                    className="py-2 px-5 hover:opacity-90 rounded-full text-white"
                    style={{ background: "var(--blue)" }}
                  >
                    Request OTP
                  </button>
                </div>
              )}
              <div
                className="text-center text-gray-500 mt-5"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                Don't have an account ?{" "}
                <Link
                  href={`/signup${
                    a === "list-property" ? "?a=list-property" : ""
                  }`}
                >
                  <a style={{ color: "var(--blue)" }}>Sign Up</a>
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
  ) : (
    <RenderError error="Redirecting to dashboard..." />
  );
}

export default Index;
