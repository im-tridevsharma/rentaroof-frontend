import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import Loader from "../loader";
import {
  getUserProperty,
  saveUserProperty,
} from "../../lib/frontend/properties";

function FilterProperty({ property, user }) {
  const [isMarked, setIsMarked] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const addtoFavorite = async () => {
    setIsLoading(true);
    if (user?.id) {
      const updata = {
        user_id: user.id,
        property_id: property?.id,
        property_code: property?.property_code,
        front_image: property?.front_image,
        rating: "",
        type: "saved",
        property_name: property?.name,
        property_short_description: property?.short_description,
        property_posted_by: property?.posted_by,
      };
      const sres = await saveUserProperty(updata);
      if (sres?.status) {
        setIsLoading(false);
        setIsMarked(true);
      } else {
        console.error(sres?.error || sres.message);
        setIsLoading(false);
      }
    } else {
      localStorage.setItem("redirect", router.asPath);
      router.push("/login");
    }
  };

  React.useEffect(() => {
    //check is this property in favorite list
    (async () => {
      if (user?.id) {
        const res = await getUserProperty({
          type: "saved",
          property_code: property?.property_code,
          user_id: user?.id,
        });
        if (res?.status) {
          res?.data?.length > 0 &&
            setIsMarked(
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
      <div className="flex border-2 border-gray-200 mb-2">
        <div className="w-60 h-60 overflow-hidden border-r-2 border-gray-200 relative">
          <img
            src={property?.front_image || "/images/website/no_photo.png"}
            className="w-full h-full object-cover"
            alt="p"
          />

          <div
            onClick={addtoFavorite}
            className="absolute text-lg right-1 cursor-pointer top-1 w-8 h-8 bg-yellow-500 rounded-full text-white flex items-center justify-center"
          >
            {isMarked ? <BsBookmarkStarFill /> : <BsBookmarkStar />}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-start justify-between px-2 ml-5 py-1">
            <div>
              <h5
                style={{ fontFamily: "Opensans-bold" }}
                className="truncate max-w-md"
              >
                {property?.name}
              </h5>
              <p style={{ fontFamily: "Opensans-regular" }}>
                {property?.address?.full_address}
              </p>
            </div>
            <p style={{ color: "var(--primary-color)" }} className="font-bold">
              Rs.
              <b className="text-lg ml-1">{property?.monthly_rent}</b>
              /month
            </p>
          </div>
          <div
            className="border-t border-b border-l-0 border-r-0 border-gray-200 px-7 py-2 mt-2 text-lg"
            style={{ color: "var(--blue)", fontFamily: "Opensans-semi-bold" }}
          >
            <span
              className="pr-5 border-r-2"
              style={{ borderColor: "var(--blue)" }}
            >
              {property?.bedrooms} BHK
            </span>
            <span
              className="px-5 border-r-2"
              style={{ borderColor: "var(--blue)" }}
            >
              {property?.super_area} {property?.super_area_unit}
            </span>
            <span
              className="px-5 border-r-2"
              style={{ borderColor: "var(--blue)" }}
            >
              {property?.bathrooms} Bathrooms
            </span>
            <span className="pl-5">{property?.floors} Floor</span>
          </div>
          <p
            className="px-6 ml-1 py-1 text-gray-600 text-sm h-16 overflow-hidden"
            style={{ fontFamily: "Opensans-regular" }}
          >
            {property?.short_description}
          </p>
          <div className="px-7 mt-2" style={{ fontFamily: "Opensans-regular" }}>
            <Link href={`/details/properties/${property?.property_code}`}>
              <a
                className="px-2 py-1 rounded-md text-white"
                style={{ backgroundColor: "var(--blue)" }}
              >
                View Details
              </a>
            </Link>
          </div>
          <div className="flex items-center justify-between mt-2 px-7">
            <div className="flex items-center">
              <p>{property?.property_code}</p>
              <span className="flex items-center">
                <img
                  src="/icons/proprtydetls/icon_1.png"
                  alt="share"
                  className="w-4 h-4 object-contain ml-3 mr-1"
                />
                Share
              </span>
            </div>
            <span className="text-xs">
              Posted on {moment(property?.created_at).format("DD MMM, YYYY")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterProperty;
