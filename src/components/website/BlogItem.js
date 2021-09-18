import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

function BlogItem() {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden border-2 border-gray-300 rounded-md w-60 m-2">
      <div className="w-60 mb-2">
        <img
          src="https://i.pinimg.com/originals/ea/e1/a8/eae1a803b3f10b213686fb67a0aa2743.jpg"
          alt="blog1"
        />
      </div>
      <h6
        className="text-gray-900 font-bold uppercase text-center"
        style={{ fontFamily: "Opensans-bold" }}
      >
        APK Title goes here
      </h6>
      <p
        className="text-gray-500 text-center leading-4"
        style={{ fontFamily: "Opensans-regular" }}
      >
        This is a sample content of blog with some content.
      </p>
      <Link href="/">
        <a
          className="uppercase my-2 font-bold flex items-center"
          style={{ color: "#7b4a9c", fontFamily: "Opensans-semi-bold" }}
        >
          Read More{" "}
          <img src="/icons/home/side_arrow.png" className="ml-2" alt="arrow" />
        </a>
      </Link>
    </div>
  );
}

export default BlogItem;
