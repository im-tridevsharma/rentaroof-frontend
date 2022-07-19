import React from "react";
import Link from "next/link";
import ReactTooltip from "react-tooltip";

export default function Pdfs({ pdfs, title }) {
  return (
    <div className="flex flex-col rounded overflow-hidden mt-5 w-full">
      <div className="flex rounded-md flex-col max-h-80 h-full overflow-x-hidden overscroll-auto">
        {pdfs?.length > 0 ? (
          pdfs.map((pdf, i) => (
            <div className="flex my-2 items-center" key={i}>
              <img
                src="/icons/ibo_icons/icon19.png"
                className="w-8 h-8 object-contain"
                alt="pdf"
              />
              <p className="ml-2 flex-grow">{pdf.title}</p>
              <a
                href={pdf.pdf}
                download
                target="_blank"
                rel="noreferrer"
                data-tip="Download"
              >
                <img
                  src="/icons/ibo_icons/icon17.png"
                  className="w-5 h-5 object-contain cursor-pointer"
                  alt="pdf"
                />
                <ReactTooltip />
              </a>
            </div>
          ))
        ) : (
          <p className="text-red-400 py-3">No pdfs found!</p>
        )}
      </div>
    </div>
  );
}
