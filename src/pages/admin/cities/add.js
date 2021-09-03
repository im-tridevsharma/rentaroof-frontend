import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { addCity } from "../../../lib/cities";
import { FiCheck } from "react-icons/fi";
import getStates from "../../../lib/states";

function Add() {
  const [nameError, setNameError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [states, setStates] = useState([]);

  const name = useRef(null);
  const state_id = useRef(null);

  useEffect(() => {
    (async () => {
      const response = await getStates();
      if (response) {
        setStates(response.data);
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
    if (!state_id.current.value) {
      setStateError(true);
      state_id.current.focus();
      return;
    } else {
      setStateError("");
    }

    if (name.current.value && state_id.current.value) {
      submitData(name.current.value, state_id.current.value);
    }
  };

  const submitData = async (name, state_id) => {
    const response = await addCity(name, state_id);
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
      <SectionTitle title="Cities" subtitle="Add New" right={<AllCities />} />
      {isAdded && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white border-green-500 text-green-500"
            borderLeft
            raised
          >
            New City added successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col px-5 py-3 rounded-lg border-gray-100 border-2">
        <form method="POST" onSubmit={handleSubmit} name="state">
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">
                City Name<span className="text-red-500">*</span>
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
                State<span className="text-red-500">*</span>
              </div>
              <select
                className={`form-input ${
                  stateError ? "border-red-400 border-2" : ""
                }`}
                ref={state_id}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setStateError(false)
                    : setStateError(true);
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

export default Add;
