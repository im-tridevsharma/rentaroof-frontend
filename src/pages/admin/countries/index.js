import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiEdit, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getCountries, { deleteCountry } from "../../../lib/countries";

function Index() {
  const [countries, setCountries] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getCountries();
      if (response) {
        setCountries(response.data);
      } else {
        router.push("/admin");
      }
    })();
  }, []);

  const editCountry = (id) => {
    if (id) {
      router.push(`/admin/countries/${id}`);
    }
  };

  const delCountry = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      const response = await deleteCountry(id);
      const newCountries = countries.filter((item) => item.id !== response.id);
      setCountries(newCountries);
    }
  };

  const AddCountry = () => {
    return (
      <Link href="/admin/countries/add">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          Add New
        </a>
      </Link>
    );
  };

  return (
    <>
      <SectionTitle
        title="Countries"
        subtitle="All Countries"
        right={<AddCountry />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {countries?.length ? (
          <Table countries={countries} edit={editCountry} del={delCountry} />
        ) : (
          <p className="mt-5">No countries found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ countries, edit, del }) => {
  const columns = [
    {
      Header: "Code",
      accessor: "code",
    },
    {
      Header: "Name",
      accessor: "name",
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
  return <Datatable columns={columns} data={countries} />;
};
