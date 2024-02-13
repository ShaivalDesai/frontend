import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RadioGroup, Radio } from "@mui/material";
import { FormControl, FormLabel } from "react-bootstrap";

const defaultTheme = createTheme();

interface FormData {
  email: string;
  password: string;
  user_type: string;
}

export default function LoginUser() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user_type, setUser_type] = React.useState<string>("");
  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowRegisterForm(true); // Show the registration form when the link is clicked
  };

  const handleLogin = async () => {
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }

    if (!user_type.trim()) {
      validationErrors.user_type = "User Type selection is required";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/login/user", {
          email,
          password,
          user_type,
        });

        // Check if the response indicates successful login
        if (response.status === 200) {
          console.log("Login successful");
          alert(response.data.status);

          // Redirect based on user type
          if (user_type === "buyer") {
            navigate("/home");
          } else if (user_type === "vendor") {
            navigate("/dashboard");
          }
        } else {
          alert(response.data.detail);
          console.error("Login failed: Incorrect password");
        }
      } catch (error: any) {
        console.error("Error during login:", error);

        // Check if the error is due to incorrect credentials (400 Bad Request)
        if (error.response && error.response.status === 400) {
          window.alert("Incorrect credentials");
          console.error("Login failed: Incorrect credentials");
        }
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={8.7}
          sx={{
            backgroundImage: `url("/p1.jpeg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={3.3}
          component={Paper}
          elevation={6}
          square
          // sx={{backgroundColor:"#f3ead6",}}
        >
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              // backgroundImage: `url("/p1.jpeg")`,
              // backgroundColor:"#c6a27b"
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#724C31", height: 65, width: 65 }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: "#724C31" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.email && <span>{errors.email}</span>}
              </div>

              {/* <div style={{ color: "red"}} >
    {errors.email && <span>{errors.email}</span>}
  </div> */}

              <TextField
                // style={{ marginBottom: 18 }}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                InputLabelProps={{
                  style: { color: "#724C31" }, // Set label color to #5C3D24
                }}
              />
              <div style={{ color: "red", marginBottom: 14 }}>
                {errors.password && <span>{errors.password}</span>}
              </div>

              <Typography style={{ color: "#67442b", marginBottom: -5 }}>
                Please select an option:
              </Typography>

              {/* RadioGroup with options aligned horizontally */}
              <RadioGroup
                row // This prop aligns the radio buttons horizontally
                aria-label="option"
                name="option"
                value={user_type}
                onChange={(e) => setUser_type(e.target.value)}
                // defaultValue="user" // Optionally set a default value
              >
                <FormControlLabel
                  value="buyer"
                  control={<Radio />}
                  label="Buyer"
                  style={{ color: "#724C31" }}
                />
                <FormControlLabel
                  value="vendor"
                  control={<Radio />}
                  label="Vendor"
                  style={{ color: "#724C31" }}
                />
              </RadioGroup>

              <div style={{ color: "red" }}>
                {errors.user_type && <span>{errors.user_type}</span>}
              </div>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#724C31",
                  "&:hover": {
                    bgcolor: "#4A2F21",
                  },
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="RegisterUser"
                    variant="body2"
                    onClick={handleRegisterClick}
                  >
                    {"Don't have an account? Register"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
