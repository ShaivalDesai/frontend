import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import ImageCarousel from "./Image";
import Navbar from "./Navbar";
import MyCard from "./ProductCard";
import ImageCarousel1 from "./ImageCarousel";
import PopupOffer from "./Popup";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images = ["ic11.avif", "ic9.avif", "h2.jpg", "ic12.avif"];

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

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/products/?brand=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <Navbar />

      <ImageCarousel1 images={images} />

      <ImageCarousel />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <MyCard
          image_base64="anouk2.jpg"
          title="ANOUK"
          color="white"
          onClick={handleSearch}
          to={{ pathname: "/brand", search: "?brand=anouk" }}
        />
        <MyCard
          image_base64="biba.png"
          title="BIBA"
          color="white"
          to={{ pathname: "/brand", search: "?brand=biba" }}
          onClick={handleSearch}
        />
        <MyCard
          image_base64="libas.jpg"
          title="LIBAS"
          color="white"
          to={{ pathname: "/brand", search: "?brand=libas" }}
          onClick={handleSearch}
        />
        <MyCard
          image_base64="gd.jpg"
          title="GLOBAL DESI"
          color="white"
          to={{ pathname: "/brand", search: "?brand=global%20desi" }}
          onClick={handleSearch}
        />
        <MyCard
          image_base64="shree.png"
          title="SHREE"
          color="white"
          to={{ pathname: "/brand", search: "?brand=shree" }}
          onClick={handleSearch}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <MyCard
          image_base64="fi.png"
          title="FABINDIA"
          color="white"
          to={{ pathname: "/brand", search: "?brand=fabindia" }}
          onClick={handleSearch}
        />
        <MyCard
          image_base64="s2.jpg"
          title="SOJANYA"
          color="white"
          to={{ pathname: "/brand", search: "?brand=sojanya" }}
          onClick={handleSearch}
        />
        <MyCard
          image_base64="sangria.jpg"
          title="SANGRIA"
          color="white"
          to={{ pathname: "/brand", search: "?brand=sangria" }}
          onClick={handleSearch}
        />
        <MyCard
          image_base64="vastramay2.webp"
          title="VASTRAMAY "
          color="white"
          to={{ pathname: "/brand", search: "?brand=vastramay" }}
          onClick={handleSearch}
        />
        <MyCard
          image_base64="deyan2.png"
          title="DEYANN "
          color="white"
          to={{ pathname: "/brand", search: "?brand=deyann" }}
          onClick={handleSearch}
        />
      </div>
    </>
  );
};

export default HomePage;
