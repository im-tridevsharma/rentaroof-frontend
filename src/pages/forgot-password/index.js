import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiBadgeCheck, BiError } from "react-icons/bi";
import Loader from "../../components/loader";
import server, { __e } from "../../server";

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
  const [state, setState] = useState({
    email: "",
  });
  const [errors, setErrors] = useState(false);
  const [logo, setLogo] = useState("");
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
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      {isLoading && <Loader />}
      <div className="grid sm:grid-cols-2 w-full">
        {/**sign up form */}
        <div className="px-5 py-0 absolute sm:relative bg-white w-full h-screen overflow-y-auto">
          <div className="w-28 h-28 overflow-hidden">
            {/**logo */}
            <Link href="/">
              <img
                src={logo || "/images/website/no_photo.png"}
                alt="logo"
                className="h-full w-full object-cover cursor-pointer"
              />
            </Link>
          </div>
          {success && (
            <div className="py-2 px-2 text-green-600">
              <p className="flex items-center">
                <BiBadgeCheck className="text-2xl mr-1" />
                Password reset link sent successfully to your email.
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
              Forgot Password
              <span
                className="absolute bottom-0 left-0 w-7 h-1 rounded-full"
                style={{
                  backgroundColor: "var(--orange)",
                }}
              ></span>
            </h6>
            {/**signup form */}
            <form
              name="forgotpassword"
              method="POST"
              onSubmit={handleSubmit}
              className="mt-10 px-2 w-full md:w-96"
            >
              <p
                className="text-gray-700"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                Please provide your email
              </p>

              <div
                className="form-element mt-5 text-gray-700"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-label">Emial ID</div>
                <input
                  type="text"
                  name="email"
                  className="form-input rounded-md border-2 border-gray-400"
                  value={state?.email ? state.email : ""}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="uppercase w-full rounded-md p-2 text-white hover:opacity-90"
                style={{
                  backgroundColor: "var(--blue)",
                  fontFamily: "Opensans-bold",
                }}
              >
                Request Reset Link
              </button>
            </form>

            {/**other signup options */}
            <div className="w-full relative md:w-96 border-t-2 border-gray-200 mt-8">
              <div
                className="text-center text-gray-500 mt-5"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                Remember your password ?
                <Link href="/login">
                  <a style={{ color: "var(--blue)" }}> Login</a>
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

export default Index;
