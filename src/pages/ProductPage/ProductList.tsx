// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
//   Grid,
//   Box,
//   CardActionArea,
//   IconButton,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";
// import Navbar from "../Home/Navbar";
// import FavoriteIcon from "@mui/icons-material/Favorite";

// interface Product {
//   id: number;
//   product_type: string;
//   brand: string;
//   price: number;
//   image_base64: string[];
// }

// const CustomCard = styled(Card)(({ theme }) => ({
//   maxWidth: 345,
//   maxHeight: 570,
//   width: "100%",
//   margin: "auto",
//   transition: "0.3s",
//   borderRadius: "10px",
//   "&:hover": {
//     transform: "scale(1.05)",
//     boxShadow: theme.shadows[20],
//   },
// }));

// const CustomCardMedia = styled(CardMedia)({
//   height: 260,
//   transition: "0.3s",
//   "&:hover": {
//     opacity: 0.8,
//   },
// });

// const ProductNameTypography = styled(Typography)({
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   textOverflow: "ellipsis",
// });

// const ProductPage = () => {
//   const [likedProducts, setLikedProducts] = useState<number[]>([]);
//   const [products, setProducts] = useState<Product[]>([]);
//   const navigate = useNavigate();
//   const location = useLocation();

//   useEffect(() => {
//     const fetchProducts = async (category: string) => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:8000/products/?category=${category}`
//         );
//         // Convert data dictionary into array of products
//         const productsArray: Product[] = Object.values(response.data);
//         setProducts(productsArray);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     const queryParams = new URLSearchParams(location.search);
//     const category = queryParams.get("category");
//     if (category) {
//       fetchProducts(category);
//     }
//   }, [location.search]);

//   const toggleLike = (productId: number) => {
//     if (likedProducts.includes(productId)) {
//       setLikedProducts(likedProducts.filter((id) => id !== productId));
//     } else {
//       setLikedProducts((prevLikedProducts) => [...prevLikedProducts, productId]);
//     }
//   };

//   const navigateToWishlist = () => {
//     navigate("/wishlist", { state: { likedProducts } });
//   };

//   return (
//     <>
//       <Navbar />
//       <Box sx={{ flexGrow: 1, padding: 3 }}>
//         <Grid container spacing={4} justifyContent="center">
//           {products.map((product) => (
//             <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
//               <CustomCard>
//                 <CardActionArea>
//                   {/* <CardMedia
//                     component="img"
//                     image={
//                       product.image_base64.length > 0
//                         ? product.image_base64[0]
//                         : ""
//                     }
//                     alt={product.product_type}
//                   /> */}
//                    <CardMedia
//                       component="img"
//                       src={`data:image/jpeg;base64,${product.image_base64}`}
//                       alt={product.product_type}
//                     />

//                   <Box position="absolute" top={0} right={0} zIndex={1} p={1}>
//                     <IconButton
//                       color={
//                         likedProducts.includes(product.id)
//                           ? "primary"
//                           : "default"
//                       }
//                       onClick={() => toggleLike(product.id)}
//                     >
//                       <FavoriteIcon />
//                     </IconButton>
//                   </Box>
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
//           ))}
//         </Grid>
//       </Box>
//     </>
//   );
// };

// export default ProductPage;


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CardActionArea,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../Home/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Product {
  id: number;
  product_type: string;
  brand: string;
  price: number;
  image_base64: string[];
}

const CustomCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  maxHeight: 570,
  width: "100%",
  margin: "auto",
  transition: "0.3s",
  borderRadius: "10px",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[20],
  },
}));

const CustomCardMedia = styled(CardMedia)({
  height: 260,
  transition: "0.3s",
  "&:hover": {
    opacity: 0.8,
  },
});

const ProductNameTypography = styled(Typography)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

const ProductPage = () => {
  const [likedProducts, setLikedProducts] = useState<{ [key: number]: boolean }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async (category: string) => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/products/?category=${category}`
        );
        // Convert data dictionary into array of products
        const productsArray: Product[] = Object.values(response.data);
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category");
    if (category) {
      fetchProducts(category);
    }
  }, [location.search]);

  const toggleLike = (productId: number) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId],
    }));
  };

  const navigateToWishlist = () => {
    navigate("/wishlist", { state: { likedProducts } });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <CustomCard>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    src={`data:image/jpeg;base64,${product.image_base64}`}
                    alt={product.product_type}
                  />
                  <Box position="absolute" top={0} right={0} zIndex={1} p={1}>
                    <IconButton
                      color={
                        likedProducts[product.id]
                          ? "primary"
                          : "default"
                      }
                      onClick={() => toggleLike(product.id)}
                    >
                      <FavoriteIcon />
                    </IconButton>
                  </Box>
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
        </Grid>
      </Box>
    </>
  );
};

export default ProductPage;
