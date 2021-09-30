import React from "react";
import Card from "../../Card";

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
    </div>
  );
}

export default EarningUI;
