import React from "react";

function Card({
  color,
  icon,
  label,
  value = "",
  onClick,
  state,
  current,
  col = 3,
  className = "",
}) {
  return (
    <div
      className={`w-full ${className} transform transition-all duration-100 ease-in-out lg:w-${col}/12 xl:w-${col}/12 px-4`}
    >
      <div className="relative overflow-hidden flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
        <div
          className={`flex-auto p-4  ${onClick && "cursor-pointer"}  ${
            state && state === current ? "border-b-8 border-black" : ""
          }`}
          onClick={onClick}
        >
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5
                className={`text-blueGray-400 uppercase font-bold text-xs ${
                  value === "" ? "mb-5" : "mb-2"
                }`}
              >
                {label}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700">
                {value}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-${color}-500`}
              >
                {icon}
              </div>
            </div>
          </div>
          {false && (
            <p className="text-sm text-blueGray-400 mt-4">
              <span className="text-emerald-500 mr-2">
                <i className="fas fa-arrow-up"></i> 3.48%
              </span>
              <span className="whitespace-nowrap">Since last month</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
