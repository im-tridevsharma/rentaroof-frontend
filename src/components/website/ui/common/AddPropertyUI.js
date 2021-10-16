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
import moment from "moment";

function AddPropertyUI() {
  const editorRef = useRef(null);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [balconies, setBalconies] = useState(1);
  const [floors, setFloors] = useState(1);
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [propertyCode, setPropertyCode] = useState("");
  const [nextStep, setNextStep] = useState("");
  const [property, setProperty] = useState({});

  const router = useRouter();

  useEffect(() => {
    if (router.query?.id && router.query?.next) {
      localStorage.setItem("recent_ap", router.query.id);
      localStorage.setItem("next_ap", router.query.next);
    }
    const nextap = localStorage.getItem("next_ap") || router.query.next;
    const pcode = localStorage.getItem("recent_ap") || router.query.id;
    setNextStep(nextap);
    setPropertyCode(pcode);

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
          console.error(response?.error || response?.message);
        }
      })();
    }
  }, [router.query]);

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
          (property?.id && "&mode=update")
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
      setIsLoading(false);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
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
        {!propertyCode ||
          (nextStep === "UPDATE" && (
            <form
              name="add_property"
              style={{ fontFamily: "Opensans-semi-bold" }}
              className="text-gray-600"
              onSubmit={handleSubmitForm}
            >
              <div className="form-element">
                <label className="form-label">Property Title (Name)</label>
                <input
                  type="text"
                  name="name"
                  value={property?.name}
                  onChange={inputHandler}
                  className="form-input border-gray-200 rounded-md"
                />
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
                    <option value="sale">Sale</option>
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
                    <option value="apartment">Apartment</option>
                    <option value="building">Building</option>
                    <option value="home">Home</option>
                    <option value="land & industrial">Land & Industrial</option>
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
                    <option value="ownership">Ownership</option>
                    <option value="sole">Sole</option>
                    <option value="joint">Joint</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
                <div className="form-element">
                  <label className="form-label">Furnished Status</label>
                  <select
                    name="furnished_status"
                    value={property?.furnished_status}
                    onChange={inputHandler}
                    className="form-input border-gray-200 rounded-md"
                  >
                    <option value="furnished">Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                    <option value="semi-furnished">Semi Furnished</option>
                    <option value="ongoing">Ongoing</option>
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
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                    <option value="onetime">Onetime</option>
                    <option value="per-sqft-monthly">Per sqft monthly</option>
                  </select>
                </div>
              </div>
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

              <hr className=" border-gray-400 my-3" />
              <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
                <div className="form-element">
                  <label className="form-label">Bedroom</label>
                  <div className="flex items-center">
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

                <div className="form-element">
                  <label className="form-label">Bathroom</label>
                  <div className="flex items-center">
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
                  <label className="form-label">Balcony</label>
                  <div className="flex items-center">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
                <div className="form-element">
                  <label className="form-label">Floors</label>
                  <div className="flex items-center">
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
                      <option value="cm">CM</option>
                      <option value="m">M</option>
                    </select>
                  </div>
                </div>

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
                      <option value="cm">CM</option>
                      <option value="m">M</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
                <div className="form-element">
                  <label className="form-label">Available From</label>
                  <input
                    type="date"
                    name="available_from"
                    value={
                      property?.available_from
                        ? moment(property?.available_from).format("YYYY-MM-DD")
                        : ""
                    }
                    onChange={inputHandler}
                    className="form-input rounded-md border-gray-200"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Available Immediate?</label>
                  <input
                    type="checkbox"
                    name="available_immediately"
                    checked={
                      property?.available_immediately === 1 ? true : false
                    }
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
                  <label className="form-label">Selling Price</label>
                  <input
                    type="text"
                    name="selling_price"
                    value={property?.selling_price}
                    onChange={inputHandler}
                    className="form-input rounded-md border-gray-200"
                    placeholder="Rs."
                  />
                </div>

                <div className="form-element">
                  <label className="form-label">Offered Price</label>
                  <input
                    type="text"
                    name="offered_price"
                    value={property?.offered_price}
                    onChange={inputHandler}
                    className="form-input rounded-md border-gray-200"
                    placeholder="Rs."
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
              </div>
            </form>
          ))}

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
    </>
  );
}

export default AddPropertyUI;
