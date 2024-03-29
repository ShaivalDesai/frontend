import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import React, { useEffect, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import CallIcon from "@mui/icons-material/Call";
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
// import DashboardCards from "./Cards2";
// import ProductGrid from "../../Components/ProductGrid";

import axios from "axios";

interface Product {
  product_id: number;
  product_type: string;
  brand: string;
  price: number;
  photo: string[];
}

const defaultTheme = createTheme();

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

const DashboardN = () => {
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

  const forecasting = () => {
    setLogoutDialogOpen(false);
    navigate("/dashboard");
  };

  const dashboard = () => {
    setLogoutDialogOpen(false);
    navigate("/dashboard");
  };

  const productInsight = () => {
    setLogoutDialogOpen(false);
    navigate("/insight");
  };

  const manageProducts = () => {
    setLogoutDialogOpen(false);
    navigate("/manage1");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const handleGoToContact = () => {
    setAnchorEl(null);
    navigate("/contact");
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

            {/* <Button
              style={{
                fontSize: "1.05rem",
                color: "inherit",
                fontFamily: "'Roboto', sans-serif",
                marginRight: "36px",
              }}
              color="inherit"
              onClick={manageProducts}
            >
              Manage Products
            </Button> */}

            {/* <Button
              style={{
                fontSize: "1.05rem",
                color: "inherit",
                fontFamily: "'Roboto', sans-serif",
              }}
              color="inherit"
              onClick={forecasting}
            >
              Forecasting
            </Button> */}
{/* 
            <Button
              style={{
                fontSize: "1.05rem",
                color: "inherit",
                fontFamily: "'Roboto', sans-serif",
              }}
              color="inherit"
              onClick={viewcompetition}
            >
              View Competition
            </Button> */}

            <Button
              style={{
                fontSize: "1.05rem",
                color: "inherit",
                fontFamily: "'Roboto', sans-serif",
              }}
              color="inherit"
              onClick={dashboard}
            >
              DASHBOARD
            </Button>

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

                <MenuItem onClick={handleGoToContact}>
                  <ListItemIcon>
                    <CallIcon fontSize="small" />
                  </ListItemIcon>
                  Contact Us
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
      </ThemeProvider>
    </>
  );
};

export default DashboardN;
