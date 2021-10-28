import React, { useState } from "react";
import { getAgreements } from "../../../../lib/frontend/share";
import TenantCard from "../../TenantCard";
import Loader from "../../../loader";

function TenantUI() {
  const [property, setProperty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState([]);

  React.useEffect(() => {
    const fetchAgreements = async () => {
      setIsLoading(true);
      const response = await getAgreements();
      if (response?.status) {
        setIsLoading(false);
        setAgreements(response?.data);
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
      }
    };

    fetchAgreements();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**property details */}
        {property && (
          <div className="flex bg-white border-2 border-gray-200 rounded-md p-2">
            <div className=" max-h-48 max-w-xs overflow-hidden ">
              <img
                src={property?.front_image || "/images/website/no_photo.png"}
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
                <p>{property?.name}</p>
                <p>
                  {property?.city_name}, {property?.state_name},
                  {property?.country_name}
                </p>
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
                  <span>{property?.bedrooms} Bedrooms</span>
                </p>
                <p className="flex items-center mr-5">
                  <img
                    src="/icons/owner_dashboard/icon5.png"
                    alt="bath"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  <span>{property?.bathrooms} Bathrooms</span>
                </p>
                <p className="flex items-center">
                  <img
                    src="/icons/owner_dashboard/icon6.png"
                    alt="floor"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  <span>{property?.floors} Floors</span>
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
                    <span style={{ fontFamily: "Opensans-bold" }}>1 </span>
                    Tenants
                  </p>
                  <p
                    className="mr-3 border-gray-400 pr-3"
                    style={{ borderRightWidth: "1px" }}
                  >
                    <span
                      style={{ fontFamily: "Opensans-bold" }}
                      className="mr-1"
                    >
                      Rs.{property?.monthly_rent}
                    </span>
                    Monthly collection
                  </p>
                  <p className="mr-3 border-gray-400 pr-3">
                    <span
                      style={{ fontFamily: "Opensans-bold" }}
                      className="mr-1"
                    >
                      Rs.{property?.maintenence_charge}
                    </span>
                    Maintenance
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/**tenants */}
        <p
          className="py-3 mt-5 text-lg"
          style={{ fontFamily: "Opensans-bold" }}
        >
          All Tenants
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {agreements?.length > 0 ? (
            agreements.map((a, i) => (
              <TenantCard
                a={a}
                key={i}
                info={() => setProperty(a?.property_data)}
              />
            ))
          ) : (
            <p>No tenants found!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default TenantUI;
