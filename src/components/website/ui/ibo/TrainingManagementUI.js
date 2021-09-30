import React, { useEffect, useState } from "react";
import VideoItem from "../../VideoItem";
import Pdfs from "../../Pdfs";
import getVideos, {
  getPdfs
} from "../../../../lib/frontend/training_management";
import { __d } from "../../../../server";
import Loader from "../../../loader";

function TrainingManagementUI() {
  const [videos, setVideos] = useState([]);
  const [globalPdf, setGlobalPdf] = useState([]);
  const [personalPdf, setPersonalPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      <div className="flex flex-col justify-center">
        {/**videos */}
        <h6
          className=" text-gray-800"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          Training Videos
        </h6>
        <div className="mt-3 block">
          {videos?.length > 0 ? (
            videos.map((v, i) => <VideoItem key={i} video={v} />)
          ) : (
            <p className="text-red-500 py-2">No videos found!</p>
          )}
        </div>
        {/**pdf files */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:space-x-2 mt-5">
          <Pdfs
            bgcolor="var(--blue)"
            pdfs={globalPdf}
            title="Training Pdf (global)"
          />
          <Pdfs
            bgcolor="var(--orange)"
            pdfs={personalPdf}
            title="Training Pdf (personal)"
          />
        </div>
      </div>
    </>
  );
}

export default TrainingManagementUI;
