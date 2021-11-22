import React from "react";
import moment from "moment";

function ChatMessage({ reverse, message, user }) {
  return (
    <div
      className={`flex items-center mb-2 ${
        reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="flex flex-col">
        <img
          src={user?.profile_pic || "/images/website/no_photo.png"}
          className="w-8 h-8 object-contain rounded-full"
          alt={user?.first}
        />
        <span className="text-gray-500 mt-1">
          {moment(message?.created_at).format("HH:mm")}
        </span>
      </div>
      <div
        className={`${reverse ? "mr-3" : "ml-3"} p-2 text-gray-500 ${
          reverse ? "bg-blue-100" : "bg-gray-200"
        } rounded-md max-w-md ${!reverse && "shadow-md"}`}
      >
        {/**text */}
        <p>{message?.message}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
