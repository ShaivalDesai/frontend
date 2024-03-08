// import React from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Typography from '@mui/material/Typography';
// import CardContent from '@mui/material/CardContent';
// import Navbar from '../Home/Navbar';

// interface Product {
//   title: string;
//   price: number;
//   brand: string;
//   dominant_material: string;
//   size: string;
//   actual_color: string;
//   product_details: string[];
//   type: string;
//   image: string;
// }

// const singleProduct: Product = {
//   title: "Sample Product",
//   price: 99.99,
//   brand: "Sample Brand",
//   dominant_material: "Cotton",
//   size: "M",
//   actual_color: "Blue",
//   product_details: ["Detail 1", "Detail 2", "Detail 3"],
//   type: "Shirt",
//   image: "accee.jpg",
// };

// const theme = createTheme();

// const SingleProduct: React.FC = () => {
//   return (
//     <>
//       <Navbar />
//       <ThemeProvider theme={theme}>
//         <div className="product-container">
//           <div className="product-image-container">
//             <img src={singleProduct.image} alt={singleProduct.title} className="product-image" />
//           </div>
//           <div className="product-details-container">
//             <CardContent className="product-details">
//               <Typography variant="h4" className="title">{singleProduct.title}</Typography>
//               <Typography variant="subtitle1" className="price">Price: ${singleProduct.price}</Typography>
//               <Typography variant="subtitle1" className="brand">Brand: {singleProduct.brand}</Typography>
//               <Typography variant="subtitle1" className="dominant_material">Material: {singleProduct.dominant_material}</Typography>
//               <Typography variant="subtitle1" className="size">Size: {singleProduct.size}</Typography>
//               <Typography variant="subtitle1" className="actual_color">Color: {singleProduct.actual_color}</Typography>
//               <Typography variant="subtitle1" className="product_type">Type: {singleProduct.type}</Typography>
//               <Typography variant="h6">Product Details:</Typography>
//               <ul>
//                 {singleProduct.product_details.map((detail, index) => (
//                   <li key={index}>{detail}</li>
//                 ))}
//               </ul>
//             </CardContent>
//           </div>
//         </div>
//       </ThemeProvider>

//       <style>{`
//         .product-container {
//           display: flex;
//           justify-content: center;
//           align-items: flex-start;
//           gap: 20px;
//         }

//         .product-image {
//           width: 100%;
//           height: auto;
//           margin-top:40px;
//           margin-right:100px;
//         }

//         .product-details-container {
//           display: flex;
//           flex-direction: column;
//           align-items: flex-end; /* Aligns children to the right */
//           max-width: 600px; /* Adjust based on your design */
//         }

//         .product-details {
//           width: 100%;
//         }

//         .title, .price, .brand, .dominant_material, .size, .actual_color, .product_type {
//           margin-bottom: 20px;
//         }

//         .product-details ul {
//           list-style-type: none;
//           padding: 0;
//         }

//         .product-details ul li {
//           margin-bottom: 5px;
//         }
//       `}</style>
//     </>
//   );
// };

// export default SingleProduct;

// import React, { useState } from "react";
// import { useParams } from "react-router-dom";
// import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import BalanceIcon from "@mui/icons-material/Balance";
// import "./SingleProduct.scss";

// interface ProductData {
//   id: string;
//   attributes: {
//     title: string;
//     desc: string;
//     price: number;
//     img: {
//       data: {
//         attributes: {
//           url: string;
//         };
//       };
//     };
//     img2: {
//       data: {
//         attributes: {
//           url: string;
//         };
//       };
//     };
//     [key: string]: any; // For flexibility to access attributes dynamically
//   };
// }

// const Product: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [quantity, setQuantity] = useState<number>(1);

//   const handleAddToCart = () => {
//     // Add your own logic to handle adding to cart
//     console.log("Add to cart logic here");
//   };

//   return (
//     <div className="product">
//       <div className="left">
//         <div className="images">
//           <img src="shoes.jpg" alt="" />
//           {/* <img src="gr.png" alt="" /> */}
//         </div>
//         <div className="mainImg">
//           <img src="gr.png" alt="" />
//         </div>
//       </div>
//       <div className="right">
//         <h1>Title</h1>
//         <span className="price">$10</span>
//         <p>Description</p>
//         <div className="quantity">
//           <button
//             onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}
//           >
//             -
//           </button>
//           {quantity}
//           <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
//         </div>
//         <button className="add" onClick={handleAddToCart}>
//           <AddShoppingCartIcon /> ADD TO CART
//         </button>
//         <div className="links">
//           <div className="item">
//             <FavoriteBorderIcon /> ADD TO WISH LIST
//           </div>
//           <div className="item">
//             <BalanceIcon /> ADD TO COMPARE
//           </div>
//         </div>
//         <div className="info">
//           <span>Vendor: Polo</span>
//           <span>Product Type: T-Shirt</span>
//           <span>Tag: T-Shirt, Women, Top</span>
//         </div>
//         <hr />
     
//       </div>
//     </div>
//   );
// };

// export default Product;



import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import "./SingleProduct.scss";
import Navbar from "../Home/Navbar";

interface ProductData {
  id: string;
  title: string;
  price: number;
  brand: string;
  dominant_material: string;
  size: string;
  actual_color: string;
  product_details: string;
  product_type: string;
  image: string;
  [key: string]: any; // For flexibility to access attributes dynamically
}


const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    // Add your own logic to handle adding to cart
    console.log("Add to cart logic here");
  };

  const productData: ProductData = {
    id: "1",
    title: "Hush Puppies Men Shoes",
    price: 2500,
    brand: "Sample Brand",
    dominant_material: "Cotton",
    size: "M",
    actual_color: "Red",
    product_details: "Sample product details",
    product_type: "Shirt",
    image: "shoes.jpg",
  };

  return (
    <>
    <Navbar/>
    <div className="product">
      <div className="left">
        {/* <div className="images">
          <img src={productData.image} alt={productData.title} />
         
        </div> */}
        <div className="mainImg">
          <img src={productData.image} alt={productData.title} />
        </div>
      </div>
      <div className="right">
        <h1>{productData.title}</h1>
        <span className="price">₹{productData.price}</span>
        <p>{productData.product_details}</p>
        <div className="quantity">
          <button onClick={() => setQuantity((prev) => (prev === 1 ? 1 : prev - 1))}>-</button>
          {quantity}
          <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
        </div>
        <button className="add" onClick={handleAddToCart}>
          <AddShoppingCartIcon /> ADD TO CART
        </button>
        <div className="links">
          <div className="item">
            <FavoriteBorderIcon /> ADD TO WISH LIST
          </div>
          <div className="item">
            <BalanceIcon /> ADD TO COMPARE
          </div>
        </div>
        <div className="info">
          <span>Vendor: {productData.brand}</span>
          <span>Product Type: {productData.product_type}</span>
          {/* Add more fields here */}
        </div>
        <hr />
      </div>
    </div>
    </>
  );
};

export default Product;
