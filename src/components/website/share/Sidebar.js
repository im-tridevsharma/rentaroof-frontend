import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../loader";
import { useSelector, shallowEqual } from "react-redux";
import { FaBars, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function Sidebar({ name, user }) {
  const router = useRouter();
  const [links, setLinks] = useState([]);
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
      <nav className="md:left-0 bg-black md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-x flex flex-wrap items-center justify-between relative md:w-64 z-10 pt-1 pb-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
          >
            <FaBars />
          </button>
          <Link href="/">
            <a className="text-left text-blueGray-600 mr-0 flex items-center whitespace-nowrap text-sm uppercase font-bold px-0">
              <img
                src={user?.profile_pic || "/images/faces/icon-user.png"}
                alt="logo"
                className="h-14 w-14 border border-gray-500 rounded-full object-cover"
              />
              <p className="flex flex-col ml-2">
                <b className="text-white">
                  {user?.first} {user?.last}
                </b>
                <span
                  style={{ fontSize: "10px" }}
                  className="flex items-center text-white"
                >
                  {user?.role}
                  {user?.account_status === "activated" ? (
                    <FaCheckCircle className="ml-2 text-green-400" size={16} />
                  ) : (
                    <FaExclamationCircle
                      className="ml-2 text-red-400"
                      size={16}
                    />
                  )}
                </span>
              </p>
            </a>
          </Link>

          <div className="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded hidden">
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <a
                    className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    href="#/"
                  >
                    Rent a Roof
                  </a>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            <hr className="my-4 md:min-w-full" />
            {links?.length > 0 ? (
              links.map((link, index) => (
                <div key={index}>
                  <h6 className="md:min-w-full text-gray-300 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
                    {link?.label}
                  </h6>
                  <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                    {link?.navs?.length > 0 ? (
                      link.navs.map((nav, i) => (
                        <li className="items-center" key={i}>
                          <Link href={nav?.href}>
                            <a
                              className={`text-xs uppercase flex items-center py-3 font-bold ${
                                router.route === nav?.href
                                  ? "text-lightBlue-500 hover:text-lightBlue-600"
                                  : "text-blueGray-700 hover:text-blueGray-500"
                              } `}
                            >
                              {nav.icon}
                              {nav.title || ""}
                            </a>
                          </Link>
                        </li>
                      ))
                    ) : (
                      <></>
                    )}
                  </ul>
                  <hr className="my-4 md:min-w-full" />
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
