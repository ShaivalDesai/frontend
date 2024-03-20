import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

interface CustomCardProps {
  title: string;
  content: React.ReactNode;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, content }) => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        backgroundColor: "#f1e0c5",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s, background-color 0.3s",
        width: "100%",
        "&:hover": {
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          backgroundColor: "",
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography color="text.secondary">{content}</Typography>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
