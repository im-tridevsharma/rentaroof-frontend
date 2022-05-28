import React from "react";
import Carousel from "react-grid-carousel";
import Link from "next/link";
import { getFeaturedProperties } from "../../lib/frontend/share";
import { FaMapMarker } from "react-icons/fa";

function FeaturedProperty() {
  const [properties, setProperties] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await getFeaturedProperties();
      if (res?.status) {
        setProperties(res?.data);
      }
    })();
  }, []);

  return (
    <div className="py-10 mt-10 px-5 max-w-5xl w-full mx-auto ">
      <div>
        <h3 style={{ fontFamily: "Opensans-bold" }}>
          Have a peak at some of our{" "}
          <span className="text-blue-400">featured listings!</span>
        </h3>
        <p
          className="mt-2 p-0 text-gray-400"
          style={{ fontFamily: "Opensans-regular" }}
        >
          Discover thousands of properties and homes near you.
        </p>
      </div>
      <div className="mt-10">
        <Carousel rows={1} cols={3} gap={20}>
          {properties?.length > 0 &&
            properties.map((p, i) => (
              <Carousel.Item key={i}>
                <Link href={`/details/properties/${p?.property_code}`}>
                  <div className="flex flex-col bg-white pitem group shadow-md cursor-pointer overflow-hidden">
                    <img
                      src={p?.front_image || "images/website/no_photo.png"}
                      alt={p?.name}
                      className="h-52 w-full object-cover image"
                    />
                    <div
                      className="mt-3 px-5 py-1"
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      <p className="px-2 py-1 text-blue-500 font-bold mb-3 border border-blue-500 rounded-md inline-block">
                        Rs. {p?.monthly_rent}
                      </p>
                      <h6
                        className="text-md truncate w-60"
                        style={{ fontFamily: "Opensans-bold" }}
                      >
                        {p?.name}
                      </h6>
                      <p className="font-semibold flex items-center">
                        <FaMapMarker className="text-blue-500 mr-1" />
                        {p?.city_name}, {p?.state_name}
                      </p>
                      <div className="flex items-center justify-between my-3">
                        <p className="text-gray-600">
                          <img src="/theme/icons/bed.png" alt="beds" />
                          <span>
                            Beds <b>{p?.bedrooms}</b>
                          </span>
                        </p>
                        <p className="text-gray-600">
                          <img src="/theme/icons/bath.png" alt="bath" />
                          <span>
                            Baths <b>{p?.bathrooms}</b>
                          </span>
                        </p>
                        <p className="text-gray-600">
                          <img src="/theme/icons/sqft.png" alt="sqft" />
                          <span>
                            Sqft <b>{p?.super_area}</b>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </Carousel.Item>
            ))}
        </Carousel>
      </div>
    </div>
  );
}

export default FeaturedProperty;
