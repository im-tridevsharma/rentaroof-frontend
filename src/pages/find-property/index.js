import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "../../components/website/Header";
import Footer from "../../components/website/Footer";
import Breadcrumb from "../../components/website/Breadcrumb";
import { FiSearch } from "react-icons/fi";
import PropertyItem from "../../components/website/PropertyItem";

function Index() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(router.query.search);
  }, []);

  const tagline = `Listing property for your search "${search}"`;

  return (
    <>
      <Head>
        <title>Find Property for {search}</title>
      </Head>
      <Header />
      <Breadcrumb tagline={tagline} path="Home / property list / search" />
      <div className="flex flex-col-reverse sm:flex-row p-5">
        {/**property list */}
        <div className="flex flex-col max-w-2xl w-full">
          {/**refine search */}
          <div className="flex items-center mb-5">
            <h6
              className="font-bold text-sm"
              style={{ fontFamily: "Opensans-bold" }}
            >
              Refine Search
            </h6>
            <form
              name="refineSearch"
              method="POST"
              style={{
                borderBottomWidth: "1px",
                borderColor: "var(--primary-color)",
                fontFamily: "Opensans-regular",
              }}
              className="flex-1 flex px-3 ml-3"
            >
              <input
                type="text"
                name="search"
                placeholder="Country, City, Address, Postal Code or ID"
                className="border-none flex-1 h-7 focus:ring-0 px-0 text-gray-700 text-sm"
              />
              <button type="submit">
                <FiSearch />
              </button>
            </form>
          </div>
          {/**result count */}
          <p className="font-bold" style={{ fontFamily: "Opensans-bold" }}>
            983 Apartments for "{search}"
          </p>
          {/**properties */}
          <div className="flex flex-col mt-3 sm:max-h-128 h-full sm:overflow-hidden sm:overflow-y-auto">
            <PropertyItem />
            <PropertyItem />
            <PropertyItem />
            <PropertyItem />
            <PropertyItem />
          </div>
        </div>
        {/**map */}
        <div className="w-full px-5 mb-10 sm:mb-0">
          {/**some options */}
          <div className="flex items-center mb-5"></div>
          {/**map view */}
          <div className="w-full">
            <iframe
              title="Property on map"
              width="100%"
              className="h-60 sm:h-128"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=India&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            ></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Index;
