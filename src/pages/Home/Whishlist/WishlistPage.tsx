import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
} from "@mui/material";
import { Delete, Add } from "@mui/icons-material";
import Navbar from "../Navbar";

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  image_base64: string[];
}

const WishlistPage = ({
  wishlist: initialWishlist,
}: {
  wishlist: Product[];
}) => {
  const [wishlist, setWishlist] = useState<Product[]>(initialWishlist);
  const [cartState, setCartState] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const tableHeaderStyle: React.CSSProperties = {
    padding: "8px 16px", // Adjusted padding here
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#724c31",
    color: "white",
    fontSize: "21px",
  };

  const tableCellStyle: React.CSSProperties = {
    padding: "8px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    fontSize: "20px",
  };

  const imageStyle: React.CSSProperties = {
    width: "80px",
    height: "auto",
    borderRadius: "8px",
  };

  // useEffect(() => {
  //   const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  //   setWishlist(storedWishlist);
  // }, []);

  const handleRemoveFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(
      (item) => item.product_id !== productId
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const addToCart = (product: Product) => {
    // Fetch the current cart from localStorage or initialize it as an empty array
    const currentCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    ) as Product[];

    // Check if the product is already in the cart
    const isProductInCart = currentCart.some(
      (item: Product) => item.product_id === product.product_id
    );

    if (!isProductInCart) {
      // If the product is not in the cart, add it
      const updatedCart = [...currentCart, product];

      // Update the cart in the local storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Update state (if you're using it to reflect the cart changes immediately in the UI)
      setCartItems(updatedCart); // Assuming setCartItems is managing a state used for rendering
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12}>
            {wishlist.length > 0 ? (
              <TableContainer
                component={Paper}
                elevation={3}
                sx={{
                  borderRadius: "12px",
                  overflowX: "auto",
                  maxWidth: "80%", // Adjust the maximum width as needed
                  margin: "auto",
                }}
              >
                <Table aria-label="wishlist table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={tableHeaderStyle}>
                        Product Image
                      </TableCell>
                      <TableCell style={tableHeaderStyle}>Brand</TableCell>
                      <TableCell style={tableHeaderStyle}>
                        Product Type
                      </TableCell>
                      <TableCell style={tableHeaderStyle}>Price</TableCell>
                      <TableCell style={tableHeaderStyle}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {wishlist.map((product) => (
                      <TableRow key={product.product_id} hover>
                        <TableCell style={tableCellStyle}>
                          <img
                            src={`data:image/jpeg;base64,${product.image_base64}`}
                            alt={product.product_type}
                            style={imageStyle}
                          />
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          {product.brand}
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          {product.product_type}
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          ₹{product.price.toFixed(2)}
                        </TableCell>
                        <TableCell style={tableCellStyle}>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <IconButton
                              aria-label="remove"
                              onClick={() =>
                                handleRemoveFromWishlist(product.product_id)
                              }
                              title="Remove from wishlist"
                              style={{ marginLeft: "80px" }} // Adjust margin as needed
                            >
                              <Delete />
                            </IconButton>
                            <IconButton
                              aria-label="add"
                              onClick={() => addToCart(product)}
                              title="Add to Cart" // Set the title attribute
                            >
                              <Add />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Typography
                style={{ textAlign: "center", fontSize: "25px" }}
                variant="body1"
              >
                Your wishlist is empty!
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default WishlistPage;
