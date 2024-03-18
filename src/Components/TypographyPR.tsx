import React from "react";
import Typography from "@mui/material/Typography";

const CustomTypography: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Typography
      variant="h4"
      sx={{
        marginTop: "70px",
        textAlign: "center",
        fontFamily: "'Protest Riot', sans-serif",
        fontWeight: "bold",
        fontSize: "60px",
        color: "red",
        background:
          "linear-gradient(45deg, #8B4513 30%, #5D4037 60%, #BCAAA4 90%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </Typography>
  );
};

export default CustomTypography;
