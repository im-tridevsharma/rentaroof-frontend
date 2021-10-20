import React, { useState } from "react";
import { useRouter } from "next/router";
import Search from "./forms/Search";
import Loader from "../../components/loader";
import { useSelector, shallowEqual } from "react-redux";

const ptype_options = [
  { value: "apartment", label: "Apartment" },
  { value: "building", label: "Building" },
  { value: "home", label: "Home" },
  { value: "land & industrial", label: "Land & Industrial" },
  { value: "vacation rental", label: "Vacation Rental" },
];

const counts = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 },
  { value: 6, label: 6 },
  { value: 7, label: 7 },
  { value: 8, label: 8 },
  { value: 9, label: 9 },
  { value: 10, label: 10 },
];

const parking_options = [
  {
    value: "yes",
    label: "Yes",
  },
  { value: "no", label: "No" },
];

const price_options = [
  {
    value: "1000.00",
    label: "Rs. 1000",
  },
  {
    value: "2000.00",
    label: "Rs. 2000",
  },
  {
    value: "5000.00",
    label: "Rs. 5000",
  },
  {
    value: "10000.00",
    label: "Rs. 10,000",
  },
  {
    value: "20000.00",
    label: "Rs. 20,000",
  },
  {
    value: "50000.00",
    label: "Rs. 50,000",
  },
  {
    value: "100000.00",
    label: "Rs. 100,000",
  },
];

function Banner() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const s_value = document.forms.findProperty.search.value;
    const ptype = document.forms.findProperty.property_type.value;
    const bed = document.forms.findProperty.bed_type.value;
    const bath = document.forms.findProperty.bath_type.value;
    const parking = document.forms.findProperty.parking_type.value;
    const min_price = document.forms.findProperty.min_price.value;
    const max_price = document.forms.findProperty.max_price.value;
    router.push(
      `find-property?search=${s_value}&ptype=${ptype}&bed=${bed}&bath=${bath}&parking=${parking}&min_price=${min_price}&max_price=${max_price}`
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full h-128 bg-gray-500 relative">
        <img
          src="/images/website/home-house.jpg"
          alt="banner"
          className="w-full h-128 object-cover filter brightness-50"
        />
        <div className="absolute  max-w-4xl w-full text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <h2
            className="font-bold text-2xl text-white drop-shadow-lg"
            style={{
              fontFamily: "Opensans-bold",
              textShadow: "0px 2px 1px rgba(0,0,0,.8)",
            }}
          >
            {website?.homepage_search_title}
          </h2>
          <div
            className="p-2 rounded-lg"
            style={{
              backgroundColor: "rgba(0,0,0,.5)",
              fontFamily: "Opensans-regular",
            }}
          >
            <form name="findProperty" method="POST" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row items-center">
                <input
                  type="text"
                  name="type"
                  readOnly
                  value="Rent"
                  className="rounded-sm w-20 text-gray-500 sm:w-38 border-none h-10 text-sm text-center sm:text-left mb-1 sm:mb-0"
                />
                <input
                  type="text"
                  name="search"
                  placeholder="Search by region, postcode or property Id"
                  className="rounded-sm w-72 text-gray-500 sm:flex-grow border-none h-10 ml-1 text-sm mb-1 sm:mb-0"
                />
                <button
                  type="submit"
                  className="px-8 sm:px-10 py-2 text-white rounded-md ml-3 text-xl"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <img
                    src="/icons/home/home_search_icon.png"
                    className="h-5 object-contain"
                    alt="search"
                  />
                </button>
              </div>
              <div className="flex mt-1 flex-col sm:flex-row">
                <Search
                  label="Any property type"
                  name="property_type"
                  options={ptype_options}
                />
                <Search label="Any Bed" name="bed_type" options={counts} />
                <Search label="Any Bath" name="bath_type" options={counts} />
                <Search
                  label="Any Parking"
                  name="parking_type"
                  options={parking_options}
                />
                <Search
                  label="Min Price"
                  name="min_price"
                  options={price_options}
                />
                <Search
                  label="Max Price"
                  name="max_price"
                  options={price_options}
                />
                <label className="mt-1 cursor-pointer hidden" htmlFor="suburb">
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
