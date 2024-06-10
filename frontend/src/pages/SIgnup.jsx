import React, { useState } from "react";
import { FaRegEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    picture: "",
  });

  function newEntry(e) {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const formSubmit = async (e) => {
    e.preventDefault();
    if (data.password == data.confirmPassword) {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
        picture: data.picture,
      };
      await axios
        .post("http://localhost:3000/api/Signup", userData)
        .then((res) => {
          toast.success("acc create susscess");
          console.log("res from frontend", res);
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.message);
          console.log("err" + err.message);
        });
    } else {
      toast.error("password dosent match");
      throw new Error("password dosent match");
    }
  };

  const [showPassword, setSHowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);

  return (
    <div className="bg-white mx-auto max-w-sm p-4 mt-14 flex flex-col rounded-xl">
      <div className="mx-auto">
        <p className="font-medium text-2xl mb-4">create new account</p>
      </div>

      <form className="relative" onSubmit={formSubmit}>
        <div>
          <label>name : </label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={newEntry}
            placeholder="enter full name"
            autoComplete="on"
            className="p-2 w-full border rounded-md my-2 focus:outline-none focus:bg-slate-50"
          />
        </div>
        <div>
          <label>email : </label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={newEntry}
            placeholder="enter email"
            autoComplete="on"
            className="p-2 w-full border rounded-md my-2 focus:outline-none focus:bg-slate-50"
          />
        </div>

        <div>
          <label>password : </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={data.password}
              name="password"
              onChange={newEntry}
              placeholder="enter password"
              autoComplete="on"
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
              value={data.confirmPassword}
              name="confirmPassword"
              onChange={newEntry}
              placeholder="enter password"
              autoComplete="on"
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

        <label htmlFor="">upload picture : </label>
        <input
          type="file"
          name="picture"
          className="mt-2 cursor-pointer "
          value={data.picture}
          onChange={newEntry}
          autoComplete="on"
        />
        <div className="mt-4 flex justify-center">
          <button className="bg-red-500 px-4 py-2 rounded-full text-white hover:bg-red-600 ">
            create account
          </button>
        </div>
      </form>

      <div className="flex gap-2 mt-2">
        <p>already have a account?</p>
        <Link to={"/login"} className="text-red-500 gap-3">
          login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
