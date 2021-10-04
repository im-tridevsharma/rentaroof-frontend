import React, { useState } from "react";
import TenantCard from "../../TenantCard";

function TenantUI() {
  const [property, setProperty] = useState(false);
  const tenant = {
    name: "Saurabh Sharma",
    email: "saurabh.123@gmail.com",
    description:
      "Adipisicing non officia culpa occaecat exercitation officia do irure ut deserunt fugiat do deserunt.",
  };

  return (
    <div className="flex flex-col">
      {/**property details */}
      {property && (
        <div className="flex bg-white border-2 border-gray-200 rounded-md p-2">
          <div className=" max-h-48 max-w-xs overflow-hidden ">
            <img
              src="/images/website/building.jpg"
              alt="property"
              className="object-cover w-full h-full rounded-md"
            />
          </div>
          {/**details */}
          <div className="flex flex-col ml-3 w-full">
            <p style={{ fontFamily: "Opensans-bold" }}>Property Details</p>
            <div
              className="text-gray-500 leading-4 mt-3"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <p>Condo@ Jain Jeroh</p>
              <p>23, Jalan jeroh, Larkin jaya, Johar</p>
            </div>
            <div
              className="flex items-center mt-3"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <p className="flex items-center mr-5">
                <img
                  src="/icons/owner_dashboard/icon4.jpg"
                  alt="bed"
                  className="w-5 h-5 object-contain mr-2"
                />
                <span>3</span>
              </p>
              <p className="flex items-center mr-5">
                <img
                  src="/icons/owner_dashboard/icon5.png"
                  alt="bath"
                  className="w-5 h-5 object-contain mr-2"
                />
                <span>2</span>
              </p>
              <p className="flex items-center">
                <img
                  src="/icons/owner_dashboard/icon6.png"
                  alt="floor"
                  className="w-5 h-5 object-contain mr-2"
                />
                <span>2 Floor</span>
              </p>
            </div>
            {/**additional information */}
            <div
              className="pt-3 border-gray-300 mt-5"
              style={{ borderTopWidth: "1px" }}
            >
              <p className="mt-2" style={{ fontFamily: "Opensans-bold" }}>
                Additional Info
              </p>
              <div className="flex items-center">
                <p
                  className="mr-3 border-gray-400 pr-3"
                  style={{ borderRightWidth: "1px" }}
                >
                  <span style={{ fontFamily: "Opensans-bold" }}>3</span> Tenants
                </p>
                <p
                  className="mr-3 border-gray-400 pr-3"
                  style={{ borderRightWidth: "1px" }}
                >
                  <span style={{ fontFamily: "Opensans-bold" }}>3000</span>{" "}
                  Monthly collection
                </p>
                <p className="mr-3 border-gray-400 pr-3">
                  <span style={{ fontFamily: "Opensans-bold" }}>1</span>{" "}
                  Maintenance
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/**tenants */}
      <p className="py-3 mt-5 text-lg" style={{ fontFamily: "Opensans-bold" }}>
        All Tenants
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <TenantCard tenant={tenant} info={() => setProperty(true)} />
        <TenantCard tenant={tenant} info={() => setProperty(true)} />
        <TenantCard tenant={tenant} info={() => setProperty(true)} />
      </div>
    </div>
  );
}

export default TenantUI;
