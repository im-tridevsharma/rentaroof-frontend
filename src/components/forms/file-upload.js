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

function FileUpload({ name }) {
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
        className="w-24 h-24 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
      >
        <input
          type="file"
          name={name}
          hidden
          accept="image/*"
          onChange={handleChange}
          id="fileupload"
        />
        {image && (
          <Image
            className="object-cover"
            src={image}
            width={100}
            height={100}
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
