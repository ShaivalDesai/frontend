import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  InputBase,
  ListItemIcon,
  MenuList,
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  ShoppingCart,
  AccountCircle,
  Search as SearchIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: "alpha(theme.palette.common.white, 0.25)",
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // Vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  // const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false);
    navigate("/login");
  };

  const wishlist = () => {
    // setLogoutDialogOpen(false);
    navigate("/whishlist");
  };

  const cart = () => {
    // setLogoutDialogOpen(false);
    navigate("/cart");
  };

  const handleProfileClick = (event: any) => {
    setAnchorEl(event.currentTarget); // Open the profile menu
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClose = () => {
    setAnchorEl(null); // Close the profile menu
  };

  const handleGoToProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const openProfile = Boolean(anchorEl);
  const profileId = openProfile ? "profile-popover" : undefined;

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        fontStyle: "italic",
        fontSize: "1.5rem",
      }}
    >
      <AppBar
        position="static"
        sx={{ backgroundColor: "#724C31", width: "100vw" }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <RouterLink
              to="/home"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              FashionFleet
            </RouterLink>
            <Button color="inherit" component={RouterLink} to="/contact">
              Men
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              Women
            </Button>
            <Button color="inherit" component={RouterLink} to="/contact">
              Fashion
            </Button>
          </Typography>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Button color="inherit" onClick={wishlist}> 
            Wishlist
          </Button>
          <Button color="inherit" onClick={cart}>
            Cart
          </Button>
          <Button color="inherit" component={RouterLink} to="/contact">
            Contact
          </Button>
          <IconButton
            color="inherit"
            aria-label="profile"
            edge="end"
            onClick={handleProfileClick}
            style={{ marginRight: "10px" }}
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
            <DialogTitle sx={{ color: "#724C31" }}>Confirm Logout</DialogTitle>
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

          {/* <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleLogout}
            color="inherit"
          >
            <LogoutIcon />
          </IconButton> */}
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
};

export default Navbar;
function setLogoutDialogOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}
