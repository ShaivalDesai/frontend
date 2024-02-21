// import React from "react";
// import { Grid, Typography } from "@mui/material";
// import ProductCard, { Product } from "./WishlistProductCard.tsx";

// const Wishlist: React.FC = () => {
//   const products: Product[] = [
//     {
//       id: 1,
//       name: "Product 1",
//       description: "Description of Product 1",
//       image: "./bg2.jpg",
//       price: 500,
//     },
//     {
//       id: 2,
//       name: "Product 2",
//       description: "Description of Product 2",
//       image: "./bg4.jpg",
//       price: 500,
//     },
//     {
//       id: 3,
//       name: "Product 3",
//       description: "Description of Product 3",
//       image: "./bg4.jpg",
//       price: 500,
//     },
//     {
//       id: 4,
//       name: "Product 3",
//       description: "Description of Product 3",
//       image: "./bg4.jpg",
//       price: 500,
//     },
//   ];

//   const handleRemoveFromWishlist = (productId: number) => {};

//   return (
//     <>
//       <head>
//         <link
//           href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <div
//         style={{
//           textAlign: "center",
//           paddingTop: "20px",
//           margin: "auto",
//           maxWidth: "1300px",
//           // backgroundImage: `url('./p4.jpg')`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           minHeight: "100vh",
//         }}
//       >
//         <div style={{ padding: "20px", borderRadius: "10px" }}>
//           <Typography
//             variant="h4"
//             sx={{
//               fontFamily: "'Protest Riot', sans-serif",
//               fontWeight: "bold",
//               fontSize: "60px",
//               marginBottom: "2rem",
//               color: "red",
//               background:
//                 "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)", // Linear gradient background
//               WebkitBackgroundClip: "text", // Clip text to the background
//               WebkitTextFillColor: "transparent", // Make text transparent
//             }}
//           >
//             My Wishlist
//           </Typography>

//           <Grid container spacing={3} justifyContent="center">
//             {products.map((product) => (
//               <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
//                 <ProductCard
//                   product={product}
//                   onRemove={handleRemoveFromWishlist}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Wishlist;

// // // Parent component where you manage the state of wishlist and cart
// // import React, { useState } from "react";
// // // import ProductCard from "./ProductCard";
// // // import ProductCard,{Product} from "./WishlistProductCard.tsx";
// // import ProductCard, { Product } from "./WishlistProductCard.tsx";

// // const WishlistPage: React.FC = () => {
// //   const [wishlist, setWishlist] = useState<Product[]>([]);
// //   const [cart, setCart] = useState<Product[]>([]);

// //   // Function to add product to cart and remove from wishlist
// //   const addToCart = (productId: number) => {
// //     const productToAdd = wishlist.find((product) => product.id === productId);
// //     if (productToAdd) {
// //       setCart([...cart, productToAdd]); // Add to cart
// //       setWishlist(wishlist.filter((product) => product.id !== productId)); // Remove from wishlist
// //     }
// //   };

// //   return (
// //     <div>
// //       {wishlist.map((product) => (
// //         <ProductCard
// //           key={product.id}
// //           product={product}
// //           onAddToCart={addToCart}
// //         />
// //       ))}
// //     </div>
// //   );
// // };

// // export default WishlistPage;

import React, { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import ProductCard, { Product } from "./WishlistProductCard";
import { Link, useNavigate } from "react-router-dom";
import WishlistNavbar from "./WishlistNavbar";

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<Product[]>([
    {
      id: 1,
      name: "Product 1",
      description: "Description of Product 1",
      image: "./bg2.jpg",
      price: 500,
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description of Product 2",
      image: "./bg4.jpg",
      price: 500,
    },
    {
      id: 3,
      name: "Product 3",
      description: "Description of Product 3",
      image: "./bg4.jpg",
      price: 500,
    },
    {
      id: 4,
      name: "Product 3",
      description: "Description of Product 3",
      image: "./bg4.jpg",
      price: 500,
    },
  ]);

  const [cart, setCart] = useState<Product[]>([]);
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId: number) => {
    // Filter out the product with the given productId from the wishlist
    const updatedWishlist = wishlist.filter(
      (product) => product.id !== productId
    );
    setWishlist(updatedWishlist);
  };

  const handleAddToCart = (productId: number) => {
    // Find the product with the given productId in the wishlist
    const productToAdd = wishlist.find((product) => product.id === productId);
    if (productToAdd) {
      // Update cart state
      setCart([...cart, productToAdd]);
      // Remove product from wishlist
      handleRemoveFromWishlist(productId);
      // Navigate to Cart page
      navigate("/cart");
    }
  };

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* <WishlistNavbar /> */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "20px",
          margin: "auto",
          maxWidth: "1300px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
        }}
      >
        <div style={{ padding: "20px", borderRadius: "10px" }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Protest Riot', sans-serif",
              fontWeight: "bold",
              fontSize: "60px",
              marginBottom: "2rem",
              color: "red",
              background:
                "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Wishlist
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {wishlist.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onRemove={handleRemoveFromWishlist}
                  onAddToCart={handleAddToCart} // Pass the addToCart function as prop
                />
              </Grid>
            ))}
          </Grid>

          <Button
            component={Link}
            to="/home"
            variant="contained"
            color="primary"
            sx={{
              marginTop: "20px",
              background:
                "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Add Product
          </Button>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
