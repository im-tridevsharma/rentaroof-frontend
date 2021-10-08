import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { __d } from "../../../../server";

function PropertyAddEssentials({ code }) {
  const [productId, setProductId] = useState("");
  const [user, setUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setProductId(ids[ids.length - 1]);

    const lu = JSON.parse(__d(localStorage.getItem("LU")));
    setUser(lu);
  }, []);

  const nextToAddress = () => {
    localStorage.removeItem("next_ap");
    localStorage.removeItem("recent_ap");
    router.push(`/${user.role}/properties`);
  };

  return (
    <div className="flex flex-col">
      {/**header */}
      <div
        className="flex items-center justify-between"
        style={{ fontFamily: "Opensans-semi-bold" }}
      >
        <h5>Add Property Essentials</h5>
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

export default PropertyAddEssentials;
