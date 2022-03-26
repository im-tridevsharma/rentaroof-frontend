import React, { useEffect, useState } from "react";
import Loader from "../../../loader";
import {
  getProfile,
  updatePassword,
  updateProfile,
} from "../../../../lib/frontend/auth";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import { __e } from "../../../../server";
import AutoComplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { toast } from "react-toastify";
import { MdMyLocation } from "react-icons/md";
import { sendOtp, verifyOtpSent } from "../../../../lib/frontend/share";

function ProfileUI() {
  const [isLoading, setIsLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [signature, setSignature] = useState("");
  const [fileError, setFileError] = useState("");
  const [signError, setSignError] = useState("");
  const [profile, setProfile] = useState({});
  const [submitMode, setSubmitMode] = useState("save");
  const [errors, setErrors] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [defaultLocation, setDefaultLocation] = useState("");
  const [verifyModal, setVerifyModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
    _method: "PUT",
  });
  const [perrors, setPErrors] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getProfile(true);
      if (response?.status) {
        setIsLoading(false);
        setProfile(response?.user);
        setDefaultLocation(response?.user?.address?.full_address);
        setProfilePic(response?.user?.profile_pic);
        setSignature(response?.user?.signature);
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSendOtp = async (type) => {
    if (profile) {
      setIsLoading(true);
      const res = await sendOtp(type);
      if (res?.status) {
        setIsLoading(false);
        setVerifyModal(type);
      } else {
        setIsLoading(false);
        toast.error(res?.message);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };

  const verifyOTP = async (type, otp) => {
    if (profile) {
      setIsLoading(true);
      const res = await verifyOtpSent({ type, otp });
      if (res?.status) {
        setIsLoading(false);
        setVerifyModal(false);
        setOtp("");
        setProfile((prev) => ({ ...prev, [type + "_verified"]: 1 }));
      } else {
        setIsLoading(false);
        toast.error(res?.message);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };

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

  const handlePlaceSearch = (place, fromLatLng = false) => {
    setIsLoading(true);

    const components = place?.address_components;

    components.forEach((element) => {
      if (element.types.includes("route")) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev?.address, route: element?.long_name },
        }));
      }
      if (element.types.includes("sublocality_level_2")) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev?.address, sub_area: element?.long_name },
        }));
      }
      if (element.types.includes("sublocality_level_1")) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev?.address, area: element?.long_name },
        }));
      }
      if (element.types.includes("locality")) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev?.address, city: element?.long_name },
        }));
      }
      if (element.types.includes("administrative_area_level_2")) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev?.address, zone: element?.long_name },
        }));
      }
      if (element.types.includes("administrative_area_level_1")) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev?.address, state: element?.long_name },
        }));
      }
      if (element.types.includes("country")) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev?.address, country: element?.long_name },
        }));
      }
      if (element.types.includes("postal_code")) {
        setProfile((prev) => ({
          ...prev,
          address: { ...prev?.address, pincode: element?.long_name },
        }));
      }
    });

    setProfile((prev) => ({
      ...prev,
      address: { ...prev?.address, full_address: place?.formatted_address },
    }));
    setProfile((prev) => ({
      ...prev,
      address: { ...prev?.address, place_id: place?.place_id },
    }));

    if (fromLatLng) {
      setProfile((prev) => ({
        ...prev,
        address: { ...prev?.address, lat: place.geometry.location.lat },
      }));
      setProfile((prev) => ({
        ...prev,
        address: { ...prev?.address, long: place.geometry.location.lng },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        address: { ...prev?.address, lat: place.geometry.location.lat("d") },
      }));
      setProfile((prev) => ({
        ...prev,
        address: { ...prev?.address, long: place.geometry.location.lng("d") },
      }));
    }

    setDefaultLocation(place.formatted_address);

    setIsLoading(false);
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        Geocode.setApiKey(process?.env?.MAP_API_KEY);
        Geocode.fromLatLng(
          location?.coords?.latitude,
          location?.coords?.longitude
        ).then((response) => {
          handlePlaceSearch(response?.results[0], true);
        });
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSignChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setSignature(reader.result);
    });
    if (file) {
      setSignError("");
      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        setSignError("Image must be of these formats : png, jpg, jpeg");
      } else if (file.size < 70000 || file.size > 500000) {
        setSignError("Image size must be between 70kb to 500kb only.");
      } else {
        setSignError("");
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
    setErrors(false);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    setPErrors(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (submitMode === "save") {
      const formdata = new FormData(document.forms.profile);
      const iserror = errors
        ? Object.keys(errors).filter((index) => errors[index] !== false)
        : false;
      if (!iserror?.length) {
        submitProfileData(formdata);
      }
    } else if (submitMode === "update") {
      const iserror = perrors
        ? Object.keys(perrors).filter((index) => perrors[index] !== false)
        : false;
      if (!iserror?.length) {
        submitPasswordData(password);
      } else {
        setIsLoading(false);
      }
    }
  };

  const submitProfileData = async (formdata) => {
    const response = await updateProfile(profile.id, formdata);
    if (response?.status) {
      const pdata = {
        id: response?.data?.id,
        system_userid: response?.data?.system_userid,
        first: response?.data?.first,
        last: response?.data?.last,
        fullname: response?.data?.first + " " + response?.data?.last,
        email: response?.data?.email,
        mobile: response?.data?.mobile,
        role: response?.data?.role,
        profile_pic: response?.data?.profile_pic,
        permissions: [],
        account_status: response?.data?.account_status,
      };

      localStorage.setItem("LU", __e(JSON.stringify(pdata)));

      setIsSaved(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsSaved(false);
      }, 1000);
      setErrors(false);
    } else if (response?.error) {
      setIsLoading(false);
      setErrors(response.error);
    } else {
      setIsLoading(false);
      setErrors([[response?.message]]);
    }
  };

  const submitPasswordData = async (password) => {
    const response = await updatePassword(profile.id, password);
    if (response?.status) {
      setIsUpdated(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsUpdated(false);
      }, 1000);
      setPassword({
        current_password: "",
        new_password: "",
        confirm_password: "",
        _method: "PUT",
      });
      setPErrors(false);
    } else if (response?.error) {
      setIsLoading(false);
      setPErrors(response.error);
    }
  };

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
          onSubmit={submitHandler}
        >
          <input type="hidden" name="_method" value="PUT" />
          <div className="flex md:flex-row flex-col items-center justify-between">
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
                  className="w-28 h-28 border-gray-200 rounded-md overflow-hidden"
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
            {/**add your signature */}
            <div className="flex md:flex-row mt-2 md:mt-0 flex-col">
              <div className="flex items-center md:flex-row flex-col">
                <p
                  className="md:w-20 w-full text-center md:text-left"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Add Your Signature
                </p>
                <div
                  className="w-28 h-28 border-gray-200 rounded-md overflow-hidden"
                  style={{ borderWidth: "1px" }}
                >
                  {signature && (
                    <img
                      src={signature}
                      alt="signature"
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
                  htmlFor="signature"
                >
                  <input
                    type="file"
                    name="signature"
                    id="signature"
                    hidden
                    onChange={handleSignChange}
                  />
                  Choose a file
                </label>
                <div
                  className="leading-4 text-gray-400 text-xs"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  <p>Accepatable formats jpg, png only</p>
                  <p>Max file size is 500kb and Min size is 70kb</p>
                  {signError && <p className="text-red-400">{signError}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 leading-3 -mb-4">
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
            {isSaved && (
              <p className="flex items-center text-green-600">
                <FiCheckCircle className="mr-1" /> Profile information saved
                successfully.
              </p>
            )}
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
                <div className="flex items-center">
                  <button
                    type="button"
                    data-tip="Current Location"
                    className="p-3 border rounded-md mr-2"
                    onClick={getCurrentLocation}
                  >
                    <MdMyLocation />
                  </button>
                  <AutoComplete
                    apiKey={process.env.MAP_API_KEY}
                    onPlaceSelected={(place) => handlePlaceSearch(place)}
                    className=" border-gray-300 w-full text-sm px-2 h-9"
                    placeholder="Search your address..."
                    style={{ borderWidth: "1px" }}
                    defaultValue={defaultLocation}
                    options={{
                      types: ["address"],
                      componentRestrictions: {
                        country: "in",
                      },
                    }}
                  />
                </div>

                <input
                  type="hidden"
                  name="lattitude"
                  value={profile?.address?.lat}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="country"
                  value={profile?.address?.country}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="state"
                  value={profile?.address?.state}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="city"
                  value={profile?.address?.city}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="pincode"
                  value={profile?.address?.pincode}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="longitude"
                  value={profile?.address?.long}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="zone"
                  value={profile?.address?.zone}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="area"
                  value={profile?.address?.area}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="sub_area"
                  value={profile?.address?.sub_area}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="neighborhood"
                  value={profile?.address?.neighborhood}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="route"
                  value={profile?.address?.route}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="place_id"
                  value={profile?.address?.place_id}
                  onChange={() => {}}
                />
                <input
                  type="hidden"
                  name="full_address"
                  className="form-input border-gray-300"
                  value={profile?.address?.full_address}
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3 text-gray-500">
              <div className="form-element">
                <input
                  type="hidden"
                  name="lat"
                  className="form-input border-gray-300"
                  value={profile?.address?.lat || ""}
                  onChange={(e) => {
                    setProfile((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        lat: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
              <div className="form-element">
                <input
                  type="hidden"
                  name="long"
                  className="form-input border-gray-300"
                  value={profile?.address?.long || ""}
                  onChange={(e) => {
                    setProfile((prev) => ({
                      ...prev,
                      address: {
                        ...prev.address,
                        long: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
            <div className="flex items-center">
              <p className="flex items-center">
                <b className="mr-2">Mobile Status:</b>
                {profile?.mobile_verified === 1 ? (
                  <span className="text-green-500">Verified</span>
                ) : (
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">Not Verified</span>
                    <button
                      onClick={() => handleSendOtp("mobile")}
                      type="button"
                      style={{ backgroundColor: "var(--blue)" }}
                      className="px-3 ml-3 py-2 rounded-md text-white"
                    >
                      Verify
                    </button>
                  </div>
                )}
              </p>
              <p className="flex items-center ml-5">
                <b className="mr-2">Email Status:</b>
                {profile?.email_verified === 1 ? (
                  <span className="text-green-500">Verified</span>
                ) : (
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">Not Verified</span>
                    <button
                      onClick={() => handleSendOtp("email")}
                      type="button"
                      style={{ backgroundColor: "var(--blue)" }}
                      className="px-3 ml-3 py-2 rounded-md text-white"
                    >
                      Verify
                    </button>
                  </div>
                )}
              </p>
            </div>
          </div>
          <div className="leading-3 mb-3">
            {perrors && (
              <div className="errors">
                {Object.keys(perrors).map((index, i) => (
                  <div className="w-full mb-2" key={i}>
                    <p className="text-red-500 flex items-center">
                      <FiAlertTriangle className="mr-1" /> {perrors[index]}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {isUpdated && (
              <p className="flex items-center text-green-600">
                <FiCheckCircle className="mr-1" /> Password updated
                successfully.
              </p>
            )}
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
                  value={password.current_password}
                  onChange={handlePasswordChange}
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
                  value={password.new_password}
                  onChange={handlePasswordChange}
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
                  value={password.confirm_password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-sm"
                style={{ backgroundColor: "var(--blue)" }}
                onClick={() => setSubmitMode("update")}
              >
                Update
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-sm ml-2"
                style={{ backgroundColor: "var(--orange)" }}
                onClick={() => setSubmitMode("save")}
              >
                Save All
              </button>
            </div>
          </div>
        </form>
      </div>

      {verifyModal && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            verifyOTP(verifyModal, otp);
          }}
          style={{ fontFamily: "Opensans-regular" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-md z-40 max-w-lg w-full"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            OTP Verification
            <FaTimes
              onClick={() => setVerifyModal(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
          </h5>
          <hr className="my-1" />
          <p className="text-green-500 mt-2">
            {verifyModal == "email"
              ? "OTP has been sent on you email."
              : "OTP has been sent on your mobile."}
          </p>
          <div className="mt-5">
            <div className="form-element">
              <label className="form-label">OTP</label>
              <input
                required={true}
                type="text"
                maxLength={6}
                minLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-input border-gray-300 h-10 rounded-md"
              />
            </div>
          </div>
          <button
            style={{ backgroundColor: "var(--blue)" }}
            className="px-3 rounded-md py-2 float-right text-white"
          >
            Verify
          </button>
        </form>
      )}
    </>
  );
}

export default ProfileUI;
