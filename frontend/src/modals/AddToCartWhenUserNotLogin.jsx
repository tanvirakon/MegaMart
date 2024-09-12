import React, { useRef } from "react";
import LoginPage from "../pages/LoginPage.jsx";
import { IoMdClose } from "react-icons/io";

const AddToCartWhenUserNotLogin = ({ onclose }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current == e.target) onclose();
  };
  return (
    <div
      className="bg-black fixed bg-opacity-30 top-0 bottom-0 left-0 right-0 flex justify-center text-left items-center"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className="w-[500px]  bg-white rounded-xl p-4 relative h-[450px]">
        <IoMdClose
          className="absolute right-6 text-red-400 cursor-pointer"
          onClick={onclose}
        />
        <LoginPage heading={"you are not logged in"} onclose={onclose} />
      </div>
    </div>
  );
};

export default AddToCartWhenUserNotLogin;
