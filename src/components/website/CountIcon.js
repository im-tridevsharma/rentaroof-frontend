import React from "react";

function CountIcon({ Icon, title }) {
  return (
    <div className="flex flex-col items-center justify-start h-40 w-60">
      <div className="h-20">{Icon}</div>
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
