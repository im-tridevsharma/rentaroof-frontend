import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle, FiEdit, FiRefreshCw, FiTrash } from "react-icons/fi";
import getFaqs, { deleteFaq } from "../../../lib/faqs";
import { useDispatch } from "react-redux";
import Datatable from "../../../components/datatable";
import ReactTooltip from "react-tooltip";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getFaqs();
      if (response?.status) {
        setFaqs(response.data);
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

  //all training button
  const AllFaq = () => {
    return (
      <div className="flex items-center">
        {" "}
        <Link href="/admin/faqs/add">
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

  const editFaq = (id) => {
    if (id) {
      router.push(`/admin/faqs/${id}`);
    }
  };

  const delFaq = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteFaq(id);
      if (response?.status) {
        setIsLoading(false);
        const new_faqs = faqs.filter((item) => item.id !== response.data.id);
        setFaqs(new_faqs);
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>All Faqs | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Faqs"
        subtitle={`All Faqs (${faqs.length})`}
        right={<AllFaq />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {faqs?.length ? (
          <Table pages={faqs} edit={editFaq} del={delFaq} />
        ) : (
          <p className="mt-5">No faqs found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ pages, edit, del }) => {
  const columns = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Type",
      accessor: "type",
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
  return <Datatable columns={columns} data={pages} />;
};
