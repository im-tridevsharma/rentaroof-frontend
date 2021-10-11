import React, { useState } from "react";
import Link from "next/link";
import { VscVerified, VscUnverified } from "react-icons/vsc";
import { deleteProperty } from "../../lib/frontend/properties";
import Loader from "../loader";

function PostedProperty({ property, setProperties, properties }) {
  const [isLoading, setIsLoading] = useState(false);

  const deleteProperties = async () => {
    const go = confirm("It will delete it permanantly!");
    if (go) {
      setIsLoading(true);
      const response = await deleteProperty(property?.id);
      if (response?.status) {
        setIsLoading(false);
        const newProperties = properties.filter(
          (item) => item.id !== response.data.id
        );
        setProperties(newProperties);
      } else {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative flex flex-col p-2 m-1 bg-white rounded-md border-2 border-gray-200">
        <div className="absolute right-1 bottom-1 text-3xl h-12 w-12 rounded-full bg-white shadow-md flex items-center justify-center">
          {property?.is_approved ? (
            <VscVerified className="text-green-500" title="Verified" />
          ) : (
            <VscUnverified className="text-red-500" title="Not verified yet!" />
          )}
        </div>
        <div className="w-full max-h-48 mb-2 overflow-hidden rounded-md">
          <img
            src={property?.front_image}
            alt={property?.name}
            className="w-full min-h-full object-cover"
          />
        </div>
        <div className="text-center" style={{ fontFamily: "Opensans-regular" }}>
          <p className="text-gray-600">{property?.name}</p>
          <p style={{ fontFamily: "Opensans-bold" }}>
            Price: {property?.monthly_rent}
          </p>
          <p className="text-gray-600">{property?.property_code}</p>
          <div className="my-3">
            <Link href="/">
              <a
                className="px-2 py-1 rounded-md text-white"
                style={{
                  backgroundColor: "var(--blue)",
                }}
              >
                View
              </a>
            </Link>
            <button
              className="px-2 py-1 rounded-md text-white bg-red-500 ml-1"
              onClick={deleteProperties}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostedProperty;
