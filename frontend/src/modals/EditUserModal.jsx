import React, { useRef, useState } from "react";
import role from "../helper/role.js";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const EditUserModal = ({ user, onclose, userFunc }) => {
  const [userRole, setUserRole] = useState("admin");
  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current == e.target) onclose();
  };
  //   ekhn screen e jekoo jaygay click krleo modal bndho hye jbe
  const roleChanged = (e) => {
    setUserRole(e.target.value);
  };
  const updateRole = async () => {
    try {
      const newRole = {
        userRole: userRole,
      };
      const findUser = await axios.put(
        `http://localhost:3000/update_role/${user.email}`,
        newRole
      );
      if (findUser.data.data) {
        toast.success(findUser.data.message);
      } else toast.error(findUser.data.message);
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
          className="absolute right-6 text-red-400 cursor-pointer"
          onClick={onclose}
        />
        <h1 className="text-2xl font-semibold">change user role</h1>
        <p>Name : {user?.name}</p>
        <p>Email : {user?.email}</p>
        <div className="flex justify-between">
          <p>Role:</p>
          <select className="border p-2" onChange={roleChanged}>
            {Object.entries(role).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <button
          className=" bg-red-400 p-2 rounded-md text-white"
          onClick={updateRole}
        >
          okay
        </button>
      </div>
    </div>
  );
};

export default EditUserModal;
