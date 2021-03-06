import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import getStates from "../../../lib/states";
import { getCityById, updateCity } from "../../../lib/cities";
import Loader from "../../../components/loader";

function Update() {
  const router = useRouter();
  const [city, setCity] = useState({ name: "", state_id: "" });
  const [nameError, setNameError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [states, setStates] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      (async () => {
        setIsLoading(true);
        const state = await getStates();
        if (state) {
          setStates(state.data);
          setIsLoading(false);
        }
        //fetch city
        const response = await getCityById(id);
        if (response?.status) {
          setCity(response.data);
        } else {
          router.push("/admin");
        }
      })();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!city?.name) {
      setNameError(true);
      document.forms.state.name.focus();
      setIsLoading(false);
      return;
    }
    if (!city?.state_id) {
      setStateError(true);
      document.forms.state_id.code.focus();
      setIsLoading(false);
      return;
    }

    if (city?.name && city?.state_id) {
      submitData(city);
    }
  };

  const submitData = async (data) => {
    if (data?.name && data?.state_id) {
      const response = await updateCity(data?.id, data?.name, data?.state_id);
      if (response?.status) {
        setIsUpdated(true);
        setTimeout(() => {
          setIsUpdated(false);
        }, 1000);
        setIsLoading(false);
      }
    }
  };

  const AllCities = () => {
    return (
      <Link href="/admin/cities">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Cities
        </a>
      </Link>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <SectionTitle
        title="Cities"
        subtitle="Update City"
        right={<AllCities />}
      />
      {isUpdated && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            City updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="state">
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">City Name</div>
              <input
                type="text"
                name="name"
                className={`form-input ${
                  nameError ? "border-red-400 border-2" : ""
                }`}
                value={city?.name}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setNameError(false)
                    : setNameError(true);
                  setCity({ ...city, name: e.target.value });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">State</div>
              <select
                className={`form-input ${
                  stateError ? "border-red-400 border-2" : ""
                }`}
                value={city?.state_id}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setStateError(false)
                    : setStateError(true);
                  setCity({ ...city, state_id: e.target.value });
                }}
              >
                <option value="">Select</option>
                {states?.length &&
                  states.map((item, index) => (
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
