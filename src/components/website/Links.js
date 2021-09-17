import React from "react";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

function Links({ title, links }) {
  return (
    <div className="flex flex-col mt-3 sm:mt-0">
      <b className="uppercase text-gray-500">{title}</b>
      <ul>
        {links?.length > 0 &&
          links.map((link, i) => (
            <li key={i} className="my-1">
              <Link href={link.href}>
                <a className="flex items-center">
                  <IoIosArrowForward className="text-gray-800" />{" "}
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
