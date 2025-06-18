import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import axios from "axios";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("auth");
    if (!token) {
      toast.error("Unauthorized! Please login.");
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updatePassword = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://tureappapiforreact.onrender.com/api/update-password",
        data,
        {
          headers: { "x-access-token": auth?.token },
        }
      );
      const result = res.data;
      if (result.success === true) {
        toast.success(result.message || "Password updated successfully");
        setAuth({
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.newPassword.trim()) {
      toast.error("New password is required.");
      return;
    }

    const newData = {
      user_id: auth.user._id,
      password: formData.newPassword,
    };
    updatePassword(newData);
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
          Update Password
        </Typography>
        <Typography variant="body2" align="center" color="gray" sx={{ mb: 3 }}>
          Enter your new password
        </Typography>

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
          color="primary"
          disabled={loading}
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            fontSize: "16px",
            "&.Mui-disabled": {
              backgroundColor: "#1976d2",
              color: "#fff",
            },
          }}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Update Password"
          )}
        </Button>
      </Paper>
    </Box>
  );
};

export default UpdatePassword;
