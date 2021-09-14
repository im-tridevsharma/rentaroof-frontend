import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FiAlertCircle,
  FiEdit,
  FiEye,
  FiRefreshCw,
  FiTrash,
} from "react-icons/fi";
import Datatable from "../../../components/datatable";
import SectionTitle from "../../../components/section-title";
import getEmployees, {
  deleteEmployee,
  getEmployeeById,
} from "../../../lib/employees";
import UserDetails from "../../../components/user-details";
import Loader from "../../../components/loader";
import { useDispatch } from "react-redux";

function Index() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getEmployees();
      if (response?.status) {
        setEmployees(response.data);
        setIsLoading(false);
      }
    })();
  }, [isRefresh]);

  const editEmployee = (id) => {
    if (id) {
      router.push(`/admin/employees/${id}`);
    }
  };

  const delEmployee = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    const go = confirm("It will delete it permanantly!");
    if (go && id) {
      setIsLoading(true);
      const response = await deleteEmployee(id);
      if (response?.status) {
        const newEmployees = employees.filter(
          (item) => item.id !== response.data?.id
        );
        setEmployees(newEmployees);
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

  const viewProfile = async (id) => {
    setIsLoading(true);
    const response = await getEmployeeById(id);
    if (response?.status) {
      setEmployee(response.data);
      setShowDetail(true);
      setIsLoading(false);
    }
  };

  const AddEmployee = () => {
    return (
      <div className="flex items-center">
        <Link href="/admin/employees/add">
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

  return (
    <div className="relative">
      <Head>
        <title>Employees | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      {showDetail && (
        <UserDetails
          title="Employee Details"
          subtitle={`All the information of ${employee?.name}.`}
          toggle={setShowDetail}
          user={employee}
          address={employee.address}
          kyc={employee.kyc}
        />
      )}
      <SectionTitle
        title="Employees"
        subtitle="All Employees"
        right={<AddEmployee />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        {employees?.length ? (
          <Table
            employees={employees}
            edit={editEmployee}
            del={delEmployee}
            view={viewProfile}
          />
        ) : (
          <p className="mt-5">No employees found!</p>
        )}
      </div>
    </div>
  );
}

export default Index;

const Table = ({ employees, edit, del, view }) => {
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
      accessor: "name",
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
  return <Datatable columns={columns} data={employees} />;
};
