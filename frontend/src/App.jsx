import React from "react";
import Navbar from "./components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Forget from "./pages/Forget";
import SIgnup from "./pages/SIgnup";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/signup" element={<SIgnup/>}/>
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
