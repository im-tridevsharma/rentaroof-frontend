import React, { useEffect, useState } from "react";
import Head from "next/head";
import Breadcrumb from "../../components/website/Breadcrumb";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";
import Loader from "../../components/loader";
import { FiFilter, FiMapPin, FiSearch } from "react-icons/fi";
import Slider from "react-input-slider";
import { getAmenities } from "../../lib/frontend/share";
import { useRouter } from "next/router";
import FilterProperty from "../../components/website/FilterProperty";
import {
  savePropertyRequirement,
  saveSearch,
  searchProperties,
} from "../../lib/frontend/properties";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { __d } from "../../server";
import { FaTimes } from "react-icons/fa";
import ReactTooltip from "react-tooltip";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "universal-cookie";

function Index({ query }) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState(false);
  const [filters, setFilters] = React.useState({
    search_radius: "",
    search: "",
    ptype: "",
    budget: "1000-",
    min_size: 100,
    max_size: "",
    bed: "",
    bath: "",
    furnishing: "",
    ownership: [],
    readytomove: "",
    amenities: [],
    sorting: "relevance",
    pagination: "yes",
  });
  const [amenities, setAmenities] = useState([]);
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [filterMode, setFilterMode] = useState(false);
  const [min_price, setMinPrice] = useState(1000);
  const [max_price, setMaxPrice] = useState(1000);
  const [isReq, setIsReq] = useState(false);
  const router = useRouter();

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
    const user = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
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

  const previousPage = () => {
    if (pagination?.current_page !== 1) {
      let q = router?.query;
      q["page"] = pagination?.current_page - 1;
      const queryString = Object.keys(q)
        .map((key) => key + "=" + q[key])
        .join("&");
      router.push("/find-property?" + queryString);
    }
  };

  const nextPage = () => {
    if (pagination?.current_page !== pagination?.last_page) {
      let q = router?.query;
      q["page"] = pagination?.current_page + 1;
      const queryString = Object.keys(q)
        .map((key) => key + "=" + q[key])
        .join("&");
      router.push("/find-property?" + queryString);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const queryString = Object.keys(query)
        .map((key) => key + "=" + query[key])
        .join("&");
      const response = await searchProperties(queryString);
      if (response?.status) {
        setProperties(
          router?.query.pagination === "yes"
            ? response?.data.data
            : response?.data
        );
        if (response?.data?.total) {
          setPagination({
            current_page: response?.data.current_page,
            last_page: response?.data.last_page,
            per_page: response?.data.per_page,
            from: response?.data.from,
            to: response?.data.to,
            total: response?.data.total,
          });
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(response?.error || response?.message);
      }
    })();

    let price = query?.budget;
    price = price?.split("-");
    if (price?.length > 0) {
      setMinPrice(price[0]);
      setMaxPrice(price[1]);

      if (price[0] > price[1]) {
        setFilters((prev) => ({ ...prev, budget: `${1000}-${max_price}` }));
      }
    } else {
      setFilters((prev) => ({ ...prev, budget: `${1000}-${0}` }));
    }

    //set filters selected
    setFilters({
      search: query?.search || "",
      ptype: query?.ptype || "",
      budget: query?.budget === undefined ? "1000-50000" : query?.budget,
      min_size: query?.min_size || 100,
      max_size: query?.max_size || "",
      bed: query?.bed || "",
      bath: query?.bath || "",
      furnishing: query?.furnishing || "",
      ownership: query?.ownership ? [...query.ownership.split(",")] : [],
      readytomove: query?.readytomove || "no",
      amenities: query?.amenities ? [...query.amenities.split(",")] : [],
      sorting: query?.sorting || "relevance",
      pagination: "yes",
      search_radius: query?.search_radius,
    });
  }, [router.query]);

  useEffect(() => {
    if (properties?.length === 0 && !isLoading) {
      setIsReq(true);
    } else {
      setIsReq(false);
    }
  }, [properties, isLoading]);

  useEffect(() => {
    const fetchAmenities = async () => {
      setIsLoading(true);
      const res = await getAmenities();
      if (res?.status) {
        setIsLoading(false);
        setAmenities(res?.data);
      } else {
        setIsLoading(false);
        toast.error(res?.error || res?.message);
      }
    };
    fetchAmenities();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    const queryString = Object.keys(filters)
      .map((key) => key + "=" + filters[key])
      .join("&");

    // const location = cookies.get("user-location");
    const location = localStorage.getItem("current-location")
      ? JSON.parse(localStorage.getItem("current-location"))
      : false;

    const locationString = location
      ? Object.keys(location)
          .map((key) => key + "=" + location[key])
          .join("&")
      : "";
    router.push("/find-property?" + queryString + "&" + locationString);
  };

  const sortBy = (e) => {
    e.preventDefault();
    setFilters((p) => ({ ...p, sorting: e.target.value }));
    const queryString = Object.keys(filters)
      .map((key) => {
        if (key === "sorting") {
          return "sorting=" + e.target.value;
        } else {
          return key + "=" + filters[key];
        }
      })
      .join("&");
    router.push("/find-property?" + queryString);
  };

  const handleSaveReqs = async (e) => {
    e.preventDefault();
    const formdata = new FormData(document.forms.requirement);
    setIsLoading(true);
    const res = await savePropertyRequirement(formdata);

    if (res?.status) {
      toast.success(
        "We've received your requirment information. We'll be back to you asap."
      );
      setIsLoading(false);
      setIsReq(false);
    } else {
      setIsLoading(false);
      toast.error(res?.message);
    }
  };

  const tagline = `Listing property for your search "${filters?.search}"`;

  return (
    <>
      <Head>
        <title>
          Find Property {filters?.search ? "for " + filters?.search : ""}
        </title>
      </Head>
      {isLoading && <Loader />}
      <Header />
      <Breadcrumb tagline={tagline} path="Home / property list / search" />
      <div className="flex mt-5 px-5 mb-5">
        {/**filters */}
        <div
          className={`border-2 border-gray-200 max-w-xs w-full ${
            filterMode ? "block absolute bg-white z-40 h-max-content" : "hidden"
          } lg:block lg:h-full`}
        >
          {/**refine search */}
          <form
            className="flex flex-col relative p-5"
            name="search"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(
                "/find-property?pagination=yes&search=" + filters?.search
              );
            }}
          >
            <h6
              style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
              className="flex items-center justify-between"
            >
              Refine Search
              <FaTimes
                className="text-red-500 cursor-pointer text-lg inline-block lg:hidden"
                onClick={() => setFilterMode(false)}
              />
            </h6>
            <input
              type="text"
              name="search"
              value={filters?.search}
              onChange={(e) =>
                setFilters((p) => ({ ...p, search: e.target.value }))
              }
              className="text-sm mt-2 border-b-2 border-t-0 border-l-0 border-r-0 border-transparent border-gray-200 px-0 py-1 focus:ring-0"
              style={{
                outline: "none",
              }}
              placeholder="Search property... eg: 4BHK, 3BHK,..."
            />
            <button
              type="submit"
              className="absolute right-5 bottom-5 text-2xl mb-1 text-gray-600"
            >
              <FiSearch />
            </button>
          </form>
          <div className="px-5" style={{ fontFamily: "Opensans-regular" }}>
            <label className="uppercase text-gray-500 flex items-end">
              <input
                type="checkbox"
                className="border-2 border-gray-200 w-7 h-7"
                onChange={(e) => (e.target.checked ? saveSearchHandle() : "")}
              />
              <span className="ml-2" style={{ fontSize: ".9rem" }}>
                Save Search
              </span>
            </label>
          </div>
          <hr className="my-5 border-gray-300" />
          <form name="filtes" onSubmit={handleFilter}>
            <div className="px-5 -mt-2">
              <h6 style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}>
                Property Type
              </h6>
              <select
                name="ptype"
                value={filters?.ptype}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, ptype: e.target.value }))
                }
                className="w-full border text-sm border-gray-200 rounded-md mt-1"
              >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="individual floor">Individual Floor</option>
                <option value="independent house">Independent House</option>
                <option value="villa or farm house">Villa/Farm House</option>
                <option value="vacation rental">Vacation Rental</option>
              </select>
            </div>
            <div className="px-5 mt-2">
              <h6 style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}>
                Search Radius
              </h6>
              <select
                name="search_radius"
                value={filters?.search_radius}
                onChange={(e) =>
                  setFilters((p) => ({ ...p, search_radius: e.target.value }))
                }
                className="w-full border text-sm border-gray-200 rounded-md mt-1"
              >
                <option value="">Select</option>
                <option value="1">1KM</option>
                <option value="2">2KM</option>
                <option value="3">3KM</option>
                <option value="4">4KM</option>
                <option value="5">5KM</option>
                <option value="6">6KM</option>
                <option value="7">7KM</option>
                <option value="8">8KM</option>
                <option value="9">9KM</option>
                <option value="10">10KM</option>
                <option value="15">15KM</option>
                <option value="20">20KM</option>
              </select>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                Budget
                <button
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, budget: "1000-" }))}
                >
                  Select
                </button>
              </h6>
              <div
                className="flex items-center justify-between text-xs my-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                <label className="flex flex-col">
                  <b>MIN</b>
                  <span>Rs.{min_price === undefined ? 1000 : min_price}</span>
                </label>
                <label className="flex flex-col">
                  <b>MAX</b>
                  <span>Rs. {max_price || 50000}</span>
                </label>
              </div>
              <Slider
                axis="x"
                x={max_price}
                xmax={100000}
                xmin={1000}
                onChange={({ x }) => {
                  setFilters((prev) => ({
                    ...prev,
                    budget: `${min_price || 1000}-${x}`,
                  }));
                  setMinPrice(min_price || 1000);
                  setMaxPrice(x);
                  if (min_price > x) {
                    setMinPrice(1000);
                  }
                }}
                styles={{
                  track: {
                    backgroundColor: "lightgray",
                  },
                  active: {
                    backgroundColor: "var(--blue)",
                  },
                  thumb: {
                    width: 30,
                    height: 30,
                  },
                }}
              />
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                <span>Bedrooms</span>
              </h6>
              <div className="flex items-center mt-1">
                <button
                  className="mr-2"
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bed: "" }))}
                >
                  Select
                </button>
                <button
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mx-2 ${
                    filters?.bed === 1 ? "border border-gray-500" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bed: 1 }))}
                >
                  1
                </button>
                <button
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mx-2 ${
                    filters?.bed === 2 ? "border border-gray-500" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bed: 2 }))}
                >
                  2
                </button>
                <button
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mx-2 ${
                    filters?.bed === 3 ? "border border-gray-500" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bed: 3 }))}
                >
                  3
                </button>
                <button
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mx-2 ${
                    filters?.bed === "4+" ? "border border-gray-500" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bed: "4+" }))}
                >
                  4+
                </button>
              </div>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                <span>Bathrooms</span>
              </h6>
              <div className="flex items-center mt-1">
                <button
                  className="mr-2"
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bath: "" }))}
                >
                  Select
                </button>
                <button
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mx-2 ${
                    filters?.bath === 1 ? "border border-gray-500" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bath: 1 }))}
                >
                  1
                </button>
                <button
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mx-2 ${
                    filters?.bath === 2 ? "border border-gray-500" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bath: 2 }))}
                >
                  2
                </button>
                <button
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mx-2 ${
                    filters?.bath === 3 ? "border border-gray-500" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bath: 3 }))}
                >
                  3
                </button>
                <button
                  className={`w-8 h-8 rounded-full bg-white flex items-center justify-center mx-2 ${
                    filters?.bath === "4+" ? "border border-gray-500" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bath: "4+" }))}
                >
                  4+
                </button>
              </div>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                <span>
                  Property Size <small>(sqft)</small>
                </span>
              </h6>
              <div
                className="flex items-center justify-between text-xs my-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                <label className="flex flex-col">
                  <b>MIN</b>
                  <span>100</span>
                </label>
                <label className="flex flex-col">
                  <b>MAX</b>
                  <span>{filters?.max_size}</span>
                </label>
              </div>
              <Slider
                axis="x"
                x={filters.max_size}
                xmax={10000}
                xmin={100}
                onChange={({ x }) =>
                  setFilters((prev) => ({ ...prev, max_size: x }))
                }
                styles={{
                  track: {
                    backgroundColor: "lightgray",
                  },
                  active: {
                    backgroundColor: "var(--blue)",
                  },
                  thumb: {
                    width: 30,
                    height: 30,
                  },
                }}
              />
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                <span>Furnishing</span>
              </h6>
              <div className="flex items-center mt-1 flex-wrap">
                <button
                  className={`p-2 mb-1 mr-2 rounded-md bg-white flex items-center justify-center mx-1 ${
                    filters?.furnishing === "" ? "bg-gray-100" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, furnishing: "" }))}
                >
                  Select
                </button>
                <button
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-1 ${
                    filters?.furnishing === "furnished" ? "bg-gray-100" : ""
                  }`}
                  type="button"
                  onClick={() =>
                    setFilters((p) => ({ ...p, furnishing: "furnished" }))
                  }
                >
                  Full
                </button>
                <button
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-1 ${
                    filters?.furnishing === "semi-furnished"
                      ? "bg-gray-100"
                      : ""
                  }`}
                  type="button"
                  onClick={() =>
                    setFilters((p) => ({ ...p, furnishing: "semi-furnished" }))
                  }
                >
                  Semi
                </button>
                <button
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-1 ${
                    filters?.furnishing === "unfurnished" ? "bg-gray-100" : ""
                  }`}
                  type="button"
                  onClick={() =>
                    setFilters((p) => ({ ...p, furnishing: "unfurnished" }))
                  }
                >
                  No
                </button>
                <button
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-1 ${
                    filters?.furnishing === "under construction"
                      ? "bg-gray-100"
                      : ""
                  }`}
                  type="button"
                  onClick={() =>
                    setFilters((p) => ({
                      ...p,
                      furnishing: "under construction",
                    }))
                  }
                >
                  Under Construction
                </button>
                <button
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-1 ${
                    filters?.furnishing === "under renovation"
                      ? "bg-gray-100"
                      : ""
                  }`}
                  type="button"
                  onClick={() =>
                    setFilters((p) => ({
                      ...p,
                      furnishing: "under renovation",
                    }))
                  }
                >
                  Under Renovation
                </button>
              </div>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                <span>Ownership Types</span>
              </h6>
              <div className="flex flex-col mt-1">
                <label className="mb-2">
                  <input
                    type="checkbox"
                    checked={filters?.ownership?.length === 0 ? true : false}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        ownership: e.target.checked ? [] : [...p.ownership],
                      }))
                    }
                    className="w-6 h-6 border-2 border-gray-200"
                  />
                  <span className="text-gray-600 ml-2">Select</span>
                </label>
                <label className="mb-2">
                  <input
                    type="checkbox"
                    checked={
                      filters?.ownership?.includes("single") ? true : false
                    }
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        ownership: e.target.checked
                          ? [...p?.ownership, "single"]
                          : [...p.ownership.filter((el) => el !== "single")],
                      }))
                    }
                    className="w-6 h-6 border-2 border-gray-200"
                  />
                  <span className="text-gray-600 ml-2">Single</span>
                </label>
                <label className="mb-2">
                  <input
                    type="checkbox"
                    checked={
                      filters?.ownership?.includes("joint") ? true : false
                    }
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        ownership: e.target.checked
                          ? [...p?.ownership, "joint"]
                          : [...p.ownership.filter((el) => el !== "joint")],
                      }))
                    }
                    className="w-6 h-6 border-2 border-gray-200"
                  />
                  <span className="text-gray-600 ml-2">Joint</span>
                </label>
              </div>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                <span>Ready to Move</span>
              </h6>
              <label className="mt-2 block">
                <input
                  type="checkbox"
                  checked={filters?.readytomove === "yes" ? true : false}
                  onChange={(e) =>
                    setFilters((p) => ({
                      ...p,
                      readytomove: e.target.checked ? "yes" : "no",
                    }))
                  }
                  className="w-6 h-6 border-2 border-gray-200"
                />
                <span className="ml-2 text-gray-600">Ready to Move</span>
              </label>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                <span>Amenities</span>
              </h6>
              <div className="flex flex-col">
                {amenities?.length > 0 &&
                  amenities.map((a, i) => (
                    <label className="mt-2" key={i}>
                      <input
                        type="checkbox"
                        checked={
                          filters?.amenities?.includes(a?.id.toString())
                            ? true
                            : false
                        }
                        onChange={(e) =>
                          setFilters((p) => ({
                            ...p,
                            amenities: e.target.checked
                              ? [...p?.amenities, a?.id.toString()]
                              : [
                                  ...p.amenities.filter(
                                    (el) => el !== a?.id.toString()
                                  ),
                                ],
                          }))
                        }
                        className="w-6 h-6 border-2 border-gray-200"
                      />
                      <span className="ml-2 text-gray-600">{a?.title}</span>
                    </label>
                  ))}
              </div>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2 mb-3">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                <button
                  onClick={() => {
                    setFilters({
                      search: "",
                      ptype: "",
                      min_price: 1000,
                      max_price: "",
                      min_size: 100,
                      max_size: "",
                      bed: "",
                      bath: "",
                      furnishing: "",
                      ownership: [],
                      readytomove: "",
                      amenities: [],
                      pagination: "yes",
                    });
                    router.push(
                      "/find-property?pagination=yes&search=" + filters?.search
                    );
                  }}
                  type="button"
                  className="text-gray-400"
                >
                  Clear All
                </button>
                <button type="submit">Apply</button>
              </h6>
            </div>
          </form>
        </div>
        {/**properties */}
        <div className="flex flex-col flex-1 lg:ml-5">
          <div className="flex items-center justify-between border-2 border-gray-200 px-2">
            <p className="flex items-center">
              <FiFilter
                className="text-lg mr-3 cursor-pointer inline-block lg:hidden"
                onClick={() => setFilterMode(true)}
              />
              Showing
              <b className="mx-2">
                {pagination?.from}-{pagination?.to} of {pagination?.total}
              </b>
              Properties
            </p>
            <div className="flex items-center">
              <label className="uppercase">
                <span
                  style={{ fontFamily: "Opensans-bold", color: "var(--blue)" }}
                >
                  Sort by:
                </span>
                <select
                  className="border-none text-sm outline-none ml-1"
                  value={filters?.sorting}
                  onChange={(e) => sortBy(e)}
                >
                  <option value="relevance">Oldest</option>
                  <option value="newest">Newest</option>
                </select>
              </label>
              <button
                style={{
                  fontFamily: "Opensans-bold",
                  color: "var(--primary-color)",
                }}
                className="flex items-center"
                onClick={() => {
                  localStorage.setItem("list-view", router.asPath);
                  router.push(
                    router.asPath
                      .replace("find-property", "find-property/map")
                      .replace("&pagination=yes", "")
                      .replace("pagination=yes&", "")
                  );
                }}
                type="button"
              >
                <FiMapPin className="text-lg mr-1" />
                Map
              </button>
            </div>
          </div>
          {/**result */}
          <div className="flex flex-col mt-3">
            {properties?.length > 0 ? (
              properties.map((p, i) => (
                <FilterProperty key={i} property={p} user={user} />
              ))
            ) : (
              <div className="text-red-400">
                <p>Properties not found!</p>
                <button
                  className="px-3 py-2 mt-5 text-white rounded-md"
                  style={{ background: "var(--blue)" }}
                  onClick={() => setIsReq(true)}
                >
                  Send Your Requirement
                </button>
              </div>
            )}
          </div>
          <div className="flex items-end justify-end">
            <button
              className={`h-10 w-10 flex items-center justify-center mr-3 hover:bg-gray-100 ${
                pagination?.current_page === 1 ? "bg-gray-100" : "bg-gray-200"
              } rounded-full`}
              onClick={previousPage}
              data-tip="Previous Page"
            >
              <GrLinkPrevious />
              <ReactTooltip />
            </button>
            <button
              className={`h-10 w-10 flex items-center justify-center hover:bg-gray-100 ${
                pagination?.current_page === pagination?.last_page
                  ? "bg-gray-100"
                  : "bg-gray-200"
              } rounded-full`}
              onClick={nextPage}
              data-tip="Next Page"
            >
              <GrLinkNext />
              <ReactTooltip />
            </button>
          </div>
        </div>
      </div>

      {isReq && (
        <div
          className=" fixed top-0 left-0 w-full h-screen z-40"
          style={{ background: "rgba(0,0,0,.4)" }}
        >
          <div className="rounded-md p-5 max-w-4xl w-full bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h4
              style={{ fontFamily: "Opensans-bold" }}
              className="text-xl flex items-center justify-between"
            >
              Let us know your requirement!
              <FaTimes
                color="red"
                className="cursor-pointer"
                onClick={() => setIsReq(false)}
              />
            </h4>
            <hr className="my-3" />

            <form method="POST" onSubmit={handleSaveReqs} name="requirement">
              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
                <div className="form-element">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="form-input rounded-md border-gray-400"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    required
                    name="email"
                    className="form-input rounded-md border-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
                <div className="form-element">
                  <label className="form-label">Your Number</label>
                  <input
                    type="text"
                    name="mobile"
                    required
                    className="form-input rounded-md border-gray-400"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Your Location</label>
                  <input
                    type="text"
                    name="location"
                    required
                    className="form-input rounded-md border-gray-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-4">
                <div className="form-element">
                  <label className="form-label">Property Type</label>
                  <select
                    name="property_type"
                    required
                    className="form-input border-gray-400 rounded-md"
                  >
                    <option value="">Select</option>
                    <option value="apartment">Apartment</option>
                    <option value="individual floor">Individual Floor</option>
                    <option value="independent house">Independent House</option>
                    <option value="villa or farm house">
                      Villa/Farm House
                    </option>
                    <option value="vacation rental">Vacation Rental</option>
                  </select>
                </div>
                <div className="form-element">
                  <label className="form-label">Society Name</label>
                  <input
                    type="text"
                    required
                    name="society_name"
                    className="form-input rounded-md border-gray-400"
                  />
                </div>
              </div>
              <div className="form-element">
                <label className="form-label">Your Message</label>
                <textarea
                  name="message"
                  className="form-input rounded-md border-gray-400"
                ></textarea>
              </div>

              <button
                className="px-3 py-2 float-right text-white rounded-md"
                style={{ background: "var(--blue)" }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

Index.getInitialProps = ({ query }) => {
  return {
    query,
  };
};

export default Index;
