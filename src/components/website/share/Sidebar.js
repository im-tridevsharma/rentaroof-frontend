import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar({ name, page, sideBarToggled }) {
  const router = useRouter();
  const [links, setLinks] = useState([]);
  const isHidden = sideBarToggled ? "hidden" : "";
  const role = name.toLowerCase() === "user" ? "tenant" : name.toLowerCase();

  useEffect(() => {
    (async () => {
      const links = await import(`../../../json/${role}.js`);
      setLinks(links.default);
    })();
  }, []);

  return (
    <div
      className="flex flex-col transition-width duration-500 ease h-screen z-40"
      style={{
        minWidth: sideBarToggled ? "64px" : "256px",
        width: sideBarToggled ? "64px" : "256px",
      }}
    >
      {/**logo */}
      <div>
        <Link href={`/${role}/dashboard`}>
          <a
            className="flex items-center py-2 px-4 bg-white"
            style={{ height: "52px" }}
          >
            <img
              src="/logos/logo-icon.png"
              alt="logo"
              className="h-8 object-contain"
            />

            <p
              className={`uppercase text-xl mt-2 ${isHidden}`}
              style={{ fontFamily: "Opensans-bold" }}
            >
              <span style={{ color: "var(--blue)" }}>Rent a</span>
              <span style={{ color: "var(--orange)" }}> Roof</span>
            </p>
          </a>
        </Link>
      </div>
      {/**dashboard name */}
      <div
        className={`flex items-center justify-center text-center text-gray-100 uppercase ${
          sideBarToggled ? "" : "text-xs"
        }`}
        style={{
          backgroundColor: "var(--blue)",
          fontFamily: "Opensans-bold",
          fontSize: sideBarToggled && "8px",
          lineHeight: sideBarToggled && "8px",
          minHeight: "32px",
          height: "32px",
        }}
      >{`${name} ${page}`}</div>
      {/**render navigation */}
      <nav>
        <ul style={{ fontFamily: "Opensans-semi-bold" }}>
          {links?.length > 0 &&
            links.map((link, i) => (
              <li key={i} className="relative">
                <Link href={link?.href || "/"}>
                  <a
                    className={`flex items-center py-3 px-5 border-gray-200 text-gray-500`}
                    style={{
                      borderBottomWidth: "1px",
                    }}
                  >
                    {link?.icon}{" "}
                    <span className={`ml-2 ${isHidden}`}>{link?.label}</span>
                  </a>
                </Link>
                {router.route === link?.href && (
                  <span
                    className="absolute w-1 h-8 bottom-0"
                    style={{ backgroundColor: "var(--orange)" }}
                  ></span>
                )}
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
