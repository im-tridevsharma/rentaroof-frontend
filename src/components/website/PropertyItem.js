import React from "react";
import Link from "next/link";

function PropertyItem({ property }) {
  return (
    <div className="border-2 border-gray-200 rounded-lg flex p-1 my-1 shadow-sm">
      {/**small slider */}
      <div className="mr-5">
        <img
          src={property?.front_image || "/images/website/no_photo.png"}
          alt="property"
          className="h-40 md:w-52 object-cover"
        />
      </div>
      {/**property details */}
      <div className="flex flex-col py-5 items-start">
        <b style={{ fontFamily: "Opensans-bold" }}>{property?.name || "-"}</b>
        <p className="font-thin" style={{ fontFamily: "Opensans-semi-bold" }}>
          {property?.address?.full_address}
        </p>
        <h6
          className="my-2 font-bold"
          style={{
            color: "var(--primary-color)",
            fontFamily: "Opensans-bold",
          }}
        >
          ₹ {property?.monthly_rent}/month
        </h6>
        <Link href={`/details/properties/${property?.property_code}`}>
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
