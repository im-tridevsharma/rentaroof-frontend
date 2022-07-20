import React, { useEffect, useState } from "react";
import Review from "../../Review";
import { Router, useRouter } from "next/router";
import Loader from "../../../loader";
import { getPropertiesCount } from "../../../../lib/frontend/properties";
import {
  getLandlordMeetings,
  rescheduleMetting,
  updateMeetingStatus,
} from "../../../../lib/frontend/meetings";
import moment from "moment";
import { __d } from "../../../../server";
import {
  createConversation,
  getAgreements,
  getDealOffered,
  getLandlordRating,
} from "../../../../lib/frontend/share";
import {
  FaCalendarAlt,
  FaListAlt,
  FaRegEye,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Card from "../../Card";
import { FiMail, FiMessageCircle, FiPhoneCall } from "react-icons/fi";
import ReactTooltip from "react-tooltip";

function DashboardUI() {
  const [isLoading, setIsLoading] = useState(false);
  const [postedProperties, setPostedProperties] = useState([]);
  const [randomApp, setRandomApp] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [deals, setDeals] = useState([]);
  const [tab, setTab] = useState("upcoming");
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [reschedule, setReschedule] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [reload, setReload] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getPropertiesFun = async () => {
      setIsLoading(true);
      const response = await getPropertiesCount();
      if (response?.status) {
        setIsLoading(false);
        setPostedProperties(response.data);
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
      }
    };

    const getReviews = async () => {
      setIsLoading(true);
      const u = localStorage.getItem("LU")
        ? JSON.parse(__d(localStorage.getItem("LU")))
        : false;
      if (u) {
        setUser(u);
        const response = await getLandlordRating(u?.id);
        if (response?.status) {
          setIsLoading(false);
          setReviews(response?.data);
        } else {
          console.error(response?.error || response?.message);
          setIsLoading(false);
        }

        const ares = await getAgreements();
        if (ares?.status) {
          setAgreements(ares?.data);
        } else {
          console.error(ares?.error || ares?.message);
        }
      }
    };

    const getAppointments = async (id) => {
      setIsLoading(true);
      const response = await getLandlordMeetings(id);
      if (response?.status) {
        setIsLoading(false);
        const p = response?.data.filter(
          (a) =>
            moment(Date.now()).format("DD-MM-YYYY") ===
            moment(a.start_time).format("DD-MM-YYYY")
        );
        p.length > 0
          ? setRandomApp(p[Math.floor(Math.random() * p.length)])
          : setRandomApp(false);
      } else {
        setIsLoading(false);
        console.error(response?.error || response?.message);
      }
    };

    const getDeals = async () => {
      setIsLoading(true);
      const res = await getDealOffered();
      if (res?.status) {
        setDeals(res?.data);
        setIsLoading(false);
      } else {
        toast.error(res?.message || res?.error);
        setIsLoading(false);
      }
    };

    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    (async () => {
      if (u?.id) {
        const lresponse = await getLandlordMeetings(u.id);
        if (lresponse?.status) {
          lresponse?.data?.length > 0
            ? setUpcomingAppointments(
                lresponse?.data.filter((d) => moment() <= moment(d.start_time))
              )
            : setUpcomingAppointments([]);
        }
      }
    })();
    getPropertiesFun();
    getReviews();
    getDeals();
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
      <div className="relative bg-lightBlue-600 pb-8">
        <div className="mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <Card
                color="yellow"
                label="Upcoming Appointments"
                icon={<FaCalendarAlt />}
                onClick={() => setTab("upcoming")}
                current={tab}
                state="upcoming"
              />

              <Card
                color="red"
                label="Manage Profile"
                icon={<FaUser />}
                onClick={() => router.push("profile")}
              />
            </div>
          </div>
        </div>
      </div>

      {tab === "upcoming" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Upcoming Appointments</span>
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
                        <p>
                          <b className="mr-1">Ibo:</b> {a?.ibo || "Pending..."}
                        </p>
                      </td>
                      <td>{moment(a?.start_time).format("DD-MM-YYYY")}</td>
                      <td>{moment(a?.start_time).format("hh:mm A")}</td>
                      <td>
                        <p className=" text-green-600 capitalize">
                          {a?.landlord_status !== "approved"
                            ? "(You) " + a?.landlord_status
                            : a?.meeting_status === "cancelled"
                            ? "Pending"
                            : a?.meeting_status}
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
                        {a?.meeting_status === "pending" &&
                          (a?.landlord_status === "pending" ||
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
                                  upcomingAppointments.find(
                                    (p) => p.id === a.id
                                  )
                                )
                              }
                              className=" px-2 text-yellow-500"
                            >
                              Reschedule
                            </button>
                          </>
                        )}
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
      {tab === "manage-app" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Manage Applications</span>
          </p>
          <div className="mt-5 p-4"></div>
        </div>
      )}
      {tab === "rent" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Upcoming Rent Payments</span>
          </p>
          <div className="mt-5 p-4"></div>
        </div>
      )}

      {viewMore && (
        <div className="fixed max-w-3xl w-full h-screen top-0 left-1/2 transform -translate-x-1/2 py-2 px-5 overflow-y-scroll rounded-md bg-white shadow-sm z-40">
          <h6
            className="text-gray-700 flex items-center justify-between"
            style={{ fontFamily: "Opensans-bold" }}
          >
            All Reviews
            <FaTimes
              className="text-red-500 cursor-pointer"
              onClick={() => setViewMore(false)}
            />
          </h6>
          <div className="mt-3">
            {reviews?.length > 0 &&
              reviews.map((r, i) => <Review full={true} key={i} rating={r} />)}
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

export default DashboardUI;
