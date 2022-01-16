import React, { useState } from "react";
import { useRouter } from "next/router";
import Search from "./forms/Search";
import Loader from "../../components/loader";
import { useSelector, shallowEqual } from "react-redux";
import { MdMyLocation } from "react-icons/md";
import Cookies from "universal-cookie";
import Geocode from "react-geocode";
import {toast} from 'react-toastify'
import AutoComplete from "react-google-autocomplete";

const ptype_options = [
  { value: "", label: "Property Type" },
  { value: "apartment", label: "Apartment" },
  { value: "individual floor", label: "Individual Floor" },
  { value: "independent house", label: "Independent House" },
  { value: "villa or farm house", label: "Villa/Farm House" },
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

const budget_options = [
  {
    value: "",
    label: "Budget",
  },
  {
    value: "1000.00 - 5000.00",
    label: "Rs. 1000 - Rs. 5000",
  },
  {
    value: "5000.00 - 10000.00",
    label: "Rs. 5000 - Rs. 10,000",
  },
  {
    value: "10000.00 - 15000.00",
    label: "Rs. 10,000 - Rs. 15,000",
  },
  {
    value: "15000.00 - 20000.00",
    label: "Rs. 15,000 - Rs. 20,000",
  },
  {
    value: "20000.00 - 25000.00",
    label: "Rs. 20,000 - Rs. 25,000",
  },
  {
    value: "25000.00 - 30000.00",
    label: "Rs. 25,000 - Rs. 30,000",
  },
  {
    value: "30000.00 - 35000.00",
    label: "Rs. 30,000 - Rs. 35,000",
  },
  {
    value: "35000.00 - 40000.00",
    label: "Rs. 35,000 - Rs. 40,000",
  },
  {
    value: "40000.00 - 45000.00",
    label: "Rs. 40,000 - Rs. 45,000",
  },
  {
    value: "45000.00 - 50000.00",
    label: "Rs. 45,000 - Rs. 50,000",
  },
  {
    value: "50000.00 - 55000.00",
    label: "Rs. 50,000 - Rs. 55,000",
  },
  {
    value: "55000.00 - more",
    label: "Above Rs. 55,000",
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
  const [defaultLocation, setDefaultLocation] = useState("");

  const cookies = new Cookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const s_value = document.forms.findProperty.search.value;
    const ptype = document.forms.findProperty.property_type.value;
    const bed = document.forms.findProperty.bed_type.value;
    const budget = document.forms.findProperty.budget.value;
    router.push(
      `find-property?pagination=yes&search=${s_value}&ptype=${ptype}&bed=${bed}&budget=${budget}`
    );
  };

  const handlePlaceSearch = (place, fromLatLng = false) => {
    setIsLoading(true);

    const components = place?.address_components;

    let pincode = "";
    let country = "";
    let state = "";
    let city = "";
    let zone = "";
    let area = "";
    let sub_area = "";
    let neighborhood = "";
    let route = "";
    let lat = 0.0;
    let lng = 0.0;
    let place_id = "";

    components.forEach((element) => {
      if (element.types.includes("route")) {
        route = element?.long_name;
      }
      if (element.types.includes("neighborhood")) {
        neighborhood = element?.long_name;
      }
      if (element.types.includes("sublocality_level_2")) {
        sub_area = element?.long_name;
      }
      if (element.types.includes("sublocality_level_1")) {
        area = element?.long_name;
      }
      if (element.types.includes("locality")) {
        city = element?.long_name;
      }
      if (element.types.includes("administrative_area_level_2")) {
        zone = element?.long_name;
      }
      if (element.types.includes("administrative_area_level_1")) {
        state = element?.long_name;
      }
      if (element.types.includes("country")) {
        country = element?.long_name;
      }
      if (element.types.includes("postal_code")) {
        pincode = element?.long_name;
      }
    });

    if (fromLatLng) {
      lat = place.geometry.location.lat;
      lng = place.geometry.location.lng;
    } else {
      lat = place.geometry.location.lat("d");
      lng = place.geometry.location.lng("d");
    }

    place_id = place?.place_id;
    cookies.set(
      "user-location",
      JSON.stringify({
        country,
        state,
        city,
        zone,
        area,
        sub_area,
        neighborhood,
        pincode,
        place_id,
        route,
        lat,
        lng,
      })
    );
    setDefaultLocation(area);
    setIsLoading(false);
  };

  React.useEffect(() => {
    getCurrentLocation()
  }, [])

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
          Geocode.setApiKey(process?.env?.MAP_API_KEY);
          Geocode.fromLatLng(
            location?.coords?.latitude,
            location?.coords?.longitude
          ).then((response) => {
            handlePlaceSearch(response?.results[0], true);
          });
      });
    } else {
      setIsLoading(false)
      toast.error("Geolocation is not supported by this browser.");
    }
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
                <button
                  className="p-3 border rounded-md mx-1 bg-white"
                  onClick={getCurrentLocation}
                  data-tip="Current Location"
                >
                  <MdMyLocation />
                </button>
                <AutoComplete
                  apiKey={process?.env?.MAP_API_KEY}
                  onPlaceSelected={(place) => handlePlaceSearch(place)}
                  defaultValue={defaultLocation}
                  className=" rounded-sm border-gray-200 w-1/2 text-sm p-2 h-10"
                  placeholder="Find Location..."
                  style={{ borderWidth: "1px" }}
                  options={{
                    types: ['address'],
                    componentRestrictions: {
                      country: 'in'
                    }
                  }}
                  
                />
                <input
                  type="text"
                  name="search"
                  required
                  placeholder="Search Property..."
                  className="rounded-sm text-gray-500 sm:flex-grow border-none h-10 ml-1 text-sm mb-1 sm:mb-0"
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
                  label="Property Type"
                  name="property_type"
                  options={ptype_options}
                />
                <Search
                  name="bed_type"
                  options={[{ value: "", label: "Bed" }, ...counts]}
                />
                <Search name="budget" options={budget_options} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
