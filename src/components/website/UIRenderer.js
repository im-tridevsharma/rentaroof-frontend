import React, { useEffect, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import {
  createConversation,
  getIboNotification,
  getLandlordNotification,
  getUnseenNotification,
  getUserNotification,
  getUsersForChat,
} from "../../lib/frontend/share";
import { __d } from "../../server";
import Header from "./share/Header";
import Sidebar from "./share/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import Router from "next/router";

function UIRenderer({ UI, role, page }) {
  const [sideBarToggled, setSideBarToggled] = useState(false);
  const [isHide, setIsHide] = useState(false);
  const [user, setUser] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [make, setMake] = useState(false);
  const [users, setUsers] = useState([]);

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

    fetchNotifications();
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

  return (
    <div className="flex">
      <ToastContainer />
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
        <div
          className="w-full relative bg-gray-50 overflow-hidden overflow-y-auto md:p-4"
          style={{
            height: "575px",
          }}
        >
          <UI />
        </div>
        {/**conversation */}
        {false && (
          <div
            className={`${
              !make
                ? "w-10 h-10 rounded-full cursor-pointer hover:bg-green-50 flex items-center justify-center"
                : "md:w-96 w-full h-72 border"
            } bg-white fixed md:right-5 bottom-24 right-0 z-40 shadow-lg drop-shadow-md transition-all duration-50 ease-linear`}
          >
            {!make && (
              <FiMessageSquare
                className="text-2xl"
                onClick={() => setMake(true)}
              />
            )}
            {make && (
              <div className="flex flex-col p-4">
                <h5
                  className="flex items-center justify-between"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Make a Conversation{" "}
                  <FaTimes
                    className="text-red-500 cursor-pointer"
                    onClick={() => setMake(false)}
                  />
                </h5>
                <form
                  name="conversation"
                  className="mt-10"
                  onSubmit={handleConversationSubmit}
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  <div className="form-element">
                    <input type="hidden" name="sender_id" value={user?.id} />
                    <label className="form-label">
                      Select User/IBO/Landlord
                    </label>
                    <select
                      className="form-select border-gray-100 rounded-md"
                      name="receiver_id"
                      required={true}
                    >
                      <option value="">Select</option>
                      {users?.length > 0 &&
                        users.map((u, i) => (
                          <option
                            key={i}
                            value={u?.id}
                          >{`${u.first} ${u.last} - ${u.role}`}</option>
                        ))}
                    </select>
                  </div>
                  <div className="mt-5 block">
                    <button className=" float-right px-3 py-2 bg-green-400 hover:bg-green-500 rounded-md">
                      Start Conversation
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UIRenderer;
