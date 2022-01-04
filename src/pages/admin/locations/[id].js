import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import Alert from "../../../components/alerts";
import SectionTitle from "../../../components/section-title";
import getCities from "../../../lib/cities";
import { getLocationById, updateLocation } from "../../../lib/locations";
import Loader from "../../../components/loader";

function Update() {
  const router = useRouter();
  const [location, setLocation] = useState({ name: "", city_id: "" });
  const [nameError, setNameError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [cities, setCities] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const id = router.query.id;
    if (id) {
      (async () => {
        setIsLoading(true);
        const city = await getCities();
        if (city) {
          setCities(city.data);
          setIsLoading(false);
        }
        //fetch location
        const response = await getLocationById(id);
        if (response?.status) {
          setLocation(response.data);
        } else {
          router.push("/admin");
        }
      })();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!location?.name) {
      setNameError(true);
      document.forms.state.name.focus();
      setIsLoading(false);
      return;
    }
    if (!location?.city_id) {
      setStateError(true);
      document.forms.city_id.code.focus();
      setIsLoading(false);
      return;
    }

    if (location?.name && location?.city_id) {
      submitData(location);
    }
  };

  const submitData = async (data) => {
    if (data?.name && data?.city_id) {
      const response = await updateLocation(data?.id, data?.name, data?.city_id);
      if (response?.status) {
        setIsUpdated(true);
        setTimeout(() => {
          setIsUpdated(false);
        }, 1000);
        setIsLoading(false);
      }
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
      <SectionTitle
        title="Locations"
        subtitle="Update Location"
        right={<AllLocations />}
      />
      {isUpdated && (
        <div className="w-full mb-4">
          <Alert
            icon={<FiCheck className="mr-2" />}
            color="bg-white dark:bg-gray-800 border-green-500 text-green-500"
            borderLeft
            raised
          >
            Location updated successfully.
          </Alert>
        </div>
      )}
      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form method="POST" onSubmit={handleSubmit} name="state">
          <div className="grid sm:grid-cols-2 space-x-2">
            <div className="form-element">
              <div className="form-label">Location Name</div>
              <input
                type="text"
                name="name"
                className={`form-input ${
                  nameError ? "border-red-400 border-2" : ""
                }`}
                value={location?.name}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setNameError(false)
                    : setNameError(true);
                  setLocation({ ...location, name: e.target.value });
                }}
              />
            </div>
            <div className="form-element">
              <div className="form-label">City</div>
              <select
                className={`form-input ${
                  stateError ? "border-red-400 border-2" : ""
                }`}
                value={location?.city_id}
                onChange={(e) => {
                  e.target.value !== ""
                    ? setStateError(false)
                    : setStateError(true);
                  setLocation({ ...location, city_id: e.target.value });
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

export default Update;
