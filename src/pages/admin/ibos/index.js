import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getIbos, { deleteIBO, getIBOById } from "../../../lib/ibos";
import UserDetails from "../../../components/user-details";
import Loader from "../../../components/loader";

function Index() {
  const [ibos, setIbos] = useState([]);
  const [ibo, setIbo] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
  }, []);

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

  const AddIBO = () => {
    return (
      <Link href="/admin/ibos/add">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          Add New
        </a>
      </Link>
    );
  };

  return (
    <div className="relative">
      <Head>
        <title>IBOs | Rent a Roof</title>
      </Head>
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
      <SectionTitle title="Ibos" subtitle="All Ibos" right={<AddIBO />} />
      <div className="bg-white px-2 py-3 rounded-lg border-gray-100 border-2">
        {ibos?.length ? (
          <Table ibos={ibos} edit={editIBO} del={delIBO} view={viewProfile} />
        ) : (
          <p className="mt-5">No ibos found!</p>
        )}
      </div>
    </div>
  );
}

export default Index;

const Table = ({ ibos, edit, del, view }) => {
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
  return <Datatable columns={columns} data={ibos} />;
};
