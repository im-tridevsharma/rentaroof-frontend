import React from "react";

function ChatMessage({ reverse }) {
  return (
    <div
      className={`flex items-center mb-2 ${
        reverse ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="flex flex-col">
        <img
          src="/icons/user-dashboard/man.png"
          className="w-8 h-8 object-contain rounded-full"
          alt="user"
        />
        <span className="text-gray-500 mt-1">24:44</span>
      </div>
      <div
        className={`${reverse ? "mr-3" : "ml-3"} p-2 text-gray-500 ${
          reverse ? "bg-blue-100" : "bg-gray-200"
        } rounded-md max-w-md ${!reverse && "shadow-md"}`}
      >
        {/**text */}
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content.
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
