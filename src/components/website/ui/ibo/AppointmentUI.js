import React, { useEffect, useState } from "react";
import Card from "../../Card";
import {
  getMeetings,
  rescheduleMetting,
  updateMeetingStatus,
} from "../../../../lib/frontend/meetings";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import moment from "moment";
import { FaTimes } from "react-icons/fa";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import {
  saveUserNotication,
  saveUserRating,
} from "../../../../lib/frontend/share";
import AppointmentForm from "../../AppointmentForm";
import StarRatings from "react-star-ratings";
import ReactTooltip from "react-tooltip";

function AppointmentUI() {
  const [appointments, setAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [user, setUser] = useState(false);
  const [todayAppointment, setTodayAppointment] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cardMode, setCardMode] = useState("today");
  const [reload, setReload] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [agreementMode, setAgreementMode] = useState(false);
  const [rateAndReview, setRateAndReview] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      const response = await getMeetings();
      if (response?.status) {
        setAppointments(response?.data);
        response?.data?.length > 0
          ? setTodayAppointment(
              response?.data.filter(
                (d) =>
                  moment(Date.now()).format("DD-MM-YYYY") ===
                  moment(d.start_time).format("DD-MM-YYYY")
              )
            )
          : setTodayAppointment([]);

        response?.data?.length > 0
          ? setUpcomingAppointments(
              response?.data.filter(
                (d) => moment(Date.now()) < moment(d.start_time)
              )
            )
          : setUpcomingAppointments([]);

        response?.data?.length > 0
          ? setAppointmentHistory(
              response?.data.filter((d) => {
                const history = JSON.parse(d.meeting_history);
                return history.length > 0;
              })
            )
          : setAppointmentHistory([]);
        setIsLoading(false);
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
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

  const handleUserNotification = async (
    user_id,
    property,
    status,
    time = null,
    href = null
  ) => {
    setIsLoading(true);
    const message = {
      approved: `${user?.fullname} has accepted your appointment for property - ${property}`,
      visited: `${user?.fullname} has visited property - ${property} with you.`,
      closed: `${user?.fullname} has closed appointment for property - ${property}.`,
      agreement: `${user?.fullname} has created an agreement for property - ${property}.`,
      rescheduled: `${
        user?.fullname
      } has rescheduled appointment for property - ${property}. Date - ${
        time?.date && time.date
      }, Time: ${time?.time && time.time}`,
    };
    const formdata = new FormData();
    formdata.append(
      "title",
      status === "agreement"
        ? `Agreement Created Successfully🎉`
        : `Appointment Notification🔔`
    );
    formdata.append("type", "Normal");
    formdata.append("tenant_id", user_id);
    formdata.append("user_id", user?.id);
    formdata.append("name", user?.fullname);
    formdata.append("email", user?.email);
    formdata.append("mobile", user?.mobile);
    formdata.append("content", message[status]);
    if (href) {
      formdata.append("redirect", href);
    }

    const res = await saveUserNotication(formdata);
    if (res?.status) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.error(res?.error || res?.message);
    }
  };

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
      console.error(response?.error || response?.data);
      setIsLoading(false);
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
      alert("Review saved successfully.");
      setRateAndReview(false);
    } else {
      console.error(res?.error || res?.message);
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
        handleUserNotification(
          a?.created_by_id,
          a?.property_data,
          "rescheduled",
          {
            date: document.forms.reschedule?.date?.value,
            time: document.forms.reschedule?.time?.value,
          }
        );
        setReload(Date.now());
        setIsLoading(false);
        setReschedule(false);
      }
    } else {
      console.error(response?.error || response?.data);
      setIsLoading(false);
    }
  };

  const openAgreementMode = (appointment) => {
    setAgreementMode(appointment);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col relative">
        {/**cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
          <Card
            label="Total Appointment"
            count={appointments?.length}
            color="var(--orange)"
            textcolor="white"
            icon={<img src="/icons/ibo_icons/icon20.png" alt="appointment" />}
            onClick={() => setCardMode("today")}
          />
          <Card
            label="Upcoming Appointment"
            count={upcomingAppointments?.length}
            color="white"
            textcolor="gray"
            icon={<img src="/icons/ibo_icons/icon21.png" alt="appointment" />}
            onClick={() => setCardMode("upcoming")}
          />
          <Card
            label="Appointment History"
            count={appointmentHistory?.length}
            color="white"
            textcolor="gray"
            icon={<img src="/icons/ibo_icons/icon22.png" alt="appointment" />}
            onClick={() => setCardMode("history")}
          />
        </div>
        {/*appointment */}
        {cardMode === "today" && (
          <div className="flex flex-col mt-5 bg-white border-gray-200 border-2 rounded">
            <h5
              className="uppercase px-3 py-2"
              style={{ fontFamily: "Opensans-bold", fontSize: ".9rem" }}
            >
              Today's Appointments
            </h5>
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
                {todayAppointment?.length > 0 ? (
                  todayAppointment.map((a, i) => (
                    <tr key={i}>
                      <td>
                        <p style={{ fontFamily: "Opensans-bold" }}>
                          {a?.property_data.length > 50
                            ? a?.property_data.substring(0, 50) + "..."
                            : a?.property_data}
                        </p>
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
                      </td>
                      <td>
                        <div className="flex">
                          <button
                            onClick={() =>
                              setShowDetail(
                                todayAppointment.find((p) => p.id === a.id)
                              )
                            }
                            className="border-gray-300 border-r-2 px-2 text-green-500"
                          >
                            Details
                          </button>
                          {a.meeting_status === "pending" ? (
                            <button
                              onClick={() => {
                                changeStatus("approved", a.id);
                                handleUserNotification(
                                  a?.created_by_id,
                                  a?.property_data,
                                  "approved"
                                );
                              }}
                              className="border-gray-300 border-r-2 px-2 mr-2 text-green-500"
                            >
                              Accept
                            </button>
                          ) : (
                            <>
                              {!["visited", "closed"].includes(
                                a?.meeting_status
                              ) && (
                                <>
                                  <button
                                    onClick={() =>
                                      setReschedule(
                                        todayAppointment.find(
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
                                </>
                              )}

                              {a.meeting_status === "visited" && !a?.agreement && (
                                <button
                                  className="text-green-600 border-gray-300 border-r-2 px-2 mr-2"
                                  onClick={() => openAgreementMode(a)}
                                >
                                  Create Agreement
                                </button>
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

                              {a.meeting_status !== "closed" && (
                                <>
                                  <button
                                    className="text-red-600 border-gray-300 border-r-2 px-2 mr-2"
                                    onClick={() => {
                                      changeStatus("closed", a.id);
                                      handleUserNotification(
                                        a?.created_by_id,
                                        a?.property_data,
                                        "closed"
                                      );
                                    }}
                                  >
                                    Closed
                                  </button>
                                  <button
                                    className="text-red-600 ml-2"
                                    onClick={() =>
                                      changeStatus("cancelled", a.id)
                                    }
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
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
        )}
        {cardMode === "upcoming" && (
          <div className="flex flex-col mt-5 bg-white border-gray-200 border-2 rounded">
            <h5
              className="uppercase px-3 py-2"
              style={{ fontFamily: "Opensans-bold", fontSize: ".9rem" }}
            >
              Upcoming Appointments
            </h5>
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
                {upcomingAppointments?.length > 0 ? (
                  upcomingAppointments.map((a, i) => (
                    <tr key={i}>
                      <td>
                        <p style={{ fontFamily: "Opensans-bold" }}>
                          {a?.property_data.length > 50
                            ? a?.property_data.substring(0, 50) + "..."
                            : a?.property_data}
                        </p>
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
                      </td>
                      <td>{moment(a?.start_time).format("DD-MM-YYYY")}</td>
                      <td>{moment(a?.start_time).format("hh:mm A")}</td>
                      <td>
                        <p className=" text-green-600 capitalize">
                          {a?.meeting_status}
                        </p>
                        {a.meeting_status === "visited" && (
                          <button style={{ color: "var(--orange)" }}>
                            Review & Rate
                          </button>
                        )}
                      </td>
                      <td>
                        <div className="flex">
                          <button
                            onClick={() =>
                              setShowDetail(
                                upcomingAppointments.find((p) => p.id === a.id)
                              )
                            }
                            className="border-gray-300 border-r-2 px-2 text-green-500"
                          >
                            Details
                          </button>
                          {a.meeting_status === "pending" ? (
                            <button
                              onClick={() => changeStatus("approved", a.id)}
                              className="border-gray-300 border-r-2 px-2 mr-2 text-green-500"
                            >
                              Accept
                            </button>
                          ) : (
                            <>
                              {!["visited", "closed"].includes(
                                a?.meeting_status
                              ) && (
                                <>
                                  <button
                                    onClick={() =>
                                      setReschedule(
                                        upcomingAppointments.find(
                                          (p) => p.id === a.id
                                        )
                                      )
                                    }
                                    className="border-gray-300 border-r-2 px-2 mr-2 text-yellow-500"
                                  >
                                    Reschedule
                                  </button>
                                </>
                              )}
                            </>
                          )}
                          <button
                            className="text-red-600 ml-2"
                            onClick={() => changeStatus("cancelled", a.id)}
                          >
                            Cancel
                          </button>
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
        )}

        {cardMode === "history" && (
          <div className="flex flex-col mt-5 bg-white border-gray-200 border-2 rounded">
            <h5
              className="uppercase px-3 py-2"
              style={{ fontFamily: "Opensans-bold", fontSize: ".9rem" }}
            >
              Appointments History
            </h5>
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
                </tr>
              </thead>
              <tbody style={{ fontFamily: "Opensans-semi-bold" }}>
                {appointmentHistory?.length > 0 ? (
                  appointmentHistory.map((a, i) => (
                    <>
                      <tr key={i}>
                        <td>
                          <p style={{ fontFamily: "Opensans-bold" }}>
                            {a?.property_data.length > 50
                              ? a?.property_data.substring(0, 50) + "..."
                              : a?.property_data}
                          </p>
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
                        </td>
                        <td>{moment(a?.start_time).format("DD-MM-YYYY")}</td>
                        <td>{moment(a?.start_time).format("hh:mm A")}</td>
                        <td>
                          <p className=" text-green-600 capitalize">
                            {a?.meeting_status}
                          </p>
                        </td>
                      </tr>
                      <tr key={`id-${i}`}>
                        <td colSpan="6">
                          {a?.meeting_history &&
                            JSON.parse(a?.meeting_history).map((h, j) => (
                              <div
                                key={j}
                                className="flex items-center border-b-2 border-dashed"
                              >
                                <p>
                                  <b
                                    className="italic mr-1"
                                    style={{ color: "var(--blue)" }}
                                  >
                                    Date Time:{" "}
                                  </b>{" "}
                                  {h?.time}
                                </p>
                                <p className="ml-2">
                                  <b
                                    className="italic mr-1"
                                    style={{ color: "var(--blue)" }}
                                  >
                                    Message:{" "}
                                  </b>{" "}
                                  {h?.message}
                                </p>
                              </div>
                            ))}
                        </td>
                      </tr>
                    </>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-red-500">
                      No history found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {agreementMode && (
          <AppointmentForm
            appointment={agreementMode}
            setAgreementMode={setAgreementMode}
            setReload={setReload}
            handleUserNotification={handleUserNotification}
          />
        )}
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
            <b>Title:</b> {showDetail?.title}
          </p>
          <p className="leading-6">
            <b>Description:</b> {showDetail?.description}
          </p>
          <p className="leading-6">
            <b>Ibo/Executive:</b> {showDetail?.ibo}
          </p>
          <p className="leading-6">
            <b>Property:</b> {showDetail?.property_data}
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
    </>
  );
}

export default AppointmentUI;
