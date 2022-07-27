import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Loader from "../loader";
import {
  getUserProperty,
  saveUserProperty,
} from "../../lib/frontend/properties";
import ReactTooltip from "react-tooltip";
import { FaDirections, FaShareAlt } from "react-icons/fa";
import { toast } from "react-toastify";

function PropertyItem({ property, overEvent, outEvent, user }) {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addtoFavorite = async () => {
    setIsLoading(true);
    if (user?.id) {
      const updata = {
        user_id: user.id,
        property_id: property?.id,
        property_code: property?.property_code,
        front_image: property?.front_image,
        rating: "",
        type: "favorite",
        property_name: property?.name,
        property_short_description: property?.short_description,
        property_posted_by: property?.posted_by,
      };
      const sres = await saveUserProperty(updata);
      if (sres?.status) {
        setIsLoading(false);
        setIsFavorite(true);
      } else {
        console.error(sres?.error || sres.message);
        setIsLoading(false);
      }
    } else {
      localStorage.setItem("redirect", router.asPath);
      router.push("/login");
    }
  };

  const getDirection = (lat, lng) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        window
          .open(
            `https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/${lat},${lng}`,
            "_blank"
          )
          .focus();
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const shareIt = (title, link, short) => {
    if (navigator.canShare) {
      try {
        navigator
          .share({
            title: title,
            url: link,
            text: short,
          })
          .then((value) => alert(value))
          .catch((err) => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Sharing is not supported by this browser.");
    }
  };

  useEffect(() => {
    //check is this property in favorite list
    (async () => {
      if (user?.id) {
        const res = await getUserProperty({
          type: "favorite",
          property_code: property?.property_code,
          user_id: user?.id,
        });
        if (res?.status) {
          res?.data?.length > 0 &&
            setIsFavorite(
              res?.data?.filter((p) => p.property_id === property?.id)?.length >
                0
                ? true
                : false
            );
        }
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className="flex flex-col items-center my-2 px-1"
        onMouseOver={overEvent}
        onMouseOut={outEvent}
      >
        {/**small slider */}
        <Link href={`/details/properties/${property?.property_code}`}>
          <>
            <div
              style={{
                height: "160px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={property?.front_image || "/images/website/no_photo.png"}
                alt="property"
                className="cursor-pointer object-cover"
              />
              <div
                onClick={addtoFavorite}
                className="absolute right-1 top-1 text-2xl cursor-pointer text-red-500 w-8 h-8 rounded-full bg-white flex items-center justify-center"
              >
                {isFavorite ? (
                  <MdFavorite data-tip="Added to favorite" />
                ) : (
                  <MdFavoriteBorder data-tip="Add to favorite" />
                )}
                <ReactTooltip />
              </div>
            </div>
          </>
        </Link>
        {/**property details */}
        <div className="flex flex-col py-5 items-start">
          <Link href={`/details/properties/${property?.property_code}`}>
            <b
              style={{ fontFamily: "Opensans-bold" }}
              className="cursor-pointer"
            >
              {property?.name || "-"}
            </b>
          </Link>
          <p className="font-thin" style={{ fontFamily: "Opensans-semi-bold" }}>
            {property?.address?.full_address || property?.full_address}
          </p>
          <h6
            className="my-2 font-bold"
            style={{
              color: "var(--primary-color)",
              fontFamily: "Opensans-bold",
            }}
          >
            ₹ {property?.monthly_rent}/month
          </h6>
          <div className="flex items-center">
            <Link href={`/details/properties/${property?.property_code}`}>
              <a
                className="px-3 py-2 text-white uppercase text-2xs rounded-md"
                style={{
                  backgroundColor: "var(--secondary-color)",
                  fontFamily: "Opensans-semi-bold",
                }}
              >
                More Info
              </a>
            </Link>
            <FaDirections
              className="ml-4 text-lg cursor-pointer"
              onClick={() =>
                getDirection(property?.address?.lat, property?.address?.long)
              }
              data-tip="Get Direction"
            />
            <ReactTooltip />
            <FaShareAlt
              className="ml-4 text-lg cursor-pointer"
              onClick={() =>
                shareIt(
                  property?.name,
                  `/details/properties/${property?.property_code}`,
                  property?.short_description
                )
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyItem;
