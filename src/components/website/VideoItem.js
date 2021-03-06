import React from "react";
import Link from "next/link";
import ReactTooltip from "react-tooltip";

function VideoItem({ video, onClick }) {
  return (
    <div
      className="p-2 bg-white w-56 mx-1 mb-2 shadow-sm border-gray-200 rounded overflow-hidden float-left"
      style={{ borderWidth: "1px" }}
    >
      <img
        src="/images/website/play.png"
        alt="cover"
        style={{
          maxWidth: "240px",
          width: "100%",
          height: "144px",
        }}
        className="cursor-pointer object-cover"
        onClick={() => onClick(video?.video)}
        data-tip="Play Video"
      />
      <ReactTooltip />
      <div className="mt-2 text-center w-52 h-20">
        <p className="text-lg" style={{ fontFamily: "Opensans-semi-bold" }}>
          {video?.title.length < 20
            ? video.title
            : video.title.substring(0, 20) + "..."}
        </p>
        <p className="text-xs text-gray-600">
          {video?.description.length < 50
            ? video.description
            : video.description.substring(0, 50) + "..."}
        </p>
        <Link href="/">
          <a
            style={{ fontFamily: "Opensans-semi-bold" }}
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
