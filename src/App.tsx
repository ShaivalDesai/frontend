import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import HomePage from "./pages/HomePage";
import Login from "./pages/Registration/Login";
import LoginUser from "./pages/Registration/LoginUser";
import LoginVendor from "./pages/Registration/LoginVendor";
import Register from "./pages/Registration/Register";
import RegistrationUser from "./pages/Registration/RegistrationUser";
import RegistrationVendor from "./pages/Registration/RegistrationVendor";
// import New from "./pages/Neww"
import Neww from "./pages/Neww";
import Navbar from "./pages/Home/HomePage";
import HomePage from "./pages/Home/HomePage";



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace/>}/>
        <Route path="/login" element={<LoginUser/>}/>
        {/* <Route path="/loginVendor" element={<LoginVendor/>}/> */}
        {/* <Route path="/register" element={<Register/>}/> */}
        {/* <Route path="/neww" element={<Neww/>}/> */}
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/RegisterUser" element={<RegistrationUser/>}/>
        <Route path="/RegisterVendor" element={<RegistrationVendor/>}/>
      </Routes>
    </>
  );
}

export default App;
