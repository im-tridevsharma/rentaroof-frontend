import React, { useEffect, useState } from "react";
import VideoItem from "../../VideoItem";
import Pdfs from "../../Pdfs";
import getVideos, {
  getPdfs,
} from "../../../../lib/frontend/training_management";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import { MdClose } from "react-icons/md";
import ReactTooltip from "react-tooltip";

function HowToUseUI() {
  const [videos, setVideos] = useState([]);
  const [globalPdf, setGlobalPdf] = useState([]);
  const [personalPdf, setPersonalPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");

  useEffect(() => {
    let id = "";
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      id = data.id;
    }
    setIsLoading(true);
    (async () => {
      const response = await getVideos(id);
      const pdfs = await getPdfs(id);

      if (response?.status) {
        setVideos(response.data);
      }
      if (pdfs?.status) {
        setGlobalPdf(pdfs.data.global);
        setPersonalPdf(pdfs.data.persoanl);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {/**video player */}
      {selectedVideo && (
        <div className="absolute max-h-128 object-contain max-w-lg w-full h-full">
          <span
            onClick={() => setSelectedVideo("")}
            className="absolute -right-3 -top-3 w-10 z-30 shadow-sm h-10 cursor-pointer bg-white rounded-full flex items-center justify-center"
            data-tip="Close"
          >
            <MdClose className="text-red-500 text-lg" />
            <ReactTooltip />
          </span>
          <video
            src={selectedVideo}
            controls
            autoPlay={true}
            width="100%"
            height="100%"
          ></video>
        </div>
      )}
      <div className="flex flex-col justify-center">
        {/**videos */}
        <h6
          className=" text-gray-800"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          How to Use Videos
        </h6>
        <div className="mt-3 block">
          {videos?.length > 0 ? (
            videos.map((v, i) => (
              <VideoItem key={i} video={v} onClick={setSelectedVideo} />
            ))
          ) : (
            <p className="text-red-500 py-2">No videos found!</p>
          )}
        </div>
        {/**pdf files */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2 mt-5">
          <Pdfs
            bgcolor="var(--blue)"
            pdfs={globalPdf}
            title="How to Use Pdf (global)"
          />
          <Pdfs
            bgcolor="var(--orange)"
            pdfs={personalPdf}
            title="How to Use Pdf (personal)"
          />
        </div>
      </div>
    </>
  );
}

export default HowToUseUI;
