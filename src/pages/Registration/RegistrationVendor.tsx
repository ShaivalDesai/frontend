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
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  gender: string;
}

const RegistrationVendor = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [gender, setGender] = useState<string>("");

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
          }
        );
        console.log("response " + JSON.stringify(response.data));
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc", // Add border here
            borderRadius: "5px", // Optional: if you want rounded corners
            padding: "20px", // Add some padding to ensure content is not sticking to the border
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)", // Optional: add some shadow for depth
            backgroundImage:'url(https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fbackground%2F&psig=AOvVaw1Cc2uJZt2lGT2v8aXNVGVd&ust=1707200907758000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLCa3Y_Jk4QDFQAAAAAdAAAAABAE)',
            backgroundColor: "white", // Optional: in case you want to make sure the background is white
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
                <FormControl fullWidth required variant="outlined">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    label="Role"
                  >
                    <MenuItem value="User">User</MenuItem>
                    <MenuItem value="Admin">Vendor</MenuItem>
                  </Select>
                </FormControl>
                <div style={{ color: "red" }}>
                  {errors.role && <span>{errors.role}</span>}
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
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div style={{ color: "red" }}>
                  {errors.password && <span>{errors.password}</span>}
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
      </Container>
    </form>
  );
};
export default RegistrationVendor;
