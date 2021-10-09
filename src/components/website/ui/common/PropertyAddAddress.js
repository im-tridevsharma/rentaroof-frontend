import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../../loader";
import {
  getCountries,
  getStates,
  getCities,
} from "../../../../lib/frontend/locations";
import { addPropertyAddress } from "../../../../lib/frontend/properties";

function PropertyAddAddress({ code }) {
  const [propertyId, setPropertyId] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setPropertyId(ids[ids.length - 1]);

    (async () => {
      const country_data = await getCountries();
      const state_data = await getStates();
      const city_data = await getCities();

      if (country_data?.status) {
        setCountries(country_data.data);
      }
      if (state_data?.status) {
        setStates(state_data.data);
      }
      if (city_data?.status) {
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

  const nextToAmenities = () => {
    localStorage.setItem("next_ap", "AMENITIES");
    router.push("?step=next&next=AMENITIES&id=" + code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.add_address);
    formdata.append("propertyId", propertyId);
    if (formdata) {
      submitData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (data) => {
    const response = await addPropertyAddress(data);
    if (response?.status) {
      setIsLoading(false);
      nextToAmenities();
    } else {
      console.error(response?.error || response?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**header */}
        <div
          className="flex items-center justify-between"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          <h5>Add Property Address</h5>
          <button
            className="rounded-md text-white px-3 py-2"
            style={{
              backgroundColor: "var(--orange)",
            }}
            onClick={nextToAmenities}
          >
            Skip
          </button>
        </div>

        {/**google address search */}
        <div className="mt-5" style={{ fontFamily: "Opensans-semi-bold" }}>
          <input
            type="text"
            id="gaddress"
            className="rounded-md border-gray-200 w-full text-sm"
            placeholder="Search address on google..."
          />
        </div>

        {/**form */}
        <form
          name="add_address"
          className="mt-5"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="form-element">
            <label className="form-label">Landmark</label>
            <input
              type="text"
              name="landmark"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></input>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-3">
            <div className="form-element">
              <label className="form-label">House number</label>
              <input
                type="text"
                name="house_number"
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
            <div className="form-element">
              <label className="form-label">Lattitude</label>
              <input
                type="text"
                name="lattitude"
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
            <div className="form-element">
              <label className="form-label">Longitude</label>
              <input
                type="text"
                name="longitude"
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
            <div className="form-element">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                maxLength="6"
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
            <div className="form-element">
              <label className="form-label">Country</label>
              <select
                name="country"
                maxLength="6"
                className="form-input border-gray-200 rounded-md -mt-1"
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
              <label className="form-label">State</label>
              <select
                name="state"
                maxLength="6"
                className="form-input border-gray-200 rounded-md -mt-1"
                onChange={filterCity}
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
              <label className="form-label">City</label>
              <select
                name="city"
                maxLength="6"
                className="form-input border-gray-200 rounded-md -mt-1"
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
            <label className="form-label">Full Address</label>
            <textarea
              name="full_address"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></textarea>
          </div>
          <div className="text-right w-full">
            <button
              className="text-white rounded-md px-3 py-2 mt-3"
              style={{
                backgroundColor: "var(--blue)",
                fontFamily: "Opensans-semi-bold",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PropertyAddAddress;
