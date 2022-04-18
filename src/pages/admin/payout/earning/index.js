import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Loader from "../../../../components/loader";
import SectionTitle from "../../../../components/section-title";
import { FiAlertCircle, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import Datatable from "../../../../components/datatable";
import {
  getEarningPayouts,
  deleteEarningPayout,
} from "../../../../lib/payouts";
import ReactTooltip from "react-tooltip";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [earningPayouts, setEarningPayouts] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getEarningPayouts();
      if (response?.status) {
        setEarningPayouts(response.data);
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
    router.push("/admin/payout/earning/" + id);
  };

  const delEarningPayout = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteEarningPayout(id);
      if (response?.status) {
        setIsLoading(false);
        const new_earningPayouts = earningPayouts.filter(
          (item) => item.id !== response.data.id
        );
        setEarningPayouts(new_earningPayouts);
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
        data-tip="Refresh"
      >
        <FiRefreshCw className="text-lg" />
        <ReactTooltip />
      </button>
    );
  };

  return (
    <>
      <Head>
        <title>All Earning Payout Requests | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Payouts"
        subtitle="All Earning Payout Requests"
        right={<RefreshButton />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {earningPayouts?.length ? (
          <Table
            pages={earningPayouts}
            view={viewEnquiry}
            del={delEarningPayout}
          />
        ) : (
          <p className="mt-5">No Earning Payouts found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ pages, view, del }) => {
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
      Header: "Role",
      accessor: "role",
    },
    {
      Header: "Status",
      accessor: "payout_status",
    },
    {
      Header: "Txn Status",
      accessor: "transaction_status",
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
              data-tip="Remove"
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
