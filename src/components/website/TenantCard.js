import React from "react";
import { getPoliceVerification } from "../../lib/frontend/share";
import Loader from "../loader";
import { toast } from "react-toastify";
import { FaEye, FaFileDownload } from "react-icons/fa";

function TenantCard({ a, info }) {
  const [purl, setPurl] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const policeVerification = async () => {
    setIsLoading(true);
    const res = await getPoliceVerification(a?.id);
    if (res) {
      setPurl(res);
      setIsLoading(false);
    } else {
      toast.error("Something went wrong!");
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div
        style={{ fontFamily: "Opensans-regular" }}
        className="flex flex-col items-center justify-center m-1 bg-white p-4 border-2 border-gray-200 rounded-md"
      >
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img
            src={a?.tenant?.profile_pic || "/images/website/no_photo.png"}
            alt="user"
          />
        </div>
        <p
          className="mt-2"
          style={{ fontFamily: "Opensans-semi-bold", fontSize: "1rem" }}
        >
          {a?.tenant?.first}
        </p>
        <p
          className="text-2xs mt-1 mb-4 font-semibold"
          style={{ color: "var(--blue)" }}
        >
          {a?.tenant?.email}
        </p>
        <p className="text-center text-xs text-gray-500">{a?.description}</p>

        <button
          onClick={info}
          className="px-5 py-1 rounded-full my-3 bg-yellow-400 hover:bg-yellow-500"
        >
          View Rental Details
        </button>

        <div
          className="mt-2 flex items-center justify-between w-full"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          <div className="border-t">
            <p>Agreement Details</p>

            <div className="text-white flex items-center justify-center mt-3">
              <a
                href={a?.agreement_url}
                className="p-3 rounded-md bg-blue-500"
                target="_blank"
              >
                <FaEye />
              </a>
              <a
                href={a?.agreement_url}
                className="p-3 ml-3 rounded-md bg-blue-500"
                download
                target="_blank"
              >
                <FaFileDownload />
              </a>
            </div>
          </div>
          {purl || a?.police_verification ? (
            <div className="border-t">
              <p>Police Verification</p>
              <div className="text-white flex items-center justify-center mt-3">
                <a
                  href={a?.police_verification || purl}
                  className="p-3 rounded-md bg-red-500"
                  target="_blank"
                >
                  <FaEye />
                </a>
                <a
                  href={a?.police_verification || purl}
                  className="p-3 ml-3 rounded-md bg-red-500"
                  download
                  target="_blank"
                >
                  <FaFileDownload />
                </a>
              </div>
            </div>
          ) : (
            <div className="border-t">
              <p>Police Verification</p>
              <button
                onClick={policeVerification}
                className="p-2 mt-3 rounded-md text-white bg-red-500"
              >
                Generate
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TenantCard;
