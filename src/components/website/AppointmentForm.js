import moment from "moment";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";
import { shallowEqual, useSelector } from "react-redux";
import { saveAgreement } from "../../lib/frontend/share";
import Loader from "../loader";

function AppointmentForm({
  appointment,
  setAgreementMode,
  setReload,
  handleUserNotification,
  final,
}) {
  const { website } = useSelector(
    (state) => ({
      website: state.website,
    }),
    shallowEqual
  );

  const [payamount, setPayAmount] = React.useState(
    final
      ? final * parseInt(100 / website?.landlord_commision)
      : appointment?.property_monthly_rent
  );
  const [nextDue, setNextDue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState(false);

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
        setPayAmount(
          final
            ? final * parseInt(100 / website?.landlord_commision)
            : appointment?.property_monthly_rent
        );
        break;
      case "quarterly":
        setNextDue(moment(d).add(3, "months").format("YYYY-MM-DD"));
        setPayAmount(
          parseFloat(
            final
              ? final * parseInt(100 / website?.landlord_commision) * 3
              : appointment?.property_monthly_rent * 3
          ).toFixed(2)
        );
        break;
      case "half-yearly":
        setNextDue(moment(d).add(6, "months").format("YYYY-MM-DD"));
        setPayAmount(
          parseFloat(
            final
              ? final * parseInt(100 / website?.landlord_commision) * 6
              : appointment?.property_monthly_rent * 6
          ).toFixed(2)
        );
        break;
      case "yearly":
        setNextDue(moment(d).add(1, "year").format("YYYY-MM-DD"));
        setPayAmount(
          parseFloat(
            final
              ? final * parseInt(100 / website?.landlord_commision) * 12
              : appointment?.property_monthly_rent * 12
          ).toFixed(2)
        );
        break;
      default:
        setNextDue("");
        setPayAmount(
          final
            ? final * parseInt(100 / website?.landlord_commision)
            : appointment?.property_monthly_rent
        );
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
      localStorage.getItem("deal-for") && localStorage.removeItem("deal-for");
      handleUserNotification(
        appointment?.created_by_id,
        appointment?.property_data,
        "agreement",
        null,
        `/tenant/agreements?a=${res?.data.id}`
      );
    } else if (res?.error) {
      setErrors(res?.error);
      setTimeout(() => {
        setErrors(false);
      }, 3000);
      setIsLoading(false);
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
        {errors && (
          <div className="mt-3">
            {Object.keys(errors).map((index, i) => (
              <div className="w-full mb-2" key={i}>
                <p className="text-red-500 flex items-center">
                  <FiAlertTriangle className="mr-1" /> {errors[index]}
                </p>
              </div>
            ))}
          </div>
        )}
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
              <label className="form-label">IBO Fee Percentage (%)</label>
              <input
                type="text"
                name="fee_percentage"
                defaultValue={website?.ibo_commision}
                readOnly
                className="form-input rounded-md border-gray-200"
              />
            </div>
            <div className="form-element mt-3">
              <label className="form-label">IBO Calculated Fee (Rs)</label>
              <input
                type="text"
                name="fee_amount"
                readOnly
                defaultValue={parseFloat(
                  parseFloat(
                    (final
                      ? final * parseInt(100 / website?.landlord_commision)
                      : appointment?.property_monthly_rent *
                        website?.landlord_commision) / 100
                  ) -
                    parseFloat(
                      (((final
                        ? final * parseInt(100 / website?.landlord_commision)
                        : appointment?.property_monthly_rent *
                          website?.landlord_commision) /
                        100) *
                        website?.ibo_commision) /
                        100
                    )
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
                value={parseFloat(
                  parseFloat((payamount * website?.landlord_commision) / 100) +
                    parseFloat(website?.documentation_cost)
                ).toFixed(2)}
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
