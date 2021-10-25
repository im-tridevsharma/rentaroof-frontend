import moment from "moment";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { shallowEqual, useSelector } from "react-redux";
import { saveAgreement } from "../../lib/frontend/share";
import Loader from "../loader";

function AppointmentForm({
  appointment,
  setAgreementMode,
  setReload,
  handleUserNotification,
}) {
  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const [payamount, setPayAmount] = React.useState(
    appointment?.property_monthly_rent
  );
  const [nextDue, setNextDue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const getNextDue = (e) => {
    const d = e.target.value;
    switch (document.forms.agreement.payment_frequency.value) {
      case "monthly":
        setNextDue(moment(d).add(1, "M").format("YYYY-MM-DD"));
        break;
      case "quarterly":
        setNextDue(moment(d).add(3, "months").format("YYYY-MM-DD"));
        break;
      case "half-yearly":
        setNextDue(moment(d).add(6, "months").format("YYYY-MM-DD"));
        break;
      case "yearly":
        setNextDue(moment(d).add(1, "year").format("YYYY-MM-DD"));
        break;
      default:
        setNextDue("");
    }
  };

  const handlePayout = (e) => {
    const d = document.forms.agreement.start_date.value;
    switch (e.target.value) {
      case "monthly":
        setNextDue(moment(d).add(1, "M").format("YYYY-MM-DD"));
        setPayAmount(appointment?.property_monthly_rent);
        break;
      case "quarterly":
        setNextDue(moment(d).add(3, "months").format("YYYY-MM-DD"));
        setPayAmount(
          parseFloat(appointment?.property_monthly_rent * 3).toFixed(2)
        );
        break;
      case "half-yearly":
        setNextDue(moment(d).add(6, "months").format("YYYY-MM-DD"));
        setPayAmount(
          parseFloat(appointment?.property_monthly_rent * 6).toFixed(2)
        );
        break;
      case "yearly":
        setNextDue(moment(d).add(1, "year").format("YYYY-MM-DD"));
        setPayAmount(
          parseFloat(appointment?.property_monthly_rent * 12).toFixed(2)
        );
        break;
      default:
        setNextDue("");
        setPayAmount(appointment?.property_monthly_rent);
    }
  };

  const handleAgreement = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.agreement);
    const res = await saveAgreement(formdata);
    if (res?.status) {
      setIsLoading(false);
      setAgreementMode(false);
      setReload(Date.now());
      handleUserNotification(
        appointment?.created_by_id,
        appointment?.property_data,
        "agreement"
      );
    } else {
      setIsLoading(false);
      console.error(res?.error || res?.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="absolute top-0 left-0 p-5 bg-white shadow-md rounded-md z-40 w-full">
        <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
          Agreement Details
          <FaTimes
            onClick={() => setAgreementMode(false)}
            className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
          />
        </h5>
        <form
          name="agreement"
          style={{ fontFamily: "Opensans-regular" }}
          onSubmit={handleAgreement}
        >
          <input
            type="hidden"
            name="property_id"
            value={appointment?.property_id}
          />
          <input type="hidden" name="ibo_id" value={appointment?.user_id} />
          <input
            type="hidden"
            name="tenant_id"
            value={appointment?.created_by_id}
          />
          <input
            type="hidden"
            name="landlord_id"
            value={appointment?.property_posted_by}
          />
          <div className="form-element mt-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-input rounded-md border-gray-200"
            />
          </div>
          <div className="form-element mt-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-input rounded-md border-gray-200"
            ></textarea>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
            <div className="form-element mt-3">
              <label className="form-label">Agreement Type</label>
              <input
                type="text"
                name="agreement_type"
                className="form-input rounded-md border-gray-200"
              />
            </div>
            <div className="form-element mt-3">
              <label className="form-label">Fee Percentage (%)</label>
              <input
                type="text"
                name="fee_percentage"
                defaultValue={website?.ibo_commision}
                readOnly
                className="form-input rounded-md border-gray-200"
              />
            </div>
            <div className="form-element mt-3">
              <label className="form-label">Calculated Fee (Rs)</label>
              <input
                type="text"
                name="fee_amount"
                readOnly
                defaultValue={parseFloat(
                  (appointment?.property_monthly_rent *
                    website?.ibo_commision) /
                    100
                ).toFixed(2)}
                className="form-input rounded-md border-gray-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
            <div className="form-element mt-3">
              <label className="form-label">Payment Frequecy</label>
              <select
                name="payment_frequency"
                className="form-input rounded-md border-gray-200"
                onChange={handlePayout}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half Yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className="form-element mt-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                name="start_date"
                onBlur={getNextDue}
                className="form-input rounded-md border-gray-200"
              />
            </div>
            <div className="form-element mt-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                name="end_date"
                className="form-input rounded-md border-gray-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
            <div className="form-element mt-3">
              <label className="form-label">Payment Amount (Rs)</label>
              <input
                type="text"
                name="payment_amount"
                value={payamount}
                onChange={() => {}}
                readOnly
                className="form-input rounded-md border-gray-200"
              />
            </div>
            <div className="form-element mt-3">
              <label className="form-label">Next Due</label>
              <input
                type="date"
                name="next_due"
                value={nextDue}
                onChange={() => {}}
                readOnly
                className="form-input rounded-md border-gray-200"
              />
            </div>
            <div className="form-element mt-3">
              <button
                className="p-2 text-white rounded-md mt-7"
                style={{ backgroundColor: "var(--blue)" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AppointmentForm;
