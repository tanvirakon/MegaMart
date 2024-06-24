import axios from "axios";
import React, { useEffect, useState } from "react";
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

function App() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/secret", {
        withCredentials: true,
      });
      setUser(res.data);
      console.log("res.data", res.data);
      dispatch(setUserDetails(res.data));
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <context.Provider value={{ fetchUserData }}>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </context.Provider>
    </div>
  );
}

export default App;
