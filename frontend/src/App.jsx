import axios from "axios";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import context from "./assets/context/context";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Forget from "./pages/Forget";
import LoginPage from "./pages/LoginPage";
import Signup from "./pages/SIgnup";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import AdminPanel from "./pages/AdminPanel";
import AllUser from "./pages/AllUser";
import AllProducts from "./pages/AllProducts";
import Home from "./pages/Home";

function App() {
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/secret", {
        withCredentials: true,
      });
      //console.log("res.data", res.data); //user is logged in
      dispatch(setUserDetails(res.data)); //reducer e value set kre dlm
    } catch (error) {
      //console.error("user not logged in; ", error.message); //usr not logged in
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* sets the minimum height of the outer container to be the full height of the viewport. footer ekhn niche thkbe . content kom thakle upore chle jbe na*/}
      <context.Provider value={{ fetchUserData }}>
        <ToastContainer />
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget" element={<Forget />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="admin-panel" element={<AdminPanel />}>
              <Route index element={<AllProducts />} />
              {/* by default AllProducts select hye tkbe */}
              <Route path="all_user" element={<AllUser />} />
              <Route path="upload_products" element={<AllProducts />} />
            </Route>
          </Routes>
        </div>
        <Footer />
      </context.Provider>
    </div>
  );
}

export default App;
