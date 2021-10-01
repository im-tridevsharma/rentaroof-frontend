import { useState, useEffect } from "react";
import Loader from "../../../loader";
import { getProfile, updateProfile } from "../../../../lib/frontend/auth";
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

function KycUI() {
  const [profilePic, setProfilePic] = useState("");
  const [fileError, setFileError] = useState("");
  const [profile, setProfile] = useState({});
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleFileChange = e => {
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

  const inputChangeHandler = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(false);
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="border-2 border-gray-200 rounded-md bg-white p-3 flex flex-col">
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
                    fontFamily: "Opensans-semi-bold"
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
              <div className="flex items-center justify-between max-w-2xl w-full mt-3 border-gray-200 px-10 py-2 rounded-md border-2">
                <label htmlFor="aadhar">
                  <input
                    type="radio"
                    name="doc_type"
                    value="aadhar"
                    id="aadhar"
                  />
                  <span className="ml-1">Aadhar Card</span>
                </label>

                <label htmlFor="dlicense">
                  <input
                    type="radio"
                    name="doc_type"
                    value="dlicense"
                    id="dlicense"
                  />
                  <span className="ml-1">Driving License</span>
                </label>

                <label htmlFor="idcard">
                  <input
                    type="radio"
                    name="doc_type"
                    value="idcard"
                    id="idcard"
                  />
                  <span className="ml-1">Identity Card</span>
                </label>

                <label htmlFor="pan">
                  <input type="radio" name="doc_type" value="pan" id="pan" />
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
