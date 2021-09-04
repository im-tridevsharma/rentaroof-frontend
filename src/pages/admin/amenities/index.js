import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { FiEdit, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getAmenities, { deleteAmenity } from "../../../lib/amenities";

function Index() {
  const [amenities, setAmenities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getAmenities();
      if (response?.status) {
        setAmenities(response.data);
      }
    })();
  }, []);

  const editAmenity = (id) => {
    if (id) {
      router.push(`/admin/amenities/${id}`);
    }
  };

  const delAmenity = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      const response = await deleteAmenity(id);
      const newAmenities = amenities.filter((item) => item.id !== response.id);
      setAmenities(newAmenities);
    }
  };

  const AddAmenity = () => {
    return (
      <Link href="/admin/amenities/add">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          Add New
        </a>
      </Link>
    );
  };

  return (
    <>
      <SectionTitle
        title="Amenities"
        subtitle="All Amenities"
        right={<AddAmenity />}
      />
      <div className="bg-white px-2 py-3 rounded-lg border-gray-100 border-2">
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
            >
              <FiTrash />
            </button>
            <button
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
  return <Datatable columns={columns} data={amenities} />;
};
