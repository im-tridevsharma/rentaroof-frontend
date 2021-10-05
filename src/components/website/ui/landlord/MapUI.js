import React, { useState } from "react";

function MapUI() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex flex-col bg-white border-2 border-gray-200 rounded-md p-5">
      {/**title */}
      <h6 style={{ fontFamily: "Opensans-bold" }} className="text-center my-2">
        Property on Google Map
      </h6>
      {/**search bar */}
      <form name="search">
        <div
          className="flex items-center max-w-4xl mx-auto mt-5"
          style={{ fontFamily: "Opensans-regular" }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your property..."
            className="flex flex-grow rounded-md text-sm border-2 border-gray-200 focus:ring-0 mr-3"
          />
          <button
            type="submit"
            className="py-2 px-5 text-white rounded-md"
            style={{
              backgroundColor: "var(--blue)",
              fontFamily: "Opensans-semi-bold",
            }}
          >
            Submit
          </button>
        </div>
      </form>
      {/**map view */}
      <div className="w-full mt-5 border-2 border-gray-200 rounded-md">
        <iframe
          title="Property on map"
          width="100%"
          className="h-60 sm:h-96"
          id="gmap_canvas"
          src={`https://maps.google.com/maps?q=restaurents-delhi&t=&z=13&ie=UTF8&iwloc=&output=embed`}
          frameBorder="0"
          scrolling="no"
          marginHeight="0"
          marginWidth="0"
        ></iframe>
      </div>
      {/**pin section */}
      <div className="mt-3 flex flex-col">
        <p
          className="px-5 py-2 text-white rounded-md w-full text-center"
          style={{ backgroundColor: "var(--blue)" }}
        >
          Place Pin with Property Address
        </p>
        <form
          name="pin"
          style={{ fontFamily: "Opensans-semi-bold" }}
          className="mt-5"
        >
          <div className="form-element">
            <div className="form-label">
              Address (* only street name and building no):{" "}
            </div>
            <input
              type="text"
              className="form-input border-gray-300 rounded-md"
            />
          </div>

          <div className="max-w-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
              <div className="form-element">
                <div className="form-label">Zip:</div>
                <input
                  type="text"
                  className="form-input border-gray-300 rounded-md"
                />
              </div>
              <div className="form-element">
                <div className="form-label">Country:</div>
                <input
                  type="text"
                  className="form-input border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
              <div className="form-element">
                <div className="form-label">Latitude:</div>
                <input
                  type="text"
                  className="form-input border-gray-300 rounded-md"
                />
              </div>
              <div className="form-element">
                <div className="form-label">Longitude:</div>
                <input
                  type="text"
                  className="form-input border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2">
              <div className="form-element">
                <div className="form-label">Zoop level for map (1-20):</div>
                <input
                  type="text"
                  className="form-input border-gray-300 rounded-md"
                />
              </div>
              <div className="form-element">
                <div className="form-label">Enable Google Street View:</div>
                <input
                  type="checkbox"
                  className="border-gray-300 rounded-md h-8 w-8"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="form-element">
                <div className="form-label">Google view camera angle:</div>
                <input
                  type="text"
                  className="border-gray-300 rounded-md form-input"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="py-2 px-5 text-white rounded-md"
            style={{
              backgroundColor: "var(--blue)",
              fontFamily: "Opensans-semi-bold",
            }}
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default MapUI;
