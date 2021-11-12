import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import SectionTitle from "../../../components/section-title";
import ViewProperties from "../../../components/properties/ViewProperties";
import UpdateProperty from "../../../components/properties/UpdateProperty";
import { getPropertyById } from "../../../lib/properties";
import Loader from "../../../components/loader";
import { toast, ToastContainer } from "react-toastify";

const AllAmenity = () => {
  return (
    <Link href="/admin/properties">
      <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
        All Properties
      </a>
    </Link>
  );
};

function Id({ id, view }) {
  const [mode, setMode] = useState("view");
  const [property, setProperty] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const a = view || "view";
    setMode(a);
    setIsLoading(true);
    (async () => {
      const response = await getPropertyById(id);
      if (response?.status) {
        setProperty(response.data);
        setIsLoading(false);
      } else {
        toast.error(response?.error || response?.message);
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <>
      <Head>
        <title>
          {mode === "view" ? "View Property" : "Update Property"} | Rent a Roof
        </title>
      </Head>
      {isLoading && <Loader />}
      <SectionTitle
        title="Properties"
        subtitle={mode === "view" ? "View Property - " : "Update Property - "}
        right={<AllAmenity />}
      />
      <div className="bg-white p-1 rounded-md border-2 border-gray-200 dark:bg-gray-700 dark:border-gray-600">
        {mode === "view" ? (
          <ViewProperties property={property} />
        ) : (
          <UpdateProperty property={property} />
        )}
      </div>
      <ToastContainer />
    </>
  );
}

Id.getInitialProps = ({ query }) => {
  return {
    id: query.id,
    view: query.a,
  };
};

export default Id;
