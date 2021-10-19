import React, { useEffect, useState } from "react";
import Link from "next/link";
import isAuthenticated from "../../lib/frontend/auth";
import { __d } from "../../server";

function Header() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const u = JSON.parse(__d(localStorage.getItem("LU")));
    setUser(u);
  }, []);

  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.removeItem("LU");
      localStorage.removeItem("LU");
    }
  }, []);

  return (
    <div className="flex flex-col">
      {/**header top part */}
      <div
        className="flex flex-col items-center sm:flex-row sm:justify-between px-5 py-3 text-white"
        style={{
          backgroundColor: "var(--primary-color)",
          fontFamily: "Opensans-regular",
        }}
      >
        {/**header top left */}
        <div className="flex flex-col items-center sm:flex-row sm:justify-between max-w-3xl w-full">
          <div className="flex items-center mb-1 sm:mb-0">
            <img src="/icons/home/email_icon.png" alt="mail" className="mr-1" />
            <span>contact@example.com</span>
          </div>
          <div className="flex items-center mb-1 sm:mb-0">
            <img src="/icons/home/phone_icon.png" alt="mail" className="mr-1" />
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
            <img src="/icons/home/twitter.png" alt="twitter" />
          </a>
          <a href="http://facebook.com" className="mx-2 hover:text-gray-300">
            <img
              src="/icons/home/fb.png"
              alt="facebook"
              className="object-contain h-4"
            />
          </a>
          <a href="http://instagram.com" className="mx-2 hover:text-gray-300">
            <img
              src="/icons/home/insta.png"
              alt="instagram"
              className="object-contain h-4"
            />
          </a>
          <a href="http://linkedin.com" className="mx-2 hover:text-gray-300">
            <img src="/icons/home/in.png" alt="linkedin" />
          </a>
          <a href="http://youtube.com" className="mx-2 hover:text-gray-300">
            <img src="/icons/home/youtube.png" alt="youtube" />
          </a>
        </div>
      </div>
      {/**header nav part */}
      <div className="px-5 py-2 bg-white flex flex-col sm:flex-row items-center sm:justify-between">
        {/**logo */}
        <div>
          <Link href="/">
            <a
              className="flex items-center bg-white"
              style={{ height: "52px" }}
            >
              <img
                src="/logos/logo-icon.png"
                alt="logo"
                className="h-8 object-contain"
              />

              <p
                className="uppercase text-xl mt-2"
                style={{ fontFamily: "Opensans-bold" }}
              >
                <span style={{ color: "var(--blue)" }}>Rent a</span>
                <span style={{ color: "var(--orange)" }}> Roof</span>
              </p>
            </a>
          </Link>
        </div>
        {/**navigation */}
        <div
          className="flex items-center flex-col sm:flex-row"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          <ul className="hidden sm:flex sm:items-center">
            <li className="mx-2">
              <Link href="/">
                <a className="py-2 px-3 border-b-2 border-transparent">Home</a>
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href={
                  user && user.role === "ibo"
                    ? `/ibo/dashboard`
                    : "/login?role=ibo"
                }
              >
                <a className="py-2 px-3 border-b-2 border-transparent">
                  For IBO
                </a>
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href={
                  user && user.role === "landlord"
                    ? `/landlord/dashboard`
                    : "/login?role=landlord"
                }
              >
                <a className="py-2 px-3 border-b-2 border-transparent">
                  For Owners
                </a>
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href={
                  user && user.role !== "tenant"
                    ? `/${user.role}/add-property`
                    : "/login"
                }
              >
                <a className="py-2 px-3 border-b-2 border-transparent">
                  List Property
                </a>
              </Link>
            </li>
          </ul>
          <div className="flex ml-5">
            {!isAuthenticated() ? (
              <>
                <Link href="/signup">
                  <a
                    className="py-1 px-4 rounded-md text-white"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    Signup
                  </a>
                </Link>
                <Link href="/login">
                  <a
                    className="py-1 px-4 rounded-md text-white ml-2"
                    style={{ backgroundColor: "var(--secondary-color)" }}
                  >
                    Login
                  </a>
                </Link>
              </>
            ) : (
              <Link href={`/${user?.role}/dashboard`}>
                <img
                  src={user?.profile_pic || "/images/website/no_photo.png"}
                  className="w-6 h-6 object-cover rounded-full cursor-pointer"
                  alt="user"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
