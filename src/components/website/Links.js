import React from "react";
import Link from "next/link";

function Links({ title, links }) {
  return (
    <div className="flex flex-col mt-3 sm:mt-0 text-white">
      <h5 style={{ fontFamily: "Opensans-bold" }}>{title}</h5>
      <span className="w-12 h-1 rounded-full bg-yellow-500"></span>
      <ul style={{ fontFamily: "Opensans-regular" }} className="mt-3">
        {links?.length > 0 &&
          links.map((link, i) => (
            <li key={i} className="my-1">
              <Link href={link.href}>
                <a
                  className="flex items-center text-white font-medium"
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  <span>{link.value}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Links;
