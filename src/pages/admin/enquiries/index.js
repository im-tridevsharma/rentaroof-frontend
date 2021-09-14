import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Datatable from "../../../components/datatable";
import getEnquiries, { deleteEnquiry } from "../../../lib/enquiries";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [enquiries, setEnquiries] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getEnquiries();
      if (response?.status) {
        setEnquiries(response.data);
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
  }, [isRefresh]);

  const viewEnquiry = (id) => {
    router.push("/admin/enquiries/" + id);
  };

  const delEnquiry = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteEnquiry(id);
      if (response?.status) {
        setIsLoading(false);
        const new_enquiries = enquiries.filter(
          (item) => item.id !== response.data.id
        );
        setEnquiries(new_enquiries);
      } else {
        setIsLoading(false);
      }
    }
  };

  const RefreshButton = () => {
    return (
      <button
        onClick={() => setIsRefresh(!isRefresh)}
        className="p-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
      >
        <FiRefreshCw className="text-lg" />
      </button>
    );
  };

  return (
    <>
      <Head>
        <title>All Enquiries | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Enquiries"
        subtitle="All Enquiries"
        right={<RefreshButton />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {enquiries?.length ? (
          <Table pages={enquiries} view={viewEnquiry} del={delEnquiry} />
        ) : (
          <p className="mt-5">No enquiries found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ pages, view, del }) => {
  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (props) => {
        return (
          <p>
            {props.value.length <= 40
              ? props.value
              : props.value.substring(0, 40) + "..."}
          </p>
        );
      },
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Mobile",
      accessor: "mobile",
    },
    {
      Header: "User IP",
      accessor: "system_ip",
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: (props) => {
        return (
          <>
            <button
              onClick={() => del(props.value)}
              className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
            >
              <FiTrash />
            </button>
            <button
              onClick={() => view(props.value)}
              className="btn px-2 py-1 ml-2 bg-blue-400 rounded-md hover:bg-blue-500"
            >
              <FiEye />
            </button>
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={pages} />;
};
