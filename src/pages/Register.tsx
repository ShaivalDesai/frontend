// import React, { useEffect, useState } from "react";
// import AuthForm from "./AuthForm";

// const Register = () => {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleRegister = () => {};

//   fetch('http://localhost:4000/ccc/b')
//   .then(response => response.json())
//   .then(json => console.log(json))

//   return (
//     <AuthForm
//       formType="register"
//       credentials={credentials}
//       onChange={handleChange}
//       onSubmit={handleRegister}
//     />
//   );
// };

// export default Register;

import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    // Handle registration logic using formData
    // setFormError(validate(formData));
    console.log("Registration Data:", formData);
  };

  const handleSubmit = (e: any) => {
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

    if (!formData.name.trim()) {
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
            mt: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
                <TextField
                  required
                  fullWidth
                  id="role"
                  label="Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                />
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
