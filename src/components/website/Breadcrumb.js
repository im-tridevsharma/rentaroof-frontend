import React from "react";

function Breadcrumb({ tagline, path }) {
  return (
    <div
      className="flex items-center justify-between py-7 px-6 text-white font-bold"
      style={{
        backgroundColor: "rgb(16 125 174)",
      }}
    >
      {/**tag line */}
      <p>{tagline}</p>
      <p>{path}</p>
    </div>
  );
}

export default Breadcrumb;
