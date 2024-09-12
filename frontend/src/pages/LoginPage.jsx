import axios from "axios";
import React, { useContext, useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { IoManSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import context from "../assets/context/context";
import addToCart from "../helper/addToCart.js";

const LoginPage = ({ heading, onclose }) => {
  const { fetchUserData, fetchProductCountInCart } = useContext(context); //fetchUserData function ta asbe

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
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
  const [showPassword, setSHowPassword] = useState(false);

  const formSubmit = async (e) => {
    e.preventDefault();
    const loginData = {
      email: data.email,
      password: data.password,
    };
    const res = await axios.post(
      "http://localhost:3000/api/canlogin", //login + token generate
      loginData,
      { withCredentials: "include" }
    );
    if (res?.data?.data) {
      toast.success(res.data.message);
      // console.log("front", res.data);
      !heading && navigate("/"); //main login page e, heading nai, login krar pre home e nye jbe
      fetchUserData();
      fetchProductCountInCart();
      heading && onclose();
    } else toast.error(res.data.message);
  };
  return (
    <div
      className={`bg-white mx-auto max-w-sm p-4 flex flex-col rounded-xl ${
        heading ? "mt-10" : "mt-14"
      }`}
    >
      <div className="mx-auto">
        {heading && <p className="text-2xl font-semibold mb-5">{heading}</p>}
        {!heading && <IoManSharp className="text-7xl" />}
      </div>
      <form className="relative" onSubmit={formSubmit}>
        <div>
          <label>email : </label>
          <input
            type="email"
            placeholder="enter email"
            autoComplete="on"
            name="email"
            value={data.email}
            onChange={newEntry}
            className="p-2 w-full border rounded-md my-2 focus:outline-none focus:bg-slate-50"
          />
        </div>

        <div>
          <label>password : </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="enter password"
              autoComplete="on"
              name="password"
              value={data.password}
              onChange={newEntry}
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

        <Link
          to={"/forget"}
          className="text-blue-700 absolute right-0 -bottom-3"
        >
          forget password
        </Link>
        <div className=" flex justify-center">
          <input
            type="submit"
            className="bg-red-500 px-4 py-2 mx-auto rounded-full text-white hover:bg-red-600 mt-4 mb-2"
          />
        </div>
      </form>

      <div className="flex gap-2 mt-2">
        <p>dont have a account?</p>
        <Link to={"/signup"} className="text-red-500 gap-3">
          register
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
