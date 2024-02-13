import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import ImageCarousel from "./ImageCarousel";
import Navbar from "./Navbar";
import MyCard from "./ProductCard"; // Assuming MyCard is your card component

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []); 

  return (
    <>
      <Navbar />
      <ImageCarousel />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <MyCard image="men1.avif" title="MEN" color="white" />
        <MyCard image="women2.webp" title="WOMEN" color="white" />
        <MyCard image="kids.jpg" title="KIDS" color="white" />
        <MyCard image="accee.jpg" title="ACCESSORIES" color="white" />
        <MyCard image="shoes.jpg" title="FOOTWEAR" color="white" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "20px", // Adjust the margin as needed
        }}
      >
        <MyCard image="bottomwear.jpg" title="BOTTOMWEAR" color="white" />
        <MyCard image="formals.jpg" title="FORMALWEAR" color="white" />
        <MyCard image="jackets.jpg" title="JACKETS" color="white" />
        <MyCard image="bags.jpg" title="BAGS" color="white" />
        <MyCard image="home.jpg" title="HOME" color="white" />
      </div>
    </>
  );
};

export default HomePage;
