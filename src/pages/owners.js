import React from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/website/Footer";
import Header from "../components/website/Header";
import Carousel from "react-grid-carousel";
import { FaStar } from "react-icons/fa";

function Ibo() {
  return (
    <>
      <Header />
      <Head>
        <title>Owners</title>
        <meta name="title" content="Owners" />
        <meta name="keywords" content="About Owners, Our Star Owners" />
        <meta name="description" content="Our Owners" />
      </Head>
      <>
        <div className="flex flex-col max-w-6xl w-full m-auto my-10">
          {/**section 1 */}
          <div className="flex flex-col md:flex-row items-center">
            <div
              className="rounded-xl overflow-hidden relative w-128 h-64"
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage:
                  "url(https://www.baautorental.com/wp-content/uploads/2021/01/mcree-ford-staff.png)",
              }}
            ></div>
            <div className="flex-1 md:pl-10">
              <h4 className="mb-5">OWNERS AT RENT A ROOF</h4>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
          </div>
        </div>
        <div
          className="py-5 px-10 w-full"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          <h3 style={{fontFamily:"Opensans-bold"}} className="text-white my-5">Successful Owners Story</h3>
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/zLN1oFDlZvs?showinfo=0&rel=0&modestbranding=1&autohide=1&controls=0"
            title="Rent A Roof"
            className="rounded-2xl"
          ></iframe>
        </div>

        <div className="py-10 max-w-6xl w-full m-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 md:pr-10">
              <h4 className="mb-5">OWNERS AT RENT A ROOF</h4>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for 'lorem
                ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose (injected humour and the like).
              </p>
            </div>
            <div
              className="rounded-xl overflow-hidden relative w-128 h-64"
              style={{
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundImage:
                  "url(https://www.baautorental.com/wp-content/uploads/2021/01/mcree-ford-staff.png)",
              }}
            ></div>
          </div>
        </div>
      </>
      <Footer />
    </>
  );
}

export default Ibo;
