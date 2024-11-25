import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import { Outlet } from "react-router-dom";

function SellerDashboard() {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.role != "seller") navigate("/");
  }, [userInfo]);
  return (
    <div className="flex px-4 mt-4 min-h-[710px] max-md:hidden">
      <aside className="bg-white w-80 p-3 flex customShadow flex-col h-[690px] rounded-lg">
        {/* shadow doesnt work */}
        <div className=" flex justify-center">
          {userInfo ? (
            <img
              src={userInfo.picture}
              alt={userInfo.name}
              className="size-14 rounded-full mt-15"
            />
          ) : (
            <FaRegUserCircle className="text-3xl" />
          )}
        </div>
        <p className="mt-4 font-medium self-center">{userInfo?.name}</p>
        {/* refresh dile r name & role payna ken?! */}
        <p className="self-center">{userInfo?.role}</p>

        <div className="mt-10 flex flex-col gap-3">
          {/* kkhn / dbo r kkhn / dbo na sure hte hbe, absolute / relative path.... */}

          <Link to={"upload_products"} className="hover:bg-slate-100 p-2">
            All products
          </Link>
        </div>
      </aside>

      <main className="bg-slate-100 w-full p-3">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerDashboard;
