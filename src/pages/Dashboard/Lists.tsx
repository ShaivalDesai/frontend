import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { AccountCircle } from "@mui/icons-material";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { useNavigate } from "react-router-dom";
import { JSX } from "react/jsx-runtime";

const listItemData = [
  {
    icon: <PrecisionManufacturingIcon />,
    primaryText: "Manage Products",
    onClick: () => {
      console.log("Clicked on: Manage Production");
    },
  },
  {
    icon: <ShoppingCartIcon />,
    primaryText: "Sales Forecasting",
    onClick: () => {
      console.log("Clicked on: Sales Forecasting");
    },
  },
  {
    icon: <CurrencyRupeeIcon />,
    primaryText: "Price Forecasting",
    onClick: () => {
      console.log("Clicked on: Price Forecasting");
    },
  },
  {
    icon: <BarChartIcon />,
    primaryText: "View Competition",
    onClick: () => {
      console.log("Clicked on: Vendor Comparison");
    },
  },
  {
    icon: <LayersIcon />,
    primaryText: "Product Insights",
    onClick: () => {
      console.log("Clicked on: Growth Graph");
    },
  },
  {
    icon: <AccountCircle />,
    primaryText: "Profile",
    onClick: () => {},
  },
];

const MainListItems = () => {
  const navigate = useNavigate();

  const handleClick = (item: {
    icon?: JSX.Element;
    primaryText: any;
    onClick: any;
  }) => {
    if (item.onClick) {
      item.onClick();
    }
    if (item.primaryText === "Profile") {
      navigate("/vendorprofile");
    }

    if (item.primaryText === "Manage Products") {
      navigate("/manage1");
    }

    if (item.primaryText === "Product Insights") {
      navigate("/insight");
    }

    if (item.primaryText === "Sales Forecasting") {
      navigate("/sales");
    }

    if (item.primaryText === "Price Forecasting") {
      navigate("/price");
    }
    if (item.primaryText === "View Competition") {
      navigate("/competition");
    }
  };

  return (
    // <div style={{backgroundColor:"#d4d4d4"}}>
    <List style={{ padding: 0, backgroundColor: "#d4d4d4" }}>
      {listItemData.map((item, index) => (
        <ListItemButton
          key={index}
          onClick={() => handleClick(item)}
          sx={{
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText
            primary={
              <Typography fontWeight="bold" sx={{ fontSize: "16px" }}>
                {item.primaryText}
              </Typography>
            }
          />
        </ListItemButton>
      ))}
    </List>
    // </div>
  );
};

export default MainListItems;
