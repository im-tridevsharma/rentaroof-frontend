import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEdit, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../../components/datatable";
import SectionTitle from "../../../../components/section-title";
import getAmenities, { deleteAmenity } from "../../../../lib/amenities";
import Loader from "../../../../components/loader";
import ReactTooltip from "react-tooltip";

function Index() {
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getAmenities();
      if (response?.status) {
        setAmenities(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const editAmenity = (id) => {
    if (id) {
      router.push(`/admin/properties/amenities/${id}`);
    }
  };

  const delAmenity = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteAmenity(id);
      if (response?.id) {
        const newAmenities = amenities.filter(
          (item) => item.id !== response.id
        );
        setAmenities(newAmenities);
        setIsLoading(false);
      }
    }
  };

  const AddAmenity = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/properties/amenities/add">
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
        <title>Amenities | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Amenities"
        subtitle="All Amenities"
        right={<AddAmenity />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {amenities?.length ? (
          <Table amenities={amenities} edit={editAmenity} del={delAmenity} />
        ) : (
          <p className="mt-5">No amenities found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ amenities, edit, del }) => {
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
      Header: "Icon",
      accessor: "icon",
      Cell: (props) => {
        return props.value ? (
          <Image
            width={30}
            height={30}
            className="rounded-full object-contain"
            src={props.value}
          />
        ) : (
          "-"
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
  return <Datatable columns={columns} data={amenities} />;
};
