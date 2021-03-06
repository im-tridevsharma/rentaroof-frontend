import React, { useState, useEffect, useRef } from "react";
import Countries from "./countries";

const Dropdown = () => {
  const [hidden, setHidden] = useState(true);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        hidden ||
        buttonRef.current.contains(event.target) ||
        dropdownRef.current.contains(event.target)
      ) {
        return false;
      }
      setHidden(!hidden);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hidden, dropdownRef, buttonRef]);

  const handleDropdownClick = () => {
    setHidden(!hidden);
  };

  return (
    <div className="hidden lg:flex relative">
      <button
        ref={buttonRef}
        onClick={handleDropdownClick}
        className="flex items-center justify-center h-16 w-12"
      >
        <span className={`text-base flag-icon flag-icon-in`}></span>
      </button>
      <div
        ref={dropdownRef}
        className={`dropdown absolute top-0 right-0 mt-16 ${
          hidden ? "" : "open"
        }`}
      >
        <div className="dropdown-content w-64 bottom-start">
          <Countries />
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
