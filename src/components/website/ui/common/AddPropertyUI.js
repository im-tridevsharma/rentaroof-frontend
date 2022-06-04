import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import CircleInputRadio from "../../CircleInputRadio";
import { FiAlertTriangle } from "react-icons/fi";
import addProperty, {
  getPropertyByCode,
  updateProperty,
} from "../../../../lib/frontend/properties";
import Loader from "../../../loader";
import { useRouter } from "next/router";
import PropertyAddGallery from "./PropertyAddGallery";
import PropertyAddAddress from "./PropertyAddAddress";
import PropertyAddAmenities from "./PropertyAddAmenities";
import PropertyAddEssentials from "./PropertyAddEssentials";
import DatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment";
import { toast } from "react-toastify";
import { FaPlus, FaTimes } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { getMyLandlords, newLandlord } from "../../../../lib/frontend/share";
import { __d } from "../../../../server";

const inspectionDays = [
  { value: "all days", label: "All Days" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thrusday", label: "Thrusday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
];

function AddPropertyUI() {
  const editorRef = useRef(null);
  const [profile, setProfile] = useState(false);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [balconies, setBalconies] = useState(1);
  const [floors, setFloors] = useState(1);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyCode, setPropertyCode] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [property, setProperty] = useState({});
  const [isAddMode, setIsAddMode] = useState(false);
  const [landlords, setLandlords] = useState([]);
  const [landlord, setLandlord] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const router = useRouter();

  const fetchLandlords = async () => {
    const res = await getMyLandlords();
    if (res?.status) {
      setLandlords(res.data);
    } else {
      toast.error(res?.message);
    }
  };

  useEffect(() => {
    if (router.query?.id && router.query?.next) {
      localStorage.setItem("recent_ap", router.query.id);
      localStorage.setItem("next_ap", router.query.next);
    }
    const nextap = localStorage.getItem("next_ap") || router.query.next;
    const pcode = localStorage.getItem("recent_ap") || router.query.id;
    setNextStep(nextap);
    setPropertyCode(pcode);

    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u?.id) {
      setProfile(u);
    }

    if (nextap === "UPDATE") {
      setIsLoading(true);
      (async () => {
        const response = await getPropertyByCode(
          pcode.split("-")[0] + "-" + pcode.split("-")[1]
        );
        if (response?.status) {
          setProperty(response?.data);
          setBedrooms(response?.data.bedrooms);
          setBathrooms(response?.data.bathrooms);
          setBalconies(response?.data.balconies);
          setFloors(response?.data.floors);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(response?.error || response?.message);
        }
      })();
    }
  }, [router.query]);

  useEffect(() => {
    fetchLandlords();
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.add_property);
    formdata.append("description", editorRef.current.getContent());
    property?.id && formdata.append("_method", "PUT");
    const iserror = errors
      ? Object.keys(errors).filter((index) => errors[index] !== false)
      : false;
    if (!iserror?.length) {
      submitData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (data) => {
    const response = property?.id
      ? await updateProperty(property?.id, data)
      : await addProperty(data);

    if (response?.status) {
      setIsLoading(false);
      router.push(
        "?step=next&next=GALLERY&id=" +
          response?.data?.property_code +
          "-" +
          response?.data?.id +
          (property?.id ? "&mode=update" : "")
      );
      document.forms.add_property?.reset();
    } else if (response?.error) {
      setErrors(response.error);
      setIsLoading(false);
      document.querySelector("#errors").scrollIntoView();
      setTimeout(() => {
        setErrors(false);
      }, 5000);
    } else {
      toast.error(response?.message || response?.error);
      setIsLoading(false);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const addNewLandlord = async (e) => {
    e.preventDefault();
    if (
      landlord.name.trim() &&
      landlord.email.trim() &&
      landlord.mobile.trim() &&
      landlord.password
    ) {
      setIsLoading(true);
      const res = await newLandlord(landlord);
      if (res?.status) {
        toast.success(
          "New Landlord added successfully. Verification link sent on email and mobile. Please verify."
        );
        setIsLoading(false);
        fetchLandlords();
        setLandlord({
          name: "",
          email: "",
          mobile: "",
          password: "",
        });
        setIsAddMode(false);
      } else if (res?.error) {
        setIsLoading(false);
        toast.warn(res?.error);
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    } else {
      toast.warn("Please enter all the fields.");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col border-2 border-gray-200 rounded-md shadow-sm p-4 bg-white">
        <div className="mt-4" id="errors">
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
        </div>
        {(!propertyCode || nextStep === "UPDATE") && (
          <form
            name="add_property"
            style={{ fontFamily: "Opensans-semi-bold" }}
            className="text-gray-600"
            onSubmit={handleSubmitForm}
          >
            <div
              className={`grid ${
                profile.role === "ibo" && "md:grid-cols-2 md:space-x-3"
              }`}
            >
              <div className="form-element">
                <label className="form-label">
                  Property Title (Name)<span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={property?.name}
                  onChange={inputHandler}
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              {profile?.role === "ibo" && (
                <div className="form-element">
                  <label className="form-label">
                    Landlord<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="flex items-center">
                    <select
                      className="form-input border-gray-200 rounded-md"
                      name="landlord"
                    >
                      <option value="">Select Property Owner</option>
                      {landlords?.length > 0 &&
                        landlords.map((l, i) => (
                          <option key={i} value={l?.id}>
                            {l?.first} {l?.last}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={() => setIsAddMode(true)}
                      type="button"
                      className="p-2 text-white ml-1 rounded-md"
                      data-tip="Add New Landlord"
                      style={{ background: "var(--blue)" }}
                    >
                      <FaPlus />
                      <ReactTooltip />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Property For</label>
                <select
                  name="for"
                  value={property?.for}
                  onChange={inputHandler}
                  className="form-input border-gray-200 rounded-md"
                >
                  <option value="rent">Rent</option>
                </select>
              </div>
              <div className="form-element">
                <label className="form-label">Property Type</label>
                <select
                  name="type"
                  value={property?.type}
                  onChange={inputHandler}
                  className="form-input border-gray-200 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="apartment">Apartment</option>
                  <option value="individual floor">Individual Floor</option>
                  <option value="independent house">Independent House</option>
                  <option value="villa or farm house">Villa/Farm House</option>
                  <option value="vacation rental">Vacation Rental</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Posting As</label>
                <select
                  name="posting_as"
                  value={property?.posting_as}
                  onChange={inputHandler}
                  className="form-input border-gray-200 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="full_house">Full House</option>
                  <option value="sharing_basis">Sharing Basis</option>
                </select>
              </div>
              <div className="form-element">
                <label className="form-label">Ownership Type</label>
                <select
                  name="ownership_type"
                  value={property?.ownership_type}
                  onChange={inputHandler}
                  className="form-input border-gray-200 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="single">Single</option>
                  <option value="joint">Joint</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
              <div className="form-element">
                <label className="form-label">
                  Furnished Status<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="furnished_status"
                  value={property?.furnished_status}
                  onChange={inputHandler}
                  className="form-input border-gray-200 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="furnished">Furnished</option>
                  <option value="unfurnished">Unfurnished</option>
                  <option value="semi-furnished">Semi Furnished</option>
                  <option value="under construction">Under Construction</option>
                  <option value="under renovation">Under Renovation</option>
                </select>
              </div>
              <div className="form-element">
                <label className="form-label">Maintenence Duration</label>
                <select
                  name="maintenence_duration"
                  value={property?.maintenence_duration}
                  onChange={inputHandler}
                  className="form-input border-gray-200 rounded-md"
                >
                  <option value="">Select</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            <hr className=" border-gray-400 my-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Super Area</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="super_area"
                    value={property?.super_area}
                    onChange={inputHandler}
                    className="form-input mr-3 border-gray-200 rounded-md"
                  />
                  <select
                    className="form-input border-gray-200 rounded-md"
                    name="super_area_unit"
                    value={property?.super_area_unit}
                    onChange={inputHandler}
                  >
                    <option value="sqft">SQFT</option>
                    <option value="sqm">SQM</option>
                    <option value="sqyrd">SQYRD</option>
                  </select>
                </div>
              </div>
              <div className="form-element">
                <label className="form-label">Carpet Area</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="carpet_area"
                    value={property?.carpet_area}
                    onChange={inputHandler}
                    className="form-input mr-3 border-gray-200 rounded-md"
                  />
                  <select
                    className="form-input border-gray-200 rounded-md"
                    name="carpet_area_unit"
                    value={property?.carpet_area_unit}
                    onChange={inputHandler}
                  >
                    <option value="sqft">SQFT</option>
                    <option value="sqm">SQM</option>
                    <option value="sqyrd">SQYRD</option>
                  </select>
                </div>
              </div>

              <div className="form-element">
                <label className="form-label">
                  Bedroom<span style={{ color: "red" }}>*</span>
                </label>
                <div className="flex items-center flex-wrap">
                  <CircleInputRadio
                    name="bedrooms"
                    value="0"
                    state={{ data: bedrooms, setData: setBedrooms }}
                  />
                  <CircleInputRadio
                    name="bedrooms"
                    value="1"
                    state={{ data: bedrooms, setData: setBedrooms }}
                  />
                  <CircleInputRadio
                    name="bedrooms"
                    value="2"
                    state={{ data: bedrooms, setData: setBedrooms }}
                  />
                  <CircleInputRadio
                    name="bedrooms"
                    value="3"
                    state={{ data: bedrooms, setData: setBedrooms }}
                  />
                  <CircleInputRadio
                    name="bedrooms"
                    value="4"
                    state={{ data: bedrooms, setData: setBedrooms }}
                  />
                  <CircleInputRadio
                    name="bedrooms"
                    value="4+"
                    state={{ data: bedrooms, setData: setBedrooms }}
                  />
                  <input
                    type="text"
                    name="custom_bedrooms"
                    className="border-gray-200 rounded-md text-sm w-12"
                    style={{
                      borderWidth: "1px",
                      display: bedrooms === "4+" ? "inline" : "none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">
                  Bathroom<span style={{ color: "red" }}>*</span>
                </label>
                <div className="flex items-center flex-wrap">
                  <CircleInputRadio
                    name="bathrooms"
                    value="0"
                    state={{ data: bathrooms, setData: setBathrooms }}
                  />
                  <CircleInputRadio
                    name="bathrooms"
                    value="1"
                    state={{ data: bathrooms, setData: setBathrooms }}
                  />
                  <CircleInputRadio
                    name="bathrooms"
                    value="2"
                    state={{ data: bathrooms, setData: setBathrooms }}
                  />
                  <CircleInputRadio
                    name="bathrooms"
                    value="3"
                    state={{ data: bathrooms, setData: setBathrooms }}
                  />
                  <CircleInputRadio
                    name="bathrooms"
                    value="4"
                    state={{ data: bathrooms, setData: setBathrooms }}
                  />
                  <CircleInputRadio
                    name="bathrooms"
                    value="4+"
                    state={{ data: bathrooms, setData: setBathrooms }}
                  />
                  <input
                    type="text"
                    name="custom_bathrooms"
                    className="border-gray-200 rounded-md text-sm w-12"
                    style={{
                      borderWidth: "1px",
                      display: bathrooms === "4+" ? "inline" : "none",
                    }}
                  />
                </div>
              </div>

              <div className="form-element">
                <label className="form-label">
                  Balcony<span style={{ color: "red" }}>*</span>
                </label>
                <div className="flex items-center flex-wrap">
                  <CircleInputRadio
                    name="balconies"
                    value="0"
                    state={{ data: balconies, setData: setBalconies }}
                  />
                  <CircleInputRadio
                    name="balconies"
                    value="1"
                    state={{ data: balconies, setData: setBalconies }}
                  />
                  <CircleInputRadio
                    name="balconies"
                    value="2"
                    state={{ data: balconies, setData: setBalconies }}
                  />
                  <CircleInputRadio
                    name="balconies"
                    value="3"
                    state={{ data: balconies, setData: setBalconies }}
                  />
                  <CircleInputRadio
                    name="balconies"
                    value="4"
                    state={{ data: balconies, setData: setBalconies }}
                  />
                  <CircleInputRadio
                    name="balconies"
                    value="4+"
                    state={{ data: balconies, setData: setBalconies }}
                  />
                  <input
                    type="text"
                    name="custom_balconies"
                    className="border-gray-200 rounded-md text-sm w-12"
                    style={{
                      borderWidth: "1px",
                      display: balconies === "4+" ? "inline" : "none",
                    }}
                  />
                </div>
              </div>
              <div className="form-element">
                <label className="form-label">
                  Floors<span style={{ color: "red" }}>*</span>
                </label>
                <div className="flex items-center flex-wrap">
                  <CircleInputRadio
                    name="floors"
                    value="-1"
                    state={{ data: floors, setData: setFloors }}
                  />
                  <CircleInputRadio
                    name="floors"
                    value="0"
                    state={{ data: floors, setData: setFloors }}
                  />
                  <CircleInputRadio
                    name="floors"
                    value="1"
                    state={{ data: floors, setData: setFloors }}
                  />
                  <CircleInputRadio
                    name="floors"
                    value="2"
                    state={{ data: floors, setData: setFloors }}
                  />
                  <CircleInputRadio
                    name="floors"
                    value="3"
                    state={{ data: floors, setData: setFloors }}
                  />
                  <CircleInputRadio
                    name="floors"
                    value="4"
                    state={{ data: floors, setData: setFloors }}
                  />
                  <CircleInputRadio
                    name="floors"
                    value="4+"
                    state={{ data: floors, setData: setFloors }}
                  />
                  <input
                    type="text"
                    name="custom_floors"
                    className="border-gray-200 rounded-md text-sm w-12"
                    style={{
                      borderWidth: "1px",
                      display: floors === "4+" ? "inline" : "none",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Available From</label>
                <DatePicker
                  dateFormat="dd-MM-yyyy"
                  selected={moment(property?.available_from).toDate()}
                  onChange={(date) =>
                    setProperty((prev) => ({
                      ...prev,
                      available_from: moment(date).format("YYYY-MM-DD"),
                    }))
                  }
                />
                <input
                  type="hidden"
                  name="available_from"
                  value={property?.available_from}
                />
              </div>
              <div className="form-element">
                <label className="form-label">Available Immediate?</label>
                <input
                  type="checkbox"
                  name="available_immediately"
                  checked={property?.available_immediately === 1 ? true : false}
                  onChange={(e) =>
                    setProperty((prev) => ({
                      ...prev,
                      available_immediately: e.target.checked ? 1 : 0,
                    }))
                  }
                  className="w-8 h-8 rounded-md border-gray-200"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Age of Construction</label>
                <input
                  type="text"
                  name="age_of_construction"
                  value={property?.age_of_construction}
                  onChange={inputHandler}
                  className="form-input rounded-md border-gray-200"
                  placeholder="eg: 2 years"
                />
              </div>
            </div>

            <hr className=" border-gray-400 my-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Inspection Days</label>
                <Select
                  options={inspectionDays}
                  isMulti={true}
                  closeMenuOnSelect={false}
                  onChange={(e) =>
                    setProperty((prev) => ({
                      ...prev,
                      inspection_days: e
                        .map((ele) => {
                          return ele.value;
                        })
                        .join(","),
                    }))
                  }
                  value={inspectionDays?.filter((o) =>
                    property?.inspection_days?.split(",")?.includes(o.value)
                  )}
                />
                <input
                  type="hidden"
                  name="inspection_days"
                  value={property?.inspection_days}
                />
              </div>

              <div className="form-element">
                <label className="form-label">Inspection Time From</label>
                <DatePicker
                  selected={moment(
                    `${moment().format("YYYY-MM-DD")} ${
                      property?.inspection_time_from || "9:00 AM"
                    }`
                  ).toDate()}
                  onChange={(date) =>
                    setProperty((prev) => ({
                      ...prev,
                      inspection_time_from: moment(date).format("h:mm A"),
                    }))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <input
                  type="hidden"
                  name="inspection_time_from"
                  value={property?.inspection_time_from}
                />
              </div>
              <div className="form-element">
                <label className="form-label">Inspection Time To</label>
                <DatePicker
                  selected={moment(
                    `${moment().format("YYYY-MM-DD")} ${
                      property?.inspection_time_to || "7:00 PM"
                    }`
                  ).toDate()}
                  onChange={(date) =>
                    setProperty((prev) => ({
                      ...prev,
                      inspection_time_to: moment(date).format("h:mm A"),
                    }))
                  }
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
                <input
                  type="hidden"
                  name="inspection_time_to"
                  value={property?.inspection_time_to}
                />
              </div>
            </div>
            <hr className=" border-gray-400 my-3" />
            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Monthly Rent</label>
                <input
                  type="text"
                  name="monthly_rent"
                  value={property?.monthly_rent}
                  onChange={inputHandler}
                  className="form-input rounded-md border-gray-200"
                  placeholder="Rs."
                />
              </div>

              <div className="form-element">
                <label className="form-label">Security Amount</label>
                <input
                  type="text"
                  name="security_amount"
                  value={property?.security_amount}
                  onChange={inputHandler}
                  className="form-input rounded-md border-gray-200"
                  placeholder="Rs."
                />
              </div>

              <div className="form-element">
                <label className="form-label">Maintenence Charge</label>
                <input
                  type="text"
                  name="maintenence_charge"
                  value={property?.maintenence_charge}
                  onChange={inputHandler}
                  className="form-input rounded-md border-gray-200"
                  placeholder="Rs."
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Asking Price</label>
                <input
                  type="text"
                  name="offered_price"
                  value={property?.offered_price}
                  onChange={inputHandler}
                  className="form-input rounded-md border-gray-200"
                  placeholder="Rs."
                />
              </div>

              <div className="form-element">
                <label className="form-label">Lease Period</label>
                <select
                  name="lease_period"
                  value={property?.lease_period}
                  onChange={inputHandler}
                  className="form-input rounded-md border-gray-200"
                >
                  <option value="">Select</option>
                  <option value="1 year">1 Year</option>
                  <option value="3 years">3 Years</option>
                  <option value="5 years">5 Years</option>
                  <option value="7 years">7 Years</option>
                  <option value="9 years">9 Years</option>
                </select>
              </div>

              <div className="form-element">
                <label className="form-label">Advance Amount Period</label>
                <select
                  name="advance_amount_period"
                  value={property?.advance_amount_period}
                  onChange={inputHandler}
                  className="form-input rounded-md border-gray-200"
                >
                  <option value="">Select</option>
                  <option value="1 month">1 Month</option>
                  <option value="2 months">2 Months</option>
                  <option value="3 months">3 Months</option>
                  <option value="4 months">4 Months</option>
                  <option value="5 months">5 Months</option>
                  <option value="6 months">6 Months</option>
                  <option value="7 months">7 Months</option>
                  <option value="8 months">8 Months</option>
                  <option value="9 months">9 Months</option>
                  <option value="10 months">10 Months</option>
                  <option value="11 months">11 Months</option>
                  <option value="12 months">12 Months</option>
                </select>
              </div>
            </div>

            <hr className=" border-gray-400 my-3" />

            <div className="form-element">
              <label className="form-label">Short Description</label>
              <textarea
                name="short_description"
                className="form-input border-gray-200 rounded-md"
                value={property?.short_description}
                onChange={inputHandler}
              ></textarea>
            </div>
            <div className="form-element">
              <label className="form-label">Description</label>
              <Editor
                onInit={(e, editor) => (editorRef.current = editor)}
                init={{
                  height: 300,
                  menubar: false,
                }}
                initialValue={property?.description}
                apiKey={process.env.TINY_API_KEY}
              />
            </div>

            <div>
              <button
                className="text-white rounded-md px-3 py-2 mt-6 w-full"
                style={{ backgroundColor: "var(--blue)" }}
              >
                {property?.id
                  ? "Update and Procced Next"
                  : "Submit and Procced Next"}
              </button>
            </div>
          </form>
        )}

        {propertyCode && nextStep === "GALLERY" && (
          <PropertyAddGallery code={propertyCode} />
        )}
        {propertyCode && nextStep === "ADDRESS" && (
          <PropertyAddAddress code={propertyCode} />
        )}
        {propertyCode && nextStep === "AMENITIES" && (
          <PropertyAddAmenities code={propertyCode} />
        )}
        {propertyCode && nextStep === "ESSENTIALS" && (
          <PropertyAddEssentials code={propertyCode} />
        )}
      </div>
      {isAddMode && (
        <div
          className="shadow-sm border max-w-lg w-full rounded-xl absolute 
        left-1/2 transform -translate-x-1/2 top-10 bg-white p-6"
        >
          <form method="POST" onSubmit={addNewLandlord}>
            <h5
              style={{ fontFamily: "Opensans-bold" }}
              className="flex items-center justify-between"
            >
              Add New Landlord
              <FaTimes
                className="text-red-500 text-lg cursor-pointer"
                onClick={() => setIsAddMode(false)}
              />
            </h5>
            <div className="mt-5">
              <div className="form-element">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={landlord?.name}
                  onChange={(e) =>
                    setLandlord((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required={true}
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={landlord?.email}
                  onChange={(e) =>
                    setLandlord((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required={true}
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={landlord?.mobile}
                  onChange={(e) =>
                    setLandlord((prev) => ({ ...prev, mobile: e.target.value }))
                  }
                  required={true}
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={landlord?.password}
                  onChange={(e) =>
                    setLandlord((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  required={true}
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <button
                  className="p-2 rounded-md text-white"
                  style={{ background: "var(--blue)" }}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default AddPropertyUI;
