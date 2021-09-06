import { useEffect, useState } from "react";
import Link from "next/link";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { addIBO } from "../../../lib/ibos";
import getCountries from "../../../lib/countries";
import getStates from "../../../lib/states";
import getCities from "../../../lib/cities";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import Datepicker from "../../../components/datepicker";
import FileUpload from "../../../components/forms/file-upload";

function Add() {
  const [errors, setErros] = useState({
    firstname: false,
    lastname: false,
    email: false,
    mobile: false,
    password: false,
    gender: false,
  });
  const [validationError, setValidationError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [filteredState, setFilteredState] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);

  useEffect(() => {
    (async () => {
      const country_data = await getCountries();
      const state_data = await getStates();
      const city_data = await getCities();

      if (country_data) {
        setCountries(country_data.data);
      }
      if (state_data) {
        setStates(state_data.data);
      }
      if (city_data) {
        setCities(city_data.data);
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
    const formdata = new FormData(document.forms.ibo);
    const iserror = Object.keys(errors).filter(
      (index) => errors[index] !== false
    );
    if (!iserror?.length) {
      submitData(formdata);
    }
  };

  const submitData = async (ibo) => {
    const response = await addIBO(ibo);
    if (response?.status) {
      setIsAdded(true);
      setValidationError(false);
      document.querySelector(".main").scrollIntoView();
      document.forms.ibo.reset();
    } else if (response?.error) {
      setIsAdded(false);
      setValidationError(response.error);
      document.querySelector(".main").scrollIntoView();
    }
  };

  const AllIBO = () => {
    return (
      <Link href="/admin/ibos">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All IBOs
        </a>
      </Link>
    );
  };

  return (
    <>
      <SectionTitle title="IBOs" subtitle="Add New" right={<AllIBO />} />
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
      {isAdded && (
        <div className="w-full mb-4 success">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white border-green-500 text-green-500"
            borderLeft
            raised
          >
            New IBO added successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col px-5 py-3 rounded-lg border-gray-100 border-2">
        <form
          method="POST"
          onSubmit={handleSubmit}
          name="ibo"
          encType="multipart/form-data"
        >
          <div className="form-element">
            <div className="form-label text-center">Profile Pic</div>
            <FileUpload name="profile_pic" />
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
                className={`form-input ${
                  errors.firstname && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, firstname: true })
                    : setErros({ ...errors, firstname: false });
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
                className={`form-input ${
                  errors.lastname && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, lastname: true })
                    : setErros({ ...errors, lastname: false });
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
                className={`form-input ${
                  errors.email && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, email: true })
                    : setErros({ ...errors, email: false });
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
                className={`form-input ${
                  errors.mobile && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, mobile: true })
                    : setErros({ ...errors, mobile: false });
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
                }}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-element">
              <div className="form-label">DOB</div>
              <Datepicker name="dob" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">IBOname</div>
              <input type="text" name="iboname" className="form-input" />
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
              <input type="text" name="landmark" className="form-input" />
            </div>
            <div className="form-element">
              <div className="form-label">House No.</div>
              <input type="text" name="houseno" className="form-input" />
            </div>
            <div className="form-element">
              <div className="form-label">Pincode</div>
              <input type="text" name="pincode" className="form-input" />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">Country</div>
              <select
                name="country"
                className="form-input"
                onChange={filterState}
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
              <select name="state" className="form-input" onChange={filterCity}>
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
              <select name="city" className="form-input">
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
            <textarea name="fulladdress" className="form-input"></textarea>
          </div>

          <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Add;
