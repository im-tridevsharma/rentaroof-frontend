import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiCheck, FiEdit, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import SectionTitle from "../../../components/section-title";
import getUsers, {
  activateUserProfile,
  banUserProfile,
  bulkActionUsers,
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
  const [selected, setSelected] = useState([]);
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
        <div className="mr-5">
          <select className="form-select" onChange={performAction}>
            <option value="">Bulk Action</option>
            <option value="mark-activated">Mark Activated</option>
            <option value="mark-banned">Mark Banned</option>
            <option value="mark-deactivated">Deactivate</option>
            <option value="mark-not-verified">Mark Not Verified</option>
            <option value="remove">Remove</option>
          </select>
        </div>
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

  const selectUser = (e, value) => {
    if (e?.target?.checked) {
      setSelected((prev) => [...prev, value]);
    } else {
      setSelected((prev) => prev.filter((s) => s !== value));
    }
  };

  const performAction = async (e) => {
    if (e.target.value) {
      if (selected.length > 0) {
        setIsLoading(true);
        const res = await bulkActionUsers({
          action: e.target.value,
          ids: selected,
        });
        if (res?.status) {
          toast.success(res.message);
          setIsLoading(false);
          setIsRefresh(!isRefresh);
        } else {
          toast.error(res?.message);
          setIsLoading(false);
        }
      } else {
        toast.warn("Please select users to perform bulk action.");
      }
    }
  };

  const toggleSelect = (e) => {
    if (e.target.checked) {
      users.forEach((u) => {
        setSelected((prev) => [...prev, u?.id]);
      });
    } else {
      setSelected([]);
    }
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
          kyc={user?.kyc}
          address={user?.address}
          toggle={setShowDetail}
        />
      )}
      <SectionTitle
        title="Users"
        subtitle={"All Users (" + users?.length + ")"}
        right={<AddUser />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleSelect}
                  checked={selected?.length > 0}
                />
              </th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Account Status</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length > 0 ? (
              users?.map((p, i) => (
                <tr
                  key={i}
                  className={`${
                    p?.account_status === "not-verified" && "bg-yellow-50"
                  } ${p?.account_status === "de-activated" && "bg-red-50"} ${
                    p?.account_status === "activated" && "bg-green-50"
                  }  ${p?.account_status === "banned" && "bg-red-100"}
                  ${p?.account_status === "deactivated" && "bg-yellow-200"}`}
                >
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => selectUser(e, p?.id)}
                      checked={selected.indexOf(p?.id) !== -1}
                    />
                  </td>
                  <td className="">
                    {p?.first} {p?.last}
                  </td>
                  <td>
                    {p?.email_verified === 1 && (
                      <FiCheck
                        data-tip="Email Verified"
                        className="text-green-600 text-lg mr-2"
                      />
                    )}
                    {p?.email}
                  </td>
                  <td>
                    {p?.mobile_verified === 1 && (
                      <FiCheck
                        data-tip="Mobile Verified"
                        className="text-green-600 text-lg mr-2"
                      />
                    )}
                    {p?.mobile}
                  </td>
                  <td>{p?.gender}</td>
                  <td>{p?.account_status}</td>
                  <td>{p?.is_logged_in === 1 ? "Online" : "Offline"}</td>
                  <td>
                    <button
                      onClick={() => delUser(p?.id)}
                      data-tip="Remove"
                      className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
                    >
                      <FiTrash />
                    </button>
                    <button
                      onClick={() => viewProfile(p?.id)}
                      data-tip="View"
                      className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => editUser(p?.id)}
                      data-tip="Edit"
                      className="ml-2 btn px-2 py-1 bg-green-400 rounded-md hover:bg-green-500"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => banUser(p?.id)}
                      data-tip="Ban"
                      className="ml-2 btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
                    >
                      <FaBan />
                    </button>
                    <button
                      onClick={() => activateUser(p?.id)}
                      data-tip="Activate"
                      className="ml-2 btn px-2 py-1 bg-green-400 rounded-md hover:bg-green-500"
                    >
                      <FaCheck />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>No users found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default Index;
