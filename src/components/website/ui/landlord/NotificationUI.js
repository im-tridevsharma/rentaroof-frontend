import moment from "moment";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { FiEye } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import {
  delLandlordNotification,
  getLandlordNotification,
  seenLandlordNotification,
} from "../../../../lib/frontend/share";
import Loader from "../../../loader";
import { __d } from "../../../../server";

function NotificationUI() {
  const [notifications, setNotifications] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [user, setUser] = React.useState(false);

  React.useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setUser(u);
    }

    const fetchNotifications = async () => {
      setIsLoading(true);
      const res = await getLandlordNotification();
      if (res?.status) {
        setNotifications(res?.data);
        setIsLoading(false);
      } else {
        console.error(res?.error || res.message);
        setIsLoading(false);
      }
    };

    fetchNotifications();

    if (
      typeof Echo !== "undefined" &&
      Echo.connector.options.auth.headers["Authorization"]
    ) {
      Echo.channel("notification").listen("NotificationSent", (e) => {
        if (e?.notification?.landlord_id === u?.id && u?.role === "landlord") {
          if (
            notifications.filter((n) => n.id === e?.notification?.id).length ===
            0
          ) {
          }
          setNotifications((prev) => [e.notification, ...prev]);
        }
      });
    }

    return () => {
      if (typeof Echo !== "undefined") {
        Echo.channel("notification").stopListening("NotificationSent");
      }
    };
  }, []);

  const delNotification = async (id) => {
    if (id) {
      setIsLoading(true);
      const res = await delLandlordNotification(id);
      if (res?.status) {
        const newn = notifications.filter((n) => n.id !== res?.data.id);
        setNotifications(newn);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error(res?.error || res?.message);
      }
    }
  };

  const markSeen = async (id) => {
    if (id) {
      setIsLoading(true);
      const res = await seenLandlordNotification(id);
      if (res?.status) {
        const newn = notifications.filter((n) => {
          if (n.id === id) {
            n.is_seen = 1;
          }
          return n;
        });
        setNotifications(newn);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error(res?.error || res?.message);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        className="flex flex-col p-5 mx-4 bg-white shadow-sm rounded-md"
        style={{ fontFamily: "Opensans-bold" }}
      >
        {notifications?.length > 0 ? (
          notifications.map((c, i) => (
            <div
              className={`relative flex flex-col sm:flex-row justify-between py-3 pl-10 border-gray-400 ${
                c?.is_seen ? "bg-white" : "bg-gray-50"
              }`}
              style={{ borderTopWidth: i !== 0 && "1px" }}
              key={i}
            >
              <span
                onClick={() => delNotification(c?.id)}
                className="p-1 rounded-md bg-gray-400 absolute top-3 left-1 cursor-pointer text-white"
                data-tip="Remove"
              >
                <MdClose />
                <ReactTooltip />
              </span>
              <div className="flex flex-col items-start">
                <div className="flex items-center">
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
                  <span
                    onClick={() => markSeen(c?.id)}
                    className="bg-green-500 rounded-md text-white ml-2 cursor-pointer"
                  >
                    {c?.redirect ? (
                      <Link href={c?.redirect}>
                        <a data-tip="View">
                          <FiEye />
                        </a>
                      </Link>
                    ) : (
                      <FiEye data-tip="Mark Read" />
                    )}
                    <ReactTooltip />
                  </span>
                </div>
                <p>{c?.title}</p>
                <p
                  style={{ fontFamily: "Opensans-regular" }}
                  className="text-gray-500"
                >
                  {c?.content}
                </p>
                <b
                  className="text-red-400"
                  style={{
                    fontFamily: "Opensans-semi-bold",
                  }}
                >
                  By {c?.name}
                </b>
              </div>
              <p
                style={{ fontFamily: "Opensans-regular" }}
                className="text-gray-500 flex items-start sm:mt-0 mt-1 pr-1"
              >
                <img
                  src="/icons/user-dashboard/time.png"
                  alt="time"
                  className="mr-1 object-contain h-5 w-5"
                />
                {moment(c?.created_at).format("D MMM YYYY [at] hh:mm a")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-red-500">No notifications found!</p>
        )}
      </div>
    </>
  );
}
export default dynamic(() => Promise.resolve(NotificationUI), { ssr: false });
