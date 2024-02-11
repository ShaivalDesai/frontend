import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface FormData {
  vemail: string;
  vpwd: string;
}

const LoginVendor = () => {
  const [vemail, setVemail] = useState("");
  const [vpwd, setVpwd] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    if (!vemail.trim()) {
      validationErrors.vemail = "vemail is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(vemail)) {
      validationErrors.vemail = "vemail is invalid";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/login/vendor", {
          vemail,
          vpwd,
        });
        console.log("response " + JSON.stringify(response.data));
        navigate("/home");
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",

        alignItems: "center",
        backgroundImage: `url("/p1.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "15px",
            padding: "10px",
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
            backgroundColor: "white",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#724C31" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5" sx={{ color: "#724C31" }}>
            Vendor Login
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="vemail"
                label="Email Address"
                name="vemail"
                value={vemail}
                onChange={(e) => setVemail(e.target.value)}
                InputLabelProps={{
                  style: { color: "#724C31" }, // Set label color to #724C31
                }}
              />
              <div style={{ color: "red" }}>
                {errors.vemail && <span>{errors.vemail}</span>}
              </div>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              id="vpwd"
              name="vpwd"
              label="Password"
              type={showPassword ? "text" : "password"} // Toggle password visibility
              value={vpwd}
              onChange={(e) => {
                setVpwd(e.target.value);
              }}
              InputLabelProps={{
                style: { color: "#724C31" }, // Set label color to #724C31
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
                style: { color: "#724C31" },
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#724C31", "&:hover": { bgcolor: "#4A2F21" } }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link
                  to="/registerVendor"
                  style={{ marginRight: "55px", color: "#724C31" }}
                >
                  Don't have an account?
                </Link>
                <Link to="/forgot-vpwd" style={{ color: "#724C31" }}>
                  Forgot Password
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginVendor;
