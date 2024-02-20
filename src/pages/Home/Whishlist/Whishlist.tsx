// import React, { useState, useEffect } from "react";
// import { Grid } from "@mui/material";
// import ProductCard, { Product } from "./ProductCard";
// import axios from "axios";

// const Wishlist: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]); // Assuming Product interface or type is defined elsewhere

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/wishlist");
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Failed to fetch products", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleRemoveFromWishlist = (productId: number) => {
//     // Logic to remove the product from the wishlist (e.g., send a request to the backend)
//     // After successful removal, update the state to reflect the changes
//     setProducts(products.filter((product) => product.id !== productId));
//   };

//   return (
//     <Grid container spacing={2}>
//       {products.map((product) => (
//         <Grid item key={product.id} xs={12} sm={6} md={4}>
//           <ProductCard product={product} onRemove={handleRemoveFromWishlist} />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default Wishlist;

import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard, { Product } from "./ProductCard";

const Wishlist: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      image: "./bg2.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      image: "./bg3.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of Product 3",
      image: "./bg4.jpg",
    },
  ];

  const handleRemoveFromWishlist = (productId: number) => {
    // Logic to remove the product from the wishlist
  };

  return (
    <div style={{ textAlign: "center", paddingTop: "20px" }}>
      <Typography
        variant="h4"
        style={{
          fontFamily: "'Protest Revolution', sans-serif",
          fontWeight: "bold",
        }}
      >
        My Wishlist
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard
              product={product}
              onRemove={handleRemoveFromWishlist}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Wishlist;
