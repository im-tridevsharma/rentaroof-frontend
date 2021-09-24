import React from "react";
import Review from "../../Review";
import DonoughtChart from "../../../charts/doughnut";

function DashboardUI() {
  const properties_graph = [
    {
      label: "Properties for rent",
      count: 289,
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
        values: [289, 100],
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

  const deals = [
    {
      message: "Deal one offered to Ram",
    },
    {
      message: "Deal one offered to Keshav",
    },
    {
      message: "Deal one offered to Kishan",
    },
    {
      message: "Deal one offered to Ruhi",
    },
    {
      message: "Deal one offered to Shyam",
    },
  ];

  return (
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
              width: "40%",
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
            <div
              className="flex items-center px-4 mb-4 mt-2 text-gray-600"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <div className="w-24 h-20 rounded-lg overflow-hidden">
                <img
                  src="/images/website/home-house.jpg"
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
                    38HK AT PUNE FOR 45300
                  </div>
                  <small className="ml-5" style={{ color: "var(--orange)" }}>
                    by james
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
                  Aug, 03,2021
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
                    11:00am
                  </span>
                </p>
              </div>
            </div>
          </div>
          {/**recent transaction */}
          <div className="w-full mt-5 shadow-sm h-56 bg-white rounded-md border-2 border-gray-200 relative">
            {/**sidebar line */}
            <span
              className="absolute left-0 w-1 h-52 top-1 rounded-lg"
              style={{ backgroundColor: "var(--blue)" }}
            ></span>
            <p style={{ fontFamily: "Opensans-bold" }} className="px-4 py-2">
              Deals Offered To Renter
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
                      <p className="ml-2 text-gray-600">{txn?.message}</p>
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
          <div className="px-3 py-5">
            <Review />
            <Review />
          </div>
          <div className="text-center">
            <button
              style={{
                backgroundColor: "var(--orange)",
                fontFamily: "Opensans-bold",
              }}
              className="p-3 rounded-md text-white"
            >
              See more reviews
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardUI;
