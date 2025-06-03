import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';

const QuickStats = ({ 
  totalDeposits = 0, 
  totalWithdrawals = 0 
}) => {
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Card 
        elevation={1}
        sx={{ 
          flex: 1,
          borderRadius: 2,
          transition: 'all 0.2s',
          '&:hover': {
            elevation: 3,
            transform: 'translateY(-2px)'
          }
        }}
      >
        <CardContent sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
            {totalDeposits}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Deposits
          </Typography>
        </CardContent>
      </Card>
      
      <Card 
        elevation={1}
        sx={{ 
          flex: 1,
          borderRadius: 2,
          transition: 'all 0.2s',
          '&:hover': {
            elevation: 3,
            transform: 'translateY(-2px)'
          }
        }}
      >
        <CardContent sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main', mb: 0.5 }}>
            {totalWithdrawals}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Withdrawals
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuickStats;