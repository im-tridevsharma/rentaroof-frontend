import React from "react";
import Head from "next/head";
import Breadcrumb from "../../components/website/Breadcrumb";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";
import Loader from "../../components/loader";
import { FiSearch } from "react-icons/fi";
import Slider from "react-input-slider";

function Index() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [filters, setFilters] = React.useState({
    priceMonthly: 50000,
    propertySize: 2000,
  });

  const tagline = `Listing property for your search "${search}"`;

  return (
    <>
      <Head>
        <title>Find Property {search ? "for " + search : ""}</title>
      </Head>
      {isLoading && <Loader />}
      <Header />
      <Breadcrumb tagline={tagline} path="Home / property list / search" />
      <div className="flex mt-5 px-5 mb-5">
        {/**filters */}
        <div className="flex-grow border-2 border-gray-200">
          {/**refine search */}
          <form className="flex flex-col relative p-5" name="search">
            <h6 style={{ fontFamily: "Opensans-bold" }}>Refine Search</h6>
            <input
              type="text"
              name="search"
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
                className="border-2 border-gray-200 w-6 h-6"
              />
              <span className="ml-2" style={{ fontSize: ".9rem" }}>
                Save Search
              </span>
            </label>
          </div>
          <hr className="my-5 border-gray-300" />
          <form name="filtes">
            <div className="px-5 -mt-2">
              <h6 style={{ fontFamily: "Opensans-bold" }}>Property Type</h6>
              <select
                name="ptype"
                className="w-full border border-gray-200 rounded-md mt-1"
              >
                <option value="">Any</option>
              </select>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="px-5 -mt-2">
              <h6
                style={{ fontFamily: "Opensans-bold" }}
                className="flex items-center justify-between"
              >
                Price Monthly
                <button type="button">Any</button>
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
                  <span>Rs. {filters?.priceMonthly}</span>
                </label>
              </div>
              <Slider
                axis="x"
                x={filters.priceMonthly}
                xmax={100000}
                xmin={1000}
                onChange={({ x }) =>
                  setFilters((prev) => ({ ...prev, priceMonthly: x }))
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
                style={{ fontFamily: "Opensans-bold" }}
                className="flex items-center justify-between"
              >
                <span>
                  Property Size <small>(sqft)</small>
                </span>
                <button type="button">Any</button>
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
                  <span>{filters?.propertySize}</span>
                </label>
              </div>
              <Slider
                axis="x"
                x={filters.propertySize}
                xmax={10000}
                xmin={100}
                onChange={({ x }) =>
                  setFilters((prev) => ({ ...prev, propertySize: x }))
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
          </form>
        </div>
        {/**properties */}
        <div className="max-w-4xl w-full flex flex-col md:ml-5">properties</div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
