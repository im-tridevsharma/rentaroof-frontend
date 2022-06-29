import React, { useEffect, useState } from "react";
import {
  createSOS,
  getIsSOS,
  getUnseenNotification,
  getUsersForChat,
} from "../../lib/frontend/share";
import { __d } from "../../server";
import Header from "./share/Header";
import Sidebar from "./share/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import Router from "next/router";
import Loader from "../loader";

function UIRenderer({ UI, role, page }) {
  const [sideBarToggled, setSideBarToggled] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSos, setIsSos] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      setUser(data);
    }

    const fetchNotifications = async () => {
      const res = await getUnseenNotification(data?.role);
      if (res?.status) {
        setNotifications(res?.data);
      } else {
        console.error(res?.error || res.message);
      }
    };

    const _isSos = async () => {
      const res = await getIsSOS();
      if (res?.status) {
        setIsSos(res?.data);
      }
    };

    fetchNotifications();
    _isSos();
  }, []);

  const handleSOS = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        fireSos(location);
      });
    } else {
      toast.error("Please allow your current location.");
    }
  };

  const fireSos = async (location) => {
    const res = await createSOS({
      sos_content: `${user?.first} ${user?.last} pressed SOS button.`,
      lat: location?.coords?.latitude,
      lng: location?.coords?.longitude,
    });
    if (res?.status) {
      setIsLoading(false);
      toast.success(
        "Your SOS message sent to Rent A Roof team. We will call you asap."
      );
    } else {
      toast.error(res?.error || res?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <ToastContainer />
      {isLoading && <Loader />}
      {/**sider bar */}
      <Sidebar
        name={role}
        user={user}
        sideBarToggled={sideBarToggled}
        isHide={isHide}
        setIsHide={setIsHide}
      />
      {/**content */}
      <div className="relative md:ml-64 flex-1 bg-blueGray-100">
        {/**header */}
        <Header
          page={page}
          sideBarToggled={sideBarToggled}
          setSideBarToggled={setSideBarToggled}
          user={user}
          setUser={setUser}
          setIsHide={setIsHide}
          notifications={notifications}
          setNotifications={setNotifications}
        />
        {/**main content */}
        <div className="relative bg-lightBlue-600 md:pt-32 pb-8 pt-12 px-4">
          <UI />
        </div>
        {user && ["ibo", "tenant"].includes(user.role) && isSos === "yes" && (
          <div
            className="fixed bottom-24 right-5"
            style={{ fontFamily: "Opensans-bold" }}
          >
            <button
              onClick={handleSOS}
              className="p-3 rounded-full bg-red-600 text-white"
            >
              SOS
            </button>
          </div>
        )}

        {user && user?.role !== "tenant" && (
          <div
            className="fixed bottom-0 right-5"
            style={{ fontFamily: "Opensans-bold" }}
          >
            <button
              onClick={() => Router.push(`/${user?.role}/add-property`)}
              className="p-2 rounded-md text-white"
              style={{ backgroundColor: "var(--blue)" }}
            >
              Add New Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UIRenderer;
