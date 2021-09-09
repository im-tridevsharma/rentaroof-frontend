import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { addState } from "../../../lib/states";
import { FiCheck } from "react-icons/fi";
import getCountries from "../../../lib/countries";

function Add() {
  const [nameError, setNameError] = useState(false);
  const [countryError, setCountryError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [countries, setCountries] = useState([]);

  const name = useRef(null);
  const country_id = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await getCountries();
      if (response) {
        setCountries(response.data);
      }
    })();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.current.value) {
      setNameError(true);
      name.current.focus();
      return;
    } else {
      setNameError("");
    }
    if (!country_id.current.value) {
      setCountryError(true);
      country_id.current.focus();
      return;
    } else {
      setCountryError("");
    }

    if (name.current.value && country_id.current.value) {
      submitData(name.current.value, country_id.current.value);
    }
  };

  const submitData = async (name, country_id) => {
    const response = await addState(name, country_id);
    if (response) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1000);
      document.forms.state.reset();
    } else {
      setIsAdded(false);
    }
  };

  const AllState = () => {
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
      <SectionTitle title="States" subtitle="Add New" right={<AllState />} />
      {isAdded && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            New State added successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="state">
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">
                State Name<span className="text-red-500">*</span>
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
                Country<span className="text-red-500">*</span>
              </div>
              <select
                className={`form-input ${
                  countryError ? "border-red-400 border-2" : ""
                }`}
                ref={country_id}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setCountryError(false)
                    : setCountryError(true);
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

export default Add;
