import React from "react";

function Option({ Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center mb-10 sm:mb-0">
      {/**Icon */}
      {Icon}
      {/**title */}
      <h5
        className="my-6 text-gray-800"
        style={{ fontFamily: "Opensans-semi-bold" }}
      >
        {title}
      </h5>
      {/**description */}
      <p className="text-gray-600" style={{ fontFamily: "Opensans-regular" }}>
        {description}
      </p>
    </div>
  );
}

export default Option;
