import React, { useEffect, useState } from "react";
import Head from "next/head";
import Breadcrumb from "../../components/website/Breadcrumb";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";
import Loader from "../../components/loader";
import { FiMapPin, FiSearch } from "react-icons/fi";
import Slider from "react-input-slider";
import { getAmenities } from "../../lib/frontend/share";
import { useRouter } from "next/router";
import FilterProperty from "../../components/website/FilterProperty";
import { saveSearch, searchProperties } from "../../lib/frontend/properties";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { __d } from "../../server";

function Index({ query }) {
  const [isLoading, setIsLoading] = React.useState(false);
  const [filters, setFilters] = React.useState({
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
    sorting: "relevance",
    pagination: "yes",
  });
  const [amenities, setAmenities] = useState([]);
  const [properties, setProperties] = useState([]);
  const [pagination, setPagination] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
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
      alert(res?.message);
    } else {
      setIsLoading(false);
      console.error(res?.error);
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
        console.error(response?.error || response?.message);
      }
    })();

    //set filters selected
    setFilters({
      search: query?.search || "",
      ptype: query?.ptype || "",
      min_price: query?.min_price || 1000,
      max_price: query?.max_price || "",
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
    });
  }, [router.query]);

  useEffect(() => {
    const fetchAmenities = async () => {
      setIsLoading(true);
      const res = await getAmenities();
      if (res?.status) {
        setIsLoading(false);
        setAmenities(res?.data);
      } else {
        setIsLoading(false);
        console.error(res?.error || res?.message);
      }
    };
    fetchAmenities();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    const queryString = Object.keys(filters)
      .map((key) => key + "=" + filters[key])
      .join("&");
    router.push("/find-property?" + queryString);
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
        <div className="flex-grow border-2 border-gray-200 max-w-sm w-full h-full">
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
            <h6 style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}>
              Refine Search
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
              placeholder="Country, City, Address, Postal code or ID"
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
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="building">Building</option>
                <option value="home">Home</option>
                <option value="land & industrial">Land & Industrial</option>
                <option value="vacation rental">Vacation Rental</option>
              </select>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold", fontSize: "15px" }}
                className="flex items-center justify-between"
              >
                Price Monthly
                <button
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, max_price: "" }))}
                >
                  Any
                </button>
              </h6>
              <div
                className="flex items-center justify-between text-xs my-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                <label className="flex flex-col">
                  <b>MIN</b>
                  <span>Rs.1000</span>
                </label>
                <label className="flex flex-col">
                  <b>MAX</b>
                  <span>Rs. {filters?.max_price}</span>
                </label>
              </div>
              <Slider
                axis="x"
                x={filters.max_price}
                xmax={100000}
                xmin={1000}
                onChange={({ x }) =>
                  setFilters((prev) => ({ ...prev, max_price: x }))
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
                <span>Bedrooms</span>
              </h6>
              <div className="flex items-center mt-1">
                <button
                  className="mr-2"
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, bed: "" }))}
                >
                  Any
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
                  Any
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
                <button
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, max_size: "" }))}
                >
                  Any
                </button>
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
              <div className="flex items-center mt-1">
                <button
                  className={`p-2 mb-1 mr-2 rounded-md bg-white flex items-center justify-center mx-2 ${
                    filters?.furnishing === "" ? "bg-gray-100" : ""
                  }`}
                  type="button"
                  onClick={() => setFilters((p) => ({ ...p, furnishing: "" }))}
                >
                  Any
                </button>
                <button
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-2 ${
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
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-2 ${
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
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-2 ${
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
                  className={`p-2 mb-1 rounded-md bg-white flex items-center justify-center mx-2 ${
                    filters?.furnishing === "ongoing" ? "bg-gray-100" : ""
                  }`}
                  type="button"
                  onClick={() =>
                    setFilters((p) => ({ ...p, furnishing: "ongoing" }))
                  }
                >
                  Ongoing
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
                  <span className="text-gray-600 ml-2">Any</span>
                </label>
                <label className="mb-2">
                  <input
                    type="checkbox"
                    checked={
                      filters?.ownership?.includes("sole") ? true : false
                    }
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        ownership: e.target.checked
                          ? [...p?.ownership, "sole"]
                          : [...p.ownership.filter((el) => el !== "sole")],
                      }))
                    }
                    className="w-6 h-6 border-2 border-gray-200"
                  />
                  <span className="text-gray-600 ml-2">Sole</span>
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
                <label className="mb-2">
                  <input
                    type="checkbox"
                    checked={
                      filters?.ownership?.includes("ownership") ? true : false
                    }
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        ownership: e.target.checked
                          ? [...p?.ownership, "ownership"]
                          : [...p.ownership.filter((el) => el !== "ownership")],
                      }))
                    }
                    className="w-6 h-6 border-2 border-gray-200"
                  />
                  <span className="text-gray-600 ml-2">Ownership</span>
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
        <div className="flex flex-col flex-1 md:ml-5">
          <div className="flex items-center justify-between border-2 border-gray-200 px-2">
            <p>
              Showing{" "}
              <b>
                {pagination?.from}-{pagination?.to} of {pagination?.total}
              </b>{" "}
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
                  <option value="relevance">Relevance</option>
                  <option value="newest">Newest</option>
                </select>
              </label>
              <button
                style={{
                  fontFamily: "Opensans-bold",
                  color: "var(--primary-color)",
                }}
                className="flex items-center"
                onClick={() =>
                  router.push(
                    router.asPath
                      .replace("find-property", "find-property/map")
                      .replace("&pagination=yes", "")
                  )
                }
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
              properties.map((p, i) => <FilterProperty key={i} property={p} />)
            ) : (
              <p className="text-red-500 p-3">Properties not found!</p>
            )}
          </div>
          <div className="flex items-end justify-end">
            <button
              className={`h-10 w-10 flex items-center justify-center mr-3 hover:bg-gray-100 ${
                pagination?.current_page === 1 ? "bg-gray-100" : "bg-gray-200"
              } rounded-full`}
              onClick={previousPage}
            >
              <GrLinkPrevious />
            </button>
            <button
              className={`h-10 w-10 flex items-center justify-center hover:bg-gray-100 ${
                pagination?.current_page === pagination?.last_page
                  ? "bg-gray-100"
                  : "bg-gray-200"
              } rounded-full`}
              onClick={nextPage}
            >
              <GrLinkNext />
            </button>
          </div>
        </div>
      </div>
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
