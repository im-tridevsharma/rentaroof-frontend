import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getComplains, { deleteComplain } from "../../../lib/complains";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";

function Index() {
  const [complains, setComplains] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getComplains();
      if (response?.status) {
        setComplains(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const viewComplain = (id) => {
    if (id) {
      router.push(`/admin/complains/${id}`);
    }
  };

  const delComplain = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteComplain(id);
      if (response?.id) {
        const newComplains = complains.filter(
          (item) => item.id !== response.id
        );
        setComplains(newComplains);
        setIsLoading(false);
      }
    }
  };

  const AddComplain = () => {
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
        title="Complains"
        subtitle={`All Complains (${complains.length})`}
        right={<AddComplain />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {complains?.length ? (
          <Table complains={complains} view={viewComplain} del={delComplain} />
        ) : (
          <p className="mt-5">No complains found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ complains, view, del }) => {
  const columns = [
    {
      Header: "Customer ID",
      accessor: "customer_id",
    },
    {
      Header: "Full Name",
      accessor: "fullname",
    },
    {
      Header: "Email",
      accessor: "email_or_phone",
    },
    {
      Header: "Status",
      accessor: "status",
      Cell: (props) => {
        return <p className="capitalize">{props.value}</p>;
      },
    },
    {
      Header: "Subject",
      accessor: "subject",
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
            <button
              data-tip="View"
              onClick={() => view(props.value)}
              className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
            >
              <FiEye />
            </button>
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={complains} />;
};
