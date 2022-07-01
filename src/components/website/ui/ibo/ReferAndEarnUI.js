import React from "react";
import { FaCopy } from "react-icons/fa";
import { shallowEqual, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import { getUserReferrals } from "../../../../lib/frontend/share";

function ReferAndEarnUI() {
  const [user, setUser] = React.useState(false);
  const [referrals, setReferrals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const u = localStorage.getItem("LU")
      ? JSON.parse(__d(localStorage.getItem("LU")))
      : false;
    if (u) {
      setUser(u);
    }

    const fetchReferrals = async () => {
      setIsLoading(true);
      const res = await getUserReferrals("for=referral");
      if (res?.status) {
        setIsLoading(false);
        setReferrals(res?.data);
      } else {
        toast.error(res?.message || res?.error);
        setIsLoading(false);
      }
    };

    fetchReferrals();
  }, []);

  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const copyReferral = (e) => {
    e.preventDefault();
    var text = `${process.env.BASE_URL}/signup?referral=${user?.system_userid}`;
    navigator.clipboard.writeText(text).then(
      function () {
        toast.success("Successfully copied referral link!");
      },
      function (err) {
        toast.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <div className="relative flex flex-col items-center justify-center p-5 shadow-sm mx-4 bg-white rounded-md">
        <h4 style={{ fontFamily: "Opensans-bold" }}>
          IBO ID - {user?.system_userid}
        </h4>

        <h4 style={{ fontFamily: "Opensans-bold" }}>
          Total Referrals - {referrals.length}
        </h4>

        <p
          className="p-3 mt-5 bg-white rounded-lg shadow-lg flex items-center"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          Your referral link -{" "}
          <code>
            {process.env.BASE_URL}/signup?referral={user?.system_userid}
          </code>
          <FaCopy
            className="text-blue-500 ml-2 cursor-pointer"
            data-tip="Copy Referral Url"
            onClick={copyReferral}
          />
          <ReactTooltip />
        </p>

        <p
          className="text-lg mt-10"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          Invite your friends and get Credits!
        </p>
        <p
          className="text-lg mt-2"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          Referrals are people who registered at your invitation.
        </p>

        <p
          className="text-lg mt-2"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          After successful referral you will get{" "}
          <b className="text-blue-500">
            {website?.referral_bonus_sender_point}
          </b>{" "}
          points.
        </p>
        <p
          className="text-lg mt-2"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          User you referred will get{" "}
          <b className="text-blue-500">
            {website?.referral_bonus_receiver_point}
          </b>{" "}
          points.
        </p>
      </div>
    </>
  );
}

export default ReferAndEarnUI;
