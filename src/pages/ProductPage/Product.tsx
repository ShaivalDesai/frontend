import React, { useState } from "react";
import "./App.css";
// import SingleProductPage from '../ProductPage/SingleProduct';
import ProductPage from "./ProductList";
import Navbar from "../Home/Navbar";

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  image_base64: string[];
  category: string;
 
}
const [cart, setCart] = useState<Product[]>([]);
function App() {
  return (
    <div>
      <ProductPage wishlist={cart} setWishlist={setCart} />
      {/* <ProductPage/> */}
    </div>
  );
}

export default App;
