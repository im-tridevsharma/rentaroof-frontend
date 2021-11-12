import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEdit, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getLandlords, {
  activateLandlordProfile,
  banLandlordProfile,
  deleteLandlord,
  getLandlordById,
} from "../../../lib/landlords";
import UserDetails from "../../../components/user-details";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";
import { FaBan, FaCheck } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

function Index() {
  const [landlords, setLandlords] = useState([]);
  const [landlord, setLandlord] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getLandlords();
      if (response?.status) {
        setLandlords(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const editLandlord = (id) => {
    if (id) {
      router.push(`/admin/landlords/${id}`);
    }
  };

  const delLandlord = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteLandlord(id);
      if (response?.id) {
        const newLandlords = landlords.filter(
          (item) => item.id !== response.id
        );
        setLandlords(newLandlords);
        setIsLoading(false);
      }
    }
  };

  const viewProfile = async (id) => {
    setIsLoading(true);
    const response = await getLandlordById(id);
    if (response?.status) {
      setLandlord(response.data);
      setShowDetail(true);
      setIsLoading(false);
    }
  };

  const banLandlord = async (id) => {
    setIsLoading(true);
    const res = await banLandlordProfile(id);
    if (res?.status) {
      setIsLoading(false);
      setLandlords(
        landlords.map((u) => (u?.id === res?.data?.id ? res?.data : u))
      );
      toast.success(
        `Landlord ${res?.data.first} has been banned successfully.`
      );
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  const activateLandlord = async (id) => {
    setIsLoading(true);
    const res = await activateLandlordProfile(id);
    if (res?.status) {
      setIsLoading(false);
      setLandlords(
        landlords.map((u) => (u?.id === res?.data?.id ? res?.data : u))
      );
      toast.success(
        `Landlord ${res?.data.first} has been activated successfully.`
      );
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  const AddLandlord = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/landlords/add">
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
      <Head>
        <title>Landlords | Rent a Roof</title>
      </Head>
      <ToastContainer />
      <ReactTooltip />
      {isLoading && <Loader />}
      {showDetail && (
        <UserDetails
          title="Landlord Details"
          subtitle={`All the information of ${landlord?.first} ${landlord?.last}.`}
          toggle={setShowDetail}
          user={landlord}
          address={landlord.address}
          kyc={landlord.kyc}
        />
      )}
      <SectionTitle
        title="Landlords"
        subtitle="All Landlords"
        right={<AddLandlord />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {landlords?.length ? (
          <Table
            landlords={landlords}
            edit={editLandlord}
            del={delLandlord}
            view={viewProfile}
            ban={banLandlord}
            activate={activateLandlord}
          />
        ) : (
          <p className="mt-5">No landlords found!</p>
        )}
      </div>
    </div>
  );
}

export default Index;

const Table = ({ landlords, edit, del, view, ban, activate }) => {
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
      Header: "KYC",
      accessor: "kyc.is_verified",
      Cell: (props) => {
        return props.value === 1 ? (
          <span className="px-1 text-xs bg-green-400 rounded-full">
            Verified
          </span>
        ) : (
          <span className="px-1 text-xs bg-red-400 rounded-full">
            Not Verified
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
              className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
              data-tip="Remove"
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

            {landlords?.filter((u) => u.id === parseInt(props.value))[0]
              ?.account_status !== "banned" ? (
              <button
                onClick={() => ban(props.value)}
                data-tip="Ban LANDLORD"
                className="ml-2 btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
              >
                <FaBan />
              </button>
            ) : (
              <button
                onClick={() => activate(props.value)}
                data-tip="Activate LANDLORD"
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
  return <Datatable columns={columns} data={landlords} />;
};
