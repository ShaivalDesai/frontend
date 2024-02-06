import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Card,
  CardContent,
  Typography,
  styled,
  Grid,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

// Custom styled Radio component
const BigRadio = styled(Radio)(({ theme }) => ({
  "& .MuiSvgIcon-root": {
    // Target the inner SVG icon of the Radio button
    fontSize: "2rem", // Increase the icon size
  },
}));

const Register = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
    // Navigate based on the selection
    if (event.target.value === "user") {
      navigate("/user");
    } else if (event.target.value === "vendor") {
      navigate("/vendor");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('/bg5.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 500,
          padding: "20px",
          textAlign: "center",
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
            Choose Your Role
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              row
              aria-label="userType"
              name="userType"
              value={selectedValue}
              onChange={handleChange}
            >
              <FormControlLabel
                value="user"
                control={<BigRadio />}
                label={
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.75rem",
                    }}
                  >
                    User
                  </span>
                }
              />
              <FormControlLabel
                value="vendor"
                control={<BigRadio />}
                label={
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "1.75rem",
                    }}
                  >
                    Vendor
                  </span>
                }
              />
            </RadioGroup>
          </FormControl>
        </CardContent>

        <Grid
          container
          justifyContent="center"
          style={{
            marginTop: "20px", // Adjust the margin as needed
          }}
        >
          <Grid item>
            <Link to="/login" style={{ fontSize: "1.0rem", color: "#1976D2" }}>
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Register;
