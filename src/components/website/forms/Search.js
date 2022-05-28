import React from "react";

import Select from "react-select";

function Search({ name, options }) {
  return (
    <div className="mx-1 text-left">
      <Select options={options} name={name} defaultValue={options[0]} />
      {false && (
        <select
          name={name}
          className="border-none bg-gray-200 text-gray-500 text-xs cursor-pointer w-full  mb-1 sm:mb-0 rounded-sm mr-1 h-10"
        >
          <option value="">{label}</option>
          {options &&
            options.map((o, i) => (
              <option key={i} value={o.value}>
                {o.label}
              </option>
            ))}
        </select>
      )}
    </div>
  );
}

export default Search;
