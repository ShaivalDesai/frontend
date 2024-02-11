import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import ImageCarousel from "./ImageCarousel";
import Navbar from "./Navbar";
import MyCard from "./ProductCard"; // Assuming MyCard is your card component

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []); // Empty dependency array to execute only once on mount

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
        <MyCard />
        <MyCard />
        <MyCard />
      </div>
    </>
  );
};

export default HomePage;
