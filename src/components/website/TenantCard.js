import React from "react";
import Link from "next/link";

function TenantCard({ tenant, info }) {
  return (
    <div
      style={{ fontFamily: "Opensans-regular" }}
      className="flex flex-col items-center justify-center m-1 bg-white p-4 border-2 border-gray-200 rounded-md"
    >
      <div className="w-14 h-14 rounded-full overflow-hidden">
        <img src="/images/faces/m1.png" alt="user" />
      </div>
      <p
        className="mt-2"
        style={{ fontFamily: "Opensans-semi-bold", fontSize: "1rem" }}
      >
        {tenant?.name}
      </p>
      <p
        className="text-2xs mt-1 mb-4 font-semibold"
        style={{ color: "var(--blue)" }}
      >
        {tenant?.email}
      </p>
      <p className="text-center text-xs text-gray-500">{tenant?.description}</p>
      <div
        className="mt-5 flex items-center justify-between w-full"
        style={{ fontFamily: "Opensans-semi-bold" }}
      >
        <button onClick={info}>More Info</button>
        <Link href="/">
          <a
            className="p-2 rounded-md text-white"
            style={{ backgroundColor: "var(--blue)" }}
          >
            Agreement Details
          </a>
        </Link>
      </div>
    </div>
  );
}

export default TenantCard;
