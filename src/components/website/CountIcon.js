import React from "react";

function CountIcon({ Icon, bold1, bold2, text }) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center my-2 sm:my-0">
      {<Icon className="text-4xl text-gray-300" />}
      <p
        className="mt-2 sm:mt-0 flex flex-col items-center justify-center text-center mx-5 sm:border-l-2 sm:pl-5 leading-5"
        style={{ borderColor: "rgba(255,255,255,.3)", fontSize: "1rem" }}
      >
        <b>{bold1}</b>
        <b>{bold2}</b>
        {text}
      </p>
    </div>
  );
}

export default CountIcon;
