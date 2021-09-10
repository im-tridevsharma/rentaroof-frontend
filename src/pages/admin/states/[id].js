import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import getCountries from "../../../lib/countries";
import { getStateById, updateState } from "../../../lib/states";
import Loader from "../../../components/loader";

function Update() {
  const router = useRouter();
  const [state, setState] = useState({ name: "", country_id: "" });
  const [nameError, setNameError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [countries, setCountries] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      (async () => {
        setIsLoading(true);
        const response = await getStateById(id);
        const country = await getCountries();
        if (country) {
          setCountries(country.data);
        }
        if (response?.status) {
          setState(response.data);
          setIsLoading(false);
        }
      })();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!state?.name) {
      setNameError(true);
      document.forms.state.name.focus();
      setIsLoading(false);
      return;
    }
    if (!state?.country_id) {
      setCountryError(true);
      document.forms.state.country_id.focus();
      setIsLoading(false);
      return;
    }

    if (state?.name && state?.country_id) {
      submitData(state);
    }
  };

  const submitData = async (data) => {
    if (data?.name && data?.country_id) {
      const response = await updateState(
        data?.id,
        data?.name,
        data?.country_id
      );
      if (response) {
        setIsUpdated(true);
        setTimeout(() => {
          setIsUpdated(false);
        }, 1000);
        setIsLoading(false);
      }
    }
  };

  const AllStates = () => {
    return (
      <Link href="/admin/states">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All States
        </a>
      </Link>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <SectionTitle
        title="States"
        subtitle="Update State"
        right={<AllStates />}
      />
      {isUpdated && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            State updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="state">
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">State Name</div>
              <input
                type="text"
                name="name"
                className={`form-input ${
                  nameError ? "border-red-400 border-2" : ""
                }`}
                value={state?.name}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setNameError(false)
                    : setNameError(true);
                  setState({ ...state, name: e.target.value });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">Country</div>
              <select
                className={`form-input ${
                  countryError ? "border-red-400 border-2" : ""
                }`}
                value={state?.country_id}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setCountryError(false)
                    : setCountryError(true);
                  setState({ ...state, country_id: e.target.value });
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
