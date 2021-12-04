import React, { useState } from "react";
import {
  closeProperty,
  getAgreements,
  getPropertyRentTransactions,
  openProperty,
} from "../../../../lib/frontend/share";
import TenantCard from "../../TenantCard";
import Loader from "../../../loader";
import { FaTimes } from "react-icons/fa";
import moment from "moment";

function TenantUI() {
  const [property, setProperty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreements, setAgreements] = useState([]);
  const [rentTxn, setRentTxn] = useState([]);
  const [showTxn, setShowTxn] = useState(false);

  React.useEffect(() => {
    const fetchAgreements = async () => {
      setIsLoading(true);
      const response = await getAgreements();
      if (response?.status) {
        setIsLoading(false);
        setAgreements(response?.data);
      } else {
        console.error(response?.error || response?.message);
        setIsLoading(false);
      }
    };

    fetchAgreements();
  }, []);

  React.useEffect(() => {
    const fetchPropertiesRentTxn = async () => {
      if (property) {
        setIsLoading(true);
        const res = await getPropertyRentTransactions(property?.property_code);
        if (res?.status) {
          setRentTxn(res?.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.error(res?.message);
        }
      }
    };

    fetchPropertiesRentTxn();
  }, [property]);

  const markClosed = async (code) => {
    if (code) {
      setIsLoading(true);
      const res = await closeProperty(code);
      if (res?.status) {
        setProperty(res?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error(res?.message);
      }
    }
  };

  const markOpened = async (code) => {
    if (code) {
      setIsLoading(true);
      const res = await openProperty(code);
      if (res?.status) {
        setProperty(res?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        console.error(res?.message);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**property details */}
        {property && (
          <div className="flex bg-white border-2 border-gray-200 rounded-md p-2">
            <div className=" max-h-48 max-w-xs overflow-hidden ">
              <img
                src={property?.front_image || "/images/website/no_photo.png"}
                alt="property"
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            {/**details */}
            <div className="flex flex-col ml-3 w-full">
              <p
                style={{ fontFamily: "Opensans-bold" }}
                className="flex items-center justify-between"
              >
                Property Details
                {rentTxn?.length > 0 && (
                  <div>
                    {!property?.is_closed ? (
                      <button
                        onClick={() => markClosed(property?.property_code)}
                        className="px-2 py-1 rounded-md bg-red-500 text-white"
                      >
                        Mark Closed
                      </button>
                    ) : (
                      <button
                        onClick={() => markOpened(property?.property_code)}
                        className="px-2 py-1 rounded-md bg-green-500 text-white"
                      >
                        Mark Open
                      </button>
                    )}
                    <button
                      onClick={() => setShowTxn(true)}
                      className="px-2 py-1 rounded-md bg-green-500 text-white ml-3"
                    >
                      Show Transactions
                    </button>
                  </div>
                )}
              </p>
              <div
                className="text-gray-500 leading-4 mt-3"
                style={{ fontFamily: "Opensans-regular" }}
              >
                <p>{property?.name}</p>
                <p>
                  {property?.city_name}, {property?.state_name},
                  {property?.country_name}
                </p>
              </div>
              <div
                className="flex items-center mt-3"
                style={{ fontFamily: "Opensans-semi-bold" }}
              >
                <p className="flex items-center mr-5">
                  <img
                    src="/icons/owner_dashboard/icon4.jpg"
                    alt="bed"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  <span>{property?.bedrooms} Bedrooms</span>
                </p>
                <p className="flex items-center mr-5">
                  <img
                    src="/icons/owner_dashboard/icon5.png"
                    alt="bath"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  <span>{property?.bathrooms} Bathrooms</span>
                </p>
                <p className="flex items-center">
                  <img
                    src="/icons/owner_dashboard/icon6.png"
                    alt="floor"
                    className="w-5 h-5 object-contain mr-2"
                  />
                  <span>{property?.floors} Floors</span>
                </p>
              </div>
              {/**additional information */}
              <div
                className="pt-3 border-gray-300 mt-5"
                style={{ borderTopWidth: "1px" }}
              >
                <p className="mt-2" style={{ fontFamily: "Opensans-bold" }}>
                  Additional Info
                </p>
                <div className="flex items-center">
                  <p
                    className="mr-3 border-gray-400 pr-3"
                    style={{ borderRightWidth: "1px" }}
                  >
                    <span style={{ fontFamily: "Opensans-bold" }}>1 </span>
                    Tenants
                  </p>
                  <p
                    className="mr-3 border-gray-400 pr-3"
                    style={{ borderRightWidth: "1px" }}
                  >
                    <span
                      style={{ fontFamily: "Opensans-bold" }}
                      className="mr-1"
                    >
                      Rs.{property?.monthly_rent}
                    </span>
                    Monthly collection
                  </p>
                  <p className="mr-3 border-gray-400 pr-3">
                    <span
                      style={{ fontFamily: "Opensans-bold" }}
                      className="mr-1"
                    >
                      Rs.{property?.maintenence_charge}
                    </span>
                    Maintenance
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {/**tenants */}
        <p
          className="py-3 mt-5 text-lg"
          style={{ fontFamily: "Opensans-bold" }}
        >
          All Tenants
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {agreements?.length > 0 ? (
            agreements.map((a, i) => (
              <TenantCard
                a={a}
                key={i}
                info={() => setProperty(a?.property_data)}
              />
            ))
          ) : (
            <p>No tenants found!</p>
          )}
        </div>
      </div>

      {showTxn && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-40 p-3">
          <h4
            style={{ fontFamily: "Opensans-bold" }}
            className="flex items-center justify-between"
          >
            Rent Transactions
            <FaTimes
              className="text-red-500 cursor-pointer"
              onClick={() => setShowTxn(false)}
            />
          </h4>

          <div className="mt-3">
            <table className="table table-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Amount</th>
                  <th>Paid</th>
                  <th>Pending</th>
                  <th>Type</th>
                  <th>Order ID</th>
                  <th>Payment ID</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {rentTxn?.length > 0 &&
                  rentTxn.map((r, i) => (
                    <tr
                      key={i}
                      className={`${
                        r?.status === "paid" ? "bg-green-50" : "bg-red-50"
                      }`}
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      <td>{i + 1}</td>
                      <td>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(r?.amount)}
                      </td>
                      <td>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(r?.paid)}
                      </td>
                      <td>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(r?.pending)}
                      </td>
                      <td className="capitalize">{r?.type}</td>
                      <td>{r?.order_number}</td>
                      <td>{r?.txn_number}</td>
                      <td className="capitalize">{r?.status}</td>
                      <td>{moment(r?.created_at).format("DD-MM-YYYY")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

export default TenantUI;
