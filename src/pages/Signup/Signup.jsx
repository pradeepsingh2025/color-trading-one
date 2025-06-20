import React, { useState, useEffect } from "react";
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
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Phone,
  Lock,
  PersonAdd as SignUpIcon,
  CardGiftcard,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function SignUpPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Check if token is still valid (basic check)
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (payload.exp > currentTime) {
          // Token is still valid, redirect to home
          navigate("/");
          return;
        } else {
          // Token expired, remove it
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (error) {
        // Invalid token, remove it
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, [navigate]);

  const handleTermsChange = (event) => {
    setAgreedToTerms(event.target.checked);
    if (errors.terms) {
      setErrors((prev) => ({
        ...prev,
        terms: "",
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

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms and conditions validation
    if (!agreedToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);
    setSubmitMessage("");

    try {
      const response = await fetch("http://localhost:3001/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: formData.phoneNumber,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token
        localStorage.setItem("token", data.token);

        setSubmitMessage(data.message); //'Account created successfully!'
        setFormData({
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          referralCode: "",
        });

        // Redirect to home page after successful signup
        setTimeout(() => {
          navigate("/", { state: data.user });
        }, 1500); // Small delay to show success message
      } else {
        setSubmitMessage(
          data.error || "Error creating account. Please try again."
        );
      }
      console.log(data.user);

      // alert(`Successfully signedUp, UID is ${data.user.userID}`);
    } catch (error) {
      console.error("Signup error:", error);
      setSubmitMessage(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    alert("Terms and conditions would open in a new tab");
  };

  const keywords = ["error", "already", "exists"];

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
            component='h1'
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
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <SignUpIcon sx={{ fontSize: 42, color: "#2A4759", mb: 1 }} />
            <Typography
              variant="h5"
              component="h1"
              gutterBottom
              fontWeight="bold"
            >
              Create Account
            </Typography>

            {submitMessage ? (
              <Alert
                severity={
                  keywords.some((w) => submitMessage.includes(w))
                    ? "error"
                    : "success"
                }
                sx={{ mb: 2 }}
              >
                {submitMessage}
                {submitMessage.includes("successfully") && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Redirecting to home page...
                  </Typography>
                )}
              </Alert>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Please fill in the details to create your account
              </Typography>
            )}
          </Box>

          {/* Sign Up Form */}
          <Box component="form" onSubmit={handleSignUp}>
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
              label="Create Password"
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

            {/* Confirm Password Field */}
            <TextField
              fullWidth
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleInputChange("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Referral Code Field */}
            <TextField
              fullWidth
              label="Referral Code (Optional)"
              variant="outlined"
              value={formData.referralCode}
              onChange={handleInputChange("referralCode")}
              placeholder="Enter referral code if you have one"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CardGiftcard color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Terms and Conditions Checkbox */}
            <Box sx={{ mb: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={agreedToTerms}
                    onChange={handleTermsChange}
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I have read and agree to the{" "}
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={handleTermsClick}
                      sx={{ textDecoration: "underline" }}
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                }
              />
              {errors.terms && (
                <FormHelperText error sx={{ ml: 0, mt: 0.5 }}>
                  {errors.terms}
                </FormHelperText>
              )}
            </Box>

            {/* Sign Up Button */}
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
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Login Section */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Already have an account?
              </Typography>
              <NavLink to="/login">Login</NavLink>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
