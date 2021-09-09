import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiAlertCircle, FiEdit, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getPages, { deletePage } from "../../../lib/pages";
import { useDispatch } from "react-redux";
import Loader from "../../../components/loader";

function Index() {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getPages();
      if (response?.status) {
        setPages(response.data);
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
  }, []);

  const editPage = (id) => {
    if (id) {
      router.push(`/admin/pages/${id}`);
    }
  };

  const delPage = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deletePage(id);
      if (response?.status) {
        setIsLoading(false);
        const newPages = pages.filter((item) => item.id !== response.data.id);
        setPages(newPages);
      }
    }
  };

  const AddPage = () => {
    return (
      <Link href="/admin/pages/add">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          Add New
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Pages | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="Pages" subtitle="All Pages" right={<AddPage />} />
      <div className="bg-white px-2 py-3 rounded-lg border-gray-100 border-2">
        {pages?.length ? (
          <Table pages={pages} edit={editPage} del={delPage} />
        ) : (
          <p className="mt-5">No pages found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ pages, edit, del }) => {
  const columns = [
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Slug",
      accessor: "slug",
    },
    {
      Header: "Parent",
      accessor: "parent",
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
  return <Datatable columns={columns} data={pages} />;
};
