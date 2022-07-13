import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEdit, FiEye, FiRefreshCw, FiTrash } from "react-icons/fi";
import { FaBan, FaCheck } from "react-icons/fa";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getIbos, {
  activateIboProfile,
  banIboProfile,
  deleteIBO,
  getIBOById,
} from "../../../lib/ibos";
import UserDetails from "../../../components/user-details";
import Loader from "../../../components/loader";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";

function Index() {
  const [ibos, setIbos] = useState([]);
  const [ibo, setIbo] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selected, setSelected] = useState([]);
  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const response = await getIbos();
      if (response?.status) {
        setIsLoading(false);
        setIbos(response.data);
      }
    })();
  }, [isRefresh]);

  console.log(selected);

  const editIBO = (id) => {
    if (id) {
      router.push(`/admin/ibos/${id}`);
    }
  };

  const delIBO = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteIBO(id);
      if (response?.id) {
        const newIbos = ibos.filter((item) => item.id !== response.id);
        setIbos(newIbos);
        setIsLoading(false);
      }
    }
  };

  const viewProfile = async (id) => {
    setIsLoading(true);
    const response = await getIBOById(id);
    if (response?.status) {
      setIbo(response.data);
      setShowDetail(true);
      setIsLoading(false);
    }
  };

  const banIbo = async (id) => {
    setIsLoading(true);
    const res = await banIboProfile(id);
    if (res?.status) {
      setIsLoading(false);
      setIbos(ibos.map((u) => (u?.id === res?.data?.id ? res?.data : u)));
      toast.success(`IBO ${res?.data.first} has been banned successfully.`);
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  const activateIbo = async (id) => {
    setIsLoading(true);
    const res = await activateIboProfile(id);
    if (res?.status) {
      setIsLoading(false);
      setIbos(ibos.map((u) => (u?.id === res?.data?.id ? res?.data : u)));
      toast.success(`IBO ${res?.data.first} has been activated successfully.`);
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  const AddIBO = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/ibos/add">
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
        <title>IBOs | Rent a Roof</title>
      </Head>
      <ToastContainer />
      <ReactTooltip />
      {isLoading && <Loader />}
      {showDetail && (
        <UserDetails
          title="IBO Details"
          subtitle={`All the information of ${ibo?.first} ${ibo?.last}.`}
          toggle={setShowDetail}
          user={ibo}
          address={ibo.address}
          kyc={ibo.kyc}
        />
      )}
      <SectionTitle
        title="Ibos"
        subtitle={"All Ibos (" + ibos?.length + ")"}
        right={<AddIBO />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {ibos?.length ? (
          <Table
            ibos={ibos}
            edit={editIBO}
            del={delIBO}
            view={viewProfile}
            ban={banIbo}
            activate={activateIbo}
            setSelected={setSelected}
          />
        ) : (
          <p className="mt-5">No ibos found!</p>
        )}
      </div>
    </div>
  );
}

export default Index;

const Table = ({ ibos, edit, del, view, ban, activate, setSelected }) => {
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
              data-tip="Remove"
              className="btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
            >
              <FiTrash />
            </button>
            <button
              onClick={() => edit(props.value)}
              className="ml-2 btn px-2 py-1 bg-blue-400 rounded-md hover:bg-blue-500"
              data-tip="Edit"
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

            {ibos?.filter((u) => u.id === parseInt(props.value))[0]
              ?.account_status !== "banned" ? (
              <button
                onClick={() => ban(props.value)}
                data-tip="Ban IBO"
                className="ml-2 btn px-2 py-1 bg-red-400 rounded-md hover:bg-red-500"
              >
                <FaBan />
              </button>
            ) : (
              <button
                onClick={() => activate(props.value)}
                data-tip="Activate IBO"
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
  return <Datatable columns={columns} data={ibos} onSelect={setSelected} />;
};
