import React from "react";
import { toast } from "react-toastify";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import {
  getTransactions,
  getUpcomingPayments,
  getUserReferrals,
} from "../../../../lib/frontend/share";
import Card from "../../Card";
import moment from "moment";
import { FaList, FaPiggyBank } from "react-icons/fa";

function PaymentUI() {
  const [user, setUser] = React.useState(false);
  const [referrals, setReferrals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [points, setPoints] = React.useState(0);
  const [tab, setTab] = React.useState("history");
  const [totalPaid, setTotalPaid] = React.useState(0);
  const [totalPending, setTotalPending] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);
  const [upcomings, setUpcomings] = React.useState([]);

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
    const res = await getTransactions("landlord");
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

      <div className="relative bg-lightBlue-600 pb-8">
        <div className="mx-auto w-full">
          <div>
            <div className="flex flex-wrap">
              <Card
                color="green"
                label="Transaction History"
                icon={<FaList />}
                onClick={() => setTab("history")}
                current={tab}
                state="history"
              />
              <Card
                color="red"
                label="Wallet/ RAR Points"
                icon={<FaPiggyBank />}
                onClick={() => setTab("points")}
                current={tab}
                state="points"
              />
              <Card
                color="yellow"
                label="Upcoming Rent Payments"
                icon={<FaList />}
                onClick={() => setTab("rent")}
                current={tab}
                state="rent"
              />
            </div>
          </div>
        </div>
      </div>

      {tab === "history" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Transaction History</span>
          </p>
          <div className="mt-5 p-4  overflow-x-auto flex flex-col">
            <table className="table table-auto">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client</th>
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
                      className={`${
                        r?.status === "paid" ? "bg-green-50" : "bg-red-50"
                      }`}
                      style={{ fontFamily: "Opensans-regular" }}
                    >
                      <td>{i + 1}</td>
                      <td>{r?.user_name}</td>
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
                    <td colSpan={6} className="text-red-500">
                      No transactions found!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "points" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Wallet/RAR Points</span>
          </p>
          <div className="mt-5 p-4">
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
        </div>
      )}

      {tab === "rent" && (
        <div className="bg-white rounded-md mx-4 overflow-hidden overflow-y-auto">
          <p
            className="flex items-center justify-between bg-gray-50 p-4"
            style={{ fontFamily: "Opensans-semi-bold" }}
          >
            <span>Upcoming Rent Payments</span>
          </p>
          <div className="flex flex-col mt-5 p-4">
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
        </div>
      )}
    </>
  );
}

export default PaymentUI;
