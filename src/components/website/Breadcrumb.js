import React from "react";

function Breadcrumb({ tagline, path }) {
  return (
    <div
      className="flex items-center justify-between py-7 px-6 text-white font-bold"
      style={{
        backgroundColor: "var(--secondary-color)",
      }}
    >
      {/**tag line */}
      <p>{tagline}</p>
      <p>{path}</p>
    </div>
  );
}

export default Breadcrumb;
