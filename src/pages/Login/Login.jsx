import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Phone,
  Lock,
  Login as LoginIcon,
} from "@mui/icons-material";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        if (payload.exp > Date.now() / 1000) {
          navigate("/");
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const handleInputChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    try {
      const response = await fetch("http://localhost:3001/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: formData.phoneNumber,
          password: formData.password,
        }),
      });

      const { data, error } = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/", { state: data.user });
      } else {
        console.log(error)
        setSubmitMessage(
          error || "Error login. Please try again."
        );
      }
    } catch (error) {
      setErrors("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    alert(
      "Forgot password functionality would redirect to password reset page"
    );
  };

  const keywords = ["error", "not", "Invalid", "required"];

  return (
    <Box
      sx={{
        minHeight: "90vh",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "white",
        padding: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          boxShadow: 0,
        }}
      >
        <CardContent>
          <Typography
            component="h1"
            variant="h1"
            style={{
              textAlign: "start",
              fontSize: "4vmax",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#F79B72",
              textDecoration: "none",
            }}
          >
            68LOTTERY
          </Typography>
          <Typography component="h1" variant="h6">
            A betting platform.
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            fontSize="5vmax"
            sx={{ marginTop: "3vh", color: "#2A4759" }}
          >
            Know your limits.
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            fontSize="3vmax"
            sx={{ color: "#2A4759" }}
          >
            Bet responsibly.
          </Typography>
          <NavLink to="/customer-service" style={{ marginTop: "30px" }}>
            customer service
          </NavLink>
        </CardContent>
      </Card>
      <Card
        sx={{
          maxWidth: 400,
          width: "100%",
          boxShadow: 3,
          borderRadius: 2,
          // marginRight: 40
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <LoginIcon sx={{ fontSize: 42, color: "#2A4759", mb: 1 }} />
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Welcome Back
            </Typography>
            {submitMessage ? (
              <Alert
                severity='error'
                sx={{ mb: 2 }}
              >
                {submitMessage}
              </Alert>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Please sign in to your account
              </Typography>
            )}
          </Box>

          {/* Login Form */}
          <Box component="form" onSubmit={handleLogin}>
            {/* Phone Number Field */}
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleInputChange("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              placeholder="9214266534"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Password Field */}
            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange("password")}
              error={!!errors.password}
              helperText={errors.password}
              placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: "right", mb: 3 }}>
              <NavLink to="/forgotpassword" style={{ textDecoration: "none" }}>
                Forgot Password?
              </NavLink>
            </Box>

            {/* Login Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                py: 1.5,
                mb: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "bold",
                backgroundColor: "#2A4759",
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Sign Up Section */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Don't have an account?
              </Typography>
              <NavLink to="/signup">Create Account</NavLink>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
