import React from "react";
import { FaTimes } from "react-icons/fa";
import ImageUploading from "react-images-uploading";

function ImageUploader({
  images,
  onChange,
  setCover,
  uploaded,
  onChangeUpload,
  index,
  remover,
}) {
  const removeImage = (i) => {
    remover((prev) => ({
      ...prev,
      [index]: [...prev[index], uploaded[i]],
    }));
    onChangeUpload((prev) => ({
      ...prev,
      [index]: prev[index].filter((img) => img !== uploaded[i]),
    }));
  };

  return (
    <div
      className="flex flex-col w-full mt-5"
      style={{ fontFamily: "Opensans-semi-bold" }}
    >
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={5}
        maxFileSize={1000000}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
          errors,
        }) => (
          // write your building UI
          <div className="flex flex-col">
            {errors && (
              <div className="pb-2 text-red-500">
                {errors.maxNumber && (
                  <span>Only 5 images are allowed per section.</span>
                )}
                {errors.acceptType && (
                  <span>Your selected file type is not allowed.</span>
                )}
                {errors.maxFileSize && (
                  <span>Image size must be not excced to 1mb</span>
                )}
              </div>
            )}
            <div className="flex items-center">
              <label
                type="button"
                style={
                  isDragging
                    ? { color: "var(--blue)", borderColor: "var(--blue)" }
                    : undefined
                }
                onClick={onImageUpload}
                {...dragProps}
                className="w-full p-5 bg-white rounded-md border-2 border-dotted border-gray-200"
              >
                Click or Drop here
              </label>
              <button
                type="button"
                className="px-3 py-2 rounded-md text-white bg-red-500 md:w-28 md:ml-3"
                onClick={onImageRemoveAll}
              >
                Remove all
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 md:space-x-3 mt-3">
              {imageList.map((image, index) => (
                <div
                  key={index}
                  className="m-1"
                  className="relative flex flex-col items-center border-2 border-dashed boder-gray-200"
                >
                  <img
                    src={image["data_url"]}
                    alt=""
                    className="w-full h-52 object-cover"
                  />
                  <div
                    className="flex items-center justify-evenly m-2"
                    style={{ fontFamily: "Opensans-regular" }}
                  >
                    <button
                      type="button"
                      className="text-3xs p-2 rounded-md text-white bg-green-400"
                      onClick={() => onImageUpdate(index)}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="text-3xs p-2 ml-1 rounded-md text-white bg-red-400"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                  <label className="absolute right-1 top-1 w-7 h-7 flex items-center justify-center rounded-full bg-gray-50">
                    <input
                      type="radio"
                      name="cover"
                      value={index}
                      onChange={(e) =>
                        e.target.checked && setCover(images[index].file)
                      }
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
      {/**uploaded images */}
      {uploaded?.length > 0 && (
        <>
          <h6 style={{ fontFamily: "Opensans-bold" }} className="mt-3">
            Uploaded Images
          </h6>
          <div className="grid grid-cols-2 md:grid-cols-5 md:space-x-3 mt-3">
            {uploaded.map((g, i) => (
              <div className="bg-white border p-1 rounded-md relative" key={i}>
                <img
                  src={g}
                  alt={`image-${i}`}
                  className="h-full w-full object-contain"
                />
                <div
                  onClick={() => removeImage(i)}
                  className="bg-white cursor-pointer w-10 h-10 flex items-center justify-center rounded-full absolute -right-3 -top-3 border"
                >
                  <FaTimes className="text-lg text-red-500" />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ImageUploader;
