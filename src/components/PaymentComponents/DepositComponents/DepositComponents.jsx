import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  Chip,
  Paper,
  Avatar
} from '@mui/material';
import {
  AccountBalanceWallet,
  QrCode,
  Payment,
  Security,
  CheckCircle,
  Warning
} from '@mui/icons-material';

import { NavLink } from 'react-router';

export default function WalletDepositInterface() {
  const [amount, setAmount] = useState('');
  const [paymentChannel, setPaymentChannel] = useState('amritgupta');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const currentBalance = 999;

  const validateAmount = (value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 100 || numValue > 10000) {
      setError('Amount must be between ₹100 - ₹10,000');
      return false;
    }
    setError('');
    return true;
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value) {
      validateAmount(value);
    } else {
      setError('');
    }
  };

  const handleDeposit = () => {
    if (!amount) {
      setError('Please enter an amount');
      return;
    }
    
    if (validateAmount(amount)) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setAmount('');
      }, 3000);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: '20px', p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}>
        Wallet Deposit
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Payment Instructions Card */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Security sx={{ color: '#1976d2', mr: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Recharge Instructions
              </Typography>
            </Box>
            <Box sx={{ pl: 1 }}>
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: '#1976d2', marginRight: '8px' }}>•</span>
                If the transfer time is up, please fill out the deposit form again.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: '#1976d2', marginRight: '8px' }}>•</span>
                The transfer amount must match the order you created, otherwise the money cannot be credited successfully.
              </Typography>
              <Typography variant="body2" sx={{ mb: 1, display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: '#1976d2', marginRight: '8px' }}>•</span>
                If you transfer the wrong amount, our company will not be responsible for the lost amount!
              </Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <span style={{ color: '#1976d2', marginRight: '8px' }}>•</span>
                Note: do not cancel the deposit order after the money has been transferred.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Balance and QR Code Cards Container */}
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column', 
          gap: 3,
          '@media (max-width: 900px)': {
            flexDirection: 'column'
          }
        }}>
          {/* Current Balance Card */}
          <Card sx={{ 
            flex: 1,
            borderRadius: 3, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            boxShadow: 3
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Current Balance
                </Typography>
                <AccountBalanceWallet sx={{ fontSize: 30 }} />
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                ₹{currentBalance.toLocaleString()}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Available for transactions
              </Typography>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
                <Typography variant="caption">**** **** ****</Typography>
                <Typography variant="caption">WALLET</Typography>
              </Box>
            </CardContent>
          </Card>

          {/* QR Code Payment Info */}
          <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 3 }}>
            <CardContent sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <QrCode sx={{ fontSize: 60, color: '#4caf50', mb: 2 }} />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                QR Code Payment
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Scan QR code to complete your payment securely
              </Typography>
              <Chip 
                label="Quick & Secure" 
                color="success" 
                variant="outlined"
                size="small"
              />
            </CardContent>
          </Card>
        </Box>

        {/* Payment Channel Selection */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
              Select Payment Channel
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={paymentChannel}
                onChange={(e) => setPaymentChannel(e.target.value)}
                row
              >
                <FormControlLabel
                  value="amritgupta"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#ff9800' }}>
                        <Payment sx={{ fontSize: 16 }} />
                      </Avatar>
                      aMrItg
                    </Box>
                  }
                />
                <FormControlLabel
                  value="pawanyadav"
                  control={<Radio />}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 24, height: 24, mr: 1, bgcolor: '#2196f3' }}>
                        <AccountBalanceWallet sx={{ fontSize: 16 }} />
                      </Avatar>
                      pAwAny
                    </Box>
                  }
                />
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

        {/* Amount Input and Deposit */}
        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Deposit Amount
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Enter Amount"
                variant="outlined"
                value={amount}
                onChange={handleAmountChange}
                error={!!error}
                helperText={error || 'Minimum ₹100 - Maximum ₹10,000'}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: 1 }}>₹</Typography>,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
            </Box>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleDeposit}
              disabled={!amount || !!error || success}
              sx={{
                py: 1,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: 2,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #1BA5D2 90%)',
                },
                '&:disabled': {
                  background: '#e0e0e0',
                }
              }}
            >
              <NavLink 
               to='/payment-page'
               style={{
                textDecoration: 'none',
                color: 'inherit',
                width: '100%'
               }}
              >
                Deposit Amount
              </NavLink>
            </Button>

            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
              Secure payment powered by encryption
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}