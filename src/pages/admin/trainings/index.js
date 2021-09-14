import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { FiAlertCircle, FiEdit, FiRefreshCw, FiTrash } from "react-icons/fi";
import getTrainings, { deleteTraining } from "../../../lib/trainings";
import { useDispatch } from "react-redux";
import Datatable from "../../../components/datatable";

function Index() {
  const [isLoading, setIsLoading] = useState(false);
  const [trainings, setTrainings] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getTrainings();
      if (response?.status) {
        setTrainings(response.data);
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
  const AllTraining = () => {
    return (
      <div className="flex items-center">
        {" "}
        <Link href="/admin/trainings/add">
          <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
            Add New
          </a>
        </Link>
        <button
          onClick={() => setIsRefresh(!isRefresh)}
          className="p-2 ml-2 bg-green-500 text-white rounded-lg hover:bg-green-400"
        >
          <FiRefreshCw className="text-lg" />
        </button>
      </div>
    );
  };

  const editPage = (id) => {
    if (id) {
      router.push(`/admin/trainings/${id}`);
    }
  };

  const delPage = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteTraining(id);
      if (response?.status) {
        setIsLoading(false);
        const new_trainings = trainings.filter(
          (item) => item.id !== response.data.id
        );
        setTrainings(new_trainings);
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>All Trainigns | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Trainings"
        subtitle="All Trainings"
        right={<AllTraining />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {trainings?.length ? (
          <Table pages={trainings} edit={editPage} del={delPage} />
        ) : (
          <p className="mt-5">No tranings found!</p>
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
      Header: "Description",
      accessor: "description",
    },
    {
      Header: "Type",
      accessor: "type",
    },
    {
      Header: "Users",
      accessor: "user_ids",
      Cell: (props) => {
        return <span>{props.value && JSON.parse(props.value).length}</span>;
      },
    },
    {
      Header: "Pdfs",
      accessor: "attachments",
      Cell: (props) => {
        return <span>{props.value && JSON.parse(props.value).length}</span>;
      },
    },
    {
      Header: "Videos",
      accessor: "video_urls",
      Cell: (props) => {
        return <span>{props.value && JSON.parse(props.value).length}</span>;
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
  return <Datatable columns={columns} data={pages} />;
};
