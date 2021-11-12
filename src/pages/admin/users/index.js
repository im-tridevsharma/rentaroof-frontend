import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEdit, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getUsers, {
  activateUserProfile,
  banUserProfile,
  deleteUser,
  getUserById,
} from "../../../lib/users";
import UserDetails from "../../../components/user-details";
import Loader from "../../../components/loader";
import { __d } from "../../../server";
import ReactTooltip from "react-tooltip";
import { toast, ToastContainer } from "react-toastify";
import { FaBan, FaCheck } from "react-icons/fa";

function Index() {
  const [users, setUsers] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getUsers();
      if (response?.status) {
        setIsLoading(false);
        setUsers(__d(response.data, true));
      } else {
        router.push("/admin");
      }
    })();
  }, [isRefresh]);

  const editUser = (id) => {
    if (id) {
      router.push(`/admin/users/${id}`);
    }
  };

  const delUser = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteUser(id);
      if (response?.status) {
        const data = __d(response.data, true);
        const newUsers = users.filter((item) => item.id !== data.id);
        setUsers(newUsers);
        setIsLoading(false);
      }
    }
  };

  const viewProfile = async (id) => {
    setIsLoading(true);
    const response = await getUserById(id);
    if (response?.status) {
      setUser(__d(response.data, true));
      setShowDetail(true);
      setIsLoading(false);
    }
  };

  const banUser = async (id) => {
    setIsLoading(true);
    const res = await banUserProfile(id);
    if (res?.status) {
      setIsLoading(false);
      setUsers(users.map((u) => (u?.id === res?.data?.id ? res?.data : u)));
      toast.success(`User ${res?.data.first} has been banned successfully.`);
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  const activateUser = async (id) => {
    setIsLoading(true);
    const res = await activateUserProfile(id);
    if (res?.status) {
      setIsLoading(false);
      setUsers(users.map((u) => (u?.id === res?.data?.id ? res?.data : u)));
      toast.success(`User ${res?.data.first} has been activated successfully.`);
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  const AddUser = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/users/add">
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
    <div className="relative">
      <ReactTooltip />
      <ToastContainer />
      <Head>
        <title>Users | Rent a Roof</title>
      </Head>
      {showDetail && (
        <UserDetails
          title="User Details"
          subtitle="All the information of user."
          user={user}
          address={user?.address}
          toggle={setShowDetail}
        />
      )}
      <SectionTitle title="Users" subtitle="All Users" right={<AddUser />} />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {users?.length ? (
          <Table
            users={users}
            edit={editUser}
            del={delUser}
            view={viewProfile}
            ban={banUser}
            activate={activateUser}
          />
        ) : (
          <p className="mt-5">No users found!</p>
        )}
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default Index;

const Table = ({ users, edit, del, view, ban, activate }) => {
  const columns = [
    {
      Header: "Proile Pic",
      accessor: "profile_pic",
      Cell: (props) => {
        return props.value ? (
          <Image
            width={40}
            height={40}
            className="rounded-full object-contain"
            src={props.value}
          />
        ) : (
          "-"
        );
      },
    },
    {
      Header: "Name",
      accessor: "first",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Mobile",
      accessor: "mobile",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Registered On",
      accessor: "created_at",
      Cell: (props) => {
        return <span>{new Date(props.value).toDateString()}</span>;
      },
    },
    {
      Header: "Account Status",
      accessor: "account_status",
      Cell: (props) => {
        return props.value === "activated" ? (
          <span className="px-1 text-xs bg-green-400 rounded-full uppercase">
            Activated
          </span>
        ) : (
          <span className="px-1 text-xs bg-red-400 rounded-full uppercase">
            {props.value}
          </span>
        );
      },
    },
    {
      Header: "Status",
      accessor: "is_logged_in",
      Cell: (props) => {
        return props.value === 1 ? (
          <span className="px-1 text-xs bg-green-400 rounded-full">Online</span>
        ) : (
          <span className="px-1 text-xs bg-red-400 rounded-full">Offline</span>
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
            <button
              onClick={() => view(props.value)}
              data-tip="View"
              className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
            >
              <FiEye />
            </button>
            {users?.filter((u) => u.id === parseInt(props.value))[0]
              ?.account_status !== "banned" ? (
              <button
                onClick={() => ban(props.value)}
                data-tip="Ban USER"
                className="ml-2 btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
              >
                <FaBan />
              </button>
            ) : (
              <button
                onClick={() => activate(props.value)}
                data-tip="Activate USER"
                className="ml-2 btn px-2 py-1 bg-green-400 rounded-md hover:bg-green-500 text-white"
              >
                <FaCheck />
              </button>
            )}
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={users} />;
};
