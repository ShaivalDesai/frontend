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
    <>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Protest+Riot&display=swap"
          rel="stylesheet"
        />
      </head>

      <Box
        sx={{
          flexGrow: 1,
          // fontStyle: "italic",
          // fontFamily: "'Protest Riot', sans-serif",
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
                style={{
                  textDecoration: "none",
                  fontSize: "1.75em",
                  color: "inherit",
                  fontFamily: "'Protest Riot', sans-serif",
                }}
              >
                FashionFleet
              </RouterLink>
            </Typography>
            <Typography sx={{ flexGrow: 50 }}>
              <Button
                style={{
                  textDecoration: "none",
                  fontSize: "1.10rem",
                  color: "inherit",
                  fontFamily: "'Protest Riot', sans-serif",
                }}
                color="inherit"
                component={RouterLink}
                to="/contact"
              >
                Men
              </Button>
              <Button
                style={{
                  fontSize: "1.10rem",
                  color: "inherit",
                  fontFamily: "'Protest Riot', sans-serif",
                }}
                color="inherit"
                component={RouterLink}
                to="/contact"
              >
                Women
              </Button>
              <Button
                style={{
                  fontSize: "1.10rem",
                  color: "inherit",
                  fontFamily: "'Protest Riot', sans-serif",
                }}
                color="inherit"
                component={RouterLink}
                to="/contact"
              >
                Boys
              </Button>
              <Button
                style={{
                  fontSize: "1.10rem",
                  color: "inherit",
                  fontFamily: "'Protest Riot', sans-serif",
                }}
                color="inherit"
                component={RouterLink}
                to="/contact"
              >
                Girls
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
            <Button
              style={{
                fontSize: "1.10rem",
                color: "inherit",
                fontFamily: "'Protest Riot', sans-serif",
              }}
              color="inherit"
              onClick={wishlist}
            >
              Wishlist
            </Button>
            <Button
              style={{
                fontSize: "1.10rem",
                color: "inherit",
                fontFamily: "'Protest Riot', sans-serif",
              }}
              color="inherit"
              onClick={cart}
            >
              Cart
            </Button>
            <Button
              style={{
                fontSize: "1.10rem",
                color: "inherit",
                fontFamily: "'Protest Riot', sans-serif",
              }}
              color="inherit"
              component={RouterLink}
              to="/contact"
            >
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
    </>
  );
};

export default Navbar;
function setLogoutDialogOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}


// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
//   InputBase,
//   useMediaQuery,
//   useTheme,
//   Button,
// } from "@mui/material";
// import { Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
// import { Link as RouterLink } from "react-router-dom";
// import { styled, alpha } from "@mui/material/styles";

// const Search = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: theme.spacing(1),
//   marginRight: theme.spacing(1),
//   width: "auto",
//   [theme.breakpoints.up("sm")]: {
//     width: "auto",
//   },
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 2),
//     transition: theme.transitions.create("width"),
//     width: "120px",
//     "&:focus": {
//       width: "200px",
//     },
//   },
// }));

// const Navbar: React.FC = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const drawer = (
//     <div>
//       <List>
//         {["Men", "Women", "Boys", "Girls"].map((text, index) => (
//           <ListItem button key={text} component={RouterLink} to={`/${text.toLowerCase()}`} onClick={handleDrawerToggle}>
//             <ListItemText primary={text} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );

//   return (
//     <AppBar position="static" sx={{ backgroundColor: "#724C31" }}>
//       <Toolbar>
//         {isMobile ? (
//           <>
//             <IconButton
//               color="inherit"
//               aria-label="open drawer"
//               edge="start"
//               onClick={handleDrawerToggle}
//               sx={{ mr: 2, display: 'block' }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: 'block' }}>
//               FashionFleet
//             </Typography>
//             <Drawer
//               variant="temporary"
//               anchor="left"
//               open={mobileOpen}
//               onClose={handleDrawerToggle}
//               ModalProps={{
//                 keepMounted: true, // Better open performance on mobile.
//               }}
//             >
//               {drawer}
//             </Drawer>
//           </>
//         ) : (
//           <>
//             <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
//               <RouterLink to="/home" style={{ textDecoration: "none", color: "inherit" }}>FashionFleet</RouterLink>
//             </Typography>
//             <Search>
//               <SearchIcon />
//               <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
//             </Search>
//             <Box sx={{ display: 'flex' }}>
//               {["Men", "Women", "Boys", "Girls"].map((text) => (
//                 <Button color="inherit" key={text} component={RouterLink} to={`/${text.toLowerCase()}`}>
//                   {text}
//                 </Button>
//               ))}
//             </Box>
//           </>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Navbar;
