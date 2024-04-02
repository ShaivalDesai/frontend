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
import { RadioGroup, Radio, IconButton } from "@mui/material";
import { FormControl, FormLabel } from "react-bootstrap";
import { useState } from "react";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  validateEmail,
  validatePassword,
  validateUserType,
  validateConfirmPassword,
  validateConfirmEmail,
  validateName,
  validatePhoneNumber,
} from "../../validation";

const defaultTheme = createTheme();

interface FormData {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmupwd: string;
  number: string;
  user_type: string;
}

export default function Register() {
  const [email, setEmail] = React.useState<string>("");
  const [confirmEmail, setConfirmEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [user_type, setUser_type] = React.useState<string>("");
  const [name, setName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [validPhoneNumber, setValidPhoneNumber] = useState<string>("");
  const [showRegisterForm, setShowRegisterForm] = React.useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmupwd, setShowConfirmupwd] = useState<boolean>(false);
  const [confirmupwd, setConfirmupwd] = useState<string>("");

  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    console.log("Inside");
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    validationErrors.name = validateName(name);
    validationErrors.email = validateEmail(email);
    validationErrors.password = validatePassword(password);
    validationErrors.confirmupwd = validateConfirmPassword(
      password,
      confirmupwd
    );
    validationErrors.confirmEmail = validateConfirmEmail(email, confirmEmail);
    validationErrors.user_type = validateUserType(user_type);

    validationErrors.number = validatePhoneNumber(number);

    setErrors(validationErrors);
    console.log("validationErrors");

    if (Object.values(validationErrors).every((error) => !error)) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/register", {
          name,
          email,
          password,
          user_type,
          number,
        });
        console.log(response.data);
        alert(response.data.status);
        navigate("/login");
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            window.alert(error.response.status);
            setErrors({ ...errors, email: "Email already exists" });
          } else {
            console.error("Error during registration:", error.message);
          }
        } else {
          console.error("Error during registration:", error);
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
          md={8}
          sx={{
            backgroundImage: `url("/p1.jpeg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={4} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 1,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#724C31", height: 65, width: 65, marginTop:"30px" }}>
              <LockOutlinedIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5" >
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="dense"
                required
                fullWidth
                id="name"
                label="Name/Company's Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputLabelProps={{
                  style: { color: "#724C31" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.name && <span>{errors.name}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                InputLabelProps={{
                  style: { color: "#724C31" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.email && <span>{errors.email}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="confirmEmail"
                label="Confirm Email Address"
                name="confirmEmail"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                InputLabelProps={{
                  style: { color: "#724C31" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.confirmEmail && <span>{errors.confirmEmail}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                id="unumber"
                label="Phone Number"
                name="number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                inputProps={{ maxLength: 10 }}
                InputLabelProps={{
                  style: { color: "#724C31" }, // Set label color to #724C31
                }}
              />
              <div style={{ color: "red" }}>
                {errors.number && <span>{errors.number}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                InputLabelProps={{
                  style: { color: "#724C31" },
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <div style={{ color: "red" }}>
                {errors.password && <span>{errors.password}</span>}
              </div>

              <TextField
                margin="dense"
                required
                fullWidth
                name="confirmupwd"
                label="Confirm Password"
                type={showConfirmupwd ? "text" : "password"}
                id="confirmupwd"
                value={confirmupwd}
                onChange={(e) => setConfirmupwd(e.target.value)}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
                InputLabelProps={{
                  style: { color: "#724C31" },
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton
                      onClick={() => setShowConfirmupwd(!showConfirmupwd)}
                      edge="end"
                    >
                      {showConfirmupwd ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />

              <div style={{ color: "red" }}>
                {errors.confirmupwd && <span>{errors.confirmupwd}</span>}
              </div>

              <RadioGroup
                row // This prop aligns the radio buttons horizontally
                aria-label="option"
                name="option"
                onChange={(e) => setUser_type(e.target.value)}
              >
                <FormControlLabel
                  value="Customer"
                  control={<Radio />}
                  label="Customer"
                  style={{ color: "#724C31" }}
                />
                <FormControlLabel
                  value="Vendor"
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
                onClick={handleRegister}
              >
                Register
              </Button>
              <Grid container justifyContent="center" sx={{marginTop:"-10px"}}>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Login
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
