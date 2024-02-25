import React, { useState } from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  onRemove: (productId: number) => void;
  onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove }) => {
  return (
    <Card
      sx={{
        maxWidth: 300, // Decrease the maxWidth
        height: "auto", // Set height to auto to fit content
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
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: "150px", // Decrease the height of the image
          objectFit: "cover",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      />
      <CardContent
        sx={{ padding: "16px", background: "transparent", height: "100%" }}
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
          {product.name}
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
          Price: ${product.price.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => onRemove(product.id)}
          sx={{ borderRadius: "20px", marginTop: "8px", marginRight: "8px" }} // Add marginRight for space between buttons
        >
          Remove
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => onRemove(product.id)} // Use an arrow function to pass product.id as an argument
          sx={{ borderRadius: "20px", marginTop: "8px" }}
        >
          Add to cart
        </Button>
      </CardContent>
    </Card>
  );
};
export default ProductCard;

// import React from "react";
// import { Card, CardContent, Typography, Button } from "@mui/material";

// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
// }

// interface ProductCardProps {
//   product: Product;
//   onRemove: (productId: number) => void;
//   onAddToCart: (productId: number) => void; // Add prop for adding to cart
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product, onRemove, onAddToCart }) => {
//   return (
//     <Card
//     sx={{
//               maxWidth: 300, // Decrease the maxWidth
//               height: "auto", // Set height to auto to fit content
//               boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//               borderRadius: "8px",
//               background:
//                 "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
//               transition: "transform 0.3s, background-color 0.3s",
//               "&:hover": {
//                 transform: "translateY(-4px)",
//                 boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
//               },
//             }}
//     >
//       <img
//         src={product.image}
//         alt={product.name}
//         style={{
//           width: "100%",
//           height: "150px", // Decrease the height of the image
//           objectFit: "cover",
//           borderTopLeftRadius: "8px",
//           borderTopRightRadius: "8px",
//         }}
//       />

//       <CardContent  sx={{ padding: "16px", background: "transparent", height: "100%" }}>
//         <Typography gutterBottom
//           variant="h6"
//           component="div"
//           sx={{
//             fontWeight: 600,
//             lineHeight: 1.2,
//             marginBottom: "8px",
//             color: "#fff",
//                  }}>
//                   {product.name}</Typography>
//         <Typography>{product.description}</Typography>
//         <Typography>Price: ${product.price.toFixed(2)}</Typography>
//         <Button onClick={() => onAddToCart(product.id)}>Add to Cart</Button>
//         <Button onClick={() => onRemove(product.id)}>Remove from Wishlist</Button>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;
