import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../../loader";
import {
  getCountries,
  getStates,
  getCities,
} from "../../../../lib/frontend/locations";
import {
  addPropertyAddress,
  getPropertyByCode,
  updatePropertyAddress,
} from "../../../../lib/frontend/properties";
import AutoComplete from "react-google-autocomplete";

function PropertyAddAddress({ code }) {
  const [propertyId, setPropertyId] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredState, setFilteredState] = useState([]);
  const [filteredCity, setFilteredCity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [back, setBack] = useState(false);
  const [skip, setSkip] = useState(true);
  const [address, setAddress] = useState({});
  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setPropertyId(ids[ids.length - 1]);
    setIsLoading(true);
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
        setIsLoading(false);
      }

      if (router.query.mode === "update") {
        const prpty = await getPropertyByCode(ids[0] + "-" + ids[1]);
        if (prpty?.status) {
          setAddress(prpty?.data?.address);
          if (countries && states && cities) {
            filterState(prpty?.data?.address?.country);
            filterCity(prpty?.data?.address?.state);
          }
          setIsLoading(false);
        } else {
          console.error(prpty.error || prpty.message);
        }
      }
    })();
    setSkip(router.query.skip || true);
    setBack(router.query.back || false);
  }, []);

  const filterState = (e) => {
    let country_id = null;
    if (typeof e !== "number") {
      e.preventDefault();
      country_id = Number(e.target.value);
    } else {
      country_id = address?.country;
    }
    country_id
      ? setFilteredState(
          states.filter((item) => item.country_id === country_id)
        )
      : setFilteredState([]);
  };

  const filterCity = (e) => {
    let state_id = null;
    if (typeof e !== "number") {
      e.preventDefault();
      state_id = Number(e.target.value);
    } else {
      state_id = address?.state;
    }
    state_id
      ? setFilteredCity(cities.filter((item) => item.state_id === state_id))
      : setFilteredCity([]);
  };

  const nextToAmenities = () => {
    localStorage.setItem("next_ap", "AMENITIES");
    router.push(
      "?step=next&next=AMENITIES&id=" +
        code +
        (router.query.mode ? "&mode=" + router.query.mode : "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.add_address);
    formdata.append("propertyId", propertyId);
    router.query.mode === "update" && formdata.append("_method", "PUT");
    if (formdata) {
      submitData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (data) => {
    const response =
      router.query.mode === "update"
        ? await updatePropertyAddress(address?.id, data)
        : await addPropertyAddress(data);
    if (response?.status) {
      setIsLoading(false);
      if (back) {
        router.push("properties");
      } else {
        nextToAmenities();
      }
    } else {
      console.error(response?.error || response?.message);
      setIsLoading(false);
    }
  };

  const handlePlaceSearch = (place) => {
    document.forms.add_address.lattitude.value =
      place.geometry.location.lat("d");
    document.forms.add_address.longitude.value =
      place.geometry.location.lng("d");
    document.forms.add_address.full_address.value = place?.formatted_address;
    document.forms.add_address.pincode.value =
      place?.address_components[4]?.long_name || "";
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
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
          {skip === true && (
            <button
              className="rounded-md text-white px-3 py-2"
              style={{
                backgroundColor: "var(--orange)",
              }}
              onClick={nextToAmenities}
            >
              Skip
            </button>
          )}
        </div>

        {/**google address search */}
        <div className="mt-5" style={{ fontFamily: "Opensans-semi-bold" }}>
          <AutoComplete
            apiKey={process.env.MAP_API_KEY}
            onPlaceSelected={(place) => handlePlaceSearch(place)}
            className="rounded-md border-gray-200 w-full text-sm p-2"
            placeholder="Search address on google..."
            style={{ borderWidth: "1px" }}
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
              value={address?.landmark}
              onChange={inputHandler}
              className="form-input border-gray-200 rounded-md -mt-1"
            ></input>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-3">
            <div className="form-element">
              <label className="form-label">House number</label>
              <input
                type="text"
                name="house_number"
                value={address?.house_number}
                onChange={inputHandler}
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
            <div className="form-element">
              <label className="form-label">Lattitude</label>
              <input
                type="text"
                name="lattitude"
                value={address?.lat}
                onChange={(e) => {
                  setAddress((prev) => ({ ...prev, lat: e.target.value }));
                }}
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
            <div className="form-element">
              <label className="form-label">Longitude</label>
              <input
                type="text"
                name="longitude"
                value={address?.long}
                onChange={(e) => {
                  setAddress((prev) => ({ ...prev, long: e.target.value }));
                }}
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
            <div className="form-element">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={address?.pincode}
                onChange={inputHandler}
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
                className="form-input border-gray-200 rounded-md -mt-1"
                onChange={filterState}
              >
                <option value="">Select</option>
                {countries?.length &&
                  countries.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      selected={item.id === address?.country ? true : false}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-element">
              <label className="form-label">State</label>
              <select
                name="state"
                className="form-input border-gray-200 rounded-md -mt-1"
                onChange={filterCity}
              >
                <option value="">Select</option>
                {filteredState?.length &&
                  filteredState.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      selected={item.id === address?.state ? true : false}
                    >
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-element">
              <label className="form-label">City</label>
              <select
                name="city"
                onChange={inputHandler}
                className="form-input border-gray-200 rounded-md -mt-1"
              >
                <option value="">Select</option>
                {filteredCity?.length &&
                  filteredCity.map((item, index) => (
                    <option
                      key={index}
                      value={item.id}
                      selected={item.id === address?.city ? true : false}
                    >
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
              value={address?.full_address}
              onChange={inputHandler}
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
