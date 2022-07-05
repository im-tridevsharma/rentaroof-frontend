import React from "react";

function PropertyGrid({ image, title, subtitle, price, button }) {
  return (
    <div className="flex flex-col p-2 m-1 bg-white rounded-md border-2 border-gray-200">
      <div className="w-full max-h-48 mb-2 overflow-hidden rounded-md">
        {image}
      </div>
      <div className="text-center" style={{ fontFamily: "Opensans-regular" }}>
        <p className="text-gray-600">{title}</p>
        <p style={{ fontFamily: "Opensans-bold" }}>Price: {price}</p>
        <p className="text-gray-600">{subtitle}</p>
        <div className="mt-3 flex items-start justify-between">{button}</div>
      </div>
    </div>
  );
}

export default PropertyGrid;
