import React from "react";
import { toast } from "react-toastify";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import {
  createPaymentOrder,
  getTransactions,
  getUpcomingPayments,
  getUserReferrals,
  successPayment,
} from "../../../../lib/frontend/share";
import Card from "../../Card";
import moment from "moment";
import { shallowEqual, useSelector } from "react-redux";

function PaymentUI() {
  const [user, setUser] = React.useState(false);
  const [referrals, setReferrals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [points, setPoints] = React.useState(0);
  const [tab, setTab] = React.useState("point-history");
  const [totalPaid, setTotalPaid] = React.useState(0);
  const [totalPending, setTotalPending] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [upcomings, setUpcomings] = React.useState([]);

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

  const fetchUpcomings = async () => {
    setIsLoading(true);
    const res = await getUpcomingPayments();
    if (res?.status) {
      setUpcomings(res?.data);
      setIsLoading(false);
    } else {
      toast.error(res?.message);
      setIsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setIsLoading(true);
    const res = await getTransactions();
    if (res?.status) {
      setIsLoading(false);
      setTransactions(res?.data);
      const paid = res?.data.map((p) => (p?.status === "paid" ? p.paid : 0));
      const pending = res?.data.map((p) =>
        p?.status === "pending" ? p.pending : 0
      );
      setTotalPaid(paid.reduce((a, b) => parseFloat(a) + parseFloat(b), 0));
      setTotalPending(
        pending.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
      );
    } else {
      toast.error(res?.message || res?.error);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setUser(u);
    }

    const fetchReferrals = async () => {
      setIsLoading(true);
      const res = await getUserReferrals();
      if (res?.status) {
        setIsLoading(false);
        setReferrals(res?.data);
        setPoints(res?.data?.reduce((c, p) => c + parseFloat(p?.points), 0));
      } else {
        toast.error(res?.message || res?.error);
        setIsLoading(false);
      }
    };

    fetchReferrals();
    fetchTransactions();
    fetchUpcomings();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const displayRazorpay = async (payment) => {
    setIsLoading(true);
    const postdata = {
      amount: payment?.amount,
      type: payment?.type,
      type_id: payment?.type_id,
      message: payment?.message,
    };
    const res = await createPaymentOrder(postdata);
    if (res?.status) {
      setIsLoading(false);
      const paymentObject = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZOR_KEY,
        currency: res?.data?.currency,
        amount: res?.data?.amount * 100,
        name: "Rent A Roof",
        description: payment?.message,
        order_id: res?.data?.order_number,
        image: website?.logo,
        handler: async function (response) {
          setIsLoading(true);
          const res = await successPayment(response);
          if (res?.status) {
            fetchUpcomings();
            fetchTransactions();
            toast.success("Payment done successfully.");
            setIsLoading(false);
          } else {
            toast.error(res?.message || res?.error);
            setIsLoading(false);
          }
        },
        prefill: {
          name: user?.fullname,
          email: user?.email,
          contact: user?.mobile,
        },
      });
      paymentObject.open();
    } else {
      toast.error(res?.error || res?.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative md:w-full w-screen p-5 shadow-sm border-2 border-gray-200 bg-white rounded-md">
        {/**left line */}
        <span
          className="absolute left-0 w-1 top-1 rounded-lg"
          style={{ backgroundColor: "var(--blue)", height: "98%" }}
        ></span>

        <div className="grid grid-cols-1 space-y-3 md:grid-cols-3 md:space-x-3 md:space-y-0">
          <Card
            label="Total Points"
            icon={
              <img
                src="/icons/user-dashboard/redem.png"
                style={{ maxWidth: "32px", width: "32px", height: "32px" }}
                className="object-contain"
                alt="icon"
              />
            }
            count={points}
            color="white"
            textcolor="gray"
          />
          <Card
            label="Successful Payment"
            icon={
              <img
                src="/icons/user-dashboard/paid.png"
                style={{ maxWidth: "32px", width: "32px", height: "32px" }}
                className="object-contain"
                alt="icon"
              />
            }
            count={new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(totalPaid)}
            color="white"
            textcolor="rgb(6, 226, 209)"
          />
          <Card
            label="Pending Payment"
            icon={
              <img
                src="/icons/user-dashboard/paid.png"
                style={{ maxWidth: "32px", width: "32px", height: "32px" }}
                className="object-contain"
                alt="icon"
              />
            }
            count={new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(totalPending)}
            color="lightred"
            textcolor="#ff000080"
          />
        </div>

        <div
          className="flex items-center mt-5 md:w-full w-screen overflow-x-auto"
          style={{ fontFamily: "Opensans-bold" }}
        >
          <button
            className="py-2 border-b-2 mr-4"
            onClick={() => setTab("point-history")}
            style={{
              borderBottomColor:
                tab === "point-history" ? "var(--blue)" : "transparent",
            }}
          >
            Point History
          </button>
          <button
            className="py-2 border-b-2 mr-4"
            onClick={() => setTab("transactions")}
            style={{
              borderBottomColor:
                tab === "transactions" ? "var(--blue)" : "transparent",
            }}
          >
            Transactions
          </button>
          <button
            className="py-2 border-b-2 mr-4"
            onClick={() => setTab("upcoming")}
            style={{
              borderBottomColor:
                tab === "upcoming" ? "var(--blue)" : "transparent",
            }}
          >
            Upcoming Payments
          </button>
        </div>

        <div className="md:w-full w-screen overflow-x-auto">
          {tab === "point-history" && (
            <div className="flex flex-col mt-5">
              {referrals?.length > 0 ? (
                referrals.map((r, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3  mb-1 ${
                      r?.type === "credit" ? "bg-green-50" : "bg-red-50"
                    }`}
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    <div>
                      <h6
                        style={{ fontFamily: "Opensans-bold" }}
                        className="text-sm"
                      >
                        {r?.type === "credit"
                          ? "Points Credited"
                          : "Points Debited"}
                      </h6>
                      <p className="text-gray-700">{r?.title}</p>
                    </div>
                    <h2
                      className={`${
                        r.type === "credit" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {r?.points}
                    </h2>
                  </div>
                ))
              ) : (
                <p className="text-red-500 p-3">No points history found!</p>
              )}
            </div>
          )}
          {tab === "transactions" && (
            <div className="flex flex-col mt-5">
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
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.length > 0 ? (
                    transactions.map((r, i) => (
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
                        <td>{moment(r?.created_at).format("DD-MM-YYYY")}</td>
                        <td className="capitalize">{r?.status}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={10} className="text-red-500">
                        No transaction found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {tab === "upcoming" && (
            <div className="flex flex-col mt-5">
              <table className="table table-auto">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Due Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomings?.length > 0 ? (
                    upcomings.map((r, i) => (
                      <tr key={i} style={{ fontFamily: "Opensans-regular" }}>
                        <td>{i + 1}</td>
                        <td>
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(r?.amount)}
                        </td>
                        <td className="capitalize">{r?.type}</td>
                        <td>{moment(r?.next_due).format("DD-MM-YYYY")}</td>
                        <td className="capitalize">
                          <button
                            onClick={() => displayRazorpay(r)}
                            className="px-3 py-2 bg-green-500 rounded-md"
                          >
                            Pay
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-red-500">
                        No upcoming payments found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PaymentUI;
