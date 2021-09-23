import React, { useEffect, useState } from "react";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import Loader from "../../components/loader";
import { getProfile } from "../../lib/frontend/auth";

function Profile() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [fileError, setFileError] = useState("");
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getProfile();
      if (response?.status) {
        setIsLoading(false);
        setProfile(response?.user);
        setProfilePic(response?.user?.profile_pic);
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setProfilePic(reader.result);
    });
    if (file) {
      setFileError("");
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setFileError("Image must be of these formats : png, jpg, jpeg");
      } else if (file.size < 70000 || file.size > 500000) {
        setFileError("Image size must be between 70kb to 500kb only.");
      } else {
        setFileError("");
        reader.readAsDataURL(file);
      }
    }
  };

  const inputChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const ProfileUI = () => {
    return (
      <>
        {isLoading && <Loader />}
        <div className="relative p-5 shadow-sm border-2 border-gray-200 bg-white rounded-md">
          {/**left line */}
          <span
            className="absolute left-0 w-1 top-1 rounded-lg"
            style={{ backgroundColor: "var(--blue)", height: "98%" }}
          ></span>
          <form
            name="profile"
            method="POST"
            className="flex flex-col"
            encType="multipart/form-data"
          >
            <input type="hidden" name="_method" value="PUT" />
            {/**add your photo */}
            <div className="flex md:flex-row flex-col">
              <div className="flex items-center md:flex-row flex-col">
                <p
                  className="md:w-20 w-full text-center md:text-left"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Add Your Photo
                </p>
                <div
                  className="w-28 h-28 border-gray-200"
                  style={{ borderWidth: "1px" }}
                >
                  {profilePic && (
                    <img
                      src={profilePic}
                      alt="profile_pic"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
              {/**choose file button*/}
              <div className="flex flex-col justify-end items-center md:items-start mt-5 md:ml-10 ml-0">
                <label
                  className="mb-2 px-5 py-3 rounded-md  text-white cursor-pointer"
                  style={{
                    backgroundColor: "var(--blue)",
                    fontFamily: "Opensans-semi-bold",
                  }}
                  htmlFor="profile_pic"
                >
                  <input
                    type="file"
                    name="profile_pic"
                    id="profile_pic"
                    hidden
                    onChange={handleFileChange}
                  />
                  Choose a file
                </label>
                <div
                  className="leading-4 text-gray-400 text-xs"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  <p>Accepatable formats jpg, png only</p>
                  <p>Max file size is 500kb and Min size is 70kb</p>
                  {fileError && <p className="text-red-400">{fileError}</p>}
                </div>
              </div>
            </div>

            {/**account information */}
            <div
              className="relative flex flex-col border-gray-200 py-5 px-10 mt-10"
              style={{ borderTopWidth: "1px" }}
            >
              <p
                className="absolute -top-3 left-0 bg-white"
                style={{
                  fontFamily: "Opensans-bold",
                }}
              >
                Account Information
              </p>

              <div
                className="grid grid-cols-1 md:grid-cols-2 md:space-x-3 text-gray-600"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    First Name
                  </div>
                  <input
                    type="text"
                    name="first"
                    className="form-input border-gray-300"
                    value={profile?.first || ""}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    Last Name
                  </div>
                  <input
                    type="text"
                    name="last"
                    className="form-input border-gray-300"
                    value={profile?.last || ""}
                    onChange={inputChangeHandler}
                  />
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 md:space-x-3 text-gray-600"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    Email Id
                  </div>
                  <input
                    type="email"
                    name="email"
                    className="form-input border-gray-300"
                    value={profile?.email || ""}
                    onChange={inputChangeHandler}
                  />
                </div>
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    Mobile
                  </div>
                  <input
                    type="text"
                    name="mobile"
                    className="form-input border-gray-300"
                    value={profile?.mobile || ""}
                    onChange={inputChangeHandler}
                  />
                </div>
              </div>

              <div
                className="grid grid-cols-1 md:grid-cols-2 md:space-x-3 text-gray-600"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    Gender
                  </div>
                  <select
                    name="gender"
                    className="form-input border-gray-300"
                    value={profile?.gender || ""}
                    onChange={inputChangeHandler}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    Address
                  </div>
                  <input
                    type="text"
                    name="mobile"
                    className="form-input border-gray-300"
                    value={profile?.address?.full_address || ""}
                    onChange={(e) => {
                      setProfile((prev) => ({
                        ...prev,
                        address: {
                          ...prev.address,
                          full_address: e.target.value,
                        },
                      }));
                    }}
                  />
                </div>
              </div>
            </div>

            {/**change password */}
            <div
              className="relative flex flex-col border-gray-200 py-5 px-10 mt-1"
              style={{ borderTopWidth: "1px" }}
            >
              <p
                className="absolute -top-3 left-0 bg-white"
                style={{
                  fontFamily: "Opensans-bold",
                }}
              >
                Change Password
              </p>

              <div
                className="grid grid-cols-1 md:grid-cols-3 md:space-x-3 text-gray-600"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    Current Password
                  </div>
                  <input
                    type="password"
                    name="current_password"
                    className="form-input border-gray-300"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    New Password
                  </div>
                  <input
                    type="password"
                    name="new_password"
                    className="form-input border-gray-300"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label" style={{ marginBottom: "0px" }}>
                    Confirm Password
                  </div>
                  <input
                    type="password"
                    name="confirm_password"
                    className="form-input border-gray-300"
                  />
                </div>
              </div>
              <div className="">
                <button
                  name="update"
                  type="submit"
                  className="px-4 py-2 text-white rounded-sm"
                  style={{ backgroundColor: "var(--blue)" }}
                >
                  Update
                </button>
                <button
                  name="save"
                  type="submit"
                  className="px-4 py-2 text-white rounded-sm ml-2"
                  style={{ backgroundColor: "var(--orange)" }}
                >
                  Save All
                </button>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  };

  return isAuthenticated ? (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div>
        <UIRenderer UI={ProfileUI} role="User" page="Profile" />
      </div>
    </>
  ) : (
    <RenderError error="Unauthenticated" auth={isAuthenticated} />
  );
}

export default Profile;
