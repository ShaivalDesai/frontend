import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { AccountCircle } from "@mui/icons-material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import { List, Typography } from "@mui/material";

export const mainListItems = (
  <List style={{ padding: 0, backgroundColor: "#f4f4f4" }}>

    
  
    <ListItemButton
      sx={{
        "&:hover": {
          backgroundColor: "#f1e0c5", 
        },
      }}
    >
      <ListItemIcon>
        <PrecisionManufacturingIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
            Manage Production
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton
      sx={{
        "&:hover": {
          backgroundColor: "#f1e0c5", // Brown color on hover
        },
      }}
    >
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
            Sales Forecasting
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton
      sx={{
        "&:hover": {
          backgroundColor: "#f1e0c5", // Brown color on hover
        },
      }}
    >
      <ListItemIcon>
        <CurrencyRupeeIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
            Price Forecasting
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton
      sx={{
        "&:hover": {
          backgroundColor: "#f1e0c5", // Brown color on hover
        },
      }}
    >
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
            Vendor Comparison
          </Typography>
        }
      />
    </ListItemButton>
    <ListItemButton
      sx={{
        "&:hover": {
          backgroundColor: "#f1e0c5", // Brown color on hover
        },
      }}
    >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
            Growth Graph
          </Typography>
        }
      />
    </ListItemButton>
  
  </List>
);
