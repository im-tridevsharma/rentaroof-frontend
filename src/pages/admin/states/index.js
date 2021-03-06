import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiEdit, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getStates, { deleteState } from "../../../lib/states";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";

function Index() {
  const [states, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getStates();
      if (response?.status) {
        setStates(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const editState = (id) => {
    if (id) {
      router.push(`/admin/states/${id}`);
    }
  };

  const delState = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteState(id);
      if (response?.status) {
        const newStates = states.filter((item) => item.id !== response.data.id);
        setStates(newStates);
        setIsLoading(false);
      }
    }
  };

  const AddState = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/states/add">
          <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
            Add New
          </a>
        </Link>
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
    <>
      {isLoading && <Loader />}
      <ReactTooltip />
      <SectionTitle title="States" subtitle="All States" right={<AddState />} />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {states?.length ? (
          <Table states={states} edit={editState} del={delState} />
        ) : (
          <p className="mt-5">No states found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ states, edit, del }) => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Country",
      accessor: "country.name",
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
              onClick={() => edit(props.value)}
              data-tip="Edit"
              className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
            >
              <FiEdit />
            </button>
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={states} />;
};
