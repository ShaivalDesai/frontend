// import React from 'react';
// import Drawer from '@mui/material/Drawer';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

// export default function Dashboard() {
//   const [open, setOpen] = React.useState(false);

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       <IconButton
//         edge="start"
//         color="inherit"
//         aria-label="menu"
//         onClick={toggleDrawer}
//       >
//         <MenuIcon />
//       </IconButton>
//       <Drawer anchor="left" open={open} onClose={toggleDrawer}>
//         <div>
//           <List>
//             <ListItem button key="Inbox">
//               <ListItemIcon>
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Inbox" />
//             </ListItem>
//             <ListItem button key="Starred">
//               <ListItemIcon>
//                 <MailIcon />
//               </ListItemIcon>
//               <ListItemText primary="Starred" />
//             </ListItem>
//             <ListItem button key="Send email">
//               <ListItemIcon>
//                 <MailIcon />
//               </ListItemIcon>
//               <ListItemText primary="Send email" />
//             </ListItem>
//             <ListItem button key="Drafts">
//               <ListItemIcon>
//                 <MailIcon />
//               </ListItemIcon>
//               <ListItemText primary="Drafts" />
//             </ListItem>
//           </List>
//           <Divider />
//           <List>
//             <ListItem button key="All mail">
//               <ListItemIcon>
//                 <MailIcon />
//               </ListItemIcon>
//               <ListItemText primary="All mail" />
//             </ListItem>
//             <ListItem button key="Trash">
//               <ListItemIcon>
//                 <MailIcon />
//               </ListItemIcon>
//               <ListItemText primary="Trash" />
//             </ListItem>
//             <ListItem button key="Spam">
//               <ListItemIcon>
//                 <MailIcon />
//               </ListItemIcon>
//               <ListItemText primary="Spam" />
//             </ListItem>
//           </List>
//         </div>
//       </Drawer>
//     </div>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { AccountCircle } from "@mui/icons-material";
import { InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
// import MyCard from "./ProductCard";
import MyCard from "../Home/ProductCard";

const drawerWidth = 260;

export default function Dashboard() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#724C31",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            FashionFleet
          </Typography>

          {/* Search Box with Icon */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 1,
              marginRight: 2,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
            <IconButton
              type="submit"
              sx={{ p: "10px", color: "gray" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Box>

          {/* Profile Option */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
           
          width: drawerWidth,
          
          flexShrink: 0,
        //   borderRadius:"16px",
        //   [`& .MuiDrawer-paper`]: {
        //     width: drawerWidth,
        //     boxSizing: "border-box",
        //     // borderRadius:"40px",
        //   },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem disablePadding   sx={{mb: 2}} >
              <ListItemButton>
                <ListItemIcon>
                  <PrecisionManufacturingIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      Manage Production
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding sx={{mb: 2}} >
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      Total Sales
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding sx={{mb: 2}} >
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      Top Sales
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      Sales Forecasting
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      Price Forecasting
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      Vendors Comparison
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <LeaderboardIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      Growth Graph
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <MyCard image="bbggg.jpg" title="MENAGE PRODUCTION" color="white" />
          <MyCard image="bbggg.jpg" title="TOTAL SALES" color="white" />
          <MyCard image="bbggg.jpg" title="TOP SALES" color="white" />
          <MyCard image="bbggg.jpg" title="SALES FORECASTING" color="white" />
          {/* <MyCard image="shoes.jpg" title="FOOTWEAR" color="white" /> */}
        </div>

        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "20px", // Adjust the margin as needed
        }}
      >
        <MyCard image="bbggg.jpg" title="PRICE FORECASTING" color="white" />
        <MyCard image="bbggg.jpg" title="VENDORS COMPARISON" color="white" />
        <MyCard image="bbggg.jpg" title="GROWTH GRAPH" color="white" />
        <MyCard image="bbggg.jpg" title="PROFILE" color="white" />
        {/* <MyCard image="home.jpg" title="HOME" color="white" /> */}
      </div>
      </Box>
    </Box>
  );
}
