import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";
import Breadcrumb from "../../components/website/Breadcrumb";
import { FiFilter, FiSearch } from "react-icons/fi";
import { BiSave } from "react-icons/bi";
import PropertyItem from "../../components/website/PropertyItem";
import { saveSearch, searchProperties } from "../../lib/frontend/properties";
import Loader from "../../components/loader";
import {
  useLoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { __d } from "../../server";

function Index() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState({});
  const [filterTab, setFilterTab] = useState("date");
  const [filterMode, setFilterMode] = useState(false);
  const [activeMarker, setActiveMarker] = useState(null);
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [user, setUser] = useState(null);
  const [filterData, setFilterData] = useState({
    search: "",
    available_from: "",
    available_to: "",
    min_price: "",
    max_price: "",
    bed: "",
    bath: "",
    ptype: "",
  });
  const [mapObj, setMapObj] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAP_API_KEY, // Add your API key
  });

  useEffect(() => {
    setSearch(router.query.search);
    setIsLoading(true);
    setParams(router.query);
    (async () => {
      const queryString = Object.keys(router.query)
        .map((key) => key + "=" + router.query[key])
        .join("&");
      const response = await searchProperties(queryString);
      if (response?.status) {
        setProperties(response?.data);
        setIsLoading(false);
        if (isLoaded && mapObj) handleOnLoad(mapObj);
      } else {
        setIsLoading(false);
        console.error(response?.error || response?.message);
      }
    })();
  }, [router.query]);

  useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setUser(u);
      const action = localStorage.getItem("perform")
        ? JSON.parse(localStorage.getItem("perform"))
        : false;
      if (action) {
        if (
          action.pathname === router.pathname &&
          action.module === "saveUserSearch"
        ) {
          setIsLoading(true);
          saveUserSearch({ ...action.params, user_id: u.id });
        }
      }
    }
  }, []);

  const saveSearchHandle = () => {
    if (user) {
      //perform save task
      setIsLoading(true);
      saveUserSearch({ search: router.asPath, user_id: user.id });
    } else if (!user) {
      localStorage.setItem("redirect", router.asPath);
      const actionObj = {
        pathname: router.pathname,
        module: "saveUserSearch",
        params: { search: router.asPath },
      };
      localStorage.setItem("perform", JSON.stringify(actionObj));
      router.push("/login");
    }
  };

  const saveUserSearch = async (data) => {
    const res = await saveSearch(data);
    if (res?.status) {
      setIsLoading(false);
      localStorage.removeItem("perform");
      alert(res?.message);
    } else {
      setIsLoading(false);
      console.error(res?.error);
    }
  };

  const renderQuery = () => {
    const queryString = Object.keys(filterData)
      .map((key) => key + "=" + filterData[key])
      .join("&");
    router.push("/find-property?" + queryString);
  };

  const handleOnLoad = (map) => {
    setMapObj(map);
    const bounds = new window.google.maps.LatLngBounds();
    properties?.length > 0 &&
      properties.forEach((property) =>
        bounds.extend({
          lat: parseFloat(property?.address?.lat),
          lng: parseFloat(property?.address?.long),
        })
      );
    map.fitBounds(bounds);
  };

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const tagline = `Listing property for your search "${search}"`;

  return (
    <>
      <Head>
        <title>Find Property {search ? "for " + search : ""}</title>
      </Head>
      {isLoading && <Loader />}
      <Header />
      <Breadcrumb tagline={tagline} path="Home / property list / search" />
      <div className="flex flex-col-reverse sm:flex-row p-5">
        {/**property list */}
        <div className="flex flex-col max-w-2xl w-full">
          {/**refine search */}
          <div className="flex items-center mb-2">
            <h6
              className="font-bold text-sm"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Refine Search
            </h6>
            <form
              name="refineSearch"
              method="POST"
              style={{
                borderBottomWidth: "1px",
                borderColor: "var(--primary-color)",
                fontFamily: "Opensans-regular",
              }}
              className="flex-1 flex px-3 ml-3"
              onSubmit={(e) => {
                e.preventDefault();
                setSearch(document.forms.refineSearch.search.value);
                setFilterData((prev) => ({
                  ...prev,
                  search: document.forms.refineSearch.search.value,
                }));
                const queryString = Object.keys(params)
                  .map((key) => {
                    if (key === "search") {
                      return (
                        key + "=" + document.forms.refineSearch.search.value
                      );
                    } else {
                      return key + "=" + params[key];
                    }
                  })
                  .join("&");
                router.push("/find-property?" + queryString);
              }}
            >
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Country, City, Address, Postal Code or ID"
                className="border-none flex-1 h-7 focus:ring-0 px-0 text-gray-700 text-sm"
              />
              <button type="submit">
                <FiSearch />
              </button>
            </form>
            <FiFilter
              className="cursor-pointer"
              onClick={() => setFilterMode(!filterMode)}
            />
          </div>
          {filterMode && (
            <>
              <div
                className="flex items-center justify-between"
                style={{
                  fontFamily: "Opensans-semi-bold",
                }}
              >
                <div className="flex items-center">
                  <button
                    className="mr-2 border-b-2"
                    style={{
                      borderBottomColor:
                        filterTab === "date" ? "var(--blue)" : "transparent",
                    }}
                    onClick={() => setFilterTab("date")}
                  >
                    Date
                  </button>
                  <button
                    className="mx-2 px-2 border-b-2"
                    style={{
                      borderBottomColor:
                        filterTab === "price" ? "var(--blue)" : "transparent",
                    }}
                    onClick={() => setFilterTab("price")}
                  >
                    Price
                  </button>
                  <button
                    className="mx-2 px-2 border-b-2"
                    style={{
                      borderBottomColor:
                        filterTab === "filters" ? "var(--blue)" : "transparent",
                    }}
                    onClick={() => setFilterTab("filters")}
                  >
                    Filters
                  </button>
                </div>
                <div>
                  <button
                    className="px-2 py-1 text-xs rounded-md text-white"
                    style={{ backgroundColor: "var(--blue)" }}
                    onClick={renderQuery}
                  >
                    Apply
                  </button>
                  <button
                    className="px-2 ml-1 py-1 text-xs rounded-md text-white bg-red-400"
                    onClick={() => {
                      setFilterData((prev) => ({
                        ...prev,
                        available_from: "",
                        available_to: "",
                        min_price: "",
                        max_price: "",
                        bed: "",
                        bath: "",
                        ptype: "",
                      }));
                      renderQuery();
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-start mb-2">
                {filterTab === "date" && (
                  <div className="grid grid-cols-3 w-full mt-2">
                    <span className="mr-2 mt-2">Available Between</span>
                    <input
                      type="date"
                      name="from"
                      value={filterData?.available_from}
                      onChange={(e) =>
                        setFilterData((prev) => ({
                          ...prev,
                          available_from: e.target.value,
                        }))
                      }
                      className="border-gray-200 text-xs rounded-md"
                      style={{ borderWidth: "1px" }}
                    />
                    <input
                      type="date"
                      name="to"
                      value={filterData?.available_to}
                      onChange={(e) =>
                        setFilterData((prev) => ({
                          ...prev,
                          available_to: e.target.value,
                        }))
                      }
                      className="border-gray-200 text-xs rounded-md mx-1"
                      style={{ borderWidth: "1px" }}
                    />
                  </div>
                )}
                {filterTab === "price" && (
                  <div className="grid grid-cols-2 w-full">
                    <label className="m-2">
                      <span className="mr-2">Min Price</span>
                      <input
                        type="text"
                        name="min"
                        placeholder="eg: 10000"
                        value={filterData?.min_price}
                        onChange={(e) =>
                          setFilterData((prev) => ({
                            ...prev,
                            min_price: e.target.value,
                          }))
                        }
                        className="border-gray-200 text-xs rounded-md"
                        style={{ borderWidth: "1px" }}
                      />
                    </label>
                    <label className="m-2">
                      <span className="mr-2">Max Price</span>
                      <input
                        type="text"
                        name="max"
                        value={filterData?.max_price}
                        onChange={(e) =>
                          setFilterData((prev) => ({
                            ...prev,
                            max_price: e.target.value,
                          }))
                        }
                        placeholder="eg: 50000"
                        className="border-gray-200 text-xs rounded-md"
                        style={{ borderWidth: "1px" }}
                      />
                    </label>
                  </div>
                )}
                {filterTab === "filters" && (
                  <div className="grid grid-cols-3 w-full">
                    <label className="m-2">
                      <span className="mr-2">Bedrooms</span>
                      <input
                        type="text"
                        name="bedrooms"
                        placeholder="eg: 2"
                        className="border-gray-200 text-xs rounded-md w-20"
                        style={{ borderWidth: "1px" }}
                        value={filterData?.bed}
                        onChange={(e) =>
                          setFilterData((prev) => ({
                            ...prev,
                            bed: e.target.value,
                          }))
                        }
                      />
                    </label>
                    <label className="m-2">
                      <span className="mr-2">Bathrooms</span>
                      <input
                        type="text"
                        name="bathrooms"
                        placeholder="eg: 1"
                        className="border-gray-200 text-xs rounded-md w-20"
                        style={{ borderWidth: "1px" }}
                        value={filterData?.bath}
                        onChange={(e) =>
                          setFilterData((prev) => ({
                            ...prev,
                            bath: e.target.value,
                          }))
                        }
                      />
                    </label>
                    <label className="m-2">
                      <span className="mr-2">Property Type</span>
                      <select
                        name="property_type"
                        className="border-gray-200 text-xs rounded-md w-24"
                        style={{ borderWidth: "1px" }}
                        value={filterData?.ptype}
                        onChange={(e) =>
                          setFilterData((prev) => ({
                            ...prev,
                            ptype: e.target.value,
                          }))
                        }
                      >
                        <option value="">Any</option>
                        <option value="detached">Detached</option>
                        <option value="apratment">Apartment</option>
                      </select>
                    </label>
                  </div>
                )}
              </div>{" "}
            </>
          )}

          {/**result count */}
          <p className="font-bold" style={{ fontFamily: "Opensans-bold" }}>
            {properties?.length} Properties {search ? "for " + search : ""}
          </p>
          {/**properties */}
          <div className="flex flex-col mt-3 sm:max-h-128 h-full sm:overflow-hidden sm:overflow-y-auto">
            {properties?.length > 0 ? (
              properties?.map((p, i) => (
                <PropertyItem
                  key={i}
                  property={p}
                  overEvent={() => setHoveredProperty(p?.id)}
                  outEvent={() => setHoveredProperty(null)}
                />
              ))
            ) : (
              <p className="text-red-500 p-3">
                Properties not found for your search!
              </p>
            )}
          </div>
        </div>
        {/**map */}
        <div className="w-full px-5 mb-10 sm:mb-0">
          {/**some options */}
          <div className="flex items-center justify-end mb-1">
            <label className="text-gray-500 mr-2">
              <input type="checkbox" className="mr-1" />
              Search as move map
            </label>
            <button
              className="px-2 py-1 rounded-md text-white flex items-center"
              style={{ backgroundColor: "var(--primary-color)" }}
              onClick={saveSearchHandle}
            >
              <BiSave className="mr-1" /> Save Search
            </button>
          </div>
          {/**map view */}
          <div className="w-full bg-gray-50 rounded-sm h-128">
            {isLoaded && properties?.length > 0 && (
              <GoogleMap
                onLoad={handleOnLoad}
                onClick={() => setActiveMarker(null)}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                {properties.map((property) => (
                  <Marker
                    key={property.id}
                    position={{
                      lat: parseFloat(property?.address?.lat),
                      lng: parseFloat(property?.address?.long),
                    }}
                    onClick={() => handleActiveMarker(property.id)}
                    icon="/icons/home/icon-marker.png"
                    animation={hoveredProperty === property?.id ? 1 : null}
                  >
                    {activeMarker === property.id ? (
                      <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                        <div className="flex flex-col pr-3 pb-3 bg-white rounded-md shadow-sm">
                          <div
                            className="flex items-center"
                            style={{ fontFamily: "Opensans-regular" }}
                          >
                            <img
                              src={
                                property?.front_image ||
                                "/images/website/no_photo.png"
                              }
                              className="w-28 h-28 object-cover rounded-md"
                              alt={`p${property.id}`}
                            />
                            <div className="flex flex-col items-start ml-3">
                              <p style={{ fontFamily: "Opensans-bold" }}>
                                {property?.name}
                              </p>
                              <p
                                className="mt-1"
                                style={{ fontFamily: "Opensans-semi-bold" }}
                              >
                                Rs. {property?.monthly_rent}/month
                              </p>
                              <p>
                                {property?.city_name &&
                                  property?.city_name + ", "}
                                {property?.state_name + ", "}
                                {property?.country_name}
                                {" - " + property?.pincode}
                              </p>
                              <Link
                                href={`/details/properties/${property?.property_code}`}
                              >
                                <a
                                  className="px-2 mt-1 py-1 rounded-md text-white"
                                  style={{ backgroundColor: "var(--blue)" }}
                                >
                                  View
                                </a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </InfoWindow>
                    ) : null}
                  </Marker>
                ))}
              </GoogleMap>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
