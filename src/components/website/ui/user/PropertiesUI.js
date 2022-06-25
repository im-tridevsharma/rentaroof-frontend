import React, { useEffect, useState } from "react";
import router from "next/router";
import Link from "next/link";
import Card from "../../Card";
import { MdClose } from "react-icons/md";
import { FaHeart, FaWalking, FaSearch } from "react-icons/fa";
import Loader from "../../../loader";
import {
  deleteUserSavedProperties,
  getUserSavedProperties,
} from "../../../../lib/frontend/auth";
import { __d } from "../../../../server";
import ReactTooltip from "react-tooltip";
import { getVisitedProperties } from "../../../../lib/frontend/share";
import { toast } from "react-toastify";

function PropertiesUI() {
  const [tabMode, setTabMode] = useState("visited");
  const [savedProperties, setSavedProperties] = useState([]);
  const [visitedProperties, setVisitedProperties] = useState([]);
  const [favoriteProperties, setFavoriteProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setUser(u);
      (async () => {
        const response = await getUserSavedProperties(u.id);

        if (response?.status) {
          setIsLoading(false);
          const favorite = response?.data.filter((p) => p.type === "favorite");
          setFavoriteProperties(favorite);
          setSavedProperties([]);
        } else {
          setIsLoading(false);
          toast.error(response?.error || response?.message);
        }

        setIsLoading(true);
        const res = await getVisitedProperties();
        if (res?.status) {
          setVisitedProperties(res?.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(res?.error || res?.message);
        }

        setTabMode(router?.query?.type || "visited");
      })();
    }
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
        if (type === "saved") {
          const newsaved = savedProperties.filter((v) => v.id !== res?.data.id);
          setSavedProperties(newsaved);
        }
        if (type === "favorite") {
          const newfavorite = favoriteProperties.filter(
            (v) => v.id !== res?.data.id
          );
          setFavoriteProperties(newfavorite);
        }
      } else {
        setIsLoading(false);
        toast.error(res?.error || res?.message);
      }
    } else {
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col px-4">
        {/**cards */}
        <div className="relative bg-lightBlue-600 pb-8">
          <div className="mx-auto w-full">
            <div className="-mx-4">
              <div className="flex flex-wrap">
                <Card
                  col={4}
                  label="Visited Properties"
                  icon={<FaWalking />}
                  onClick={() => setTabMode("visited")}
                  value={visitedProperties?.length}
                  state="visited"
                  current={tabMode}
                  color="yellow"
                />
                <Card
                  col={4}
                  label="Saved Searches"
                  onClick={() => setTabMode("saved")}
                  icon={<FaSearch />}
                  state="saved"
                  current={tabMode}
                  value={savedProperties?.length}
                  color="green"
                />
                <Card
                  col={4}
                  label="Shortlisted Properties"
                  onClick={() => setTabMode("favorite")}
                  icon={<FaHeart />}
                  state="favorite"
                  current={tabMode}
                  value={favoriteProperties?.length}
                  color="red"
                />
              </div>
            </div>
          </div>
        </div>

        {/**visited properties */}
        {tabMode === "visited" && (
          <div className="flex flex-col  p-5 bg-white rounded-md ">
            <p
              className="flex items-center justify-between"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <span>Visited Properties</span>
            </p>
            <div className="mt-5">
              {visitedProperties?.length > 0 ? (
                visitedProperties.map((p, i) => (
                  <div
                    className="relative border-gray-200 flex items-center justify-between py-2 pl-2 pr-2"
                    key={i}
                    style={{ borderTopWidth: "1px" }}
                  >
                    <div className=" w-24 h-24 overflow-hidden rounded-md">
                      <Link href={`/details/properties/${p?.property_code}`}>
                        <a>
                          <img
                            src={
                              p?.front_image || "/images/website/no_photo.png"
                            }
                            alt="property"
                            layout="responsive"
                            width="100"
                            height="100"
                          />
                        </a>
                      </Link>
                    </div>
                    <div
                      className="flex flex-col flex-grow px-5 leading-4"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      <Link href={`/details/properties/${p?.property_code}`}>
                        <a>
                          <h6
                            className="text-gray-800"
                            style={{ fontFamily: "Opensans-bold" }}
                          >
                            {p?.name}
                          </h6>
                        </a>
                      </Link>
                      <p className="text-gray-400">
                        {p?.short_description.substring(0, 100) + "..."}
                      </p>
                      <div
                        className="mt-2 flex items-center justify-between"
                        style={{ fontFamily: "Opensans-bold" }}
                      >
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
                  </div>
                ))
              ) : (
                <p className="text-red-500">No searches found!</p>
              )}
            </div>
          </div>
        )}
        {/**saved properties */}
        {tabMode === "saved" && (
          <div className="flex flex-col  p-5 bg-white rounded-md ">
            <p
              className="flex items-center justify-between"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <span>Saved Searches</span>
            </p>
            <div className="mt-5">
              {savedProperties?.length > 0 ? (
                savedProperties.map((p, i) => (
                  <div
                    className="relative border-gray-200 flex items-center justify-between py-2 pl-8 pr-2"
                    key={i}
                    style={{ borderTopWidth: "1px" }}
                  >
                    <span
                      onClick={() => deleteMe(p.id, "saved")}
                      className="p-1 rounded-md bg-gray-400 absolute top-2 left-0 cursor-pointer text-white"
                      data-tip="Remove"
                    >
                      <MdClose />
                      <ReactTooltip />
                    </span>
                    <div className="w-20 h-20 overflow-hidden rounded-md">
                      <Link href={`/details/properties/${p?.property_code}`}>
                        <a>
                          <img
                            src={
                              p?.front_image || "/images/website/no_photo.png"
                            }
                            alt="property"
                            layout="responsive"
                            width="80"
                            height="80"
                          />
                        </a>
                      </Link>
                    </div>
                    <div
                      className="flex flex-col flex-grow px-5 leading-4"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      <Link href={`/details/properties/${p?.property_code}`}>
                        <a>
                          <h6
                            className="text-gray-800"
                            style={{ fontFamily: "Opensans-bold" }}
                          >
                            {p?.property_name}
                          </h6>
                        </a>
                      </Link>
                      <p className="text-gray-400">
                        {p?.property_short_description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-red-500">No properties found!</p>
              )}
            </div>
          </div>
        )}
        {/**favorite properties */}
        {tabMode === "favorite" && (
          <div className="flex flex-col  p-5 bg-white rounded-md ">
            <p
              className="flex items-center justify-between"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <span>Shortlisted Properties</span>
            </p>
            <div className="mt-5">
              {favoriteProperties?.length > 0 ? (
                favoriteProperties.map((p, i) => (
                  <div
                    className="relative border-gray-200 flex items-center justify-between py-2 pl-8 pr-2"
                    key={i}
                    style={{ borderTopWidth: "1px" }}
                  >
                    <span
                      onClick={() => deleteMe(p.id, "favorite")}
                      className="p-1 rounded-md bg-gray-400 absolute top-2 left-0 cursor-pointer text-white"
                      data-tip="Remove"
                    >
                      <MdClose />
                      <ReactTooltip />
                    </span>
                    <div className="w-20 h-20 overflow-hidden rounded-md">
                      <Link href={`/details/properties/${p?.property_code}`}>
                        <a>
                          <img
                            src={
                              p?.front_image || "/images/website/no_photo.png"
                            }
                            alt="property"
                            layout="responsive"
                            width="80"
                            height="80"
                          />
                        </a>
                      </Link>
                    </div>
                    <div
                      className="flex flex-col flex-grow px-5 leading-4"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      <Link href={`/details/properties/${p?.property_code}`}>
                        <a>
                          <h6
                            className="text-gray-800"
                            style={{ fontFamily: "Opensans-bold" }}
                          >
                            {p?.property_name}
                          </h6>
                        </a>
                      </Link>
                      <p className="text-gray-400">
                        {p?.property_short_description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-red-500">No properties found!</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PropertiesUI;
