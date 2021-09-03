import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import { getCountryById, updateCountry } from "../../../lib/countries";

function Update() {
  const router = useRouter();
  const [country, setCountry] = useState({ name: "", code: "" });
  const [nameError, setNameError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      (async () => {
        const response = await getCountryById(id);
        if (response) {
          setCountry(response.data);
        } else {
          router.push("/admin");
        }
      })();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!country?.name) {
      setNameError(true);
      document.forms.country.name.focus();
      return;
    }
    if (!country?.code) {
      setCodeError(true);
      document.forms.country.code.focus();
      return;
    }

    if (country?.name && country?.code) {
      submitData(country);
    }
  };

  const submitData = async (data) => {
    if (data?.name && data?.code) {
      const response = await updateCountry(data?.id, data?.name, data?.code);
      if (response) {
        setIsUpdated(true);
        setTimeout(() => {
          setIsUpdated(false);
        }, 1000);
      } else {
        router.push("/admin");
      }
    }
  };

  const AllCountries = () => {
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
        subtitle="Update Country"
        right={<AllCountries />}
      />
      {isUpdated && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white border-green-500 text-green-500"
            borderLeft
            raised
          >
            Country updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col px-5 py-3 rounded-lg border-gray-100 border-2">
        <form method="POST" onSubmit={handleSubmit} name="country">
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">Country Name</div>
              <input
                type="text"
                name="name"
                className={`form-input ${
                  nameError ? "border-red-400 border-2" : ""
                }`}
                value={country?.name}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setNameError(false)
                    : setNameError(true);
                  setCountry({ ...country, name: e.target.value });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">Country Code (alpha3)</div>
              <input
                type="text"
                name="code"
                className={`form-input ${
                  codeError ? "border-red-400 border-2" : ""
                }`}
                maxLength={3}
                minLength={3}
                value={country?.code}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setCodeError(false)
                    : setCodeError(true);
                  setCountry({ ...country, code: e.target.value });
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

export default Update;
