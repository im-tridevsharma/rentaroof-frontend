import React from "react";
import moment from "moment";
import Link from "next/link";

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
        {message?.message_type === "text" && <p>{message?.message}</p>}
        {message?.message_type === "deal" && (
          <div
            className="flex flex-col"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <h5
              className="text-lg flex items-center justify-between"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Deal Offered
              {moment(message?.deal?.offer_expires_time).isBefore(moment()) && (
                <span className="text-xs text-red-500">Expired</span>
              )}
            </h5>
            <div className="flex items-center mt-2">
              <Link
                href={`/details/properties/${message?.deal?.property?.property_code}`}
              >
                <a>
                  <img
                    src={message?.deal?.property?.front_image}
                    alt={message?.deal?.property?.name}
                    className="h-20 w-20 object-cover rounded-md mr-3"
                  />
                </a>
              </Link>
              <div>
                <p>{message?.deal?.property?.name}</p>
                <p>Actual Price: Rs. {message?.deal?.property?.monthly_rent}</p>
                <h5>Offer Price: Rs. {message?.deal?.offer_price}</h5>
                <p>
                  Expires at:{" "}
                  {moment(message?.deal?.offer_expires_time).format(
                    "DD/MM/YYY hh:mm a"
                  )}
                </p>
              </div>
            </div>
            <p className="mt-2">{message?.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
