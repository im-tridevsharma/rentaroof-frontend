import React from "react";
import Card from "../../Card";
import BarChart from "../../../dashboard/bar-chart";

function EarningUI() {
  return (
    <div className="flex flex-col">
      <h5
        className="text-gray-800 text-sm mb-3 px-1"
        style={{ fontFamily: "Opensans-bold" }}
      >
        Your Closed Deal Earnings
      </h5>
      {/**cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
        <Card
          label="This month earnings"
          count="Rs. 30,000.00"
          color="var(--orange)"
          textcolor="white"
          icon={<img src="/icons/ibo_icons/icon20.png" alt="earning" />}
        />
        <Card
          label="Per month"
          count="Rs. 40,000.00"
          color="white"
          textcolor="gray"
          icon={<img src="/icons/ibo_icons/icon22.png" alt="earning2" />}
        />
        <Card
          label="Income breakdown"
          count="Rs. 10,000.00"
          color="white"
          textcolor="gray"
          icon={<img src="/icons/ibo_icons/icon24.png" alt="earning3" />}
        />
      </div>
      {/**income chart */}
      <div className="border-2 border-gray-200 rounded-md px-3 py-1 bg-white mt-3">
        <p style={{ fontFamily: "Opensans-semi-bold" }} className="mb-3">
          Monthly earnings (Year : 2021)
        </p>
        <div className="max-w-4xl mx-auto">
          <BarChart />
        </div>
      </div>
      {/**other information */}
      <div className="flex mt-5 md:flex-row flex-col items-start">
        <table className="table bg-white border-2 border-gray-200 rounded-md">
          <thead style={{ fontFamily: "Opensans-bold" }}>
            <tr>
              <th>Name</th>
              <th>Deals</th>
              <th>Date</th>
              <th>Reveived Amount</th>
            </tr>
          </thead>
          <tbody style={{ fontFamily: "Opensans-semi-bold" }}>
            <tr>
              <td>John</td>
              <td>Closed</td>
              <td>10-10-2021</td>
              <td>Rs.3300</td>
            </tr>
          </tbody>
        </table>
        <div className="w-128 md:ml-3 bg-white border-2 border-gray-200 rounded-sm p-2">
          <p
            className="flex justify-between"
            style={{ fontFamily: "Opensans-bold" }}
          >
            Profit Year
            <img
              src="/icons/ibo_icons/icon23.png"
              className="w-7 h-7 object-contain"
              alt="money"
            />
          </p>
          <div className="mt-5" style={{ fontFamily: "Opensans-semi-bold" }}>
            <p className="flex flex-col">
              <span>Total earnings this year</span>
              <span style={{ color: "var(--blue)" }}>Rs. 200,000,50</span>
            </p>
            <p className="flex flex-col mt-3">
              <span>Total earnings last year</span>
              <span style={{ color: "var(--blue)" }}>Rs. 100,000,50</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EarningUI;
