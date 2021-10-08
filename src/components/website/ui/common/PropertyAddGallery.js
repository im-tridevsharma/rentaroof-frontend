import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function PropertyAddGallery({ code }) {
  const [productId, setProductId] = useState("");
  const [activeTab, setActiveTab] = useState("exterior");

  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setProductId(ids[ids.length - 1]);
  }, []);

  const nextToAddress = () => {
    localStorage.setItem("next_ap", "ADDRESS");
    router.push("?step=next&next=ADDRESS&id=" + code);
  };

  return (
    <div className="flex flex-col">
      {/**header */}
      <div
        className="flex items-center justify-between"
        style={{ fontFamily: "Opensans-semi-bold" }}
      >
        <h5>Add Images</h5>
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

      <div
        className="flex items-center justify-between border-gray-200 mt-5"
        style={{ borderBottomWidth: "1px", fontFamily: "Opensans-bold" }}
      >
        <button
          className="border-b-2 border-transparent pb-1"
          onClick={() => setActiveTab("exterior")}
          style={{
            borderColor:
              activeTab === "exterior" ? "var(--blue)" : "transparent",
          }}
        >
          Exterior View
        </button>
        <button
          className="border-b-2 border-transparent pb-1"
          onClick={() => setActiveTab("living_room")}
          style={{
            borderColor:
              activeTab === "living_room" ? "var(--blue)" : "transparent",
          }}
        >
          Living Room
        </button>
        <button
          className="border-b-2 border-transparent pb-1"
          onClick={() => setActiveTab("bedrooms")}
          style={{
            borderColor:
              activeTab === "bedrooms" ? "var(--blue)" : "transparent",
          }}
        >
          Bedrooms
        </button>
        <button
          className="border-b-2 border-transparent pb-1"
          onClick={() => setActiveTab("bathrooms")}
          style={{
            borderColor:
              activeTab === "bathrooms" ? "var(--blue)" : "transparent",
          }}
        >
          Bathrooms
        </button>
        <button
          className="border-b-2 border-transparent pb-1"
          onClick={() => setActiveTab("kitchen")}
          style={{
            borderColor:
              activeTab === "kitchen" ? "var(--blue)" : "transparent",
          }}
        >
          Kitchen
        </button>

        <button
          className="border-b-2 border-transparent pb-1"
          onClick={() => setActiveTab("floor_plan")}
          style={{
            borderColor:
              activeTab === "floor_plan" ? "var(--blue)" : "transparent",
          }}
        >
          Floor Plan
        </button>
        <button
          className="border-b-2 border-transparent pb-1"
          onClick={() => setActiveTab("master_plan")}
          style={{
            borderColor:
              activeTab === "master_plan" ? "var(--blue)" : "transparent",
          }}
        >
          Master Plan
        </button>
        <button
          className="border-b-2 border-transparent pb-1"
          onClick={() => setActiveTab("location_map")}
          style={{
            borderColor:
              activeTab === "location_map" ? "var(--blue)" : "transparent",
          }}
        >
          Location Map
        </button>
      </div>

      {/**images containers */}
      <form name="add_gallery" className="flex flex-col items-start">
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

export default PropertyAddGallery;
