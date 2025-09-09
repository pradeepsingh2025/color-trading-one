import React, { useState, useRef, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    IconButton,
    Alert,
    CircularProgress,
    Link
} from '@mui/material';
import { ArrowBack, Refresh } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL;

const theme = createTheme({
    palette: {
        primary: {
            main: '#6366f1',
        },
        background: {
            default: '#f8fafc',
        },
    },
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
        borderRadius: 12,
    },
});

const OTPVerification = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const formData = location.state;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);
    const [submitMessage, setSubmitMessage] = useState("");
    const inputRefs = useRef([]);

    // Email passed from previous screen
    const email = formData?.email;

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    const handleInputChange = (index, value) => {
        if (value.length <= 1 && /^\d*$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setError('');

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text');
        const digits = pastedData.replace(/\D/g, '').slice(0, 6).split('');

        const newOtp = [...otp];
        digits.forEach((digit, index) => {
            if (index < 6) newOtp[index] = digit;
        });
        setOtp(newOtp);

        // Focus the next empty input or the last input
        const nextIndex = Math.min(digits.length, 5);
        inputRefs.current[nextIndex]?.focus();
    };

    const handleVerify = async () => {
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            setError('Please enter all 6 digits');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/user/verify`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                }),
            });

            const data = await response.json()

            if (response.ok) {

                setSubmitMessage(data.message)
                localStorage.removeItem("otpSession");
                setTimeout(() => {
                    navigate("/")
                }, 1500)

            } else {
                setError(data.error || 'Invalid OTP. Please try again.');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        }
        finally {
            setLoading(false);
        }

    };

    const handleResend = async () => {
        setResendCooldown(30);
        setError('');

        try {
            const response = await fetch(`${API_URL}/api/user/otpresent`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: formData?.email
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setError(data.message);

            } else {
                setError(data.error || 'Invalid OTP. Please try again.');
            }
        } catch {
            setError('Failed to resend OTP. Please try again.');
        }
        finally {
            setLoading(false);
        }
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    if (submitMessage) {
        return (
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        minHeight: '100vh',
                        backgroundColor: 'background.default',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 2,
                    }}
                >
                    <Container maxWidth="sm">
                        <Paper
                            elevation={0}
                            sx={{
                                p: 4,
                                textAlign: 'center',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: '50%',
                                    backgroundColor: 'success.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mx: 'auto',
                                    mb: 3,
                                }}
                            >
                                <Typography variant="h3" color="white">
                                    ✓
                                </Typography>
                            </Box>
                            <Typography variant="h5" fontWeight={600} gutterBottom>
                                Verification Successful!
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                {submitMessage}
                            </Typography>
                        </Paper>
                    </Container>
                </Box>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 2,
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        {/* Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <IconButton
                                sx={{ mr: 1, p: 0.5 }}
                                onClick={() => {
                                    useNavigate("/signup")
                                }}
                            >
                                <ArrowBack />
                            </IconButton>
                            <Typography variant="h6" fontWeight={600}>
                                Verify email
                            </Typography>
                        </Box>

                        {/* Title and Description */}
                        <Typography variant="h4" fontWeight={700} gutterBottom>
                            Enter verification code
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            We've sent a 6-digit code to{' '}
                            <Typography component="span" fontWeight={600}>
                                {email?.substring(0, 3) + "***"}
                            </Typography>
                        </Typography>

                        {/* Error Alert */}
                        {error && (
                            <Alert severity={error.includes("resent") ? "success" : "error"} sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        {/* OTP Input Fields */}
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1.5,
                                justifyContent: 'center',
                                mb: 4,
                            }}
                        >
                            {otp.map((digit, index) => (
                                <TextField
                                    key={index}
                                    inputRef={(el) => (inputRefs.current[index] = el)}
                                    value={digit}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    inputProps={{
                                        maxLength: 1,
                                        style: {
                                            textAlign: 'center',
                                            fontSize: '1.5rem',
                                            fontWeight: 600,
                                        },
                                    }}
                                    sx={{
                                        width: 56,
                                        '& .MuiOutlinedInput-root': {
                                            height: 56,
                                            '&.Mui-focused': {
                                                '& > fieldset': {
                                                    borderWidth: '2px',
                                                },
                                            },
                                        },
                                    }}
                                    variant="outlined"
                                    autoComplete="off"
                                />
                            ))}
                        </Box>

                        {/* Verify Button */}
                        <Button
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleVerify}
                            disabled={!isOtpComplete || loading}
                            sx={{
                                mb: 3,
                                height: 48,
                                fontWeight: 600,
                                textTransform: 'none',
                                fontSize: '1rem',
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Verify Code'
                            )}
                        </Button>

                        {/* Resend Section */}
                        <Box sx={{ textAlign: 'center' }}>
                            <Typography variant="body2" color="text.secondary">
                                Didn't receive the code?{' '}
                                {resendCooldown > 0 ? (
                                    <Typography component="span" color="text.secondary">
                                        Resend in {resendCooldown}s
                                    </Typography>
                                ) : (
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={handleResend}
                                        sx={{
                                            textDecoration: 'none',
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                            },
                                        }}
                                    >
                                        Resend Code
                                    </Link>
                                )}
                            </Typography>
                        </Box>

                        {/* Help Text */}
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                display: 'block',
                                textAlign: 'center',
                                mt: 3,
                                lineHeight: 1.5,
                            }}
                        >
                            Having trouble? Contact our{' '}
                            <Link href="#" underline="hover">
                                support team
                            </Link>
                        </Typography>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );
};

export default OTPVerification;