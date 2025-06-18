import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link as MuiLink,
  CircularProgress,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://tureappapiforreact.onrender.com/api/login",
        data
      );

      if (res.data.success === true) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });

        localStorage.setItem(
          "auth",
          JSON.stringify({
            user: res.data.user,
            token: res.data.token,
          })
        );

        toast.success(res.data.message);
        navigate("/");
        console.log("login", res.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      console.error("loginerror", error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      email: formData.email,
      password: formData.password,
    };
    login(newData);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundImage: `url('http://wallpapercave.com/wp/wp1945909.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          zIndex: 1,
        },
      }}
    >
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={10}
        sx={{
          position: "relative",
          zIndex: 2,
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          p: 5,
          borderRadius: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="white"
          fontWeight="bold"
          gutterBottom
        >
          Login to Your Account
        </Typography>
        <Typography variant="body2" align="center" color="gray" sx={{ mb: 3 }}>
          Enter your email and password
        </Typography>

        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{
            sx: { color: "white" },
          }}
          InputLabelProps={{
            sx: { color: "gray" },
          }}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{
            sx: { color: "white" },
          }}
          InputLabelProps={{
            sx: { color: "gray" },
          }}
        />

        <Box textAlign="right" mt={1}>
          <MuiLink
            component={Link}
            to="/forgot-password"
            variant="body2"
            sx={{
              color: "lightblue",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Forgot Password?
          </MuiLink>
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "16px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            "&.Mui-disabled": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
        </Button>

        <Typography variant="body2" color="gray" align="center" sx={{ mt: 3 }}>
          Don’t have an account?{" "}
          <MuiLink
            component={Link}
            to="/register"
            sx={{
              color: "lightblue",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Register here
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
