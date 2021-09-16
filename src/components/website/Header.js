import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  GrFacebookOption,
  GrInstagram,
  GrLinkedinOption,
  GrMail,
  GrTwitter,
  GrYoutube,
} from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";

function Header() {
  return (
    <div className="flex flex-col">
      {/**header top part */}
      <div
        className="flex flex-col items-center sm:flex-row sm:justify-between px-5 py-3 text-white"
        style={{ backgroundColor: "#7b4a9c" }}
      >
        {/**header top left */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between max-w-3xl w-full">
          <div className="flex items-center mb-1 sm:mb-0">
            <GrMail className="text-lg mr-1" />
            <span>contact@example.com</span>
          </div>
          <div className="flex items-center mb-1 sm:mb-0">
            <FaPhoneAlt className="text-sm mr-1" />
            <span>(123) 456 7890</span>
          </div>
          <div className="flex items-center mb-1 sm:mb-0 text-center">
            <span>
              Toll Free:800-2345-6799 (7 Days a week from 9:00am to 7:00pm)
            </span>
          </div>
        </div>
        {/**header top right */}
        <div className="flex items-center mt-2 sm:mt-0">
          <a href="http://twitter.com" className="mx-2 hover:text-gray-300">
            <GrTwitter />
          </a>
          <a href="http://facebook.com" className="mx-2 hover:text-gray-300">
            <GrFacebookOption />
          </a>
          <a href="http://instagram.com" className="mx-2 hover:text-gray-300">
            <GrInstagram />
          </a>
          <a href="http://linkedin.com" className="mx-2 hover:text-gray-300">
            <GrLinkedinOption />
          </a>
          <a href="http://youtube.com" className="mx-2 hover:text-gray-300">
            <GrYoutube />
          </a>
        </div>
      </div>
      {/**header nav part */}
      <div className="px-5 py-2 bg-white flex flex-col sm:flex-row items-center sm:justify-between">
        {/**logo */}
        <div>
          <Image
            src="/logos/logorentaroof.png"
            alt="logo"
            width={200}
            height={55}
          />
        </div>
        {/**navigation */}
        <div className="flex items-center flex-col sm:flex-row">
          <ul className="hidden sm:flex sm:items-center">
            <li className="mx-2">
              <Link href="/">
                <a className="py-2 px-3 border-b-2 border-transparent">Home</a>
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/for-ibo">
                <a className="py-2 px-3 border-b-2 border-transparent">
                  For IBO
                </a>
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/for-owners">
                <a className="py-2 px-3 border-b-2 border-transparent">
                  For Owners
                </a>
              </Link>
            </li>
            <li className="mx-2">
              <Link href="/list-property">
                <a className="py-2 px-3 border-b-2 border-transparent">
                  List Property
                </a>
              </Link>
            </li>
          </ul>
          <div className="flex ml-5">
            <Link href="signup">
              <a
                className="py-1 px-4 rounded-md text-white"
                style={{ backgroundColor: "#7b4a9c" }}
              >
                Signup
              </a>
            </Link>
            <Link href="login">
              <a
                className="py-1 px-4 rounded-md text-white ml-2"
                style={{ backgroundColor: "#0179ae" }}
              >
                Login
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
