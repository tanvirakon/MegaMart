import React from "react";
import Navbar from "./components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
