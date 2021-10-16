import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../../Card";
import PropertyGrid from "../../PropertyGrid";
import { FaTimes } from "react-icons/fa";
import { getProperties } from "../../../../lib/frontend/properties";
import Loader from "../../../loader";
import PostedProperty from "../../PostedProperty";

const Button = () => {
  return (
    <Link href="/">
      <a
        className="p-2 rounded-md text-white"
        style={{ backgroundColor: "var(--blue)" }}
      >
        View Agreement
      </a>
    </Link>
  );
};

function PropertiesUI() {
  const [isNewAdded, setIsNewAdded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardMode, setCardMode] = useState("posted");
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const isAdded = localStorage.getItem("newadded");
    if (isAdded) {
      setIsNewAdded(true);
      localStorage.removeItem("newadded");
    }
    const isUpdated = localStorage.getItem("updated");
    if (isUpdated) {
      setUpdated(isUpdated);
      localStorage.removeItem("updated");
    }
    (async () => {
      if (cardMode === "posted") {
        setIsLoading(true);
        const res = await getProperties();
        if (res?.status) {
          setProperties(res.data);
          setIsLoading(false);
        } else {
          console.error(res?.error || res?.message);
          setIsLoading(false);
        }
      }
    })();
  }, [cardMode]);

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3 space-y-3 md:space-y-0">
          <Card
            label="Total properties posted"
            count={properties?.length}
            color="var(--orange)"
            textcolor="white"
            icon={
              <img src="/icons/owner_dashboard/icon1.png" alt="properties" />
            }
            onClick={() => setCardMode("posted")}
          />
          <Card
            label="Total rented properties"
            count="10"
            color="white"
            textcolor="gray"
            icon={<img src="/icons/owner_dashboard/icon2.png" alt="rented" />}
            onClick={() => setCardMode("rented")}
          />
          <Card
            label="Total visited properties"
            count="5"
            color="white"
            textcolor="gray"
            icon={<img src="/icons/owner_dashboard/icon3.png" alt="visited" />}
            onClick={() => setCardMode("visited")}
          />
        </div>
        {isNewAdded && (
          <div
            className="my-2 p-2 rounded-md bg-white flex items-center justify-between shadow-md"
            style={{
              fontFamily: "Opensans-bold",
            }}
          >
            <p className="text-green-500"> New property added successfully.</p>
            <FaTimes
              className="cursor-pointer text-red-500"
              onClick={() => setIsNewAdded(false)}
            />
          </div>
        )}
        {updated && (
          <div
            className="my-2 p-2 rounded-md bg-white flex items-center justify-between shadow-md"
            style={{
              fontFamily: "Opensans-bold",
            }}
          >
            <p className="text-green-500"> {updated}</p>
            <FaTimes
              className="cursor-pointer text-red-500"
              onClick={() => setUpdated(false)}
            />
          </div>
        )}
        {/**add new property */}
        <div className="mt-3 p-3 flex items-center justify-between bg-white border-2 border-gray-200 rounded-md">
          <p className="text-gray-600" style={{ fontFamily: "Opensans-bold" }}>
            Do you have a new property to list ?
          </p>
          <Link href="/landlord/add-property">
            <a
              className="py-2 px-3 rounded-md text-white"
              style={{
                backgroundColor: "var(--blue)",
                fontFamily: "Opensans-semi-bold",
              }}
            >
              Add New Property
            </a>
          </Link>
        </div>
        {/**properties */}
        {cardMode === "posted" && (
          <>
            <div
              className="py-2 text-lg"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <p>Posted Properties</p>
            </div>
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {properties &&
                properties.map((p, i) => (
                  <PostedProperty
                    key={i}
                    property={p}
                    setProperties={setProperties}
                    properties={properties}
                  />
                ))}
            </div>
          </>
        )}
        {cardMode === "rented" && (
          <>
            <div
              className="py-2 text-lg"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <p>Rent Details</p>
            </div>
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <PropertyGrid
                image={
                  <img src="/images/website/big-city.jpg" alt="property" />
                }
                title="4BHK at Pune"
                price="Rs. 2000/Month"
                subtitle="Renter: John"
                button={<Button />}
              />
              <PropertyGrid
                image={
                  <img src="/images/website/big-city.jpg" alt="property" />
                }
                title="4BHK at Pune"
                price="Rs. 2000/Month"
                subtitle="Renter: John"
                button={<Button />}
              />
              <PropertyGrid
                image={
                  <img src="/images/website/big-city.jpg" alt="property" />
                }
                title="4BHK at Pune"
                price="Rs. 2000/Month"
                subtitle="Renter: John"
                button={<Button />}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PropertiesUI;
