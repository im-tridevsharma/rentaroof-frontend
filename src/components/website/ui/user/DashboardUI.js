import moment from "moment";
import React, { useEffect, useState } from "react";
import { getUserSavedProperties } from "../../../../lib/frontend/auth";
import Review from "../../Review";
import Loader from "../../../loader";
import { __d } from "../../../../server";
import {
  getAgreements,
  getRecentTransactions,
  getUserRating,
  getVisitedProperties,
} from "../../../../lib/frontend/share";
import {
  FaBuilding,
  FaHeart,
  FaMoneyBillAlt,
  FaTimes,
  FaWalking,
} from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import Card from "../../Card";

function DashboardUI() {
  const [visitedProperties, setVisitedProperties] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [viewMore, setViewMore] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [randomP, setRandomP] = useState({});
  const [recentTransaction, setRecentTransaction] = useState([]);
  const [paidAmount, setPaidAmount] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      (async () => {
        const res = await getVisitedProperties();
        if (res?.status) {
          setVisitedProperties(res?.data);
        }
        const response = await getUserSavedProperties(u.id);
        if (response?.status) {
          setIsLoading(false);
          const favorite = response?.data.filter((p) => p.type === "favorite");
          setFavoriteProperties(favorite);
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

    const recentTxn = async () => {
      setIsLoading(true);
      const res = await getRecentTransactions();
      if (res?.status) {
        setIsLoading(false);
        setRecentTransaction(res?.data);
        setPaidAmount(res?.paid);
      } else {
        setIsLoading(false);
        console.log(res?.error || res?.message);
      }
    };

    recentTxn();

    const getReviews = async () => {
      setIsLoading(true);
      const u = localStorage.getItem("LU")
        ? JSON.parse(__d(localStorage.getItem("LU")))
        : false;
      if (u) {
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

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative bg-lightBlue-600 pb-8">
        <div className="mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <Card
                color="red"
                label="Visited Properties"
                value={visitedProperties?.length}
                icon={<FaWalking />}
              />
              <Card
                color="green"
                label="Rented Properties"
                value={agreements?.length}
                icon={<FaBuilding />}
              />
              <Card
                color="yellow"
                label="Shortlisted"
                value={favoriteProperties?.length}
                icon={<FaHeart />}
              />
              <Card
                color="red"
                label="Paid Rent"
                value={paidAmount}
                icon={<FaMoneyBillAlt />}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col px-4">
        {/**other information */}
        <div className="grid">
          {/**part1 */}
          <div className="flex flex-col">
            {/**current rental details */}
            <div className="flex flex-col bg-white rounded-md">
              <p className="px-3 py-2" style={{ fontFamily: "Opensans-bold" }}>
                Rented Houses
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

            <div className="w-full mt-5 shadow-sm  overflow-hidden bg-white rounded-md relative">
              <p style={{ fontFamily: "Opensans-bold" }} className="px-4 py-2">
                Recent Transactions
              </p>
              <div
                className="flex flex-col"
                style={{ fontFamily: "Opensans-regular" }}
              >
                {/**map transactions */}
                {recentTransaction?.length > 0 &&
                  recentTransaction.map((txn, i) => (
                    <div
                      className="flex items-center justify-between py-2 px-3 border-b bg-gray-50 border-gray-200"
                      key={i}
                    >
                      <div className="ml-2 text-gray-600">
                        <p>
                          <b>Amount:</b> {txn?.amount}
                        </p>
                        <p>
                          <span className="text-green-600">
                            Paid: {txn?.paid}
                          </span>{" "}
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
          </div>
          {/**part2 */}
          {false && (
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
          )}
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
