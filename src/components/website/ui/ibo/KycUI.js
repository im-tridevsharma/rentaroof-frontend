import { useState, useEffect } from "react";
import Loader from "../../../loader";
import { getProfile, updateProfile } from "../../../../lib/frontend/auth";
import { FiAlertTriangle, FiCheckCircle, FiEye, FiInfo } from "react-icons/fi";
import { GoVerified, GoUnverified } from "react-icons/go";
import ReactTooltip from "react-tooltip";

function KycUI() {
  const [profilePic, setProfilePic] = useState("");
  const [fileError, setFileError] = useState("");
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [kyc, setKyc] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getProfile(true);
      if (response?.status) {
        setIsLoading(false);
        setProfile(response?.user);
        setProfilePic(response?.user?.profile_pic);
        setKyc(response?.user?.kyc);
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
    setErrors(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.kyc);
    const iserror = errors
      ? Object.keys(errors).filter((index) => errors[index] !== false)
      : false;
    if (!iserror?.length) {
      submitKycData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitKycData = async (data) => {
    const response = await updateProfile(profile.id, data);
    if (response?.status) {
      setIsSaved(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
      document.querySelector("#errors").scrollIntoView();
    } else {
      setErrors(response?.error);
      setIsLoading(false);
      setTimeout(() => {
        setErrors(false);
      }, 3000);
      document.querySelector("#errors").scrollIntoView();
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className=" rounded-md bg-white p-3 mx-4 flex flex-col">
        {/**title */}
        <div className="flex items-center flex-col justify-center">
          <h5
            className="text-gray-800 mt-3"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Submit Required Documents
          </h5>
          <p
            className="text-2xs max-w-4xl mt-2 text-gray-900 leading-4 text-center font-semibold"
            style={{ fontFamily: "Opensans-regular" }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>
        {/**details */}
        <div>
          <form
            name="kyc"
            method="POST"
            className="flex flex-col"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="_method" value="PUT" />
            <input type="hidden" name="mode" value="kyc" />
            <div className="flex md:flex-row flex-col items-center justify-center mt-10">
              <div className="flex items-center md:flex-row flex-col">
                <div
                  className="w-32 h-32 border-gray-200 overflow-hidden"
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
              <div className="flex flex-col justify-end items-center md:items-start mt-5 md:ml-4 ml-0">
                <p className="mb-1" style={{ fontFamily: "Opensans-bold" }}>
                  Add your Photo
                </p>
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
            <div className="mt-10 leading-3 -mb-4 max-w-sm mx-auto" id="errors">
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
                  <FiCheckCircle className="mr-1" /> Kyc information saved
                  successfully.
                </p>
              )}
            </div>

            {/**personal details */}
            <div
              className="mt-10 flex justify-center w-full"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <fieldset className="max-w-4xl w-full shadow-sm p-3 border-gray-200 rounded border-2">
                <legend
                  className="text-center text-lg px-3"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Perosnal Details
                </legend>
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
                  <div className="form-element">
                    <div className="form-label" style={{ marginBottom: "2px" }}>
                      First Name
                    </div>
                    <input
                      type="text"
                      name="first"
                      className="form-input border-gray-300 rounded-sm"
                      value={profile?.first || ""}
                      onChange={inputChangeHandler}
                    />
                  </div>
                  <div className="form-element">
                    <div className="form-label" style={{ marginBottom: "2px" }}>
                      Last Name
                    </div>
                    <input
                      type="text"
                      name="last"
                      className="form-input border-gray-300 rounded-sm"
                      value={profile?.last || ""}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
                  <div className="form-element">
                    <div className="form-label" style={{ marginBottom: "0px" }}>
                      Gender
                    </div>
                    <select
                      name="gender"
                      className="form-input border-gray-300 rounded-sm"
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
                      Mobile
                    </div>
                    <input
                      type="text"
                      name="mobile"
                      className="form-input border-gray-300 rounded-sm"
                      value={profile?.mobile || ""}
                      onChange={inputChangeHandler}
                    />
                  </div>
                </div>
              </fieldset>
            </div>
            {/**personal documents */}
            <div className="flex flex-col mt-10 items-center justify-center">
              {kyc?.is_verified === 1 ? (
                <label className="text-2xl text-green-500 flex flex-col items-center justify-center">
                  <GoVerified />
                  <span className="text-2xs mb-1">Verified</span>
                </label>
              ) : (
                <label className="text-2xl text-red-500 flex flex-col items-center justify-center">
                  <GoUnverified />
                  <span className="text-2xs mb-1 flex items-center">
                    Not Verified{" "}
                    <FiInfo className="ml-1" title={kyc?.verification_issues} />
                  </span>
                </label>
              )}
              <h5
                className="text-gray-800"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Perosnal Documents
              </h5>
              <p
                className="text-2xs max-w-4xl text-gray-900 leading-4 text-center font-semibold"
                style={{ fontFamily: "Opensans-regular" }}
              >
                Select personal document type that you would like to submit
              </p>

              {/**document selector */}
              <div className="flex items-center justify-between max-w-2xl w-full mt-5 border-gray-200 px-10 py-2 rounded-md border-2">
                <label htmlFor="aadhar">
                  <input
                    type="radio"
                    name="doc_type"
                    value="aadhar"
                    id="aadhar"
                    checked={kyc?.document_type === "aadhar" ? true : false}
                    onChange={(e) => {
                      setKyc((prev) => ({
                        ...prev,
                        document_type: e.target.value,
                      }));
                    }}
                  />
                  <span className="ml-1">Aadhar Card</span>
                </label>

                <label htmlFor="driving_license">
                  <input
                    type="radio"
                    name="doc_type"
                    value="driving_license"
                    id="driving_license"
                    checked={
                      kyc?.document_type === "driving_license" ? true : false
                    }
                    onChange={(e) => {
                      setKyc((prev) => ({
                        ...prev,
                        document_type: e.target.value,
                      }));
                    }}
                  />
                  <span className="ml-1">Driving License</span>
                </label>

                <label htmlFor="idcard">
                  <input
                    type="radio"
                    name="doc_type"
                    value="idcard"
                    id="idcard"
                    checked={kyc?.document_type === "idcard" ? true : false}
                    onChange={(e) => {
                      setKyc((prev) => ({
                        ...prev,
                        document_type: e.target.value,
                      }));
                    }}
                  />
                  <span className="ml-1">Identity Card</span>
                </label>

                <label htmlFor="pan">
                  <input
                    type="radio"
                    name="doc_type"
                    value="pan"
                    id="pan"
                    checked={kyc?.document_type === "pan" ? true : false}
                    onChange={(e) => {
                      setKyc((prev) => ({
                        ...prev,
                        document_type: e.target.value,
                      }));
                    }}
                  />
                  <span className="ml-1">Pan Card</span>
                </label>

                <label
                  htmlFor="file"
                  className="py-2 px-5 rounded-md cursor-pointer"
                  style={{ backgroundColor: "var(--orange)" }}
                >
                  <input type="file" id="file" name="document" hidden />
                  <span>Upload</span>
                </label>

                {kyc?.document_upload && (
                  <label className="cursor-pointer text-blue-500">
                    <a
                      href={kyc?.document_upload}
                      target="_blank"
                      rel="norefferer"
                      data-tip="View Uploaded document"
                    >
                      <FiEye />
                      <ReactTooltip />
                    </a>
                  </label>
                )}
              </div>
              <div className="max-w-2xl w-full mt-3">
                <div className="form-element">
                  <label>Document Number</label>
                  <input
                    type="text"
                    name="document_number"
                    value={kyc?.document_number}
                    onChange={(e) => {
                      setKyc((prev) => ({
                        ...prev,
                        document_number: e.target.value,
                      }));
                    }}
                    className="form-input border-gray-300"
                  />
                </div>
                {/**present Address */}
                <div className="form-element">
                  <div className="form-label">Present Address</div>
                  <textarea
                    className="form-input border-gray-300"
                    value={kyc?.present_address}
                    onChange={(e) => {
                      setKyc((prev) => ({
                        ...prev,
                        present_address: e.target.value,
                      }));
                    }}
                    name="present_address"
                  ></textarea>
                </div>

                <div className="form-element">
                  <div className="form-label">Permanent Address</div>
                  <textarea
                    className="form-input border-gray-300"
                    value={kyc?.permanent_address}
                    onChange={(e) => {
                      setKyc((prev) => ({
                        ...prev,
                        permanent_address: e.target.value,
                      }));
                    }}
                    name="permanent_address"
                  ></textarea>
                </div>

                {/**reference details */}
                <fieldset>
                  <legend
                    className="text-center text-lg px-3"
                    style={{ fontFamily: "Opensans-bold" }}
                  >
                    Reference Details
                  </legend>
                  <div className="grid grid-cols-1 md:grid-cols-2 space-x-2">
                    <div className="form-element">
                      <label>Name</label>
                      <input
                        type="text"
                        name="ref_user_name"
                        value={kyc?.ref_user_name}
                        onChange={(e) => {
                          setKyc((prev) => ({
                            ...prev,
                            ref_user_name: e.target.value,
                          }));
                        }}
                        className="form-input border-gray-300"
                      />
                    </div>
                    <div className="form-element">
                      <label>Email</label>
                      <input
                        type="text"
                        name="ref_user_email"
                        value={kyc?.ref_user_email}
                        onChange={(e) => {
                          setKyc((prev) => ({
                            ...prev,
                            ref_user_email: e.target.value,
                          }));
                        }}
                        className="form-input border-gray-300"
                      />
                    </div>
                  </div>
                  <div className="form-element">
                    <div className="form-label">Address</div>
                    <textarea
                      className="form-input border-gray-300"
                      value={kyc?.ref_user_address}
                      onChange={(e) => {
                        setKyc((prev) => ({
                          ...prev,
                          ref_user_address: e.target.value,
                        }));
                      }}
                      name="ref_user_address"
                    ></textarea>
                  </div>
                </fieldset>
              </div>
            </div>
            <div className="mt-8 text-center mb-5">
              <button
                type="submit"
                className=" px-5 py-2 text-white rounded-md"
                style={{ backgroundColor: "var(--blue)" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default KycUI;
