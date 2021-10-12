import React from "react";

function Search({ label, name, options }) {
  return (
    <div>
      <select
        name={name}
        className="border-none bg-gray-200 text-gray-500 text-xs cursor-pointer w-72 sm:w-auto mb-1 sm:mb-0 rounded-sm mr-1 h-10"
      >
        <option value="">{label}</option>
        {options &&
          options.map((o, i) => (
            <option key={i} value={o.value}>
              {o.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Search;
