import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Forget from "./pages/Forget";
import Signup from "./pages/SIgnup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import context from "../context/context";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const fetchUserData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/secret", {
        withCredentials: true,
      });
      setUser(res.data);
      console.log("res.data", res.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <context.Provider value={{fetchUserData}}>
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
