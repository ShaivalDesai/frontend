// import React, { useEffect, useState } from "react";
// import {
//   Typography,
//   Box,
//   CardActionArea,
//   CardContent,
//   CardMedia,
//   Grid,
//   Card,
//   styled,
//   Button,
// } from "@mui/material";
// import Navbar from "../Navbar";

// interface Product {
//   product_id: number;
//   product_type: string;
//   brand: string;
//   price: number;
//   image_base64: string[];
// }

// const CustomCard = styled(Card)(({ theme }) => ({
//   maxWidth: 345,
//   maxHeight: 650,
//   width: "100%",
//   margin: "auto",
//   transition: "0.3s",
//   borderRadius: "10px",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: theme.shadows[20],
//   },
// }));

// const WishlistPage = ({ wishlist }: { wishlist: Product[] }) => {
//   const [cartState, setCartState] = useState<Product[]>([]);
//   const [cartItems, setCartItems] = useState<Product[]>([]);

//   // useEffect(() => {
//   //   const savedCart = localStorage.getItem("wishlist");
//   //   if (savedCart) {
//   //     setCartState(JSON.parse(savedCart));
//   //   }
//   // }, []);

//   // // Save wishlist data to local storage whenever it changes
//   // useEffect(() => {
//   //   localStorage.setItem("wishlist", JSON.stringify(wishlist));
//   // }, [wishlist]);




//   const addToCart = (product: Product) => {
//     // Fetch the current cart from localStorage or initialize it as an empty array
//     const currentCart = JSON.parse(localStorage.getItem('cart') || '[]') as Product[];

//     // Check if the product is already in the cart
//     const isProductInCart = currentCart.some((item: Product) => item.product_id === product.product_id);

//     if (!isProductInCart) {
//         // If the product is not in the cart, add it
//         const updatedCart = [...currentCart, product];

//         // Update the cart in the local storage
//         localStorage.setItem('cart', JSON.stringify(updatedCart));

//         // Update state (if you're using it to reflect the cart changes immediately in the UI)
//         setCartItems(updatedCart); // Assuming setCartItems is managing a state used for rendering
//     }
// };


  

//   return (
//     <>
//       <Navbar />
//       <Box sx={{ flexGrow: 1, padding: 3 }}>
//         <Grid container spacing={4} justifyContent="center">
//           {wishlist.map((product) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
//               <CustomCard>
//                 <CardActionArea>
//                   <CardMedia
//                     component="img"
//                     src={`data:image/jpeg;base64,${product.image_base64}`}
//                     alt={product.product_type}
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h6" component="h2">
//                       {product.brand}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Product Type: {product.product_type}
//                     </Typography>
//                     <Typography variant="body1" color="text.secondary">
//                       Price: ₹{product.price.toFixed(2)}
//                     </Typography>
//                   </CardContent>
//                   <Button
//                     onClick={() => addToCart(product)}
//                     variant="contained"
//                     sx={{ margin: 2 }}
//                   >
//                     Add to Cart
//                   </Button>
//                 </CardActionArea>
//               </CustomCard>
//             </Grid>
//           ))}
//           {wishlist.length === 0 && (
//             <Typography variant="body1">Your wishlist is empty.</Typography>
//           )}
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default WishlistPage;










import React, { useEffect, useState } from "react";
import ProductCard from "./PC";



export interface Product {
  product_id: number;
  product_name: string;
  description: string;
  price: number;
  image_base64: string;
}

const WishlistPage = ({ wishlist }: { wishlist: Product[] }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    // Your addToCart logic here
  };

  return (
    <div>
      <h1>Wishlist</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {wishlist.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            onAddToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;