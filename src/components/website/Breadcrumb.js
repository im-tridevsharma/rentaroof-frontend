import React from "react";
import Router from "next/router";
import { GrLinkPrevious } from "react-icons/gr";

function Breadcrumb({ tagline, path, center, large }) {
  return (
    <div
      className="flex items-center justify-between py-7 px-6 text-white"
      style={{
        backgroundColor: "var(--secondary-color)",
        height: large && "200px",
        fontFamily: "Opensans-regular",
      }}
    >
      {/**tag line */}
      <p
        className={`flex items-center ${
          center && "text-center w-full sm:text-3xl text-xl mb-10"
        }`}
      >
        <div
          className="w-8 h-8 bg-white rounded-full flex items-center justify-center cursor-pointer mr-3"
          data-tip="Back"
          onClick={() => Router.back()}
        >
          <GrLinkPrevious className={`${large && "text-xs"}`} />
        </div>
        {tagline}
      </p>
      {!center && <p>{path}</p>}
    </div>
  );
}

export default Breadcrumb;
