import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getComplainById, updateComplainStatus } from "../../../lib/complains";
import moment from "moment";
import Router from "next/router";
import { toast, ToastContainer } from "react-toastify";

function View() {
  const [isLoading, setIsLoading] = useState(false);
  const [complain, setComplain] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const id = router.query.id;
      const response = await getComplainById(id);
      if (response?.status) {
        setComplain(response.data);
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

  const updateStatus = async () => {
    setIsLoading(true);
    const status = document.querySelector("#status").value;
    const id = Router.query.id;
    if (id && status) {
      const res = await updateComplainStatus(id, status);
      if (res?.status) {
        toast.success("Status updated successfully.");
        setIsLoading(false);
        setComplain(res?.data);
      } else {
        toast.error(res?.message || res?.error);
        setIsLoading(false);
      }
    } else {
      toast.error("Please select status to update.");
      setIsLoading(false);
    }
  };

  const AllComplain = () => {
    return (
      <Link href="/admin/complains">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Complains
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>View Complain | Rent a Roof</title>
      </Head>
      <ToastContainer />
      {isLoading && <Loader />}
      <SectionTitle
        title="Complains"
        subtitle="View Complain"
        right={<AllComplain />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {complain && (
          <>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Customer ID</small>
                <p>{complain?.customer_id}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Full Name</small>
                <p>{complain?.fullname}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Email</small>
                <p>{complain?.email_or_phone}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Subject</small>
                <p>{complain?.subject}</p>
              </div>
            </div>
            <div className="flex flex-col my-1">
              <small className="text-blue-500">Status</small>
              <p className="capitalize">{complain?.status}</p>
            </div>
            <div className="flex flex-col my-1">
              <small className="text-blue-500">Description</small>
              <p>{complain?.details}</p>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Created At</small>
                <p>
                  {complain?.created_at &&
                    moment(complain.created_at).fromNow()}
                </p>
              </div>
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Updated At</small>
                <p>
                  {complain?.updated_at &&
                    moment(complain.updated_at).fromNow()}
                </p>
              </div>
            </div>

            <h4 className="my-3">Update Status</h4>

            <div className="flex items-center">
              <div className="form-element">
                <label className="form-label">Select Status</label>
                <select className="form-select" id="status">
                  <option value="">Select</option>
                  <option value="waiting">Waiting</option>
                  <option value="reviewed">Reviewed</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <button
                className="px-3 py-2 rounded-md bg-blue-600 ml-5 mt-2"
                onClick={updateStatus}
              >
                Update
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default View;
