import React, { useEffect, useState } from "react";
import WalletCard from "../../WalletCard";
import { FiPlus, FiSearch } from "react-icons/fi";
import Loader from "../../../loader";
import { toast } from "react-toastify";
import { __d } from "../../../../server";
import {
  createPaymentOrder,
  getWallet,
  getWalletTransactions,
  successPayment,
} from "../../../../lib/frontend/share";
import moment from "moment";
import { shallowEqual, useSelector } from "react-redux";

function WalletUI() {
  //authentication hook
  const [displayMode, setDisplayMode] = useState("topup");
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [amount, setAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [wallet, setWallet] = useState(false);
  const [monthTxn, setMonthTxn] = useState(0);

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

  useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setProfile(u);
    }

    const fetchWallet = async () => {
      setIsLoading(true);
      const res = await getWallet();
      if (res?.status) {
        setIsLoading(false);
        setWallet(res?.data);
      } else {
        setIsLoading(false);
        toast.error(res?.message || res?.error);
      }
    };

    const fetchWalletTransactions = async () => {
      setIsLoading(true);
      const res = await getWalletTransactions();
      if (res?.status) {
        setIsLoading(false);
        setTransactions(res?.data);
        setFilteredTransactions(res?.data);
        const thismonth = res?.data.map((d) => {
          if (
            moment(d.created_at).format("MM-YYYY") ===
            moment().format("MM-YYYY")
          ) {
            return d.amount;
          }
        });
        setMonthTxn(
          thismonth.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
        );
      } else {
        setIsLoading(false);
        toast.error(res?.message || res?.error);
      }
    };

    fetchWallet();
    fetchWalletTransactions();
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const handleTxnSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setFilteredTransactions(
      transactions.filter(
        (txn) =>
          txn.txn_number.includes(value) ||
          txn.order_number.includes(value) ||
          txn.status.includes(value)
      )
    );
  };

  const displayRazorpay = async (amount) => {
    setIsLoading(true);
    const postdata = {
      amount: amount,
      type: "wallet",
      type_id: wallet.id,
      message: "Topup of wallet amount by user " + profile?.fullname,
    };
    const res = await createPaymentOrder(postdata);
    if (res?.status) {
      setIsLoading(false);
      const paymentObject = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZOR_KEY,
        currency: res?.data?.currency,
        amount: res?.data?.amount * 100,
        name: "Rent A Roof",
        description: "Add amount to your wallet.",
        order_id: res?.data?.order_number,
        image: website?.logo,
        handler: async function (response) {
          setIsLoading(true);
          const res = await successPayment(response);
          if (res?.status) {
            setWallet(res?.type);
            toast.success("Payment done successfully.");
            setIsLoading(false);
            setAmount(0);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (amount > 1) {
      displayRazorpay(amount);
    } else {
      toast.error("Please enter a valid amount.");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**cards */}
        <div className="grid grid-cols-1 space-y-3 md:grid-cols-3 md:space-x-3 md:space-y-0">
          <WalletCard
            label="Wallet Balance"
            amount={new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(wallet?.amount || 0)}
            tagline={moment(wallet?.updated_at).format("MMMM DD, YYYY hh:mm A")}
            bgcolor="var(--orange)"
            textcolor="white"
          />
          <WalletCard
            label="Wallet Top Up"
            amount={new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(wallet?.credit || 0)}
            tagline={moment(wallet?.last_credit_transaction).format(
              "on MMM DD, YYYY"
            )}
            bgcolor="white"
            textcolor="gray"
          />
          <WalletCard
            label="Wallet Transaction"
            amount={new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(monthTxn)}
            tagline="Per month"
            bgcolor="white"
            textcolor="gray"
            onClick={() => setDisplayMode("transaction")}
            mode={displayMode}
          />
        </div>

        {displayMode === "topup" && (
          <div
            className="relative mt-8 p-5 shadow-sm border-2 border-gray-200 bg-white rounded-md"
            style={{ fontFamily: "Opensans-regular" }}
          >
            {/**left line */}
            <span
              className="absolute left-0 w-1 top-1 rounded-lg"
              style={{ backgroundColor: "var(--blue)", height: "98%" }}
            ></span>
            <h6
              style={{ fontFamily: "Opensans-bold" }}
              className="text-sm mb-2"
            >
              Wallet Topup
            </h6>
            {/** amount info */}
            <form name="wallet_topup" method="POST" onSubmit={handleSubmit}>
              <div
                className="border-gray-200 px-2 py-4 mt-1"
                style={{ borderTopWidth: "1px" }}
              >
                <p className="text-gray-600">
                  Your current balance:{" "}
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(wallet?.amount || 0)}
                </p>
                <div className="form-element max-w-xs mt-1">
                  <div
                    className="form-label text-gray-700"
                    style={{ fontFamily: "Opensans-bold" }}
                  >
                    Topup Amount(Amount to be added)
                  </div>
                  <input
                    type="text"
                    name="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="form-input focus:ring-0 border-gray-200 rounded-sm"
                  />
                </div>
              </div>
              <button
                className="py-2 px-7 mt-3 ml-2 rounded-md text-white uppercase"
                style={{
                  backgroundColor: "var(--blue)",
                  fontFamily: "Opensans-bold",
                }}
              >
                Add Money
              </button>
            </form>
          </div>
        )}

        {displayMode === "transaction" && (
          <div
            className="flex flex-col mt-8"
            style={{ fontFamily: "Opensans-regular" }}
          >
            <div className="flex items-center justify-between">
              <p className="flex flex-col">
                <span
                  className="text-lg"
                  style={{ fontFamily: "Opensans-semi-bold" }}
                >
                  Transaction History
                </span>
                <span className="text-gray-700">
                  List of all your recent transactions
                </span>
              </p>

              <button
                className="px-6 py-2 rounded-sm uppercase text-white"
                style={{
                  backgroundColor: "var(--blue)",
                  fontFamily: "Opensans-semi-bold",
                }}
                onClick={() => setDisplayMode("topup")}
              >
                <FiPlus className="inline-block" /> Add Money
              </button>
            </div>

            {/**search bar */}
            <div className="mt-5 flex items-center justify-between">
              <div className="relative flex items-center flex-grow sm:mr-14">
                <FiSearch className="absolute left-2" />
                <input
                  type="text"
                  name="search"
                  className="text-sm h-10 w-full pl-8 rounded-md shadow-sm border-gray-200 focus:ring-0"
                  style={{ borderWidth: "1px" }}
                  value={search}
                  onChange={handleTxnSearch}
                />
              </div>
              <button
                className="py-2 pl-5 pr-14 border-gray-200 rounded-md bg-white"
                style={{ borderWidth: "1px" }}
              >
                Show All
              </button>
            </div>
            {/**transactions */}
            <table className="table mt-5 shadow-sm bg-white font-semibold">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Payment ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions?.length > 0 &&
                  filteredTransactions.map((transaction, i) => (
                    <tr key={i}>
                      <td>{transaction.order_number}</td>
                      <td>{transaction.txn_number}</td>
                      <td>
                        {moment(transaction.created_at).format("MMM DD, YYYY")}
                      </td>
                      <td>
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(transaction.amount)}
                      </td>
                      <td className="uppercase">
                        <span
                          className={`capitalize
                        px-2 py-1 rounded-sm text-white ${
                          transaction.status === "paid" && "bg-green-500"
                        }
                        ${transaction.status === "failed" && "bg-red-500"}
                        ${transaction.status === "pending" && "bg-yellow-500"}
                        `}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default WalletUI;
