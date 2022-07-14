import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiEdit,
  FiEye,
  FiInfo,
  FiRefreshCw,
  FiTrash,
} from "react-icons/fi";
import SectionTitle from "../../../components/section-title";
import getProperties, {
  bulkAction,
  deleteProperty,
} from "../../../lib/properties";
import { useDispatch } from "react-redux";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";
import { toast, ToastContainer } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function Index() {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selected, setSelected] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [isNewAdded, setIsNewAdded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const isAdded = localStorage.getItem("newadded");
    const updated = localStorage.getItem("updated");
    if (isAdded) {
      setIsNewAdded(true);
      localStorage.removeItem("newadded");
    }
    if (updated) {
      setIsUpdated(updated);
      localStorage.removeItem("updated");
    }
    setIsLoading(true);
    (async () => {
      const response = await getProperties(filterValue);
      if (response?.status) {
        setProperties(response.data);
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
  }, [isRefresh, filterValue]);

  const viewPage = (id) => {
    if (id) {
      router.push(`/admin/properties/${id}?a=view`);
    }
  };

  const delProperty = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteProperty(id);
      if (response?.status) {
        setIsLoading(false);
        const newProperties = properties.filter(
          (item) => item.id !== response.data.id
        );
        setProperties(newProperties);
      }
    }
  };

  const selectProperty = (e, value) => {
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
        const res = await bulkAction({ action: e.target.value, ids: selected });
        if (res?.status) {
          toast.success(res.message);
          setIsLoading(false);
          setIsRefresh(!isRefresh);
        } else {
          toast.error(res?.message);
          setIsLoading(false);
        }
      } else {
        toast.warn("Please select properties to perform bulk action.");
      }
    }
  };

  const AddProperty = () => {
    return (
      <div className="flex items-center">
        <div className="form-group">
          <select
            className="form-input"
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
            }}
          >
            <option value="">Filter Options</option>
            <option value="verified">Verified</option>
            <option value="not-verified">Not Verified</option>
            <option value="featured">Featured</option>
          </select>
        </div>
        <div className="mr-5">
          <select className="form-select" onChange={performAction}>
            <option value="">Bulk Action</option>
            <option value="mark-featured">Mark Featured</option>
            <option value="mark-not-featured">Mark Not Featured</option>
            <option value="mark-verified">Mark Verified</option>
            <option value="mark-not-verified">Mark Not Verified</option>
            <option value="remove">Remove</option>
          </select>
        </div>
        <Link href="/admin/properties/import">
          <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
            Bulk Import
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

  const toggleSelect = (e) => {
    if (e.target.checked) {
      properties.forEach((u) => {
        setSelected((prev) => [...prev, u?.id]);
      });
    } else {
      setSelected([]);
    }
  };

  return (
    <>
      <Head>
        <title>Properties | Rent a Roof</title>
      </Head>
      <ToastContainer />
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Properties"
        subtitle={`All Properties (${properties?.length})`}
        right={<AddProperty />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {isNewAdded && (
          <div
            className="my-2 p-4 mx-4 rounded-md bg-white flex items-center justify-between shadow-md"
            style={{
              fontFamily: "Opensans-bold",
            }}
          >
            <p className="text-green-500">
              YOU HAVE ADDED A NEW PROPERTY SUCCESSFULLY.
            </p>
            <FaTimes
              className="cursor-pointer text-red-500"
              onClick={() => setIsNewAdded(false)}
            />
          </div>
        )}
        {isUpdated && (
          <div
            className="my-2 p-4 mx-4 rounded-md bg-white flex items-center justify-between shadow-md"
            style={{
              fontFamily: "Opensans-bold",
            }}
          >
            <p className="text-green-500">{isUpdated}</p>
            <FaTimes
              className="cursor-pointer text-red-500"
              onClick={() => setIsUpdated(false)}
            />
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>
                {" "}
                <input
                  type="checkbox"
                  onChange={toggleSelect}
                  checked={selected?.length > 0}
                />
              </th>
              <th>Name</th>
              <th>Code</th>
              <th>Owner</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties?.length > 0 ? (
              properties?.map((p, i) => (
                <tr
                  key={i}
                  className={`${p?.is_approved === 0 && "bg-yellow-50"} ${
                    p?.is_deleted === 1 && "bg-red-50"
                  } ${p?.is_approved === 1 && "bg-green-50"}`}
                >
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) => selectProperty(e, p?.id)}
                      checked={selected.indexOf(p?.id) !== -1}
                    />
                  </td>
                  <td className="">
                    {p?.is_featured === 1 && (
                      <FiCheckCircle
                        data-tip="Featured"
                        className="text-green-600 text-lg mr-2"
                      />
                    )}
                    {p?.name}
                  </td>
                  <td>{p?.property_code}</td>
                  <td>{p?.owner}</td>
                  <td>{p?.type.toUpperCase()}</td>
                  <td>
                    {p?.is_closed
                      ? "Closed"
                      : p?.is_deleted
                      ? "Deleted"
                      : p?.is_approved
                      ? "Verified"
                      : "Not-Verified"}
                  </td>
                  <td>
                    {p?.is_deleted === 1 && (
                      <button
                        onClick={() => viewPage(p?.id)}
                        data-tip="Property Delete Requested"
                        className="btn px-2 py-1 mr-2 bg-red-400 rounded-md hover:bg-red-500"
                      >
                        <FiInfo />
                      </button>
                    )}
                    <button
                      onClick={() => delProperty(p?.id)}
                      data-tip="Remove"
                      className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
                    >
                      <FiTrash />
                    </button>
                    <button
                      onClick={() => viewPage(p?.id)}
                      data-tip="View"
                      className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
                    >
                      <FiEye />
                    </button>
                    <Link
                      href={`/admin/properties/${p?.property_code}-${p?.id}?step=next&next=UPDATE&skip=false&mode=update&a=update`}
                    >
                      <button
                        className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
                        data-tip="Edit"
                      >
                        <FiEdit />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8}>No properties found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Index;
