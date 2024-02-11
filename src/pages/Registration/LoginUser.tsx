import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  CssBaseline,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface FormData {
  uemail: string;
  upwd: string;
}

const LoginUser = () => {
  const [uemail, setUemail] = useState("");
  const [upwd, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const navigate = useNavigate();

  const handleLogin = async () => {
    const validationErrors: Partial<Record<keyof FormData, string>> = {};

    if (!uemail.trim()) {
      validationErrors.uemail = "uemail is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(uemail)) {
      validationErrors.uemail = "uemail is invalid";
    }

    if (!upwd.trim()) {
      validationErrors.upwd = "Password is required";
    }
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/login/user", {
          uemail,
          upwd,
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
    <>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #ccc",
            borderRadius: "5px",
            padding: "10px",
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .1)",
            backgroundColor: "white",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
            <LockOutlined />
          </Avatar>
          <Typography variant="h5">User Login</Typography>
          <Box sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="uemail"
                label="uemail Address"
                name="uemail"
                value={uemail}
                onChange={(e) => setUemail(e.target.value)}
              />
              <div style={{ color: "red" }}>
                {errors.uemail && <span>{errors.uemail}</span>}
              </div>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              id="upwd"
              name="upwd"
              label="upwd"
              type="upwd"
              value={upwd}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <div style={{ color: "red" }}>
              {errors.upwd && <span>{errors.upwd}</span>}
            </div>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Grid container justifyContent={"flex-end"}>
              <Grid item>
                <Link to="/registerUser" style={{ marginRight: "55px" }}>
                  Don't have an account?
                </Link>
                <Link to="/forgot-upwd">Forgot upwd</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoginUser;