import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addPropertyAmenities,
  getAmenities,
} from "../../../../lib/frontend/properties";
import Loader from "../../../loader";

function PropertyAddAmenities({ code }) {
  const [propertyId, setPropertyId] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setPropertyId(ids[ids.length - 1]);
    setIsLoading(true);
    (async () => {
      const response = await getAmenities();
      if (response?.status) {
        setAmenities(response.data);
        setIsLoading(false);
      }
    })();
  }, []);

  const nextToEssentials = () => {
    localStorage.setItem("next_ap", "ESSENTIALS");
    router.push("?step=next&next=ESSENTIALS&id=" + code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData(document.forms.add_amenity);
    formdata.append("propertyId", propertyId);
    if (formdata) {
      submitData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (data) => {
    const response = await addPropertyAmenities(data);
    if (response?.status) {
      setIsLoading(false);
      nextToEssentials();
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
          <h5>Add Amenities</h5>
          <button
            className="rounded-md text-white px-3 py-2"
            style={{
              backgroundColor: "var(--orange)",
            }}
            onClick={nextToEssentials}
          >
            Skip
          </button>
        </div>
        <form name="add_amenity" method="POST" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-5">
            {amenities?.length > 0 &&
              amenities.map((a, i) => (
                <div
                  className="flex flex-col m-2 overflow-hidden border-dotted border-gray-200 border-2 p-2"
                  key={i}
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="amenities[]"
                      value={a.id}
                      className="mx-2 w-6 h-6 border-gray-200"
                    />
                    <img
                      src={a.icon}
                      alt={a.title}
                      className="w-10 h-10 object-contain"
                    />
                    <p className="ml-2" style={{ fontFamily: "Opensans-bold" }}>
                      {a.title}
                    </p>
                  </div>
                  <p className="text-xs mt-1">{a.description}</p>
                </div>
              ))}
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

export default PropertyAddAmenities;
