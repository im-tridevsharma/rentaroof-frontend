import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Datatable from "../../../components/datatable";
import getMeeting, { deleteMeeting } from "../../../lib/meeting";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [meeting, setMeeting] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getMeeting();
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
  }, [isRefresh]);

  const viewMeeting = (id) => {
    router.push("/admin/meetings/" + id);
  };

  const delMeeting = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteMeeting(id);
      if (response?.status) {
        setIsLoading(false);
        const new_meeting = meeting.filter(
          (item) => item.id !== response.data.id
        );
        setMeeting(new_meeting);
      } else {
        setIsLoading(false);
      }
    }
  };

  const RefreshButton = () => {
    return (
      <button
        onClick={() => setIsRefresh(!isRefresh)}
        title="Refresh"
        className="p-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
      >
        <FiRefreshCw className="text-lg" />
      </button>
    );
  };

  return (
    <>
      <Head>
        <title>All Meeting | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Meeting"
        subtitle="All Meeting"
        right={<RefreshButton />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {meeting?.length ? (
          <Table pages={meeting} view={viewMeeting} del={delMeeting} />
        ) : (
          <p className="mt-5">No meeting found!</p>
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
    },
    {
      Header: "User",
      accessor: "user_name",
    },
    {
      Header: "Property",
      accessor: "property_id",
    },
    {
      Header: "Created By",
      accessor: "created_by_name",
    },
    {
      Header: "Created By Role",
      accessor: "created_by_role",
    },
    {
      Header: "Status",
      accessor: "meeting_status",
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
