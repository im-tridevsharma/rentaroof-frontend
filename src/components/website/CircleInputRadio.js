import React from "react";

function CircleInputRadio({ name, value, state }) {
  const { data, setData } = state;
  return (
    <label
      className="w-10 h-10 rounded-full mr-2 cursor-pointer flex items-center justify-center border-gray-200"
      style={{
        borderWidth: "1px",
        backgroundColor: data == value ? "var(--blue)" : "white",
        color: data == value ? "white" : "gray",
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        className="hidden"
        checked={data == value ? true : false}
        onChange={(e) => setData(e.target.value)}
      />
      {value}
    </label>
  );
}

export default CircleInputRadio;
