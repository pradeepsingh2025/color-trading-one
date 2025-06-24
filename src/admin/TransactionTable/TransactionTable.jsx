import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Box,
  IconButton
} from '@mui/material';
import {
  Pending,
  TrendingUp,
  CheckCircle,
  Cancel,
  Visibility
} from '@mui/icons-material';

const TransactionTable = ({ transactions, onActionClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'warning';
      case 'PROCESSING': return 'info';
      case 'COMPLETED': return 'success';
      case 'REJECTED': return 'error';
      default: return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING': return <Pending />;
      case 'PROCESSING': return <TrendingUp />;
      case 'COMPLETED': return <CheckCircle />;
      case 'REJECTED': return <Cancel />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 0 }}>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>User ID</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{transaction.orderId}</TableCell>
                  <TableCell>{transaction.userId}</TableCell>
                  <TableCell>
                    <Chip 
                      label={transaction.type} 
                      color={transaction.type === 'DEPOSIT' ? 'success' : 'warning'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>₹{transaction.amount}</TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(transaction.status)}
                      label={transaction.status}
                      color={getStatusColor(transaction.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Box display="flex" gap={1}>
                      {transaction.status === 'PENDING' && (
                        <>
                          <Button
                            size="small"
                            variant="contained"
                            color="success"
                            onClick={() => onActionClick(transaction, 'approve')}
                          >
                            Approve
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            onClick={() => onActionClick(transaction, 'reject')}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                      {transaction.status === 'PROCESSING' && (
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => onActionClick(transaction, 'complete')}
                        >
                          Complete
                        </Button>
                      )}
                      <IconButton size="small">
                        <Visibility />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default TransactionTable;