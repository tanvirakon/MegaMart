import React from "react";
import { Link } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
function Navbar() {
  return (
    <div className="flex items-center  justify-between p-4 rounded-lg shadow-md ">
      <div className="ml-10">
        <Link to="/">
          <img src="./src/images/logo.jpeg" alt="" className="h-[50px]" />
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
            <Link to="">
              <FaRegUserCircle className="text-2xl" />
            </Link>
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
            <Link
              to="/login"
              className="bg-red-500 px-2 py-1 rounded-full text-white hover:bg-red-600"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
