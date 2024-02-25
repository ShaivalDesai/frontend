import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import RegistrationUser from "./pages/Registration/RegistrationUser";
import AuthPage from "./pages/Registration/AuthPage";
import MainPage from "./pages/Dashboard/MainPage";
import HomePage from "./pages/Home/HomePage";
import Profile from "./pages/Dashboard/Profile";
import Home_Profile from "./pages/Home/Home_Profile";
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
        {/* <Route path="/cart" element={<CartPage products={[]} />} /> */}

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
