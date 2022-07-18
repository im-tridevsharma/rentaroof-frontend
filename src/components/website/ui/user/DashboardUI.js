import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUserSavedProperties } from "../../../../lib/frontend/auth";
import Review from "../../Review";
import Loader from "../../../loader";
import { __d } from "../../../../server";
import { useRouter } from "next/router";
import {
  getAgreements,
  getRecentTransactions,
  getUserRating,
} from "../../../../lib/frontend/share";

import {
  FaCalendarAlt,
  FaHeart,
  FaListAlt,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import Card from "../../Card";
import { toast } from "react-toastify";
import { getMeetings } from "../../../../lib/frontend/meetings";
import { FiMessageCircle } from "react-icons/fi";

function DashboardUI() {
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentTransaction, setRecentTransaction] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [tab, setTab] = useState("saved");
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      (async () => {
        const res = await getMeetings();
        if (res?.status) {
          res?.data?.length > 0
            ? setUpcomingAppointments(
                res?.data.filter((d) => moment() <= moment(d.start_time))
              )
            : setUpcomingAppointments([]);
        } else {
          toast.error(response?.error || response?.message);
        }

        const response = await getUserSavedProperties(u.id);
        if (response?.status) {
          const favorite = response?.data.filter((p) => p.type === "favorite");
          setFavoriteProperties(favorite);
        } else {
          console.error(response?.error || response?.message);
        }
      })();

      setIsLoading(true);
    }

    const recentTxn = async () => {
      setIsLoading(true);
      const res = await getRecentTransactions();
      if (res?.status) {
        setIsLoading(false);
        setRecentTransaction(res?.data);
      } else {
        setIsLoading(false);
        console.log(res?.error || res?.message);
      }
    };
    recentTxn();
    setIsLoading(false);
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative bg-lightBlue-600 pb-8">
        <div className="mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <Card
                color="yellow"
                label="Saved Properties"
                value={favoriteProperties?.length}
                icon={<FaHeart />}
                onClick={() => setTab("saved")}
                current={tab}
                state="saved"
              />
              <Card
                color="red"
                label="Upcoming Appointments"
                icon={<FaCalendarAlt />}
                onClick={() => setTab("manage-app")}
                current={tab}
                state="manage-app"
              />
              <Card
                color="green"
                label="Account Statement"
                icon={<FaListAlt />}
                onClick={() => setTab("account")}
                current={tab}
                state="account"
              />

              <Card
                color="red"
                label="Manage Profile"
                icon={<FaUser />}
                onClick={() => router.push("/tenant/profile")}
              />
            </div>
          </div>
        </div>
      </div>

      {tab === "saved" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Saved Searches</span>
          </p>
          <div className="mt-5 p-4">
            {favoriteProperties?.length > 0 ? (
              favoriteProperties.map((p, i) => (
                <div
                  className="relative border-gray-200 flex items-center justify-between py-2 pl-8 pr-2"
                  key={i}
                  style={{ borderTopWidth: "1px" }}
                >
                  <span
                    onClick={() => deleteMe(p.id, "saved")}
                    className="p-1 rounded-md bg-gray-400 absolute top-2 left-0 cursor-pointer text-white"
                    data-tip="Remove"
                  >
                    <MdClose />
                  </span>
                  <div className="w-20 h-20 overflow-hidden rounded-md">
                    <Link href={`/details/properties/${p?.property_code}`}>
                      <a>
                        <img
                          src={p?.front_image || "/images/website/no_photo.png"}
                          alt="property"
                          layout="responsive"
                          width="80"
                          height="80"
                        />
                      </a>
                    </Link>
                  </div>
                  <div
                    className="flex flex-col flex-grow px-5 leading-4"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    <Link href={`/details/properties/${p?.property_code}`}>
                      <a>
                        <h6
                          className="text-gray-800"
                          style={{ fontFamily: "Opensans-bold" }}
                        >
                          {p?.property_name}
                        </h6>
                      </a>
                    </Link>
                    <p className="text-gray-400">
                      {p?.property_short_description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-red-500">No properties found!</p>
            )}
          </div>
        </div>
      )}
      {tab === "manage-app" && (
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

                          {!["visited", "closed", "pending"].includes(
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
      {tab === "account" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Account Statement</span>
          </p>
          <div className="mt-5 p-4">
            {recentTransaction?.length > 0 &&
              recentTransaction.map((txn, i) => (
                <div
                  className="flex items-center justify-between py-2 px-3"
                  key={i}
                >
                  <div className="ml-2 text-gray-600">
                    <p>
                      <b>Amount:</b> {txn?.amount}
                    </p>
                    <p>
                      <span className="text-green-600">Paid: {txn?.paid}</span>{" "}
                      /{" "}
                      <span className="text-red-600">
                        Pending: {txn?.pending}
                      </span>
                    </p>
                    <ReactTooltip />
                  </div>
                  <p className="text-xs w-16 text-gray-600">
                    {moment(txn?.created_at).format("h:m A dddd")}
                  </p>
                </div>
              ))}
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
    </>
  );
}

export default DashboardUI;
