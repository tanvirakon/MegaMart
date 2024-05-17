import React from "react";
import Navbar from "./components/Navbar";
import Carosoul from "./components/Carosoul";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Navbar />
      <Routes></Routes>
      <Footer />
    </div>
  );
}

export default App;
