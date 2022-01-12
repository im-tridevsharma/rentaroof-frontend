import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiBadgeCheck, BiError } from "react-icons/bi";
import Loader from "../../components/loader";
import server, { __e } from "../../server";
import { createNewPassword, emailVerity, mobileVerity, sendAuthOTP, sendAuthOTPEmail } from "../../lib/frontend/auth";

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
  const [asktForNewPass, setAskForNewPass] = useState(false);
  const [user, setUser] = useState(false);
  const [token, setToken] = useState(null);
  const [state, setState] = useState({
    email: "",
    otp: ""
  });

  const [password, setPassword] = useState({
    new: "",
    confirm: ""
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

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    setErrors(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!state.otp){
      if(!state.email){
        setErrors([['Please enter Email or Mobile number!']]);
        return false;
      }
  
      if (isNaN(state.email)) {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)){
          setIsLoading(true);
          const res = await sendAuthOTPEmail({ email: state.email });
          if (res?.status) {
            setIsLoading(false);
            setOtpSent(true);
            setSuccess(res?.message)
            setTimeout(() => {
              setSuccess(false);
            }, 2000);
            setUser(res?.user);
          } else if (res?.error) {
            setErrors(res?.error);
            setIsLoading(false);
          } else {
            setErrors([[res?.message]]);
            setIsLoading(false);
          }
        }else{
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
          setSuccess(res?.message)
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
          setUser(res?.user);
        } else if (res?.error) {
          setErrors(res?.error);
          setIsLoading(false);
        } else {
          setErrors([[res?.message]]);
          setIsLoading(false);
        }
      }
    }else{
      //send otp for verification
      if(!state.email){
        setErrors([['Please enter Email or Mobile number!']]);
        return false;
      }
  
      if (isNaN(state.email)) {
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)){
          setIsLoading(true);
          const res = await emailVerity({ otp: state.otp, user_id: user?.id, forgotpass: true });
          if (res?.status) {
            setIsLoading(false);
            setSuccess(res?.message)
            setTimeout(() => {
              setSuccess(false);
            }, 2000);
            setAskForNewPass(true);
            setToken(res?._token);
            setErrors(false)
          } else if (res?.error) {
            setErrors(res?.error);
            setIsLoading(false);
          } else {
            setErrors([[res?.message]]);
            setIsLoading(false);
          }
        }else{
          setErrors([["Email is not valid. Please check once!"]]);
        }
      } else if (!isNaN(state.email) && state.email.length !== 10) {
        setErrors([["Mobile number is not valid. Please check once!"]]);
      } else {
        setIsLoading(true);
        const res = await mobileVerity({ otp: state.otp, user_id: user?.id, forgotpass: true });
        if (res?.status) {
          setIsLoading(false);
          setSuccess(res?.message)
          setTimeout(() => {
            setSuccess(false);
          }, 2000);
          setAskForNewPass(true);
          setToken(res?._token);
          setErrors(false)
        } else if (res?.error) {
          setErrors(res?.error);
          setIsLoading(false);
        } else {
          setErrors([[res?.message]]);
          setIsLoading(false);
        }
      }
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if(!password?.new && !password.confirm) {
      setErrors([['New Password can\'t be blank.'],['Confirm Password can\'t be blank.']]);
      return;
    }else if(!password.new) {
      setErrors([['New Password can\'t be blank']]);
      return;
    }else if(!password.confirm){
      setErrors([['Confirm Password can\'t be blank']]);
      return;
    }else if(password.new !== password.confirm) {
      setErrors([['New Password and Confirm Password doesn\'t match']]);
      return;
    }else{
      setIsLoading(true);
      const res = await createNewPassword({
        'new_password' : password.new,
        'confirm_password' : password.confirm,
        '_token'  : token
      });

      if(res?.status){
        setIsLoading(false);
        setSuccess(res?.message);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }else if(res?.error){
        setErrors(res?.error);
        setIsLoading(false);
      }else{
        setErrors([[res?.message]]);
        setIsLoading(false);
      }
    }
  }

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
                {success}
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
            {!asktForNewPass &&
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
                Please provide your Email/Mobile
              </p>

              <div
                className="form-element mt-5 text-gray-700"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-label">Emial/Mobile</div>
                <input
                  type="text"
                  name="email"
                  className="form-input rounded-md border-2 border-gray-400"
                  value={state?.email ? state.email : ""}
                  onChange={handleChange}
                />
              </div>
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
              <button
                type="submit"
                className="uppercase w-full rounded-md p-2 text-white hover:opacity-90"
                style={{
                  backgroundColor: "var(--blue)",
                  fontFamily: "Opensans-bold",
                }}
              >
                Request OTP
              </button>
            </form>
            }

            {asktForNewPass && <form
              name="newpassword"
              method="POST"
              onSubmit={handlePasswordSubmit}
              className="mt-10 px-2 w-full md:w-96"
            >
              <p
                className="text-gray-700"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                Create Your New Password
              </p>

              <div
                className="form-element mt-5 text-gray-700"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-label">New Password</div>
                <input
                  type="text"
                  name="new"
                  className="form-input rounded-md border-2 border-gray-400"
                  value={password?.new ? password.new : ""}
                  onChange={handlePasswordChange}
                />
              </div>
                <div
                  className="form-element mt-2 text-gray-700"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  <div className="form-label">Confirm Password</div>
                  <input
                    type="password"
                    name="confirm"
                    className="form-input rounded-md border-2 border-gray-400"
                    value={password?.confirm ? password?.confirm : ""}
                    onChange={handlePasswordChange}
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
                Submit
              </button>
            </form>}

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
