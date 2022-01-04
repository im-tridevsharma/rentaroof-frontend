import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiEdit, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getLocations, { deleteLocation } from "../../../lib/locations";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";

function Index() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getLocations();
      if (response?.status) {
        setLocations(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const editLocation = (id) => {
    if (id) {
      router.push(`/admin/locations/${id}`);
    }
  };

  const delLocation = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteLocation(id);
      if (response?.id) {
        const newLocations = locations.filter((item) => item.id !== response.id);
        setLocations(newLocations);
        setIsLoading(false);
      }
    }
  };

  const AddLocation = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/locations/add">
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
      <SectionTitle title="Locations" subtitle="All Locations" right={<AddLocation />} />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {locations?.length ? (
          <Table locations={locations} edit={editLocation} del={delLocation} />
        ) : (
          <p className="mt-5">No locations found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ locations, edit, del }) => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "City",
      accessor: "city.name",
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
              data-tip="Edit"
              onClick={() => edit(props.value)}
              className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
            >
              <FiEdit />
            </button>
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={locations} />;
};
