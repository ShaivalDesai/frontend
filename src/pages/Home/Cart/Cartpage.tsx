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
// } from "@mui/material";
// import Navbar from "../Navbar";

// interface Product {
//   id: number;
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

// const CartPage = ({ cart }: { cart: Product[] }) => {
//   const [cartState, setCartState] = useState<Product[]>([]);

//   useEffect(() => {
//     const savedCart = localStorage.getItem("cart");
//     if (savedCart) {
//       setCartState(JSON.parse(savedCart));
//     }
//   }, []);

//   // Save cart data to local storage whenever it changes
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   return (
//     // <>
//     //   <Navbar />
//     //   <Box sx={{ flexGrow: 1, padding: 3 }}>
//     //     <Grid container spacing={4} justifyContent="center">
//     //       {cart.map((product) => (
//     //         <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//     //           <CustomCard>
//     //             <CardActionArea>
//     //               <CardMedia
//     //                 component="img"
//     //                 src={`data:image/jpeg;base64,${product.image_base64}`}
//     //                 alt={product.product_type}
//     //               />
//     //               <CardContent>
//     //                 <Typography gutterBottom variant="h6" component="h2">
//     //                   {product.brand}
//     //                 </Typography>
//     //                 <Typography variant="body1" color="text.secondary">
//     //                   Product Type: {product.product_type}
//     //                 </Typography>
//     //                 <Typography variant="body1" color="text.secondary">
//     //                   Price: ₹{product.price.toFixed(2)}
//     //                 </Typography>
//     //               </CardContent>
//     //             </CardActionArea>
//     //           </CustomCard>
//     //         </Grid>
//     //       ))}
//     //       {cart.length === 0 && (
//     //         <Typography variant="body1">Your cart is empty.</Typography>
//     //       )}
//     //     </Grid>
//     //   </Box>
//     // </>











//     <>
//     <Navbar />
//     <Box sx={{ flexGrow: 1, padding: 3 }}>
//       <Grid container spacing={4} justifyContent="center">
//         {cartState.length === 0 ? (
//           <Typography variant="body1">Your cart is empty.</Typography>
//         ) : (
//           cartState.map((product) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
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
//                 </CardActionArea>
//               </CustomCard>
//             </Grid>
//           ))
//         )}
//       </Grid>
//     </Box>
//   </>
//   );




// };

// export default CartPage;





// CartPage component

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Card,
  styled,
} from "@mui/material";
import Navbar from "../Navbar";

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  image_base64: string[];
}

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  maxHeight: 650,
  width: "100%",
  margin: "auto",
  transition: "0.3s",
  borderRadius: "10px",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[20],
  },
}));

const CartPage = () => {
  const [cartState, setCartState] = useState<Product[]>([]);

  // useEffect(() => {
  //   const savedCart = localStorage.getItem("cart");
  //   if (savedCart) {
  //     setCartState(JSON.parse(savedCart));
  //   }
  // }, []);

  useEffect(() => {
    // Fetch the cart from localStorage when the component mounts or updates
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartState(JSON.parse(savedCart));
    }
  }, []);
  


  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={4} justifyContent="center">
          {cartState.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
              <CustomCard>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    src={`data:image/jpeg;base64,${product.image_base64}`}
                    alt={product.product_type}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="h2">
                      {product.brand}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Product Type: {product.product_type}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Price: ₹{product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </CustomCard>
            </Grid>
          ))}
          {cartState.length === 0 && (
            <Typography variant="body1">Your cart is empty.</Typography>
          )}
        </Grid>
      </Box>
    </>
  );
};

export default CartPage;
