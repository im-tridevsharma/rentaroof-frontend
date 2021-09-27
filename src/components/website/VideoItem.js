import React from "react";
import Link from "next/link";

function VideoItem() {
  return (
    <div
      className="p-2 bg-white w-56 mx-1 mb-2 shadow-sm border-gray-200 rounded overflow-hidden float-left"
      style={{ borderWidth: "1px" }}
    >
      <img
        src="https://image.shutterstock.com/image-vector/fitness-gym-training-video-thumbnail-260nw-2000301614.jpg"
        alt="cover"
        style={{
          maxWidth: "240px",
          width: "100%",
          height: "144px",
        }}
      />
      <div className="mt-2 text-center w-52">
        <p className="text-lg" style={{ fontFamily: "Opensans-semi-bold" }}>
          Basic Step to follow
        </p>
        <p className="text-xs text-gray-600">
          Some description about your video goes here.
        </p>
        <Link href="/">
          <a
            style={{ color: "var(--blue)", fontFamily: "Opensans-semi-bold" }}
            className="mt-1 inline-block "
          >
            Learn More{" "}
            <img
              src="/icons/ibo_icons/icon16.png"
              alt="arrow"
              className="inline w-2 h-2 object-contain"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default VideoItem;
