import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
// import HomePage from "./pages/HomePage";

import LoginUser from "./pages/Registration/LoginUser";

import Register from "./pages/Registration/Register";
import RegistrationUser from "./pages/Registration/RegistrationUser";

// import New from "./pages/Neww"
import Neww from "./pages/Neww";
import Navbar from "./pages/Home/HomePage";
// import HomePage from "./pages/Home/HomePage";
import AuthPage from "./pages/Registration/AuthPage";
// import { Dashboard } from "@mui/icons-material";
import Dashboard from "./pages/Dashboard/Dashboard";
import MainPage from "./pages/Dashboard/MainPage";
import HomePage from "./pages/Home/HomePage";
import Profile from "./pages/Dashboard/Profile";
import Home_Profile from "./pages/Home/Home_Profile";
import Protected from "./pages/Protected/ProtectedRoute";
import ProductCard from "./pages/Home/Whishlist/ProductCard";
import Wishlist from "./pages/Home/Whishlist/Whishlist";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<MainPage />} />
        <Route path="/homeprofile" element={<Home_Profile />} />
        <Route path="/RegisterUser" element={<RegistrationUser />} />
        <Route path="/whishlist" element={<Wishlist />} />

        {/* <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/profile" element={<Protected Component={Profile} />} />
        <Route path="/home" element={<Protected Component={HomePage} />} />
        <Route path="/dashboard" element={<Protected Component={MainPage} />} />
        <Route path="/RegisterUser" element={<RegistrationUser />} /> */}
        {/* <Route path="/RegisterUser" element={<Protected Component={RegistrationUser} />}/> */}
      </Routes>
    </>
  );
}

export default App;
