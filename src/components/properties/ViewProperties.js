import React, { useEffect, useState } from "react";
import moment from "moment";
import Loader from "../loader";
import { verifyProperty } from "../../lib/properties";

function ViewProperties({ property }) {
  const [gallery, setGallery] = useState(null);
  const [galleryContent, setGalleryContent] = useState({});
  const [activeGallery, setActiveGallery] = useState("exterior_view");
  const [essential, setEssential] = useState(null);
  const [address, setAddress] = useState(null);
  const [amenities, setAmenities] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (property?.gallery) {
      setGallery(property.gallery);
      property.gallery &&
        Object.keys(property.gallery).forEach((key) => {
          !["id", "property_id", "created_at", "updated_at", "others"].includes(
            key
          ) &&
            setGalleryContent((prev) => ({
              ...prev,
              [key]: JSON.parse(property.gallery[key]),
            }));
        });
    }
    setIsVerified(property?.is_approved);
    if (property?.essential) {
      setEssential(property.essential);
    }
    if (property?.amenities_data) {
      setAmenities(property.amenities_data);
    }
    if (property?.address) {
      setAddress(property.address);
    }
  }, [property]);

  const setFrontViewImage = (img) => {
    document.querySelector("#front-img").src = img;
  };

  const propertyVerification = (option) => {
    if (option) {
      setIsLoading(true);
      (async () => {
        const response = await verifyProperty(property?.id, { status: option });
        if (response?.status) {
          setIsLoading(false);
          setIsVerified(option === "verify" ? true : false);
        } else {
          setIsLoading(false);
          console.error(response?.message || response?.error);
        }
      })();
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex flex-col">
        {/**front images */}
        <div className="flex justify-between md:flex-row flex-col">
          <div className="flex-grow h-96">
            <img
              src={property?.front_image || "/images/website/no_photo.png"}
              alt="front-image"
              className="w-full h-full object-cover"
              id="front-img"
            />
          </div>
          <div className="flex items-center md:w-96 w-full flex-col md:mt-0 mt-3">
            <div className="flex items-center w-full overflow-x-auto px-2 md:ml-3">
              {gallery &&
                typeof gallery === "object" &&
                Object.keys(gallery).map((key, i) => {
                  return (
                    ![
                      "id",
                      "property_id",
                      "created_at",
                      "updated_at",
                      "others",
                    ].includes(key) && (
                      <div
                        onClick={() => setActiveGallery(key)}
                        className={`px-2 cursor-pointer py-1 rounded-md mx-1 font-bold text-xs text-white ${
                          activeGallery === key ? "bg-green-500" : "bg-blue-500"
                        }`}
                        key={i}
                      >
                        <p className="min-w-max">
                          {key.toUpperCase()?.replace("_", " ")}
                        </p>
                      </div>
                    )
                  );
                })}
            </div>
            <div className="overflow-y-auto" style={{ height: "360px" }}>
              {activeGallery && galleryContent[activeGallery]?.length > 0 ? (
                <div className="grid grid-cols-2 px-1 mt-3">
                  {galleryContent[activeGallery].map((img, k) => (
                    <div key={k} className="m-1 overflow-hidden">
                      <img
                        src={img}
                        alt={k}
                        className="w-full h-full object-cover"
                        onClick={() => setFrontViewImage(img)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-red-500 mt-3">No images found!</p>
              )}
            </div>
          </div>
        </div>
        <hr />
        {/**information */}
        <div className="flex flex-col mt-5 px-2">
          <div className="form-element">
            <label className="text-blue-600">Property Name</label>
            <p className="pl-2">{property?.name}</p>
          </div>
          <div className="form-element">
            <label className="text-blue-600">Short Description</label>
            <p className="pl-2">{property?.short_description}</p>
          </div>
          <div className="form-element">
            <label className="text-blue-600">Description</label>
            <p
              className="pl-2"
              dangerouslySetInnerHTML={{ __html: property?.description }}
            />
          </div>
          <hr className="mb-3" />
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="form-element">
              <label className="text-blue-600">Property For</label>
              <p className="pl-2 capitalize">{property?.for}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Property Type</label>
              <p className="pl-2 capitalize">{property?.type}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Posting As</label>
              <p className="pl-2 capitalize">
                {property?.posting_as?.replace("_", " ")}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3">
            <div className="form-element">
              <label className="text-blue-600">Furnished Status</label>
              <p className="pl-2 capitalize">{property?.furnished_status}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Ownership Type</label>
              <p className="pl-2 capitalize">{property?.ownership_type}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Maintenence Duration</label>
              <p className="pl-2 capitalize">
                {property?.maintenence_duration}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Bedrooms</label>
              <p className="pl-2 capitalize">{property?.bedrooms}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Bathrooms</label>
              <p className="pl-2 capitalize">{property?.bathrooms}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Balconies</label>
              <p className="pl-2 capitalize">{property?.balconies}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Floors</label>
              <p className="pl-2 capitalize">{property?.floors}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Carpet Area</label>
              <p className="pl-2 capitalize">
                {property?.carpet_area + " " + property?.carpet_area_unit}
              </p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Super Area</label>
              <p className="pl-2 capitalize">
                {property?.super_area + " " + property?.super_area_unit}
              </p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Available From</label>
              <p className="pl-2 capitalize">
                {moment(property?.available_from).format("DD-MM-YYYY")}
              </p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Available Immediate</label>
              <p className="pl-2 capitalize">
                {property?.available_immediatly == 1 ? "Yes" : "No"}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Age of construction</label>
              <p className="pl-2 capitalize">{property?.age_of_construction}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Monthly Rent</label>
              <p className="pl-2 capitalize">Rs. {property?.monthly_rent}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Security Deposit</label>
              <p className="pl-2 capitalize">
                Rs. {property?.security_deposit || 0}
              </p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Maintenence Charge</label>
              <p className="pl-2 capitalize">
                Rs. {property?.maintenence_charge}
              </p>
            </div>
          </div>

          <hr className="mb-2" />
          {/**essentials */}
          <h6 className="mb-3">Property Essentials</h6>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">School</label>
              <p className="pl-2 capitalize">{essential?.school || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Hospital</label>
              <p className="pl-2 capitalize">{essential?.hospital || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Bus stop</label>
              <p className="pl-2 capitalize">{essential?.bus_stop || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Airport</label>
              <p className="pl-2 capitalize">{essential?.airport || "-"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Train</label>
              <p className="pl-2 capitalize">{essential?.train || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Market</label>
              <p className="pl-2 capitalize">{essential?.market || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Restaurent</label>
              <p className="pl-2 capitalize">{essential?.restaurent || "-"}</p>
            </div>
          </div>
          <hr className="mb-2" />
          <h6 className="mb-3">Property Amenities</h6>
          <div className="grid grid-cols-2 md:grid-cols-4 mb-2">
            {amenities &&
              amenities.map((a, i) => (
                <div className="flex items-center" key={i}>
                  <img
                    src={a?.icon}
                    alt={i}
                    className="w-12 h-12 object-contain mr-3"
                  />
                  <p>{a.title}</p>
                </div>
              ))}
          </div>
          <hr className="mb-2" />
          <h6 className="mb-3">Action</h6>
          <div className="felx items-center mb-5">
            <button
              className="px-2 py-1 rounded-md text-white bg-green-400"
              onClick={() => propertyVerification("verify")}
            >
              Verify
            </button>
            <button
              className="px-2 py-1 rounded-md text-white bg-red-400 mx-3"
              onClick={() => propertyVerification("reject")}
            >
              Reject
            </button>

            <p className="inline ml-3">
              <b>Verified:</b> {isVerified ? "Yes" : "No"}
            </p>
          </div>
          <hr className="mb-2" />
          <h6 className="mb-3">Address</h6>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <div className="form-element">
              <label className="text-blue-600">Landmark</label>
              <p className="pl-2 capitalize">{address?.landmark || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">House Number</label>
              <p className="pl-2 capitalize">{address?.house_number || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Full Address</label>
              <p className="pl-2 capitalize">{address?.full_address || "-"}</p>
            </div>
            <div className="form-element">
              <label className="text-blue-600">Lattitude and Longitude</label>
              <p className="pl-2 capitalize">
                {address ? address?.lat + "-" + address?.long : "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProperties;
