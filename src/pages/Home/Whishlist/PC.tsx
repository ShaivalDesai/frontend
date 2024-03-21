import React, { FC } from "react";
import { Card, CardContent, Typography, Button, CardMedia } from "@mui/material";
// import { Product } from "./types";

export interface Product {
    product_id: number;
    product_name: string;
    description: string;
    price: number;
    image_base64: string;
  }

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <Card
      sx={{
        width: "200px",
        height: "350px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        background:
          "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
        transition: "transform 0.3s, background-color 0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <CardMedia
        component="img"
        height="150"
        image={product.image_base64}
        alt={product.product_name}
      />
      <CardContent
        sx={{ padding: "12px", background: "transparent", height: "100%" }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            fontWeight: 600,
            lineHeight: 1.2,
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          {product.product_name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: "14px",
            marginBottom: "8px",
            color: "#fff",
          }}
        >
          {product.description}
        </Typography>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          Price: ₹{product.price}
        </Typography>
        <Button
          onClick={() => onAddToCart(product)}
          variant="contained"
          sx={{ borderRadius: "20px", marginTop: "8px", marginRight: "8px" }}
        >
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;