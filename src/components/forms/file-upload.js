import Image from "next/image";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function FileUpload(props) {
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    getBase64(e.target.files[0]).then((data) => {
      setImage(data);
    });
  };

  return (
    <div className="flex items-center justify-center relative">
      <label
        htmlFor="fileupload"
        className={`${
          props.error ? "bg-red-300" : "bg-gray-300"
        } rounded-full overflow-hidden cursor-pointer ${
          props.size === "small" ? "w-10 h-10" : "w-24 h-24 "
        }`}
      >
        <input
          type="file"
          name={props.name}
          hidden
          accept="image/*"
          onChange={handleChange}
          id="fileupload"
        />
        {(image || props.value) && (
          <Image
            className="object-cover"
            src={image || props.value}
            width={props.size === "small" ? 50 : 100}
            height={props.size === "small" ? 50 : 100}
          />
        )}
        <FiUpload
          className="absolute bottom-3 
        text-gray-500 text-2xl left-1/2 
        transform -translate-x-1/2 "
        />
      </label>
    </div>
  );
}

export default FileUpload;
