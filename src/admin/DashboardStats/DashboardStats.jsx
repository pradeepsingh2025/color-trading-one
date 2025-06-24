import React from 'react';
import { Container, Box, Badge } from '@mui/material';
import { TrendingUp, TrendingDown, AccountBalance } from '@mui/icons-material';
import StatCard from '../StatCard/StatCard';

const DashboardStats = ({ stats }) => {
  const pendingDeposits = stats.find(s => s._id.type === 'DEPOSIT' && s._id.status === 'PENDING') || { count: 0, totalAmount: 0 };
  const pendingWithdrawals = stats.find(s => s._id.type === 'WITHDRAWAL' && s._id.status === 'PENDING') || { count: 0, totalAmount: 0 };
  const completedDeposits = stats.find(s => s._id.type === 'DEPOSIT' && s._id.status === 'COMPLETED') || { count: 0, totalAmount: 0 };
  const completedWithdrawals = stats.find(s => s._id.type === 'WITHDRAWAL' && s._id.status === 'COMPLETED') || { count: 0, totalAmount: 0 };

  return (
    <Container maxWidth="lg" sx={{ p: 0 }}>
      <Box 
        display="flex" 
        flexWrap="wrap" 
        gap={3}
        sx={{
          '& > *': {
            flex: '1 1 250px',
            minWidth: '250px'
          }
        }}
      >
        <StatCard
          title="Pending Deposits"
          value={pendingDeposits.count}
          icon={<Badge badgeContent={pendingDeposits.count} color="warning"><TrendingUp /></Badge>}
          color="#ed6c02"
        />
        <StatCard
          title="Pending Withdrawals"
          value={pendingWithdrawals.count}
          icon={<Badge badgeContent={pendingWithdrawals.count} color="error"><TrendingDown /></Badge>}
          color="#d32f2f"
        />
        <StatCard
          title="Total Deposits"
          value={`₹${completedDeposits.totalAmount.toLocaleString()}`}
          icon={<AccountBalance />}
          color="#2e7d32"
        />
        <StatCard
          title="Total Withdrawals"
          value={`₹${completedWithdrawals.totalAmount.toLocaleString()}`}
          icon={<AccountBalance />}
          color="#0288d1"
        />
      </Box>
    </Container>
  );
};

export default DashboardStats;