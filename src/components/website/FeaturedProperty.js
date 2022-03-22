import React from "react";
import Carousel from "react-grid-carousel";
import Link from "next/link";
import { getFeaturedProperties } from "../../lib/frontend/share";

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
    <div className="py-10 mt-10 px-5">
      <div className="max-w-2xl w-full mx-auto text-center">
        <h3 style={{ fontFamily: "Opensans-bold" }}>
          Have a look at some of our featured listing
        </h3>
      </div>
      <div className="mt-20">
        <Carousel rows={1} cols={4} gap={10}>
          {properties?.length > 0 &&
            properties.map((p, i) => (
              <Carousel.Item key={i}>
                <Link href={`/details/properties/${p?.property_code}`}>
                  <div className="flex flex-col rounded-md border border-gray-200 cursor-pointer">
                    <img
                      src={p?.front_image || "images/website/no_photo.png"}
                      alt={p?.name}
                      className="h-52 w-full object-cover rounded-md"
                    />
                    <div className="mt-3 px-5 py-1">
                      <p>{p?.name}</p>
                      <h6 style={{ fontFamily: "Opensans-bold" }}>
                        Rs. {p?.monthly_rent} | {p?.carpet_area}{" "}
                        {p?.carpet_area_unit}
                      </h6>
                      <p>
                        {p?.city_name}, {p?.state_name}
                      </p>
                      <p>
                        {p?.available_immediately && "Ready to Move"} |{" "}
                        {p?.type.toUpperCase()}
                      </p>
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
