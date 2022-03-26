import { FiDelete } from "react-icons/fi";
import Image from "next/image";
import moment from "moment";
import { useEffect, useState } from "react";
import { iboRatings, updateKycIbo } from "../../lib/ibos";
import { updateKycLandlord } from "../../lib/landlords";
import Loader from "../loader";
import ReactTooltip from "react-tooltip";
import { ToastContainer, toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

function Index(props) {
  const [action, setAction] = useState("");
  const [issue, setIssue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (props?.kyc) {
      setAction(props.kyc.is_verified);
      setIssue(props.kyc?.verification_issues);
    }
  }, []);

  useEffect(() => {
    if (showReviews) {
      setIsLoading(true);
      (async function () {
        const res = await iboRatings(props?.user?.id);
        console.log(res);
        if (res?.status) {
          setIsLoading(false);
          setReviews(res?.data);
          console.log(res?.data);
        } else {
          toast.error(res?.message);
          setIsLoading(false);
        }
      })();
    }
  }, [showReviews]);

  const updateStatus = async (s, reason) => {
    setIsLoading(true);
    const data = {
      status: s,
      user_id: props.user?.id,
      reason: reason,
    };
    const response =
      props.user?.role === "ibo"
        ? await updateKycIbo(props.kyc?.id, data)
        : await updateKycLandlord(props.kyc?.id, data);
    if (response?.status) {
      setIsLoading(false);
      toast.success("Kyc status updated successfully.");
    } else {
      setIsLoading(false);
      toast.error(response?.message);
    }
  };

  const updateWithReason = () => {
    if (document.querySelector("#kyc_action2").checked) updateStatus(0, issue);
  };

  return (
    <>
      <ToastContainer />
      {isLoading && <Loader />}
      <div className="absolute top-0 right-0 w-full h-auto p-5 rounded-sm shadow-md bg-white z-40">
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h1 className="text-2xl">{props.title}</h1>
            <p>{props.subtitle}</p>
          </div>
          <FiDelete
            onClick={() => props.toggle(false)}
            data-tip="Close"
            className="text-xl text-red-500 cursor-pointer transition duration-100 transform hover:scale-125"
          />
          <ReactTooltip />
        </div>
        <div className="mt-3 mb-1">
          {props.user && (
            <>
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-gray-200">
                {props.user.profile_pic && (
                  <Image
                    src={props.user.profile_pic}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                )}
              </div>
              <table className="table-auto mb-2 w-full">
                <tbody>
                  <tr>
                    <td>Name</td>
                    {props.user.first && (
                      <td>{`${props.user.first} ${props.user.last} `}</td>
                    )}
                    {props.user.name && <td>{props.user.name}</td>}
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{props.user.email}</td>
                  </tr>
                  <tr>
                    <td>Mobile</td>
                    <td>{props.user.mobile}</td>
                  </tr>
                  {props.user.dob && (
                    <tr>
                      <td>DOB</td>
                      <td>
                        {props.user.dob &&
                          moment(props.user.dob).format("DD-MM-YYYY")}
                      </td>
                    </tr>
                  )}
                  <tr>
                    <td>Gender</td>
                    <td>{props.user.gender}</td>
                  </tr>
                  <tr>
                    <td>Account Status</td>
                    <td>{props.user.account_status.toUpperCase()}</td>
                  </tr>
                  {props.user.account_status == "deactivated" && (
                    <tr>
                      <td>Deactivate Reason</td>
                      <td>{props.user.deactivate_reason}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="mt-2">
          <h1 className="text-xl text-gray-700">Address</h1>
          <hr />
          {props.address && (
            <table className=" table-auto w-full mb-2 mt-2">
              <tbody>
                <tr>
                  <td>Landmark</td>
                  <td>{props.address.landmark}</td>
                </tr>
                <tr>
                  <td>House Number</td>
                  <td>{props.address.house_number}</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>{props.address.city}</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>{props.address.state}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>{props.address.country}</td>
                </tr>
                <tr>
                  <td>Full Address</td>
                  <td>{props.address.full_address}</td>
                </tr>
                <tr>
                  <td>Pincode</td>
                  <td>{props.address.pincode}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        {props.kyc && (
          <div className="mt-2">
            <h1 className="text-xl text-gray-700">KYC Details</h1>
            <hr />
            {props.address && (
              <table className="table-auto w-full mb-2 mt-2">
                <tbody>
                  {props?.user?.role === "ibo" && (
                    <>
                      <tr>
                        <td>Present Address</td>
                        <td>{props?.kyc?.present_address}</td>
                      </tr>
                      <tr>
                        <td>Permanent Address</td>
                        <td>{props?.kyc?.permanent_address}</td>
                      </tr>
                      <tr>
                        <td>Reference User</td>
                        <td>
                          <p>{props?.kyc?.ref_user_name}</p>
                          <p>{props?.kyc?.ref_user_email}</p>
                          <p>{props?.kyc?.ref_user_address}</p>
                        </td>
                      </tr>
                    </>
                  )}
                  <tr>
                    <td>Document Type</td>
                    <td>{props.kyc.document_type}</td>
                  </tr>
                  <tr>
                    <td>Document Number</td>
                    <td>{props.kyc.document_number}</td>
                  </tr>
                  <tr>
                    <td>Is Verified</td>
                    <td>{props.kyc.is_verified === 1 ? "Yes" : "Not"}</td>
                  </tr>
                  <tr>
                    <td>Document File</td>
                    <td className="pt-5">
                      <a
                        href={props.kyc.document_upload}
                        rel="noreferrer"
                        target="_blank"
                        className="btn btn-default bg-blue-400 text-white hover:bg-blue-300"
                      >
                        View Document
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>Action</td>
                    <td className="pt-5 pb-2">
                      <label htmlFor="kyc_action">
                        <input
                          type="radio"
                          name="kyc_action"
                          id="kyc_action"
                          className="cursor-pointer"
                          onChange={(e) => {
                            setAction(1);
                            if (e.target.checked) {
                              updateStatus(1, "");
                            }
                          }}
                          checked={action ? true : false}
                        />
                        <span className="ml-1 cursor-pointer">Verified</span>
                      </label>
                      <label htmlFor="kyc_action2" className="ml-4">
                        <input
                          type="radio"
                          id="kyc_action2"
                          name="kyc_action"
                          className="cursor-pointer"
                          onChange={() => {
                            setAction(0);
                          }}
                          checked={action ? false : true}
                        />
                        <span className="ml-1 cursor-pointer">
                          Not Verified
                        </span>
                      </label>
                    </td>
                  </tr>
                  {action === 0 && (
                    <tr>
                      <td>Issue in verification</td>
                      <td>
                        <div className="flex items-center">
                          <input
                            type="text"
                            id="issue"
                            className="max-w-sm w-full h-8 mr-2 text-sm"
                            placeholder="Provide the reason for not verified!"
                            value={issue}
                            onChange={(e) => setIssue(e.target.value)}
                          />
                          <button
                            type="button"
                            className="px-2 py-1 rounded-md text-white bg-blue-500"
                            onClick={updateWithReason}
                          >
                            Submit
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        )}

        {props?.user?.role === "ibo" && (
          <button
            onClick={() => setShowReviews(Date.now())}
            className="px-3 py-2 rounded-md bg-blue-400 text-white"
          >
            Show Reviews
          </button>
        )}

        {showReviews && (
          <div className="fixed top-0 min-h-screen left-0  p-5 bg-white shadow-md rounded-md z-40 w-full">
            <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
              Reviews
              <FaTimes
                onClick={() => setShowReviews(false)}
                data-tip="Close"
                className="absolute right-5 top-5 text-red-500 cursor-pointer text-lg"
              />
            </h5>
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Rating</th>
                  <th>Review</th>
                </tr>
              </thead>
              <tbody>
                {reviews?.length > 0 ? (
                  reviews.map((item, i) => (
                    <tr key={i}>
                      <td>{item?.name || ""}</td>
                      <td>{item?.user_role || ""}</td>
                      <td>{item?.email || ""}</td>
                      <td>{item?.rating || ""}</td>
                      <td>{item?.review || ""}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No records found!</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Index;
