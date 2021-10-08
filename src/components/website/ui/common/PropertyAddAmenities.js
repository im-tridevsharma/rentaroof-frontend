import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

function PropertyAddAmenities({ code }) {
  const [productId, setProductId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setProductId(ids[ids.length - 1]);
  }, []);

  const nextToAddress = () => {
    localStorage.setItem("next_ap", "ESSENTIALS");
    router.push("?step=next&next=ESSENTIALS&id=" + code);
  };

  return (
    <div className="flex flex-col">
      {/**header */}
      <div
        className="flex items-center justify-between"
        style={{ fontFamily: "Opensans-semi-bold" }}
      >
        <h5>Add Amenities</h5>
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
    </div>
  );
}

export default PropertyAddAmenities;
