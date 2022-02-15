import React from "react";

function CountIcon({ Icon, title }) {
  return (
    <div className="flex flex-col">
      <div className="h-20 flex items-center justify-center">{Icon}</div>
      <p
        className="mt-3 text-white flex flex-col items-center justify-center text-center leading-5"
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
