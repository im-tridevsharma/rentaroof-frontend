import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import ChatMessage from "../../ChatMessage";
import ChatUser from "../../ChatUser";

function ChatUI() {
  const messageBoxRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(false);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Tridev Sharma",
      type: "You have new message",
      message:
        "Hi, this is your message content. Please reply with your concern.",
      icon: "/icons/user-dashboard/man.png",
      time: Date.now(),
      online: false,
    },
    {
      id: 2,
      name: "Vikas Sharma",
      type: "You have new message",
      message:
        "Hi, this is your message content. Please reply with your concern.",
      icon: "/icons/user-dashboard/man.png",
      time: Date.now(),
      online: false,
    },
    {
      id: 3,
      name: "Mohit Pundhir",
      type: "About Property",
      message:
        "Hi, this is your message content. Please reply with your concern.",
      icon: "/icons/user-dashboard/man.png",
      time: Date.now(),
      online: true,
    },
    {
      id: 5,
      name: "Priya Jha",
      type: "3BHK with 2Bath attached",
      message:
        "Hi, this is your message content. Please reply with your concern.",
      icon: "/icons/user-dashboard/man.png",
      time: Date.now(),
      online: false,
    },
  ]);

  useEffect(() => {
    messageBoxRef.current &&
      messageBoxRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const startChat = (user) => {
    if (user) {
      setSelectedUser(user);
    }
  };

  const closeChat = () => {
    setSelectedUser(false);
  };

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
            users.map((user, i) => (
              <ChatUser
                onClick={() => startChat(user)}
                user={user}
                key={i}
                p={i}
                selected={selectedUser && selectedUser.id === user.id}
              />
            ))}
        </div>
      </div>
      {/**right side chats */}
      <div
        className="border-gray-300 p-2 w-full bg-gray-50"
        style={{ borderLeftWidth: "1px" }}
      >
        {selectedUser ? (
          <>
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
                  <span>{selectedUser.name}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      selectedUser.online ? "bg-green-400" : "bg-gray-400"
                    } ml-2`}
                  ></span>
                </p>
              </div>
              <span
                onClick={closeChat}
                className="p-1 bg-gray-300 cursor-pointer rounded-full text-white"
              >
                <MdClose />
              </span>
            </div>
            {/**chatscreen */}
            <div
              className="flex flex-col leading-4 relative"
              style={{ fontFamily: "Opensans-regular" }}
            >
              {/**chats */}
              <div
                className="py-2 overflow-hidden overflow-y-auto"
                style={{ height: "calc(425px)" }}
              >
                <span className="block text-center text-gray-400 mb-4 uppercase text-2xs mt-2">
                  Monday, 2 August
                </span>
                <ChatMessage />
                <ChatMessage reverse={true} />

                <div ref={messageBoxRef}></div>
              </div>
              {/**send box */}
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-grow mr-5 p-1 bg-gray-200 rounded-sm pr-2">
                  <input
                    type="text"
                    placeholder="Type your message here..."
                    autoFocus={true}
                    className="border-none w-full bg-transparent focus:ring-0 text-sm text-gray-500"
                  />
                  <img
                    src="/icons/user-dashboard/smile.png"
                    alt="emoji"
                    className="ml-2 w-5 h-5 object-contain cursor-pointer"
                    style={{ maxWidth: "20px" }}
                  />
                  <img
                    src="/icons/user-dashboard/attachment.png"
                    alt="attachment"
                    className="ml-2 w-5 h-5 object-contain cursor-pointer"
                    style={{ maxWidth: "20px" }}
                  />
                </div>
                <img
                  src="/icons/user-dashboard/send.png"
                  className="mr-1 w-6 h-6 object-contain cursor-pointer"
                  style={{ maxWidth: "24px" }}
                  alt="send"
                />
              </div>
            </div>
          </>
        ) : (
          <p
            className="flex justify-center text-gray-500"
            style={{
              fontFamily: "Opensans-semi-bold",
            }}
          >
            Select User to start a Conversation.
          </p>
        )}
      </div>
    </div>
  );
}

export default ChatUI;
