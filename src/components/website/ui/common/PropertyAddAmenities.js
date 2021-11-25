import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  addPropertyAmenities,
  getAmenities,
  getPreferences,
  getPropertyByCode,
} from "../../../../lib/frontend/properties";
import Loader from "../../../loader";

function PropertyAddAmenities({ code }) {
  const [propertyId, setPropertyId] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(true);
  const [back, setBack] = useState(false);
  const [amenity, setAmenity] = useState([]);
  const [preference, setPreference] = useState([]);
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
      const res = await getPreferences();
      if (res?.status) {
        setPreferences(res.data);
        setIsLoading(false);
      }
    })();
    setBack(router.query.back || false);
    setSkip(router.query.skip || true);

    if (router.query.mode === "update") {
      (async () => {
        const prpty = await getPropertyByCode(ids[0] + "-" + ids[1]);
        if (prpty?.status) {
          setAmenity(
            prpty?.data?.amenities !== null
              ? JSON.parse(prpty?.data?.amenities)
              : []
          );
          setPreference(
            prpty?.data?.preferences !== null
              ? JSON.parse(prpty?.data?.preferences)
              : []
          );
          setIsLoading(false);
        } else {
          console.error(prpty.error || prpty.message);
        }
      })();
    }
  }, []);

  const nextToEssentials = () => {
    localStorage.setItem("next_ap", "ESSENTIALS");
    if (back) {
      router.push("properties");
    } else {
      router.push(
        "?step=next&next=ESSENTIALS&id=" +
          code +
          (router.query.mode === "update" ? "&mode=" + router.query.mode : "")
      );
    }
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

  const handleCheck = (e) => {
    if (!e.target.checked) {
      setAmenity(amenity.filter((a) => a !== e.target.value));
    } else {
      setAmenity((prev) => [...prev, e.target.value]);
    }
  };

  const handleCheckP = (e) => {
    if (!e.target.checked) {
      setPreference(preference.filter((a) => a !== e.target.value));
    } else {
      setPreference((prev) => [...prev, e.target.value]);
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
          <h5>Add Amenities & Preferences</h5>
          {skip === true && (
            <button
              className="rounded-md text-white px-3 py-2"
              style={{
                backgroundColor: "var(--orange)",
              }}
              onClick={nextToEssentials}
            >
              Skip
            </button>
          )}
        </div>
        <form name="add_amenity" method="POST" onSubmit={handleSubmit}>
          <b className="mt-2 block">Amenities</b>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-1">
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
                      checked={
                        amenity.includes(a.id?.toString()) ? true : false
                      }
                      onChange={handleCheck}
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
          <b className="mt-2 block">Preferences</b>
          <div className="grid grid-cols-1 md:grid-cols-4 mt-1">
            {preferences?.length > 0 &&
              preferences.map((a, i) => (
                <div
                  className="flex flex-col m-2 overflow-hidden border-dotted border-gray-200 border-2 p-2"
                  key={i}
                  style={{ fontFamily: "Opensans-regular" }}
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="preferences[]"
                      value={a.id}
                      checked={
                        preference.includes(a.id?.toString()) ? true : false
                      }
                      onChange={handleCheckP}
                      className="mx-2 w-6 h-6 border-gray-200"
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
