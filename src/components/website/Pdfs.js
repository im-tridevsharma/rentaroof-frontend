import React from "react";
import Link from "next/link";

export default function Pdfs({ bgcolor, pdfs, title }) {
  return (
    <div className="flex flex-col rounded overflow-hidden mt-5 w-full">
      <div
        className="px-3 py-2 text-white flex items-center justify-between"
        style={{ backgroundColor: bgcolor }}
      >
        <p className="uppercase" style={{ fontFamily: "Opensans-semi-bold" }}>
          {title}
        </p>
        <Link href="/">
          <a
            style={{ fontFamily: "Opensans-semi-bold" }}
            className="inline-block capitalize text-2xs"
          >
            Learn More{" "}
            <img
              src="/icons/ibo_icons/icon18.png"
              alt="arrow"
              className="inline w-2 h-2 object-contain"
            />
          </a>
        </Link>
      </div>
      <div className="flex flex-col px-2 max-h-80 h-full overflow-x-hidden overscroll-auto">
        {pdfs?.length > 0 ? (
          pdfs.map((pdf, i) => (
            <div className="flex my-2 items-center" key={i}>
              <img
                src="/icons/ibo_icons/icon19.png"
                className="w-8 h-8 object-contain"
                alt="pdf"
              />
              <p className="ml-2 flex-grow">{pdf.title}</p>
              <a href={pdf.pdf} download target="_blank" rel="noreferrer">
                <img
                  src="/icons/ibo_icons/icon17.png"
                  className="w-5 h-5 object-contain cursor-pointer"
                  alt="pdf"
                />
              </a>
            </div>
          ))
        ) : (
          <p className="text-red-500 py-3">No pdfs found!</p>
        )}
      </div>
    </div>
  );
}
