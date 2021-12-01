import React from "react";
import { toast } from "react-toastify";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import {
  getTransactions,
  getUserReferrals,
} from "../../../../lib/frontend/share";
import Card from "../../Card";

function PaymentUI() {
  const [user, setUser] = React.useState(false);
  const [referrals, setReferrals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [points, setPoints] = React.useState(0);
  const [tab, setTab] = React.useState("point-history");
  const [totalPaid, setTotalPaid] = React.useState(0);
  const [totalPending, setTotalPending] = React.useState(0);
  const [transactions, setTransactions] = React.useState([]);

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

    const fetchTransactions = async () => {
      setIsLoading(true);
      const res = await getTransactions("ibo");
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

    fetchReferrals();
    fetchTransactions();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative p-5 md:w-full w-screen shadow-sm border-2 border-gray-200 bg-white rounded-md">
        {/**left line */}
        <span
          className="absolute hidden md:block left-0 w-1 top-1 rounded-lg"
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
            textcolor="green"
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
            textcolor="red"
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
            className="py-2 border-b-2"
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
            <div className="flex flex-col mt-5 z-10">
              {referrals?.length > 0 &&
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
                ))}
            </div>
          )}
          {tab === "transactions" && (
            <div className="flex flex-col mt-5 overflow-x-auto">
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
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions?.length > 0 &&
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
                        <td className="capitalize">{r?.status}</td>
                      </tr>
                    ))}
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
