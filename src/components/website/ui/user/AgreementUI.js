import React from "react";
import Image from "next/image";
import Loader from "../../../loader";
import { getAgreements } from "../../../../lib/frontend/share";
import moment from "moment";
import { FcOvertime } from "react-icons/fc";
import Router from "next/router";

function AgreementUI() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [agreements, setAgreements] = React.useState([]);
  const [focus, setFocus] = React.useState(false);

  React.useEffect(() => {
    setFocus(Router.query.a);
    const fetchAgreements = async () => {
      setIsLoading(true);
      const res = await getAgreements();
      if (res?.status) {
        setAgreements(res?.data);
        setIsLoading(false);
      } else {
        console.error(res?.error || res?.message);
        setIsLoading(false);
      }
    };

    fetchAgreements();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div>
        {agreements?.length > 0 ? (
          agreements.map((p, i) => (
            <div
              className={`relative border-gray-200 flex items-center justify-between p-2 ${
                focus == p?.id ? "bg-white border border-red-200" : "bg-white"
              }`}
              key={i}
              style={{ borderTopWidth: i !== 0 && "1px" }}
            >
              <div className="w-20 h-20 overflow-hidden rounded-md">
                <Image
                  src={
                    p?.property_data?.front_image ||
                    "/images/website/no_photo.png"
                  }
                  alt="property"
                  layout="responsive"
                  width="80"
                  height="80"
                />
              </div>
              <div
                className="flex flex-col flex-grow px-5 leading-4"
                style={{ fontFamily: "Opensans-regular" }}
              >
                <h6
                  className="text-gray-800"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  {p?.property_data?.property_code}
                </h6>
                <h6
                  className="text-gray-800"
                  style={{ fontFamily: "Opensans-bold" }}
                >
                  {p?.property_data?.name}
                </h6>
                <p className="text-gray-400">{p?.property_short_description}</p>
                <span className="font-bold" style={{ color: "var(--orange)" }}>
                  Landlord: {p?.landlord?.first} {p?.landlord?.last}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <a
                  href={p?.agreement_url}
                  target="_blank"
                  className="p-2 text-white rounded-md"
                  style={{ backgroundColor: "var(--blue)" }}
                >
                  View Agreement
                </a>
                <p className="text-gray-500 text-xs mt-1">
                  {p?.description?.length > 80
                    ? p?.description.substring(0, 80) + "..."
                    : p?.description}
                </p>
                <p className="text-gray-500 mt-1 flex items-center">
                  <FcOvertime className="mr-1 text-2xl" />{" "}
                  {moment(p?.start_date).format("DD-MM-YYYY")}{" "}
                  <span className="mx-2">to</span>
                  {moment(p?.end_date).format("DD-MM-YYYY")}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500 p-3">No agreements found!</p>
        )}
      </div>
    </>
  );
}

export default AgreementUI;
