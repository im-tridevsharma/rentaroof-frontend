import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";
import Breadcrumb from "../../components/website/Breadcrumb";
import { FiFilter, FiLoader, FiSearch } from "react-icons/fi";
import { FaDirections, FaListAlt } from "react-icons/fa";
import { BiSave } from "react-icons/bi";
import PropertyItem from "../../components/website/PropertyItem";
import {
  saveSearch,
  searchProperties,
  searchPropertiesForCoords,
} from "../../lib/frontend/properties";
import Loader from "../../components/loader";
import {
  useLoadScript,
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import { __d } from "../../server";
import { toast, ToastContainer } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const radius = [
  { label: "Search Radius", value: "" },
  { label: "1KM", value: "1" },
  { label: "2KM", value: "2" },
  { label: "3KM", value: "3" },
  { label: "4KM", value: "4" },
  { label: "5KM", value: "5" },
  { label: "10KM", value: "10" },
  { label: "15KM", value: "15" },
  { label: "20KM", value: "20" },
];

function Map() {
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
  const [onMove, setOnMove] = useState(false);
  const [center, setCenter] = useState(false);
  const [filterData, setFilterData] = useState({
    search: "",
    available_from: "",
    available_to: "",
    budget: "",
    bed: "",
    bath: "",
    ptype: "",
    search_radius: 0.2,
  });
  const [min_price, setMinPrice] = useState(1000);
  const [max_price, setMaxPrice] = useState(0);

  const [total, setTotal] = useState(0);
  const [propertySkip, setPropertySkip] = useState(0);
  const [hasMoreProperty, setHasMoreProperty] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [mapObj, setMapObj] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAP_API_KEY, // Add your API key
  });

  useEffect(() => {
    setSearch(router.query.search);
    setIsLoading(true);
    setParams(router.query);
    setFilterData({
      search: router.query.search,
      available_from: router.query.available_from || "",
      available_to: router.query.available_to || "",
      budget: router.query.budget,
      bed: router.query.bed || "",
      bath: router.query.bath || "",
      ptype: router.query.ptype || "",
      search_radius: router?.query?.search_radius || 1,
    });

    (async () => {
      const queryString = Object.keys(router.query)
        .map((key) => key + "=" + router.query[key])
        .join("&");
      const response = await searchProperties(queryString, propertySkip);
      if (response?.status) {
        setProperties(response?.data);
        if (response?.data?.length) {
          setHasMoreProperty(true);
        } else {
          setHasMoreProperty(false);
        }
        setTotal(response?.total);
        setIsLoading(false);
        if (isLoaded && mapObj) handleOnLoad(mapObj);
      } else {
        setIsLoading(false);
        toast.error(response?.error || response?.message);
      }
    })();

    const budget = router?.query?.budget?.split("-");
    if (budget) {
      setMinPrice(budget[0]?.trim() || 0);
      setMaxPrice(budget[1]?.trim() || 0);
    }
  }, [router?.query]);

  React.useEffect(() => {
    setFilterData((prev) => ({ ...prev, budget: `${min_price}-${max_price}` }));
  }, [min_price, max_price]);

  const fetchNextData = async () => {
    if (!fetching) {
      setFetching(true);
      const queryString = Object.keys(router.query)
        .map((key) => key + "=" + router.query[key])
        .join("&");
      const res = await searchProperties(queryString, propertySkip + 10);
      if (res?.status) {
        setProperties((prev) => [...prev, ...res?.data]);
        setPropertySkip(propertySkip + 10);
        if (properties.length === total) {
          setHasMoreProperty(false);
        } else if (!res?.data?.length) {
          setHasMoreProperty(false);
        }

        setFetching(false);
      }
    }
  };

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

  const handleResize = async () => {
    if (onMove) {
      setIsLoading(true);
      setSearch("");
      const bounds = mapObj.getBounds();
      const center = mapObj.getCenter();

      setCenter({ lat: center.lat(), lng: center.lng() });

      const response = await searchPropertiesForCoords(
        bounds.getNorthEast().lat(),
        bounds.getNorthEast().lng(),
        bounds.getSouthWest().lat(),
        bounds.getSouthWest().lng()
      );

      if (response?.status) {
        setProperties(response?.data);
        setIsLoading(false);
      } else {
        toast.error(response?.error || response?.message);
        setIsLoading(false);
      }
    }
  };

  function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  }

  const processChange = debounce(() => handleResize());

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
      toast.success(res?.message);
    } else {
      setIsLoading(false);
      toast.error(res?.error);
    }
  };

  const renderQuery = () => {
    setPropertySkip(0);
    const queryString = Object.keys(filterData)
      .map((key) => {
        if (filterData[key]) {
          return key + "=" + filterData[key];
        }
      })
      .join("&");
    router.push("/find-property/map?" + queryString);
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

  const getDirection = (lat, lng) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        window
          .open(
            `https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/${lat},${lng}`,
            "_blank"
          )
          .focus();
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const tagline = `Listing property for your search "${search}"`;

  return (
    <>
      <Head>
        <title>Find Property on Map {search ? "for " + search : ""}</title>
      </Head>
      <ToastContainer />
      {isLoading && <Loader />}
      <Header />
      <div
        className="flex flex-col-reverse sm:flex-row p-5 overflow-hidden"
        style={{
          height: "calc(100vh - 120px)",
        }}
      >
        {/**property list */}
        <div className="flex flex-col max-w-2xl w-full">
          {/**refine search */}
          <div className="flex items-center mb-2">
            {/**result count */}
            <p
              className="font-bold mr-3"
              style={{ fontFamily: "Opensans-bold" }}
            >
              {total} Properties
            </p>
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
                setPropertySkip(0);
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
                router.push("/find-property/map?" + queryString);
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
              <button type="submit" data-tip="Search">
                <FiSearch />
              </button>
            </form>
            <FiFilter
              className="cursor-pointer"
              data-tip="Filter Options"
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
                        budget: "",
                        bed: "",
                        bath: "",
                        ptype: "",
                        search_radius: 0.2,
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
                      <span className="mr-2">Budget From</span>
                      <input
                        type="text"
                        name="min"
                        placeholder="eg: 10000"
                        value={min_price}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border-gray-200 text-xs rounded-md"
                        style={{ borderWidth: "1px" }}
                      />
                    </label>
                    <label className="m-2">
                      <span className="mr-2">Budget To</span>
                      <input
                        type="text"
                        name="max"
                        value={filterData?.max_price || max_price}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="eg: 50000"
                        className="border-gray-200 text-xs rounded-md"
                        style={{ borderWidth: "1px" }}
                      />
                    </label>
                  </div>
                )}
                {filterTab === "filters" && (
                  <>
                    <div className="grid grid-cols-3 w-full space-x-2">
                      <label className="my-2">
                        <input
                          type="text"
                          name="bedrooms"
                          placeholder="Bedrooms eg: 2"
                          className="border-gray-200 text-xs rounded-md"
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
                      <label className="my-2">
                        <input
                          type="text"
                          name="bathrooms"
                          placeholder="Bathrooms eg: 1"
                          className="border-gray-200 text-xs rounded-md"
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
                      <label className="my-2">
                        <select
                          name="property_type"
                          className="border-gray-200 text-xs rounded-md"
                          style={{ borderWidth: "1px" }}
                          value={filterData?.ptype}
                          onChange={(e) =>
                            setFilterData((prev) => ({
                              ...prev,
                              ptype: e.target.value,
                            }))
                          }
                        >
                          <option value="">Property Type</option>
                          <option value="apartment">Apartment</option>
                          <option value="individual floor">
                            Individual Floor
                          </option>
                          <option value="independent house">
                            Independent House
                          </option>
                          <option value="villa or farm house">
                            Villa/Farm House
                          </option>
                          <option value="vacation rental">
                            Vacation Rental
                          </option>
                        </select>
                      </label>
                    </div>
                    <select
                      name="property_type"
                      className="border-gray-200 text-xs rounded-md"
                      style={{ borderWidth: "1px" }}
                      value={filterData?.search_radius}
                      onChange={(e) =>
                        setFilterData((prev) => ({
                          ...prev,
                          search_radius: e.target.value,
                        }))
                      }
                    >
                      {radius.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              </div>
            </>
          )}

          {/**properties */}
          <InfiniteScroll
            dataLength={properties.length} //This is important field to render the next data
            next={fetchNextData}
            hasMore={hasMoreProperty}
            height={500}
            loader={
              <div className="mt-3 flex items-center justify-center">
                <FiLoader color="dodgerblue" className="text-xl animate-spin" />
              </div>
            }
            className="grid grid-cols-1 md:grid-cols-2"
          >
            {properties?.length > 0 ? (
              properties?.map((p, i) => (
                <PropertyItem
                  key={i}
                  property={p}
                  overEvent={() => setHoveredProperty(p?.id)}
                  outEvent={() => setHoveredProperty(null)}
                  user={user}
                />
              ))
            ) : (
              <p className="text-red-500 p-3">
                Properties not found for your search!
              </p>
            )}
          </InfiniteScroll>
        </div>
        {/**map */}
        <div className="w-full px-5 mb-10 sm:mb-0">
          {/**some options */}
          <div className="flex items-center justify-end mb-1">
            <label className="text-gray-500 mr-2">
              <input
                type="checkbox"
                className="mr-1"
                checked={onMove}
                onChange={(e) => setOnMove(e.target.checked ? true : false)}
              />
              Search as move map
            </label>
            <button
              className="px-2 py-1 rounded-full text-white flex items-center bg-yellow-500"
              onClick={saveSearchHandle}
            >
              <BiSave className="mr-1" /> Save Search
            </button>
            <FaListAlt
              className="ml-3 text-xl text-gray-700 cursor-pointer"
              data-tip="List View"
              onClick={() => {
                router.push(router.asPath.replace("/map", ""));
              }}
            />
          </div>
          {/**map view */}
          <div className="w-full bg-gray-50 rounded-sm h-128">
            {isLoaded && (properties?.length > 0 || center) && (
              <GoogleMap
                onLoad={handleOnLoad}
                onClick={() => setActiveMarker(null)}
                onBoundsChanged={processChange}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                {properties.map((property) => (
                  <Marker
                    key={property.id}
                    position={{
                      lat: parseFloat(property?.address?.lat || property.lat),
                      lng: parseFloat(property?.address?.long || property.long),
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
                              <div className="flex items-center">
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

                                <div
                                  data-tip="Get Direction"
                                  title="Get Direction"
                                >
                                  <FaDirections
                                    className="ml-2 text-lg cursor-pointer"
                                    onClick={() =>
                                      getDirection(
                                        property?.address?.lat || property.lat,
                                        property?.address?.long || property.long
                                      )
                                    }
                                  />
                                </div>
                              </div>
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
    </>
  );
}

export default Map;
