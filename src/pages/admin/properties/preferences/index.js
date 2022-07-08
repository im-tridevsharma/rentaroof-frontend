import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEdit, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../../components/datatable";
import SectionTitle from "../../../../components/section-title";
import getPreferences, { deletePreference } from "../../../../lib/preferences";
import Loader from "../../../../components/loader";
import ReactTooltip from "react-tooltip";

function Index() {
  const [preferences, setPreferences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getPreferences();
      if (response?.status) {
        setPreferences(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const editPreference = (id) => {
    if (id) {
      router.push(`/admin/properties/preferences/${id}`);
    }
  };

  const delPreference = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deletePreference(id);
      if (response?.id) {
        const newPreferences = preferences.filter(
          (item) => item.id !== response.id
        );
        setPreferences(newPreferences);
        setIsLoading(false);
      }
    }
  };

  const AddPreference = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/properties/preferences/add">
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
      <Head>
        <title>Preferences | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Preferences"
        subtitle={`All Preferences (${preferences?.length})`}
        right={<AddPreference />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {preferences?.length ? (
          <Table
            preferences={preferences}
            edit={editPreference}
            del={delPreference}
          />
        ) : (
          <p className="mt-5">No preferences found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ preferences, edit, del }) => {
  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Description",
      accessor: "description",
      Cell: (props) => {
        return <p className="truncate w-128">{props.value}</p>;
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
              className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
              data-tip="Remove"
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
  return <Datatable columns={columns} data={preferences} />;
};
