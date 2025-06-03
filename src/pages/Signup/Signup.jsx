import React, { useState } from 'react';
import { NavLink } from 'react-router';
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
  FormHelperText
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Phone,
  Lock,
  PersonAdd as SignUpIcon,
  CardGiftcard
} from '@mui/icons-material';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    referralCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleTermsChange = (event) => {
    setAgreedToTerms(event.target.checked);
    if (errors.terms) {
      setErrors(prev => ({
        ...prev,
        terms: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Terms and conditions validation
    if (!agreedToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('Account created successfully! (Demo)');
    } catch (error) {
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => {
    alert('Login functionality would redirect to login page');
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    alert('Terms and conditions would open in a new tab');
  };

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        padding: 2
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          boxShadow: 0,

        }}
      >
        <CardContent>
          <NavLink
            to='/'
            style={{
              textAlign: 'center',
              fontSize: '53px',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#F79B72',
              textDecoration: 'none',
            }}
          >68LOTTERY</NavLink>
          <Typography component='h1' variant='h6'>A betting platform.</Typography>
          <Typography component='h1' variant='h4' fontSize='43px' sx={{ marginTop: '40px', color: '#2A4759' }}>Know your limits.</Typography>
          <Typography component='h1' variant='h4' fontSize='23px' sx={{ color: '#2A4759' }}>Bet responsibly.</Typography>
          <NavLink
            to='/customer-service'
            style={{ marginTop: '30px' }}
          >
            customer service
          </NavLink>
        </CardContent>
      </Card>
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          boxShadow: 3,
          borderRadius: 2
        }}
      >
        <CardContent sx={{ padding: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <SignUpIcon sx={{ fontSize: 42, color: '#2A4759', mb: 1 }} />
            <Typography variant="h5" component="h1" gutterBottom fontWeight="bold">
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please fill in the details to create your account
            </Typography>
          </Box>

          {/* Sign Up Form */}
          <Box component="form" onSubmit={handleSignUp}>
            {/* Phone Number Field */}
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={handleInputChange('phoneNumber')}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              placeholder="+91 9214266534"
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
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.password}
              onChange={handleInputChange('password')}
              error={!!errors.password}
              helperText={errors.password}
              placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
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
              type={showConfirmPassword ? 'text' : 'password'}
              variant="outlined"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              placeholder='&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              onChange={handleInputChange('referralCode')}
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
                    I have read and agree to the{' '}
                    <Link
                      component="button"
                      type="button"
                      variant="body2"
                      onClick={handleTermsClick}
                      sx={{ textDecoration: 'underline' }}
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
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold',
                backgroundColor: '#2A4759'
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            {/* Divider */}
            <Divider sx={{ my: 2 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Login Section */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Already have an account?
              </Typography>
              <NavLink to='/login'>
                Login
              </NavLink>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}