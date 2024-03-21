import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  MenuList,
  MenuItem,
  ListItemIcon,
  DialogContentText,
} from "@mui/material";
import { Popover } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import DashboardCards from "./Cards2";
import ProductGrid from "../../Components/ProductGrid";
import axios from "axios";

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  photo: string[];
}

const defaultTheme = createTheme();

const drawerWidth = 250;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // marginLeft: drawerWidth,
    // width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ManageProduction = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);

  const navigate = useNavigate();

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  const handleCardClick = async (action: string) => {
    setSelectedAction(action);
    if (action === "View Product" || action === "Delete Product") {
      await fetchProducts();
    }
  };

  // const handleCardClick = async (action: string) => {
  //     setSelectedAction(action);
  //     setSelectedButton(action); // Update selected button
  //     if (action === "View Product" || action === "Delete Product") {
  //       await fetchProducts();
  //     }
  //   };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleGoToProfile = () => {
    setAnchorEl(null);
    navigate("/vendorprofile");
  };

  const handleProfileClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleViewProduct = async () => {
    try {
      const id = 3;
      const response = await fetch("http://127.0.0.1:8000/view/" + id);
      // const response = await fetch("http://127.0.0.1:8000/to_add");
      const data = await response.json();

      if (typeof data === "object") {
        // Convert object to array of products
        const formattedData = Object.values(data).map((product: any) => ({
          product_id: product.product_id,
          product_type: product.product_type,
          brand: product.brand,
          price: product.price,
          photo: [product.photo], // Assuming 'photo' is the base64 encoded image
        }));
        setProductList(formattedData);

        setSelectedAction("View Product");
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const handleViewProductD = async () => {
    try {
      const id = 3;
      const response = await fetch("http://127.0.0.1:8000/remove/" + id);
      const data = await response.json();

      if (typeof data === "object") {
        // Convert object to array of products
        const formattedData = Object.values(data).map((product: any) => ({
          product_id: product.product_id,
          product_type: product.product_type,
          brand: product.brand,
          price: product.price,
          photo: [product.photo], // Assuming 'photo' is the base64 encoded image
        }));
        setProductList(formattedData);
        setSelectedAction("Delete Product");
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  const handleViewAddProduct = async () => {
    try {
      //   const id = 3;
      //   const response = await fetch("http://127.0.0.1:8000/view/" + id);
      const response = await fetch("http://127.0.0.1:8000/to_add");
      const data = await response.json();

      if (typeof data === "object") {
        // Convert object to array of products
        const formattedData = Object.values(data).map((product: any) => ({
          product_id: product.product_id,
          product_type: product.product_type,
          brand: product.brand,
          price: product.price,
          photo: [product.photo],
        }));
        setProductList(formattedData);
        setSelectedAction("Add Product");
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  //   const confirmAddProduct = async () => {
  //     if (selectedProduct) {
  //       try {
  //         const a=1;
  //         const id = 51;

  //         const response = await axios.put(
  //           `http://127.0.0.1:8000/add/${id}`,
  //           selectedProduct
  //         );
  //         if (response.status === 200) {
  //           // If the product is successfully added, fetch the updated product list
  //           fetchProducts();
  //           // Close the add dialog and reset selectedProduct
  //           setAddDialogOpen(false);
  //           setSelectedProduct(null);
  //         } else {
  //           console.error("Failed to add product:", response.data);
  //         }
  //       } catch (error) {
  //         console.error("Failed to add product:", error);
  //       }
  //     }
  //   };

  // const confirmAddProduct = async (productId) => {
  //     if (selectedProduct) {
  //       try {
  //         const response = await axios.put(
  //           `http://127.0.0.1:8000/add/${product_id}`,
  //           selectedProduct
  //         );
  //         if (response.status === 200) {
  //           // If the product is successfully added, fetch the updated product list
  //           fetchProducts();
  //           // Close the add dialog and reset selectedProduct
  //           setAddDialogOpen(false);
  //           setSelectedProduct(null);
  //         } else {
  //           console.error("Failed to add product:", response.data);
  //         }
  //       } catch (error) {
  //         console.error("Failed to add product:", error);
  //       }
  //     }
  //   };

  const confirmAddProduct = async () => {
    if (selectedProduct) {
      try {
        const a = 3;
        // Perform PUT request to add the product
        await axios.put(
          `http://127.0.0.1:8000/add/${a}/${selectedProduct.product_id}`,
          selectedProduct
        );
        // Refresh the product list
        fetchProducts();
        setAddDialogOpen(false);
        setSelectedProduct(null);
      } catch (error) {
        console.error("Failed to add product:", error);
      }
    }
  };

  const fetchProducts = async () => {
    try {
      const id = 3;
      const response = await fetch("http://127.0.0.1:8000/view/" + id);
      const data = await response.json();
      setProductList(
        data.map((product: any) => ({
          product_id: product.product_id,
          product_type: product.product_type,
          brand: product.brand,
          price: product.price,
          photo: product.photo,
        }))
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteDialogOpen(true);
  };

  const handleProductClick1 = (product: Product) => {
    setSelectedProduct(product);
    setAddDialogOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (selectedProduct) {
      try {
        // API call to delete the product
        await fetch(
          `http://127.0.0.1:8000/remove/3/${selectedProduct.product_id}`,
          { method: "DELETE" }
        );
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
        fetchProducts(); // Refresh the product list
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  useEffect(() => {
    handleViewProduct();
  }, []);

  const openProfile = Boolean(anchorEl);
  const profileId = openProfile ? "profile-popover" : undefined;

  return (
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Riot:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <ThemeProvider theme={defaultTheme}>
        <StyledAppBar open={open}>
          <Toolbar
            sx={{
              backgroundColor: "#724C31",
              pr: "24px",
              width: "100%", // Set the toolbar width to 100% to spread over the page
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>

            <img
              src="ff1.png"
              alt="FashionFleet"
              style={{ height: "50px", marginRight: "auto" }}
            />

            <div style={{ marginRight: "780px" }}>
              {" "}
              {/* Align buttons to the right */}
              <IconButton color="inherit" onClick={handleViewProduct}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="view2.png"
                    alt="View Product"
                    style={{ width: "24px" }}
                  />
                  <Typography variant="caption">View Product</Typography>
                </div>
              </IconButton>
              <IconButton color="inherit" onClick={handleViewAddProduct}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="add.png"
                    alt="View Product"
                    style={{ width: "24px" }}
                  />
                  <Typography variant="caption">Add Product</Typography>
                </div>
              </IconButton>
              <IconButton color="inherit" onClick={handleViewProductD}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="delete.png"
                    alt="View Product"
                    style={{ width: "24px" }}
                  />
                  <Typography variant="caption">Delete Product</Typography>
                </div>
              </IconButton>
            </div>

            <IconButton
              color="inherit"
              aria-label="profile"
              edge="end"
              onClick={handleProfileClick}
              sx={{ marginRight: "20px" }}
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Popover
              id={profileId}
              open={openProfile}
              anchorEl={anchorEl}
              onClose={handleProfileClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuList autoFocusItem={openProfile} id="profile-menu">
                <MenuItem onClick={handleGoToProfile}>
                  <ListItemIcon>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>

                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </MenuList>
            </Popover>

            <Dialog
              open={logoutDialogOpen}
              onClose={handleLogoutCancel}
              PaperProps={{
                style: {
                  borderRadius: "10px",
                  width: "350px",
                  height: "175px",
                },
              }}
            >
              <DialogTitle sx={{ color: "#724C31" }}>
                Confirm Logout
              </DialogTitle>

              <DialogContent>
                <Typography variant="body1" sx={{ color: "#724C31" }}>
                  Are you sure you want to logout?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleLogoutCancel}
                  color="primary"
                  sx={{
                    bgcolor: "#724C31",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#724C31",
                    },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleLogoutConfirm}
                  color="primary"
                  autoFocus
                  sx={{
                    bgcolor: "#724C31",
                    color: "white",
                    "&:hover": {
                      bgcolor: "#724C31",
                    },
                  }}
                >
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
            >
              <DialogTitle>{"Confirm Deletion"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this product?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setDeleteDialogOpen(false)}
                  color="primary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmDeleteProduct}
                  color="primary"
                  autoFocus
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={addDialogOpen}
              onClose={() => setAddDialogOpen(false)}
            >
              <DialogTitle>{"Confirm Adding Product"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to add this product?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setAddDialogOpen(false)} color="primary">
                  Cancel
                </Button>
                <Button onClick={confirmAddProduct} color="primary" autoFocus>
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </StyledAppBar>

        {selectedAction && selectedAction === "View Product" && (
          <div style={{ marginTop: "70px" }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontFamily: "'Protest Riot', sans-serif",
                fontWeight: "bold",
                fontSize: "60px",
                color: "red",
                background:
                  "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              View Products
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {productList.map((product, index) => (
                <ProductGrid
                  key={index}
                  product={product}
                  onClick={handleViewProduct}
                />
              ))}
            </div>
          </div>
        )}

        {selectedAction && selectedAction === "Add Product" && (
          <div style={{ marginTop: "70px" }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontFamily: "'Protest Riot', sans-serif",
                fontWeight: "bold",
                fontSize: "60px",
                color: "red",
                background:
                  "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Want to Add any of the Product from below list?
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {productList.map((product, index) => (
                <ProductGrid
                  key={index}
                  product={product}
                  onClick={() => handleProductClick1(product)}
                />
              ))}
            </div>
          </div>
        )}

        {selectedAction && selectedAction === "Delete Product" && (
          <div style={{ marginTop: "70px" }}>
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                fontFamily: "'Protest Riot', sans-serif",
                fontWeight: "bold",
                fontSize: "60px",
                color: "red",
                background:
                  "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Delete Products
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
              {productList.map((product, index) => (
                <ProductGrid
                  key={index}
                  product={product}
                  onClick={() => handleDeleteProduct(product)}
                />
              ))}
            </div>
          </div>
        )}
      </ThemeProvider>
    </>
  );
};

export default ManageProduction;
