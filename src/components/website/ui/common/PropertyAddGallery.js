import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImageUploader from "./ImageUploader";
import Loader from "../../../loader";
import { addPropertyGallery } from "../../../../lib/frontend/properties";

function PropertyAddGallery({ code }) {
  const [propertyId, setPropertyId] = useState("");
  const [activeTab, setActiveTab] = useState("exterior");
  const [isLoading, setIsLoading] = useState(false);
  const [exteriorImages, setExteriorImages] = useState([]);
  const [livingRoomImages, setLivingRoomImages] = useState([]);
  const [bedroomImages, setBedroomImages] = useState([]);
  const [bathroomImages, setBathroomImages] = useState([]);
  const [kitchenImages, setKitchenImages] = useState([]);
  const [floorPlanImages, setFloorPlanImages] = useState([]);
  const [masterPlanImages, setMasterPlanImages] = useState([]);
  const [locationMapImages, setLocationMapImages] = useState([]);
  const [coverImage, setCoverImage] = useState("");

  const onChangeExteriorImages = (imageList, addUpdateIndex) => {
    setExteriorImages(imageList);
  };

  const onChangeLivingRoomImages = (imageList, addUpdateIndex) => {
    setLivingRoomImages(imageList);
  };

  const onChangeBedroomImages = (imageList, addUpdateIndex) => {
    setBedroomImages(imageList);
  };

  const onChangeBathroomImages = (imageList, addUpdateIndex) => {
    setBathroomImages(imageList);
  };

  const onChangeKitchenImages = (imageList, addUpdateIndex) => {
    setKitchenImages(imageList);
  };

  const onChangeFloorPlanImages = (imageList, addUpdateIndex) => {
    setFloorPlanImages(imageList);
  };

  const onChangeMasterPlanImages = (imageList, addUpdateIndex) => {
    setMasterPlanImages(imageList);
  };

  const onChangeLocationMapImages = (imageList, addUpdateIndex) => {
    setLocationMapImages(imageList);
  };

  const router = useRouter();

  useEffect(() => {
    const ids = code.split("-");
    setPropertyId(ids[ids.length - 1]);
  }, []);

  const nextToAddress = () => {
    localStorage.setItem("next_ap", "ADDRESS");
    router.push("?step=next&next=ADDRESS&id=" + code);
  };

  const handleImageUpload = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formdata = new FormData();
    exteriorImages.forEach((image) => {
      formdata.append("exterior[]", image.file);
    });
    livingRoomImages.forEach((image) => {
      formdata.append("living_room[]", image.file);
    });
    bedroomImages.forEach((image) => {
      formdata.append("bedrooms[]", image.file);
    });
    bathroomImages.forEach((image) => {
      formdata.append("bathrooms[]", image.file);
    });
    kitchenImages.forEach((image) => {
      formdata.append("kitchen[]", image.file);
    });
    floorPlanImages.forEach((image) => {
      formdata.append("floor_plan[]", image.file);
    });
    masterPlanImages.forEach((image) => {
      formdata.append("master_plan[]", image.file);
    });
    locationMapImages.forEach((image) => {
      formdata.append("location_map[]", image.file);
    });

    formdata.append("cover", coverImage);
    formdata.append("propertyId", propertyId);

    if (formdata) {
      submitData(formdata);
    } else {
      setIsLoading(false);
    }
  };

  const submitData = async (id, data) => {
    const response = await addPropertyGallery(id, data);
    if (response?.status) {
      setIsLoading(false);
      nextToAddress();
    } else {
      setIsLoading(false);
      console.error(response?.error || response?.message);
    }
  };

  return (
    <>
      {isLoading && (
        <Loader info="Please wait! It will take some time to process all the images." />
      )}
      <div className="flex flex-col">
        {/**header */}
        <div
          className="flex items-center justify-between"
          style={{ fontFamily: "Opensans-semi-bold" }}
        >
          <h5>Add Images</h5>
          <button
            className="rounded-md text-white px-3 py-2"
            style={{
              backgroundColor: "var(--orange)",
            }}
            onClick={nextToAddress}
          >
            Skip
          </button>
        </div>

        <div
          className="flex items-center justify-between border-gray-200 mt-5"
          style={{ borderBottomWidth: "1px", fontFamily: "Opensans-bold" }}
        >
          <button
            className="border-b-2 border-transparent pb-1"
            onClick={() => setActiveTab("exterior")}
            style={{
              borderColor:
                activeTab === "exterior" ? "var(--blue)" : "transparent",
            }}
          >
            Exterior View
          </button>
          <button
            className="border-b-2 border-transparent pb-1"
            onClick={() => setActiveTab("living_room")}
            style={{
              borderColor:
                activeTab === "living_room" ? "var(--blue)" : "transparent",
            }}
          >
            Living Room
          </button>
          <button
            className="border-b-2 border-transparent pb-1"
            onClick={() => setActiveTab("bedrooms")}
            style={{
              borderColor:
                activeTab === "bedrooms" ? "var(--blue)" : "transparent",
            }}
          >
            Bedrooms
          </button>
          <button
            className="border-b-2 border-transparent pb-1"
            onClick={() => setActiveTab("bathrooms")}
            style={{
              borderColor:
                activeTab === "bathrooms" ? "var(--blue)" : "transparent",
            }}
          >
            Bathrooms
          </button>
          <button
            className="border-b-2 border-transparent pb-1"
            onClick={() => setActiveTab("kitchen")}
            style={{
              borderColor:
                activeTab === "kitchen" ? "var(--blue)" : "transparent",
            }}
          >
            Kitchen
          </button>

          <button
            className="border-b-2 border-transparent pb-1"
            onClick={() => setActiveTab("floor_plan")}
            style={{
              borderColor:
                activeTab === "floor_plan" ? "var(--blue)" : "transparent",
            }}
          >
            Floor Plan
          </button>
          <button
            className="border-b-2 border-transparent pb-1"
            onClick={() => setActiveTab("master_plan")}
            style={{
              borderColor:
                activeTab === "master_plan" ? "var(--blue)" : "transparent",
            }}
          >
            Master Plan
          </button>
          <button
            className="border-b-2 border-transparent pb-1"
            onClick={() => setActiveTab("location_map")}
            style={{
              borderColor:
                activeTab === "location_map" ? "var(--blue)" : "transparent",
            }}
          >
            Location Map
          </button>
        </div>

        {/**images containers */}
        <form
          name="add_gallery"
          className="flex flex-col items-start"
          encType="multipart/form-data"
          method="POST"
          onSubmit={handleImageUpload}
        >
          {activeTab === "exterior" && (
            <ImageUploader
              setCover={setCoverImage}
              images={exteriorImages}
              onChange={onChangeExteriorImages}
            />
          )}
          {activeTab === "living_room" && (
            <ImageUploader
              setCover={setCoverImage}
              images={livingRoomImages}
              onChange={onChangeLivingRoomImages}
            />
          )}
          {activeTab === "bedrooms" && (
            <ImageUploader
              setCover={setCoverImage}
              images={bedroomImages}
              onChange={onChangeBedroomImages}
            />
          )}
          {activeTab === "bathrooms" && (
            <ImageUploader
              setCover={setCoverImage}
              images={bathroomImages}
              onChange={onChangeBathroomImages}
            />
          )}
          {activeTab === "kitchen" && (
            <ImageUploader
              setCover={setCoverImage}
              images={kitchenImages}
              onChange={onChangeKitchenImages}
            />
          )}
          {activeTab === "floor_plan" && (
            <ImageUploader
              setCover={setCoverImage}
              images={floorPlanImages}
              onChange={onChangeFloorPlanImages}
            />
          )}
          {activeTab === "master_plan" && (
            <ImageUploader
              setCover={setCoverImage}
              images={masterPlanImages}
              onChange={onChangeMasterPlanImages}
            />
          )}
          {activeTab === "location_map" && (
            <ImageUploader
              setCover={setCoverImage}
              images={locationMapImages}
              onChange={onChangeLocationMapImages}
            />
          )}

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

export default PropertyAddGallery;
