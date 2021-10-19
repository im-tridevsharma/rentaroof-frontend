import React, { useEffect, useState } from "react";
import { FiMail, FiPhoneCall } from "react-icons/fi";
import server from "../../server";
import Links from "./Links";

const getPages = async () => {
  let pages = false;
  await server
    .get("/pages")
    .then((response) => {
      pages = response?.data;
    })
    .catch((error) => {
      pages = error?.response?.data;
    });

  return pages;
};

function Footer() {
  const [pages, setPages] = useState([]);
  let links = [
    {
      title: "Rent",
      links: [
        { href: "/", value: "Lorem Ipsum" },
        { href: "/", value: "Lorem Ipsum" },
        { href: "/", value: "Lorem Ipsum" },
        { href: "/", value: "Lorem Ipsum" },
        { href: "/", value: "Lorem Ipsum" },
      ],
    },
    {
      title: "Information",
      links: [
        { href: "/", value: "Home" },
        { href: "/about-us", value: "About Us" },
        ...pages,
      ],
    },
    {
      title: "Our Services",
      links: [
        { href: "/", value: "Home" },
        { href: "/", value: "About Us" },
        { href: "/", value: "Listing Properties" },
        { href: "/", value: "For IBO" },
        { href: "/", value: "For Landlords" },
      ],
    },
  ];

  useEffect(() => {
    (async () => {
      const data = await getPages();
      if (data?.status) {
        let newpages = [];
        data.data.forEach((p) => {
          newpages.push({ href: p.slug, value: p.name });
        });
        setPages(newpages);
      }
    })();
  }, []);

  return (
    <>
      {/**agent finder */}
      <form
        className="flex items-center justify-center p-3"
        style={{
          backgroundColor: "var(--primary-color)",
          fontFamily: "Opensans-regular",
        }}
      >
        <label
          className="uppercase font-bold text-white"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          Find an Agent
        </label>
        <input
          type="text"
          name="agent"
          placeholder="Agent"
          className="border-2 max-w-xl w-full text-sm py-4 h-3 text-gray-600 border-gray-100 rounded-md bg-white ml-5"
        />
        <button
          type="submit"
          className="bg-gray-400 ml-2 py-2 px-8 rounded-md text-white"
        >
          <img
            src="/icons/home/home_search_icon.png"
            className="h-4 object-contain"
            alt="search"
          />
        </button>
      </form>
      <div className="flex flex-col p-10 pb-0">
        <div className="grid grid-cols-2 sm:grid-cols-5 sm:space-x-5 pb-6">
          {links?.length > 0 &&
            links.map((item, i) => (
              <Links key={i} title={item.title} links={item.links} />
            ))}

          {/**payment */}
          <div className="flex flex-col mt-3 sm:mt-0">
            <b
              className="uppercase text-gray-500"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Secure Payments
            </b>
            <div className="grid grid-cols-2">
              <div className="my-1 mr-1 flex items-center justify-center">
                <img src="/icons/home/paylogo1.png" alt="payment1" />
              </div>
              <div className="my-1 mr-1 flex items-center justify-center">
                <img src="/icons/home/paylogo2.png" alt="payment1" />
              </div>
              <div className="my-1 mr-1 flex items-center justify-center">
                <img src="/icons/home/paylogo3.png" alt="payment1" />
              </div>
              <div className="my-1 mr-1 flex items-center justify-center">
                <img src="/icons/home/paylogo4.png" alt="payment1" />
              </div>
            </div>
          </div>
          {/**questions */}
          <div className="flex flex-col sm:pl-20 mt-3 sm:mt-0">
            <b
              className="uppercase text-gray-500"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Have questions?
            </b>
            <div
              className="flex flex-col items-start mt-2"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <div className="flex text-gray-700">
                <FiPhoneCall className="mt-1" />
                <p className="flex flex-col ml-2 leading-3">
                  <span>Toll Free</span>
                  <span className="text-xs text-gray-500">1800 2500 001</span>
                </p>
              </div>
              <div className="flex text-gray-700 mt-3">
                <FiMail className="mt-1" />
                <p className="flex flex-col ml-2 leading-3">
                  <span>Email</span>
                  <span className="text-xs text-gray-500">
                    info@rentaroof.com
                  </span>
                </p>
              </div>
              <div className="mt-3 flex flex-col">
                <b
                  className="uppercase text-gray-500"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  Follow Us
                </b>
                <div className="flex text-xl text-gray-500 mt-1">
                  <a href="http://facebook.com">
                    <img src="/icons/home/fb_grey.png" alt="fb" />
                  </a>
                  <a href="http://twitter.com" className="ml-2">
                    <img src="/icons/home/twt_grey.png" alt="twitter" />
                  </a>
                  <a href="http://instagram.com" className="ml-2">
                    <img src="/icons/home/instagrey.png" alt="insa" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="text-center p-5 border-gray-300"
          style={{ borderTopWidth: "1px" }}
        >
          <p
            className="uppercase text-gray-500"
            style={{ fontFamily: "Opensans-regular" }}
          >
            &copy; 2021 Rent a Roof | All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
