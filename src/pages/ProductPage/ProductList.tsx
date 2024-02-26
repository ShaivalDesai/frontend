import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  CardActionArea,
  Button,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../Home/Navbar";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
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

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "Fashion Jacket",

    price: 1500,
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/c/2/b/s-ml12108-321-manyavar-original-imagtucmpppv7g6w.jpeg?q=70",
    ],
  },
  {
    id: 2,
    name: "Casual Sneakers",

    price: 59.99,
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/t/m/p/l-ml12108-341-manyavar-original-imagtucm5hndcxdp.jpeg?q=70",
    ],
  },
  {
    id: 3,
    name: "Elegant Hat",

    price: 29.99,
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/z/q/g/s-ml12103-310-manyavar-original-imagw5j9yfzgqmve.jpeg?q=70",
    ],
  },
  {
    id: 4,
    name: "Elegant Hat",

    price: 29.99,
    images: [
      "https://rukminim2.flixcart.com/image/612/612/xif0q/kurta/0/s/f/s-ml12126-382-manyavar-original-imagw5j9xakfhywb.jpeg?q=70",
    ],
  },
];

const SingleProductPage = () => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const toggleLike = (productId: number) => {
    if (likedProducts.includes(productId)) {
      // If product is already liked, unlike it
      setLikedProducts(likedProducts.filter((id) => id !== productId));
    } else {
      // If product is not liked, like it
      setLikedProducts([...likedProducts, productId]);
    }
  };
  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={4} justifyContent="center">
          {dummyProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.name}>
              <CustomCard>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    image={product.images[0]}
                    alt={product.name}
                  />
                  {/* Position the heart icon */}
                  <Box position="absolute" top={0} right={0} zIndex={1} p={1}>
                    <IconButton
                      color={
                        likedProducts.includes(product.id)
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
                      {product.name}
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

export default SingleProductPage;
