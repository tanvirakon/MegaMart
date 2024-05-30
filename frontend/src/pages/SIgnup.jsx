import React, { useState } from "react";
import { IoManSharp } from "react-icons/io5";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function SIgnup() {
  const [showPassword, setSHowPassword] = useState(true);
  const [showConfirmPassword, setshowConfirmPassword] = useState(true);
  return (
    <div className="bg-white mx-auto max-w-sm p-4 mt-14 flex flex-col rounded-xl">
      <div className="mx-auto"></div>
      <form action="" className="relative">
        <div>
          <label>email : </label>
          <input
            type="email"
            placeholder="enter email"
            className="p-2 w-full border rounded-md my-2 focus:outline-none focus:bg-slate-50"
          />
        </div>

        <div>
          <label>password : </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              className="p-2 w-full border rounded-md my-2 focus:outline-none focus:bg-slate-50 no-password-reveal "
            />
            {/* logic for toggoling showPassword */}
            {showPassword ? (
              <FaRegEyeSlash
                className="absolute top-5 right-3 cursor-pointer "
                onClick={() => {
                  setSHowPassword(false);
                }}
              />
            ) : (
              <FaEye
                className="absolute top-5 right-3 cursor-pointer "
                onClick={() => {
                  setSHowPassword(true);
                }}
              />
            )}
          </div>
        </div>

        <div>
          <label> confirm password : </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="enter password"
              className="p-2 w-full border rounded-md my-2 focus:outline-none focus:bg-slate-50 no-password-reveal "
            />
            {/* logic for toggoling showConfirmPassword */}
            {showConfirmPassword ? (
              <FaRegEyeSlash
                className="absolute top-5 right-3 cursor-pointer "
                onClick={() => {
                  setshowConfirmPassword(false);
                }}
              />
            ) : (
              <FaEye
                className="absolute top-5 right-3 cursor-pointer "
                onClick={() => {
                  setshowConfirmPassword(true);
                }}
              />
            )}
          </div>
        </div>

        <button className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600 mt-2">
          create account
        </button>
      </form>
    </div>
  );
}

export default SIgnup;
