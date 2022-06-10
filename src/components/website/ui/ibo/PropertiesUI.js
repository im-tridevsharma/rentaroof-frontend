import React, { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../../Card";
import PropertyGrid from "../../PropertyGrid";
import { FaTimes } from "react-icons/fa";
import {
  getProperties,
  deleteProperty,
} from "../../../../lib/frontend/properties";
import Loader from "../../../loader";
import PostedProperty from "../../PostedProperty";
import { __d } from "../../../../server";
import { BsStarFill } from "react-icons/bs";
import {
  getAgreements,
  getPoliceVerification,
  getVisitedProperties,
} from "../../../../lib/frontend/share";
import { FiAlertCircle, FiDelete, FiLoader } from "react-icons/fi";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [deleteReason, setDeleteReason] = useState("");
  const [deleteMode, setDeleteMode] = useState(false);
  const [purl, setPurl] = React.useState("");
  const [total, setTotal] = useState(0);
  const [propertySkip, setPropertySkip] = useState(0);
  const [hasMoreProperty, setHasMoreProperty] = useState(false);
  const [fetching, setFetching] = useState(false);

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
        setTotal(res?.total);
        if (total > 0) {
          setHasMoreProperty(true);
        }
      } else {
        console.error(res?.error || res?.message);
        setIsLoading(false);
      }

      const u = localStorage.getItem("LU")
        ? JSON.parse(__d(localStorage.getItem("LU")))
        : false;
      if (u) {
        const response = await getVisitedProperties();
        if (response?.status) {
          setIsLoading(false);
          setVisitedProperties(response?.data);
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

  const fetchNextData = async () => {
    if (!fetching) {
      setFetching(true);
      const res = await getProperties(propertySkip + 9);
      if (res?.status) {
        setProperties((prev) => [...prev, ...res?.data]);
        setPropertySkip(propertySkip + 9);
        if (properties.length === total) {
          setHasMoreProperty(false);
        }

        setFetching(false);
      }
    }
  };

  const policeVerification = async (a) => {
    setIsLoading(true);
    const res = await getPoliceVerification(a?.id);
    if (res) {
      setPurl(res);
      setIsLoading(false);
      toast.success("Police Verification document generated successfully.");
      const ares = await getAgreements();
      if (ares?.status) {
        setAgreements(ares?.data);
        setIsLoading(false);
      } else {
        console.error(ares?.error || ares?.message);
        setIsLoading(false);
      }
    } else {
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  const deleteProperties = (id) => {
    const go = confirm("It will delete it permanantly!");
    if (go) {
      setDeleteMode(id);
    }
  };

  const deleteHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await deleteProperty(deleteReason, deleteMode);
    if (response?.status) {
      setIsLoading(false);
      const newProperties = properties.map((item) =>
        item.id === response.data.id ? response.data : item
      );
      setProperties(newProperties);
      setDeleteReason("");
      setDeleteMode(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        {/**cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3 space-y-3 md:space-y-0">
          {isLoading && <Loader />}
          <Card
            label="Total properties posted"
            count={total}
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
          <Link href="/ibo/add-property">
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
        {cardMode === "posted" && (
          <p className="py-3 flex items-center text-red-500">
            <FiAlertCircle className="mr-3" /> Without verification of your
            property customer cannot view in website.
          </p>
        )}
        {/**properties */}
        {cardMode === "posted" && (
          <>
            <div
              className="py-2 text-lg"
              style={{ fontFamily: "Opensans-bold" }}
            >
              <p>Posted Properties</p>
            </div>
            {/* <div style={{ height: "500px", overflow: "auto" }}> */}
            <InfiniteScroll
              className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              dataLength={properties.length} //This is important field to render the next data
              next={fetchNextData}
              hasMore={hasMoreProperty}
              loader={
                <div className="mt-3 flex items-center justify-center">
                  <FiLoader
                    color="dodgerblue"
                    className="text-xl animate-spin"
                  />
                </div>
              }
            >
              {properties &&
                properties.map((p, i) => (
                  <PostedProperty
                    key={i}
                    property={p}
                    deleteProperties={deleteProperties}
                  />
                ))}
            </InfiniteScroll>
            {/* </div> */}
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
                    button={
                      <>
                        <Button url={a?.agreement_url} />
                        {purl || a?.police_verification ? (
                          <a
                            target="_blank"
                            href={a?.police_verification || purl}
                            className="p-2 ml-2 rounded-md text-white bg-red-500"
                          >
                            Police Verification
                          </a>
                        ) : (
                          <button
                            onClick={() => policeVerification(a)}
                            className="p-2 ml-2 rounded-md text-white bg-red-500"
                          >
                            Generate Police Verification
                          </button>
                        )}
                      </>
                    }
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
            <div className="flex flex-col">
              {visitedProperties &&
                visitedProperties.map((p, i) => (
                  <div
                    className="relative border-gray-200 flex items-center justify-between py-2 pl-2 pr-2"
                    key={i}
                    style={{ borderTopWidth: "1px" }}
                  >
                    <div className="w-24 h-24 overflow-hidden rounded-md">
                      <img
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
                        {p?.name}
                      </h6>
                      <p className="text-gray-400">
                        {p?.short_description.substring(0, 100) + "..."}
                      </p>
                      <div
                        className="mt-2 flex items-center justify-between"
                        style={{ fontFamily: "Opensans-bold" }}
                      >
                        <span
                          className="font-bold"
                          style={{ color: "var(--orange)" }}
                        >
                          By {p?.landlord}
                        </span>
                        <span>Bedrooms - {p?.bedrooms}</span>
                        <span>Bathrooms - {p?.bathrooms}</span>
                        <span>Floors - {p?.floors}</span>
                        <span>
                          Monthly Rent -{" "}
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(p?.monthly_rent)}
                        </span>
                      </div>
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
      {deleteMode && (
        <div
          className="fixed w-full h-screen top-0 left-0"
          style={{ background: "rgba(0,0,0,.3)" }}
        >
          <div className="absolute p-3 rounded-md bg-white max-w-md w-full left-1/2 transform -translate-x-1/2 top-1/4">
            <h5 style={{ fontFamily: "Opensans-bold" }}>Delete Request</h5>
            <span
              onClick={() => setDeleteMode(false)}
              className="absolute right-5 top-5 cursor-pointer text-xl text-red-500 hover:text-red-400"
            >
              <FiDelete />
            </span>
            <form name="deleteform" className="mt-5" onSubmit={deleteHandler}>
              <div className="form-element">
                <label
                  className="form-label"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  Reason to delete
                </label>
                <textarea
                  className="form-textarea rounded-sm border-gray-400"
                  name="delete_reason"
                  value={deleteReason}
                  onChange={(e) => setDeleteReason(e.target.value)}
                ></textarea>
              </div>
              <div className="text-right">
                <button className="p-2 rounded-md bg-red-500">
                  Request Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default PropertiesUI;
