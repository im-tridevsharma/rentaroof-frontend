import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ImageUploader from "./ImageUploader";
import Loader from "../../../loader";
import { addPropertyGallery } from "../../../../lib/frontend/properties";
import { toast } from "react-toastify";
import { getPropertyGalleryById } from "../../../../lib/frontend/share";

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
  const [tobeRemoved, setTobeRemoved] = useState({
    exterior_view: [],
    living_room: [],
    bedrooms: [],
    bathrooms: [],
    kitchen: [],
    floor_plan: [],
    master_plan: [],
    location_map: [],
  });
  const [images, setImages] = useState({
    exterior_view: [],
    living_room: [],
    bedrooms: [],
    bathrooms: [],
    kitchen: [],
    floor_plan: [],
    master_plan: [],
    location_map: [],
  });

  const [skip, setSkip] = useState(true);
  const [back, setBack] = useState(false);

  useEffect(() => {
    const ids = code.split("-");
    setPropertyId(ids[ids.length - 1]);
    setIsLoading(true);

    (async () => {
      if (router.query.mode === "update") {
        const gallery = await getPropertyGalleryById(ids[ids.length - 1]);
        if (gallery?.status) {
          setImages({
            exterior_view: JSON.parse(gallery?.data?.exterior_view),
            living_room: JSON.parse(gallery?.data?.living_room),
            bedrooms: JSON.parse(gallery?.data?.bedrooms),
            bathrooms: JSON.parse(gallery?.data?.bathrooms),
            kitchen: JSON.parse(gallery?.data?.kitchen),
            floor_plan: JSON.parse(gallery?.data?.floor_plan),
            master_plan: JSON.parse(gallery?.data?.master_plan),
            location_map: JSON.parse(gallery?.data?.location_map),
          });
          setIsLoading(false);
        } else {
          setIsLoading(false);
          toast.error(gallery.error || gallery.message);
        }
      } else {
        setIsLoading(false);
      }
    })();
    setSkip(router.query.skip || true);
    setBack(router.query.back || false);
  }, []);

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
    setSkip(router.query.skip || true);
    setBack(router.query.back || false);
  }, []);

  const nextToAddress = () => {
    localStorage.setItem("next_ap", "ADDRESS");
    if (back) {
      router.push("properties");
    } else {
      router.push(
        "?step=next&next=ADDRESS&id=" +
          code +
          (router.query?.mode ? "&mode=" + router.query.mode : "")
      );
    }
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

    // images to be removed
    formdata.append("remove_exterior", tobeRemoved.exterior_view.join(","));
    formdata.append("remove_living_room", tobeRemoved.living_room.join(","));
    formdata.append("remove_bedrooms", tobeRemoved.bedrooms.join(","));
    formdata.append("remove_bathrooms", tobeRemoved.bathrooms.join(","));
    formdata.append("remove_kitchen", tobeRemoved.kitchen.join(","));
    formdata.append("remove_floor_plan", tobeRemoved.floor_plan.join(","));
    formdata.append("remove_master_plan", tobeRemoved.master_plan.join(","));
    formdata.append("remove_location_map", tobeRemoved.location_map.join(","));

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
          {skip === true && (
            <button
              className="rounded-md text-white px-3 py-2"
              style={{
                backgroundColor: "var(--orange)",
              }}
              onClick={nextToAddress}
            >
              Skip
            </button>
          )}
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
              uploaded={images?.exterior_view}
              onChangeUpload={setImages}
              index="exterior_view"
              remover={setTobeRemoved}
            />
          )}
          {activeTab === "living_room" && (
            <ImageUploader
              setCover={setCoverImage}
              images={livingRoomImages}
              onChange={onChangeLivingRoomImages}
              uploaded={images?.living_room}
              onChangeUpload={setImages}
              index="living_room"
              remover={setTobeRemoved}
            />
          )}
          {activeTab === "bedrooms" && (
            <ImageUploader
              setCover={setCoverImage}
              images={bedroomImages}
              onChange={onChangeBedroomImages}
              uploaded={images?.bedrooms}
              onChangeUpload={setImages}
              index="bedrooms"
              remover={setTobeRemoved}
            />
          )}
          {activeTab === "bathrooms" && (
            <ImageUploader
              setCover={setCoverImage}
              images={bathroomImages}
              onChange={onChangeBathroomImages}
              uploaded={images?.bathrooms}
              onChangeUpload={setImages}
              index="bathrooms"
              remover={setTobeRemoved}
            />
          )}
          {activeTab === "kitchen" && (
            <ImageUploader
              setCover={setCoverImage}
              images={kitchenImages}
              onChange={onChangeKitchenImages}
              uploaded={images?.kitchen}
              onChangeUpload={setImages}
              index="kitchen"
              remover={setTobeRemoved}
            />
          )}
          {activeTab === "floor_plan" && (
            <ImageUploader
              setCover={setCoverImage}
              images={floorPlanImages}
              onChange={onChangeFloorPlanImages}
              uploaded={images?.floor_plan}
              onChangeUpload={setImages}
              index="floor_plan"
              remover={setTobeRemoved}
            />
          )}
          {activeTab === "master_plan" && (
            <ImageUploader
              setCover={setCoverImage}
              images={masterPlanImages}
              onChange={onChangeMasterPlanImages}
              uploaded={images?.master_plan}
              onChangeUpload={setImages}
              index="master_plan"
              remover={setTobeRemoved}
            />
          )}
          {activeTab === "location_map" && (
            <ImageUploader
              setCover={setCoverImage}
              images={locationMapImages}
              onChange={onChangeLocationMapImages}
              uploaded={images?.location_map}
              onChangeUpload={setImages}
              index="location_map"
              remover={setTobeRemoved}
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
