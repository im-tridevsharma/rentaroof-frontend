import React from "react";

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
        className={`${
          center && "text-center w-full sm:text-3xl text-xl mb-10"
        }`}
      >
        {tagline}
      </p>
      {!center && <p>{path}</p>}
    </div>
  );
}

export default Breadcrumb;
