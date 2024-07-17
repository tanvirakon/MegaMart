import React, { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { FaSearchengin } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logout from "../pages/LogoutPage";

function Navbar() {
  const { userInfo } = useSelector((state) => state.user); //reducer r name chilo "user" in store.js
  // app.js ei setUserDetails() e value set krclm
  const [adminPopup, setAdminPopup] = useState(false);
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow-md ">
      <div className="ml-10">
        <Link to="/" className="flex">
          <img
            src="./src/images/logo.jpeg"
            alt=""
            className="h-[50px] mix-blend-multiply"
          />
          <h1 className="text-2xl ml-1 flex justify-center items-center text-green-700 font-serif font-semibold">
            MegaMart
          </h1>
        </Link>
      </div>
      <div className="hidden sm:flex items-center ">
        <div>
          <FaSearchengin className="mr-2 h-[20px] w-5" />
        </div>
        <input
          type="text"
          placeholder="search for product..."
          className="border-2 rounded-full px-2 border-gray-200 outline-none focus:shadow"
        />
      </div>
      <div className="mr-10">
        <ul className="flex gap-10">
          <li>
            <div className="relative flex justify-center">
              <div>
                {/* jdi login hy then -> jdi pic thake pic show, na tkle icon show..login na hle kno kisui na */}
                {userInfo &&
                  (userInfo?.picture ? (
                    <img
                      src={userInfo.picture}
                      alt={userInfo.name}
                      className="size-8 rounded-full cursor-pointer"
                      onClick={() => {
                        setAdminPopup((prev) => {
                          return (prev = !prev);
                        });
                      }}
                    />
                  ) : (
                    <FaRegUserCircle
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        setAdminPopup((prev) => {
                          return (prev = !prev);
                        });
                      }}
                    />
                  ))}
              </div>
              {userInfo?.role === "admin" && adminPopup && (
                // admin na dle access dbe na
                <div className="absolute bg-white p-3 top-10 whitespace-nowrap rounded shadow-md max-md:hidden">
                  <Link
                    to="/admin-panel"
                    className="hover:bg-slate-100 p-2"
                    onClick={() => {
                      setAdminPopup((prev) => !prev);
                    }}
                  >
                    Admin panel
                  </Link>
                </div>
              )}
            </div>
          </li>
          <li className="relative">
            <Link to="">
              <BsCart4 className="text-2xl " />
              <span className="text-xs bg-red-500 px-1 text-white rounded-full absolute -top-2 -right-1">
                0
              </span>
            </Link>
          </li>
          <li>
            {userInfo ? (
              <Logout />
            ) : (
              <Link
                to="/login"
                className="bg-red-500 px-2 py-1 rounded-full text-white hover:bg-red-600"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
