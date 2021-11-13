import React from "react";
import { toast, ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import { getUserReferrals } from "../../../../lib/frontend/share";
import Card from "../../Card";

function PaymentUI() {
  const [user, setUser] = React.useState(false);
  const [referrals, setReferrals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [points, setPoints] = React.useState(0);
  const [tab, setTab] = React.useState("point-history");

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
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <div className="relative p-5 shadow-sm border-2 border-gray-200 bg-white rounded-md">
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
        </div>

        <div
          className="flex items-center mt-5"
          style={{ fontFamily: "Opensans-bold" }}
        >
          <button
            className="py-2 border-b-2"
            onClick={() => setTab("point-history")}
            style={{ borderBottomColor: "var(--blue)" }}
          >
            Point History
          </button>
        </div>

        {tab === "point-history" && (
          <div className="flex flex-col mt-5">
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
      </div>
    </>
  );
}

export default PaymentUI;
