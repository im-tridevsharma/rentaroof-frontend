import React, { useEffect, useState } from "react";
import {
  getIboNotification,
  getLandlordNotification,
  getUserNotification,
} from "../../lib/frontend/share";
import { __d } from "../../server";
import Header from "./share/Header";
import Sidebar from "./share/Sidebar";

function UIRenderer({ UI, role, page }) {
  const [sideBarToggled, setSideBarToggled] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      setUser(data);
    }

    const fetchNotifications = async () => {
      const res =
        data?.role === "ibo"
          ? await getIboNotification()
          : data?.role === "landlord"
          ? await getLandlordNotification()
          : await getUserNotification();
      if (res?.status) {
        setNotifications(res?.data?.filter((n) => n?.is_seen !== 1));
      } else {
        console.error(res?.error || res.message);
      }
    };

    fetchNotifications();
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
          notifications={notifications?.length}
        />
        {/**main content */}
        <div
          className="w-full bg-gray-50 overflow-hidden overflow-y-auto p-4"
          style={{
            height: "575px",
          }}
        >
          <UI />
        </div>
      </div>
    </div>
  );
}

export default UIRenderer;
