import React, { useEffect, useState } from "react";
import VideoItem from "../../VideoItem";
import Pdfs from "../../Pdfs";
import getVideos from "../../../../lib/frontend/training_management";
import { __d } from "../../../../server";

function TrainingManagementUI() {
  const [globalPdf, setGlobalPdf] = useState([]);
  const [personalPdf, setPersonalPdf] = useState([]);

  useEffect(() => {
    let id = "";
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      id = data.id;
    }
    (async () => {
      const response = await getVideos(id);
      console.log(response);
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center">
      {/**videos */}
      <h6
        className=" text-gray-800"
        style={{ fontFamily: "Opensans-semi-bold" }}
      >
        Training Videos
      </h6>
      <div className="mt-3 block">
        <VideoItem />
        <VideoItem />
        <VideoItem />
        <VideoItem />
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
  );
}

export default TrainingManagementUI;
