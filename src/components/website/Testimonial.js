import React, { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";

function Testimonial({ bgImage, title, testimonials }) {
  const [index, setIndex] = useState(1);
  const [opacity, setOpacity] = useState(100);

  const handleNext = () => {
    if (index >= testimonials?.length) {
      setIndex(1);
    } else {
      setOpacity(5);
      setIndex(index + 1);
      setTimeout(() => {
        setOpacity(100);
      }, 200);
    }
  };

  const handlePrev = () => {
    if (index <= 1) {
      setIndex(1);
    } else {
      setOpacity(5);
      setIndex(index - 1);
      setTimeout(() => {
        setOpacity(100);
      }, 200);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, .5), rgba(0, 0, 0, 0.5)),url(${bgImage})`,
        backgroundPosition: "top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="px-10 py-5 flex flex-col items-center text-white"
    >
      <h4 className="text-lg my-10 sm:my-5">{title}</h4>
      <div className="flex items-center sm:items-start  justify-between mt-1 sm:mt-5 w-full">
        <div className="mr-5 cursor-pointer" onClick={handlePrev}>
          <FiArrowLeftCircle className="text-4xl" />
        </div>
        <div className="block overflow-hidden">
          {testimonials[index - 1] && (
            <div
              className={`w-full sm:w-1/2 float-left transition-all duration-300 opacity-${opacity}`}
            >
              <p className="text-gray-200">{testimonials[index - 1]?.text}</p>
              <p className="text-gray-100 mt-5">
                <b className="pr-2 border-r-2 border-gray-300 mr-2">
                  {testimonials[index - 1]?.author}
                </b>
                <span>{testimonials[index - 1]?.subtitle}</span>
              </p>
            </div>
          )}
          {testimonials[index] && (
            <div
              className={`w-full hidden sm:block sm:w-1/2 float-left transition-all duration-300 opacity-${opacity}`}
            >
              <p className="text-gray-200">{testimonials[index]?.text}</p>
              <p className="text-gray-100 mt-5">
                <b className="pr-2 border-r-2 border-gray-300 mr-2">
                  {testimonials[index]?.author}
                </b>
                <span>{testimonials[index]?.subtitle}</span>
              </p>
            </div>
          )}
        </div>
        <div className="ml-5 cursor-pointer" onClick={handleNext}>
          <FiArrowRightCircle className="text-4xl" />
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
