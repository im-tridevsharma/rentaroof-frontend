import React, { useEffect, useState } from "react";
import VideoItem from "../../VideoItem";
import Pdfs from "../../Pdfs";
import getVideos, {
  getFaqs,
  getPdfs,
} from "../../../../lib/frontend/training_management";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import { MdClose } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import {
  FaCaretDown,
  FaCaretUp,
  FaFilePdf,
  FaUserCheck,
  FaVideo,
} from "react-icons/fa";
import Card from "../../Card";

function TrainingManagementUI() {
  const [videos, setVideos] = useState([]);
  const [personalPdf, setPersonalPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [openFaq, setOpenFaq] = useState(false);
  const [tab, setTab] = useState("videos");

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
      const res = await getFaqs();

      if (response?.status) {
        setVideos(response.data);
      }

      if (res?.status) {
        setFaqs(res?.data);
      }

      if (response?.status) {
        setVideos(response.data);
      }
      if (pdfs?.status) {
        setPersonalPdf(pdfs.data);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      {isLoading && <Loader />}

      <div className="relative bg-lightBlue-600 pb-8">
        <div className="mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <Card
                color="green"
                label="Web/App Demo"
                icon={<FaVideo />}
                onClick={() => setTab("videos")}
                current={tab}
                value={videos.length}
                state="videos"
              />
              <Card
                color="yellow"
                label="PDF Guidelines"
                icon={<FaFilePdf />}
                onClick={() => setTab("pdf")}
                current={tab}
                value={personalPdf.length}
                state="pdf"
              />

              <Card
                color="red"
                label="FAQS"
                icon={<FaUserCheck />}
                value={faqs.length}
                current={tab}
                onClick={() => setTab("faq")}
                state="faq"
              />
            </div>
          </div>
        </div>
      </div>
      {tab === "videos" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Web/App Demo</span>
          </p>
          <div className="mt-5 p-4">
            {videos?.length > 0 ? (
              videos.map((v, i) => (
                <VideoItem key={i} video={v} onClick={setSelectedVideo} />
              ))
            ) : (
              <p className="text-white py-2">No videos found!</p>
            )}
          </div>
        </div>
      )}

      {tab === "faq" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>FAQS</span>
          </p>
          <div className="mt-5 p-4">
            {faqs?.length > 0 ? (
              faqs.map((faq, i) => (
                <div key={i} className="py-3">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() =>
                      openFaq === faq.id
                        ? setOpenFaq(false)
                        : setOpenFaq(faq.id)
                    }
                  >
                    <p>{faq?.title}</p>
                    {openFaq !== faq.id ? <FaCaretDown /> : <FaCaretUp />}
                  </div>
                  {openFaq === faq?.id && (
                    <div
                      className="mt-5"
                      dangerouslySetInnerHTML={{ __html: faq?.faq }}
                    />
                  )}
                </div>
              ))
            ) : (
              <p className="text-white px-0 py-3">No FAQs found!</p>
            )}
          </div>
        </div>
      )}

      {tab === "pdf" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>PDF Guidelines</span>
          </p>
          <div className="mt-5 p-4">
            <Pdfs
              bgcolor="var(--orange)"
              pdfs={personalPdf}
              title="Training Pdf"
            />
          </div>
        </div>
      )}

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
    </>
  );
}

export default TrainingManagementUI;
