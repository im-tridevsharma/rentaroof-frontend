import React from "react";
import { FaDirections, FaTimes } from "react-icons/fa";
import { FiCheckSquare, FiInfo, FiMail, FiPhoneOutgoing } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import {
  changeVerificationStatus,
  getPropertiesForVerification,
} from "../../../../lib/frontend/share";
import Loader from "../../../loader";

function PropertyVerificationUI() {
  const [properties, setProperties] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [reload, setReload] = React.useState(false);
  const [issue, setIssue] = React.useState(false);

  React.useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      const res = await getPropertiesForVerification();
      if (res?.status) {
        setProperties(res?.data);
        setIsLoading(false);
      } else {
        toast.error(res?.message || res?.error);
        setIsLoading(false);
      }
    };

    fetchProperties();

    return () => {
      setProperties([]);
    };
  }, [reload]);

  const getDirection = (lat, lng) => {
    if (!lat || !lat) {
      toast.error("Property has not latitude and longitude provided!");
      return;
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        window
          .open(
            `https://www.google.com/maps/dir/${location.coords.latitude},${location.coords.longitude}/${lat},${lng}`,
            "_blank"
          )
          .focus();
      });
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleIssue = (e) => {
    e.preventDefault();
    const formdata = new FormData(document.forms.issue);
    const id = document.forms.issue.id.value;

    if (id) {
      changeStatus(id, formdata);
      document.forms.issue.reset();
      setIssue(false);
    } else {
      toast.error("Something went wrong!");
    }
  };

  const changeStatus = async (id, data) => {
    setIsLoading(true);
    const res = await changeVerificationStatus(id, data);
    if (res?.status) {
      setIsLoading(false);
      setProperties(
        properties.map((p) => {
          return p.id === res?.data?.id ? res?.data : p;
        })
      );
      toast.success("Status changed successfully.");
    } else {
      setIsLoading(false);
      toast.error(res?.message || res?.error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="relative p-5 shadow-sm border-2 border-gray-200 bg-white rounded-md">
        {properties?.length > 0 ? (
          properties.map((p, i) => (
            <div
              className="flex items-center border rounded-md bg-white mb-3"
              style={{ fontFamily: "Opensans-regular" }}
            >
              <img
                src={p?.property?.front_image || "/images/website/no_photo.png"}
                alt={p?.property?.name}
                className="h-40 w-52 object-cover mr-3"
              />
              <div className="flex flex-col">
                <h5 style={{ fontFamily: "Opensans-bold" }}>
                  <b>Name</b> - {p?.property?.name} (
                  {p?.property?.property_code})
                </h5>
                <p>
                  <b>Address</b> -{p?.address?.full_address}
                </p>
                <p
                  className="flex items-center shadow-sm bg-white"
                  style={{ color: "var(--blue)" }}
                >
                  <b>Landlord</b> - {p?.landlord?.first} {p?.landlord?.last}
                  <a
                    href={`tel:${p?.landlord?.mobile}`}
                    className="ml-2 flex items-center"
                  >
                    <FiPhoneOutgoing className="mr-1" /> {p?.landlord.mobile}
                  </a>
                  <a
                    href={`mailto:${p?.landlord?.email}`}
                    className="ml-2 flex items-center"
                  >
                    <FiMail className="mr-1" /> {p?.landlord.email}
                  </a>
                </p>
                <p className="my-1" style={{ color: "var(--blue)" }}>
                  <b>Admin Message</b> - {p?.message}
                </p>
                <div className="flex items-center">
                  <div data-tip="Get Direction">
                    <ReactTooltip />
                    <FaDirections
                      className="mr-4 text-lg cursor-pointer"
                      onClick={() =>
                        getDirection(p?.address?.lat, p?.address?.long)
                      }
                    />
                  </div>
                  <button
                    className="px-2 text-white rounded-md inline-block text-sm mr-2"
                    style={{ backgroundColor: "var(--blue)" }}
                    onClick={() =>
                      changeStatus(p?.id, { status: 1, issue: "" })
                    }
                  >
                    Mark Verified
                  </button>
                  <button
                    onClick={() => setIssue(p?.id)}
                    className="px-2 text-white rounded-md inline-block bg-red-500 text-sm"
                  >
                    Mark Not Verified
                  </button>

                  {p?.is_verifiable === 1 && (
                    <button className="px-2 text-white rounded-md flex items-center bg-green-500 text-sm ml-5">
                      Verified <FiCheckSquare className="ml-3" />
                    </button>
                  )}

                  {p?.is_verifiable === 0 && p?.issues_in_verification !== "" && (
                    <button className="px-2 flex items-center text-white rounded-md bg-red-500 text-sm ml-5">
                      Not Verified{" "}
                      <FiInfo
                        data-tip={p?.issues_in_verification}
                        className="ml-3"
                      />
                      <ReactTooltip />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-red-500">Properties not found for verification!</p>
        )}
      </div>
      <ToastContainer />

      {issue && (
        <div
          style={{ fontFamily: "Opensans-regular" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 bg-white shadow-md rounded-md z-40 max-w-lg w-full"
        >
          <h5 style={{ fontFamily: "Opensans-semi-bold" }}>
            Issue in Verification
            <FaTimes
              onClick={() => setIssue(false)}
              data-tip="Close"
              className="absolute right-1 top-1 text-red-500 cursor-pointer text-lg"
            />
            <ReactTooltip />
          </h5>
          <hr className="my-1" />
          <form name="issue" onSubmit={handleIssue} className="mt-2">
            <input type="hidden" name="status" value={0} />
            <input type="hidden" name="id" value={issue} />
            <div className="form-element">
              <label className="form-label">Write Issue</label>
              <textarea
                name="issue"
                required
                className="form-input border-gray-200 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                className="px-2 py-1 text-white rounded-md right"
                style={{ backgroundColor: "var(--blue)" }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default PropertyVerificationUI;
