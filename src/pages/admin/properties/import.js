import React from "react";
import Link from "next/link";
import Head from "next/head";
import { toast, ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import Loader from "../../../components/loader";
import SectionTitle from "../../../components/section-title";
import { bulkImport } from "../../../lib/properties";
import { exportLandlord } from "../../../lib/landlords";

const AddProperty = () => {
  return (
    <div className="flex items-center">
      <Link href="/admin/properties">
        <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
          All Properties
        </a>
      </Link>
    </div>
  );
};

function Import() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.bulkimport);
    const res = await bulkImport(formdata);
    if (res?.status) {
      toast.success(res?.message);
      document.forms.bulkimport.reset();
      setIsLoading(false);
    } else {
      toast.error(res?.message);
      setIsLoading(false);
    }
  };

  const downloadLandlords = async () => {
    setIsLoading(true);
    const res = await exportLandlord();
    if (res?.status) {
      toast.success("File downloaded successfully.");
      window.open(res?.url);
      setIsLoading(false);
    } else {
      toast.error(res?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Import Properties | Rent a Roof</title>
      </Head>
      <ToastContainer />
      <ReactTooltip />
      {isLoading && <Loader />}
      <SectionTitle
        title="Import Properties"
        subtitle="Bulk Import"
        right={<AddProperty />}
      />
      <div className="bg-white dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          name="bulkimport"
        >
          <div className="form-element">
            <label className="form-label">
              Select File (data must in format you downloaded)
            </label>
            <input type="file" className="form-input" name="import_file" />
          </div>
          <p className="mt-5">
            Download import file format 👉{" "}
            <a
              href="/property_bulk_upload_format.xlsx"
              className="text-blue-500"
              download={true}
            >
              Download
            </a>
          </p>
          <p>
            Download landlords list 👉{" "}
            <a onClick={downloadLandlords} className="text-blue-500">
              Download
            </a>
          </p>
          <p className="text-red-500">
            <b>Note: </b>
            <i>Available from must be a date string in YYYY-MM-DD format.</i>
          </p>
          <p className="text-red-500">
            <b>Note: </b>
            <i>Use landlord list to insert landlord_id.</i>
          </p>
          <div className="mt-5">
            <button className="px-5 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-400">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Import;
