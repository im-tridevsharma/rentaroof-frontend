import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Datatable from "../../../components/datatable";
import getSos, { deleteSos } from "../../../lib/sos";
import ReactTooltip from "react-tooltip";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [sos, setSos] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getSos();
      if (response?.status) {
        setSos(response.data);
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

  const viewSos = (id) => {
    router.push("/admin/sos/" + id);
  };

  const delSos = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteSos(id);
      if (response?.status) {
        setIsLoading(false);
        const new_sos = sos.filter((item) => item.id !== response.data.id);
        setSos(new_sos);
      } else {
        setIsLoading(false);
      }
    }
  };

  const RefreshButton = () => {
    return (
      <button
        onClick={() => setIsRefresh(!isRefresh)}
        data-tip="Refresh"
        className="p-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
      >
        <FiRefreshCw className="text-lg" />
        <ReactTooltip />
      </button>
    );
  };

  return (
    <>
      <Head>
        <title>All Sos | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle title="Sos" subtitle="All Sos" right={<RefreshButton />} />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {sos?.length ? (
          <Table pages={sos} view={viewSos} del={delSos} />
        ) : (
          <p className="mt-5">No sos found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ pages, view, del }) => {
  const columns = [
    {
      Header: "User",
      accessor: "name",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Description",
      accessor: "sos_content",
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
      Header: "Status",
      accessor: "resolve_status",
      Cell: (props) => {
        return <span>{props.value?.toUpperCase()}</span>;
      },
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: (props) => {
        return (
          <>
            <button
              onClick={() => del(props.value)}
              data-tip="Remove"
              className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
            >
              <FiTrash />
            </button>
            <button
              onClick={() => view(props.value)}
              data-tip="View"
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
