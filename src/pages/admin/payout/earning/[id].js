import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Loader from "../../../../components/loader";
import SectionTitle from "../../../../components/section-title";
import { getEarningPayout, releasePayout } from "../../../../lib/payouts";
import { toast, ToastContainer } from "react-toastify";
import router from "next/router";

const AllRequest = () => {
  return (
    <Link href="/admin/payout/earning">
      <a className="btn btn-default bg-blue-500 text-white rounded-lg hover:bg-blue-400">
        All Requests
      </a>
    </Link>
  );
};

function Index() {
  const [request, setRequest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const payoutCall = async () => {
      setIsLoading(true);
      const payout = await getEarningPayout(router?.query?.id);
      if (payout?.status) {
        setRequest(payout.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(payout?.message);
      }
    };

    payoutCall();
  }, [reload]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData(document.forms.payout);
    setIsLoading(true);
    const res = await releasePayout(router?.query?.id, formdata);
    if (res?.status) {
      toast.success(res?.message);
      setReload(Date.now());
    } else {
      setIsLoading(false);
      toast.error(res?.message);
    }
  };

  return (
    <>
      <Head>
        <title>Add Faq | Rent a Roof</title>
      </Head>
      <ToastContainer />
      {isLoading && <Loader />}
      <SectionTitle
        title="Payouts"
        subtitle="Earning Payout"
        right={<AllRequest />}
      />

      <div className="bg-white flex flex-col dark:bg-gray-800 px-2 py-3 rounded-lg border-gray-100 dark:border-gray-900 border-2">
        <h4>Available Earning Amount : Rs.{request?.earning?.amount || 0}</h4>
        <form method="POST" onSubmit={handleSubmit} name="payout">
          <div className="grid sm:grid-cols-3 sm:space-x-2 mt-10">
            <div className="form-element">
              <h6>
                <i>Name:</i> {request?.name}
              </h6>
            </div>
            <div className="form-element">
              <h6>
                <i>Email:</i> {request?.email}
              </h6>
            </div>
            <div className="form-element">
              <h6>
                <i>Role:</i> {request?.role}
              </h6>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 sm:space-x-2">
            <div className="form-element">
              <h6>
                <i>Status:</i> {request?.payout_status}
              </h6>
            </div>
            <div className="form-element">
              <h6>
                <i>Transaction Status:</i> {request?.transaction_status}
              </h6>
            </div>
          </div>
          <hr />
          {request?.transaction_status !== "paid" && (
            <>
              <h5 className="mt-5">Release Payout-</h5>
              <div className="grid sm:grid-cols-3 sm:space-x-2 mt-10">
                <div className="form-element">
                  <label className="form-label">Payout Amount</label>
                  <input
                    type="number"
                    min={1}
                    max={request?.earning?.amount}
                    name="amount"
                    className="form-input"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Transaction ID</label>
                  <input
                    type="text"
                    name="transaction_id"
                    className="form-input"
                  />
                </div>
                <div className="form-element">
                  <label className="form-label">Transaction Status</label>
                  <select className="form-input" name="transaction_status">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <button className="btn btn-default bg-blue-400 float-right text-white rounded-sm hover:bg-blue-500">
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default Index;
