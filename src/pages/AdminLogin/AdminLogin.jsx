import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AdminPanelSettings,
  Login,
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    adminName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginStatus, setLoginStatus] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.adminName.trim()) {
      newErrors.adminName = "Admin name is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoginStatus("logging");

    try {
      const response = await fetch("http://localhost:3001/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          adminName: formData.adminName,
          password: formData.password,
        }),
      });
      const { data, message } = await response.json();
      if (response.ok) {
        localStorage.setItem("admin_token", data.token)
        setLoginStatus("success");
        setSubmitMessage(`${message}, redirecting to admin pannel`);
        setTimeout(() => {
          navigate("/adminpanel");
        }, 3000);
      } else {
        setErrors({ message: message });
        setLoginStatus("error");
      }
    } catch (error) {
      setErrors({
        message: `${error}, Network error. Please check your connection and try again.`,
      });
      setLoginStatus("error");
    } finally {
      setFormData({
        adminName: "",
        password: "",
      });
      setLoginStatus("");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ marginTop: "4%" }}>
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background:
              "linear-gradient(135deg,rgb(167, 183, 255) 0%,rgba(187, 118, 255, 0.39) 100%)",
            padding: 2,
          }}
        >
          <Card
            sx={{
              width: "100%",
              maxWidth: 400,
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              borderRadius: 3,
            }}
          >
            <CardContent sx={{ padding: 4 }}>
              {/* Header */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <AdminPanelSettings
                  sx={{
                    fontSize: 48,
                    color: "primary.main",
                    mb: 1,
                  }}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                  Admin Login
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Sign in to access the admin dashboard
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* Login Status Alerts */}
              {submitMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {submitMessage}
                </Alert>
              )}

              {Object.keys(errors).length !== 0 && errors.message && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errors.message}
                </Alert>
              )}

              {/* Login Form */}
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  id="adminName"
                  label="adminname"
                  value={formData.adminName}
                  onChange={handleInputChange("adminName")}
                  error={!!errors.adminName}
                  helperText={errors.adminName}
                  margin="normal"
                  variant="outlined"
                  autoComplete="username"
                  autoFocus
                  sx={{ mb: 2 }}
                />

                <TextField
                  fullWidth
                  id="password"
                  label="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  error={!!errors.password}
                  helperText={errors.password}
                  margin="normal"
                  variant="outlined"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loginStatus === "logging"}
                  startIcon={<Login />}
                  sx={{
                    py: 1.5,
                    fontSize: "1.1rem",
                    textTransform: "none",
                    borderRadius: 2,
                  }}
                >
                  {loginStatus === "logging" ? "Signing In..." : "Sign In"}
                </Button>
              </Box>

              {/* Footer */}
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Typography variant="caption" color="text.secondary">
                  Secure admin access only
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
