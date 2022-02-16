import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import Loader from "../loader";
import {
  assignPropertyVerification,
  deleteProperty,
  rejectPropertyDeleteReqeust,
  verifyProperty,
} from "../../lib/properties";
import {
  saveIboNotication,
  saveLandlordNotication,
} from "../../lib/frontend/share";
import getIbos from "../../lib/ibos";
import { FaTimes } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import Router from "next/router";
import { toast } from "react-toastify";
import { useSelector, shallowEqual } from "react-redux";
import router from "next/router";
import { FiInfo } from "react-icons/fi";

function ViewProperties({ property }) {
  const [gallery, setGallery] = useState(null);
  const [galleryContent, setGalleryContent] = useState({});
  const [activeGallery, setActiveGallery] = useState("exterior_view");
  const [essential, setEssential] = useState(null);
  const [address, setAddress] = useState(null);
  const [amenities, setAmenities] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [ibos, setIbos] = useState([]);

  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  const { user } = { ...config };

  useEffect(() => {
    if (property?.gallery) {
      setGallery(property.gallery);
      property.gallery &&
        Object.keys(property.gallery).forEach((key) => {
          !["id", "property_id", "created_at", "updated_at", "others"].includes(
            key
          ) &&
            setGalleryContent((prev) => ({
              ...prev,
              [key]: JSON.parse(property.gallery[key]),
            }));
        });
    }
    setIsVerified(property?.is_approved);
    if (property?.essential) {
      setEssential(property.essential);
    }
    if (property?.amenities_data) {
      setAmenities(property.amenities_data);
    }
    if (property?.preferences_data) {
      setPreferences(property.preferences_data);
    }
    if (property?.address) {
      setAddress(property.address);
    }
  }, [property]);

  useEffect(() => {
    const fetchIbos = async () => {
      setIsLoading(true);
      const response = await getIbos();
      if (response?.status) {
        setIbos(response?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error(response?.message || response?.error);
      }
    };

    fetchIbos();
  }, []);

  const setFrontViewImage = (img) => {
    document.querySelector("#front-img").src = img;
  };

  const delProperty = async (property) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && property) {
      setIsLoading(true);
      const response = await deleteProperty(property?.id);
      if (response?.status) {
        setIsLoading(false);
        sendPropertyVNotification(
          property?.posted_by,
          property?.owner_data?.role,
          "deleted"
        );
        router.push("/admin/properties");
      }
    }
  };

  const rejectPropertyDelete = async (property) => {
    if (property) {
      setIsLoading(true);
      const response = await rejectPropertyDeleteReqeust(property?.id);
      if (response?.status) {
        setIsLoading(false);
        sendPropertyVNotification(
          property?.posted_by,
          property?.owner_data?.role,
          "delete-rejected"
        );
        router.push("/admin/properties");
      }
    }
  };

  const propertyVerification = (option) => {
    if (option) {
      setIsLoading(true);
      (async () => {
        const response = await verifyProperty(property?.id, { status: option });
        if (response?.status) {
          setIsLoading(false);
          setIsVerified(option === "verify" ? true : false);
          sendPropertyVNotification(
            property?.posted_by,
            property?.owner_data?.role,
            option
          );
        } else {
          setIsLoading(false);
          console.error(response?.message || response?.error);
        }
      })();
    }
  };

  const handlePvForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.property_verification);
    const res = await assignPropertyVerification(formdata);
    if (res?.status) {
      setIsLoading(false);
      document.forms.property_verification.reset();
      toast.success("Property verification task assigned successfully.");
      setViewModal(false);
      sendNotification(res?.data?.ibo_id);
    } else {
      setIsLoading(false);
      toast.error(res?.error || res?.message);
    }
  };

  const sendNotification = async (ibo) => {
    const formdata = new FormData();
    formdata.append("title", "Property Verification Task🚶‍♂️");
    formdata.append("type", "Urgent");
    formdata.append("ibo_id", ibo);
    formdata.append("user_id", user?.user_id);
    formdata.append("redirect", "/ibo/property-verification");
    formdata.append(
      "content",
      `You are assigned property verification task to verify property "${property?.name}".`
    );

    const res = await saveIboNotication(formdata);
    if (res?.status) {
      toast.success("Notification sent to IBO.");
    } else {
      toast.error(res?.error || res?.message);
    }
  };

  const sendPropertyVNotification = async (id, type, option) => {
    if (id && type) {
      const formdata = new FormData();
      if (option === "verify") {
        formdata.append("title", "Property Verified💹");
        formdata.append(
          "content",
          `Your property ${property?.name || ""} has been verified by admin!`
        );
        formdata.append("type", "Urgent");
      } else if (option === "deleted") {
        formdata.append("title", "Property Deleted🟢");
        formdata.append(
          "content",
          `Your property ${property?.name || ""} has been deleted by admin!`
        );
        formdata.append("type", "Notification");
      } else if (option === "delete-rejected") {
        formdata.append("title", "Property Deleted Request Rejected🔴");
        formdata.append(
          "content",
          `Your property ${
            property?.name || ""
          } deleted request has been rejected by admin!`
        );
        formdata.append(
          "redirect",
          `${process.env.BASE_URL}/${type}/properties`
        );
        formdata.append("type", "Urgent");
      } else {
        formdata.append("title", "Property Rejected❌");
        formdata.append(
          "content",
          `Your property ${property?.name || ""} has been rejected by admin!`
        );
        formdata.append("type", "Notification");
      }
      if (type === "ibo") {
        formdata.append("ibo_id", id);
      } else {
        formdata.append("landlord_id", id);
      }
      formdata.append("user_id", user?.user_id);

      const res =
        type === "ibo"
          ? await saveIboNotication(formdata)
          : await saveLandlordNotication(formdata);
      if (res?.status) {
        toast.success(`Notification sent to ${type.toUpperCase()}`);
      } else {
        toast.error(res?.error || res?.message);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**front images */}
        <div className="flex justify-between md:flex-row flex-col">
          <div className="flex-grow h-96">
            <img
              src={property?.front_image || "/images/website/no_photo.png"}
              alt="front-image"
              className="w-full h-full object-cover"
              id="front-img"
            />
          </div>
          <div className="flex items-center md:w-96 w-full flex-col md:mt-0 mt-3">
            <div className="flex items-center w-full overflow-x-auto px-2 md:ml-3">
              {gallery &&
                typeof gallery === "object" &&
                Object.keys(gallery).map((key, i) => {
                  return (
                    ![
                      "id",
                      "property_id",
                      "created_at",
                      "updated_at",
                      "others",
                    ].includes(key) && (
                      <div
                        onClick={() => setActiveGallery(key)}
                        className={`px-2 cursor-pointer py-1 rounded-md mx-1 font-bold text-xs text-white ${
                          activeGallery === key ? "bg-green-500" : "bg-blue-500"
                        }`}
                        key={i}
                      >
                        <p className="min-w-max">
                          {key.toUpperCase()?.replace("_", " ")}
                        </p>
                      </div>
                    )
                  );
                })}
            </div>
            <div className="overflow-y-auto" style={{ height: "360px" }}>
              {activeGallery && galleryContent[activeGallery]?.length > 0 ? (
                <div className="grid grid-cols-2 px-1 mt-3">
                  {galleryContent[activeGallery].map((img, k) => (
                    <div key={k} className="m-1 overflow-hidden">
                      <img
                        src={img}
                        alt={k}
                        className="w-full h-full object-cover"
                        onClick={() => setFrontViewImage(img)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-500 mt-3">No images found!</p>
              )}
            </div>
          </div>
        </div>
        <hr />
        {/**information */}
        <h6 className="mb-3 mt-5 px-2">Action</h6>
        <div className="flex items-center mb-5 px-2">
          <button
            className="px-2 py-1 rounded-md text-white bg-green-400"
            onClick={() => propertyVerification("verify")}
          >
            Verify
          </button>
          <button
            className="px-2 py-1 rounded-md text-white bg-red-400 mx-3"
            onClick={() => propertyVerification("reject")}
          >
            Reject
          </button>

          <p className="inline ml-3">
            <b>Verified:</b> {isVerified ? "Yes" : "No"}
          </p>

          {property?.verification && (
            <div className="flex items-center ml-10">
              <p>
                Assigned IBO - {property?.verification?.ibo?.first}{" "}
                {property?.verification?.ibo?.last}
              </p>
              {property?.verification?.status === "accepted" && (
                <p className="ml-5">
                  {property?.verification?.is_verifiable ? (
                    <span className="p-2 bg-green-500 rounded-full">
                      Verified💹
                    </span>
                  ) : !property?.verification?.issues_in_verification ? (
                    <span className="p-2 bg-yellow-500 rounded-full">
                      Pending
                    </span>
                  ) : (
                    <span
                      className="p-2 bg-red-500 rounded-full"
                      data-tip={property?.verification?.issues_in_verification}
                    >
                      Not Verified
                      <ReactTooltip />
                    </span>
                  )}
                </p>
              )}

              <p
                className={`px-3 ml-5 py-2 rounded-md capitalize ${
                  property?.verification?.status === "pending"
                    ? "bg-yellow-500"
                    : property?.verification?.status === "accepted"
                    ? "bg-green-600"
                    : "bg-red-500"
                }`}
                data-tip={property?.verification?.reason_for_rejection}
              >
                {property?.verification?.status}
                <ReactTooltip />
              </p>
            </div>
          )}
          <p>
            {(!property?.verification ||
              property?.verification?.is_verifiable === 0) && (
              <button
                type="button"
                onClick={() => setViewModal(true)}
                className="px-2 py-3 bg-green-400 rounded-md font-semibold ml-5 hover:bg-green-500"
              >
                Assign Property Verification
              </button>
            )}
          </p>
        </div>
        {property?.is_deleted === 1 && (
          <div className="flex items-center mb-5 px-2">
            <b>Property Delete Request : </b>
            <p className="mx-3">
              <b>Reason - </b>
              {property?.delete_reason}
            </p>
            <button
              className="px-2 py-1 rounded-md text-white bg-red-400 mx-3"
              onClick={() => delProperty(property)}
            >
              Delete
            </button>
            <button
              className="px-2 py-1 rounded-md text-white bg-green-400"
              onClick={() => rejectPropertyDelete(property)}
            >
              Reject
            </button>
          </div>
        )}
        <hr className="mb-2" />
        <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-3">
          <div className="px-5">
            <h5>Owner Details</h5>
            <p className="mt-2">
              {property?.owner_data?.first} {property?.owner_data?.last}
            </p>
            <p className="my-5">
              <Link href={`/admin/landlords/${property?.owner_data?.id}`}>
                <a className="p-2 rounded-md bg-blue-500 text-white">View</a>
              </Link>
            </p>
          </div>
          {property?.ibo && (
            <div className="px-5">
              <h5>IBO Details</h5>
              <p className="mt-2">
                {property?.ibo_data?.first} {property?.ibo_data?.last}
              </p>
              <p className="my-5">
                <Link href={`/admin/ibos/${property?.ibo_data?.id}`}>
                  <a className="p-2 rounded-md bg-blue-500 text-white">View</a>
                </Link>
              </p>
            </div>
          )}
        </div>
        {property?.ibo && (
          <p className="m-2 font-bold">
            Property is posted by {property?.ibo_data?.first}
          </p>
        )}
        {!property?.ibo && (
          <p className="m-2 font-bold">
            Property is posted by {property?.owner_data?.first}
          </p>
        )}
        <hr className="mb-2" />
        <div className="flex flex-col mt-5 px-2">
          <div className="form-element">
            <label className="text-blue-600">Property Name</label>
            <p className="pl-2">{property?.name}</p>
          </div>
          <div className="form-element">
            <label className="text-blue-600">Short Description</label>
            <p className="pl-2">{property?.short_description}</p>
          </div>
          <div className="form-element">
            <label className="text-blue-600">Description</label>
            {property?.description && (
              <div
                className="pl-2"
                dangerouslySetInnerHTML={{ __html: property?.description }}
              ></div>
            )}
          </div>
          <hr className="mb-3" />
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="form-element">
              <label className="text-blue-600">Property For</label>
              <p className="pl-2 capitalize">{property?.for}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Property Type</label>
              <p className="pl-2 capitalize">{property?.type}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Posting As</label>
              <p className="pl-2 capitalize">
                {property?.posting_as?.replace("_", " ")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="form-element">
              <label className="text-blue-600">Furnished Status</label>
              <p className="pl-2 capitalize">{property?.furnished_status}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Ownership Type</label>
              <p className="pl-2 capitalize">{property?.ownership_type}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Maintenence Duration</label>
              <p className="pl-2 capitalize">
                {property?.maintenence_duration}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Bedrooms</label>
              <p className="pl-2 capitalize">{property?.bedrooms}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Bathrooms</label>
              <p className="pl-2 capitalize">{property?.bathrooms}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Balconies</label>
              <p className="pl-2 capitalize">{property?.balconies}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Floors</label>
              <p className="pl-2 capitalize">{property?.floors}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Carpet Area</label>
              <p className="pl-2 capitalize">
                {property?.carpet_area + " " + property?.carpet_area_unit}
              </p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Super Area</label>
              <p className="pl-2 capitalize">
                {property?.super_area + " " + property?.super_area_unit}
              </p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Available From</label>
              <p className="pl-2 capitalize">
                {moment(property?.available_from).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Available Immediate</label>
              <p className="pl-2 capitalize">
                {property?.available_immediatly == 1 ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Age of construction</label>
              <p className="pl-2 capitalize">{property?.age_of_construction}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Monthly Rent</label>
              <p className="pl-2 capitalize">Rs. {property?.monthly_rent}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Security Deposit</label>
              <p className="pl-2 capitalize">
                Rs. {property?.security_deposit || 0}
              </p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Maintenence Charge</label>
              <p className="pl-2 capitalize">
                Rs. {property?.maintenence_charge}
              </p>
            </div>
          </div>
          <div className="form-element">
            <label className="text-blue-600">Asking Price</label>
            <p className="pl-2 capitalize">Rs. {property?.offered_price}</p>
          </div>

          <hr className="mb-2" />
          {/**essentials */}
          <h6 className="mb-3">Property Essentials</h6>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">School</label>
              <p className="pl-2 capitalize">{essential?.school || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Hospital</label>
              <p className="pl-2 capitalize">{essential?.hospital || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Bus stop</label>
              <p className="pl-2 capitalize">{essential?.bus_stop || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Airport</label>
              <p className="pl-2 capitalize">{essential?.airport || "-"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Train</label>
              <p className="pl-2 capitalize">{essential?.train || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Market</label>
              <p className="pl-2 capitalize">{essential?.market || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Restaurent</label>
              <p className="pl-2 capitalize">{essential?.restaurent || "-"}</p>
            </div>
          </div>
          <hr className="mb-2" />
          <h6 className="mb-3">Property Amenities</h6>
          <div className="grid grid-cols-2 md:grid-cols-4 mb-2">
            {amenities &&
              amenities.map((a, i) => (
                <div className="flex items-center" key={i}>
                  <img
                    src={a?.icon}
                    alt={i}
                    className="w-12 h-12 object-contain mr-3"
                  />
                  <p>{a.title}</p>
                </div>
              ))}
          </div>
          <h6 className="mb-3">Property Prefrences</h6>
          <div className="grid grid-cols-2 md:grid-cols-4 mb-2">
            {preferences &&
              preferences.map((a, i) => (
                <div className="flex items-center" key={i}>
                  <FiInfo className="mr-2" />
                  <p>{a.title}</p>
                </div>
              ))}
          </div>

          <hr className="mb-2" />
          <h6 className="mb-3">Address</h6>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Landmark</label>
              <p className="pl-2 capitalize">{address?.landmark || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">House Number</label>
              <p className="pl-2 capitalize">{address?.house_number || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Full Address</label>
              <p className="pl-2 capitalize">{address?.full_address || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Lattitude and Longitude</label>
              <p className="pl-2 capitalize">
                {address ? address?.lat + "-" + address?.long : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {viewModal && (
        <div className="fixed top-32 left-1/2 transform shadow-lg -translate-x-1/2 border max-w-xl w-full rounded-md bg-white p-4">
          <h5>
            Property Verification -
            <FaTimes
              className="float-right text-red-400 hover:text-red-500 cursor-pointer"
              onClick={() => setViewModal(false)}
              data-tip="Close"
            />
            <ReactTooltip />
          </h5>
          <hr className="my-2" />
          <form
            name="property_verification"
            onSubmit={handlePvForm}
            method="POST"
            className="mt-8"
          >
            <input type="hidden" name="property_id" value={Router?.query?.id} />
            <div className="form-element">
              <label className="form-label">Select IBO</label>
              <select className="form-select" name="ibo_id" required={true}>
                <option value="">Select</option>
                {ibos.map((ibo, i) => {
                  if (ibo.account_status === "activated") {
                    return (
                      <option
                        key={i}
                        value={ibo.id}
                      >{`${ibo.first} ${ibo.last}`}</option>
                    );
                  }
                })}
              </select>
            </div>
            <div className="form-element">
              <label className="form-label">Message for IBO</label>
              <textarea
                className="form-textarea"
                name="message"
                required={true}
              ></textarea>
            </div>
            <div className="text-right">
              <button className="p-2 rounded-md bg-blue-400 hover:bg-blue-500 font-medium text-white">
                Assign
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ViewProperties;
