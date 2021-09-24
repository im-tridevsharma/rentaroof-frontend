import React from "react";
import { MdClose } from "react-icons/md";
import ChatUser from "../../ChatUser";

function ChatUI() {
  const users = [
    {
      name: "Tridev Sharma",
      type: "You have new message",
      message:
        "Hi, this is your message content. Please reply with your concern.",
      icon: "/icons/user-dashboard/man.png",
      time: Date.now(),
      active: false,
    },
    {
      name: "Vikas Sharma",
      type: "You have new message",
      message:
        "Hi, this is your message content. Please reply with your concern.",
      icon: "/icons/user-dashboard/man.png",
      time: Date.now(),
      active: true,
    },
    {
      name: "Mohit Pundhir",
      type: "About Property",
      message:
        "Hi, this is your message content. Please reply with your concern.",
      icon: "/icons/user-dashboard/man.png",
      time: Date.now(),
      active: false,
    },
    {
      name: "Priya Jha",
      type: "3BHK with 2Bath attached",
      message:
        "Hi, this is your message content. Please reply with your concern.",
      icon: "/icons/user-dashboard/man.png",
      time: Date.now(),
      active: false,
    },
  ];

  return (
    <div
      className="flex shadow-sm border-gray-300 bg-white"
      style={{
        borderWidth: "1px",
        height: "545px",
        fontFamily: "Opensans-regular",
      }}
    >
      {/**left side user list */}
      <div className="flex flex-col max-w-xs w-full">
        {/**search bar */}
        <div
          className="flex items-center border-gray-300"
          style={{ borderBottomWidth: "1px" }}
        >
          <input
            type="text"
            className="border-none max-w-xs w-full mr-3 focus:ring-0 text-sm text-gray-700"
            placeholder="Search Conversation"
          />
          <img
            src="/icons/user-dashboard/search-icon.png"
            className="filter brightness-0 mr-4 w-4 h-4 object-contain cursor-pointer"
            alt="search"
          />
        </div>
        {/**user list */}
        <div
          className="flex flex-col py-4 px-2 overflow-hidden overflow-y-auto"
          style={{ height: "calc(100% - 30px)" }}
        >
          {users?.length > 0 &&
            users.map((user, i) => <ChatUser user={user} key={i} p={i} />)}
        </div>
      </div>
      {/**right side chats */}
      <div
        className="border-gray-300 p-2 w-full bg-gray-50"
        style={{ borderLeftWidth: "1px" }}
      >
        {/**select user tag */}
        <div
          className="p-2 bg-white rounded-sm border-gray-200 flex items-center justify-between"
          style={{ borderWidth: "1px" }}
        >
          <div className="flex items-center">
            <img
              src="/icons/user-dashboard/man.png"
              alt="user"
              className="w-8 h-8 object-contain"
              style={{ maxWidth: "32px" }}
            />
            <p className="ml-2 flex items-center">
              <span>James H</span>
              <span className="w-2 h-2 rounded-full bg-green-400 ml-2"></span>
            </p>
          </div>
          <span className="p-1 bg-gray-300 cursor-pointer rounded-full text-white">
            <MdClose />
          </span>
        </div>
        {/**chatscreen */}
        <div className="flex flex-col">
          {/**chats */}
          <div className="py-2"></div>
          {/**send box */}
        </div>
      </div>
    </div>
  );
}

export default ChatUI;
