import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { addLocation } from "../../../lib/locations";
import { FiCheck } from "react-icons/fi";
import getLocations from "../../../lib/cities";
import Loader from "../../../components/loader";

function Add() {
  const [nameError, setNameError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [cities, setStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const name = useRef(null);
  const city_id = useRef(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const response = await getLocations();
      if (response?.status) {
        setStates(response.data);
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!name.current.value) {
      setNameError(true);
      name.current.focus();
      setIsLoading(false);
      return;
    } else {
      setNameError("");
    }
    if (!city_id.current.value) {
      setStateError(true);
      city_id.current.focus();
      setIsLoading(false);
      return;
    } else {
      setStateError("");
    }

    if (name.current.value && city_id.current.value) {
      submitData(name.current.value, city_id.current.value);
    }
  };

  const submitData = async (name, city_id) => {
    const response = await addLocation(name, city_id);
    if (response) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1000);
      setIsLoading(false);
      document.forms.state.reset();
    } else {
      setIsAdded(false);
    }
  };

  const AllLocations = () => {
    return (
      <Link href="/admin/locations">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Locations
        </a>
      </Link>
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <SectionTitle title="Locations" subtitle="Add New" right={<AllLocations />} />
      {isAdded && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            New Location added successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="state">
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">
                Location Name<span className="text-red-500">*</span>
              </div>
              <input
                type="text"
                className={`form-input ${
                  nameError ? "border-red-400 border-2" : ""
                }`}
                ref={name}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setNameError(false)
                    : setNameError(true);
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">
                City<span className="text-red-500">*</span>
              </div>
              <select
                className={`form-input ${
                  stateError ? "border-red-400 border-2" : ""
                }`}
                ref={city_id}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setStateError(false)
                    : setStateError(true);
                }}
              >
                <option value="">Select</option>
                {cities?.length &&
                  cities.map((item, index) => (
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

export default Add;
