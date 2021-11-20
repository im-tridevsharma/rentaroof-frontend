import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { __d } from "../../../../server";
import Loader from "../../../loader";
import {
  addPropertyEssential,
  getPropertyByCode,
  updatePropertyEssential,
} from "../../../../lib/frontend/properties";
import { FiMinus, FiPlus } from "react-icons/fi";
import ReactTooltip from "react-tooltip";

function PropertyAddEssentials({ code }) {
  const [propertyId, setPropertyId] = useState("");
  const [user, setUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [skip, setSkip] = useState(true);
  const [back, setBack] = useState(false);
  const [essentials, setEssentials] = useState({});
  const [customs, setCustoms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setPropertyId(ids[ids.length - 1]);

    const lu = JSON.parse(__d(localStorage.getItem("LU")));
    if (lu) {
      setUser(lu);
    }
    setSkip(router.query.skip || true);
    setBack(router.query.back || false);

    if (router.query.mode === "update") {
      (async () => {
        const prpty = await getPropertyByCode(ids[0] + "-" + ids[1]);
        if (prpty?.status) {
          setEssentials(prpty?.data?.essential);
          const lcustoms =
            prpty.data?.essential &&
            JSON.parse(prpty?.data?.essential?.customs);
          lcustoms &&
            setCustoms(
              Object.keys(lcustoms).map((key, i) => (
                <div className="form-element md:mr-2" key={i}>
                  <label className="form-label flex items-center">
                    <input
                      type="text"
                      name="name[]"
                      placeholder="Untitled"
                      defaultValue={key}
                      onChange={() => {}}
                      className="border-0 p-0 m-0 ring-0 focus:ring-0 font-thin text-xs"
                    />
                    <FiMinus
                      className="ml-2 text-red-600 text-lg cursor-pointer"
                      data-tip="Remove"
                      onClick={() => deleteCustom(i)}
                    />
                    <ReactTooltip />
                  </label>
                  <input
                    type="text"
                    name="value[]"
                    defaultValue={lcustoms[key]}
                    onChange={() => {}}
                    placeholder="eg: 1KM"
                    className="form-input border-gray-200 rounded-md"
                  />
                </div>
              ))
            );
          setIsLoading(false);
        } else {
          console.error(prpty.error || prpty.message);
        }
      })();
    }
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
    router.query.mode === "update" && formdata.append("_method", "PUT");
    if (formdata) {
      submitData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (data) => {
    const response =
      router.query.mode === "update"
        ? await updatePropertyEssential(essentials?.id, data)
        : await addPropertyEssential(data);
    if (response?.status) {
      setIsLoading(false);
      nextToProperties();
      if (!back) {
        if (router.query.mode === "update") {
          localStorage.setItem(
            "updated",
            `${router.query.id.split("-")[0]}-${
              router.query.id.split("-")[1]
            } property updated successfully.`
          );
        } else {
          localStorage.setItem("newadded", "yes");
        }
      }
    } else {
      setIsLoading(false);
      console.error(response?.error || response?.message);
    }
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setEssentials((prev) => ({ ...prev, [name]: value }));
  };

  const deleteCustom = (index) => {
    setCustoms(customs.filter((_, i) => i === index));
  };

  const addNewCustom = (e) => {
    const template = (
      <div
        className="form-element md:mr-2"
        key={customs.length > 0 ? customs.length : 0}
      >
        <label className="form-label flex items-center">
          <input
            type="text"
            name="name[]"
            placeholder="Untitled"
            className="border-0 p-0 m-0 ring-0 focus:ring-0 font-thin text-xs"
          />
          <FiMinus
            className="ml-2 text-red-600 text-lg cursor-pointer"
            data-tip="Remove"
            onClick={() =>
              deleteCustom(customs.length > 0 ? customs.length : 0)
            }
          />
          <ReactTooltip />
        </label>
        <input
          type="text"
          name="value[]"
          placeholder="eg: 1KM"
          className="form-input border-gray-200 rounded-md"
        />
      </div>
    );

    setCustoms((prev) => [...prev, template]);
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
          {skip === true && (
            <button
              className="rounded-md text-white px-3 py-2"
              style={{
                backgroundColor: "var(--orange)",
              }}
              onClick={nextToProperties}
            >
              Skip
            </button>
          )}
        </div>

        <form name="add_essentials" method="POST" onSubmit={handleSubmit}>
          <div className="mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3" id="essential-con">
              <div className="form-element md:mr-2">
                <label className="form-label">School</label>
                <input
                  type="text"
                  name="school"
                  value={essentials?.school}
                  onChange={inputHandler}
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element md:mr-2">
                <label className="form-label">Hospital</label>
                <input
                  type="text"
                  name="hospital"
                  value={essentials?.hospital}
                  onChange={inputHandler}
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element md:mr-2">
                <label className="form-label">Bus Stop</label>
                <input
                  type="text"
                  name="bus_stop"
                  value={essentials?.bus_stop}
                  onChange={inputHandler}
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element md:mr-2">
                <label className="form-label">Airport</label>
                <input
                  type="text"
                  name="airport"
                  value={essentials?.airport}
                  onChange={inputHandler}
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element md:mr-2">
                <label className="form-label">Train</label>
                <input
                  type="text"
                  name="train"
                  value={essentials?.train}
                  onChange={inputHandler}
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element md:mr-2">
                <label className="form-label">Market</label>
                <input
                  type="text"
                  name="market"
                  value={essentials?.market}
                  onChange={inputHandler}
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              <div className="form-element md:mr-2">
                <label className="form-label">Restaurent</label>
                <input
                  type="text"
                  name="restaurent"
                  value={essentials?.restaurent}
                  onChange={inputHandler}
                  placeholder="eg: 1KM"
                  className="form-input border-gray-200 rounded-md"
                />
              </div>
              {customs.length > 0 && customs.map((c) => c)}
              <button
                type="button"
                data-tip="Add New"
                onClick={addNewCustom}
                className="bg-white py-10 rounded-sm border border-gray-200 flex items-center justify-center"
              >
                <FiPlus />
                <ReactTooltip />
              </button>
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
