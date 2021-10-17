import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import Loader from "../loader";
import {
  getUserProperty,
  saveUserProperty,
} from "../../lib/frontend/properties";

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
        alert("Added to favorite!");
      } else {
        console.error(sres?.error || sres.message);
        setIsLoading(false);
      }
    } else {
      localStorage.setItem("redirect", router.asPath);
      router.push("/login");
    }
  };

  useEffect(() => {
    //check is this property in favorite list
    (async () => {
      const res = await getUserProperty({
        type: "favorite",
        property_code: property?.property_code,
      });
      if (res?.status) {
        setIsFavorite(res?.data?.length > 0 ? true : false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div
        className="border-2 border-gray-200 rounded-lg flex p-1 my-1 shadow-sm"
        onMouseOver={overEvent}
        onMouseOut={outEvent}
      >
        {/**small slider */}
        <div className="mr-5 relative">
          <img
            src={property?.front_image || "/images/website/no_photo.png"}
            alt="property"
            className="h-40 md:w-52 object-cover"
          />
          <div
            onClick={addtoFavorite}
            className="absolute right-1 top-1 text-2xl cursor-pointer text-red-500 w-8 h-8 rounded-full bg-white flex items-center justify-center"
          >
            {isFavorite ? (
              <MdFavorite title="Added to favorite" />
            ) : (
              <MdOutlineFavoriteBorder title="Add to favorite" />
            )}
          </div>
        </div>
        {/**property details */}
        <div className="flex flex-col py-5 items-start">
          <b style={{ fontFamily: "Opensans-bold" }}>{property?.name || "-"}</b>
          <p className="font-thin" style={{ fontFamily: "Opensans-semi-bold" }}>
            {property?.address?.full_address}
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
        </div>
      </div>
    </>
  );
}

export default PropertyItem;
