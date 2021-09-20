import React from "react";
import Link from "next/link";

function Links({ title, links }) {
  return (
    <div className="flex flex-col mt-3 sm:mt-0">
      <b
        className="uppercase text-gray-500"
        style={{ fontFamily: "Opensans-bold" }}
      >
        {title}
      </b>
      <ul style={{ fontFamily: "Opensans-regular" }}>
        {links?.length > 0 &&
          links.map((link, i) => (
            <li key={i} className="my-1">
              <Link href={link.href}>
                <a className="flex items-center">
                  <img
                    src="/icons/home/side_arrow.png"
                    className="mr-1"
                    alt="arrow"
                  />
                  <span className="text-gray-500">{link.value}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Links;
