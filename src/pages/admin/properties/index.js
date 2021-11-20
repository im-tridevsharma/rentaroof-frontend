import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FiAlertCircle,
  FiEye,
  FiInfo,
  FiRefreshCw,
  FiTrash,
} from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getProperties, { deleteProperty } from "../../../lib/properties";
import { useDispatch } from "react-redux";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";

function Index() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getProperties();
      if (response?.status) {
        setProperties(response.data);
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

  const viewPage = (id) => {
    if (id) {
      router.push(`/admin/properties/${id}?a=view`);
    }
  };

  const delProperty = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteProperty(id);
      if (response?.status) {
        setIsLoading(false);
        const newProperties = properties.filter(
          (item) => item.id !== response.data.id
        );
        setProperties(newProperties);
      }
    }
  };

  const AddProperty = () => {
    return (
      <div className="flex items-center">
        {/* <Link href="/admin/properties/add">
          <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
            Add New
          </a>
        </Link> */}
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
      <Head>
        <title>Properties | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Properties"
        subtitle="All Properties"
        right={<AddProperty />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {properties?.length ? (
          <Table properties={properties} view={viewPage} del={delProperty} />
        ) : (
          <p className="mt-5">No properties found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ properties, view, del }) => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
      Cell: (props) => {
        return (
          <p data-tip={props.value}>
            {props.value.length > 50
              ? props.value.substring(0, 50) + "..."
              : props.value}
          </p>
        );
      },
    },
    {
      Header: "Code",
      accessor: "property_code",
    },
    {
      Header: "Ownership Type",
      accessor: "ownership_type",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Status",
      accessor: "is_approved",
      Cell: (props) => {
        return props.value === 1 ? (
          <p className="text-green-600">Verified</p>
        ) : (
          <p className="text-red-600">Not Verified</p>
        );
      },
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: (props) => {
        return (
          <>
            {properties.filter((p) => p.id === props.value)[0].is_deleted ===
              1 && (
              <button
                onClick={() => view(props.value)}
                data-tip="Property Delete Requested"
                className="btn px-2 py-1 mr-2 bg-red-400 rounded-md hover:bg-red-500"
              >
                <FiInfo />
              </button>
            )}
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
              className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
            >
              <FiEye />
            </button>
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={properties} />;
};
