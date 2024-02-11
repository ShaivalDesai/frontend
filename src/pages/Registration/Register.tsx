import * as React from "react";
import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  createTheme,
  ThemeProvider,
  Box,
  Grid,
  Button,
  CardContent,
  Card,
  CardActions,
  Avatar,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

interface ItemProps {
  item: {
    image: string;
    description: string;
  };
}

const items = [
  {
    image: "/p1.jpeg",
    description: "Random Image 1",
  },
  {
    image: "/p2.jpg",
    description: "Random Image 2",
  },
  {
    image: "/p3.jpg",
    description: "Random Image 3",
  },
  {
    image: "/p4.jpg",
    description: "Random Image 4",
  },
];

function Item({ item }: ItemProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${item.image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></Box>
  );
}

export default function SignInSide() {
  const [open, setOpen] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState("user");
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleConfirm = () => {
    handleClose(); // Close the dialog
    // Navigate based on the selected option
    if (selectedOption === "user") {
      navigate("/loginUser"); // Navigate to loginUser page
    } else if (selectedOption === "vendor") {
      navigate("/loginVendor"); // Navigate to loginVendor page
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Carousel
        animation="fade"
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          zIndex: -1, // Ensure the carousel is behind the overlay content
        }}
      >
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>

      {/* Overlay Content */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 15,
          width: "90%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 6,
          // bgcolor:"brown"
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <Card
            sx={{
              minHeight: 415,
              minWidth: 415,
              margin: 1,
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "15px",
            }}
          >
            <Avatar
              sx={{ bgcolor: "#724C31", marginTop: 0, height: 80, width: 80 }}
            >
              <ShoppingBasketIcon fontSize="large" />
            </Avatar>
            <Typography
              fontSize="50px"
              variant="h5"
              sx={{ color: "#5C3D24", marginBottom: "-25px" }}
            >
              FashionFleet
            </Typography>
            <CardContent>
              <Typography
                sx={{
                  fontSize: 23,
                  marginBottom: "35px",
                  justifyContent: "center",
                  textAlign: "center",
                }}
                color="#724C31"
                gutterBottom
              >
                Stay ahead of fashion game
              </Typography>

              <Typography
                sx={{ mb: 1.5, fontSize: 23, marginBottom: "-13px" }}
                color="#724C31"
              >
                Login or Register to continue
              </Typography>
            </CardContent>

            <CardActions>
              <Button
                variant="contained"
                sx={{ bgcolor: "#724C31","&:hover": {
                  bgcolor: "#4A2F21", // Change background color to dark brown on hover
                }, }}
                onClick={handleOpen}
              >
                Login to Continue
              </Button>
            </CardActions>
          </Card>

          <Dialog
            open={open}
            onClose={handleClose}
            style={{ color: "#724C31" }}
          >
            <DialogTitle style={{ color: "#67442b" }}>
              {" "}
              Select Option
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: "#67442b" }}>
                Please select whether you are a User or a Vendor.
              </DialogContentText>
              <RadioGroup
                style={{ color: "#67442b" }}
                aria-label="option"
                name="option"
                value={selectedOption}
                onChange={handleOptionChange}
              >
                <FormControlLabel
                  style={{ color: "#724C31" }}
                  value="user"
                  control={<Radio />}
                  label="User"
                />
                <FormControlLabel
                  style={{ color: "#724C31" }}
                  value="vendor"
                  control={<Radio />}
                  label="Vendor"
                />
              </RadioGroup>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{ color: "#67442b" }}>
                Cancel
              </Button>
              <Button onClick={handleConfirm} style={{ color: "#67442b" }}>
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
