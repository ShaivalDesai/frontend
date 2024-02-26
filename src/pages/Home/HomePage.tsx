// import React, { useEffect } from "react";
// import ProductCard from "./ProductCard";
// import ImageCarousel from "./ImageCarousel";
// import Navbar from "./Navbar";
// import MyCard from "./ProductCard"; // Assuming MyCard is your card component

// const HomePage: React.FC = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <ImageCarousel />
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-around",
//         }}
//       >
//         <MyCard image="men1.avif" title="MEN" color="white" />
//         <MyCard image="women2.webp" title="WOMEN" color="white" />
//         <MyCard image="kids.jpg" title="KIDS" color="white" />
//         <MyCard image="accee.jpg" title="ACCESSORIES" color="white" />
//       </div>
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-around",
//           marginTop: "20px", // Adjust the margin as needed
//         }}
//       >
//         <MyCard image="bottomwear.jpg" title="BOTTOMWEAR" color="white" />
//         <MyCard image="formals.jpg" title="FORMALWEAR" color="white" />
//         <MyCard image="jackets.jpg" title="JACKETS" color="white" />
//         <MyCard image="bags.jpg" title="BAGS" color="white" />
//       </div>
//     </>
//   );
// };

// export default HomePage;
import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import ImageCarousel from "./ImageCarousel";
import Navbar from "./Navbar";
import MyCard from "./ProductCard"; // Assuming MyCard is your card component

const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch data and then set session storage
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
      // Implement your data fetching logic here
      // Example: Fetch data from an API
      const response = await fetch("your-api-endpoint");
      const responseData = await response.json(); // Parse JSON response
      return responseData; // Return the fetched data
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Throw error to be caught by the calling function
    }
  };

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
      </div>
    </>
  );
};

export default HomePage;
