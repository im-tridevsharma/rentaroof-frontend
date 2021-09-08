import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getLandlords, {
  deleteLandlord,
  getLandlordById,
} from "../../../lib/landlords";
import UserDetails from "../../../components/user-details";

function Index() {
  const [landlords, setLandlords] = useState([]);
  const [landlord, setLandlord] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getLandlords();
      if (response?.status) {
        setLandlords(response.data);
      }
    })();
  }, []);

  const editLandlord = (id) => {
    if (id) {
      router.push(`/admin/landlords/${id}`);
    }
  };

  const delLandlord = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      const response = await deleteLandlord(id);
      const newLandlords = landlords.filter((item) => item.id !== response.id);
      setLandlords(newLandlords);
    }
  };

  const viewProfile = async (id) => {
    const response = await getLandlordById(id);
    if (response?.status) {
      setLandlord(response.data);
      setShowDetail(true);
    }
  };

  const AddLandlord = () => {
    return (
      <Link href="/admin/landlords/add">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          Add New
        </a>
      </Link>
    );
  };

  return (
    <div className="relative">
      <Head>
        <title>Landlords | Rent a Roof</title>
      </Head>
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
      <div className="bg-white px-2 py-3 rounded-lg border-gray-100 border-2">
        {landlords?.length ? (
          <Table
            landlords={landlords}
            edit={editLandlord}
            del={delLandlord}
            view={viewProfile}
          />
        ) : (
          <p className="mt-5">No landlords found!</p>
        )}
      </div>
    </div>
  );
}

export default Index;

const Table = ({ landlords, edit, del, view }) => {
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
  return <Datatable columns={columns} data={landlords} />;
};
