import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdClose } from "react-icons/md";
import Loader from "../../loader";
import { useSelector, shallowEqual } from "react-redux";
import ReactTooltip from "react-tooltip";

function Sidebar({ name, page, sideBarToggled, isHide, setIsHide }) {
  const router = useRouter();
  const [links, setLinks] = useState([]);
  const isHidden = sideBarToggled ? "hidden" : "";
  const role = name.toLowerCase() === "user" ? "tenant" : name.toLowerCase();
  const [isLoading, setIsLoading] = useState(false);

  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const links = await import(`../../../json/${role}.js`);
      setLinks(links.default);
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading && <Loader overlay={true} />}
      <div
        className={`sm:relative absolute ${
          isHide && "hidden"
        } bg-white flex flex-col transition-all duration-500 ease h-screen z-40 ${
          sideBarToggled ? "w-16" : "w-64"
        }`}
        style={{ minWidth: sideBarToggled ? "64px" : "256px" }}
      >
        {/**logo */}
        <div>
          <Link href={`/${role}/dashboard`}>
            <a
              className="flex items-center py-2 px-4 bg-white"
              style={{ height: "52px" }}
              data-tip={sideBarToggled ? "Goto Dashboard" : ""}
            >
              <img
                src={website?.logo || "/images/website/no_photo.png"}
                alt="logo"
                className="h-20 w-20 object-contain"
              />

              <p
                className={`uppercase text-xl mt-2 ${isHidden}`}
                style={{ fontFamily: "Opensans-bold" }}
              >
                <span style={{ color: "var(--blue)" }}>
                  {website?.company_name}
                </span>
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
                      className="flex items-center py-3 px-5 border-gray-200 text-gray-500"
                      style={{
                        borderBottomWidth: "1px",
                      }}
                      data-tip={sideBarToggled ? link.label : ""}
                    >
                      <ReactTooltip />
                      <span
                        className={`${
                          router.route === link?.href && "filter brightness-0"
                        }`}
                      >
                        {link?.icon}
                      </span>
                      <span
                        className={`ml-2 ${isHidden} ${
                          router.route === link?.href && "filter brightness-0"
                        }`}
                      >
                        {link?.label}
                      </span>
                    </a>
                  </Link>
                  {router.route === link?.href && (
                    <span
                      className="absolute w-1 h-full bottom-0"
                      style={{ backgroundColor: "var(--orange)" }}
                    ></span>
                  )}
                </li>
              ))}
          </ul>
          <span
            onClick={() => setIsHide(true)}
            className="sm:hidden inline-block cursor-pointer m-4 p-2 text-white bg-red-400 rounded-full"
          >
            <MdClose />
          </span>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
