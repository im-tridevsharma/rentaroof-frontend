import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import {
  createConversation,
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
  const [make, setMake] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSos, setIsSos] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      setUser(data);
    }
    const fetchUsers = async () => {
      const res = await getUsersForChat();
      if (res?.status) {
        setUsers(res?.data);
      }
    };

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
    make && fetchUsers();
  }, [make]);

  const handleConversationSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(document.forms.conversation);
    if (formdata) {
      setMake(false);
      const res = await createConversation(formdata);
      if (res?.status) {
        toast.success("Conversation created successfully.");
        Router.push(`/${user?.role}/chat`);
      } else {
        toast.error(res?.error || res?.message);
      }
    }
  };

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
          notifications={notifications}
          setNotifications={setNotifications}
        />
        {/**main content */}
        <div className="w-full relative bg-gray-50 md:p-4">
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
