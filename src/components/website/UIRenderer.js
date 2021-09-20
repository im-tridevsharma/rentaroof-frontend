import React from "react";
import Header from "./share/Header";
import Sidebar from "./share/Sidebar";

function UIRenderer({ UI, role, page }) {
  return (
    <div className="flex">
      {/**sider bar */}
      <Sidebar name={role} />
      {/**content */}
      <div className="flex flex-col flex-grow">
        {/**header */}
        <Header page={page} />
        {/**main content */}
        <div className="w-full h-full bg-gray-100 overflow-hidden overflow-y-auto p-4">
          <UI />
        </div>
      </div>
    </div>
  );
}

export default UIRenderer;
