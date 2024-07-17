import React, { useEffect, useState } from "react";
import pic1 from "../images/sliderImages/pic1.jpg";
import pic2 from "../images/sliderImages/pic2.jpg";
import pic3 from "../images/sliderImages/pic3.jpg";
import pic4 from "../images/sliderImages/pic4.webp";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Carosoul = () => {
  const imgArray = [pic1, pic4, pic2, pic3, pic4];
  const [imgIndex, setImgIndex] = useState(2);
  const nextimg = () => {
    setImgIndex((prev) => (prev === 3 ? 0 : prev + 1));
  };
  const previmg = () => {
    setImgIndex((prev) => (prev === 0 ? 3 : prev - 1));
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextimg();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="h-[450px] ml-4 mr-4 relative">
      <img
        src={imgArray[imgIndex]}
        alt=""
        className="h-full w-full rounded-md"
      />
      <div className="flex justify-between items-center h-full absolute top-0 left-0 right-0 px-6">
        <button
          className="text-white text-2xl"
          onClick={() => {
            previmg();
          }}
          >
          <FaArrowLeft />
        </button>
        <button
          className="text-white text-2xl"
          onClick={() => {
            nextimg();
          }}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Carosoul;
