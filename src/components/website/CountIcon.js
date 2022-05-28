import React from "react";

function CountIcon({ Icon, title }) {
  return (
    <div className="count-item z-0 flex flex-col items-center justify-center group w-full h-full p-5">
      <div className="h-20">{Icon}</div>
      <p
        className="mt-3 text-gray-700 group-hover:text-white flex flex-col items-center justify-center text-center leading-5"
        style={{
          fontSize: "1rem",
          fontFamily: "Opensans-regular",
        }}
      >
        <b style={{ fontFamily: "Opensans-bold" }}>{title}</b>
      </p>
    </div>
  );
}

export default CountIcon;
