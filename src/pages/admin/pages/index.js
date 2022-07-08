import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiAlertCircle, FiEdit, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getPages, { deletePage } from "../../../lib/pages";
import { useDispatch } from "react-redux";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";

function Index() {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
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
  }, [isRefresh]);

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
      <div className="flex items-center">
        <Link href="/admin/pages/add">
          <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
            Add New
          </a>
        </Link>
        <button
          onClick={() => setIsRefresh(!isRefresh)}
          className="p-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
          data-tip="Refresh"
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
        <title>Pages | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Pages"
        subtitle={`All Pages (${pages.length})`}
        right={<AddPage />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
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
      Cell: (props) => {
        return (
          <p data-tip={props.value}>
            {props.value.length <= 50
              ? props.value
              : props.value.substring(0, 50) + "..."}
          </p>
        );
      },
    },
    {
      Header: "Slug",
      accessor: "slug",
      Cell: (props) => {
        return (
          <p data-tip={props.value}>
            {props.value.length <= 30
              ? props.value
              : props.value.substring(0, 30) + "..."}
          </p>
        );
      },
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
              data-tip="Remove"
              className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
            >
              <FiTrash />
            </button>
            <button
              onClick={() => edit(props.value)}
              data-tip="View"
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
