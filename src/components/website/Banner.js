import React, { useState } from "react";
import { useRouter } from "next/router";
import Search from "./forms/Search";
import Loader from "../../components/loader";
import { useSelector, shallowEqual } from "react-redux";
import { MdMyLocation } from "react-icons/md";
import Geocode from "react-geocode";
import { toast } from "react-toastify";
import { FaSearch } from "react-icons/fa";

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

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    // const s_value = document.forms.findProperty.search.value;
    const ptype = document.forms.findProperty.property_type.value;
    const bed = document.forms.findProperty.bed_type.value;
    const budget = document.forms.findProperty.budget.value;
    const search_radius = document.forms.findProperty.search_radius.value;
    const location = document.forms.findProperty.search.value; //JSON.parse(localStorage.getItem("current-location"));
    const queryString = defaultLocation
      ? Object.keys(location)
          .map((key) => key + "=" + location[key])
          .join("&")
      : "";
    router.push(
      `find-property/map?search=${location}&ptype=${ptype}&bed=${bed}&budget=${budget}&search_radius=${
        search_radius || 10
      }&${queryString}`
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
    let route = "";
    let lat = 0.0;
    let lng = 0.0;

    components?.forEach((element) => {
      if (element.types.includes("route")) {
        route = element?.long_name;
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
      lat = place.geometry?.location?.lat;
      lng = place.geometry?.location?.lng;
    } else {
      lat = place.geometry?.location?.lat("d");
      lng = place.geometry?.location?.lng("d");
    }

    // setDefaultLocation(city);
    document.forms.findProperty.search.value = city;
    localStorage.setItem(
      "current-location",
      JSON.stringify({
        country,
        state,
        city,
        zone,
        area,
        sub_area,
        pincode,
        route,
        lat,
        lng,
      })
    );
    setIsLoading(false);
  };

  React.useEffect(() => {
    const location = localStorage.getItem("current-location");
    if (!location) {
      getCurrentLocation();
    }
  }, []);

  const getCurrentLocation = () => {
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
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full banner relative">
        <div className="absolute  max-w-5xl w-full flex items-center justify-center flex-col top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <p
            className="text-2xl mt-20 mb-5 text-white wow slideInLeft"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
            style={{ fontFamily: "Opensans-regular" }}
          >
            {website?.homepage_search_title}
          </p>

          <div
            className="p-4 wow zooIn w-max"
            data-wow-delay="0.1s"
            data-wow-duration="1s"
            style={{
              backgroundColor: "rgba(255,255,255,.2)",
              fontFamily: "Opensans-regular",
            }}
          >
            <form name="findProperty" method="POST" onSubmit={handleSubmit}>
              <div className="flex flex-col sm:flex-row items-center">
                <button
                  type="button"
                  className="p-1 border rounded-md mx-1 text-blue-500 bg-white"
                  onClick={getCurrentLocation}
                  data-tip="Current Location"
                >
                  <MdMyLocation size={30} />
                </button>

                <input
                  type="text"
                  name="search"
                  required
                  placeholder="Enter Your Location..."
                  className="rounded-sm text-gray-500 sm:flex-grow border-none px-2 ml-1 text-sm mb-1 sm:mb-0"
                />

                <div className="flex flex-col sm:flex-row">
                  <Search
                    label="Search Radius"
                    name="search_radius"
                    options={radius}
                  />
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
                  <button
                    type="submit"
                    className="py-1 px-3 text-white rounded-md ml-2 mr-1 bg-yellow-500 hover:bg-yellow-600"
                  >
                    <FaSearch size={22} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
