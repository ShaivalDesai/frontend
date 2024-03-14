import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { MenuList, MenuItem, ListItemIcon } from "@mui/material";
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
// import ProductGrid from "../../Components/ProductGrid";
// import ProductCard from "../../Components/ProductGrid";

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
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [productList, setProductList] = useState<Product[]>([]);

  const handleCardClick = (action: string) => {
    setSelectedAction(action);
  };

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
      const id = 1;
      const response = await fetch("http://127.0.0.1:8000/view/" + id);
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
          </Toolbar>
        </StyledAppBar>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically (if applicable)
            gap: "20px",
            flexWrap: "wrap", // Allow wrapping
            paddingTop: "80px", // Adjust based on AppBar height
            margin: "0 auto", // Center the container itself
            maxWidth: "90%", 
          }}
        >
          <DashboardCards name="View Product" onClick={handleViewProduct} />
          <DashboardCards name="Add Product" />
          <DashboardCards
            name="Update Product"
            onClick={() => handleCardClick("Update Product")}
          />
          <DashboardCards
            name="Delete Product"
            onClick={() => handleCardClick("Delete Product")}
          />
        </div>
        {selectedAction && selectedAction === "View Product" && (
          <div style={{ marginTop: "20px" }}>
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
                <ProductGrid key={index} product={product} />
              ))}
            </div>
          </div>
        )}
      </ThemeProvider>
    </>
  );
};

export default ManageProduction;
