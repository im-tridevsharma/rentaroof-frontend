import React from "react";

function PropertyIbo() {
  return (
    <div className="border-2 border-gray-200 rounded-lg flex p-1 my-1 shadow-md mb-3">
      {/**small slider */}
      <div className="mr-5">
        <img
          src="https://i.pinimg.com/originals/ea/e1/a8/eae1a803b3f10b213686fb67a0aa2743.jpg"
          alt="property"
          className="h-40"
        />
      </div>
      {/**property details */}
      <div className="flex flex-col py-2 items-start w-full">
        <b style={{ fontFamily: "Opensans-bold" }}>
          Residental House Villa for Rent in Mumbai{" "}
        </b>
        <p className="font-thin" style={{ fontFamily: "Opensans-semi-bold" }}>
          APN, Hill palace, Mumbai
        </p>
        <p
          className="flex text-center mt-1"
          style={{ color: "var(--blue)", fontFamily: "Opensans-semi-bold" }}
        >
          <span
            className="pr-4 mr-4"
            style={{ borderRightWidth: "2px", borderColor: "var(--blue)" }}
          >
            3 BHK
          </span>
          <span
            className="pr-4 mr-4"
            style={{ borderRightWidth: "2px", borderColor: "var(--blue)" }}
          >
            1500 sqft
          </span>
          <span
            className="pr-4 mr-4"
            style={{ borderRightWidth: "2px", borderColor: "var(--blue)" }}
          >
            3 Bathrooms
          </span>
          <span>3 Floor</span>
        </p>
        <h6
          style={{
            color: "var(--primary-color)",
            fontFamily: "Opensans-bold",
            fontSize: "1rem",
          }}
        >
          ₹ 8,500/month
        </h6>

        <button
          className="px-3 py-2 text-white uppercase text-3xs rounded-md"
          style={{
            backgroundColor: "var(--primary-color)",
            fontFamily: "Opensans-semi-bold",
          }}
        >
          View More
        </button>
        <p className="mt-1 flex items-center justify-between w-full">
          <span className="flex items-center">
            ID:OP888737 |{" "}
            <img
              src="/icons/proprtydetls/icon_1.png"
              alt="share"
              className="w-4 h-4 object-contain mx-3"
            />
            Share
          </span>
          <span className="mr-3 text-xs">Posted on 23rd Aug, 2021</span>
        </p>
      </div>
    </div>
  );
}

export default PropertyIbo;
