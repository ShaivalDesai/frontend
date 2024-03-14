import React from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

interface DashboardCardsProps {
  name: string;
  onClick?: () => void; // Define onClick prop as optional function
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ name, onClick }) => {
  return (
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
            cursor: "pointer", // Change cursor to pointer on hover
          },
        }}
        onClick={onClick} // Attach onClick handler to the card
      >
        <CardContent>
          <Typography variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DashboardCards;
