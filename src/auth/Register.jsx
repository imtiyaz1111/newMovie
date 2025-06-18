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
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    answer: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const registerUser = async (newData) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://tureappapiforreact.onrender.com/api/register",
        newData
      );
      const data = res.data;
      if (data.success === true) {
        toast.success(data.message || "Registration successful");
        navigate("/login");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed. Please try again."
      );
      console.log("registerUser error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData);
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
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="white"
          fontWeight="bold"
          gutterBottom
        >
          Create Your Account
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="gray"
          sx={{ mb: 3 }}
        >
          Please fill in the details below
        </Typography>

        <TextField
          fullWidth
          type="text"
          name="name"
          label="Full Name"
          value={formData.name}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "gray" } }}
        />
        <TextField
          fullWidth
          type="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "gray" } }}
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          label="Create Password"
          value={formData.password}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "gray" } }}
        />
        <TextField
          fullWidth
          type="tel"
          name="phone"
          label="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "gray" } }}
        />
        <TextField
          fullWidth
          type="text"
          name="answer"
          label="Security Answer (e.g. pet name)"
          value={formData.answer}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "gray" } }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
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
              opacity: 0.7,
            },
          }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} sx={{ color: "#fff" }} />
          ) : (
            "Register"
          )}
        </Button>

        <Typography
          variant="body2"
          color="gray"
          align="center"
          sx={{ mt: 3 }}
        >
          Already have an account?{" "}
          <MuiLink
            component={Link}
            to="/login"
            sx={{
              color: "lightblue",
              textDecoration: "none",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            Login here
          </MuiLink>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Register;
