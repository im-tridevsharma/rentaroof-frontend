import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Card from "../../Card";
import PropertyGrid from "../../PropertyGrid";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";
import {
  getProperties,
  deleteProperty,
} from "../../../../lib/frontend/properties";
import Loader from "../../../loader";
import PostedProperty from "../../PostedProperty";
import {
  deleteUserSavedProperties,
  getUserSavedProperties,
} from "../../../../lib/frontend/auth";
import { __d } from "../../../../server";
import { MdClose } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import {
  createConversation,
  getAgreements,
} from "../../../../lib/frontend/share";
import ReactTooltip from "react-tooltip";
import {
  FiAlertCircle,
  FiDelete,
  FiLoader,
  FiMail,
  FiMessageCircle,
  FiPhoneCall,
} from "react-icons/fi";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  getLandlordMeetings,
  rescheduleMetting,
  updateMeetingStatus,
} from "../../../../lib/frontend/meetings";
import moment from "moment";
import { toast } from "react-toastify";
import AppointmentForm from "../../AppointmentForm";
import { Router, useRouter } from "next/router";

const Button = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      className="p-2 rounded-md text-white"
      style={{ backgroundColor: "var(--blue)" }}
    >
      View Agreement
    </a>
  );
};

function PropertiesUI() {
  const [isNewAdded, setIsNewAdded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardMode, setCardMode] = useState("appointment");
  const [properties, setProperties] = useState([]);
  const [visitedProperties, setVisitedProperties] = useState([]);
  const [agreements, setAgreements] = useState([]);
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [total, setTotal] = useState(0);
  const [propertySkip, setPropertySkip] = useState(0);
  const [hasMoreProperty, setHasMoreProperty] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  const [appointments, setAppointments] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [agreementMode, setAgreementMode] = useState(false);
  const [reload, setReload] = useState(false);

  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("next_ap");
    localStorage.removeItem("recent_ap");
    const isAdded = localStorage.getItem("newadded");
    if (isAdded) {
      setIsNewAdded(true);
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
        const lresponse = await getLandlordMeetings(u.id);
        if (lresponse?.status) {
          setAppointments(lresponse?.data);
        }
        const response = await getUserSavedProperties(u.id);
        if (response?.status) {
          setIsLoading(false);
          const visited = response?.data.filter((p) => p.type === "visited");
          setVisitedProperties(visited);
        } else {
          setIsLoading(false);
          console.error(response?.error || response?.message);
        }
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
  }, [reload]);

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
  }, [filterValue]);

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

  const deleteMe = async (id, type) => {
    setIsLoading(true);
    if (id) {
      const res = await deleteUserSavedProperties(id);
      if (res?.status) {
        setIsLoading(false);
        if (type === "visited") {
          const newvisited = visitedProperties.filter(
            (v) => v.id !== res?.data.id
          );
          setVisitedProperties(newvisited);
        }
      } else {
        setIsLoading(false);
        console.error(res?.error || res?.message);
      }
    } else {
      console.error("Something went wrong!");
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
      } else {
        toast.error("Something went wrong!");
        setIsLoading(true);
      }
    } else {
      setIsLoading(false);
    }
  };
  const openAgreementMode = (appointment) => {
    setAgreementMode(appointment);
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    const id = document.forms.reschedule.id.value;
    const formdata = new FormData(document.forms.reschedule);
    setIsLoading(true);
    const response = await rescheduleMetting(id, formdata);
    if (response?.status) {
      setReload(Date.now());
      setIsLoading(false);
      setReschedule(false);
    } else {
      toast.error(response?.error || response?.data);
      setIsLoading(false);
    }
  };

  const changeStatus = async (status, id) => {
    setIsLoading(true);
    const response = await updateMeetingStatus(id, { status });
    if (response?.status) {
      setReload(Date.now());
      setIsLoading(false);
    } else {
      toast.error(response?.error || response?.data);
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loader />}
      {/**cards */}
      <div className="relative bg-lightBlue-600 pb-8">
        <div className="mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <Card
                label="Appointment History"
                value={appointments?.length}
                color="yellow"
                state="appointment"
                current={cardMode}
                icon={<FaCalendarAlt />}
                onClick={() => setCardMode("appointment")}
              />
              <Card
                label={
                  <span>
                    Applications
                    <br />
                    <br />
                  </span>
                }
                value={agreements?.length}
                color="green"
                icon={
                  <img src="/icons/owner_dashboard/icon2.png" alt="rented" />
                }
                state="rented"
                current={cardMode}
                onClick={() => setCardMode("rented")}
              />
              <Card
                label={
                  <span>
                    Manage properties <br />
                    Edit/Add new property
                  </span>
                }
                value={total}
                color="red"
                icon={
                  <img
                    src="/icons/owner_dashboard/icon1.png"
                    alt="properties"
                  />
                }
                state="posted"
                current={cardMode}
                onClick={() => {
                  setCardMode("posted");
                  setPropertySkip(0);
                }}
                col={4}
              />
            </div>
          </div>
        </div>
      </div>

      {cardMode === "appointment" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Appointment History</span>
          </p>
          <div className="mt-5 p-4">
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
                        <p style={{ fontFamily: "Opensans-bold" }}>
                          {a?.property_data.length > 50
                            ? a?.property_data.substring(0, 50) + "..."
                            : a?.property_data}
                        </p>
                        {a?.vvc && (
                          <b>
                            VVC - {a?.vvc}{" "}
                            {a?.is_landlord_vvc_verified === 1 && (
                              <span className="text-green-500">Verified</span>
                            )}
                          </b>
                        )}
                        <p
                          className="font-semibold text-xs flex items-center"
                          style={{ color: "var(--orange)" }}
                        >
                          By {a?.name} [{a?.created_by_role}]
                          <a
                            href={`tel:${a?.contact}`}
                            style={{ color: "var(--blue)" }}
                          >
                            <FiPhoneCall className="mx-1" />
                          </a>
                          <a
                            href={`mailto:${a?.email}`}
                            style={{ color: "var(--blue)" }}
                          >
                            <FiMail className="mx-1" />
                          </a>
                        </p>
                        <p>
                          <b className="mr-1">Ibo:</b> {a?.ibo || "Pending..."}
                        </p>
                      </td>
                      <td>{moment(a?.start_time).format("DD-MM-YYYY")}</td>
                      <td>{moment(a?.start_time).format("hh:mm A")}</td>
                      <td>
                        <p className=" text-green-600 capitalize">
                          {a?.landlord_status !== "approved"
                            ? "(You) " +
                              (a?.landlord_status === null
                                ? "Pending"
                                : a?.landlord_status)
                            : a?.meeting_status === "cancelled"
                            ? "Pending"
                            : a?.meeting_status}
                        </p>
                      </td>
                      <td>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              setShowDetail(
                                appointments.find((p) => p.id === a.id)
                              )
                            }
                            className="px-2 text-green-500 border-gray-300 border-r-2"
                          >
                            Details
                          </button>
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
                          {a.meeting_status === "closed" && !a?.agreement && (
                            <button
                              className="text-green-600 border-gray-300 border-r-2 px-2 mr-2"
                              onClick={() => openAgreementMode(a)}
                            >
                              Create Agreement
                            </button>
                          )}

                          {(a?.landlord_status === null ||
                            a?.landlord_status === "pending" ||
                            a?.landlord_status === "cancelled") && (
                            <>
                              <button
                                onClick={() => {
                                  changeStatus("approved", a.id);
                                }}
                                className="border-gray-300 border-r-2 px-2 mr-2 text-green-500"
                              >
                                Accept
                              </button>
                              {a?.landlord_status !== "cancelled" && (
                                <button
                                  className="text-red-600 ml-2"
                                  onClick={() => {
                                    changeStatus("cancelled", a.id);
                                  }}
                                >
                                  Cancel
                                </button>
                              )}
                            </>
                          )}
                          {![
                            "visited",
                            "closed",
                            "on the way",
                            "pending",
                          ].includes(a?.meeting_status) && (
                            <>
                              <button
                                onClick={() =>
                                  setReschedule(
                                    appointments.find((p) => p.id === a.id)
                                  )
                                }
                                className=" px-2 text-yellow-500"
                              >
                                Reschedule
                              </button>
                            </>
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

      <div className="flex flex-col px-4">
        {isNewAdded && (
          <div
            className="my-2 p-2 rounded-md bg-white flex items-center justify-between shadow-md"
            style={{
              fontFamily: "Opensans-bold",
            }}
          >
            <p className="text-green-500">
              YOU HAVE ADDED A NEW PROPERTY SUCCESSFULLY.
            </p>
            <FaTimes
              className="cursor-pointer text-red-500"
              onClick={() => setIsNewAdded(false)}
            />
          </div>
        )}
        {updated && (
          <div
            className="my-2 p-2 rounded-md bg-white flex items-center justify-between shadow-md"
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
          <div className="bg-white rounded-md px-4">
            <div className="py-3 rounded-md flex items-center justify-between text-red-500">
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
              className="py-2 text-lg"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <p>
                Posted Properties{" "}
                {filterValue !== "" ? "(" + properties.length + ")" : ""}
              </p>
            </div>
            <InfiniteScroll
              className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              dataLength={properties.length} //This is important field to render the next data
              next={fetchNextData}
              hasMore={hasMoreProperty}
              height={500}
              loader={
                <div className="mt-3 flex items-center justify-center">
                  <FiLoader
                    color="dodgerblue"
                    className="text-xl animate-spin"
                  />
                </div>
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
        )}
        {cardMode === "rented" && (
          <div className="bg-white px-4 rounded-md">
            <div
              className="py-2 text-lg"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <p>Rent Details</p>
            </div>
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
                        className="w-full object-contain h-60"
                      />
                    }
                    title={a?.property_data?.name}
                    price={`Rs. ${a?.property_data?.monthly_rent}/Month`}
                    subtitle={`Renter: ${a?.tenant?.first} ${a?.tenant?.last}`}
                    button={<Button url={a?.agreement_url} />}
                  />
                ))
              ) : (
                <p className="text-red-500 p-3">No renting properties found!</p>
              )}
            </div>
          </div>
        )}
        {cardMode === "visited" && (
          <div className="bg-white px-4 rounded-md">
            <div
              className="py-2 text-lg"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <p>Visited Properties</p>
            </div>
            <div className="flex  flex-col">
              {visitedProperties &&
                visitedProperties.map((p, i) => (
                  <div
                    className="relative border-gray-200 flex items-center justify-between py-2 pl-8 pr-2"
                    key={i}
                    style={{ borderTopWidth: "1px" }}
                  >
                    <span
                      onClick={() => deleteMe(p.id, "visited")}
                      className="p-1 rounded-md bg-gray-400 absolute top-2 left-0 cursor-pointer text-white"
                      data-tip="Remove"
                    >
                      <MdClose />
                      <ReactTooltip />
                    </span>
                    <div className="w-20 h-20 overflow-hidden rounded-md">
                      <Image
                        src={p?.front_image || "/images/website/no_photo.png"}
                        alt="property"
                        layout="responsive"
                        width="80"
                        height="80"
                      />
                    </div>
                    <div
                      className="flex flex-col flex-grow px-5 leading-4"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      <h6
                        className="text-gray-800"
                        style={{ fontFamily: "Opensans-bold" }}
                      >
                        {p?.property_name}
                      </h6>
                      <p className="text-gray-400">
                        {p?.property_short_description}
                      </p>
                      <span
                        className="font-bold"
                        style={{ color: "var(--orange)" }}
                      >
                        By {p?.property_posted_by}
                      </span>
                    </div>
                    <span className="flex items-center text-lg">
                      <span className="m-1" style={{ color: "var(--blue)" }}>
                        {p?.rating}
                      </span>
                      <BsStarFill color="orange" />
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>

      {agreementMode && (
        <AppointmentForm
          appointment={agreementMode}
          setAgreementMode={setAgreementMode}
          setReload={setReload}
          final={agreementMode?.final}
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
          <p className="leading-6 flex items-center">
            <b className="mr-1">Ibo:</b> {showDetail?.ibo || "Pending..."}
            {showDetail?.ibo_id !== 0 && (
              <FiMessageCircle
                style={{ color: "var(--blue)" }}
                className="text-lg cursor-pointer ml-2"
                data-tip="Chat with IBO"
                onClick={() => startConversation(showDetail?.ibo_id)}
              />
            )}
          </p>
          <p className="leading-6">
            <b>Property:</b> {showDetail?.property_data}
          </p>
          <hr className="my-1" />
          <p className="leading-6">
            <b>User:</b> {showDetail?.name}
          </p>
          <hr className="my-1" />
          <p className="leading-6 capitalize">
            <b>Status:</b>{" "}
            {showDetail?.meeting_status === "cancelled"
              ? "Pending"
              : showDetail?.meeting_status}
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
              data-tip="Close"
              onClick={() => setReschedule(false)}
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
    </>
  );
}

export default PropertiesUI;
