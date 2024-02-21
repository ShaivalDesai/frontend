import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const WishlistNavbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Wishlist
        </Typography>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default WishlistNavbar;
