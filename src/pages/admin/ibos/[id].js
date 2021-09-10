import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { getIBOById, updateIBO } from "../../../lib/ibos";
import getCountries from "../../../lib/countries";
import getStates from "../../../lib/states";
import getCities from "../../../lib/cities";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import Datepicker from "../../../components/datepicker";
import FileUpload from "../../../components/forms/file-upload";
import Loader from "../../../components/loader";
import { useRouter } from "next/router";

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
  const [isLoading, setIsLoading] = useState(false);
  const [ibo, setIbo] = useState({});
  const router = useRouter();

  const [filteredState, setFilteredState] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const country_data = await getCountries();
      const state_data = await getStates();
      const city_data = await getCities();
      const ibodata = await getIBOById(router.query.id);

      if (ibodata?.status) {
        setIsLoading(false);
        setIbo(ibodata.data);
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
    const formdata = new FormData(document.forms.ibo);
    const iserror = Object.keys(errors).filter(
      (index) => errors[index] !== false
    );
    if (!iserror?.length) {
      submitData(formdata);
    }
  };

  const submitData = async (data) => {
    const response = await updateIBO(ibo.id, data);
    if (response?.status) {
      setIsUpdated(true);
      setValidationError(false);
      document.querySelector(".main").scrollIntoView();
      document.forms.ibo.reset();
      setIsLoading(false);
    } else if (response?.error) {
      setIsUpdated(false);
      setValidationError(response.error);
      document.querySelector(".main").scrollIntoView();
      setIsLoading(false);
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
      <Head>
        <title>Update IBO | Rent a Roof</title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle title="IBOs" subtitle="Update New" right={<AllIBO />} />
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
            IBO's information updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form
          method="POST"
          onSubmit={handleSubmit}
          name="ibo"
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
                First Name<span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                name="firstname"
                required
                value={ibo?.first ? ibo.first : ""}
                className={`form-input ${
                  errors.firstname && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, firstname: true })
                    : setErros({ ...errors, firstname: false });
                  setIbo({ ...ibo, first: e.target.value });
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
                value={ibo?.last ? ibo.last : ""}
                className={`form-input ${
                  errors.lastname && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, lastname: true })
                    : setErros({ ...errors, lastname: false });
                  setIbo({ ...ibo, last: e.target.value });
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
                value={ibo?.email ? ibo.email : ""}
                className={`form-input ${
                  errors.email && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, email: true })
                    : setErros({ ...errors, email: false });
                  setIbo({ ...ibo, email: e.target.value });
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
                value={ibo?.mobile ? ibo.mobile : ""}
                className={`form-input ${
                  errors.mobile && "border-red-400 border-1"
                }`}
                onChange={(e) => {
                  e.target.value === ""
                    ? setErros({ ...errors, mobile: true })
                    : setErros({ ...errors, mobile: false });
                  setIbo({ ...ibo, mobile: e.target.value });
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
                  setIbo({ ...ibo, gender: e.target.value });
                }}
                required
                value={ibo?.gender ? ibo.gender : ""}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-element">
              <div className="form-label">DOB</div>
              <Datepicker name="dob" value={ibo?.dob ? ibo.dob : ""} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">Username</div>
              <input
                type="text"
                name="username"
                className="form-input"
                value={ibo?.username ? ibo.username : ""}
                onChange={(e) => {
                  setIbo({ ...ibo, username: e.target.value });
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
                  setIbo({ ...ibo, password: e.target.value });
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
                value={ibo?.address?.landmark ? ibo.address.landmark : ""}
                onChange={(e) => {
                  setIbo({
                    ...ibo,
                    address: { ...ibo.address, landmark: e.target.value },
                  });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">House No.</div>
              <input
                type="text"
                name="houseno"
                value={
                  ibo?.address?.house_number ? ibo.address.house_number : ""
                }
                className="form-input"
                onChange={(e) => {
                  setIbo({
                    ...ibo,
                    address: { ...ibo.address, house_number: e.target.value },
                  });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">Pincode</div>
              <input
                type="text"
                name="pincode"
                className="form-input"
                value={ibo?.address?.pincode ? ibo.address.pincode : ""}
                onChange={(e) => {
                  setIbo({
                    ...ibo,
                    address: { ...ibo.address, pincode: e.target.value },
                  });
                }}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-3 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">Country</div>
              <select
                name="country"
                className="form-input"
                value={ibo?.address?.country ? ibo.address.country : ""}
                onChange={(e) => {
                  setIbo({
                    ...ibo,
                    address: { ...ibo.address, country: e.target.value },
                  });
                  filterState(e);
                }}
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
                value={ibo?.address?.state ? ibo.address.state : ""}
                onChange={(e) => {
                  setIbo({
                    ...ibo,
                    address: { ...ibo.address, state: e.target.value },
                  });
                  filterCity(e);
                }}
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
                value={ibo?.address?.city ? ibo.address.city : ""}
                onChange={(e) => {
                  setIbo({
                    ...ibo,
                    address: { ...ibo.address, city: e.target.value },
                  });
                }}
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
              value={ibo?.address?.full_address ? ibo.address.full_address : ""}
              className="form-input"
              onChange={(e) => {
                setIbo({
                  ...ibo,
                  address: { ...ibo.address, full_address: e.target.value },
                });
              }}
            ></textarea>
          </div>

          <hr />
          <h5 className="py-3">KYC Details</h5>
          <div className="form-element">
            <div className="form-label">Document Type</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 sm:space-x-2">
              <label htmlFor="aadhar" className="flex items-center">
                <input
                  type="radio"
                  name="document_type"
                  value="aadhar"
                  id="aadhar"
                  className="mr-2"
                  checked={ibo.kyc?.document_type === "aadhar" ? true : false}
                  onChange={(e) => {
                    setIbo({
                      ...ibo,
                      kyc: { ...ibo.kyc, document_type: e.target.value },
                    });
                  }}
                />
                Aadhar
              </label>
              <label htmlFor="pan" className="flex items-center">
                <input
                  type="radio"
                  name="document_type"
                  value="pan"
                  id="pan"
                  className="mr-2"
                  checked={ibo.kyc?.document_type === "pan" ? true : false}
                  onChange={(e) => {
                    setIbo({
                      ...ibo,
                      kyc: { ...ibo.kyc, document_type: e.target.value },
                    });
                  }}
                />
                Pan Card
              </label>
              <label htmlFor="idcard" className="flex items-center">
                <input
                  type="radio"
                  name="document_type"
                  value="idcard"
                  id="idcard"
                  className="mr-2"
                  checked={ibo.kyc?.document_type === "idcard" ? true : false}
                  onChange={(e) => {
                    setIbo({
                      ...ibo,
                      kyc: { ...ibo.kyc, document_type: e.target.value },
                    });
                  }}
                />
                Identity Card
              </label>
              <label htmlFor="driving_license" className="flex items-center">
                <input
                  type="radio"
                  name="document_type"
                  value="driving_license"
                  id="driving_license"
                  className="mr-2"
                  checked={
                    ibo.kyc?.document_type === "driving_license" ? true : false
                  }
                  onChange={(e) => {
                    setIbo({
                      ...ibo,
                      kyc: { ...ibo.kyc, document_type: e.target.value },
                    });
                  }}
                />
                Driving License
              </label>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 sm:space-x-2">
            <div className="form-element">
              <div className="form-label">Document Number</div>
              <input
                type="text"
                name="document_number"
                className="form-input"
                value={ibo.kyc?.document_number ? ibo.kyc.document_number : ""}
                onChange={(e) => {
                  setIbo({
                    ...ibo,
                    kyc: { ...ibo.kyc, document_number: e.target.value },
                  });
                }}
              />
            </div>
            <div className="form-element relative">
              <div className="form-label">Upload Document</div>
              <input type="file" name="document_file" />
              {ibo.kyc?.document_upload && (
                <a
                  href={ibo.kyc.document_upload}
                  rel="noreferrer"
                  target="_blank"
                  className="btn btn-default absolute right-0 top-5 text-white bg-blue-400 hover:bg-blue-300"
                >
                  View Uploaded
                </a>
              )}
            </div>
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
