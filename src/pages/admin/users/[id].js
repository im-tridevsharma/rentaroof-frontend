import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { getUserById, updateUser } from "../../../lib/users";
import getCountries from "../../../lib/countries";
import getStates from "../../../lib/states";
import getCities from "../../../lib/cities";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import Datepicker from "../../../components/datepicker";
import FileUpload from "../../../components/forms/file-upload";
import Loader from "../../../components/loader";

function Update() {
  const [errors, setErros] = useState({
    firstname: false,
    lastname: false,
    email: false,
    mobile: false,
    password: false,
    gender: false,
  });
  const [validationError, setValidationError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [filteredState, setFilteredState] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);

  const router = useRouter();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const country_data = await getCountries();
      const state_data = await getStates();
      const city_data = await getCities();
      const userdata = await getUserById(router.query.id);

      if (userdata?.status) {
        setIsLoading(false);
        setUser(userdata.data);
      }
      if (country_data) {
        setCountries(country_data.data);
      }
      if (state_data) {
        setStates(state_data.data);
      }
      if (city_data) {
        setCities(city_data.data);
      }
      setFilteredState(
        states.filter((item) => item.country_id === user?.address?.country)
      );
      setFilteredCity(
        cities.filter((item) => item.state_id === user?.address?.state)
      );
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
    const formdata = new FormData(document.forms.user);
    const iserror = Object.keys(errors).filter(
      (index) => errors[index] !== false
    );
    if (!iserror?.length) {
      submitData(formdata);
    }
  };

  const submitData = async (data) => {
    const response = await updateUser(user.id, data);
    if (response?.status) {
      setIsUpdated(true);
      setValidationError(false);
      document.querySelector(".main").scrollIntoView();
      document.forms.user.reset();
      setIsLoading(false);
    } else if (response?.error) {
      setIsUpdated(false);
      setValidationError(response.error);
      document.querySelector(".main").scrollIntoView();
      setIsLoading(false);
    }
  };

  const AllUser = () => {
    return (
      <Link href="/admin/users">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Users
        </a>
      </Link>
    );
  };

  return (
    <>
      <Head>
        <title>Update User | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="Users" subtitle="Update User" right={<AllUser />} />
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
            User's information updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form
          method="POST"
          onSubmit={handleSubmit}
          name="user"
          encType="multipart/form-data"
        >
          <input type="hidden" name="_method" value="PUT" />
          <div className="form-element">
            <div className="form-label text-center">Profile Pic</div>
            <FileUpload
              name="profile_pic"
              value={user?.profile_pic ? user.profile_pic : ""}
            />
          </div>
          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">
                First Name<span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="firstname"
                required
                value={user?.first ? user.first : ""}
                className={`form-input ${
                  errors.firstname && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, firstname: true })
                    : setErros({ ...errors, firstname: false });
                  setUser({ ...user, first: e.target.value });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">
                Last Name<span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="lastname"
                required
                value={user?.last ? user.last : ""}
                className={`form-input ${
                  errors.lastname && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, lastname: true })
                    : setErros({ ...errors, lastname: false });
                  setUser({ ...user, last: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">
                Email<span className="text-red-500">*</span>
              </div>
              <input
                type="email"
                name="email"
                required
                value={user?.email ? user.email : ""}
                className={`form-input ${
                  errors.email && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, email: true })
                    : setErros({ ...errors, email: false });
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">
                Mobile<span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="mobile"
                required
                value={user?.mobile ? user.mobile : ""}
                className={`form-input ${
                  errors.mobile && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, mobile: true })
                    : setErros({ ...errors, mobile: false });
                  setUser({ ...user, mobile: e.target.value });
                }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">
                Gender<span className="text-red-500">*</span>
              </div>
              <select
                name="gender"
                className={`form-input ${
                  errors.gender && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, gender: true })
                    : setErros({ ...errors, gender: false });
                  setUser({ ...user, gender: e.target.value });
                }}
                required
                value={user?.gender ? user.gender : ""}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-element">
              <div className="form-label">DOB</div>
              <Datepicker name="dob" value={user?.dob ? user.dob : ""} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">Username</div>
              <input
                type="text"
                name="username"
                className="form-input"
                value={user?.username ? user.username : ""}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
              />
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
                className="form-input"
                value={user?.address?.landmark ? user.address.landmark : ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, landmark: e.target.value },
                  })
                }
              />
            </div>
            <div className="form-element">
              <div className="form-label">House No.</div>
              <input
                type="text"
                name="houseno"
                className="form-input"
                value={
                  user?.address?.house_number ? user.address.house_number : ""
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, house_number: e.target.value },
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
                value={user?.address?.pincode ? user.address.pincode : ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, pincode: e.target.value },
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
                  setUser({
                    ...user,
                    address: { ...user.address, country: e.target.value },
                  });
                  filterState(e);
                }}
                value={user?.address?.country ? user.address.country : ""}
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
                  setUser({
                    ...user,
                    address: { ...user.address, state: e.target.value },
                  });
                  filterCity(e);
                }}
                value={user?.address?.state ? user.address.state : ""}
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
                value={user?.address?.city ? user.address.city : ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    address: { ...user.address, city: e.target.value },
                  })
                }
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
                user?.address?.full_address ? user.address.full_address : ""
              }
              onChange={(e) =>
                setUser({
                  ...user,
                  address: { ...user.address, full_address: e.target.value },
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
