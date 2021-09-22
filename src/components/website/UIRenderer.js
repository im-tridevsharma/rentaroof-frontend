import React, { useEffect, useState } from "react";
import { __d } from "../../server";
import Header from "./share/Header";
import Sidebar from "./share/Sidebar";

function UIRenderer({ UI, role, page }) {
  const [sideBarToggled, setSideBarToggled] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      setUser(data);
    }
  }, []);

  return (
    <div className="flex">
      {/**sider bar */}
      <Sidebar
        name={role}
        page={page}
        sideBarToggled={sideBarToggled}
        isHide={isHide}
        setIsHide={setIsHide}
      />
      {/**content */}
      <div className="flex flex-col flex-grow">
        {/**header */}
        <Header
          page={page}
          sideBarToggled={sideBarToggled}
          setSideBarToggled={setSideBarToggled}
          user={user}
          setUser={setUser}
          setIsHide={setIsHide}
        />
        {/**main content */}
        <div
          className="w-full bg-gray-100 overflow-hidden overflow-y-auto p-4"
          style={{
            height: "580px",
          }}
        >
          <UI />
        </div>
      </div>
    </div>
  );
}

export default UIRenderer;
