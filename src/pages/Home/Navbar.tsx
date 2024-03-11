import React, { useRef, useState } from "react";
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
  Popover,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuList,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  ShoppingCart,
  AccountCircle,
  Search as SearchIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CallIcon from "@mui/icons-material/Call";
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
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false); // State variable for controlling logout dialog visibility
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const isMenuOpen = Boolean(anchorEl);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/products/?search=${searchQuery}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchResultClick = (result: any) => {
    setSearchQuery(result.title);
    setSearchResults([]);
  };

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      handleSearch(); // Trigger the search action if there is a search query
    }
    setShowDropdown(true); // Open the dropdown
  };

  const handleCancelSearch = () => {
    setSearchQuery(""); // Clear search query
    setShowDropdown(false); // Close dropdown
  };

  // Inside Navbar component

  useEffect(() => {
    // Close dropdown when clicking outside of it
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogoutDialogOpen(true); // Open logout dialog when the user clicks logout
  };

  const handleLogoutConfirm = () => {
    setLogoutDialogOpen(false); // Close logout dialog
    navigate("/login");
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false); // Close logout dialog when the user cancels
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
      <MenuItem onClick={handleMenuClose}></MenuItem>
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
                to={{ pathname: "/product", search: "?category=men" }}
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
                to={{ pathname: "/product", search: "?category=women" }}
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
                to={{ pathname: "/product", search: "?category=boys" }}
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
                to={{ pathname: "/product", search: "?category=girls" }}
              >
                Girls
              </Button>
            </Typography>

            <Search>
              <IconButton
                style={{ color: "white" }}
                onClick={handleSearchIconClick}
              >
                <SearchIcon />
              </IconButton>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />

              {searchQuery && (
                <IconButton
                  style={{ color: "white" }}
                  onClick={handleCancelSearch}
                >
                  <CancelIcon />
                </IconButton>
              )}
            </Search>
            {/* Render search results */}
            {showDropdown && searchResults.length > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: "100%",
                  // Adjust this value if necessary
                  left: 0,
                  zIndex: 1,
                  width: "100%",
                  backgroundColor: "rgba(139, 69, 19, 0.5)",
                  borderRadius: "4px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  maxHeight: "300px",
                  overflowY: "auto",
                }}
              >
                {searchResults.map((result: any, index: number) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleSearchResultClick(result);
                      setShowDropdown(false);
                    }}
                  >
                    {result.title}
                  </MenuItem>
                ))}
              </Box>
            )}

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

            <IconButton
              color="inherit"
              title=""
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
                <MenuItem onClick={handleGoToProfile}>
                  <ListItemIcon>
                    <CallIcon fontSize="small" />
                  </ListItemIcon>
                  Contact
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
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
