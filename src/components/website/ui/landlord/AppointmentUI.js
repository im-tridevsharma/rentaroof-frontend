import React, { useEffect, useState } from "react";
import Card from "../../Card";
import {
  getLandlordMeetings,
  rescheduleMetting,
} from "../../../../lib/frontend/meetings";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import moment from "moment";
import { FaTimes } from "react-icons/fa";
import { FiMail, FiMessageCircle, FiPhoneCall } from "react-icons/fi";
import ReactTooltip from "react-tooltip";
import {
  createConversation,
  saveUserNotication,
} from "../../../../lib/frontend/share";
import { toast } from "react-toastify";
import Router from "next/router";
import AppointmentForm from "../../AppointmentForm";

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
  const [agreementMode, setAgreementMode] = useState(false);
  const [reschedule, setReschedule] = useState(false);

  useEffect(() => {
    const fetchAppointments = async (id) => {
      setIsLoading(true);
      const response = await getLandlordMeetings(id);
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
                (d) => moment(Date.now()).add(1, "day") <= moment(d.start_time)
              )
            )
          : setUpcomingAppointments([]);

        response?.data?.length > 0
          ? setAppointmentHistory(
              response?.data
                .filter((d) => {
                  const history = JSON.parse(d.meeting_history);
                  return history.length > 0;
                })
                .reverse()
            )
          : setAppointmentHistory([]);
        setIsLoading(false);
      } else {
        toast.error(response?.error || response?.message);
        setIsLoading(false);
      }
    };

    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u?.id) {
      setUser(u);
      fetchAppointments(u?.id);
    }
  }, [reload]);

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
      } else {
        toast.error("Something went wrong!");
        setIsLoading(true);
      }
    } else {
      setIsLoading(false);
    }
  };

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

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
          <Card
            label="Today's Appointment"
            count={todayAppointment?.length}
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
                      </td>
                      <td>{moment(a?.start_time).format("DD-MM-YYYY")}</td>
                      <td>{moment(a?.start_time).format("hh:mm A")}</td>
                      <td>
                        <p className=" text-green-600 capitalize">
                          {a?.meeting_status}
                        </p>
                      </td>
                      <td>
                        <div className="flex">
                          <button
                            onClick={() =>
                              setShowDetail(
                                todayAppointment.find((p) => p.id === a.id)
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
                      </td>
                      <td>
                        <div className="flex">
                          <button
                            onClick={() =>
                              setShowDetail(
                                upcomingAppointments.find((p) => p.id === a.id)
                              )
                            }
                            className="px-2 text-green-500"
                          >
                            Details
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
                            {a.meeting_status === "closed" && !a?.agreement && (
                              <button
                                className="text-green-600 px-2 mr-2"
                                onClick={() => openAgreementMode(a)}
                              >
                                Create Agreement
                              </button>
                            )}
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
                      <tr>
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
            final={agreementMode?.final}
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
          <p className="leading-6 flex items-center">
            <b className="mr-1">Ibo:</b> {showDetail?.ibo}
            <FiMessageCircle
              style={{ color: "var(--blue)" }}
              className="text-lg cursor-pointer ml-2"
              data-tip="Chat with IBO"
              onClick={() => startConversation(showDetail?.ibo_id)}
            />
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

export default AppointmentUI;
