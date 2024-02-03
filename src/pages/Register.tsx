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
import axios from "axios";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
  gender: string;
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    gender: "",
  });

  // const handleRegister = async () => {
  //   const response = await axios.post("http://localhost:4000/ccc/a", { name,email,password,role,gender });
  //   console.log("response " + JSON.stringify(response.data));
  // };

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const validationError: Partial<FormData> = {};
    if (!formData.name.trim()) {
      validationError.name = "Name is required";
    }

    if (!formData.email.trim()) {
      validationError.email = "Email is required";
    } else if (!/^[^@\s]+@gmail\.com$/.test(formData.email)) {
      validationError.email = "Email is invalid";
    }

    if (!formData.role.trim()) {
      validationError.role = "Role is required";
    }

    setErrors(validationError);
  };

  return (
    <form onSubmit={handleSubmit}>
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
                  value={formData.name}
                  onChange={handleChange}
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
                    value={formData.role}
                    onChange={handleChange}
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
                  value={formData.email}
                  onChange={handleChange}
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
                    value={formData.gender}
                    onChange={handleChange}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
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
export default Register;
