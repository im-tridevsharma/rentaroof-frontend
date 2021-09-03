import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiEdit, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getCities, { deleteCity } from "../../../lib/cities";

function Index() {
  const [cities, setCities] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getCities();
      if (response) {
        setCities(response.data);
      } else {
        router.push("/admin");
      }
    })();
  }, []);

  const editCity = (id) => {
    if (id) {
      router.push(`/admin/cities/${id}`);
    }
  };

  const delCity = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      const response = await deleteCity(id);
      const newCities = cities.filter((item) => item.id !== response.id);
      setCities(newCities);
    }
  };

  const AddCity = () => {
    return (
      <Link href="/admin/cities/add">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          Add New
        </a>
      </Link>
    );
  };

  return (
    <>
      <SectionTitle title="Cities" subtitle="All Cities" right={<AddCity />} />
      <div className="bg-white px-2 py-3 rounded-lg border-gray-100 border-2">
        {cities?.length ? (
          <Table cities={cities} edit={editCity} del={delCity} />
        ) : (
          <p className="mt-5">No cities found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ cities, edit, del }) => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "State",
      accessor: "state.name",
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
  return <Datatable columns={columns} data={cities} />;
};
