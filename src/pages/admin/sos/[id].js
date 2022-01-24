import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle, FiCheck, FiRefreshCcw } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getSosById, updateSos } from "../../../lib/sos";
import moment from "moment";
import Alert from "../../../components/alerts";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import ReactTooltip from 'react-tooltip'

function View() {
  const [isLoading, setIsLoading] = useState(false);
  const [sos, setSos] = useState({});
  const [error, setError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [reload, setReload] = useState(false);
  const [formdata, setFormdata] = useState({
    status: "",
    message: "",
    _method: "PUT",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const id = router.query.id;
      const response = await getSosById(id);
      if (response?.status) {
        setSos(response.data);
        setFormdata((prev) => ({ ...prev, status: sos.resolve_status }));
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
  }, [reload]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    formdata._method = "PUT";
    if (formdata?.status === sos?.resolve_status || !formdata.status) {
      setError(true);
      setIsLoading(false);
      return false;
    } else {
      submitData(sos?.id, formdata);
    }
  };

  const submitData = async (id, data) => {
    if (id && data) {
      const response = await updateSos(id, data);
      if (response?.status) {
        setIsUpdated(true);
        setSos(response.data);
        setIsLoading(false);
        setFormdata({ status: "", message: "", _method: "PUT" });
      } else {
        setIsUpdated(false);
        setIsLoading(false);
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
      }
    }
  };

  const AllSos = () => {
    return (
      <Link href="/admin/sos">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Sos
        </a>
      </Link>
    );
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAP_API_KEY, 
  });

  return (
    <>
      <Head>
        <title>View Sos | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="Sos" subtitle="View Sos" right={<AllSos />} />
      {isUpdated && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            Status updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {sos && (
          <>
            <div className="grid sm:grid-cols-3">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Name</small>
                <p>{sos?.name}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Email</small>
                <p>{sos?.email}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Mobile</small>
                <p>{sos?.mobile}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Role</small>
                <p>{sos?.user_type?.toUpperCase()}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Status</small>
                <p>{sos?.resolve_status?.toUpperCase()}</p>
              </div>
            </div>
            <div className="flex flex-col my-1">
              <small className="text-blue-500">Description</small>
              <p>{sos?.sos_content}</p>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Number of Clicks</small>
                <p>{sos?.press_count}</p>
              </div>
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Created At</small>
                <p>{sos?.created_at && moment(sos.created_at).fromNow()}</p>
              </div>
            </div>

            <div className="my-3">
              <b className="flex">Current Location 
              <FiRefreshCcw data-tip="Refresh Location" className="ml-3 cursor-pointer"
               onClick={() => setReload(Math.random())}/>
               <ReactTooltip />
               </b>
              <div className="h-52 w-full rounded-md mt-2 overflow-hidden">
              {isLoaded && sos && (
                <GoogleMap
                  center={{lat: parseFloat(sos?.lat), lng: parseFloat(sos?.lng)}}
                  zoom={18}
                  mapContainerStyle={{ width: "100%", height: "100%" }}
                >
                  {sos?.lat && sos?.lng && (
                    <Marker
                      key={sos?.id}
                      position={{lat: parseFloat(sos?.lat), lng: parseFloat(sos?.lng)}}
                    ></Marker>
                  )}
                </GoogleMap>
              )}
              </div>
            </div>

            <h5 className="text-red-400">Status History</h5>
            <table className="table">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {sos?.status_history?.length > 0 &&
                  sos.status_history.map((item, i) => (
                    <tr key={i}>
                      <td>{item.status?.toUpperCase()}</td>
                      <td>{item.message}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h5 className="my-2 text-red-400">Update Status</h5>

            <form
              name="sos_status"
              className="table"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="grid sm:grid-cols-2 sm:space-x-2">
                <div className="form-element">
                  <div className="form-label">Select Status</div>
                  <select
                    name="status"
                    className="form-input"
                    value={formdata?.status ? formdata.status : ""}
                    onChange={(e) => {
                      setFormdata((prev) => ({
                        ...prev,
                        status: e.target.value,
                      }));
                      setError(false);
                    }}
                  >
                    <option value="pending">PENDING</option>
                    <option value="reviewed">REVIEWED</option>
                    <option value="working">WORKING</option>
                    <option value="resolved">RESOLVED</option>
                  </select>
                  {error && (
                    <span className="text-red-400 text-xs mt-1">
                      Plase change status to update.
                    </span>
                  )}
                </div>
                <div className="form-element">
                  <div className="form-label">Message</div>
                  <textarea
                    name="message"
                    className="form-input"
                    value={formdata?.message ? formdata.message : ""}
                    onChange={(e) => {
                      setFormdata((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }));
                    }}
                  ></textarea>
                </div>
              </div>
              <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}

export default View;
