import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getMeetingById } from "../../../lib/meeting";
import moment from "moment";

function View() {
  const [isLoading, setIsLoading] = useState(false);
  const [meeting, setMeeting] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const id = router.query.id;
      const response = await getMeetingById(id);
      if (response?.status) {
        setMeeting(response.data);
        setIsLoading(false);
      } else {
        dispatch({
          type: "SET_CONFIG_KEY",
          key: "notification",
          value: {
            content:
              response?.error || response?.message || response?.exception,
            outerClassNames: "bg-red-400",
            innerClassNames: "",
            icon: <FiAlertCircle className="mr-2" />,
            animation: "",
            visible: true,
          },
        });
        setIsLoading(false);
      }
    })();
  }, []);

  const AllMeeting = () => {
    return (
      <Link href="/admin/meetings">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Meetings
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>View Meeting | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Meetings"
        subtitle="View Meeting"
        right={<AllMeeting />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {meeting && (
          <>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Title</small>
                <p>{meeting?.title}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Property</small>
                <p>{meeting?.property_id}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">User</small>
                <p>{meeting?.user_name}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">User Contact</small>
                <p>{meeting?.user_contact}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Created By</small>
                <p>{meeting?.created_by_name}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Status</small>
                <p>{meeting?.meeting_status}</p>
              </div>
            </div>
            <div className="flex flex-col my-1">
              <small className="text-blue-500">Description</small>
              <p>{meeting?.description}</p>
            </div>

            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Start Time</small>
                <p>
                  {meeting?.start_time &&
                    moment(meeting.start_time).format("DD-MM-YYYY hh:MM A")}
                </p>
              </div>
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Expected End Time</small>
                <p>
                  {meeting?.end_time_expected &&
                    moment(meeting.end_time_expected).format(
                      "DD-MM-YYYY hh:MM A"
                    )}
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Created At</small>
                <p>
                  {meeting?.created_at && moment(meeting.created_at).fromNow()}
                </p>
              </div>
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Updated At</small>
                <p>
                  {meeting?.updated_at && moment(meeting.updated_at).fromNow()}
                </p>
              </div>
            </div>
            <h5 className="text-red-400 my-2">Meeting history</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Action By</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {meeting?.meeting_history?.length > 0 &&
                  meeting.meeting_history.map((item, i) => (
                    <tr key={i}>
                      <td>{item.action}</td>
                      <td>{item.name}</td>
                      <td>{item.message}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}

export default View;
