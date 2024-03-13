import React from "react";
import { Grid, Typography } from "@mui/material";
import ProductCard, { Product } from "./WhishlistProductCard";

interface CartProps {
  wishlist: Product[];
}

const handleRemove = (productId: number) => {};

const handleAddToWishlist = (productId: number) => {};

const wishlist: React.FC<CartProps> = ({ wishlist }) => {
  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"
          rel="stylesheet"
        />
      </head>
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
            My wishlist
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            {wishlist.map((product) => (
              <Grid item key={product.product_id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard
                  product={product}
                  onRemove={handleRemove}
                  onAdd={handleAddToWishlist}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default wishlist;
