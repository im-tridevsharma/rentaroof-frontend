import React, { useEffect, useState } from "react";
import Review from "../../Review";
import DonoughtChart from "../../../charts/doughnut";
import Loader from "../../../loader";
import { getPropertiesCount } from "../../../../lib/frontend/properties";
import { getMeetings } from "../../../../lib/frontend/meetings";
import moment from "moment";
import { __d } from "../../../../server";
import {
  getAgreements,
  getDealOffered,
  getIboRating,
} from "../../../../lib/frontend/share";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

function DashboardUI() {
  const [isLoading, setIsLoading] = useState(false);
  const [postedProperties, setPostedProperties] = useState([]);
  const [randomApp, setRandomApp] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [deals, setDeals] = useState([]);

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
        const response = await getIboRating(u?.id);
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

    const getAppointments = async () => {
      setIsLoading(true);
      const response = await getMeetings();
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

    getDeals();
    getAppointments();
    getPropertiesFun();
    getReviews();
  }, []);

  const properties_graph = [
    {
      label: "Properties for rent",
      count: agreements?.length,
      icon: (
        <img
          src="/icons/user-dashboard/usericon2.png"
          alt="rent"
          className="w-10 h-10 object-contain"
        />
      ),
      data: {
        key: "properties_chart",
        colors: ["rgb(5 79 138)", "#F3F3F3"],
        hoverColors: ["rgb(5 79 138)", "#F3F3F3"],
        labels: [],
        values: [agreements?.length, 100],
        fontcolor: "gray",
        legend: false,
        tooltip: false,
      },
    },
    {
      label: "Earnings from closed deals",
      count: "40%",
      icon: (
        <img
          src="/icons/ibo_icons/icon_2.png"
          alt="favorite"
          className="w-10 h-10 object-contain"
        />
      ),
      data: {
        key: "properties_chart",
        colors: ["orange", "#F3F3F3"],
        hoverColors: ["orange", "#F3F3F3"],
        labels: [],
        values: [40, 100],
        fontcolor: "gray",
        legend: false,
        tooltip: false,
      },
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**total properties */}
        <div
          className="p-6 rounded-md text-white"
          style={{
            backgroundColor: "var(--orange)",
            fontFamily: "Opensans-bold",
          }}
        >
          <p>Total Properties Posted</p>
          {/**graph */}
          <div className="w-full h-2 bg-white rounded-lg mt-2 relative">
            {/**visited count */}
            <span
              className="h-full rounded-lg absolute right-0 top-0"
              style={{
                backgroundColor: "var(--blue)",
                width: (postedProperties / 10) * 100,
              }}
            ></span>
          </div>
        </div>

        {/**properties graph */}
        <div className="grid grid-cols-1 space-y-5 md:space-y-0 md:grid-cols-2 md:space-x-2 mt-5 md:pr-2">
          {properties_graph?.length &&
            properties_graph.map((p, i) => (
              <div
                key={i}
                className="w-full shadow-sm h-56 bg-white rounded-md border-2 border-gray-200 relative"
              >
                {/**sidebar line */}
                <span
                  className="absolute left-0 w-1 h-52 top-1 rounded-lg"
                  style={{ backgroundColor: "var(--blue)" }}
                ></span>
                {/**data */}
                <div className="flex flex-col p-5">
                  <p
                    className="text-gray-500"
                    style={{ fontFamily: "Opensans-semi-bold" }}
                  >
                    {p?.label}
                  </p>
                  <div className="flex justify-between">
                    <div
                      className="flex flex-col text-gray-700 text-xl"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      <p className="mb-5">{p?.count}</p>
                      {p?.icon}
                    </div>
                    {/**chart */}
                    <div className="">
                      <DonoughtChart height={170} chartdata={p?.data} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/**other information */}
        <div className="grid grid-cols-1 space-y-5 md:space-y-0 md:grid-cols-2 md:space-x-2 mt-5">
          {/**part1 */}
          <div className="flex flex-col">
            {/**current rental details */}
            <div className="flex flex-col shadow-sm border-2 bg-white border-gray-200 rounded-md">
              <p
                className="px-3 py-2 text-white rounded-md m-1"
                style={{
                  backgroundColor: "var(--orange)",
                  fontFamily: "Opensans-semi-bold",
                }}
              >
                Today's Appointment
              </p>
              {randomApp ? (
                <div
                  className="flex items-center px-4 mb-4 mt-2 text-gray-600"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  <div className="w-24 h-20 rounded-lg overflow-hidden">
                    <img
                      src={
                        randomApp.front_image || "/images/website/no_photo.png"
                      }
                      alt="home"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col px-5">
                    <b
                      className="text-gray-800 flex flex-col leading-3"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      <div className="flex items-center">
                        <img
                          src="/icons/ibo_icons/icon_4.png"
                          alt="time"
                          className="object-contain mr-1"
                          style={{
                            maxWidth: "14px",
                            width: "14px",
                            height: "14px",
                          }}
                        />{" "}
                        {randomApp?.property_data}
                      </div>
                      <small
                        className="ml-5"
                        style={{ color: "var(--orange)" }}
                      >
                        by {randomApp?.name}
                      </small>
                    </b>
                    <b
                      className="text-gray-800 flex items-center"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      <img
                        src="/icons/ibo_icons/icon_110.png"
                        alt="time"
                        className="object-contain mr-1"
                        style={{
                          maxWidth: "14px",
                          width: "14px",
                          height: "14px",
                        }}
                      />{" "}
                      {moment(randomApp?.start_time).format("MMM, DD,YYYY")}
                    </b>
                    <p className="text-gray-800 flex items-center">
                      <img
                        src="/icons/ibo_icons/icon21.png"
                        alt="time"
                        className="object-contain"
                        style={{
                          maxWidth: "14px",
                          width: "14px",
                          height: "14px",
                        }}
                      />{" "}
                      <span className="ml-1" style={{ color: "var(--orange)" }}>
                        {moment(randomApp?.start_time).format("hh:mm a")}
                      </span>
                      <p className="ml-5">
                        <b>Status-</b> {randomApp?.meeting_status}
                      </p>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500 p-2">No appointment found!</p>
              )}
            </div>
            {/**recent transaction */}
            <div className="w-full mt-5 shadow-sm h-56 bg-white rounded-md border-2 border-gray-200 relative">
              {/**sidebar line */}
              <span
                className="absolute left-0 w-1 h-52 top-1 rounded-lg"
                style={{ backgroundColor: "var(--blue)" }}
              ></span>
              <p style={{ fontFamily: "Opensans-bold" }} className="px-4 py-2">
                Deals Offered To Tenant
              </p>
              <div
                className="flex flex-col"
                style={{ fontFamily: "Opensans-regular" }}
              >
                {/**map deals */}
                {deals?.length > 0 &&
                  deals.map((txn, i) => (
                    <div
                      className="flex items-center justify-between py-2 px-3"
                      key={i}
                    >
                      <div className="flex">
                        <img
                          src="/icons/ibo_icons/icon_3.png"
                          alt="deals"
                          className="object-contain mr-1"
                          style={{
                            maxWidth: "20px",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                        <p className="ml-2 text-gray-600">
                          Deal offered to {txn?.user?.first} {txn?.user?.last} -{" "}
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(txn?.offer_price)}{" "}
                          <span className="ml-5 capitalize">{txn?.status}</span>
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/**part2 */}
          <div className="flex flex-col shadow-sm border-2 bg-white border-gray-200 rounded-md">
            <p
              className="px-3 py-2 text-white rounded-md m-1"
              style={{
                backgroundColor: "var(--blue)",
                fontFamily: "Opensans-semi-bold",
              }}
            >
              Ratings & Review
            </p>
            {reviews?.length > 0 ? (
              <>
                <div className="px-3 py-5">
                  {[0, 1].map((_, i) => {
                    if (reviews[i]) {
                      return <Review key={i} rating={reviews[i]} />;
                    }
                  })}
                </div>
                <div className="text-center">
                  <button
                    style={{
                      backgroundColor: "var(--orange)",
                      fontFamily: "Opensans-bold",
                    }}
                    className="p-3 rounded-md text-white"
                    onClick={() => setViewMore(true)}
                  >
                    See more reviews
                  </button>
                </div>
              </>
            ) : (
              <p className="text-red-500 p-5">No reviews found!</p>
            )}
          </div>
        </div>
      </div>
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
