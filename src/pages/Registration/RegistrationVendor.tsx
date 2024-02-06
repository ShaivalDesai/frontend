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
  vname: string;
  vemail: string;
  vpwd: string;
  confirmPassword: string;
  role: string;
  vgender: string;
  vdob: string;
  vnumber: string;
}

const RegistrationVendor = () => {
  const [vname, setVname] = useState<string>("");
  const [vemail, setVemail] = useState<string>("");
  const [vpwd, setVpwd] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [vgender, setVgender] = useState<string>("");
  const [vdob, setVdob] = useState<string>("");
  const [vnumber, setVnumber] = useState<string>("");
  const [validPhoneNumber, setValidPhoneNumber] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const navigate = useNavigate();

  const [errors, setErrors] = useState<Partial<FormData>>({});

  //  function handleImage(e:any)
  //  {
  //     console.log(e.target.files)
  // setImage(e.target.files[0])
  //  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleRegister = async () => {
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    if (!vname.trim()) {
      validationErrors.vname = "Name is required";
    }

    if (!vemail.trim()) {
      validationErrors.vemail = "Email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(vemail)) {
      validationErrors.vemail = "Email is invalid";
    }

    if (!role.trim()) {
      validationErrors.role = "Select Role";
    }

    if (!vgender.trim()) {
      validationErrors.vgender = "Select Gender";
    }

    if (!vdob.trim()) {
      validationErrors.vdob = "Date of Birth is required";
    }

    if (!vpwd.trim()) {
      validationErrors.vpwd = "Password is required";
    } else if (vpwd.length < 8) {
      validationErrors.vpwd = "Password must be at least 8 characters long";
    } else if (!/[A-Z]/.test(vpwd) || !/[a-z]/.test(vpwd)) {
      validationErrors.vpwd =
        "Password must contain at least one uppercase and one lowercase letter";
    } else if (!/\d/.test(vpwd)) {
      validationErrors.vpwd = "Password must contain at least one number";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(vpwd)) {
      validationErrors.vpwd =
        "Password must contain at least one special character";
    }

    if (!confirmPassword.trim()) {
      validationErrors.confirmPassword = "Confirm Password is required";
    } else if (confirmPassword !== vpwd) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    const isValidPhoneNumber = (phoneNumber: string) => {
      const phoneRegex = /^[6789]\d{9}$/;
      // Assumes 10-digit phone number, modify as needed
      return phoneRegex.test(phoneNumber);
    };

    if (!vnumber) {
      validationErrors.vnumber = "Phone number is required";
    } else if (!isValidPhoneNumber(vnumber)) {
      validationErrors.vnumber = "Invalid phone number";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          {
            vname,
            vemail,
            vpwd,
            role,
            vgender,
            vdob,
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
            <Typography variant="h5">Vendor Registration</Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    name="vname"
                    required
                    fullWidth
                    id="vname"
                    label="Name"
                    autoFocus
                    value={vname}
                    onChange={(e) => setVname(e.target.value)}
                  />
                  <div style={{ color: "red" }}>
                    {errors.vname && <span>{errors.vname}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={vemail}
                    onChange={(e) => setVemail(e.target.value)}
                  />
                  <div style={{ color: "red" }}>
                    {errors.vemail && <span>{errors.vemail}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="vnumber"
                    label="Phone Number"
                    name="vnumber"
                    value={vnumber}
                    onChange={(e) => setVnumber(e.target.value)}
                    inputProps={{ maxLength: 10 }}
                  />
                  <div style={{ color: "red" }}>
                    {errors.vnumber && <span>{errors.vnumber}</span>}
                  </div>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth required variant="outlined">
                    <InputLabel id="gender-label">Gender</InputLabel>
                    <Select
                      labelId="gender-label"
                      id="vgender"
                      name="vgender"
                      value={vgender}
                      onChange={(e) => setVgender(e.target.value)}
                      label="Gender"
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>

                  <div style={{ color: "red" }}>
                    {errors.vgender && <span>{errors.vgender}</span>}
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
                    value={vdob}
                    onChange={(e) => setVdob(e.target.value)}
                  />

                  <div style={{ color: "red" }}>
                    {errors.vdob && <span>{errors.vdob}</span>}
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
                    value={vpwd}
                    onChange={(e) => setVpwd(e.target.value)}
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
                    {errors.vpwd && <span>{errors.vpwd}</span>}
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
export default RegistrationVendor;
