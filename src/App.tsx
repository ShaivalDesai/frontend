import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Registration/Register";
import RegistrationUser from "./pages/Registration/RegistrationUser";
import RegistrationVendor from "./pages/Registration/RegistrationVendor";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/user" element={<RegistrationUser/>}/>
        <Route path="/vendor" element={<RegistrationVendor/>}/>
      </Routes>
    </>
  );
}

export default App;
