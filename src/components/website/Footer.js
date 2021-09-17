import React from "react";
import { FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMail, FiPhoneCall, FiSearch } from "react-icons/fi";
import Links from "./Links";

const links = [
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
      { href: "/", value: "About Us" },
      { href: "/", value: "Listing Properties" },
      { href: "/", value: "For IBO" },
      { href: "/", value: "For Landlords" },
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

function Footer() {
  return (
    <>
      {/**agent finder */}
      <form
        className="flex items-center justify-center p-3"
        style={{ backgroundColor: "#7b4a9c" }}
      >
        <label className="uppercase font-bold text-white">Find an Agent</label>
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
          <FiSearch />
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
            <b className="uppercase text-gray-500">Secure Payments</b>
            <div className="grid grid-cols-2">
              <div className="bg-blue-100 my-1 mr-1 p-2 rounded-lg flex items-center justify-center">
                <img
                  className="h-7 w-30 object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/SOFORT_%C3%9CBERWEISUNG_Logo.svg/1280px-SOFORT_%C3%9CBERWEISUNG_Logo.svg.png"
                  alt="payment1"
                />
              </div>
              <div className="bg-blue-100 my-1 mr-1 p-2 rounded-lg flex items-center justify-center">
                <img
                  className="h-7 w-30 object-cover"
                  src="https://www.pngall.com/wp-content/uploads/2017/05/Visa-Logo-PNG-Pic.png"
                  alt="payment2"
                />
              </div>
              <div className="bg-blue-100 my-1 mr-1 p-2 rounded-lg flex items-center justify-center">
                <img
                  className="h-7 w-30 object-cover"
                  src="https://www.vippng.com/png/full/23-235694_american-express-svg-logo.png"
                  alt="payment3"
                />
              </div>
              <div className="bg-blue-100 my-1 mr-1 p-2 rounded-lg flex items-center justify-center">
                <img
                  className="h-7 w-30 object-cover"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/MasterCard_early_1990s_logo.png/1200px-MasterCard_early_1990s_logo.png"
                  alt="payment4"
                />
              </div>
            </div>
          </div>
          {/**questions */}
          <div className="flex flex-col sm:pl-20 mt-3 sm:mt-0">
            <b className="uppercase text-gray-500">Have questions?</b>
            <div className="flex flex-col items-start mt-2">
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
                <b className="uppercase text-gray-500">Follow Us</b>
                <div className="flex text-xl text-gray-500 mt-1">
                  <a href="http://facebook.com">
                    <FaFacebookSquare />
                  </a>
                  <a href="http://twitter.com" className="ml-2">
                    <FaTwitter />
                  </a>
                  <a href="http://instagram.com" className="ml-2">
                    <FaInstagram />
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
          <p className="uppercase text-gray-500">
            &copy; 2021 Rent a Roof | All Rights Reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Footer;
