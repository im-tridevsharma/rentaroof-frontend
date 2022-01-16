import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../../loader";
import {MdMyLocation} from 'react-icons/md'
import {
  addPropertyAddress,
  getPropertyByCode,
  updatePropertyAddress,
} from "../../../../lib/frontend/properties";
import {
  useLoadScript,
  GoogleMap,
  Marker,
} from "@react-google-maps/api";
import AutoComplete from "react-google-autocomplete";
import Geocode from 'react-geocode'

function PropertyAddAddress({ code }) {
  const [propertyId, setPropertyId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [back, setBack] = useState(false);
  const [skip, setSkip] = useState(true);
  const [address, setAddress] = useState({});
  const [libraries] = useState(['places']);
  const [center, setCenter] = useState({
    lat: 37.869085,
    lng: -122.254775,
  });
  const router = useRouter();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.MAP_API_KEY, // Add your API key
    libraries
  });

  useEffect(() => {
    const ids = code.split("-");
    setPropertyId(ids[ids.length - 1]);
    (async () => {
      if (router.query.mode === "update") {
        setIsLoading(true);
        const prpty = await getPropertyByCode(ids[0] + "-" + ids[1]);
        if (prpty?.status) {
          setAddress(prpty?.data?.address);
          setCenter({lat: parseFloat(prpty?.data?.address?.lat), lng: parseFloat(prpty?.data?.address?.long)});
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error(prpty.error || prpty.message);
        }
      }
    })();
    setSkip(router.query.skip || true);
    setBack(router.query.back || false);
  }, []);

  const nextToAmenities = () => {
    localStorage.setItem("next_ap", "AMENITIES");
    router.push(
      "?step=next&next=AMENITIES&id=" +
        code +
        (router.query.mode ? "&mode=" + router.query.mode : "")
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.add_address);
    formdata.append("propertyId", propertyId);
    router.query.mode === "update" && formdata.append("_method", "PUT");
    if (formdata) {
      submitData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (data) => {
    const response =
      router.query.mode === "update"
        ? await updatePropertyAddress(address?.id, data)
        : await addPropertyAddress(data);
    if (response?.status) {
      setIsLoading(false);
      if (back) {
        router.push("properties");
      } else {
        nextToAmenities();
      }
    } else {
      console.error(response?.error || response?.message);
      setIsLoading(false);
    }
  };

  const handlePlaceSearch = (place, fromLatLng = false) => {
    setIsLoading(true);

    const components = place?.address_components;

    components.forEach(element => {
      if(element.types.includes('route')){
        setAddress(prev => ({...prev, route: element?.long_name}))
      }
      if(element.types.includes('neighborhood')){
        setAddress(prev => ({...prev, neighborhood: element?.long_name}))
      }
      if(element.types.includes('sublocality_level_2')){
        setAddress(prev => ({...prev, sub_area: element?.long_name}))
      }
      if(element.types.includes('sublocality_level_1')){
        setAddress(prev => ({...prev, area: element?.long_name}))
      }
      if(element.types.includes('locality')){
        setAddress(prev => ({...prev, city: element?.long_name}))
      }
      if(element.types.includes('administrative_area_level_2')){
        setAddress(prev => ({...prev, zone: element?.long_name}))
      }
      if(element.types.includes('administrative_area_level_1')){
        setAddress(prev => ({...prev, state: element?.long_name}))
      }if(element.types.includes('country')){
        setAddress(prev => ({...prev, country: element?.long_name}))
      }
      if(element.types.includes('postal_code')){
        setAddress(prev => ({...prev, pincode: element?.long_name}))
      }
    });

    if(fromLatLng){
      setAddress(prev => ({...prev, lat: place.geometry.location.lat}))
      setAddress(prev => ({...prev, long: place.geometry.location.lng}))
      setCenter({
        lat: parseFloat(place.geometry.location.lat),
        lng: parseFloat(place.geometry.location.lng),
      });
    }else{
      setAddress(prev => ({...prev, lat: place.geometry.location.lat('d')}))
      setAddress(prev => ({...prev, long: place.geometry.location.lng('d')}))
      setCenter({
        lat: parseFloat(place.geometry.location.lat('d')),
        lng: parseFloat(place.geometry.location.lng('d')),
      });
    }

    setAddress(prev => ({...prev, place_id: place?.place_id}))
    setAddress(prev => ({...prev, full_address: place?.formatted_address}))
 
    setIsLoading(false);
  };

  const handlePin = (obj) => {
    if(isLoaded){
      setIsLoading(true)
      Geocode.setApiKey(process?.env?.MAP_API_KEY);
      Geocode.fromLatLng(obj?.latLng?.lat(), obj?.latLng?.lng()).then(response => {
        handlePlaceSearch(response?.results[0], true);
      }); 
    }
  }

  
  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        if(isLoaded){
          Geocode.setApiKey(process?.env?.MAP_API_KEY);
          Geocode.fromLatLng(location?.coords?.latitude, location?.coords?.longitude).then(response => {
            handlePlaceSearch(response?.results[0], true);
          }); 
        }
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**header */}
        <div
          className="flex items-center justify-between"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          <h5>Add Property Address</h5>
          {skip === true && (
            <button
              className="rounded-md text-white px-3 py-2"
              style={{
                backgroundColor: "var(--orange)",
              }}
              onClick={nextToAmenities}
            >
              Skip
            </button>
          )}
        </div>

        {/**google address search */}
        <div className="mt-5 flex items-center" style={{ fontFamily: "Opensans-semi-bold" }}>
        <button className="p-3 border rounded-md mr-2" onClick={getCurrentLocation}>
          <MdMyLocation />
        </button>
        {isLoaded &&
        <AutoComplete
            onPlaceSelected={(place) => handlePlaceSearch(place)}
            className="rounded-md border-gray-200 w-full text-sm p-2"
            placeholder="Search your property address by pincode, area, route, zone, city, state or full address..."
            style={{ borderWidth: "1px" }}
            options={{
              types: ['address'],
              componentRestrictions: {
                country: 'in'
              }
            }}
            
          />}
        </div>
        <i className="mt-2">Find address on map and click on location to pin your address.</i>
        <div className="border-2 border-gray-200 rounded-md mb-3 mt-1 h-52">
        {isLoaded && (
            <GoogleMap
              center={center}
              zoom={15}
              onClick={handlePin}
              mapContainerStyle={{ width: "100%", height: "100%" }}
            >
              {center && (
                <Marker
                  key={address?.id}
                  position={center}
                  icon="/icons/home/icon-marker.png"
                ></Marker>
              )}
            </GoogleMap>
          )}
        </div>

        {/**form */}
        <form
          name="add_address"
          className="mt-5"
          method="POST"
          onSubmit={handleSubmit}
        >
          
          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
          <div className="form-element">
            <label className="form-label">Landmark</label>
            <input
              type="text"
              name="landmark"
              value={address?.landmark}
              onChange={inputHandler}
              className="form-input border-gray-200 rounded-md -mt-1"
            ></input>
          </div>
            <div className="form-element">
              <label className="form-label">House number</label>
              <input
                type="text"
                name="house_number"
                value={address?.house_number}
                onChange={inputHandler}
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
              <input
                type="hidden"
                name="lattitude"
                value={address?.lat}
                onChange={inputHandler}
              />
              <input
                type="hidden"
                name="longitude"
                value={address?.long}
                onChange={inputHandler}
              />
              <input
                type="hidden"
                name="zone"
                value={address?.zone}
                onChange={inputHandler}
              />
              <input
                type="hidden"
                name="area"
                value={address?.area}
                onChange={inputHandler}
              />
              <input
                type="hidden"
                name="sub_area"
                value={address?.sub_area}
                onChange={inputHandler}
              />
              <input
                type="hidden"
                name="neighborhood"
                value={address?.neighborhood}
                onChange={inputHandler}
              /><input
              type="hidden"
              name="route"
              value={address?.route}
              onChange={inputHandler}
            /><input
            type="hidden"
            name="place_id"
            value={address?.place_id}
            onChange={inputHandler}
          />
            <div className="form-element">
              <label className="form-label">Pincode</label>
              <input
                type="text"
                name="pincode"
                value={address?.pincode}
                onChange={inputHandler}
                maxLength="6"
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
            <div className="form-element">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                value={address?.country}
                onChange={inputHandler}
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
            <div className="form-element">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                value={address?.state}
                onChange={inputHandler}
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
            <div className="form-element">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={address?.city}
                onChange={inputHandler}
                className="form-input border-gray-200 rounded-md -mt-1"
              ></input>
            </div>
          </div>
          <div className="form-element">
            <label className="form-label">Full Address</label>
            <textarea
              name="full_address"
              value={address?.full_address}
              onChange={inputHandler}
              className="form-input border-gray-200 rounded-md -mt-1"
            ></textarea>
          </div>
          <div className="text-right w-full">
            <button
              className="text-white rounded-md px-3 py-2 mt-3"
              style={{
                backgroundColor: "var(--blue)",
                fontFamily: "Opensans-semi-bold",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PropertyAddAddress;
