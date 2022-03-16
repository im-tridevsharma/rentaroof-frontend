import React from "react";
import Loader from "../../../loader";
import {
  createPaymentOrder,
  getAgreements,
  successPayment,
} from "../../../../lib/frontend/share";
import moment from "moment";
import { FcOvertime } from "react-icons/fc";
import Router from "next/router";
import ReactTooltip from "react-tooltip";
import { __d } from "../../../../server";
import { useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";
import { FaQuestionCircle } from "react-icons/fa";

function AgreementUI() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [agreements, setAgreements] = React.useState([]);
  const [focus, setFocus] = React.useState(false);
  const [profile, setProfile] = React.useState(false);

  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async (data, first = false) => {
    setIsLoading(true);
    const postdata = {
      amount: first
        ? data?.first_payment != 0
          ? data?.first_payment
          : data?.payment_amount
        : data?.payment_amount,
      type: "rent",
      type_id: data.id,
      message:
        "Payment of rent for month " +
        moment(data.next_due).format("DD-MM-YYYY") +
        " by user " +
        profile?.fullname,
    };
    const res = await createPaymentOrder(postdata);
    if (res?.status) {
      setIsLoading(false);
      const paymentObject = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZOR_KEY,
        currency: res?.data?.currency,
        amount: res?.data?.amount * 100,
        name: "Rent A Roof",
        description: "Pay your first renting amount.",
        order_id: res?.data?.order_number,
        image: website?.logo,
        handler: async function (response) {
          setIsLoading(true);
          const res = await successPayment(response);
          if (res?.status) {
            setAgreements(
              agreements.map((a) =>
                a.id === res?.type.id
                  ? { ...a, next_due: res?.type?.next_due }
                  : a
              )
            );
            toast.success("Payment done successfully.");
            setIsLoading(false);
          } else {
            toast.error(res?.message || res?.error);
            setIsLoading(false);
          }
        },
        prefill: {
          name: profile?.fullname,
          email: profile?.email,
          contact: profile?.mobile,
        },
      });
      paymentObject.open();
    } else {
      toast.error(res?.error || res?.message);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setProfile(u);
    }

    loadScript("https://checkout.razorpay.com/v1/checkout.js");
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
                <img
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
                <div className="my-1">
                  {moment(p?.start_date).add(1, "M").format("MM-YYYY") ===
                    moment(p?.next_due).format("MM-YYYY") && (
                    <button
                      onClick={() => displayRazorpay(p, true)}
                      className="p-2 text-white rounded-md bg-green-400 mr-4"
                    >
                      Make First Payment{" "}
                      {`(Rs. ${
                        p?.first_payment != 0
                          ? p?.first_payment
                          : p?.payment_amount
                      })`}
                      {p?.first_payment != 0 && (
                        <FaQuestionCircle
                          className="ml-2 inline"
                          data-tip={`Advance Payment : Rs. ${p?.advance_amount}
                           + Security Deposit: Rs. ${p?.security_amount}
                           + Services Charges: Rs. ${p?.fee_amount}
                           + Monthly Payment: Rs. ${p?.payment_amount} `}
                        />
                      )}
                      <ReactTooltip />
                    </button>
                  )}

                  {moment(p?.start_date).add(1, "M").format("MM-YYYY") !==
                    moment(p?.next_due).format("MM-YYYY") && (
                    <button
                      onClick={() => displayRazorpay(p)}
                      className="p-2 text-white rounded-md bg-green-400 mr-4"
                    >
                      Pay for {moment(p?.next_due).format("DD-MM-YYYY")}{" "}
                      {`(Rs. ${p?.payment_amount})`}
                    </button>
                  )}
                  <a
                    href={p?.agreement_url}
                    target="_blank"
                    className="p-2 text-white rounded-md"
                    style={{ backgroundColor: "var(--blue)" }}
                  >
                    View Agreement
                  </a>
                </div>
                <p className="text-gray-500 text-xs mt-2">
                  {p?.description?.length > 80
                    ? p?.description.substring(0, 80) + "..."
                    : p?.description}
                </p>
                <p className="text-gray-500 mt-1 flex items-center">
                  <FcOvertime className="mr-1 text-2xl" />{" "}
                  {moment(p?.start_date).format("DD-MM-YYYY")}{" "}
                  <span className="mx-2">to</span>
                  {moment(p?.end_date).format("DD-MM-YYYY")}
                  <span
                    className="ml-2 capitalize"
                    data-tip="Payment Frequency"
                  >
                    {" "}
                    | {p?.payment_frequency}
                  </span>
                  <span className="ml-1 capitalize" data-tip="Next Due">
                    | {moment(p?.next_due).format("DD-MM-YYYY")}
                  </span>
                  <ReactTooltip />
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
