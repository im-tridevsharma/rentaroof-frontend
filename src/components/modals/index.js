import React from "react";
import { FiDelete } from "react-icons/fi";

function Index({ children, title, subtitle, footer }) {
  return (
    <div className="flex flex-col max-w-lg w-full rounded-lg bg-white dark:bg-gray-800 shadow-md fixed top-20 left-1/2 transform -translate-x-1/2">
      {/**modal header */}
      <div className="border-gray-50 border-b-2 dark:border-gray-700 px-5 py-2">
        <h3 className="text-xl">{title}</h3>
        <p>{subtitle}</p>
        <span className="absolute right-5 top-5 cursor-pointer text-xl text-red-500 hover:text-red-400">
          <FiDelete />
        </span>
      </div>
      {/**modal content */}
      <div className="px-5 py-3">{children}</div>
      {/**modal footer */}
      {footer && (
        <div className="px-5 py-2 border-t-2 border-gray-50 dark:border-gray-700"></div>
      )}
    </div>
  );
}

export default Index;
