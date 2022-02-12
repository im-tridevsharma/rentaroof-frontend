import React, { useState, useEffect } from "react";
import Loader from "../../../loader";
import Link from "next/link";
import { FiCheckCircle, FiAlertTriangle } from "react-icons/fi";
import { updatePassword } from "../../../../lib/frontend/auth";
import { __d, __e } from "../../../../server";
import CheckboxToggle from "../../CheckboxToggle";
import getSettings, {
  deactivateAccount,
  setSetting,
} from "../../../../lib/frontend/settings";
import { toast } from "react-toastify";

function SettingUI() {
  const [accountStatus, setAccountStatus] = useState(false);
  const [userid, setUserId] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [settings, setSettings] = useState([]);
  const [profile, setProfile] = useState(false);
  const [deactivationReason, setDeactivationReason] = useState("");
  const [showreason, setShowReason] = useState(false);

  const [password, setPassword] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
    _method: "PUT",
  });
  const [perrors, setPErrors] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      setProfile(data);
      setUserId(data.id);
      setAccountStatus(data?.account_status);
      setDeactivationReason(data?.deactivate_reason);
      setIsLoading(true);
      (async () => {
        const response = await getSettings(data.id);
        if (response?.status) {
          setSettings(response.data);
          setIsLoading(false);
        } else {
          toast.error(response.error);
          setIsLoading(false);
        }
      })();
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const iserror = perrors
      ? Object.keys(perrors).filter((index) => perrors[index] !== false)
      : false;
    if (!iserror?.length) {
      submitPasswordData(password);
    } else {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
    setPErrors(false);
  };

  const submitPasswordData = async (password) => {
    const response = await updatePassword(userid, password);
    if (response?.status) {
      setIsUpdated(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsUpdated(false);
      }, 1000);
      setPassword({
        current_password: "",
        new_password: "",
        confirm_password: "",
        _method: "PUT",
      });
      setPErrors(false);
    } else if (response?.error) {
      setIsLoading(false);
      setPErrors(response.error);
    }
  };

  const handleSettingChange = (e) => {
    setIsLoading(true);
    const { name } = e.target;
    const value = e.target.checked ? "yes" : "no";
    const newSetting = settings.map((s) => {
      s[name] = value;
    });
    setSetting(newSetting);
    if (newSetting) {
      updateSetting(name, value);
    }
  };

  const updateSetting = async (name, value) => {
    const response = await setSetting(userid, name, value);
    if (response?.status) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const dAccount = async (status, reason = "") => {
    setIsLoading(true);
    const response = await deactivateAccount(userid, status, reason);
    if (response?.status) {
      setIsLoading(false);
      setAccountStatus(status);
      let data = localStorage.getItem("LU");
      data = JSON.parse(__d(data));
      if (data) {
        data.account_status = status;
        data.deactivate_reason = reason;
        localStorage.setItem("LU", __e(JSON.stringify(data)));
        setShowReason(false);
      }
    } else {
      setIsLoading(false);
      toast.error(response?.error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative p-5 shadow-sm border-2 border-gray-200 bg-white rounded-md">
        {/**left line */}
        <span
          className="absolute left-0 w-1 top-1 rounded-lg"
          style={{ backgroundColor: "var(--blue)", height: "98%" }}
        ></span>
        <Link href={`/${profile?.role}/edit-template`}>
          <a className="px-4 py-2 bg-green-400 rounded-md">Edit Template</a>
        </Link>
        <form
          name="password"
          method="POST"
          className="flex flex-col mt-5"
          encType="multipart/form-data"
          onSubmit={submitHandler}
        >
          {/**change password */}
          <div
            className="relative flex flex-col border-gray-200 py-5 px-10 mt-1"
            style={{ borderTopWidth: "1px" }}
          >
            <p
              className="absolute -top-3 left-0 bg-white pr-2"
              style={{
                fontFamily: "Opensans-bold",
              }}
            >
              Change Password
            </p>
            <div className="leading-3 mb-3">
              {perrors && (
                <div className="errors">
                  {Object.keys(perrors).map((index, i) => (
                    <div className="w-full mb-2" key={i}>
                      <p className="text-red-500 flex items-center">
                        <FiAlertTriangle className="mr-1" /> {perrors[index]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
              {isUpdated && (
                <p className="flex items-center text-green-600">
                  <FiCheckCircle className="mr-1" /> Password updated
                  successfully.
                </p>
              )}
            </div>
            <div
              className="grid grid-cols-1 md:grid-cols-3 md:space-x-3 text-gray-600"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <div className="form-element">
                <div className="form-label" style={{ marginBottom: "0px" }}>
                  Current Password
                </div>
                <input
                  type="password"
                  name="current_password"
                  className="form-input border-gray-300"
                  value={password.current_password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-element">
                <div className="form-label" style={{ marginBottom: "0px" }}>
                  New Password
                </div>
                <input
                  type="password"
                  name="new_password"
                  className="form-input border-gray-300"
                  value={password.new_password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="form-element">
                <div className="form-label" style={{ marginBottom: "0px" }}>
                  Confirm Password
                </div>
                <input
                  type="password"
                  name="confirm_password"
                  className="form-input border-gray-300"
                  value={password.confirm_password}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="px-4 py-2 text-white rounded-sm"
                style={{ backgroundColor: "var(--blue)" }}
              >
                Update
              </button>
            </div>
          </div>
          {/**notification */}
          <div
            className="relative flex flex-col border-gray-200 py-5 px-10 mt-3"
            style={{ borderTopWidth: "1px" }}
          >
            <p
              className="absolute -top-3 left-0 bg-white pr-2"
              style={{
                fontFamily: "Opensans-bold",
              }}
            >
              Notification
            </p>
            <div
              className="flex flex-col text-gray-500 leading-6"
              style={{ fontFamily: "Opensans-semi-bold" }}
            >
              <CheckboxToggle
                name="receive_important_updates_on_number"
                label="Receive important updates on Number"
                onChange={handleSettingChange}
                data={settings}
              />
              <CheckboxToggle
                name="offers_and_updates"
                label="Offers and Updates"
                onChange={handleSettingChange}
                data={settings}
              />
              <CheckboxToggle
                name="meeting_updates"
                label="Meeting Updates"
                onChange={handleSettingChange}
                data={settings}
              />
              <CheckboxToggle
                name="account_notification"
                label="Account Notification"
                onChange={handleSettingChange}
                data={settings}
              />
            </div>
          </div>
          {/**deactivate */}
          <div className="text-right">
            {accountStatus === "activated" && (
              <button
                onClick={() => setShowReason(true)}
                type="button"
                className="p-2 text-white rounded-md bg-red-500"
              >
                Deactivate Account
              </button>
            )}
          </div>
          {accountStatus !== "activated" && (
            <>
              <p className="text-red-500">
                You have de-activated your account. Please contact to
                administrator.
              </p>
              <b>
                Reason: <i>{deactivationReason}</i>
              </b>
            </>
          )}
        </form>
        {showreason && (
          <div
            className="shadow-sm border max-w-lg w-full rounded-xl absolute 
        top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-3"
          >
            <form
              method="POST"
              onSubmit={(e) => {
                e.preventDefault();
                dAccount(
                  accountStatus == "activated" ? "deactivated" : "activated",
                  deactivationReason
                );
              }}
            >
              <h5 style={{ fontFamily: "Opensans-semi-bold" }} className="mb-1">
                De-activation Reason
              </h5>
              <div className="form-element">
                <textarea
                  className="form-textarea border-gray-200 rounded-md"
                  value={deactivationReason}
                  placeholder="Tell us why do you want to deactivate your account?"
                  required
                  onChange={(e) => setDeactivationReason(e.target.value)}
                ></textarea>
              </div>
              <div className="text-right">
                <button
                  onClick={() => setShowReason(false)}
                  type="button"
                  className="px-3 py-2 bg-red-500 rounded-md text-white"
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-2 ml-3 rounded-md text-white"
                  style={{ backgroundColor: "var(--blue)" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default SettingUI;
