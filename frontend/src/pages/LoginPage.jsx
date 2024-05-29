import React from "react";
import { IoManSharp } from "react-icons/io5";

function LoginPage() {
  return (
    <div className="bg-red-300 ">
      <center>
        <IoManSharp className="text-9xl" />
        <label htmlFor="">email</label>
        <input type="email" />
        <label htmlFor="">password</label>
        <input type="password" />
      </center>
    </div>
  );
}

export default LoginPage;
