import React from "react";
import ProductCard from "./ProductCard";
import ImageCarousel from "./ImageCarousel";
import Navbar from "./Navbar";
import MyCard from "./ProductCard"; // Assuming MyCard is your card component

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <ImageCarousel />
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
        <MyCard />
        <MyCard />
        <MyCard />
      </div>
    </>
  );
};

export default HomePage;
