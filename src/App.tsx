// import { Navigate, Route, Routes } from "react-router-dom";
// import "./App.css";
// import RegistrationUser from "./pages/Registration/RegistrationUser";
// import AuthPage from "./pages/Registration/AuthPage";
// import MainPage from "./pages/Dashboard/MainPage";
// import HomePage from "./pages/Home/HomePage";
// // import Profile from "./pages/Dashboard/Profile";
// import Vendor_Profile from "./pages/Dashboard/Profile";
// import Home_Profile from "./pages/Home/Home_Profile";
// import Wishlist from "./pages/Home/Whishlist/Whishlist";
// import SingleProductPage from "./pages/ProductPage/ProductList";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Protected from "./pages/Protected/ProtectedRoute";
// import SingleProduct from "./pages/ProductPage/SingleProduct";
// import CartPage from "./pages/Home/Cart/Cartpage";
// import ProductPage from "./pages/ProductPage/ProductList";
// // import BrandProduct from "./pages/Home/BrandProduct";

// interface Product {
//   id: number;
//   product_type: string;
//   brand: string;
//   price: number;
//   image_base64: string[];
// }

// function App() {
//   const navigate = useNavigate();
//   const [cart, setCart] = useState<Product[]>([]);

//   // useEffect(() => {
//   //   // Check if user is authenticated
//   //   const isAuthenticated = sessionStorage.getItem("isAuthenticated");
//   //   if (!isAuthenticated) {
//   //     // If not authenticated, redirect to login page
//   //     navigate("/login");
//   //   }
//   // }, [navigate]);

//   // const handleLogout = () => {
//   //   // Clear session storage and redirect to login page
//   //   sessionStorage.removeItem("isAuthenticated");
//   //   navigate("/login");
//   // };
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<AuthPage />} />
//         <Route path="/vendorprofile" element={<Vendor_Profile />} />
//         <Route path="/product" element={<ProductPage />} />
//         <Route path="/brand" element={<SingleProductPage />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/dashboard" element={<MainPage />} />
//         <Route path="/profile" element={<Home_Profile />} />
//         <Route path="/RegisterUser" element={<RegistrationUser />} />
//         <Route path="/whishlist" element={<Wishlist />} />
//         <Route path="/cart" element={<CartPage cart={cart} />} />
//         <Route path="/single" element={<SingleProduct />} />
//         {/* <Route path="/cart" element={<CartPage products={[]} />} />

//         {/* <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<AuthPage />} />
//         <Route path="/homeprofile" element={<Protected Component={Home_Profile} />} />
//         <Route path="/home" element={<Protected Component={HomePage} />} />
//         <Route path="/dashboard" element={<Protected Component={MainPage} />} />
//         <Route path="/RegisterUser" element={<RegistrationUser />} />
//         <Route path="/RegisterUser" element={<Protected Component={RegistrationUser} />}/> */}
//       </Routes>
//     </>
//   );
// }

// export default App;

import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import RegistrationUser from "./pages/Registration/RegistrationUser";
import SingleProductPage from "./pages/ProductPage/ProductList";
import AuthPage from "./pages/Registration/AuthPage";
import MainPage from "./pages/Dashboard/MainPage";
import HomePage from "./pages/Home/HomePage";
import Home_Profile from "./pages/Home/Home_Profile";
import Wishlist from "./pages/Home/Whishlist/Whishlist";

import ProductPage from "./pages/ProductPage/ProductList";
import { useNavigate } from "react-router-dom";
import CartPage from "./pages/Home/Cart/Cartpage";
import WishlistPage from "./pages/Home/Whishlist/WishlistPage";
import SingleProduct from "./pages/ProductPage/SingleProduct";
import Vendor_Profile from "./pages/Dashboard/Profile";
import { ThemeProvider } from "./Components/DarkMode";
import ManageProduction from "./pages/Dashboard/ManageProduction";
import SalesForecasting from "./pages/Dashboard/SalesForecasting";
import PriceForecasting from "./pages/Dashboard/PriceForecasting";
import ProductInsight from "./pages/Dashboard/Product_Insight";
import ContactUs from "./pages/Home/Contact";
import ProductTable from "./pages/Dashboard/Manage";
import ProfessionalForm from "./Components/form";
import ViewCompetition from "./pages/Dashboard/ViewCompetition";
import ContactUs2 from "./Components/ContactUs2";


interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  image: string[];
  category: string;

  
}

function App() {
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  return (
    <>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/form" element={<ProfessionalForm />} />
          <Route path="/manage" element={<ManageProduction />} />
          <Route path="/insight" element={<ProductInsight />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/manage1" element={<ProductTable />} />
          <Route path="/competition" element={<ViewCompetition/>} />

          <Route path="/home" element={<HomePage />} />
          <Route path="/price" element={<PriceForecasting />} />
          <Route path="/dashboard" element={<MainPage />} />
          <Route path="/vendorprofile" element={<Vendor_Profile />} />
          <Route
            path="/brand"
            element={
              <SingleProductPage
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            }
          />
          <Route path="/single" element={<SingleProduct />} />
          <Route path="/profile" element={<Home_Profile />} />
          <Route path="/RegisterUser" element={<RegistrationUser />} />
          <Route path="/sales" element={<SalesForecasting />} />
          <Route
            path="/product"
            element={
              <ProductPage wishlist={wishlist} setWishlist={setWishlist} />
            }
          />

          {/* <Route
            path="/wishlist"
            element={<WishlistPage wishlist={[]} />}
          /> */}



<Route
            path="/wishlist"
            element={<WishlistPage wishlist={wishlist} />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/contactVendor" element={<ContactUs2 />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
