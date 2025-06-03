import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme
} from '@mui/material';
import {
  AccountBalanceWallet,
  Download,
  Upload,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';

const WalletBalance = ({ 
  balance = "₹0.66",
  onDeposit,
  onWithdraw
}) => {
  const [showBalance, setShowBalance] = useState(true);
  const theme = useTheme();

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <Card elevation={2} sx={{ borderRadius: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccountBalanceWallet sx={{ color: 'primary.main' }} />
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Wallet Balance
            </Typography>
          </Box>
          <IconButton onClick={toggleBalanceVisibility} size="small">
            {showBalance ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
        
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700,
            mb: 3,
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px'
          }}
        >
          {showBalance ? balance : '₹***'}
        </Typography>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Download />}
            fullWidth
            onClick={onDeposit}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
              boxShadow: theme.shadows[3],
              '&:hover': {
                background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                boxShadow: theme.shadows[6],
              }
            }}
          >
            Deposit
          </Button>
          <Button
            variant="outlined"
            startIcon={<Upload />}
            fullWidth
            onClick={onWithdraw}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 500,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2
              }
            }}
          >
            Withdraw
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
 export default WalletBalance;