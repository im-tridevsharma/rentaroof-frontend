import React from "react";

function PropertyItem() {
  return (
    <div className="border-2 border-gray-200 rounded-lg flex p-1 my-1 shadow-sm">
      {/**small slider */}
      <div className="mr-5">
        <img
          src="https://i.pinimg.com/originals/ea/e1/a8/eae1a803b3f10b213686fb67a0aa2743.jpg"
          alt="property"
          className="h-40"
        />
      </div>
      {/**property details */}
      <div className="flex flex-col py-5 items-start">
        <b>Residental House Villa for Rent in Mumbai </b>
        <p className="font-thin">APN, Hill palace, Mumbai</p>
        <h6
          className="my-2 font-bold"
          style={{
            color: "#7b4a9c",
          }}
        >
          ₹ 8,500/month
        </h6>
        <button
          className="px-3 py-2 text-white uppercase text-2xs rounded-md"
          style={{
            backgroundColor: "rgb(16 125 174)",
          }}
        >
          More Info
        </button>
      </div>
    </div>
  );
}

export default PropertyItem;
