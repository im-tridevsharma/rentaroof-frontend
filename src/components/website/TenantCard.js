import React from "react";
import { getPoliceVerification } from "../../lib/frontend/share";
import Loader from "../loader";
import { toast } from "react-toastify";

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

  console.log(a);

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

        <button onClick={info}>More Info</button>

        <div
          className="mt-5 flex items-center justify-between w-full"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          <a
            href={a?.agreement_url}
            target="_blank"
            className="p-2 rounded-md text-white"
            style={{ backgroundColor: "var(--blue)" }}
          >
            Agreement Details
          </a>
          {purl || a?.police_verification ? (
            <a
              target="_blank"
              href={a?.police_verification || purl}
              className="p-2 rounded-md text-white bg-red-500"
            >
              Police Verification
            </a>
          ) : (
            <button
              onClick={policeVerification}
              className="p-2 rounded-md text-white bg-red-500"
            >
              Police Verification
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default TenantCard;
