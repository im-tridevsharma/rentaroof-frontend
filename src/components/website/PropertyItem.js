import React from "react";
import Link from "next/link";

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
        <b style={{ fontFamily: "Opensans-bold" }}>
          Residental House Villa for Rent in Mumbai{" "}
        </b>
        <p className="font-thin" style={{ fontFamily: "Opensans-semi-bold" }}>
          APN, Hill palace, Mumbai
        </p>
        <h6
          className="my-2 font-bold"
          style={{
            color: "var(--primary-color)",
            fontFamily: "Opensans-bold",
          }}
        >
          ₹ 8,500/month
        </h6>
        <Link href="/details/properties/IDP43R3RJ3">
          <a
            className="px-3 py-2 text-white uppercase text-2xs rounded-md"
            style={{
              backgroundColor: "var(--secondary-color)",
              fontFamily: "Opensans-semi-bold",
            }}
          >
            More Info
          </a>
        </Link>
      </div>
    </div>
  );
}

export default PropertyItem;
