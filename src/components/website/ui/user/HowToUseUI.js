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
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import ReactTooltip from "react-tooltip";

function HowToUseUI() {
  const [videos, setVideos] = useState([]);
  const [personalPdf, setPersonalPdf] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [openFaq, setOpenFaq] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      setIsLoading(true);
      (async () => {
        const response = await getVideos(data.id);
        const pdfs = await getPdfs(data.id);
        const res = await getFaqs();

        if (response?.status) {
          setVideos(response.data);
        }

        if (res?.status) {
          setFaqs(res?.data);
        }

        if (pdfs?.status) {
          setPersonalPdf(pdfs.data);
          setIsLoading(false);
        }
      })();
    }
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
      <div className="flex flex-col justify-center px-4">
        {/**videos */}
        <h6
          className=" text-white"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          How to Use Videos
        </h6>
        <div className="mt-3 block bg-white p-3 rounded-md">
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
          <div className="flex flex-col rounded overflow-hidden mt-5 w-full">
            <div className="py-2 text-white flex items-center justify-between">
              <h6
                className="uppercase"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                FAQs
              </h6>
            </div>
            <div className="flex flex-col bg-white rounded-md px-2 max-h-80 h-full overflow-x-hidden overscroll-auto">
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
                <p className="text-red-400 p-3">No FAQs found!</p>
              )}
            </div>
          </div>
          <Pdfs
            bgcolor="var(--orange)"
            pdfs={personalPdf}
            title="How to Use Pdf"
          />
        </div>
      </div>
    </>
  );
}

export default HowToUseUI;
