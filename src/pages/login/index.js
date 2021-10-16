import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiBadgeCheck, BiError } from "react-icons/bi";
import Loader from "../../components/loader";
import { loginUser, setAuthToken } from "../../lib/frontend/auth";
import Cookies from "universal-cookie";
import { __e } from "../../server";
import UseAuthentication from "../../hooks/UseAuthentication";
import RenderError from "../../components/website/RenderError";

function Index() {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();
  //check is loggedin
  const { isAuthenticated } = UseAuthentication();

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
          setState({ email: "", password: "", remember: false });
          setAuthToken(response.access_token);
          cookies.set("surole", __e(response?.user?.role), { path: "/" });
          //save user
          localStorage.setItem("LU", __e(JSON.stringify(response?.user)));
          setTimeout(() => {
            setSuccess(false);
            if (response?.user?.role) {
              const redirect = localStorage.getItem("redirect");
              console.log(redirect);
              if (redirect) {
                localStorage.removeItem("redirect");
                router.push(redirect);
              } else {
                router.push(`/${response.user.role}/dashboard`);
              }
            }
          }, 1500);
        } else if (response?.error || response?.message) {
          setErrors(response.error || { message: [response.message] });
          setIsLoading(false);
        }
      })();
    } else {
      setIsLoading(false);
    }
  };

  return !isAuthenticated ? (
    <>
      <Head>
        <title>Login</title>
      </Head>
      {isLoading && <Loader />}
      <div className="grid sm:grid-cols-2">
        {/**sign up form */}
        <div className="px-5 py-0 absolute sm:relative bg-white w-full h-screen overflow-y-auto">
          <div className="w-28 h-28 overflow-hidden">
            {/**logo */}
            <Link href="/">
              <img
                src="/logos/logo.png"
                alt="logo"
                className="h-full w-full object-cover cursor-pointer"
              />
            </Link>
          </div>
          {success && (
            <div className="py-2 px-2 text-green-600">
              <p className="flex items-center">
                <BiBadgeCheck className="text-2xl mr-1" />
                Loggedin successfully! Redirecting to dashboard.
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

          <div className="flex flex-col items-start mt-10">
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
                <div className="form-label">Emial / Mobile</div>
                <input
                  type="text"
                  name="email"
                  className="form-input rounded-md border-2 border-gray-400"
                  value={state?.email ? state.email : ""}
                  onChange={handleChange}
                />
              </div>
              <div
                className="form-element mt-5 text-gray-700"
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
                <p className="mt-1 flex items-center justify-between">
                  <label htmlFor="remember">
                    <input
                      type="checkbox"
                      name="remember"
                      id="remember"
                      onChange={(e) => {
                        setState((prev) => ({
                          ...prev,
                          remember: e.target.checked ? "yes" : false,
                        }));
                      }}
                    />
                    <span className="ml-1">Remember me</span>
                  </label>
                  <Link href="/">
                    <a>Forgot password?</a>
                  </Link>
                </p>
              </div>
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
                Don't have an account ?{" "}
                <Link href="/signup">
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
                <Link href="/">
                  <a className="border-r-2 border-l-2 border-gray-400 px-2 mx-2">
                    About Us
                  </a>
                </Link>
                <Link href="/">
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
