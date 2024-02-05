import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Stack,
  Paper,
  IconButton,
} from "@mui/material";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  gender: string;
  dob: string;
}

const RegistrationUser = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleRegister = async () => {
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!role.trim()) {
      validationErrors.role = "Select Role";
    }

    if (!gender.trim()) {
      validationErrors.gender = "Select Gender";
    }

    if (!dob.trim()) {
      validationErrors.dob = "Date of Birth is required";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      validationErrors.password =
        "Password must contain at least one uppercase and one lowercase letter";
    } else if (!/\d/.test(password)) {
      validationErrors.password = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      validationErrors.password =
        "Password must contain at least one special character";
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== password) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    // if (!phoneNumber.trim()) {
    //     validationErrors.phoneNumber = "Confirm Password is required";
    //   } else if (confirmPassword !== password) {
    //     validationErrors.confirmPassword = "Passwords do not match";
    //   }



    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          {
            name,
            email,
            password,
            role,
            gender,
            dob,
          }
        );
        console.log("response " + JSON.stringify(response.data));
        navigate("/home");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={3}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Register</Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <div style={{ color: "red" }}>
                    {errors.name && <span>{errors.name}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div style={{ color: "red" }}>
                    {errors.email && <span>{errors.email}</span>}
                  </div>
                </Grid>

                
                <Grid item xs={12}>
                  <PhoneInput
                    country={"in"} // Set the default country, you can change it based on your requirements
                    value={phoneNumber}
                    onChange={(value) => setPhoneNumber(value)}
                    inputStyle={{
                      width: "100%",
                      height: "2.5rem",
                      fontSize: "1rem",
                      padding: "0.5rem",
                    }}
                  />
                  <div style={{ color: "red" }}>
                    {/* Add validation error message if needed */}
                  </div>
                </Grid>
                

                <Grid item xs={12}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="gender"
                      name="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      label="Gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <div style={{ color: "red" }}>
                    {errors.gender && <span>{errors.gender}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    id="dob"
                    label="Date of Birth"
                    name="dob"
                    InputLabelProps={{ shrink: true }}
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />

                  <div style={{ color: "red" }}>
                    {errors.dob && <span>{errors.dob}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      ),
                    }}
                  />

                  <div style={{ color: "red" }}>
                    {errors.confirmPassword && (
                      <span>{errors.confirmPassword}</span>
                    )}
                  </div>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleRegister}
              >
                Register
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Login</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Container>
    </form>
  );
};
export default RegistrationUser;
