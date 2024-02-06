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

// const Register = () => {
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

// export default Register;

import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const defaultTheme = createTheme();

const items = [
  {
    image: "/fashion.png",
    description: "Random Image 1",
  },
  {
    image: "/ri1.avif",
    description: "Random Image 1",
  },
  {
    image: "/ri2.jpg",
    description: "Random Image 2",
  },
  {
    image: "/x1.webp",
    description: "Random Image 3",
  },
];

function Item(props: {
  item: { image: string | undefined; description: string | undefined };
}) {
  return (
    <Paper>
      <img
        src={props.item.image}
        alt={props.item.description}
        style={{ width: "100%", height: "auto" }}
      />
    </Paper>
  );
}

export default function SignInSide() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          backgroundImage: `url('/bg2.jpg')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Grid item xs={12} sm={6} md={4} sx={{ marginRight: -5}}>
          {/* Added marginRight to create space between carousel and button */}
          <Carousel>
            {items.map((item, i) => (
              <Item key={i} item={item} />
            ))}
          </Carousel>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button component={Link} to="/neww" fullWidth>
            {/* Wrap the Card inside a Button component */}
            <Card
              sx={{
                minWidth: 275,
                margin: 1,
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                // height: "300px",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Stay ahead of fashion game
                </Typography>
                <Typography variant="h5" component="div">
                  Fashion Fleet
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Sign in or Register to continue
                </Typography>
              </CardContent>

              <CardActions>
                {/* Remove any specific actions inside CardActions */}
              </CardActions>
            </Card>
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
