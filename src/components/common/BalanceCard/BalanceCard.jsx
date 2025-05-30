import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Stack,
  IconButton
} from '@mui/material';
import {
  AccountBalanceWallet,
  Refresh
} from '@mui/icons-material';

const WalletBalanceCard = () => {
  const [balance, setBalance] = React.useState(0.00);

  const handleWithdraw = () => {
    console.log('Withdraw clicked');
  };

  const handleDeposit = () => {
    console.log('Deposit clicked');
  };

  const handleRefresh = () => {
    console.log('Refresh balance');
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 400, 
        margin: '20px auto',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}
    >
      <CardContent sx={{ padding: 3 }}>
        {/* Balance Display */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
            <Typography 
              variant="h3" 
              component="div" 
              sx={{ 
                fontWeight: 'bold',
                fontSize: '2.5rem'
              }}
            >
              ₹{balance.toFixed(2)}
            </Typography>
            <IconButton 
              onClick={handleRefresh}
              sx={{ 
                color: 'rgba(255,255,255,0.7)',
                '&:hover': {
                  color: 'white',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
              size="small"
            >
              <Refresh />
            </IconButton>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <AccountBalanceWallet sx={{ fontSize: 20, opacity: 0.8 }} />
            <Typography 
              variant="body1" 
              sx={{ 
                opacity: 0.9,
                fontWeight: 500
              }}
            >
              Wallet balance
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleWithdraw}
            sx={{
              backgroundColor: '#f44336',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
              '&:disabled': {
                backgroundColor: 'rgba(244, 67, 54, 0.3)',
                color: 'rgba(255,255,255,0.5)'
              }
            }}
            disabled={balance <= 0}
          >
            Withdraw
          </Button>
          
          <Button
            variant="contained"
            fullWidth
            onClick={handleDeposit}
            sx={{
              backgroundColor: '#4caf50',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              py: 1.5,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#388e3c',
              }
            }}
          >
            Deposit
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default WalletBalanceCard;