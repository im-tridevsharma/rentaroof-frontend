import Router from "next/router";
import React from "react";
import Link from "next/link";
import { FaDirections, FaTimes } from "react-icons/fa";
import {
  FiCheckSquare,
  FiEdit,
  FiInfo,
  FiMail,
  FiMessageSquare,
  FiPhoneOutgoing,
} from "react-icons/fi";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import {
  acceptOrRejectVerification,
  changeVerificationStatus,
  createConversation,
  getPropertiesForVerification,
} from "../../../../lib/frontend/share";
import { __d } from "../../../../server";
import Loader from "../../../loader";

function PropertyVerificationUI() {
  const [properties, setProperties] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [issue, setIssue] = React.useState(false);
  const [status, setStatus] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [inspection, setInspection] = React.useState(false);

  React.useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setUser(u);
    }
    const fetchProperties = async () => {
      setIsLoading(true);
      const res = await getPropertiesForVerification();
      if (res?.status) {
        setProperties(res?.data);
        setIsLoading(false);
      } else {
        toast.error(res?.message || res?.error);
        setIsLoading(false);
      }
    };

    fetchProperties();

    return () => {
      setProperties([]);
    };
  }, [reload]);

  const getDirection = (lat, lng) => {
    if (!lat || !lat) {
      toast.error("Property has not latitude and longitude provided!");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        window
          .open(
            `https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/${lat},${lng}`,
            "_blank"
          )
          .focus();
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleIssue = (e) => {
    e.preventDefault();
    const formdata = new FormData(document.forms.issue);
    const id = document.forms.issue.id.value;

    if (id) {
      changeStatus(id, formdata);
      document.forms.issue.reset();
      setIssue(false);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleRejection = (e) => {
    e.preventDefault();
    const formdata = new FormData(document.forms.reason);
    const id = document.forms.reason.id.value;
    if (id) {
      acceptOrReject(id, formdata);
      document.forms.reason.reset();
      setIssue(false);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const changeStatus = async (id, data) => {
    setIsLoading(true);
    const res = await changeVerificationStatus(id, data);
    if (res?.status) {
      setIsLoading(false);
      setProperties(
        properties.map((p) => {
          return p.id === res?.data?.id ? res?.data : p;
        })
      );
      setInspection(false);
      toast.success("Status changed successfully.");
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  const handleInspection = async (e) => {
    e.preventDefault();
    const data = new FormData(document.forms.inspection_form);
    changeStatus(inspection, data);
  };

  const startConversation = async (receiver) => {
    setIsLoading(true);
    if (receiver) {
      const formdata = {
        sender_id: user?.id,
        receiver_id: receiver,
      };
      if (formdata) {
        const res = await createConversation(formdata);
        if (res?.status) {
          setIsLoading(false);
          toast.success("Redirecting to chat.");
          Router.push(`/${user?.role}/chat#${res?.data?.id}`);
        } else {
          setIsLoading(false);
          toast.error(res?.error || res?.message);
        }
      }
    }
  };

  const acceptOrReject = async (id, data) => {
    setIsLoading(true);
    const res = await acceptOrRejectVerification(id, data);
    if (res?.status) {
      setIsLoading(false);
      if (res?.data.status === "rejected") {
        setProperties(
          properties.filter((p) => {
            return p.id !== res?.data?.id;
          })
        );
        toast.success("Rejected successfully.");
      } else {
        setProperties(
          properties.map((p) => {
            return p.id === res?.data?.id ? res?.data : p;
          })
        );
        toast.success("Status changed successfully.");
      }
      setStatus(false);
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative p-5 shadow-sm mx-4 bg-white rounded-md">
        {properties?.length > 0 ? (
          properties.map((p, i) => (
            <div
              className="flex items-center border rounded-md bg-white mb-3"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <img
                src={p?.property?.front_image || "/images/website/no_photo.png"}
                alt={p?.property?.name}
                className="h-40 w-52 object-cover mr-3"
              />
              <div className="flex flex-col">
                <h5 style={{ fontFamily: "Opensans-bold" }}>
                  <b>Name</b> - {p?.property?.name} (
                  {p?.property?.property_code})
                </h5>
                <p>
                  <b>Address</b> -{p?.address?.full_address}
                </p>
                <p
                  className="flex items-center shadow-sm bg-white"
                  style={{ color: "var(--blue)" }}
                >
                  <b>Landlord</b> - {p?.landlord?.first} {p?.landlord?.last}
                  <a
                    href={`tel:${p?.landlord?.mobile}`}
                    className="ml-2 flex items-center"
                  >
                    <FiPhoneOutgoing className="mr-1" /> {p?.landlord.mobile}
                  </a>
                  <a
                    href={`mailto:${p?.landlord?.email}`}
                    className="ml-2 flex items-center"
                  >
                    <FiMail className="mr-1" /> {p?.landlord.email}
                  </a>
                </p>
                <p className="my-1" style={{ color: "var(--blue)" }}>
                  <b>Admin Message</b> - {p?.message}
                </p>
                <div className="flex items-center mt-2">
                  <div data-tip="Get Direction">
                    <ReactTooltip />
                    <FaDirections
                      className="mr-4 text-lg cursor-pointer"
                      onClick={() =>
                        getDirection(p?.address?.lat, p?.address?.long)
                      }
                    />
                  </div>
                  {p?.status === "accepted" &&
                    p?.is_verifiable !== 1 &&
                    p?.issues_in_verification === "" && (
                      <>
                        <FiMessageSquare
                          className="text-xl mr-5 cursor-pointer"
                          onClick={() => startConversation(p?.landlord?.id)}
                          data-tip="Chat with Landlord"
                        />
                        <ReactTooltip />
                        <button
                          className="px-2 text-white rounded-md inline-block text-sm mr-2"
                          style={{ backgroundColor: "var(--blue)" }}
                          onClick={() => setInspection(p?.id)}
                        >
                          Mark Verified
                        </button>
                        <button
                          onClick={() => setIssue(p?.id)}
                          className="px-2 text-white rounded-md inline-block bg-red-500 text-sm"
                        >
                          Mark Not Verified
                        </button>
                        {!p?.property?.is_approved && (
                          <Link
                            href={`update-property?step=next&next=UPDATE&id=${p?.property?.property_code}-${p?.property?.id}&skip=false&mode=update`}
                          >
                            <a className="ml-3">
                              <FiEdit
                                className="text-xl mr-5 cursor-pointer"
                                data-tip="Update Property Details"
                              />
                              <ReactTooltip />
                            </a>
                          </Link>
                        )}
                      </>
                    )}

                  {p?.status === "pending" && (
                    <>
                      <button
                        className="px-2 text-white rounded-md inline-block text-sm mr-2"
                        style={{ backgroundColor: "var(--blue)" }}
                        onClick={() =>
                          acceptOrReject(p?.id, {
                            status: "accepted",
                            reason: "",
                          })
                        }
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => setStatus(p?.id)}
                        className="px-2 text-white rounded-md inline-block bg-red-500 text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {p?.is_verifiable === 1 && (
                    <button className="px-2 text-white rounded-md flex items-center bg-green-500 text-sm ml-5">
                      Verified <FiCheckSquare className="ml-3" />
                    </button>
                  )}

                  {p?.is_verifiable === 0 && p?.issues_in_verification !== "" && (
                    <button className="px-2 flex items-center text-white rounded-md bg-red-500 text-sm ml-5">
                      Not Verified{" "}
                      <FiInfo
                        data-tip={p?.issues_in_verification}
                        className="ml-3"
                      />
                      <ReactTooltip />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500">Properties not found for verification!</p>
        )}
      </div>

      {issue && (
        <div
          style={{ fontFamily: "Opensans-regular" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-md z-40 max-w-lg w-full"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            Issue in Verification
            <FaTimes
              onClick={() => setIssue(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
            <ReactTooltip />
          </h5>
          <hr className="my-1" />
          <form name="issue" onSubmit={handleIssue} className="mt-2">
            <input type="hidden" name="status" value={0} />
            <input type="hidden" name="id" value={issue} />
            <div className="form-element">
              <label className="form-label">Write Issue</label>
              <textarea
                name="issue"
                required
                className="form-input border-gray-200 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="px-2 py-1 text-white rounded-md right"
                style={{ backgroundColor: "var(--blue)" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}

      {inspection && (
        <div
          style={{ fontFamily: "Opensans-regular" }}
          className="p-5 bg-white shadow-md rounded-md z-40 w-full absolute left-0 top-0"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            Inspection Report
            <FaTimes
              onClick={() => setInspection(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
            <ReactTooltip />
          </h5>

          <form
            className="mt-3"
            name="inspection_form"
            onSubmit={handleInspection}
          >
            <input type="hidden" name="status" value="1" />
            <input type="hidden" name="inspection" value="yes" />
            <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-10">
              <div className="form-element p-5 bg-gray-50 rounded-md">
                <label className="font-bold form-label">Property Address</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="av">
                    <input
                      type="radio"
                      id="av"
                      name="address"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="anv">
                    <input
                      type="radio"
                      id="anv"
                      name="address"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">Super Area</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="superav">
                    <input
                      type="radio"
                      id="superav"
                      name="super_area"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="superanv">
                    <input
                      type="radio"
                      id="superanv"
                      name="super_area"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">Carpet Area</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="carpetav">
                    <input
                      type="radio"
                      id="carpetav"
                      name="carpet_area"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="carpetanv">
                    <input
                      type="radio"
                      id="carpetanv"
                      name="carpet_area"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">Bedrooms</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="bedroomsv">
                    <input
                      type="radio"
                      id="bedroomsv"
                      name="bedrooms"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="bedroomsnv">
                    <input
                      type="radio"
                      id="bedroomsnv"
                      name="bedrooms"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-10 mt-5">
              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="font-bold form-label">Bathrooms</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="bathroomsv">
                    <input
                      type="radio"
                      id="bathroomsv"
                      name="bathrooms"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="bathroomsnv">
                    <input
                      type="radio"
                      id="bathroomsnv"
                      name="bathrooms"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">Balconies</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="balconiesv">
                    <input
                      type="radio"
                      id="balconiesv"
                      name="balconies"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="balconiesnv">
                    <input
                      type="radio"
                      id="balconiesnv"
                      name="balconies"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">Floors</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="floorsv">
                    <input
                      type="radio"
                      id="floorsv"
                      name="floors"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="floorsnv">
                    <input
                      type="radio"
                      id="floorsnv"
                      name="floors"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">Renting Amount</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="rav">
                    <input
                      type="radio"
                      id="rav"
                      name="renting_amount"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="ranv">
                    <input
                      type="radio"
                      id="ranv"
                      name="renting_amount"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-10 mt-5">
              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="font-bold form-label">Images/Gallery</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="imgv">
                    <input
                      type="radio"
                      id="imgv"
                      name="images"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="imgnv">
                    <input
                      type="radio"
                      id="imgnv"
                      name="images"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">Amenities</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="amv">
                    <input
                      type="radio"
                      id="amv"
                      name="amenities"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="amnv">
                    <input
                      type="radio"
                      id="amnv"
                      name="amenities"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">Preferences</label>
                <div className="flex items-center justify-between">
                  <label htmlFor="prefv">
                    <input
                      type="radio"
                      id="prefv"
                      name="preferences"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="prefnv">
                    <input
                      type="radio"
                      id="prefnv"
                      name="preferences"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>

              <div className="form-element  p-5 bg-gray-50 rounded-md">
                <label className="form-label font-bold">
                  Essentials/Nearby Places
                </label>
                <div className="flex items-center justify-between">
                  <label htmlFor="ev">
                    <input
                      type="radio"
                      id="ev"
                      name="essentials"
                      value="verified"
                    />{" "}
                    Verified
                  </label>
                  <label htmlFor="env">
                    <input
                      type="radio"
                      id="env"
                      name="essentials"
                      value="not-verified"
                      checked
                    />{" "}
                    Not Verified
                  </label>
                </div>
              </div>
            </div>

            <div className="form-element">
              <label className="form-label">Inspection Note</label>
              <textarea
                className="form-input"
                name="inspection_note"
              ></textarea>
            </div>
            <button
              className="px-4 py-3 rounded-md text-white float-right"
              style={{ background: "var(--blue)" }}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {status && (
        <div
          style={{ fontFamily: "Opensans-regular" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-md z-40 max-w-lg w-full"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            Reason for Rejection
            <FaTimes
              onClick={() => setStatus(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
            <ReactTooltip />
          </h5>
          <hr className="my-1" />
          <form name="reason" onSubmit={handleRejection} className="mt-2">
            <input type="hidden" name="status" value="rejected" />
            <input type="hidden" name="id" value={status} />
            <div className="form-element">
              <label className="form-label">Write Reason</label>
              <textarea
                name="reason"
                required
                className="form-input border-gray-200 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="px-2 py-1 text-white rounded-md right"
                style={{ backgroundColor: "var(--blue)" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default PropertyVerificationUI;
