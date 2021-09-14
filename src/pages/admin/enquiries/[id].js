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
                <small>Name</small>
                <p className="text-lg">{enquiry?.name}</p>
              </div>
              <div className="flex flex-col my-1">
                <small>Email</small>
                <p className="text-lg">{enquiry?.email}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-1">
                <small>Mobile</small>
                <p className="text-lg">{enquiry?.mobile}</p>
              </div>
              <div className="flex flex-col my-1">
                <small>System IP</small>
                <p className="text-lg">{enquiry?.system_ip}</p>
              </div>
            </div>
            <div className="flex flex-col my-1">
              <small>Title</small>
              <p className="text-lg">{enquiry?.title}</p>
            </div>
            <div className="flex flex-col my-1">
              <small>Description</small>
              <p className="text-lg">{enquiry?.description}</p>
            </div>
            <hr className="mt-2" />
            <div className="grid sm:grid-cols-2">
              <div className="flex flex-col my-3">
                <small>Created At</small>
                <p className="text-lg">
                  {enquiry?.created_at && moment(enquiry.created_at).fromNow()}
                </p>
              </div>
              <div className="flex flex-col my-3">
                <small>Updated At</small>
                <p className="text-lg">
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
