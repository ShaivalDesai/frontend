import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { AccountCircle, Link } from "@mui/icons-material";
import DashboardCards from "./Cards";
import ChartCard from "./Charts";
import PieChartCard from "./PieChart"; // Correct import path for PieChartCard component
import MenuIcon from "@mui/icons-material/Menu";
import EditIcon from "@mui/icons-material/Edit";
import Badge from "@mui/material/Badge";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { MenuList, MenuItem, ListItemIcon } from "@mui/material";
import { Popover } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import MainListItems from "./Lists";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import axios from "axios";

let vid: number;
const vidstring = sessionStorage.getItem("v_id");

if (vidstring !== null) {
  vid = parseInt(vidstring);

  var API_URL = `http://127.0.0.1:8000/vendor_dashboard/` + vid;
}

const defaultTheme = createTheme();

const drawerWidth: number = 250;

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
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    backgroundColor: "#f5f5f5",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const [dashboardData, setDashboardData] = useState({
    product_ids: null,
    highest_sale_product_id: null,
    highest_sale_value: null,
    total_sale: null,
    last_month_sales: null,
    all_product_quantity: null,
    monthly_sales: [] as { month: string; quantity: number }[],
    pieChartData: [] as { name: string; value: number }[],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;

        const monthlySalesData = Object.entries(data.monthly_sales ?? {}).map(
          ([month, value]) => ({
            month,
            quantity: value as number,
          })
        );

        const formattedData = Object.entries(
          data.all_product_quantity ?? {}
        ).map(([productId, productData]) => ({
          name: productId,
          value:
            (productData as { "total quantity": number })["total quantity"] ||
            0,
        }));

        setDashboardData({
          product_ids: data.product_ids,
          highest_sale_product_id: data.highest_sale_product_id,
          highest_sale_value: data.highest_sale_value,
          all_product_quantity: data.all_product_quantity,
          total_sale: data.total_sale,
          last_month_sales: data.last_month_sales,
          monthly_sales: monthlySalesData,
          pieChartData: formattedData,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleGoToProfile = () => {
    setAnchorEl(null);
    navigate("/profile");
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

  const openProfile = Boolean(anchorEl);
  const profileId = openProfile ? "profile-popover" : undefined;

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <StyledAppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              backgroundColor: "#724C31",
              pr: "24px",
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
          </Toolbar>
        </StyledAppBar>
        <Drawer
          variant="permanent"
          open={open}
          // onMouseEnter={handleDrawerOpen}
          // onMouseLeave={handleDrawerClose}
        >
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">{MainListItems()}</List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[100],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <DashboardCards
              topSales={dashboardData.highest_sale_value ?? 0}
              totalSales={dashboardData.total_sale ?? 0}
              customers={523}
              last_month_order={dashboardData.last_month_sales ?? 0}
            />

            <br />
            <br />
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <ChartCard
                  title="Monthly Sale"
                  data={dashboardData.monthly_sales}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <PieChartCard
                  title="Pie Chart"
                  data={dashboardData.pieChartData ?? []}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
