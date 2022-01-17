import React from "react";
import Link from "next/link";

function BlogItem({data}) {
  return (
    <div className="flex flex-col items-center justify-center overflow-hidden border-2 border-gray-300 rounded-md w-60 m-2">
      <div className="w-60 mb-2">
        <img
          src={data?.cover_image || '/images/website/no_photo.png'}
          alt={data?.title || 'blog'}
        />
      </div>
      <h6
        className="text-gray-900 font-bold uppercase text-center"
        style={{ fontFamily: "Opensans-bold" }}
      >
       {data?.title}
      </h6>
      <p
        className="text-gray-500 text-center leading-4"
        style={{ fontFamily: "Opensans-regular" }}
      >
        {data?.sub_title}
      </p>
      <Link href={data?.slug || '/'}>
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
