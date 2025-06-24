import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  TextField,
  Button,
  IconButton,
  Alert,
  Container,
  Paper,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ContentCopy as CopyIcon,
  QrCode as QrCodeIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const paymentDetails = location.state;

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [utrNumber, setUtrNumber] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const timerRef = useRef(null);

  const upiId = paymentDetails.channel;
  const amountToPay = paymentDetails.amount;

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerRef.current);
    } else {
      alert("Time up!, Redirecting to recharge page");
      navigate("/recharge", { state: "Will update soon" });
    }
  }, [timeLeft]);

  // Format time display
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle UTR input change
  const handleUtrChange = (event) => {
    const value = event.target.value.replace(/\D/g, ""); // Only allow digits
    if (value.length <= 12) {
      setUtrNumber(value);
    }
  };

  // Handle copy UPI ID
  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  // Handle submit
  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (timerRef.current) {
      clearTimeout(timerRef.current); // Stop the timer
    }
    const token = localStorage.getItem("token");
    setLoading(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:3001/api/user/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify({
          amount: amountToPay,
          utrNumber: utrNumber,
          channel: upiId,
        }),
      });

      const result = await response.json();

      // result.data && result.data.message

      if (response.ok && result.data && result.message) {
        setSubmitMessage(result.message);
        setSubmitStatus("success");
        setUtrNumber("");
      } else {
        setSubmitMessage(result?.message || "Unknown error occurred.");
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitMessage(
        "Network error. Please check your connection and try again."
      );
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setSubmitMessage("");
      setSubmitStatus(null);
      navigate("/recharge");
    }, 10000);
  };

  // Check if UTR is valid (12 digits)
  const isUtrValid = utrNumber.length === 12;

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        {/* Amount and Timer Section */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: "bold", color: "primary.main" }}
          >
            Amount to pay: ₹{amountToPay}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: timeLeft < 60 ? "error.main" : "text.secondary",
              fontWeight: "medium",
            }}
          >
            Time remaining: {formatTime(timeLeft)}
          </Typography>
          <Typography sx={{ color: "red", fontWeight: "large" }}>
            Don't press back
          </Typography>
        </Box>

        {/* QR Code Section */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 200,
                backgroundColor: "grey.100",
                borderRadius: 1,
                mb: 2,
              }}
            >
              <QRCodeSVG
                value={`upi://pay?pa=${upiId}&pn=Merchant&am=${amountToPay}`}
                size={150}
              />
              {/* <QrCodeIcon sx={{ fontSize: 120, color: 'grey.600' }} /> */}
            </Box>
            <Typography
              variant="body2"
              color="error"
              sx={{ fontWeight: "medium" }}
            >
              Do not use same QR to pay multiple times
            </Typography>
          </CardContent>
        </Card>

        {/* OR Divider */}
        <Box sx={{ position: "relative", mb: 3 }}>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "background.paper",
              px: 2,
              color: "text.secondary",
            }}
          >
            OR
          </Typography>
        </Box>

        {/* UPI ID Section */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: "medium" }}>
            UPI ID
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "grey.50",
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 1,
              px: 2,
              py: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{ flexGrow: 1, fontFamily: "monospace" }}
            >
              {upiId}
            </Typography>
            <IconButton onClick={handleCopyUpiId} size="small" color="primary">
              <CopyIcon />
            </IconButton>
          </Box>
          {copySuccess && (
            <Typography
              variant="caption"
              color="success.main"
              sx={{ mt: 1, display: "block" }}
            >
              UPI ID copied to clipboard!
            </Typography>
          )}
        </Box>

        {/* Divider */}
        <Divider sx={{ mb: 3 }} />

        {/* UTR Input Section */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Enter 12 digit UTR (UPI Ref) number"
            value={utrNumber}
            onChange={handleUtrChange}
            placeholder="823456789012"
            helperText={`${utrNumber.length}/12 digits`}
            inputProps={{
              maxLength: 12,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            error={utrNumber.length > 0 && utrNumber.length < 12}
            sx={{ mb: 2 }}
          />
        </Box>
        {/* Success Message */}
        {submitMessage && (
          <Alert
            severity={submitStatus === "error" ? "error" : "success"}
            sx={{ mb: 2 }}
          >
            {submitMessage}
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={!isUtrValid}
          sx={{ mb: 2, py: 1.5 }}
        >
          {loading ? (
            <>
              <CircularProgress size={24} color="inherit" sx={{ mr: 1 }} />
              Submitting...
            </>
          ) : (
            "Submit Payment"
          )}
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentPage;
