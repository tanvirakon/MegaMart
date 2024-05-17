import React from "react";
import { Link } from "react-router-dom";
import { FaSearchengin } from "react-icons/fa6";
function Navbar() {
  return (
    <div className="flex items-center  justify-between p-4 rounded-lg shadow-md">
      <div>
        <img src="./src/images/Designer.jpeg" alt="" className="h-[50px]" />
      </div>
      <div className="hidden md:flex items-center ">
        <div>
          <FaSearchengin className="mr-2" />
        </div>
        <input
          type="text"
          placeholder="search for product..."
          className="border-2 rounded-full px-2 border-gray-200 outline-none focus:shadow"
        />
      </div>
      <div>
        <ul className="flex gap-4">
          <li>
            <Link to="">ako</Link>
          </li>
          <li>
            <Link to="">ako</Link>
          </li>
          <li>
            <Link to="">akosssss</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
