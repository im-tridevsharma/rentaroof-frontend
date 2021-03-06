import React, { useEffect, useState } from "react";
import Router from "next/router";
import {
  getMeetings,
  rescheduleMetting,
  updateMeetingStatus,
} from "../../../../lib/frontend/meetings";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import moment from "moment";
import { FaTimes } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import {
  createConversation,
  saveIboRating,
} from "../../../../lib/frontend/share";
import StarRatings from "react-star-ratings";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";

function AppointmentUI() {
  const [appointments, setAppointments] = useState([]);
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [rateAndReview, setRateAndReview] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      const response = await getMeetings();
      if (response?.status) {
        setAppointments(response?.data);
      } else {
        toast.error(response?.error || response?.message);
      }
    };

    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u?.id) {
      setUser(u);
      fetchAppointments();
    }
  }, [reload]);

  const openRateAndReview = (a) => {
    setRateAndReview(a);
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

  const handleRating = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.rating);
    formdata.append("rating", rating);
    const res = await saveIboRating(formdata);
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
          Router.push(`/${user?.role}/chat#${res?.data?.id}`);
        } else {
          setIsLoading(false);
          toast.error(res?.error || res?.message);
        }
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
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
                          {a?.is_tenant_vvc_verified === 1 && (
                            <span className="text-green-500">Verified</span>
                          )}
                        </b>
                      )}
                      {a?.user_id !== 0 && (
                        <p
                          className="font-semibold text-xs flex items-center"
                          style={{ color: "var(--orange)" }}
                        >
                          With {a?.ibo}
                          <FiMessageCircle
                            style={{ color: "var(--blue)" }}
                            className="text-lg cursor-pointer ml-3"
                            data-tip="Chat"
                            onClick={() => startConversation(a?.user_id)}
                          />
                          <ReactTooltip />
                        </p>
                      )}
                    </td>
                    <td>{moment(a?.start_time).format("DD-MM-YYYY")}</td>
                    <td>{moment(a?.start_time).format("hh:mm A")}</td>
                    <td>
                      <p className=" text-green-600 capitalize">
                        {a?.meeting_status !== "pending" &&
                        a?.landlord_status === "approved"
                          ? a?.meeting_status
                          : "Pending"}
                      </p>
                      {a.meeting_status === "visited" && (
                        <button
                          style={{ color: "var(--orange)" }}
                          onClick={() => openRateAndReview(a)}
                        >
                          Review & Rate
                        </button>
                      )}
                    </td>
                    {moment(Date.now()).format("DD-MM-YYYY") ===
                    moment(a.start_time).format("DD-MM-YYYY") ? (
                      <td>
                        <div className="flex">
                          {a?.meeting_status !== "pending" && (
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
                                className="border-gray-300 border-r-2 px-2 mr-2 text-yellow-500"
                              >
                                Reschedule
                              </button>
                            </>
                          )}

                          {a?.meeting_status === "pending" && (
                            <button
                              className="text-red-600 ml-2"
                              onClick={() => changeStatus("cancelled", a.id)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    ) : (
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

                          {!["visited", "closed", "pending"].includes(
                            a?.meeting_status
                          ) && (
                            <>
                              <button
                                onClick={() =>
                                  setReschedule(
                                    appointments.find((p) => p.id === a.id)
                                  )
                                }
                                className="border-gray-300 border-r-2 px-2 mr-2 text-yellow-500"
                              >
                                Reschedule
                              </button>
                            </>
                          )}
                          {a?.meeting_status === "pending" && (
                            <button
                              className="text-red-600 ml-2"
                              onClick={() => changeStatus("cancelled", a.id)}
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    )}
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
            <b>Ibo Assigned:</b> {showDetail?.ibo || "Pending..."}
          </p>
          <p className="leading-6">
            <b>Property:</b> {showDetail?.property_data}
          </p>
          <hr className="my-1" />
          <p className="leading-6 capitalize">
            <b>Status:</b>{" "}
            {showDetail?.meeting_status !== "pending" &&
            showDetail?.landlord_status === "approved"
              ? showDetail?.meeting_status
              : "Pending"}
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
            <input type="hidden" name="ibo_id" value={rateAndReview?.user_id} />
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
    </>
  );
}

export default AppointmentUI;
