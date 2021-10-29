import React, { useState } from "react";
import {
  useLoadScript,
  GoogleMap,
  Marker,
  StreetViewPanorama,
} from "@react-google-maps/api";
import {
  addPropertyAddressPin,
  searchProperties,
} from "../../../../lib/frontend/properties";
import Loader from "../../../loader";
import { FiCheckSquare } from "react-icons/fi";
import { __d } from "../../../../server";

function MapUI() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [search, setSearch] = useState("");
  const [property, setProperty] = useState(false);
  const [properties, setProperties] = useState([]);
  const [center, setCenter] = useState({
    lat: 37.869085,
    lng: -122.254775,
  });
  const [pin, setPin] = useState({
    zoom: 5,
    street_view: false,
  });

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAP_API_KEY, // Add your API key
  });

  React.useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setUser(u);
    }
    property &&
      setCenter({
        lat: parseFloat(property?.address?.lat),
        lng: parseFloat(property?.address?.long),
      });
  }, [property]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await searchProperties(
      `posted_by=${user?.id}&search=${search}`
    );
    if (res?.status) {
      setProperties(res?.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      console.error(res?.error || res?.message);
    }
  };

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formdata = new FormData(document.forms.pin);
    formdata.append("street_view", pin.street_view);
    formdata.append("zoom_level", pin.zoom);

    const res = await addPropertyAddressPin(property?.id, formdata);
    if (res?.status) {
      setIsLoading(false);
      setIsAdded(true);
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } else {
      console.error(res?.error || res?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col bg-white border-2 border-gray-200 rounded-md p-5">
        {/**title */}
        <h6
          style={{ fontFamily: "Opensans-bold" }}
          className="text-center my-2"
        >
          Property on Google Map
        </h6>
        {/**search bar */}
        <form name="search" onSubmit={handleSearch}>
          <div
            className="flex items-center max-w-4xl mx-auto mt-5"
            style={{ fontFamily: "Opensans-regular" }}
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search your property..."
              className="flex flex-grow rounded-md text-sm border-2 border-gray-200 focus:ring-0 mr-3"
            />
            <button
              type="submit"
              className="py-2 px-5 text-white rounded-md"
              style={{
                backgroundColor: "var(--blue)",
                fontFamily: "Opensans-semi-bold",
              }}
            >
              Submit
            </button>
          </div>
        </form>
        {/**search results */}
        <div className="flex flex-col mt-1 max-w-4xl mx-auto w-full">
          {properties?.length > 0 ? (
            properties.map((p, i) => (
              <div
                key={i}
                className="flex items-center cursor-pointer py-1 shadow-sm mb-1 hover:bg-gray-100"
                onClick={() => {
                  setProperty(p);
                  setCenter({
                    lat: parseFloat(p?.address?.lat),
                    lng: parseFloat(p?.address?.long),
                  });
                }}
              >
                <img
                  src={p?.front_image}
                  alt="p"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div
                  className="flex flex-col ml-3"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  <h6 className="text-sm">
                    {p?.name} - {p?.property_code}
                  </h6>
                  <p className="text-sm">
                    {p?.short_description.substring(0, 100)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-red-500 p-3">Property not found!</p>
          )}
        </div>
        {/**map view */}
        <div className="w-full mt-5 border-2 h-96 border-gray-200 rounded-md">
          {isLoaded && (
            <GoogleMap
              center={center}
              zoom={property ? parseInt(pin?.zoom) : 5}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {property && (
                <Marker
                  key={property.id}
                  position={{
                    lat: parseFloat(property?.address?.lat),
                    lng: parseFloat(property?.address?.long),
                  }}
                  icon="/icons/home/icon-marker.png"
                ></Marker>
              )}
              {property && pin?.street_view === "yes" && (
                <StreetViewPanorama position={center} visible={true} />
              )}
            </GoogleMap>
          )}
        </div>
        {/**pin section */}
        <div className="mt-3 flex flex-col">
          <p
            className="px-5 py-2 text-white rounded-md w-full text-center"
            style={{ backgroundColor: "var(--blue)" }}
          >
            Place Pin with Property Address
          </p>
          {isAdded && (
            <p className="text-green-600 py-2 flex items-center">
              <FiCheckSquare className="mr-2" /> Address pin setting is saved
              successfully.
            </p>
          )}
          <form
            name="pin"
            style={{ fontFamily: "Opensans-semi-bold" }}
            className="mt-5"
            onSubmit={handlePinSubmit}
          >
            <div className="form-element">
              <div className="form-label">
                Address (* only street name and building no):{" "}
              </div>
              <input
                type="text"
                name="full_address"
                value={property?.address?.full_address}
                onChange={(e) =>
                  setProperty((p) => ({
                    ...p,
                    address: { ...p.address, full_address: e.target.value },
                  }))
                }
                className="form-input border-gray-300 rounded-md"
              />
            </div>

            <div className="max-w-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
                <div className="form-element">
                  <div className="form-label">Zip:</div>
                  <input
                    type="text"
                    name="pincode"
                    value={property?.address?.pincode}
                    onChange={(e) =>
                      setProperty((p) => ({
                        ...p,
                        address: { ...p.address, pincode: e.target.value },
                      }))
                    }
                    className="form-input border-gray-300 rounded-md"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label">Country:</div>
                  <input
                    type="text"
                    name="country"
                    value={property?.country_name}
                    onChange={(e) =>
                      setProperty((p) => ({
                        ...p,
                        country_name: e.target.value,
                      }))
                    }
                    className="form-input border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
                <div className="form-element">
                  <div className="form-label">Latitude:</div>
                  <input
                    type="text"
                    name="lat"
                    value={property?.address?.lat}
                    onChange={(e) =>
                      setProperty((p) => ({
                        ...p,
                        address: { ...p.address, lat: e.target.value },
                      }))
                    }
                    className="form-input border-gray-300 rounded-md"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label">Longitude:</div>
                  <input
                    type="text"
                    name="long"
                    value={property?.address?.long}
                    onChange={(e) =>
                      setProperty((p) => ({
                        ...p,
                        address: { ...p.address, long: e.target.value },
                      }))
                    }
                    className="form-input border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
                <div className="form-element">
                  <div className="form-label">Zoom level for map (1-20):</div>
                  <input
                    type="text"
                    value={pin?.zoom}
                    onChange={(e) =>
                      setPin((p) => ({ ...p, zoom: e.target.value }))
                    }
                    className="form-input border-gray-300 rounded-md"
                  />
                </div>
                <div className="form-element">
                  <div className="form-label">Enable Google Street View:</div>
                  <input
                    type="checkbox"
                    checked={pin?.street_view === "yes" ? true : false}
                    onChange={(e) =>
                      setPin((p) => ({
                        ...p,
                        street_view: e.target.checked ? "yes" : "no",
                      }))
                    }
                    className="border-gray-300 rounded-md h-8 w-8"
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="py-2 px-5 text-white rounded-md"
              style={{
                backgroundColor: "var(--blue)",
                fontFamily: "Opensans-semi-bold",
              }}
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default MapUI;
