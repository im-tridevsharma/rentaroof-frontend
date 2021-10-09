import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import { addPropertyEssential } from "../../../../lib/frontend/properties";

function PropertyAddEssentials({ code }) {
  const [propertyId, setPropertyId] = useState("");
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setPropertyId(ids[ids.length - 1]);

    const lu = JSON.parse(__d(localStorage.getItem("LU")));
    setUser(lu);
  }, []);

  const nextToProperties = () => {
    localStorage.removeItem("next_ap");
    localStorage.removeItem("recent_ap");
    router.push(`/${user.role}/properties`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.add_essentials);
    formdata.append("propertyId", propertyId);
    if (formdata) {
      submitData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (data) => {
    const response = await addPropertyEssential(data);
    if (response?.status) {
      setIsLoading(false);
      nextToProperties();
      localStorage.setItem("newadded", "yes");
    } else {
      setIsLoading(false);
      console.error(response?.error || response?.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**header */}
        <div
          className="flex items-center justify-between"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          <h5>Add Property Essentials</h5>
          <button
            className="rounded-md text-white px-3 py-2"
            style={{
              backgroundColor: "var(--orange)",
            }}
            onClick={nextToProperties}
          >
            Skip
          </button>
        </div>

        <form name="add_essentials" method="POST" onSubmit={handleSubmit}>
          <div className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">School</label>
                <input
                  type="text"
                  name="school"
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Hospital</label>
                <input
                  type="text"
                  name="hospital"
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Bus Stop</label>
                <input
                  type="text"
                  name="bus_stop"
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Airport</label>
                <input
                  type="text"
                  name="airport"
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Train</label>
                <input
                  type="text"
                  name="train"
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element">
                <label className="form-label">Market</label>
                <input
                  type="text"
                  name="market"
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 md:space-x-3">
              <div className="form-element">
                <label className="form-label">Restaurent</label>
                <input
                  type="text"
                  name="restaurent"
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="text-right w-full">
            <button
              className="text-white rounded-md px-3 py-2 mt-3"
              style={{
                backgroundColor: "var(--blue)",
                fontFamily: "Opensans-semi-bold",
              }}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default PropertyAddEssentials;
