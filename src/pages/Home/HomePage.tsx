import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import ImageCarousel from "./Image";
import Navbar from "./Navbar";
import MyCard from "./ProductCard"; 
import ImageCarousel1 from "./ImageCarousel";
import PopupOffer from "./Popup";

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = ["ic1.jpg", "ic5.avif", "h2.jpg", "ic7.jpg"];

  useEffect(() => {
    fetchDataAndSetSessionStorage();
  }, []);

  const fetchDataAndSetSessionStorage = async () => {
    try {
      // Fetch your data here
      const responseData = await fetchData();

      // Extract user_id and customer_id from response data
      const uid = responseData.user_id;
      const cid = responseData.customer_id;

      // Set session storage values
      sessionStorage.setItem("u_id", uid);
      sessionStorage.setItem("c_id", cid);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("your-api-endpoint");
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  return (
    <>
      <Navbar />
      <PopupOffer />
      <ImageCarousel1 images={images} />

      <ImageCarousel />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <MyCard image="anouk2.jpg" title="ANOUK" color="white" />
        <MyCard image="biba.png" title="BIBA" color="white" />
        <MyCard image="libas.jpg" title="LIBAS" color="white" />
        <MyCard image="gd.jpg" title="GLOBAL DESI" color="white" />
        <MyCard image="shree.png" title="SHREE" color="white" />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <MyCard image="fi.png" title="FABINDIA" color="white" />
        <MyCard image="s2.jpg" title="SOJANYA" color="white" />
        <MyCard image="sangria.jpg" title="SANGRIA" color="white" />
        <MyCard image="vastramay2.webp" title="VASTRAMAY " color="white" />
        <MyCard image="deyan2.png" title="DEYANN " color="white" />
      </div>
    </>
  );
};

export default HomePage;
