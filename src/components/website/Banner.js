import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";
import Search from "./forms/Search";
import Loader from "../../components/loader";

function Banner() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const s_value = document.forms.findProperty.search.value;
    router.push(`find-property?search=${s_value}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full h-128 bg-gray-500 relative">
        <img
          src="https://www.wallpaperkiss.com/wimg/b/216-2169318_big.jpg"
          alt="banner"
          className="w-full h-128 object-cover filter brightness-50"
        />
        <div className="absolute  max-w-4xl w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2 className="font-bold text-2xl text-white drop-shadow-lg">
            Find Your Perfect Rental Home
          </h2>
          <div
            className="p-2 rounded-lg"
            style={{ backgroundColor: "rgba(0,0,0,.5)" }}
          >
            <form name="findProperty" method="POST" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row items-center">
                <input
                  type="text"
                  name="type"
                  readOnly
                  value="Rent"
                  className="rounded-sm w-20 text-gray-500 sm:w-40 border-none h-10 text-sm text-center sm:text-left mb-1 sm:mb-0"
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search by region, suburb, postcode or property Id"
                  className="rounded-sm w-72 text-gray-500 sm:flex-grow border-none h-10 ml-1 text-sm mb-1 sm:mb-0"
                />
                <button
                  type="submit"
                  className="px-8 sm:px-10 py-2 text-white rounded-md ml-3 text-xl"
                  style={{ backgroundColor: "#7b4a9c" }}
                >
                  <FaSearch />
                </button>
              </div>
              <div className="flex mt-1 flex-col sm:flex-row">
                <Search label="Any property type" name="property_type" />
                <Search label="Any Bed" name="bed_type" />
                <Search label="Any Bath" name="bath_type" />
                <Search label="Any Parking" name="parking_type" />
                <Search label="Min Price" name="min_price" />
                <Search label="Max Price" name="max_price" />
                <label className="mt-1 cursor-pointer" htmlFor="suburb">
                  <input
                    type="checkbox"
                    name="suburb"
                    id="suburb"
                    className="w-7 h-7 border-none bg-gray-300 cursor-pointer"
                  />
                  <span className="text-gray-300 font-bold ml-3">SUBURB</span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
