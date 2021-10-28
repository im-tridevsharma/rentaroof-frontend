import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUserSavedProperties } from "../../../../lib/frontend/auth";
import DonoughtChart from "../../../charts/doughnut";
import Review from "../../Review";
import Loader from "../../../loader";
import { __d } from "../../../../server";
import { getAgreements, getUserRating } from "../../../../lib/frontend/share";
import { FaTimes } from "react-icons/fa";

function DashboardUI() {
  const [visitedProperties, setVisitedProperties] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(false);
  const [viewMore, setViewMore] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [randomP, setRandomP] = useState({});

  useEffect(() => {
    setIsLoading(true);
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      (async () => {
        const response = await getUserSavedProperties(u.id);
        if (response?.status) {
          setIsLoading(false);
          setTotal(response?.data.length);
          const visited = response?.data.filter((p) => p.type === "visited");
          const favorite = response?.data.filter((p) => p.type === "favorite");
          setFavoriteProperties(favorite);
          setVisitedProperties(visited);
        } else {
          setIsLoading(false);
          console.error(response?.error || response?.message);
        }
        setIsLoading(true);
        //get rental properties
        const p = await getAgreements();
        if (p?.status) {
          setIsLoading(false);
          setAgreements(p?.data);
          setRandomP(p?.data[Math.floor(Math.random() * p?.data?.length)]);
        } else {
          setIsLoading(false);
          console.error(p?.error || p?.message);
        }
      })();
    }

    const getReviews = async () => {
      setIsLoading(true);
      const u = localStorage.getItem("LU")
        ? JSON.parse(__d(localStorage.getItem("LU")))
        : false;
      if (u) {
        setUser(u);
        const response = await getUserRating(u?.id);
        if (response?.status) {
          setIsLoading(false);
          setReviews(response?.data);
        } else {
          console.error(response?.error || response?.message);
          setIsLoading(false);
        }
      }
    };
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
      label: "Favorite Properties",
      count: favoriteProperties?.length,
      icon: (
        <img
          src="/icons/user-dashboard/favorite.png"
          alt="favorite"
          className="w-10 h-10 object-contain"
        />
      ),
      data: {
        key: "properties_chart",
        colors: ["orange", "#F3F3F3"],
        hoverColors: ["orange", "#F3F3F3"],
        labels: [],
        values: [favoriteProperties?.length, 100],
        legend: false,
        tooltip: false,
      },
      fontcolor: "gray",
    },
  ];

  const transactions = [
    {
      message: "Paid rent to Ashok Dalwar",
      time: Date.now(),
    },
    {
      message: "Add to wallet via back A/c XXX265",
      time: Date.now(),
    },
    {
      message: "Paid rent to Mohan Dalwar",
      time: Date.now(),
    },
    {
      message: "Paid rent to Neeraj Dalwar",
      time: Date.now(),
    },
    {
      message: "Paid rent to Priya Dalwar",
      time: Date.now(),
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
          <p>Total Properties Visited</p>
          {/**graph */}
          <div className="w-full h-2 bg-white rounded-lg mt-2 relative">
            {/**visited count */}
            <span
              className="h-full rounded-lg absolute right-0 top-0"
              style={{
                backgroundColor: "var(--blue)",
                width: (total / visitedProperties?.length) * 100,
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
                Current House Rented Details
              </p>
              {agreements?.length > 0 ? (
                <div
                  className="flex items-center px-4 mb-4 mt-2 text-gray-600"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  <div className="w-24 h-20 rounded-lg overflow-hidden">
                    <img
                      src={
                        randomP.property_data?.front_image ||
                        "/images/website/no_photo.png"
                      }
                      alt="home"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col px-5">
                    <b
                      className="text-gray-800"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      {randomP?.landlord?.first} {randomP?.landlord?.last}
                    </b>
                    <p>
                      {randomP?.property_data?.bedrooms} BHK{" "}
                      <span className="mx-2">|</span>
                      {randomP?.property_data?.bedrooms} Bathroom
                    </p>
                    <p className="text-gray-800">
                      Monthly Rent:{" "}
                      <b style={{ fontFamily: "Opensans-bold" }}>
                        Rs. {randomP?.property_data?.monthly_rent}
                      </b>
                    </p>
                    <p className="text-gray-800">
                      Contract :{" "}
                      <b style={{ fontFamily: "Opensans-bold" }}>
                        {moment(randomP?.end_date).diff(
                          moment(randomP?.start_date),
                          "months",
                          true
                        )}{" "}
                        Months
                      </b>
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500 p-3">No properties found!</p>
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
                Recent Transactions
              </p>
              <div
                className="flex flex-col"
                style={{ fontFamily: "Opensans-regular" }}
              >
                {/**map transactions */}
                {transactions?.length > 0 &&
                  transactions.map((txn, i) => (
                    <div
                      className="flex items-center justify-between py-2 px-3"
                      key={i}
                    >
                      <div className="flex">
                        <img
                          src="/icons/user-dashboard/money_icon_blck.png"
                          alt="money"
                        />
                        <p className="ml-2 text-gray-600">{txn?.message}</p>
                      </div>
                      <p className="text-3xs w-16 text-gray-600">
                        {moment(txn?.time).format("h:Ma dddd")}
                      </p>
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
                  {[0, 1].map((_, i) => (
                    <Review key={i} rating={reviews[i]} />
                  ))}
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
