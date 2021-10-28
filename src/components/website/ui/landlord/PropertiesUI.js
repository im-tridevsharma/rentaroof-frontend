import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "../../Card";
import PropertyGrid from "../../PropertyGrid";
import { FaTimes } from "react-icons/fa";
import { getProperties } from "../../../../lib/frontend/properties";
import Loader from "../../../loader";
import PostedProperty from "../../PostedProperty";
import {
  deleteUserSavedProperties,
  getUserSavedProperties,
} from "../../../../lib/frontend/auth";
import { __d } from "../../../../server";
import { MdClose } from "react-icons/md";
import { BsStarFill } from "react-icons/bs";
import { getAgreements } from "../../../../lib/frontend/share";

const Button = ({ url }) => {
  return (
    <a
      href={url}
      target="_blank"
      className="p-2 rounded-md text-white"
      style={{ backgroundColor: "var(--blue)" }}
    >
      View Agreement
    </a>
  );
};

function PropertiesUI() {
  const [isNewAdded, setIsNewAdded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cardMode, setCardMode] = useState("posted");
  const [properties, setProperties] = useState([]);
  const [visitedProperties, setVisitedProperties] = useState([]);
  const [agreements, setAgreements] = useState([]);

  useEffect(() => {
    localStorage.removeItem("next_ap");
    localStorage.removeItem("recent_ap");
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
      setIsLoading(true);
      const res = await getProperties();
      if (res?.status) {
        setProperties(res.data);
        setIsLoading(false);
      } else {
        console.error(res?.error || res?.message);
        setIsLoading(false);
      }

      const u = localStorage.getItem("LU")
        ? JSON.parse(__d(localStorage.getItem("LU")))
        : false;
      if (u) {
        const response = await getUserSavedProperties(u.id);
        if (response?.status) {
          setIsLoading(false);
          const visited = response?.data.filter((p) => p.type === "visited");
          setVisitedProperties(visited);
        } else {
          setIsLoading(false);
          console.error(response?.error || response?.message);
        }
        setIsLoading(true);
        const ares = await getAgreements();
        if (ares?.status) {
          setAgreements(ares?.data);
          setIsLoading(false);
        } else {
          console.error(ares?.error || ares?.message);
          setIsLoading(false);
        }
      }
    })();
  }, []);

  const deleteMe = async (id, type) => {
    setIsLoading(true);
    if (id) {
      const res = await deleteUserSavedProperties(id);
      if (res?.status) {
        setIsLoading(false);
        if (type === "visited") {
          const newvisited = visitedProperties.filter(
            (v) => v.id !== res?.data.id
          );
          setVisitedProperties(newvisited);
        }
      } else {
        setIsLoading(false);
        console.error(res?.error || res?.message);
      }
    } else {
      console.error("Something went wrong!");
      setIsLoading(false);
    }
  };

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
            count={agreements?.length}
            color="white"
            textcolor="gray"
            icon={<img src="/icons/owner_dashboard/icon2.png" alt="rented" />}
            onClick={() => setCardMode("rented")}
          />
          <Card
            label="Total visited properties"
            count={visitedProperties?.length}
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
              {agreements?.length > 0 ? (
                agreements?.map((a, i) => (
                  <PropertyGrid
                    key={i}
                    image={
                      <img
                        src={
                          a?.property_data?.front_image ||
                          "/images/website/no_photo.png"
                        }
                        alt="property"
                        className="w-full object-cover"
                      />
                    }
                    title={a?.property_data?.name}
                    price={`Rs. ${a?.property_data?.monthly_rent}/Month`}
                    subtitle={`Renter: ${a?.tenant?.first} ${a?.tenant?.last}`}
                    button={<Button url={a?.agreement_url} />}
                  />
                ))
              ) : (
                <p className="text-red-500 p-3">No renting properties found!</p>
              )}
            </div>
          </>
        )}
        {cardMode === "visited" && (
          <>
            <div
              className="py-2 text-lg"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <p>Visited Properties</p>
            </div>
            <div className="flex  flex-col">
              {visitedProperties &&
                visitedProperties.map((p, i) => (
                  <div
                    className="relative border-gray-200 flex items-center justify-between py-2 pl-8 pr-2"
                    key={i}
                    style={{ borderTopWidth: "1px" }}
                  >
                    <span
                      onClick={() => deleteMe(p.id, "visited")}
                      className="p-1 rounded-md bg-gray-400 absolute top-2 left-0 cursor-pointer text-white"
                    >
                      <MdClose />
                    </span>
                    <div className="w-20 h-20 overflow-hidden rounded-md">
                      <Image
                        src={p?.front_image || "/images/website/no_photo.png"}
                        alt="property"
                        layout="responsive"
                        width="80"
                        height="80"
                      />
                    </div>
                    <div
                      className="flex flex-col flex-grow px-5 leading-4"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      <h6
                        className="text-gray-800"
                        style={{ fontFamily: "Opensans-bold" }}
                      >
                        {p?.property_name}
                      </h6>
                      <p className="text-gray-400">
                        {p?.property_short_description}
                      </p>
                      <span
                        className="font-bold"
                        style={{ color: "var(--orange)" }}
                      >
                        By {p?.property_posted_by}
                      </span>
                    </div>
                    <span className="flex items-center text-lg">
                      <span className="m-1" style={{ color: "var(--blue)" }}>
                        {p?.rating}
                      </span>
                      <BsStarFill color="orange" />
                    </span>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PropertiesUI;
