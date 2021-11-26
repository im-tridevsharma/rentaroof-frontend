import React from "react";
import moment from "moment";

function ChatUser({ user, p, onClick, selected, message }) {
  return (
    <div
      onClick={onClick}
      className="flex p-2 border-gray-200 cursor-pointer hover:bg-gray-50 hover:border-transparent"
      style={{
        borderTopWidth: p === 0 && "1px",
        borderBottomWidth: "1px",
        borderLeftWidth: "1px",
        borderRightWidth: "1px",
        backgroundColor: selected && "rgb(249, 250, 251)",
        borderColor: selected && "transparent",
      }}
    >
      <div className="-mt-1">
        <img
          src={user?.profile_pic || "/images/website/no_photo.png"}
          alt={user?.first}
          className="w-8 h-8 object-contain rounded-full"
          style={{ maxWidth: "32px" }}
        />
      </div>
      <div className="ml-2 flex-grow">
        <p
          style={{ fontFamily: "Opensans-semi-bold" }}
          className="flex items-center justify-between"
        >
          <span className="text-gray-600 flex items-center">
            {`${user?.first} ${user?.last}`}
            <span
              className={`w-2 h-2 rounded-full ${
                user?.is_logged_in ? "bg-green-400" : "bg-gray-400"
              } ml-2`}
            ></span>
          </span>
          <span className="text-gray-400">
            {moment(message?.created_at).format("hh:mma")}
          </span>
        </p>
        <p className="text-gray-400 text-xs mt-1 truncate w-52">
          {message?.message}
        </p>
        <p style={{ fontFamily: "Opensans-bold" }}>{user?.type}</p>
      </div>
    </div>
  );
}

export default ChatUser;
