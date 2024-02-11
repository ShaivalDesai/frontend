// // import { LockOutlined } from "@mui/icons-material";
// // import {
// //   Container,
// //   CssBaseline,
// //   Box,
// //   Avatar,
// //   Typography,
// //   TextField,
// //   Button,
// //   Grid,
// // } from "@mui/material";
// // import axios from "axios";
// // import { useState } from "react";
// // import { Link } from "react-router-dom";
// // import { useNavigate } from "react-router-dom";

// // interface FormData {
// //   email: string;
// //   password: string;
// // }

// // const LoginUser = () => {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [errors, setErrors] = useState<Partial<FormData>>({});
// //   const navigate = useNavigate();

// //   const handleLogin = async () => {
// //     const validationErrors: Partial<Record<keyof FormData, string>> = {};

// //     if (!email.trim()) {
// //       validationErrors.email = "email is required";
// //     } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
// //       validationErrors.email = "Email is invalid";
// //     }

// //     if (!password.trim()) {
// //       validationErrors.password = "Password is required";
// //     }
// //     setErrors(validationErrors);

// //     if (Object.keys(validationErrors).length === 0) {
// //       try {
// //         const response = await axios.post("http://127.0.0.1:8000/login/user", {
// //           email,
// //           password,
// //         });
// //         console.log(response.data);

// //         // Check if the response indicates successful login
// //         if (response.data.status_code === 200) {
// //           console.log("Login successful");
// //           alert(response.data.detail);
// //           navigate("/home");
// //         } else {
// //           alert(response.data.detail);
// //           console.error("Login failed: Incorrect password");
// //         }
// //       } catch (error: any) {
// //         console.error("Error during login:", error);

// //         // Check if the error is due to incorrect credentials (400 Bad Request)
// //         if (error.response && error.response.status === 400) {
// //           console.error("Login failed: Incorrect credentials");
// //         }
// //       }
// //     }
// //   };

// //   return (
// //     <div  style={{
// //       height: "100vh",
// //       display: "flex",
// //       justifyContent: "flex-end", // Adjusted from "center" to "flex-end"
// //       alignItems: "center",
// //       backgroundImage: `url("/p1.jpeg")`,
// //       backgroundSize: "cover",
// //       backgroundPosition: "center",
// //       paddingRight: "20px", // Add some padding on the right for spacing from the edge
// //     }}>
// //       <Container maxWidth="xs"

// //       >
// //         <CssBaseline />
// //         <Box
// //           sx={{
// //             mt: 8,
// //             // borderRadius: "30px",
// //             display: "flex",
// //             flexDirection: "column",
// //             alignItems: "center",
// //             border: "1px solid #ccc",
// //             borderRadius: "15px",
// //             padding: "10px",
// //             boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
// //             backgroundColor: "white",
// //             // backgroundImage: `url("/p3.jpeg")`,

// //           }}
// //         >
// //           <Avatar sx={{ m: 1, bgcolor: "#5C3D24" }}>
// //             <LockOutlined />
// //           </Avatar>
// //           <Typography variant="h5"  sx={{color:"#5C3D24"}}>User Login</Typography>
// //           <Box sx={{ mt: 1 }}>
// //             <Grid item xs={12}  >
// //               <TextField
// //                 required
// //                 fullWidth
// //                 id="email"
// //                 label="Email Address"
// //                 name="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 InputLabelProps={{
// //                   style: { color: "#5C3D24" } // Set label color to #5C3D24
// //                 }}

// //               />
// //               <div style={{ color: "red" }}>
// //                 {errors.email && <span>{errors.email}</span>}
// //               </div>
// //             </Grid>

// //             <TextField
// //               margin="normal"
// //               required
// //               fullWidth
// //               id="password"
// //               name="password"
// //               label="Password"
// //               type="password"
// //               value={password}
// //               onChange={(e) => {
// //                 setPassword(e.target.value);

// //               }}

// //               InputLabelProps={{
// //                 style: { color: "#5C3D24" } // Set label color to #5C3D24
// //               }}

// //             />
// //             <div style={{ color: "red" }}>
// //               {errors.password && <span>{errors.password}</span>}
// //             </div>

// //             <Button
// //               fullWidth
// //               variant="contained"
// //               sx={{ mt: 3, mb: 2 ,bgcolor:"#5C3D24" ,"&:hover": {
// //                 bgcolor: "#4A2F21", // Change background color to dark brown on hover
// //               },}}

// //               onClick={handleLogin}

// //             >
// //               Login
// //             </Button>
// //             <Grid container justifyContent={"flex-end"}>
// //               <Grid item>
// //                 <Link to="/registerUser" style={{ marginRight: "55px" ,color:"#5C3D24"}}>
// //                   Don't have an account?
// //                 </Link>
// //                 <Link to="/forgot-password" style={{color:"#5C3D24"}}>Forgot Password</Link>
// //               </Grid>
// //             </Grid>
// //           </Box>
// //         </Box>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default LoginUser;

// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";
// import Box from "@mui/material/Box";
// import Grid from "@mui/material/Grid";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const defaultTheme = createTheme();

// interface FormData {
//   email: string;
//   password: string;
// }

// export default function LoginUser() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState<Partial<FormData>>({});
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     const validationErrors: Partial<Record<keyof FormData, string>> = {};

//     if (!email.trim()) {
//       validationErrors.email = "email is required";
//     } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
//       validationErrors.email = "Email is invalid";
//     }

//     if (!password.trim()) {
//       validationErrors.password = "Password is required";
//     }
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await axios.post("http://127.0.0.1:8000/login/user", {
//           email,
//           password,
//         });
//         console.log(response.data);

//         // Check if the response indicates successful login
//         if (response.data.status_code === 200) {
//           console.log("Login successful");
//           alert(response.data.detail);
//           navigate("/home");
//         } else {
//           alert(response.data.detail);
//           console.error("Login failed: Incorrect password");
//         }
//       } catch (error: any) {
//         console.error("Error during login:", error);

//         // Check if the error is due to incorrect credentials (400 Bad Request)
//         if (error.response && error.response.status === 400) {
//           console.error("Login failed: Incorrect credentials");
//         }
//       }
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: "100vh" }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: `url("/p1.jpeg")`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         />
//         <Grid
//           item
//           xs={12}
//           sm={10}
//           md={5}
//           component={Paper}
//           elevation={6}
//           square
//         >
//           <Box
//             sx={{
//               my: 10,
//               mx: 4,
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Log In
//             </Typography>
//             <Box
//               component="form"
//               noValidate
//               onSubmit={handleLogin}
//               sx={{ mt: 1 }}
//             >
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 InputLabelProps={{
//                   style: { color: "#5C3D24" },
//                 }}
//               />

//               <div style={{ color: "red" }}>
//                 {errors.email && <span>{errors.email}</span>}
//               </div>

// //               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="password"
//                 name="password"
//                 label="Password"
//                 type="password"
//                 value={password}
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//                 InputLabelProps={{
//                   style: { color: "#5C3D24" }, // Set label color to #5C3D24
//                 }}
//               />
//               <div style={{ color: "red" }}>
//                 {errors.password && <span>{errors.password}</span>}
//               </div>

//               <Button
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   mt: 3,
//                   mb: 2,
//                   bgcolor: "#5C3D24",
//                   "&:hover": {
//                     bgcolor: "#4A2F21",
//                   },
//                 }}
//                 onClick={handleLogin}
//               >
//                 Login
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   {/* <Link href="#" variant="body2">
//                     Forgot password?
//                   </Link> */}
//                 </Grid>
//                 <Grid item>
//                   <Link href="/register" variant="body2">
//                     {"Don't have an account? Sign Up"}
//                   </Link>
//                 </Grid>
//               </Grid>
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }

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
  role: string;
}

export default function LoginUser() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<string>("");
  const [showRegisterForm, setShowRegisterForm] = React.useState(false);

  const [errors, setErrors] = React.useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowRegisterForm(true); // Show the registration form when the link is clicked
  };

  const handleLogin = async () => {
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    if (!email.trim()) {
      validationErrors.email = "email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      validationErrors.email = "Email is invalid";
    }

    if (!password.trim()) {
      validationErrors.password = "Password is required";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/login/user", {
          email,
          password,
          role,
          
          
        });
        console.log(response.data);

        // Check if the response indicates successful login
        if (response.data.status_code === 200) {
          console.log("Login successful");
          alert(response.data.detail);
          navigate("/home");
        } else {
          alert(response.data.detail);
          console.error("Login failed: Incorrect password");
        }
      } catch (error: any) {
        console.error("Error during login:", error);

        // Check if the error is due to incorrect credentials (400 Bad Request)
        if (error.response && error.response.status === 400) {
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
              my: 21,
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
                                         {/* <div style={{ color: "red" }}>
  {errors.email && <span>{errors.email}</span>}
</div> */}

              {/* <div style={{ color: "red"}} >
    {errors.email && <span>{errors.email}</span>}
  </div> */}

              <TextField
                style={{ marginBottom: 18 }}
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

              <Typography style={{ color: "#67442b", marginBottom: -5 }}>
                Please select an option:
              </Typography>

              {/* RadioGroup with options aligned horizontally */}
              <RadioGroup
                row // This prop aligns the radio buttons horizontally
                aria-label="option"
                name="option"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
