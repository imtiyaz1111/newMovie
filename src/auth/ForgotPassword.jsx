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
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    answer: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const forgotPassword = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://tureappapiforreact.onrender.com/api/forget-password",
        data
      );
      if (res.data.success === true) {
        toast.success(res.data.message || "Password reset successful");
        navigate("/login");
      } else {
        toast.error(res.data.message || "Reset failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, answer, newPassword } = formData;

    if (!email.trim() || !answer.trim() || !newPassword.trim()) {
      toast.error("All fields are required.");
      return;
    }

    const newData = { email, answer, newPassword };
    forgotPassword(newData);
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
          maxWidth: 450,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          color="white"
          fontWeight="bold"
          gutterBottom
        >
          Reset Password
        </Typography>
        <Typography
          variant="body2"
          align="center"
          color="gray"
          sx={{ mb: 3 }}
        >
          Enter your email, security answer, and new password
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
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "gray" } }}
        />

        <TextField
          fullWidth
          type="text"
          name="answer"
          label="Security Answer"
          value={formData.answer}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "gray" } }}
        />

        <TextField
          fullWidth
          type="password"
          name="newPassword"
          label="New Password"
          value={formData.newPassword}
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
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Reset Password"
          )}
        </Button>

        <Typography
          variant="body2"
          color="gray"
          align="center"
          sx={{ mt: 3 }}
        >
          Remembered your password?{" "}
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

export default ForgotPassword;
