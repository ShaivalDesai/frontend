import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface DashboardCardsProps {
  topSales: number;
  totalSales: number;
  customers: number;
  last_month_order: number;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({
  topSales,
  totalSales,
  customers,
  last_month_order,
}) => {
  // Remove local state and useEffect related to fetching and storing data

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              // backgroundColor: "#d4d4d4",
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Top Sales
            </Typography>
            <Typography color="text.secondary">{topSales}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "",
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Total Sales
            </Typography>
            <Typography color="text.secondary">{totalSales}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "",
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Customers
            </Typography>
            <Typography color="text.secondary">{customers}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Card
          sx={{
            borderRadius: "10px",
            backgroundColor: "#f1e0c5",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s, background-color 0.3s",
            "&:hover": {
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              backgroundColor: "",
            },
          }}
        >
          <CardContent>
            <Typography variant="h5" component="h2">
              Last Month Order
            </Typography>
            <Typography color="text.secondary">{last_month_order}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardCards;
