import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { getEmployeeById, updateEmployee } from "../../../lib/employees";
import getCountries from "../../../lib/countries";
import getStates from "../../../lib/states";
import getCities from "../../../lib/cities";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import FileUpload from "../../../components/forms/file-upload";
import Loader from "../../../components/loader";
import getRoles from "../../../lib/roles";

function Update() {
  const [errors, setErros] = useState({
    name: false,
    email: false,
    mobile: false,
    password: false,
    gender: false,
    role: false,
  });
  const [validationError, setValidationError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [employee, setEmployee] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const router = useRouter();

  const [filteredState, setFilteredState] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const country_data = await getCountries();
      const state_data = await getStates();
      const city_data = await getCities();
      const empdata = await getEmployeeById(router.query.id);
      const role_data = await getRoles();

      if (empdata?.status) {
        setIsLoading(false);
        setEmployee(empdata.data);
      }

      if (country_data?.status) {
        setCountries(country_data.data);
      }
      if (state_data?.status) {
        setStates(state_data.data);
      }
      if (city_data?.status) {
        setCities(city_data.data);
      }
      if (role_data?.status) {
        setRoles(role_data.data);
      }
    })();
  }, []);

  const filterState = (e) => {
    e.preventDefault();
    const country_id = Number(e.target.value);
    country_id
      ? setFilteredState(
          states.filter((item) => item.country_id === country_id)
        )
      : setFilteredState([]);
  };

  const filterCity = (e) => {
    e.preventDefault();
    const state_id = Number(e.target.value);
    state_id
      ? setFilteredCity(cities.filter((item) => item.state_id === state_id))
      : setFilteredCity([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.employee);
    const iserror = Object.keys(errors).filter(
      (index) => errors[index] !== false
    );
    if (!iserror?.length) {
      submitData(formdata);
    }
  };

  const submitData = async (data) => {
    const response = await updateEmployee(employee.id, data);
    if (response?.status) {
      setIsUpdated(true);
      setValidationError(false);
      document.querySelector(".main").scrollIntoView();
      document.forms.employee?.reset();
      setIsLoading(false);
    } else if (response?.error) {
      setIsUpdated(false);
      setValidationError(response.error);
      document.querySelector(".main").scrollIntoView();
      setIsLoading(false);
    }
  };

  const AllEmployee = () => {
    return (
      <Link href="/admin/employees">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Employees
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Add Employee | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Employees"
        subtitle="Add New"
        right={<AllEmployee />}
      />
      {validationError && (
        <div className="errors">
          {Object.keys(validationError).map((index, i) => (
            <div className="w-full mb-2" key={i}>
              <Alert
                icon={<FiAlertCircle className="mr-2" />}
                color="bg-white border-red-500 text-red-500"
                borderLeft
                raised
              >
                {validationError[index]}
              </Alert>
            </div>
          ))}
        </div>
      )}
      {isUpdated && (
        <div className="w-full mb-4 success">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white border-green-500 text-green-500"
            borderLeft
            raised
          >
            Employee's information updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form
          method="POST"
          onSubmit={handleSubmit}
          name="employee"
          encType="multipart/form-data"
        >
          <input type="hidden" name="_method" value="PUT" />
          <div className="form-element">
            <div className="form-label text-center">Profile Pic</div>
            <FileUpload name="profile_pic" />
          </div>
          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">
                Full Name<span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="name"
                required
                value={employee?.name ? employee.name : ""}
                className={`form-input ${
                  errors.name && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, name: true })
                    : setErros({ ...errors, name: false });
                  setEmployee({ ...employee, name: e.target.value });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">
                Email<span className="text-red-500">*</span>
              </div>
              <input
                type="email"
                name="email"
                required
                value={employee?.email ? employee.email : ""}
                className={`form-input ${
                  errors.email && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, email: true })
                    : setErros({ ...errors, email: false });
                  setEmployee({ ...employee, email: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">
                Mobile<span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="mobile"
                required
                value={employee?.mobile ? employee.mobile : ""}
                className={`form-input ${
                  errors.mobile && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, mobile: true })
                    : setErros({ ...errors, mobile: false });
                  setEmployee({ ...employee, mobile: e.target.value });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">
                Gender<span className="text-red-500">*</span>
              </div>
              <select
                name="gender"
                className={`form-input ${
                  errors.gender && "border-red-400 border-1"
                }`}
                value={employee?.gender ? employee.gender : ""}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, gender: true })
                    : setErros({ ...errors, gender: false });
                  setEmployee({ ...employee, gender: e.target.value });
                }}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">
                Role<span className="text-red-500">*</span>
              </div>
              <select
                name="role"
                value={employee?.role ? employee.role : ""}
                className={`form-input ${
                  errors.role && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, role: true })
                    : setErros({ ...errors, role: false });
                  setEmployee({ ...employee, role: e.target.value });
                }}
                required
              >
                <option value="">Select</option>
                {roles &&
                  roles.map((role, i) => (
                    <option key={i} value={role.id}>
                      {role.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-element">
              <div className="form-label">
                Password<span className="text-red-500">*</span>
              </div>
              <input
                type="password"
                name="password"
                required
                className={`form-input ${
                  errors.password && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, password: true })
                    : setErros({ ...errors, password: false });
                  setEmployee({ ...employee, password: e.target.value });
                }}
              />
            </div>
          </div>

          <hr />
          <h5 className="py-3">Address</h5>

          <div className="grid sm:grid-cols-3 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">Landmark</div>
              <input
                type="text"
                name="landmark"
                value={
                  employee?.address?.landmark ? employee.address.landmark : ""
                }
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    address: { ...employee.address, landmark: e.target.value },
                  })
                }
                className="form-input"
              />
            </div>
            <div className="form-element">
              <div className="form-label">House No.</div>
              <input
                type="text"
                name="houseno"
                className="form-input"
                value={
                  employee?.address?.house_number
                    ? employee.address.house_number
                    : ""
                }
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    address: {
                      ...employee.address,
                      house_number: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="form-element">
              <div className="form-label">Pincode</div>
              <input
                type="text"
                name="pincode"
                className="form-input"
                value={
                  employee?.address?.pincode ? employee.address.pincode : ""
                }
                onChange={(e) =>
                  setEmployee({
                    ...employee,
                    address: { ...employee.address, pincode: e.target.value },
                  })
                }
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">Country</div>
              <select
                name="country"
                className="form-input"
                onChange={(e) => {
                  filterState(e);
                  setEmployee({
                    ...employee,
                    address: { ...employee.address, country: e.target.value },
                  });
                }}
                value={
                  employee?.address?.country ? employee.address.country : ""
                }
              >
                <option value="">Select</option>
                {countries?.length &&
                  countries.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-element">
              <div className="form-label">State</div>
              <select
                name="state"
                className="form-input"
                onChange={(e) => {
                  filterCity(e);
                  setEmployee({
                    ...employee,
                    address: { ...employee.address, state: e.target.value },
                  });
                }}
                value={employee?.address?.state ? employee.address.state : ""}
              >
                <option value="">Select</option>
                {filteredState?.length &&
                  filteredState.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-element">
              <div className="form-label">City</div>
              <select
                name="city"
                className="form-input"
                onChange={(e) => {
                  setEmployee({
                    ...employee,
                    address: { ...employee.city, city: e.target.value },
                  });
                }}
                value={employee?.address?.city ? employee.address.city : ""}
              >
                <option value="">Select</option>
                {filteredCity?.length &&
                  filteredCity.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-element">
            <div className="form-label">Full Address</div>
            <textarea
              name="fulladdress"
              className="form-input"
              value={
                employee?.address?.full_address
                  ? employee.address.full_address
                  : ""
              }
              onChange={(e) =>
                setEmployee({
                  ...employee,
                  address: {
                    ...employee.address,
                    full_address: e.target.value,
                  },
                })
              }
            ></textarea>
          </div>

          <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Update;
