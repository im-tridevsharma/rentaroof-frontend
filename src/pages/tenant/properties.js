import React from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import RenderError from "../../components/website/RenderError";
import UseAuthentication from "../../hooks/UseAuthentication";
import UIRenderer from "../../components/website/UIRenderer";
import Card from "../../components/website/Card";
import { BsStarFill } from "react-icons/bs";
import { MdClose } from "react-icons/md";

function Properties() {
  //authentication hook
  const { isAuthenticated } = UseAuthentication();

  const properties = [
    {
      img: (
        <Image
          src="/images/website/building.jpg"
          alt="property"
          layout="responsive"
          width="80"
          height="80"
        />
      ),
      title: "New Property-38BHK at Pune for 4500",
      description: "Property short description goes here.",
      posted_by: "James",
      rating: 3.5,
    },
    {
      img: (
        <Image
          src="/images/website/home-house.jpg"
          alt="property2"
          layout="responsive"
          width="80"
          height="80"
        />
      ),
      title: "New Property-3BHK at Mumbai for 4500",
      description: "Property short description goes here.",
      posted_by: "John",
      rating: 4.5,
    },
  ];

  const PropertiesUI = () => {
    return (
      <div className="flex flex-col">
        {/**cards */}
        <div className="grid grid-cols-1 space-y-3 md:grid-cols-3 md:space-x-3 md:space-y-0">
          <Card
            label="Visited Properties"
            icon={
              <img
                src="/icons/user-dashboard/user_icon5.png"
                style={{ maxWidth: "32px", width: "32px", height: "32px" }}
                className="object-contain"
                alt="icon"
              />
            }
            count="20"
            color="var(--orange)"
            textcolor="white"
          />
          <Card
            label="Saved Properties"
            icon={
              <img
                src="/icons/user-dashboard/icon5.png"
                style={{ maxWidth: "32px", width: "32px", height: "32px" }}
                className="object-contain"
                alt="icon"
              />
            }
            count="40"
            color="white"
            textcolor="gray"
          />
          <Card
            label="Favorite Properties"
            icon={
              <img
                src="/icons/user-dashboard/favorite.png"
                style={{ maxWidth: "32px", width: "32px", height: "32px" }}
                className="object-contain"
                alt="icon"
              />
            }
            count="10"
            color="white"
            textcolor="gray"
          />
        </div>

        {/**visited properties */}
        <div className="flex flex-col mt-5 p-5 bg-white rounded-md border-2 border-gray-200">
          <p
            className="flex items-center justify-between"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Visited Properties</span>
            <Link href="/">
              <a>Show All</a>
            </Link>
          </p>
          <div className="mt-5">
            {properties?.length > 0 &&
              properties.map((p, i) => (
                <div
                  className="relative border-gray-200 flex items-center justify-between py-2 pl-8 pr-2"
                  key={i}
                  style={{ borderTopWidth: "1px" }}
                >
                  <span className="p-1 rounded-md bg-gray-400 absolute top-2 left-0 cursor-pointer text-white">
                    <MdClose />
                  </span>
                  <div className="w-20 h-20 overflow-hidden rounded-md">
                    {p?.img}
                  </div>
                  <div
                    className="flex flex-col flex-grow px-5 leading-4"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    <h6
                      className="text-gray-800"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      {p?.title}
                    </h6>
                    <p className="text-gray-400">{p?.description}</p>
                    <span
                      className="font-bold"
                      style={{ color: "var(--orange)" }}
                    >
                      By {p?.posted_by}
                    </span>
                  </div>
                  <span className="flex items-center text-lg">
                    <span className="m-1" style={{ color: "var(--blue)" }}>
                      {p?.rating}
                    </span>
                    <BsStarFill color="orange" />
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return isAuthenticated ? (
    <>
      <Head>
        <title>Properties</title>
      </Head>
      <UIRenderer UI={PropertiesUI} role="User" page="Properties" />
    </>
  ) : (
    <RenderError error="Unauthenticated" auth={isAuthenticated} />
  );
}

export default Properties;
