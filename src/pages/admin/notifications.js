import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEye, FiRefreshCw } from "react-icons/fi";
import SectionTitle from "../../components/section-title";
import Loader from "../../components/loader";
import ReactTooltip from "react-tooltip";
import {
  getAdminNotification,
  seenAdminNotification,
  delAdminNotification,
} from "../../lib/authentication";
import moment from "moment";
import { MdClose } from "react-icons/md";
import { shallowEqual, useSelector } from "react-redux";

function Index() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();

  const { config } = useSelector(
    (state) => ({
      config: state.config,
    }),
    shallowEqual
  );
  const { user } = { ...config };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getAdminNotification(false);
      if (response?.status) {
        setIsLoading(false);
        setNotifications(response?.data);
      } else {
        router.push("/admin");
      }
    })();
  }, [isRefresh]);

  useEffect(() => {
    if (typeof Echo !== "undefined") {
      if (Echo.connector.options.auth.headers["Authorization"]) {
        Echo.private("admin").listen("AdminNotificationSent", (e) => {
          if (user?.role === "admin") {
            if (e?.notification?.id) {
              setNotifications((prev) => [e.notification, ...prev]);
            }
          }
        });
      }
    }
  }, []);

  const delNotification = async (id) => {
    if (id) {
      setIsLoading(true);
      const res = await delAdminNotification(id);
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
      const res = await seenAdminNotification(id);
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

  const Reload = () => {
    return (
      <div className="flex items-center">
        <button
          onClick={() => setIsRefresh(!isRefresh)}
          data-tip="Refresh"
          className="p-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
        >
          <FiRefreshCw className="text-lg" />
          <ReactTooltip />
        </button>
      </div>
    );
  };

  return (
    <div className="relative">
      <ReactTooltip />
      <Head>
        <title>Notifications | Rent a Roof</title>
      </Head>
      <SectionTitle
        title="Notifications"
        subtitle="Manage Notifications"
        right={<Reload />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {notifications?.length ? (
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
                  By RentARoof
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
          <p className="mt-5">No notifications found!</p>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default Index;
