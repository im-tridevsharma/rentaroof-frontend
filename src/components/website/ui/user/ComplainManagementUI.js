import React, { useEffect, useState } from "react";
import { __d } from "../../../../server";
import moment from "moment";
import { MdClose } from "react-icons/md";
import ReactTooltip from "react-tooltip";
import { toast } from "react-toastify";
import Loader from "../../../loader";
import {
  deleteComplains,
  getComplains,
  saveComplains,
} from "../../../../lib/frontend/share";
import { FiAlertTriangle } from "react-icons/fi";

function ComplainManagementUI() {
  const [complain, setComplain] = useState({
    customer_id: "",
    fullname: "",
    subject: "",
    email_or_phone: "",
    details: "",
  });
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [complains, setComplains] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("LU");
    data = JSON.parse(__d(data));
    if (data) {
      setComplain((prev) => ({
        ...prev,
        customer_id: data?.system_userid,
        fullname: data?.fullname,
        email_or_phone: data?.email || data?.mobile,
      }));
    }

    const fetchComplains = async () => {
      setIsLoading(true);
      const res = await getComplains();
      if (res?.status) {
        setComplains(res?.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        toast.error(res?.error || res?.message);
      }
    };

    fetchComplains();

    return () => {
      setComplains("");
      setErrors(false);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplain((prev) => ({ ...prev, [name]: value }));
    setErrors(false);
  };

  const handleComplainSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!errors) {
      const res = await saveComplains(complain);
      if (res?.status) {
        setIsLoading(false);
        toast.success("Complain added successfully.");
        setComplain((prev) => ({ ...prev, subject: "", details: "" }));
        setComplains((prev) => [res?.data, ...prev]);
      } else if (res?.error) {
        setErrors(res?.error);
        setIsLoading(false);
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    } else {
      toast.error("Please enter all details.");
      setIsLoading(false);
    }
  };

  const removeComplain = async (id) => {
    if (id) {
      setIsLoading(true);
      const res = await deleteComplains(id);
      if (res?.status) {
        setIsLoading(false);
        setComplains(complains.filter((c) => c.id !== id));
        toast.success("Complain removed successfully.");
      } else {
        toast.error(res?.error || res?.message);
        setIsLoading(false);
      }
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**form to add complain */}
        <div
          className="w-full shadow-sm border-gray-200 bg-white rounded-md overflow-hidden"
          style={{ borderWidth: "1px", fontFamily: "Opensans-regular" }}
        >
          {/**title */}
          <p
            className="text-center p-3 text-white"
            style={{
              backgroundColor: "var(--blue)",
              fontFamily: "Opensans-semi-bold",
              fontSize: "1rem",
            }}
          >
            Add Complain
          </p>
          {/**form */}
          {errors && (
            <div className="p-3">
              {Object.keys(errors).map((index, i) => (
                <div className="w-full mb-2" key={i}>
                  <p className="text-red-500 flex items-center">
                    <FiAlertTriangle className="mr-1" /> {errors[index]}
                  </p>
                </div>
              ))}{" "}
            </div>
          )}
          <div className="p-10">
            <form name="complain" method="POST" onSubmit={handleComplainSubmit}>
              <div className="grid grid-cols-1  sm:grid-cols-2 sm:space-x-5">
                <div className="form-element">
                  <div className="form-label text-gray-700">Customer Id</div>
                  <input
                    type="text"
                    name="customer_id"
                    className="form-input -mt-1 rounded-sm border-gray-200"
                    defaultValue={complain.customer_id}
                    readOnly
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-element">
                  <div className="form-label text-gray-700">Full Name</div>
                  <input
                    type="text"
                    name="fullname"
                    className="form-input -mt-1 rounded-sm border-gray-200"
                    value={complain.fullname}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 sm:space-x-5 ">
                <div className="form-element">
                  <div className="form-label text-gray-700">Subject</div>
                  <input
                    type="text"
                    name="subject"
                    className="form-input -mt-1 rounded-sm border-gray-200"
                    value={complain.subject}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-element">
                  <div className="form-label text-gray-700">Email / Phone</div>
                  <input
                    type="text"
                    name="email_or_phone"
                    className="form-input -mt-1 rounded-sm border-gray-200"
                    value={complain.email_or_phone}
                    onChange={handleInputChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="form-element">
                <div className="form-label text-gray-700">Details</div>
                <textarea
                  name="details"
                  className="form-input -mt-1 rounded-sm border-gray-200"
                  value={complain.details}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button
                className="px-4 py-3 mt-2 rounded-sm text-white"
                style={{
                  backgroundColor: "var(--orange)",
                  fontFamily: "Opensans-bold",
                }}
                type="submit"
              >
                Submit Complain
              </button>
            </form>
          </div>
        </div>

        {/**complain history */}
        <div
          className="flex flex-col p-5 mt-5 bg-white border-gray-200 shadow-sm rounded-md"
          style={{ borderWidth: "1px", fontFamily: "Opensans-bold" }}
        >
          {/**header */}
          <div className="flex items-center justify-between">
            <p className="text-gray-700" style={{ fontSize: ".9rem" }}>
              History
            </p>
            <button className="text-gray-700" style={{ fontSize: ".9rem" }}>
              View All
            </button>
          </div>

          {/**complains */}
          <div className="mt-3">
            {complains?.length > 0 ? (
              complains.map((c, i) => (
                <div
                  className="relative flex flex-col sm:flex-row justify-between py-3 pl-10 border-gray-400"
                  style={{ borderTopWidth: "1px" }}
                  key={i}
                >
                  <span
                    data-tip="Remove"
                    onClick={() => removeComplain(c?.id)}
                    className="p-1 rounded-md bg-gray-400 absolute top-3 left-0 cursor-pointer text-white"
                  >
                    <MdClose />
                    <ReactTooltip />
                  </span>
                  <div className="flex flex-col items-start">
                    <span
                      className={`text-white px-2 rounded-md  capitalize
                    ${c?.status === "reviewed" && "bg-yellow-500"}
                    ${c?.status === "resolved" && "bg-green-500"}
                    ${c?.status === "waiting" && "bg-blue-500"}
                    `}
                    >
                      {c.status}
                    </span>
                    <p>{c.subject}</p>
                    <p
                      style={{ fontFamily: "Opensans-regular" }}
                      className="text-gray-500"
                    >
                      {c.details}
                    </p>
                  </div>
                  <p
                    style={{ fontFamily: "Opensans-regular" }}
                    className="text-gray-500 flex items-start mt-1 sm:mt-0"
                  >
                    <img
                      src="/icons/user-dashboard/time.png"
                      alt="time"
                      className="mr-1 object-contain h-5 w-5"
                    />
                    {moment(c.created_at).format("D MMM YYYY [at] hh:mm a")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-red-500">Complains not found!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ComplainManagementUI;
