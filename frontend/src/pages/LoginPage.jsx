import React, { useState } from "react";
import { IoManSharp } from "react-icons/io5";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

function LoginPage() {
  const [showPassword, setSHowPassword] = useState(true);
  return (
    <div className="bg-white mx-auto max-w-sm p-4 mt-14 flex flex-col rounded-xl">
      <div className="mx-auto">
        <IoManSharp className="text-7xl" />
      </div>
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

        <input
          type="submit"
          className="bg-red-500 p-2 rounded-md text-white hover:bg-red-600 mt-2"
        />
        <Link
          to={"/forget"}
          className="text-blue-700 absolute right-0 bottom-9"
        >
          forget password
        </Link>
      </form>

      <div className="flex gap-2 mt-2">
        <p>dont have a account?</p>
        <Link to={"/signup"} className="text-red-500 gap-3">
          register
        </Link>
      </div>

    </div>
  );
}

export default LoginPage;
