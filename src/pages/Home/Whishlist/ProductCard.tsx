import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onRemove: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
  return (
    <Card style={{ border: "1px solid #ccc", borderRadius: "20px" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>

        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", maxHeight:"135px", borderRadius: "5px" }}
        />
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Button onClick={() => onRemove(product.id)}>Remove</Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
