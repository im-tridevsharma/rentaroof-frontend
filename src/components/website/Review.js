import React from "react";
import { AiFillStar } from "react-icons/ai";

function Review() {
  return (
    <div className="flex flex-col px-5 relative max-w-xl w-full">
      <div className="flex items-baseline justify-between">
        <div className="flex items-center">
          <img
            src="/icons/user-dashboard/man.png"
            alt="user"
            className="w-10 h-10 object-contain"
          />
          <p className="flex flex-col leading-5 ml-3">
            <b style={{ fontFamily: "Opensans-bold" }}>User Name</b>
            <span
              style={{ fontFamily: "Opensans-regular" }}
              className="text-gray-400 text-xs"
            >
              5m ago
            </span>
          </p>
        </div>
        <p className="flex">
          <AiFillStar color="orange" />
          <AiFillStar color="orange" />
          <AiFillStar className="text-gray-200" />
          <AiFillStar className="text-gray-200" />
          <AiFillStar className="text-gray-200" />
        </p>
      </div>
      <div className="">
        <p className="py-5 text-gray-400 text-2xs leading-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled.
        </p>
      </div>
    </div>
  );
}

export default Review;
