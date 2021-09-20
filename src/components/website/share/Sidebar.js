import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar({ name }) {
  const router = useRouter();

  const links = [
    {
      label: "Dashboard",
      href: "/tenant/dashboard",
      icon: (
        <img
          src="/icons/user-dashboard/dashboardicon.png"
          alt="dashboard"
          className="object-contain w-5 h-5"
        />
      ),
    },
    {
      label: "Profile",
      href: "/",
      icon: (
        <img
          src="/icons/user-dashboard/profile_icon.png"
          alt="profile"
          className="object-contain w-5 h-5"
        />
      ),
    },
    {
      label: "Properties",
      href: "/",
      icon: (
        <img
          src="/icons/user-dashboard/icon3.png"
          alt="properties"
          className="object-contain w-5 h-5"
        />
      ),
    },
    {
      label: "Wallet",
      href: "/",
      icon: (
        <img
          src="/icons/user-dashboard/wallet_icon.png"
          alt="wallet"
          className="object-contain w-5 h-5"
        />
      ),
    },
    {
      label: "Payment",
      href: "/",
      icon: (
        <img
          src="/icons/user-dashboard/money_icon.png"
          alt="payment"
          className="object-contain w-5 h-5"
        />
      ),
    },
    {
      label: "Complain Management",
      href: "/",
      icon: (
        <img
          src="/icons/user-dashboard/icon4_grey.png"
          alt="complain"
          className="object-contain w-5 h-5"
        />
      ),
    },
    {
      label: "Notification",
      href: "/",
      icon: (
        <img
          src="/icons/user-dashboard/notification_icon5.png"
          alt="notification"
          className="object-contain w-5 h-5"
        />
      ),
    },
  ];

  return (
    <div className="flex flex-col w-56 h-screen z-40">
      {/**logo */}
      <div>
        <Link
          href={`/${
            name?.toLowerCase() === "user" ? "tenant" : name?.toLowerCase()
          }/dashboard`}
        >
          <a className="flex items-center py-2 px-4 bg-white">
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
      {/**dashboard name */}
      <div
        className="p-2 text-gray-100 text-center uppercase text-xs"
        style={{ backgroundColor: "var(--blue)", fontFamily: "Opensans-bold" }}
      >{`${name} dashboard`}</div>
      {/**render navigation */}
      <nav className="">
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
                    {link?.icon} <span className="ml-2">{link?.label}</span>
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
