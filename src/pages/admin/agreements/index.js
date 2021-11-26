import React, { useEffect, useState } from "react";
import { FiEye, FiRefreshCw } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import Loader from "../../../components/loader";
import { getAgreements } from "../../../lib/properties";
import moment from "moment";
import ReactTooltip from "react-tooltip";

function Index() {
  const [agreements, setAgreements] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getAgreements();
      if (response?.status) {
        setAgreements(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const AddCity = () => {
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
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Agreements"
        subtitle="All Agreements"
        right={<AddCity />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {agreements?.length ? (
          <Table agreements={agreements} />
        ) : (
          <p className="mt-5">No agreements found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ agreements }) => {
  const columns = [
    {
      Header: "Title",
      accessor: "title",
      Cell: (props) => {
        return (
          <p data-tip={props.value}>
            {props.value.length > 30
              ? props.value.substring(0, 30) + "..."
              : props.value}
          </p>
        );
      },
    },
    {
      Header: "Property Name",
      accessor: "property_data.name",
      Cell: (props) => {
        return (
          <p data-tip={props.value}>
            {props.value?.length > 30
              ? props.value.substring(0, 30) + "..."
              : props.value}
          </p>
        );
      },
    },
    {
      Header: "Property Code",
      accessor: "property_data.property_code",
    },
    {
      Header: "Landlord",
      accessor: "landlord.first",
    },
    {
      Header: "Tenant",
      accessor: "tenant.first",
    },
    {
      Header: "Ibo",
      accessor: "ibo.first",
    },
    {
      Header: "Start Date",
      accessor: "start_date",
      Cell: (props) => {
        return <p>{moment(props.value).format("DD-MM-YYYY")}</p>;
      },
    },
    {
      Header: "Action",
      accessor: "agreement_url",
      Cell: (props) => {
        return (
          <a
            href={props?.value}
            target="_blank"
            data-tip="View Agreement"
            className="px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500 flex w-7"
          >
            <FiEye />
          </a>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={agreements} />;
};
