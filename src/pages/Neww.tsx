// import React, { useState } from "react";
// import {
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   Card,
//   CardContent,
//   Typography,
//   styled,
//   Grid,
// } from "@mui/material";
// import { Link, useNavigate } from "react-router-dom";

// // Custom styled Radio component
// const BigRadio = styled(Radio)(({ theme }) => ({
//   "& .MuiSvgIcon-root": {
//     // Target the inner SVG icon of the Radio button
//     fontSize: "2rem", // Increase the icon size
//   },
// }));

// const Neww = () => {
//   const navigate = useNavigate();
//   const [selectedValue, setSelectedValue] = useState("");

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedValue(event.target.value);
//     // Navigate based on the selection
//     if (event.target.value === "user") {
//       navigate("/loginUser");
//     } else if (event.target.value === "vendor") {
//       navigate("/loginVendor");
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundImage: `url('/bg5.jpg')`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         minHeight: "100vh",
//       }}
//     >
//       <Card
//         sx={{
//           minWidth: 275,
//           maxWidth: 500,
//           padding: "20px",
//           textAlign: "center",
//           // backgroundColor:"black",
//           // color:"white"
//         }}
//       >
//         <CardContent>
//           <Typography sx={{ fontSize: 50 }} color="text.secondary" gutterBottom>
//             Choose Your Role
//           </Typography>
//           <FormControl component="fieldset">
//             <RadioGroup
//               row
//               aria-label="userType"
//               name="userType"
//               value={selectedValue}
//               onChange={handleChange}
//             >
//               <FormControlLabel
//                 value="user"
//                 control={<BigRadio />}
//                 label={
//                   <span
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       fontSize: "1.75rem",
//                     }}
//                   >
//                     User
//                   </span>
//                 }
//               />
//               <FormControlLabel
//                 value="vendor"
//                 control={<BigRadio />}
//                 label={
//                   <span
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       fontSize: "1.75rem",
//                     }}
//                   >
//                     Vendor
//                   </span>
//                 }
//               />
//             </RadioGroup>
//           </FormControl>
//         </CardContent>

//         <Grid
//           container
//           justifyContent="center"
//           style={{
//             marginTop: "20px", // Adjust the margin as needed
//           }}
//         >
//           <Grid item>
//             <Link to="/login" style={{ fontSize: "1.0rem", color: "#1976D2" }}>
//               Already have an account? Login
//             </Link>
//           </Grid>
//         </Grid>
//       </Card>
//     </div>
//   );
// };

// export default Neww;

// import * as React from 'react';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardHeader from '@mui/material/CardHeader';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Toolbar from '@mui/material/Toolbar';
// import Typography, { TypographyOwnProps } from '@mui/material/Typography';
// import Link from '@mui/material/Link';
// import GlobalStyles from '@mui/material/GlobalStyles';
// import Container from '@mui/material/Container';
// import { CommonProps } from '@mui/material/OverridableComponent';
// import { JSX } from 'react/jsx-runtime';

// function Copyright(props: JSX.IntrinsicAttributes & { component: React.ElementType<any>; } & TypographyOwnProps & CommonProps & Omit<any, "className" | "style" | "classes" | "border" | "borderTop" | "borderRight" | "borderBottom" | "borderLeft" | "borderColor" | "borderRadius" | "display" | "displayPrint" | "overflow" | "textOverflow" | "visibility" | "whiteSpace" | "flexBasis" | "flexDirection" | "flexWrap" | "justifyContent" | "alignItems" | "alignContent" | "order" | "flex" | "flexGrow" | "flexShrink" | "alignSelf" | "justifyItems" | "justifySelf" | "gap" | "columnGap" | "rowGap" | "gridColumn" | "gridRow" | "gridAutoFlow" | "gridAutoColumns" | "gridAutoRows" | "gridTemplateColumns" | "gridTemplateRows" | "gridTemplateAreas" | "gridArea" | "bgcolor" | "color" | "zIndex" | "position" | "top" | "right" | "bottom" | "left" | "boxShadow" | "width" | "maxWidth" | "minWidth" | "height" | "maxHeight" | "minHeight" | "boxSizing" | "m" | "mt" | "mr" | "mb" | "ml" | "mx" | "my" | "p" | "pt" | "pr" | "pb" | "pl" | "px" | "py" | "margin" | "marginTop" | "marginRight" | "marginBottom" | "marginLeft" | "marginX" | "marginY" | "marginInline" | "marginInlineStart" | "marginInlineEnd" | "marginBlock" | "marginBlockStart" | "marginBlockEnd" | "padding" | "paddingTop" | "paddingRight" | "paddingBottom" | "paddingLeft" | "paddingX" | "paddingY" | "paddingInline" | "paddingInlineStart" | "paddingInlineEnd" | "paddingBlock" | "paddingBlockStart" | "paddingBlockEnd" | "typography" | "fontFamily" | "fontSize" | "fontStyle" | "fontWeight" | "letterSpacing" | "lineHeight" | "textAlign" | "textTransform" | "align" | "children" | "gutterBottom" | "noWrap" | "paragraph" | "sx" | "variant" | "variantMapping">) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// const tiers = [
//   {
//     title: 'User',
//     price: '0',
//     description: [
//       'Access to basic features',
//       '5 GB of storage',
//       'Email support',
//     ],
//     buttonText: 'Sign up as User',
//     buttonVariant: 'outlined',
//   },
//   {
//     title: 'Vendor',
//     price: '30',
//     description: [
//       'Advanced business features',
//       '50 GB of storage',
//       'Priority email support',
//       'Phone support',
//     ],
//     buttonText: 'Register as Vendor',
//     buttonVariant: 'contained',
//   },
// ];

// const defaultTheme = createTheme();

// export default function Pricing() {
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <CssBaseline />
//       <AppBar
//         position="static"
//         color="default"
//         elevation={0}
//         sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
//       >
//         <Toolbar sx={{ flexWrap: 'wrap' }}>
//           <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
//             Company name
//           </Typography>
//           <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
//             Login
//           </Button>
//         </Toolbar>
//       </AppBar>
//       <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
//         <Typography
//           component="h1"
//           variant="h2"
//           align="center"
//           color="text.primary"
//           gutterBottom
//         >
//           Pricing
//         </Typography>
//         <Typography variant="h5" align="center" color="text.secondary" component="p">
//           Choose the plan that best suits your needs.
//         </Typography>
//       </Container>
//       <Container maxWidth="md" component="main">
//         <Grid container spacing={5} alignItems="flex-end" justifyContent="center">
//           {tiers.map((tier) => (
//             <Grid
//               item
//               key={tier.title}
//               xs={12}
//               sm={6}
//               md={6}
//             >
//               <Card>
//                 <CardHeader
//                   title={tier.title}
//                   // subheader={tier.subheader}
//                   titleTypographyProps={{ align: 'center' }}
//                   sx={{
//                     backgroundColor: (theme) =>
//                       theme.palette.mode === 'light'
//                         ? theme.palette.grey[200]
//                         : theme.palette.grey[700],
//                   }}
//                 />
//                 <CardContent>
//                   <Box
//                     sx={{
//                       display: 'flex',
//                       justifyContent: 'center',
//                       alignItems: 'baseline',
//                       mb: 2,
//                     }}
//                   >
//                     <Typography component="h2" variant="h3" color="text.primary">
//                       ${tier.price}
//                     </Typography>
//                     <Typography variant="h6" color="text.secondary">
//                       /mo
//                     </Typography>
//                   </Box>
//                   <ul>
//                     {tier.description.map((line) => (
//                       <Typography
//                         component="li"
//                         variant="subtitle1"
//                         align="center"
//                         key={line}
//                       >
//                         {line}
//                       </Typography>
//                     ))}
//                   </ul>
//                 </CardContent>
//                 <CardActions>
//                   <Button
//                     fullWidth
//                     // variant={tier.buttonVariant}
//                   >
//                     {tier.buttonText}
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//       <Container
//         maxWidth="md"
//         component="footer"
//         sx={{
//           borderTop: (theme) => `1px solid ${theme.palette.divider}`,
//           mt: 8,
//           py: [3, 6],
//         }}
//       >
//         {/* Footer content could go here */}
//         <Copyright sx={{ mt: 5 }} component={'symbol'} />
//       </Container>
//     </ThemeProvider>
//   );
// }

import React from "react";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { Link } from "react-router-dom";

const Neww = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url('/bg5.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="sm">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={6}>
            <Card sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                component={Link}
                to="/loginUser"
                fullWidth
                sx={{ backgroundColor: "#BBDEFB", color: "#000000" }} // Set the background color to light blue and text color to black
              >
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    User
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                component={Link}
                to="/loginVendor"
                fullWidth
                sx={{ backgroundColor: "#BBDEFB", color: "#000000" }} // Set the background color to light blue and text color to black
              >
                <CardContent>
                  <Typography variant="h4" gutterBottom>
                    Vendor
                  </Typography>
                </CardContent>
              </Button>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ textAlign: "center", marginTop: "20px" }}
          ></Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Neww;
