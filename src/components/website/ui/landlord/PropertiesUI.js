import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../../Card";
import PropertyGrid from "../../PropertyGrid";
import { FaTimes } from "react-icons/fa";

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
  useEffect(() => {
    const isAdded = localStorage.getItem("newadded");
    if (isAdded) {
      setIsNewAdded(true);
      localStorage.removeItem("newadded");
    }
  }, []);

  return (
    <div className="flex flex-col">
      {/**cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3 space-y-3 md:space-y-0">
        <Card
          label="Total properties posted"
          count="20"
          color="var(--orange)"
          textcolor="white"
          icon={<img src="/icons/owner_dashboard/icon1.png" alt="properties" />}
        />
        <Card
          label="Total rented properties"
          count="10"
          color="white"
          textcolor="gray"
          icon={<img src="/icons/owner_dashboard/icon2.png" alt="rented" />}
        />
        <Card
          label="Total visited properties"
          count="5"
          color="white"
          textcolor="gray"
          icon={<img src="/icons/owner_dashboard/icon3.png" alt="visited" />}
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
      <div className="py-2 text-lg" style={{ fontFamily: "Opensans-bold" }}>
        <p>Rent Details</p>
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <PropertyGrid
          image={<img src="/images/website/big-city.jpg" alt="property" />}
          title="4BHK at Pune"
          price="Rs. 2000/Month"
          subtitle="Renter: John"
          button={<Button />}
        />
        <PropertyGrid
          image={<img src="/images/website/big-city.jpg" alt="property" />}
          title="4BHK at Pune"
          price="Rs. 2000/Month"
          subtitle="Renter: John"
          button={<Button />}
        />
        <PropertyGrid
          image={<img src="/images/website/big-city.jpg" alt="property" />}
          title="4BHK at Pune"
          price="Rs. 2000/Month"
          subtitle="Renter: John"
          button={<Button />}
        />
      </div>
    </div>
  );
}

export default PropertiesUI;
