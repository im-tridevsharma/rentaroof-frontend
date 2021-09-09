import { useRef, useState } from "react";
import Link from "next/link";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { addCountry } from "../../../lib/countries";
import { FiCheck } from "react-icons/fi";

function Add() {
  const [nameError, setNameError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const name = useRef(null);
  const code = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.current.value) {
      setNameError(true);
      name.current.focus();
      return;
    } else {
      setNameError("");
    }
    if (!code.current.value) {
      setCodeError(true);
      code.current.focus();
      return;
    } else {
      setCodeError("");
    }

    if (name.current.value && code.current.value) {
      submitData(name.current.value, code.current.value.toUpperCase());
    }
  };

  const submitData = async (name, code) => {
    const response = await addCountry(name, code);
    if (response) {
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 1000);
      document.forms.country.reset();
    } else {
      setIsAdded(false);
    }
  };

  const AllCountry = () => {
    return (
      <Link href="/admin/countries">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Countries
        </a>
      </Link>
    );
  };

  return (
    <>
      <SectionTitle
        title="Countries"
        subtitle="Add New"
        right={<AllCountry />}
      />
      {isAdded && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            New Country added successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="country">
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">
                Country Name<span className="text-red-500">*</span>
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
                Country Code<span className="text-red-500">*</span> (alpha3)
              </div>
              <input
                type="text"
                className={`form-input uppercase ${
                  codeError ? "border-red-400 border-2" : ""
                }`}
                maxLength={3}
                minLength={3}
                ref={code}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setCodeError(false)
                    : setCodeError(true);
                }}
              />
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
