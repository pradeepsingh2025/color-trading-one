import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Container,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import {
  AccountBalanceWallet,
  CreditCard,
  Info,
  CheckCircle
} from '@mui/icons-material';

const WalletWithdraw = () => {
  const [walletBalance, setWalletBalance] = useState(999);
  const [upiId, setUpiId] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [amountError, setAmountError] = useState('');

  const validateAmount = (amount) => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setAmountError('Please enter a valid amount');
      return false;
    }
    if (numAmount < 110) {
      setAmountError('Minimum withdrawal amount is ₹110');
      return false;
    }
    if (numAmount > 5000) {
      setAmountError('Maximum withdrawal amount is ₹5000');
      return false;
    }
    if (numAmount > walletBalance) {
      setAmountError('Insufficient wallet balance');
      return false;
    }
    setAmountError('');
    return true;
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setWithdrawAmount(value);
    if (value) {
      validateAmount(value);
    } else {
      setAmountError('');
    }
  };

  const handleSubmit = () => {
    if (validateAmount(withdrawAmount) && upiId.trim()) {
      const amount = parseFloat(withdrawAmount);
      setWalletBalance(prev => prev - amount);
      setShowSuccess(true);
      setUpiId('');
      setWithdrawAmount('');
    }
  };

  const isSubmitDisabled = !upiId.trim() || !withdrawAmount || !!amountError;

  if (showSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 4}}>
        <Card sx={{ textAlign: 'center', p: 4, borderRadius: 3, boxShadow: 3 }}>
          <CheckCircle sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom color="success.main">
            Request Submitted Successfully!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Money will be credited to your account in the next 48 working hours.
            Contact customer-service team in case of any inconvenience.
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => setShowSuccess(false)}
            sx={{ mt: 2 }}
          >
            Make Another Withdrawal
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, bgcolor: '#f5f5f5', my: '20px', p: 3, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color:'#1976d2' }}>
        Withdraw from Wallet
      </Typography>

      {/* Card Container for top row */}
      <Box sx={{ display: 'flex',flexDirection: 'column', gap: 3, mb: 3, flexWrap: 'wrap' }}>
        {/* Current Balance Card */}
        <Box sx={{ flex: 1, minWidth: '300px' }}>
          <Card 
            sx={{ 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              minHeight: 200,
              borderRadius: 3, 
              boxShadow: 3
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Typography variant="h6" sx={{ opacity: 0.9 }}>
                  Current Balance
                </Typography>
                <CreditCard sx={{ opacity: 0.7 }} />
              </Box>
              
              <Typography variant="h3" sx={{ my: 2, fontWeight: 'bold' }}>
                ₹{walletBalance}
              </Typography>
              
              <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                Available for transactions
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.7, letterSpacing: 2 }}>
                  •••• •••• ••••
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.7, fontWeight: 'bold' }}>
                  WALLET
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Payment Instructions Card */}
        <Box sx={{ flex: 1, minWidth: '300px' }}>
          <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Info color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6" color="primary">
                  Payment Instructions
                </Typography>
              </Box>
              
              <Stack spacing={2}>
                <Box>
                  <Chip 
                    label="Min: ₹110.00" 
                    size="small" 
                    color="info" 
                    variant="outlined" 
                    sx={{ mr: 1 }} 
                  />
                  <Chip 
                    label="Max: ₹5000.00" 
                    size="small" 
                    color="info" 
                    variant="outlined" 
                  />
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  • Withdraw time: 00:00-23:59
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  • Today's Remaining Withdrawal Times: 3
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  • Please confirm your beneficiary account information before withdrawing
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  • If your information is incorrect, please contact customer service
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Withdrawal Form Card */}
      <Box sx={{ width: '100%' }}>
        <Card sx={{borderRadius: 3, boxShadow: 3}}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Withdrawal Details
            </Typography>
            
            {/* Form Fields Container */}
            <Box sx={{ display: 'flex', gap: 3, mb: 3, flexWrap: 'wrap' }}>
              <Box sx={{ flex: 1, minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label="UPI ID"
                  placeholder="example@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <AccountBalanceWallet sx={{ mr: 1, color: 'action.active' }} />
                  }}
                  required
                />
              </Box>
              
              <Box sx={{ flex: 1, minWidth: '250px' }}>
                <TextField
                  fullWidth
                  label="Withdrawal Amount"
                  placeholder="Enter amount (₹110 - ₹5000)"
                  value={withdrawAmount}
                  onChange={handleAmountChange}
                  variant="outlined"
                  type="number"
                  error={!!amountError}
                  helperText={amountError}
                  InputProps={{
                    startAdornment: <Typography sx={{ mr: 1, color: 'action.active' }}>₹</Typography>
                  }}
                  required
                />
              </Box>
            </Box>
            
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                sx={{ 
                  px: 6, 
                  py: 1.5,
                  background: isSubmitDisabled ? undefined : 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: isSubmitDisabled ? undefined : '0 3px 5px 2px rgba(33, 203, 243, .3)',
                }}
              >
                Submit Withdrawal Request
              </Button>
            </Box>
            
            {!isSubmitDisabled && (
              <Alert severity="info" sx={{ mt: 3 }}>
                <Typography variant="body2">
                  <strong>Amount to withdraw:</strong> ₹{withdrawAmount}<br />
                  <strong>Remaining balance:</strong> ₹{walletBalance - (parseFloat(withdrawAmount) || 0)}
                </Typography>
              </Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default WalletWithdraw;