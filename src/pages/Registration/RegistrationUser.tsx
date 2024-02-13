// import React, { useState } from "react";
// import {
//   Avatar,
//   Box,
//   Button,
//   Container,
//   CssBaseline,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
//   Stack,
//   Paper,
//   IconButton,
// } from "@mui/material";
// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";
// import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// interface FormData {
//   uname: string;
//   uemail: string;
//   password: string;
//   confirmupwd: string;
//   ugender: string;
//   udob: string;
//   mobile_number: string;
// }

// const RegistrationUser = () => {
//   const [uname, setUname] = useState<string>("");
//   const [uemail, setUemail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [setShowPassword, setShowPassword] = useState<boolean>(false);
//   const [showConfirmupwd, setShowConfirmupwd] = useState<boolean>(false);
//   const [confirmupwd, setConfirmupwd] = useState<string>("");

//   const [ugender, setUgender] = useState<string>("");
//   const [udob, setUdob] = useState<string>("");
//   const [mobile_number, setMobile_number] = useState<string>("");
//   const [validPhoneNumber, setValidPhoneNumber] = useState("");

//   const navigate = useNavigate();

//   const [errors, setErrors] = useState<Partial<FormData>>({});

//   const handleRegister = async () => {
//     const validationErrors: Partial<Record<keyof FormData, string>> = {};

//     if (!uname.trim()) {
//       validationErrors.uname = "Name is required";
//     }

//     if (!uemail.trim()) {
//       validationErrors.uemail = "Email is required";
//     } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(uemail)) {
//       validationErrors.uemail = "Email is invalid";
//     }

//     if (!ugender.trim()) {
//       validationErrors.ugender = "Select gender";
//     }

//     if (!udob.trim()) {
//       validationErrors.udob = "Date of Birth is required";
//     }

//     if (!password.trim()) {
//       validationErrors.password = "Password is required";
//     } else if (password.length < 8) {
//       validationErrors.password = "Password must be at least 8 characters long";
//     } else if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
//       validationErrors.password =
//         "Password must contain at least one uppercase and one lowercase letter";
//     } else if (!/\d/.test(password)) {
//       validationErrors.password = "Password must contain at least one number";
//     } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
//       validationErrors.password =
//         "Password must contain at least one special character";
//     }

//     if (!confirmupwd.trim()) {
//       validationErrors.confirmupwd = "Confirm Password is required";
//     } else if (confirmupwd !== password) {
//       validationErrors.confirmupwd = "Password do not match";
//     }

//     const isValidPhoneNumber = (mobile_number: string) => {
//       const phoneRegex = /^[6789]\d{9}$/;
//       // Assumes 10-digit phone number, modify as needed
//       return phoneRegex.test(mobile_number);
//     };

//     if (!mobile_number) {
//       validationErrors.mobile_number = "Phone number is required";
//     } else if (!isValidPhoneNumber(mobile_number)) {
//       validationErrors.mobile_number = "Invalid phone number";
//     }

//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await axios.post(
//           "http://127.0.0.1:8000/registration/user",
//           {
//             uname,
//             uemail,
//             password,
//             mobile_number,

//             ugender,
//             udob,
//           }
//         );
//         console.log("response " + JSON.stringify(response.data));

//       } catch (error: any) {
//         if (error.response) {
//           // Here you check for specific status codes or messages depending on your API
//           if (error.response.status === 400) {
//             // window.alert("Email already exists")
//             setErrors({ ...errors, uemail: "Email already exists" });
//           } else {
//             // Handle other errors or general error message
//             console.error("Error during registration:", error.message);
//           }
//         } else {
//           console.error("Error during registration:", error);
//         }
//       }
//     }
//   };

//   return (
//     <div
//       style={{
//         height: "115vh",
//         display: "flex",
//         justifyContent: "center",

//         alignItems: "center",
//         backgroundImage: `url("/p1.jpeg")`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <form onSubmit={handleRegister}>
//         <Container component="main" maxWidth="xs">
//           <CssBaseline />
//           <Paper elevation={3} sx={{borderRadius:"15px"}}>
//             <Box
//               sx={{

//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 padding: "20px",
//               }}
//             >
//               <Avatar sx={{ m: 1, bgcolor: "#724C31" }}>
//                 <LockOutlined />
//               </Avatar>
//               <Typography variant="h5" sx={{ color: "#724C31" }}>
//                 User Registration
//               </Typography>
//               <Box sx={{ mt: 3 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12}>
//                     <TextField
//                       name="uname"
//                       required
//                       fullWidth
//                       id="uname"
//                       label="Name"
//                       autoFocus
//                       value={uname}
//                       onChange={(e) => setUname(e.target.value)}
//                       InputLabelProps={{
//                         style: { color: "#724C31" }, // Set label color to #724C31
//                       }}
//                     />
//                     <div style={{ color: "red" }}>
//                       {errors.uname && <span>{errors.uname}</span>}
//                     </div>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       id="uemail"
//                       label="Email Address"
//                       name="uemail"
//                       value={uemail}
//                       onChange={(e) => setUemail(e.target.value)}
//                       InputLabelProps={{
//                         style: { color: "#724C31" }, // Set label color to #724C31
//                       }}
//                     />
//                     <div style={{ color: "red" }}>
//                       {errors.uemail && <span>{errors.uemail}</span>}
//                     </div>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       id="mobile_number"
//                       label="Phone Number"
//                       name="mobile_number"
//                       value={mobile_number}
//                       onChange={(e) => setMobile_number(e.target.value)}
//                       inputProps={{ maxLength: 10 }}
//                       InputLabelProps={{
//                         style: { color: "#724C31" }, // Set label color to #724C31
//                       }}
//                     />
//                     <div style={{ color: "red" }}>
//                       {errors.mobile_number && <span>{errors.mobile_number}</span>}
//                     </div>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <FormControl fullWidth required variant="outlined">
//                       <InputLabel id="ugender-label" style={{color:"#724C31"}}>Gender</InputLabel>
//                       <Select
//                         labelId="ugender-label"
//                         id="ugender"
//                         name="ugender"
//                         value={ugender}
//                         onChange={(e) => setUgender(e.target.value)}
//                         label="Gender"
//                       >
//                         <MenuItem value="Male" style={{ color: "#724C31" }}>
//                           Male
//                         </MenuItem>
//                         <MenuItem value="Female" style={{ color: "#724C31" }}>
//                           Female
//                         </MenuItem>
//                         <MenuItem value="Other" style={{ color: "#724C31" }}>
//                           Other
//                         </MenuItem>
//                       </Select>
//                     </FormControl>

//                     <div style={{ color: "red" }}>
//                       {errors.ugender && <span>{errors.ugender}</span>}
//                     </div>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       type="date"
//                       id="udob"
//                       label="Date of Birth"
//                       name="udob"
//                       InputLabelProps={{
//                         shrink: true,
//                         style: { color: "#724C31" },
//                       }}
//                       value={udob}
//                       onChange={(e) => setUdob(e.target.value)}
//                     />

//                     <div style={{ color: "red" }}>
//                       {errors.udob && <span>{errors.udob}</span>}
//                     </div>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       name="password"
//                       label="Password"
//                       type={setShowPassword ? "text" : "password"}
//                       id="password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       InputLabelProps={{
//                         style: { color: "#724C31" },
//                       }}
//                       InputProps={{
//                         endAdornment: (
//                           <IconButton
//                             onClick={() => setShowPassword(!setShowPassword)}
//                             edge="end"
//                           >
//                             {setShowPassword ? <VisibilityOff /> : <Visibility />}
//                           </IconButton>
//                         ),
//                       }}
//                     />

//                     <div style={{ color: "red" }}>
//                       {errors.password && <span>{errors.password}</span>}
//                     </div>
//                   </Grid>

//                   <Grid item xs={12}>
//                     <TextField
//                       required
//                       fullWidth
//                       name="confirmupwd"
//                       label="Confirm Password"
//                       type={showConfirmupwd ? "text" : "password"}
//                       id="confirmupwd"
//                       value={confirmupwd}
//                       onChange={(e) => setConfirmupwd(e.target.value)}
//                       InputLabelProps={{
//                         style: { color: "#724C31" },
//                       }}
//                       InputProps={{
//                         endAdornment: (
//                           <IconButton
//                             onClick={() => setShowConfirmupwd(!showConfirmupwd)}
//                             edge="end"
//                           >
//                             {showConfirmupwd ? (
//                               <VisibilityOff />
//                             ) : (
//                               <Visibility />
//                             )}
//                           </IconButton>
//                         ),
//                       }}
//                     />

//                     <div style={{ color: "red" }}>
//                       {errors.confirmupwd && <span>{errors.confirmupwd}</span>}
//                     </div>
//                   </Grid>
//                 </Grid>
//                 <Button
//                   fullWidth
//                   variant="contained"
//                   sx={{ mt: 3, mb: 2,bgcolor:"#724C31","&:hover": {
//                     bgcolor: "#4A2F21", // Change background color to dark brown on hover
//                   }, }}
//                   onClick={handleRegister}
//                 >
//                   Register
//                 </Button>
//                 <Grid container justifyContent="flex-end">
//                   <Grid item>
//                     <Link to="/login" style={{ color: "#724C31" }}

//                     >
//                       Already have an account? Login
//                     </Link>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//           </Paper>
//         </Container>
//       </form>
//     </div>
//   );
// };
// export default RegistrationUser;

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

const defaultTheme = createTheme();

interface FormData {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmupwd: string;
  mobile_number: string;
  user_type: string;
}

export default function Register() {
  const [email, setEmail] = React.useState<string>("");
  const [confirmEmail, setConfirmEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [user_type, setUser_type] = React.useState<string>("");
  const [name, setName] = useState<string>("");
  const [mobile_number, setMobile_number] = useState<string>("");
  const [validPhoneNumber, setValidPhoneNumber] = useState<string>("");
  const [showRegisterForm, setShowRegisterForm] = React.useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmupwd, setShowConfirmupwd] = useState<boolean>(false);
  const [confirmupwd, setConfirmupwd] = useState<string>("");

  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    if (!name.trim()) {
      validationErrors.name = "Name is required";
    }

    if (!email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      validationErrors.email = "Email is invalid";
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

    if (!confirmupwd.trim()) {
      validationErrors.confirmupwd = "Confirm Password is required";
    } else if (confirmupwd !== password) {
      validationErrors.confirmupwd = "Password do not match";
    }

    if (!confirmEmail.trim()) {
      validationErrors.confirmEmail = "Confirm Email is required";
    } else if (confirmEmail !== email) {
      validationErrors.confirmEmail = "Password do not match";
    }

    const isValidPhoneNumber = (mobile_number: string) => {
      const phoneRegex = /^[6789]\d{9}$/;
      // Assumes 10-digit phone number, modify as needed
      return phoneRegex.test(mobile_number);
    };

    if (!mobile_number) {
      validationErrors.mobile_number = "Phone number is required";
    } else if (!isValidPhoneNumber(mobile_number)) {
      validationErrors.mobile_number = "Invalid phone number";
    }

    if (!user_type.trim()) {
      validationErrors.user_type = "User Type selection is required";
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
            // user_type,
            // mobile_number,
          }
        );
        console.log(response.data);
        navigate("/home");
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
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
              my: 1,
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
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleRegister}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
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

              

              <TextField
                margin="normal"
                required
                fullWidth
                id="confirmEmail"
                label="Confirm Email Address"
                name="confirmEmail"
                value={confirmEmail}
                onChange={(e) => setConfirmEmail(e.target.value)}
                InputLabelProps={{
                  style: { color: "#724C31" },
                }}
              />
              <div style={{ color: "red" }}>
                {errors.confirmEmail && <span>{errors.confirmEmail}</span>}
              </div>

              

              <TextField
                margin="normal"
                required
                fullWidth
                id="unumber"
                label="Phone Number"
                name="mobile_number"
                value={mobile_number}
                onChange={(e) => setMobile_number(e.target.value)}
                inputProps={{ maxLength: 10 }}
                InputLabelProps={{
                  style: { color: "#724C31" }, // Set label color to #724C31
                }}
              />
              <div style={{ color: "red" }}>
                {errors.mobile_number && <span>{errors.mobile_number}</span>}
              </div>
             

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                margin="normal"
                required
                fullWidth
                name="confirmupwd"
                label="Confirm Password"
                type={showConfirmupwd ? "text" : "password"}
                id="confirmupwd"
                value={confirmupwd}
                onChange={(e) => setConfirmupwd(e.target.value)}
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
              {/* <div style={{ color: "red" ,minHeight: '20px', fontSize: '0.75rem'}}>
                      {errors.confirmupwd && (
                        <span>{errors.confirmupwd}</span>
                      )}
                    </div> */}

              <Typography
                style={{ color: "#67442b", margin: "normal", fontSize: "20px" }}
              >
                Please select an option:
              </Typography>

              {/* RadioGroup with options aligned horizontally */}
              <RadioGroup
                row // This prop aligns the radio buttons horizontally
                aria-label="option"
                name="option"
                onChange={(e) => setUser_type(e.target.value)}
                
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
                onClick={handleRegister}
              >
                Register
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="/login" variant="body2" onClick={handleRegister}>
                    {"Already have an account? Login"}
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


