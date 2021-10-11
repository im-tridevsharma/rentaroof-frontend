import React from "react";

function Card({ label, icon, count, color, textcolor, onClick }) {
  return (
    <div
      className="flex items-baseline justify-between p-3 border-gray-200 border-2 rounded-md"
      style={{
        backgroundColor: color,
        fontFamily: "Opensans-bold",
        color: textcolor,
      }}
      onClick={onClick}
    >
      <p className="text-sm leading-4 w-16">{label}</p>
      <div className="flex flex-col">
        <div className="flex items-center justify-end">{icon}</div>
        <span className="text-3xl mt-3">{count}</span>
      </div>
    </div>
  );
}

export default Card;
