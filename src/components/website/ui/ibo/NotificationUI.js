import moment from "moment";
import React from "react";
import { MdClose } from "react-icons/md";

function NotificationUI() {
  const notifications = [
    {
      title: "Notification for ibo title goes here",
      details: "Some details of your ibo notification",
      by: "John",
      date: Date.now(),
      type: "Normal",
    },
    {
      title: "New Property -5BHK at Pune for 4500",
      details: "Some details of your new complain 2",
      by: "John",
      date: Date.now(),
      type: "Urgent",
    },
    {
      title: "Notification 6 subject goes here",
      details: "Some details of your notification 6",
      by: "John",
      date: Date.now(),
      type: "Notification",
    },
  ];

  return (
    <div
      className="flex flex-col p-5 mt-5 bg-white border-gray-200 shadow-sm rounded-md"
      style={{ borderWidth: "1px", fontFamily: "Opensans-bold" }}
    >
      {notifications?.length > 0 &&
        notifications.map((c, i) => (
          <div
            className="relative flex flex-col sm:flex-row  justify-between py-3 pl-10 border-gray-400"
            style={{ borderTopWidth: i !== 0 && "1px" }}
            key={i}
          >
            <span className="p-1 rounded-md bg-gray-400 absolute top-3 left-0 cursor-pointer text-white">
              <MdClose />
            </span>
            <div className="flex flex-col items-start">
              <span
                className={`text-white px-2 rounded-md 
                    ${
                      c.type.toLowerCase() === "notification" && "bg-yellow-500"
                    }
                    ${c.type.toLowerCase() === "urgent" && "bg-green-500"}
                    ${c.type.toLowerCase() === "normal" && "bg-blue-500"}
                    `}
              >
                Notification
              </span>
              <p>{c.title}</p>
              <p
                style={{ fontFamily: "Opensans-regular" }}
                className="text-gray-500"
              >
                {c.details}
              </p>
              <b
                className="text-red-400"
                style={{
                  fontFamily: "Opensans-semi-bold",
                }}
              >
                By {c.by}
              </b>
            </div>
            <p
              style={{ fontFamily: "Opensans-regular" }}
              className="text-gray-500 flex items-start sm:mt-0 mt-1"
            >
              <img
                src="/icons/user-dashboard/time.png"
                alt="time"
                className="mr-1 object-contain h-5 w-5"
              />
              {moment(c.date).format("D MMM YYYY [at] hh:mm a")}
            </p>
          </div>
        ))}
    </div>
  );
}

export default NotificationUI;
