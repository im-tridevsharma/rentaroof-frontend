import moment from "moment";
import Link from "next/link";

function PropertyIbo({ property }) {
  return property ? (
    <div className="border-2 border-gray-200 rounded-lg flex sm:flex-row flex-col items-center sm:items-start p-1 my-1 shadow-md mb-3">
      {/**small slider */}
      <div className="mr-5">
        <Link href={`/details/properties/${property?.property_code}`}>
          <a>
            <img
              src={property?.front_image || "/images/website/no_photo.png"}
              alt="property"
              className="h-40 w-60 object-cover"
            />
          </a>
        </Link>
      </div>
      {/**property details */}
      <div className="flex flex-col py-2 items-center sm:items-start w-full">
        <Link href={`/details/properties/${property?.property_code}`}>
          <a>
            <b style={{ fontFamily: "Opensans-bold" }}>{property?.name}</b>
            <p
              className="font-thin"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              {property?.city_name} {property?.state_name}{" "}
              {property?.country_name}
            </p>
          </a>
        </Link>
        <p
          className="flex text-center mt-1"
          style={{ color: "var(--blue)", fontFamily: "Opensans-semi-bold" }}
        >
          <span
            className="pr-4 mr-4"
            style={{ borderRightWidth: "2px", borderColor: "var(--blue)" }}
          >
            {property?.bedrooms} BHK
          </span>
          <span
            className="pr-4 mr-4"
            style={{ borderRightWidth: "2px", borderColor: "var(--blue)" }}
          >
            {property?.super_area} {property?.super_area_unit}
          </span>
          <span
            className="pr-4 mr-4"
            style={{ borderRightWidth: "2px", borderColor: "var(--blue)" }}
          >
            {property?.bathrooms} Bathrooms
          </span>
          <span>{property?.floors} Floor</span>
        </p>
        <h6
          style={{
            color: "var(--primary-color)",
            fontFamily: "Opensans-bold",
            fontSize: "1rem",
          }}
        >
          ₹ {property?.monthly_rent}/month
        </h6>

        <Link href={`/details/properties/${property?.property_code}`}>
          <a
            className="px-3 py-2 text-white uppercase text-3xs rounded-md"
            style={{
              backgroundColor: "var(--primary-color)",
              fontFamily: "Opensans-semi-bold",
            }}
          >
            View More
          </a>
        </Link>
        <p className="mt-1 flex items-center sm:px-0 px-5 justify-between w-full">
          <span className="flex items-center">
            {property?.property_code} |{" "}
            <img
              src="/icons/proprtydetls/icon_1.png"
              alt="share"
              className="w-4 h-4 object-contain mx-3"
            />
            Share
          </span>
          <span className="mr-3 text-xs">
            Posted on {moment(property?.created_at).format("DD MMM, YYYY")}
          </span>
        </p>
      </div>
    </div>
  ) : null;
}

export default PropertyIbo;
