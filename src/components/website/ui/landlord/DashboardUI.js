import React, { useEffect, useState } from "react";
import Review from "../../Review";
import { useRouter } from "next/router";
import Loader from "../../../loader";
import { getPropertiesCount } from "../../../../lib/frontend/properties";
import { getLandlordMeetings } from "../../../../lib/frontend/meetings";
import moment from "moment";
import { __d } from "../../../../server";
import {
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
    if (u?.id) {
      getAppointments(u.id);
    }
    getPropertiesFun();
    getReviews();
    getDeals();
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
                label="Upcoming Appointments"
                icon={<FaCalendarAlt />}
                onClick={() => setTab("upcoming")}
                current={tab}
                state="upcoming"
              />
              <Card
                color="red"
                label="Manage Applications"
                icon={<FaRegEye />}
                onClick={() => setTab("manage-app")}
                current={tab}
                state="manage-app"
              />
              <Card
                color="green"
                label="Upcoming Rent Payments"
                icon={<FaListAlt />}
                onClick={() => setTab("rent")}
                current={tab}
                state="rent"
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
          <div className="mt-5 p-4"></div>
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
    </>
  );
}

export default DashboardUI;
