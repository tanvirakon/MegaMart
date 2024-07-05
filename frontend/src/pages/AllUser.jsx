import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import EditUserModal from "../modals/EditUserModal.jsx";

const AllUser = () => {
  const [alluser, setAllUser] = useState([]);
  const [modal, setModal] = useState(false);
  const [selctedUser, setSelctedUser] = useState(null);

  const openModal = (user) => {
    setSelctedUser(user);
    setModal(true);
  };

  const userList = async () => {
    const res = await axios.get(
      "http://localhost:3000/all_user"
      //   , {
      //   withCredentials: "include",
      // }
    );
    if (res.data.success) setAllUser(res.data.data);
    else toast.error(res);
  };
  useEffect(() => {
    userList();
  }, []);
  return (
    <div className="p-4 ">
      <table className="border-collapse border border-slate-200 w-full bg-white">
        <thead>
          <tr className="h-10 bg-black text-white">
            <th className="border border-slate-200 ">sr</th>
            <th className="border border-slate-200">name</th>
            <th className="border border-slate-200">email</th>
            <th className="border border-slate-200">role</th>
            <th className="border border-slate-200">action</th>
          </tr>
        </thead>
        <tbody>
          {alluser.map((user, index) => (
            <tr key={index} className="text-center h-16 ">
              <td className="border border-slate-200 ">{index + 1}</td>
              <td className="border border-slate-200">{user?.name}</td>
              <td className="border border-slate-200">{user?.email}</td>
              <td className="border border-slate-200">{user?.role}</td>
              <td className="border border-slate-200">
                <button
                  onClick={() => {
                    openModal(user);
                  }}
                >
                  <MdEdit className="bg-green-200 rounded-full text-3xl p-1 hover:bg-green-400 hover:text-white" />
                </button>
                {modal && (
                  <EditUserModal
                    userFunc={userList}
                    user={selctedUser}
                    onclose={() => {
                      setModal(false);
                    }}
                  />
                )}
                {/* emne na dile direct user pathaye dle always last r ta pawa jay */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
//modal toiri krbo
export default AllUser;
