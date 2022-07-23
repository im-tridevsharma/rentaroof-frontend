import React from "react";
import moment from "moment";
import Link from "next/link";
import { __d } from "../../server";
import { changeDealStatus, closeDeal } from "../../lib/frontend/share";
import Loader from "../loader";

function ChatMessage({ reverse, message, user, conversationId }) {
  const [liu, setLiu] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [chatMessage, setChatMessage] = React.useState(message);

  React.useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setLiu(u);
    }
  }, []);

  const updateDealStatus = async (id, status) => {
    if (id && status) {
      setIsLoading(true);
      const res = await changeDealStatus(id, { status, conversationId });
      if (res?.status) {
        setIsLoading(false);
        setChatMessage((prev) => ({ ...prev, deal: res?.data }));
      } else {
        setIsLoading(false);
        console.log(res?.error || res?.chatMessage);
      }
    }
  };

  const closeDealNow = async (id) => {
    if (id) {
      setIsLoading(true);
      const res = await closeDeal(id, conversationId);
      if (res?.status) {
        setIsLoading(false);
        setChatMessage((prev) => ({ ...prev, deal: res?.data }));
      } else {
        setIsLoading(false);
        console.log(res?.error || res?.chatMessage);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
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
            {moment(chatMessage?.created_at).format("HH:mm")}
          </span>
        </div>
        <div
          className={`${reverse ? "mr-3" : "ml-3"} p-2 text-gray-500 ${
            reverse ? "bg-blue-100" : "bg-gray-200"
          } rounded-md max-w-md ${!reverse && "shadow-md"}`}
        >
          {/**text */}
          {chatMessage?.message_type === "text" &&
            chatMessage?.isHtml === "no" && <p>{chatMessage?.message}</p>}
          {chatMessage?.message_type === "text" &&
            chatMessage?.isHtml === "yes" && (
              <div
                dangerouslySetInnerHTML={{ __html: chatMessage?.message }}
              ></div>
            )}
          {chatMessage?.message_type === "deal" && (
            <div
              className="flex flex-col"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <h5
                className="text-lg flex items-center justify-between"
                style={{ fontFamily: "Opensans-bold" }}
              >
                Deal Offered
                {moment(chatMessage?.deal?.offer_expires_time).isBefore(
                  moment()
                ) &&
                  chatMessage?.deal?.status === "pending" && (
                    <span className="text-xs text-red-500">Expired</span>
                  )}
                {chatMessage?.deal?.offer_for === liu?.id &&
                chatMessage?.deal?.status === "pending" &&
                !chatMessage?.deal?.is_closed ? (
                  <div>
                    <button
                      onClick={() =>
                        updateDealStatus(chatMessage?.deal?.id, "accepted")
                      }
                      className="px-2 py-1 rounded-md bg-green-500 text-xs text-white"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() =>
                        updateDealStatus(chatMessage?.deal?.id, "rejected")
                      }
                      className="px-2 py-1 rounded-md bg-red-500 ml-2 text-xs text-white"
                    >
                      Reject
                    </button>
                  </div>
                ) : !chatMessage?.deal?.is_closed ? (
                  <span
                    className={`capitalize text-xs ${
                      chatMessage?.deal?.status === "accepted"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {chatMessage?.deal?.status}
                  </span>
                ) : (
                  <span className="text-red-500 text-xs">Closed</span>
                )}
                {chatMessage?.deal?.created_by === liu?.id &&
                  !chatMessage?.deal?.is_closed &&
                  chatMessage?.deal?.status === "pending" && (
                    <div>
                      <button
                        onClick={() => closeDealNow(chatMessage?.deal?.id)}
                        className="px-2 py-1 rounded-md bg-red-500 ml-2 text-xs text-white"
                      >
                        Close
                      </button>
                    </div>
                  )}
                {chatMessage?.deal?.property?.posted_by === liu?.id &&
                  chatMessage?.deal?.status === "accepted" &&
                  !chatMessage?.deal?.is_closed && (
                    <Link
                      href={`/${liu?.role}/appointment?deal=${chatMessage?.deal?.id}`}
                    >
                      <a className="text-green-500 text-xs">Create Agreement</a>
                    </Link>
                  )}
              </h5>
              <div className="flex items-center mt-2">
                <Link
                  href={`/details/properties/${chatMessage?.deal?.property?.property_code}`}
                >
                  <a>
                    <img
                      src={chatMessage?.deal?.property?.front_image}
                      alt={chatMessage?.deal?.property?.name}
                      className="h-20 w-20 object-cover rounded-md mr-3"
                    />
                  </a>
                </Link>
                <div>
                  <p>{chatMessage?.deal?.property?.name}</p>
                  <p>
                    Actual Price: Rs.{" "}
                    {chatMessage?.deal?.property?.monthly_rent}
                  </p>
                  <h5>Offer Price: Rs. {chatMessage?.deal?.offer_price}</h5>
                </div>
              </div>
              <p className="mt-2">{chatMessage?.message}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatMessage;
