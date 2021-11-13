import React, { useEffect, useState } from "react";
import WalletCard from "../../WalletCard";
import { FiPlus, FiSearch } from "react-icons/fi";
import moment from "moment";

function WalletUI() {
  //authentication hook
  const [displayMode, setDisplayMode] = useState("topup");
  const [topup, setTopup] = useState({
    amount: 0,
    payment_option: "credit_card",
    cardholder: "",
    cardnumber: "",
    end_month: "",
    end_year: "",
    cvv: "",
    terms: false,
  });
  const [search, setSearch] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const transactions = [
    {
      txn: "#RU33783IY89",
      date: Date.now(),
      amount: 3290,
      client: "Amit Dwivedi",
      status: "paid",
    },
    {
      txn: "#RU338456Y89",
      date: Date.now(),
      amount: 2590,
      client: "Ramesh Dwivedi",
      status: "pending",
    },
    {
      txn: "#RU33823IY89",
      date: Date.now(),
      amount: 3290,
      client: "Kushal Karn",
      status: "pending",
    },
    {
      txn: "#RU24F23IY89",
      date: Date.now(),
      amount: 5600,
      client: "Vishal Karn",
      status: "failed",
    },
  ];

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, []);

  const handleTxnSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    setFilteredTransactions(
      transactions.filter(
        (txn) => txn.txn.includes(value) || txn.client.includes(value)
      )
    );
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setTopup((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col">
      {/**cards */}
      <div className="grid grid-cols-1 space-y-3 md:grid-cols-3 md:space-x-3 md:space-y-0">
        <WalletCard
          label="Wallet Balance"
          amount="90000"
          tagline="December 21, 2020 03:20 PM"
          bgcolor="var(--orange)"
          textcolor="white"
        />
        <WalletCard
          label="Wallet Top Up"
          amount="2000"
          tagline="on May 15,2020"
          bgcolor="white"
          textcolor="gray"
        />
        <WalletCard
          label="Wallet Transaction"
          amount="20000"
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
          <h6 style={{ fontFamily: "Opensans-bold" }} className="text-sm mb-2">
            Wallet Topup
          </h6>
          {/** amount info */}
          <form name="wallet_topup" method="POST">
            <div
              className="border-gray-200 px-2 py-4 mt-1"
              style={{ borderTopWidth: "1px" }}
            >
              <p className="text-gray-600">Your current balance: Rs. 30000</p>
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
                  value={topup.amount}
                  onChange={inputChangeHandler}
                  className="form-input focus:ring-0 border-gray-200 rounded-sm"
                />
              </div>
            </div>
            <div
              className="border-gray-200 px-2 py-3 mt-1"
              style={{ borderTopWidth: "1px" }}
            >
              <h6
                style={{ fontFamily: "Opensans-bold" }}
                className="text-gray-700"
              >
                Add your payment details
              </h6>
              <fieldset
                className="p-5 rounded-md border-gray-200 mt-3 text-gray-700 sm:max-w-lg"
                style={{
                  borderWidth: "1px",
                  fontFamily: "Opensans-semi-bold",
                }}
              >
                <legend>Payment Option</legend>
                {/**payment options */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  {/**card */}
                  <div className="flex items-start justify-start">
                    <input
                      type="radio"
                      name="payment_option"
                      value="credit_card"
                      id="credit_card"
                      onChange={inputChangeHandler}
                      checked={
                        topup.payment_option === "credit_card" ? true : false
                      }
                    />
                    <label
                      htmlFor="credit_card"
                      className="ml-2 -mt-1"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      <span>Credit Card</span>
                      <div className="flex">
                        {/**images of card */}
                        <img
                          src="/icons/user-dashboard/payments.png"
                          alt="paymentcards"
                          className="h-14 object-contain"
                        />
                      </div>
                    </label>
                  </div>
                  {/**paypal */}
                  <div className="flex items-start justify-start">
                    <input
                      type="radio"
                      name="payment_option"
                      value="paypal"
                      id="paypal"
                      onChange={inputChangeHandler}
                      checked={topup.payment_option === "paypal" ? true : false}
                    />
                    <label
                      htmlFor="paypal"
                      className="ml-2 -mt-1"
                      style={{ fontFamily: "Opensans-bold" }}
                    >
                      <span>Other</span>
                      <div className="flex">
                        {/**images of card */}
                        <img
                          src="/icons/user-dashboard/paypal.png"
                          alt="paypal"
                          className="h-14 w-24 object-contain"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
            {topup?.payment_option === "credit_card" && (
              <div className="relative border-gray-200 px-2 py-3 mt-5 border-t-2">
                <h6
                  style={{ fontFamily: "Opensans-bold" }}
                  className="text-gray-700 absolute -top-4 bg-white left-0"
                >
                  Card Details
                </h6>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 md:space-x-2">
                  <div className="form-element">
                    <div className="form-label text-gray-700">
                      Cardholder Name
                    </div>
                    <input
                      type="text"
                      name="cardholder"
                      value={topup.cardholder}
                      onChange={inputChangeHandler}
                      className="form-input focus:ring-0 border-gray-200 rounded-sm -mt-1"
                    />
                  </div>
                  <div className="form-element">
                    <div className="form-label text-gray-700">Card Number</div>
                    <input
                      type="text"
                      name="cardnumber"
                      value={topup.cardnumber}
                      onChange={inputChangeHandler}
                      className="form-input focus:ring-0 border-gray-200 rounded-sm -mt-1"
                    />
                  </div>
                </div>
                <div className="grid w-full sm:w-96 sm:grid-cols-3 sm:space-x-2">
                  <div className="form-element">
                    <div className="form-label text-gray-700">End Date</div>
                    <input
                      type="text"
                      name="end_month"
                      value={topup.end_month}
                      onChange={inputChangeHandler}
                      className="form-input focus:ring-0 border-gray-200 rounded-sm -mt-1"
                    />
                  </div>
                  <div className="form-element">
                    <input
                      type="text"
                      name="end_year"
                      value={topup.end_year}
                      onChange={inputChangeHandler}
                      className="form-input focus:ring-0 border-gray-200 rounded-sm sm:mt-6"
                    />
                  </div>
                  <div className="form-element">
                    <div className="form-label text-gray-700">CVV</div>
                    <input
                      type="text"
                      name="cvv"
                      value={topup.cvv}
                      onChange={inputChangeHandler}
                      className="form-input focus:ring-0 border-gray-200 rounded-sm -mt-1"
                    />
                  </div>
                </div>
                <label>
                  <input
                    type="checkbox"
                    name="terms"
                    value="yes"
                    onChange={(e) => {
                      setTopup((prev) => ({
                        ...prev,
                        terms: e.target.checked ? "yes" : false,
                      }));
                    }}
                    checked={topup.terms ? true : false}
                  />
                  <span className="ml-2 text-gray-700">
                    I have read and accept the terms of use...
                  </span>
                </label>
              </div>
            )}
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
                <th>Txn No.</th>
                <th>Date</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions?.length > 0 &&
                filteredTransactions.map((transaction, i) => (
                  <tr key={i}>
                    <td>{transaction.txn}</td>
                    <td>{moment(transaction.date).format("MMM DD, YYYY")}</td>
                    <td>{transaction.client}</td>
                    <td>Rs. {transaction.amount}</td>
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
  );
}

export default WalletUI;
