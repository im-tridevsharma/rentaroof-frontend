import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { getEnquiryById } from "../../../lib/enquiries";
import moment from "moment";

function View() {
  const [isLoading, setIsLoading] = useState(false);
  const [enquiry, setEnquiry] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const id = router.query.id;
      const response = await getEnquiryById(id);
      if (response?.status) {
        setEnquiry(response.data);
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

  const AllEnquiry = () => {
    return (
      <Link href="/admin/enquiries">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Enquiries
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>View Enquiry | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Enquiries"
        subtitle="View Enquiry"
        right={<AllEnquiry />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {enquiry && (
          <>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Name</small>
                <p>{enquiry?.name}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Email</small>
                <p>{enquiry?.email}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small className="text-blue-500">Mobile</small>
                <p>{enquiry?.mobile}</p>
              </div>
              <div className="flex flex-col my-1">
                <small className="text-blue-500">System IP</small>
                <p>{enquiry?.system_ip}</p>
              </div>
            </div>
            <div className="flex flex-col my-1">
              <small className="text-blue-500">Title</small>
              <p>{enquiry?.title}</p>
            </div>
            <div className="flex flex-col my-1">
              <small className="text-blue-500">Description</small>
              <p>{enquiry?.description}</p>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Created At</small>
                <p>
                  {enquiry?.created_at && moment(enquiry.created_at).fromNow()}
                </p>
              </div>
              <div className="flex flex-col my-3">
                <small className="text-blue-500">Updated At</small>
                <p>
                  {enquiry?.updated_at && moment(enquiry.updated_at).fromNow()}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default View;
