import React, { useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const DeleteUserModal = ({ onclose, email }) => {
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current == e.target) onclose();
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/delete/${email}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else toast.error(response.data.message);
      onclose();
      userFunc();
    } catch (error) {
      console.log("err", error);
    }
  };
  return (
    <div
      className="bg-black fixed bg-opacity-30 top-0 bottom-0 left-0 right-0 flex justify-center text-left items-center"
      ref={modalRef}
      onClick={closeModal}
    >
      <div className="w-[350px] max-w-full bg-white rounded-xl p-4 flex  flex-col relative gap-4">
        <IoMdClose
          className="absolute right-2 top-2 text-red-400 cursor-pointer"
          onClick={onclose}
        />
        <h1 className="text-2xl">confirm delete user ? </h1>

        <div className="flex gap-3">
          <button
            className=" bg-red-400 p-2 rounded-md text-white w-full"
            onClick={() => {
              deleteUser();
            }}
          >
            okay
          </button>
          <button
            className=" bg-green-400 p-2 rounded-md text-white w-full"
            onClick={() => {
              onclose();
            }}
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
