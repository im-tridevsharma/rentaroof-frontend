import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function PropertyAddAddress({ code }) {
  const [productId, setProductId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setProductId(ids[ids.length - 1]);
  }, []);

  const nextToAddress = () => {
    localStorage.setItem("next_ap", "AMENITIES");
    router.push("?step=next&next=AMENITIES&id=" + code);
  };

  return (
    <div className="flex flex-col">
      {/**header */}
      <div
        className="flex items-center justify-between"
        style={{ fontFamily: "Opensans-semi-bold" }}
      >
        <h5>Add Property Address</h5>
        <button
          className="rounded-md text-white px-3 py-2"
          style={{
            backgroundColor: "var(--orange)",
          }}
          onClick={nextToAddress}
        >
          Skip
        </button>
      </div>

      {/**google address search */}
      <div className="mt-5" style={{ fontFamily: "Opensans-semi-bold" }}>
        <input
          type="text"
          id="gaddress"
          className="rounded-md border-gray-200 w-full text-sm"
          placeholder="Search address on google..."
        />
      </div>

      {/**form */}
      <form name="add_address" className="mt-5">
        <div className="form-element">
          <label className="form-label">Landmark</label>
          <input
            type="text"
            name="landmark"
            className="form-input border-gray-200 rounded-md -mt-1"
          ></input>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 md:space-x-3">
          <div className="form-element">
            <label className="form-label">House number</label>
            <input
              type="text"
              name="house_number"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></input>
          </div>
          <div className="form-element">
            <label className="form-label">Lattitude</label>
            <input
              type="text"
              name="lattitude"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></input>
          </div>
          <div className="form-element">
            <label className="form-label">Longitude</label>
            <input
              type="text"
              name="longitude"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></input>
          </div>
          <div className="form-element">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              name="pincode"
              maxLength="6"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></input>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
          <div className="form-element">
            <label className="form-label">Country</label>
            <select
              name="country"
              maxLength="6"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></select>
          </div>
          <div className="form-element">
            <label className="form-label">State</label>
            <select
              name="state"
              maxLength="6"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></select>
          </div>
          <div className="form-element">
            <label className="form-label">City</label>
            <select
              name="city"
              maxLength="6"
              className="form-input border-gray-200 rounded-md -mt-1"
            ></select>
          </div>
        </div>
        <div className="form-element">
          <label className="form-label">Full Address</label>
          <textarea
            name="full_address"
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
  );
}

export default PropertyAddAddress;
