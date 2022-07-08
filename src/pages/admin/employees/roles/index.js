import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiAlertCircle, FiEdit, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../../components/datatable";
import SectionTitle from "../../../../components/section-title";
import getRoles, { deleteRole } from "../../../../lib/roles";
import Loader from "../../../../components/loader";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";

function Index() {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getRoles();
      if (response?.status) {
        setRoles(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const editRole = (id) => {
    if (id) {
      router.push(`/admin/employees/roles/${id}`);
    }
  };

  const delRole = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteRole(id);
      if (response?.id) {
        const newRoles = roles.filter((item) => item.id !== response.id);
        setRoles(newRoles);
        setIsLoading(false);
      } else {
        dispatch({
          type: "SET_CONFIG_KEY",
          key: "notification",
          value: {
            content: response.message || response.exception,
            outerClassNames: "bg-red-400",
            innerClassNames: "",
            icon: <FiAlertCircle className="mr-2" />,
            animation: "",
            visible: true,
          },
        });
        setIsLoading(false);
        document.querySelector("#portal").scrollIntoView();
      }
    }
  };

  const AddRole = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/employees/roles/add">
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
        <title>Roles | Rent a Roof</title>
      </Head>
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Roles"
        subtitle={`All Roles (${roles.length})`}
        right={<AddRole />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {roles?.length ? (
          <Table roles={roles} edit={editRole} del={delRole} />
        ) : (
          <p className="mt-5">No roles found!</p>
        )}
      </div>
    </>
  );
}

export default Index;

const Table = ({ roles, edit, del }) => {
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
      Header: "Permissions",
      accessor: "permissions",
      Cell: (props) => {
        return (
          <span title={JSON.parse(props.value).toString()} className="truncate">
            {JSON.parse(props.value).toString().length > 25
              ? JSON.parse(props.value).toString().substring(0, 25) + "..."
              : JSON.parse(props.value).toString()}
          </span>
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
  return <Datatable columns={columns} data={roles} />;
};
