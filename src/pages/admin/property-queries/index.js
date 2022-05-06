import React, { useEffect, useState } from "react";
import { FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getQuiries, { deleteQuery } from "../../../lib/quiries";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";

function Index() {
  const [quiries, setQuiries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getQuiries();
      if (response?.status) {
        setQuiries(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const delQuery = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteQuery(id);
      if (response?.id) {
        const newQuiries = quiries.filter((item) => item.id !== response.id);
        setQuiries(newQuiries);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    }
  };

  const AddQuery = () => {
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
    <>
      {isLoading && <Loader />}
      <ReactTooltip />
      <SectionTitle
        title="Queries"
        subtitle="All Queries"
        right={<AddQuery />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {quiries?.length ? (
          <Table quiries={quiries} del={delQuery} />
        ) : (
          <p className="mt-5">No quiries found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ quiries, view, del }) => {
  const columns = [
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
      Header: "Property Type",
      accessor: "property_type",
    },
    {
      Header: "Society",
      accessor: "society_name",
    },
    {
      Header: "Message",
      accessor: "message",
      Cell: (props) => {
        return (
          <p data-tip={props.value}>
            {props?.value?.length > 50
              ? props.value.substring(0, 50) + "..."
              : props.value}
          </p>
        );
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
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={quiries} />;
};
