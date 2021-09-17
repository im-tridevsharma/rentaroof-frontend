import React from "react";
import { FiLoader } from "react-icons/fi";

function Index() {
  return (
    <div className="fixed w-full top-0 left-0 h-screen flex items-center justify-center z-50">
      <div className="h-24 w-24 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center flex-col justify-center">
        <FiLoader className="text-xl animate-spin" />
        <p className="mt-1">Processing...</p>
      </div>
    </div>
  );
}

export default Index;
