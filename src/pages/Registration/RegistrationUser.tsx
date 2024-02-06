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
  uname: string;
  uemail: string;
  upwd: string;
  confirmupwd: string;
  ugender: string;
  udob: string;
  unumber: string;
}

const RegistrationUser = () => {
  const [uname, setUname] = useState<string>("");
  const [uemail, setUemail] = useState<string>("");
  const [upwd, setUpwd] = useState<string>("");
  const [showupwd, setShowupwd] = useState<boolean>(false);
  const [showConfirmupwd, setShowConfirmupwd] = useState<boolean>(false);
  const [confirmupwd, setConfirmupwd] = useState<string>("");

  const [ugender, setUgender] = useState<string>("");
  const [udob, setUdob] = useState<string>("");
  const [unumber, setUnumber] = useState<string>("");
  const [validPhoneNumber, setValidPhoneNumber] = useState("");

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleRegister = async () => {
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    if (!uname.trim()) {
      validationErrors.uname = "Name is required";
    }

    if (!uemail.trim()) {
      validationErrors.uemail = "Email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(uemail)) {
      validationErrors.uemail = "Email is invalid";
    }

    if (!ugender.trim()) {
      validationErrors.ugender = "Select gender";
    }

    if (!udob.trim()) {
      validationErrors.udob = "Date of Birth is required";
    }

    if (!upwd.trim()) {
      validationErrors.upwd = "Password is required";
    } else if (upwd.length < 8) {
      validationErrors.upwd = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(upwd) || !/[a-z]/.test(upwd)) {
      validationErrors.upwd =
        "Password must contain at least one uppercase and one lowercase letter";
    } else if (!/\d/.test(upwd)) {
      validationErrors.upwd = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(upwd)) {
      validationErrors.upwd =
        "Password must contain at least one special character";
    }

    if (!confirmupwd.trim()) {
      validationErrors.confirmupwd = "Confirm Password is required";
    } else if (confirmupwd !== upwd) {
      validationErrors.confirmupwd = "Password do not match";
    }

    const isValidPhoneNumber = (unumber: string) => {
      const phoneRegex = /^[6789]\d{9}$/;
      // Assumes 10-digit phone number, modify as needed
      return phoneRegex.test(unumber);
    };

    if (!unumber) {
      validationErrors.unumber = "Phone number is required";
    } else if (!isValidPhoneNumber(unumber)) {
      validationErrors.unumber = "Invalid phone number";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          {
            uname,
            uemail,
            upwd,

            ugender,
            udob,
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
            <Typography variant="h5">User Registration</Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="uname"
                    required
                    fullWidth
                    id="uname"
                    label="Name"
                    autoFocus
                    value={uname}
                    onChange={(e) => setUname(e.target.value)}
                  />
                  <div style={{ color: "red" }}>
                    {errors.uname && <span>{errors.uname}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="uemail"
                    label="Email Address"
                    name="uemail"
                    value={uemail}
                    onChange={(e) => setUemail(e.target.value)}
                  />
                  <div style={{ color: "red" }}>
                    {errors.uemail && <span>{errors.uemail}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="unumber"
                    label="Phone Number"
                    name="unumber"
                    value={unumber}
                    onChange={(e) => setUnumber(e.target.value)}
                    inputProps={{ maxLength: 10 }}
                  />
                  <div style={{ color: "red" }}>
                    {errors.unumber && <span>{errors.unumber}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel id="ugender-label">Gender</InputLabel>
                    <Select
                      labelId="ugender-label"
                      id="ugender"
                      name="ugender"
                      value={ugender}
                      onChange={(e) => setUgender(e.target.value)}
                      label="Gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <div style={{ color: "red" }}>
                    {errors.ugender && <span>{errors.ugender}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="date"
                    id="udob"
                    label="Date of Birth"
                    name="udob"
                    InputLabelProps={{ shrink: true }}
                    value={udob}
                    onChange={(e) => setUdob(e.target.value)}
                  />

                  <div style={{ color: "red" }}>
                    {errors.udob && <span>{errors.udob}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="upwd"
                    label="Password"
                    type={showupwd ? "text" : "upwd"}
                    id="upwd"
                    value={upwd}
                    onChange={(e) => setUpwd(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <IconButton
                          onClick={() => setShowupwd(!showupwd)}
                          edge="end"
                        >
                          {showupwd ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      ),
                    }}
                  />

                  <div style={{ color: "red" }}>
                    {errors.upwd && <span>{errors.upwd}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmupwd"
                    label="Confirm Password"
                    type={showConfirmupwd ? "text" : "upwd"}
                    id="confirmupwd"
                    value={confirmupwd}
                    onChange={(e) => setConfirmupwd(e.target.value)}
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
