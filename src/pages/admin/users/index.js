import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getUsers, { deleteUser, getUserById } from "../../../lib/users";
import UserDetails from "../../../components/user-details";
import Loader from "../../../components/loader";

function Index() {
  const [users, setUsers] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getUsers();
      if (response?.status) {
        setIsLoading(false);
        setUsers(response.data);
      } else {
        router.push("/admin");
      }
    })();
  }, []);

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
      if (response?.id) {
        const newUsers = users.filter((item) => item.id !== response.id);
        setUsers(newUsers);
        setIsLoading(false);
      }
    }
  };

  const viewProfile = async (id) => {
    setIsLoading(true);
    const response = await getUserById(id);
    if (response?.status) {
      setUser(response.data);
      setShowDetail(true);
      setIsLoading(false);
    }
  };

  const AddUser = () => {
    return (
      <Link href="/admin/users/add">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          Add New
        </a>
      </Link>
    );
  };

  return (
    <div className="relative">
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

const Table = ({ users, edit, del, view }) => {
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
      Header: "Role",
      accessor: "role",
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
            <button
              onClick={() => view(props.value)}
              className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
            >
              <FiEye />
            </button>
          </>
        );
      },
    },
  ];
  return <Datatable columns={columns} data={users} />;
};
