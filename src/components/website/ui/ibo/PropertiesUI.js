import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../../Card";
import { useRouter } from "next/router";
import PropertyGrid from "../../PropertyGrid";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamation,
  FaEye,
  FaFileDownload,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import {
  getProperties,
  deleteProperty,
} from "../../../../lib/frontend/properties";
import Loader from "../../../loader";
import PostedProperty from "../../PostedProperty";
import { __d } from "../../../../server";
import { BsStarFill } from "react-icons/bs";
import {
  createConversation,
  getAgreements,
  getPoliceVerification,
  getVisitedProperties,
  saveUserRating,
  vvcStatus,
} from "../../../../lib/frontend/share";
import {
  FiAlertCircle,
  FiDelete,
  FiLoader,
  FiMail,
  FiMessageCircle,
  FiPhoneCall,
} from "react-icons/fi";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import ReactTooltip from "react-tooltip";
import {
  getMeetings,
  rescheduleMetting,
  updateMeetingStatus,
} from "../../../../lib/frontend/meetings";
import moment from "moment";
import AppointmentForm from "../../AppointmentForm";

const Button = ({ url }) => {
  return (
    <div className="border-t">
      <p>Agreement</p>

      <div className="text-white flex items-center justify-center mt-3">
        <a href={url} className="p-3 rounded-md bg-blue-500" target="_blank">
          <FaEye />
        </a>
        <a
          href={url}
          className="p-3 ml-3 rounded-md bg-blue-500"
          download
          target="_blank"
        >
          <FaFileDownload />
        </a>
      </div>
    </div>
  );
};

function PropertiesUI() {
  const [user, setUser] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardMode, setCardMode] = useState("posted");
  const [properties, setProperties] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [purl, setPurl] = React.useState("");
  const [total, setTotal] = useState(0);
  const [propertySkip, setPropertySkip] = useState(0);
  const [hasMoreProperty, setHasMoreProperty] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [reload, setReload] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [agreementMode, setAgreementMode] = useState(false);
  const [rateAndReview, setRateAndReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [vvcModal, setVvcModal] = useState(false);
  const [vvcData, setVvcData] = useState({ vvc: "", user: "" });

  const router = useRouter();

  useEffect(() => {
    setCardMode(router?.query?.t);

    localStorage.removeItem("next_ap");
    localStorage.removeItem("recent_ap");
    const isAdded = localStorage.getItem("newadded");
    if (isAdded) {
      toast.success("New property has been added successfully.");
      localStorage.removeItem("newadded");
    }
    const isUpdated = localStorage.getItem("updated");
    if (isUpdated) {
      setUpdated(isUpdated);
      localStorage.removeItem("updated");
    }
    (async () => {
      const u = localStorage.getItem("LU")
        ? JSON.parse(__d(localStorage.getItem("LU")))
        : false;
      if (u) {
        setUser(u);
        setIsLoading(true);
        const ares = await getAgreements();
        if (ares?.status) {
          setAgreements(ares?.data);
          setIsLoading(false);
        } else {
          console.error(ares?.error || ares?.message);
          setIsLoading(false);
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const res = await getProperties(propertySkip, filterValue);
      if (res?.status) {
        setProperties(res.data);
        setIsLoading(false);
        setTotal(res?.total);
        if (res?.data?.length > 0) {
          setHasMoreProperty(true);
        } else {
          setHasMoreProperty(false);
        }
      } else {
        console.error(res?.error || res?.message);
        setIsLoading(false);
      }
    })();

    (async () => {
      const response = await getMeetings();
      if (response?.status) {
        setAppointments(response?.data);
      }
    })();
  }, [reload, filterValue]);

  const openRateAndReview = (a) => {
    setRateAndReview(a);
  };

  const changeStatus = async (status, id) => {
    setIsLoading(true);
    const response = await updateMeetingStatus(id, { status });
    if (response?.status) {
      toast.success("Status Changed Successfully.");
      setReload(Date.now());
      setIsLoading(false);
    } else {
      toast.error(response?.error || response?.data);
      setIsLoading(false);
    }
  };

  const handleVvc = async (id, vvc, type) => {
    if (vvc && type) {
      setIsLoading(true);
      const res = await vvcStatus({ id, vvc, type });
      if (res?.status) {
        setIsLoading(false);
        setReload(Date.now());
        setVvcData({ vvc: "", user: "" });
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };

  const handleRating = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.rating);
    formdata.append("rating", rating);
    const res = await saveUserRating(formdata);
    if (res?.status) {
      setIsLoading(false);
      document.forms.rating.reset();
      setRating(0);
      toast.success("Review saved successfully.");
      setRateAndReview(false);
    } else {
      toast.error(res?.error || res?.message);
      setIsLoading(false);
    }
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    const id = document.forms.reschedule.id.value;
    const formdata = new FormData(document.forms.reschedule);
    setIsLoading(true);
    const response = await rescheduleMetting(id, formdata);
    if (response?.status) {
      const a = appointments.find((ap) => ap.id == id);
      if (a) {
        toast.success("Rescheduled Successfully.");
        setReload(Date.now());
        setIsLoading(false);
        setReschedule(false);
      }
    } else {
      toast.error(response?.error || response?.data);
      setIsLoading(false);
    }
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
          router.push(`/${user?.role}/chat#${res?.data?.id}`);
        } else {
          setIsLoading(false);
          toast.error(res?.error || res?.message);
        }
      }
    }
  };

  const openAgreementMode = (appointment) => {
    setAgreementMode(appointment);
  };

  const fetchNextData = async () => {
    if (!fetching) {
      setFetching(true);
      const res = await getProperties(propertySkip + 9, filterValue);
      if (res?.status) {
        setProperties((prev) => [...prev, ...res?.data]);
        setPropertySkip(propertySkip + 9);
        if (properties.length === total) {
          setHasMoreProperty(false);
        }
        setFetching(false);
      }
    }
  };

  const policeVerification = async (a) => {
    setIsLoading(true);
    const res = await getPoliceVerification(a?.id);
    if (res) {
      setPurl(res);
      setIsLoading(false);
      toast.success("Police Verification document generated successfully.");
      const ares = await getAgreements();
      if (ares?.status) {
        setAgreements(ares?.data);
        setIsLoading(false);
      } else {
        console.error(ares?.error || ares?.message);
        setIsLoading(false);
      }
    } else {
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  const deleteProperties = (id) => {
    const go = confirm("It will delete it permanantly!");
    if (go) {
      setDeleteMode(id);
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await deleteProperty(deleteReason, deleteMode);
    if (response?.status) {
      setIsLoading(false);
      const newProperties = properties.map((item) =>
        item.id === response.data.id ? response.data : item
      );
      setProperties(newProperties);
      setDeleteReason("");
      setDeleteMode(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {/**cards */}
        {isLoading && <Loader />}
        <div className="relative bg-lightBlue-600 pb-8">
          <div className="mx-auto w-full">
            <div>
              <div className="flex flex-wrap">
                <Card
                  label={
                    <span>
                      Posted <br />
                      Properties
                    </span>
                  }
                  value={total}
                  color="green"
                  state="posted"
                  current={cardMode}
                  icon={
                    <img
                      src="/icons/owner_dashboard/icon1.png"
                      alt="properties"
                    />
                  }
                  onClick={() => {
                    setCardMode("posted");
                    setPropertySkip(0);
                  }}
                />
                <Card
                  label="Manage Applications"
                  value={agreements?.length}
                  color="white"
                  icon={
                    <img src="/icons/owner_dashboard/icon2.png" alt="rented" />
                  }
                  state="rented"
                  current={cardMode}
                  onClick={() => setCardMode("rented")}
                />
                <Card
                  label="Appointment History"
                  value={appointments?.length}
                  color="red"
                  icon={<FaCalendarAlt />}
                  state="meetings"
                  current={cardMode}
                  onClick={() => setCardMode("meetings")}
                />
                <Card
                  label="Property Verification"
                  value={0}
                  color="green"
                  icon={<FaCheckCircle />}
                  state="verification"
                  current={cardMode}
                  onClick={() => router.push("/ibo/property-verification")}
                />
              </div>
            </div>
          </div>
        </div>

        {updated && (
          <div
            className="my-2 p-4 mx-4 rounded-md bg-white flex items-center justify-between shadow-md"
            style={{
              fontFamily: "Opensans-bold",
            }}
          >
            <p className="text-green-500"> {updated}</p>
            <FaTimes
              className="cursor-pointer text-red-500"
              onClick={() => setUpdated(false)}
            />
          </div>
        )}

        {/**properties */}
        {cardMode === "posted" && (
          <div className="bg-white rounded-md mx-4">
            <div className="py-3 px-4 rounded-md flex items-center justify-between text-red-500">
              <p className="flex items-center">
                <FiAlertCircle className="mr-3" size={28} /> Without
                verification of your property customer cannot view in website.
              </p>
              <div className="form-group">
                <select
                  className="form-input"
                  value={filterValue}
                  onChange={(e) => {
                    setFilterValue(e.target.value);
                    setPropertySkip(0);
                  }}
                >
                  <option value="">Filter Options</option>
                  <option value="verified">Verified</option>
                  <option value="not-verified">Not Verified</option>
                  <option value="featured">Featured</option>
                </select>
              </div>
            </div>
            <div
              className="text-lg px-4"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <p>
                Total Posted Properties{" "}
                {filterValue !== "" ? "(" + properties.length + ")" : ""}
              </p>
            </div>
            <div className="px-4 mt-2">
              <InfiniteScroll
                className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                dataLength={properties.length} //This is important field to render the next data
                next={fetchNextData}
                hasMore={hasMoreProperty}
                height={500}
                loader={
                  hasMoreProperty ? (
                    <div className="mt-3 flex items-center justify-center">
                      <FiLoader
                        color="dodgerblue"
                        className="text-xl animate-spin"
                      />
                    </div>
                  ) : null
                }
              >
                {properties &&
                  properties.map((p, i) => (
                    <PostedProperty
                      key={i}
                      property={p}
                      deleteProperties={deleteProperties}
                    />
                  ))}
              </InfiniteScroll>
            </div>
          </div>
        )}
        {cardMode === "rented" && (
          <div className="bg-white rounded-md overflow-hidden mx-4">
            <div
              className="flex items-center justify-between bg-gray-50 p-4"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              Manage Applications
            </div>
            <div className="px-4">
              <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {agreements?.length > 0 ? (
                  agreements?.map((a, i) => (
                    <PropertyGrid
                      key={i}
                      image={
                        <img
                          src={
                            a?.property_data?.front_image ||
                            "/images/website/no_photo.png"
                          }
                          alt="property"
                          className="w-full object-cover"
                        />
                      }
                      title={a?.property_data?.name.substring(0, 35)}
                      price={`Rs. ${a?.property_data?.monthly_rent}/Month`}
                      subtitle={`Renter: ${a?.tenant?.first} ${a?.tenant?.last}`}
                      button={
                        <>
                          <Button url={a?.agreement_url} />
                          {purl || a?.police_verification ? (
                            <div className="border-t">
                              <p>Police Verification</p>

                              <div className="text-white flex items-center justify-center mt-3">
                                <a
                                  href={a?.police_verification || purl}
                                  className="p-3 rounded-md bg-red-500"
                                  target="_blank"
                                >
                                  <FaEye />
                                </a>
                                <a
                                  href={a?.police_verification || purl}
                                  className="p-3 ml-3 rounded-md bg-red-500"
                                  download
                                  target="_blank"
                                >
                                  <FaFileDownload />
                                </a>
                              </div>
                            </div>
                          ) : (
                            <div className="border-t mt-3">
                              <p>Police Verification</p>
                              <button
                                onClick={() => policeVerification(a)}
                                className="p-2 ml-2 mt-2 rounded-md text-white bg-red-500"
                              >
                                Generate
                              </button>
                            </div>
                          )}
                        </>
                      }
                    />
                  ))
                ) : (
                  <p className="text-red-500 p-3">
                    No renting properties found!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {cardMode === "meetings" && (
          <div className="bg-white rounded-md overflow-hidden mx-4">
            <div
              className="flex items-center justify-between bg-gray-50 p-4"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              Appointment History/Upcoming
            </div>
            <div className="px-4">
              <table className="table">
                <thead
                  style={{
                    backgroundColor: "var(--blue)",
                    fontFamily: "Opensans-semi-bold",
                  }}
                  className="text-white"
                >
                  <tr>
                    <th>Property</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody style={{ fontFamily: "Opensans-semi-bold" }}>
                  {appointments?.length > 0 ? (
                    appointments.map((a, i) => (
                      <tr key={i}>
                        <td>
                          <i>
                            {a?.property_added_by == user?.id && (
                              <i>Property added by you</i>
                            )}
                          </i>
                          <p style={{ fontFamily: "Opensans-bold" }}>
                            {a?.property_data.length > 50
                              ? a?.property_data.substring(0, 50) + "..."
                              : a?.property_data}
                          </p>
                          <p
                            className="font-semibold text-xs flex items-center"
                            style={{ color: "var(--orange)" }}
                          >
                            Scheduled by- {a?.name}
                            <a
                              href={`tel:${a?.contact}`}
                              style={{ color: "var(--blue)" }}
                              data-tip="Call"
                            >
                              <FiPhoneCall className="mx-1" />
                              <ReactTooltip />
                            </a>
                            <a
                              href={`mailto:${a?.email}`}
                              style={{ color: "var(--blue)" }}
                              data-tip="Mail"
                            >
                              <FiMail className="mx-1" />
                              <ReactTooltip />
                            </a>
                            <FiMessageCircle
                              style={{ color: "var(--blue)" }}
                              className="text-lg cursor-pointer"
                              data-tip="Chat"
                              onClick={() =>
                                startConversation(a?.created_by_id)
                              }
                            />
                          </p>
                          <p className="leading-6 flex items-center">
                            <b className="mr-1">Landlord:</b>{" "}
                            {a?.landlord?.first} {a?.landlord?.last}
                            {a?.landlord?.id !== user?.id ? (
                              <>
                                <FiMessageCircle
                                  style={{ color: "var(--blue)" }}
                                  className="text-lg cursor-pointer ml-2"
                                  data-tip="Chat with Landlord"
                                  onClick={() =>
                                    startConversation(a?.landlord?.id)
                                  }
                                />
                                {a?.property_added_by == user?.id && (
                                  <i className="ml-3">Added by you</i>
                                )}
                              </>
                            ) : (
                              <span>(You)</span>
                            )}
                            <b className="ml-2">Status: {a?.landlord_status}</b>
                          </p>
                        </td>
                        <td>{moment(a?.start_time).format("DD-MM-YYYY")}</td>
                        <td>{moment(a?.start_time).format("hh:mm A")}</td>
                        <td>
                          <p className=" text-green-600 capitalize">
                            {a?.meeting_status}
                          </p>
                          {a.meeting_status === "visited" && (
                            <button
                              style={{ color: "var(--orange)" }}
                              onClick={() => openRateAndReview(a)}
                            >
                              Review & Rate
                            </button>
                          )}
                          {a?.is_landlord_vvc_verified === 1 &&
                            a?.is_tenant_vvc_verified === 1 && (
                              <p className="text-green-500">VVC Verified</p>
                            )}
                        </td>
                        <td>
                          <div className="flex">
                            <button
                              onClick={() =>
                                setShowDetail(
                                  appointments.find((p) => p.id === a.id)
                                )
                              }
                              className="border-gray-300 border-r-2 px-2 text-green-500"
                            >
                              Details
                            </button>
                            {a.meeting_status === "pending" ? (
                              <>
                                <button
                                  onClick={() => {
                                    changeStatus("approved", a.id);
                                  }}
                                  className="border-gray-300 border-r-2 px-2 mr-2 text-green-500"
                                >
                                  Accept
                                </button>
                                <button
                                  className="text-red-600 ml-2"
                                  onClick={() => {
                                    if (a?.property_added_by == user?.id) {
                                      const res = confirm(
                                        "If you cancel this appointment, it will be assigned to other nearby agents and will give you some share!"
                                      );
                                      if (res) {
                                        changeStatus("cancelled", a.id);
                                      }
                                    } else {
                                      changeStatus("cancelled", a.id);
                                    }
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                {!["visited", "closed", "on the way"].includes(
                                  a?.meeting_status
                                ) && (
                                  <>
                                    <button
                                      onClick={() =>
                                        setReschedule(
                                          appointments.find(
                                            (p) => p.id === a.id
                                          )
                                        )
                                      }
                                      className="border-gray-300 border-r-2 px-2 mr-2 text-yellow-500"
                                    >
                                      Reschedule
                                    </button>

                                    <button
                                      className="text-green-600 border-gray-300 border-r-2 px-2 mr-2"
                                      onClick={() => {
                                        changeStatus("on the way", a.id);
                                      }}
                                    >
                                      On the Way
                                    </button>
                                  </>
                                )}

                                {a.agreement && (
                                  <a
                                    href={a.agreement?.agreement_url}
                                    target="_blank"
                                    className="border-gray-300 border-r-2 px-2 mr-2"
                                    style={{ color: "var(--blue)" }}
                                  >
                                    View Agreement
                                  </a>
                                )}
                                {a?.meeting_status !== "visited" &&
                                  a?.meeting_status !== "closed" &&
                                  a?.is_tenant_vvc_verified === 1 &&
                                  a?.is_landlord_vvc_verified === 1 && (
                                    <button
                                      className="text-green-600 border-gray-300 border-r-2 px-2 mr-2"
                                      onClick={() => {
                                        changeStatus("visited", a.id);
                                        handleUserNotification(
                                          a?.created_by_id,
                                          a?.property_data,
                                          "visited"
                                        );
                                      }}
                                    >
                                      Visited
                                    </button>
                                  )}
                                {a.meeting_status !== "closed" &&
                                  a?.is_tenant_vvc_verified === 1 &&
                                  a?.is_landlord_vvc_verified === 1 && (
                                    <>
                                      <button
                                        className="text-red-600 border-gray-300 border-r-2 px-2 mr-2 flex items-center"
                                        onClick={() => {
                                          changeStatus("closed", a.id);
                                          handleUserNotification(
                                            a?.created_by_id,
                                            a?.property_data,
                                            "closed"
                                          );
                                        }}
                                      >
                                        Closed{" "}
                                        <FaExclamation data-tip="Close it when tenant is interested in this property." />
                                      </button>
                                    </>
                                  )}
                              </>
                            )}

                            {a.meeting_status === "closed" && !a?.agreement && (
                              <button
                                className="text-green-600 border-gray-300 border-r-2 px-2 mr-2"
                                onClick={() => openAgreementMode(a)}
                              >
                                Create Agreement
                              </button>
                            )}
                            {a?.vvc &&
                              (!a?.is_landlord_vvc_verified ||
                                !a?.is_tenant_vvc_verified) && (
                                <button
                                  onClick={() => setVvcModal(a?.vvc)}
                                  className="bg-green-600  p-2 ml-2 rounded-md text-white"
                                >
                                  Verify VVC
                                </button>
                              )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-red-500">
                        No appointments found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {cardMode === "verification" && (
          <div className="bg-white rounded-md overflow-hidden mx-4">
            <div
              className="flex items-center justify-between bg-gray-50 p-4"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              Property Verification
            </div>
            <div className="px-4"></div>
          </div>
        )}
      </div>

      {agreementMode && (
        <AppointmentForm
          appointment={agreementMode}
          setAgreementMode={setAgreementMode}
          setReload={setReload}
        />
      )}

      {deleteMode && (
        <div
          className="fixed w-full h-screen top-0 left-0"
          style={{ background: "rgba(0,0,0,.3)" }}
        >
          <div className="absolute p-3 rounded-md bg-white max-w-md w-full left-1/2 transform -translate-x-1/2 top-1/4">
            <h5 style={{ fontFamily: "Opensans-bold" }}>Delete Request</h5>
            <span
              onClick={() => setDeleteMode(false)}
              className="absolute right-5 top-5 cursor-pointer text-xl text-red-500 hover:text-red-400"
            >
              <FiDelete />
            </span>
            <form name="deleteform" className="mt-5" onSubmit={deleteHandler}>
              <div className="form-element">
                <label
                  className="form-label"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  Reason to delete
                </label>
                <textarea
                  className="form-textarea rounded-sm border-gray-400"
                  name="delete_reason"
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                ></textarea>
              </div>
              <div className="text-right">
                <button className="p-2 rounded-md bg-red-500">
                  Request Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDetail && (
        <div
          style={{ fontFamily: "Opensans-regular" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-md z-40 max-w-lg w-full"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            Appointment Details
            <FaTimes
              onClick={() => setShowDetail(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
            <ReactTooltip />
          </h5>
          <hr className="my-1" />
          <p className="leading-6">
            <b>Property:</b> {showDetail?.property_data}
          </p>
          <p className="leading-6">
            <b>Monthly Rent:</b> Rs.{showDetail?.property_monthly_rent}
          </p>
          <p className="leading-6">
            <b>Security Deposite:</b> Rs.{showDetail?.property_security_amount}
          </p>
          <p className="leading-6">
            <b>Asking Price:</b> Rs.{showDetail?.property_asking_price}
          </p>
          <hr className="my-1" />
          <p className="leading-6">
            <b>User:</b> {showDetail?.name}
          </p>
          <p className="leading-6">
            <b>Email:</b> {showDetail?.email}
          </p>
          <p className="leading-6">
            <b>Contact:</b> {showDetail?.contact}
          </p>
          <hr className="my-1" />
          <p className="leading-6 flex items-center">
            <b className="mr-1">Landlord:</b> {showDetail?.landlord?.first}{" "}
            {showDetail?.landlord?.last}
            {showDetail?.landlord?.id !== user?.id ? (
              <>
                <FiMessageCircle
                  style={{ color: "var(--blue)" }}
                  className="text-lg cursor-pointer ml-2"
                  data-tip="Chat with Landlord"
                  onClick={() => startConversation(showDetail?.landlord?.id)}
                />
                <ReactTooltip />
                {showDetail?.property_added_by == user?.id && (
                  <i className="ml-3">Added by you</i>
                )}
              </>
            ) : (
              <span>(You)</span>
            )}
          </p>
          <p className="leading-6">
            <b>Email:</b> {showDetail?.landlord?.email}
          </p>
          <p className="leading-6">
            <b>Contact:</b> {showDetail?.landlord?.mobile}
          </p>
          <hr className="my-1" />
          <p className="leading-6 capitalize">
            <b>Status:</b> {showDetail?.meeting_status}
          </p>
          <p className="leading-6">
            <b>Date:</b> {moment(showDetail?.start_time).format("DD-MM-YYYY")}
          </p>
          <p className="leading-6">
            <b>Time:</b> {moment(showDetail?.start_time).format("hh:mm A")}
          </p>
        </div>
      )}
      {reschedule && (
        <div
          style={{ fontFamily: "Opensans-regular" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-md z-40 max-w-lg w-full"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            Reschedule Details
            <FaTimes
              onClick={() => setReschedule(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
            <ReactTooltip />
          </h5>
          <hr className="my-1" />
          <form name="reschedule" onSubmit={handleReschedule}>
            <input type="hidden" name="id" value={reschedule?.id} />
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
              <div className="form-element">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  name="time"
                  required
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
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

      {rateAndReview && (
        <div
          style={{ fontFamily: "Opensans-regular" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-md z-40 max-w-lg w-full"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            Rating and Review
            <FaTimes
              onClick={() => setRateAndReview(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
            <ReactTooltip />
          </h5>
          <hr className="my-1" />
          <form name="rating" onSubmit={handleRating} className="mt-2">
            <input
              type="hidden"
              name="tenant_id"
              value={rateAndReview?.created_by_id}
            />
            <div className="form-element">
              <label className="form-label">Rating</label>
              <StarRatings
                changeRating={(newRating) => setRating(newRating)}
                numberOfStars={5}
                rating={rating}
                starRatedColor="var(--orange)"
                starDimension="20px"
                starSpacing="3px"
                starHoverColor="var(--orange)"
              />
            </div>
            <div className="form-element">
              <label className="form-label">Review</label>
              <textarea
                name="review"
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

      {vvcModal && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleVvc(vvcModal, vvcData?.vvc, vvcData?.user);
          }}
          style={{ fontFamily: "Opensans-regular" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-md z-40 max-w-lg w-full"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            VVC Verification
            <FaTimes
              onClick={() => setVvcModal(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
            <ReactTooltip />
          </h5>
          <hr className="my-1" />
          <div className="mt- grid grid-cols-1 md:grid-cols-2 md:space-x-5 md:space-y-0 space-y-5">
            <div className="form-element">
              <label className="form-label">VVC Code</label>
              <input
                required={true}
                type="text"
                maxLength={6}
                minLength={6}
                value={vvcData.vvc}
                onChange={(e) =>
                  setVvcData((prev) => ({ ...prev, vvc: e.target.value }))
                }
                className="form-input border-gray-300 h-10 rounded-md"
              />
            </div>
            <div className="form-element">
              <label className="form-label">Select User</label>
              <select
                required={true}
                className="form-select border-gray-300 rounded-md"
                value={vvcData.user}
                onChange={(e) =>
                  setVvcData((prev) => ({ ...prev, user: e.target.value }))
                }
              >
                <option value="">Select</option>
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
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

export default PropertiesUI;
