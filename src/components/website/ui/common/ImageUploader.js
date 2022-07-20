import React from "react";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
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
                className="w-full p-5 bg-white rounded-md border-2 border-dotted border-gray-600"
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
                  className="m-1 relative flex flex-col items-center border-2 border-dashed boder-gray-600"
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
                  <label className="absolute left-0 w-full bottom-12 px-2 h-7 flex items-center justify-center rounded-full bg-gray-50">
                    <input
                      type="radio"
                      name="cover"
                      value={index}
                      onChange={(e) =>
                        e.target.checked && setCover(images[index].file)
                      }
                    />
                    <span className="text-gray-500 ml-2">Make Cover Photo</span>
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
              <div
                className="bg-white border border-gray-600 p-1 rounded-md relative"
                key={i}
              >
                <img
                  src={g}
                  alt={`image-${i}`}
                  className="h-full w-full object-contain"
                />
                <label className="absolute left-2 top-2 px-3 h-7 flex items-center justify-center rounded-full bg-gray-50">
                  <input
                    type="radio"
                    name="cover"
                    value={index}
                    className="mr-1"
                    onChange={(e) => e.target.checked && setCover(g)}
                  />
                  <span className="text-gray-500">Make Cover Photo</span>
                </label>
                <div
                  onClick={() => removeImage(i)}
                  className="bg-white cursor-pointer w-8 h-8 flex items-center justify-center rounded-full absolute right-2 bottom-2 border"
                >
                  <FaTrashAlt className="text-lg text-red-500" />
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
