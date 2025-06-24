import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Tabs,
  Tab,
  Typography,
  Pagination
} from '@mui/material';

// Import all components
import AdminHeader from '../../admin/AdminHeader/AdminHeader';
import DashboardStats from '../../admin/DashboardStats/DashboardStats';
import TransactionTable from '../../admin/TransactionTable/TransactionTable';
import TransactionFilters from '../../admin/TransactionFilter/TransactionFilter';
import ActionDialog from '../../admin/ActionDialog/ActionDialog';
import NotificationSnackbar from '../../admin/NotificationSnackbar/NotificationSnackbar';

function AdminPanel() {
  const [currentTab, setCurrentTab] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [actionDialog, setActionDialog] = useState(false);
  const [actionType, setActionType] = useState('');
  const [remarks, setRemarks] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [page, setPage] = useState(1);
  const [transactionType, setTransactionType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Mock data for demonstration
  const mockTransactions = [
    {
      _id: '1',
      orderId: 'DEPOSIT_001',
      userId: 'user123',
      type: 'DEPOSIT',
      amount: 1000,
      status: 'PENDING',
      utrNumber: 'UTR123456789',
      channel: 'UPI',
      createdAt: new Date().toISOString()
    },
    {
      _id: '2',
      orderId: 'WITHDRAWAL_001',
      userId: 'user456',
      type: 'WITHDRAWAL',
      amount: 500,
      status: 'PENDING',
      upiId: 'user456@paytm',
      createdAt: new Date().toISOString()
    },
    {
      _id: '3',
      orderId: 'DEPOSIT_002',
      userId: 'user789',
      type: 'DEPOSIT',
      amount: 2000,
      status: 'PROCESSING',
      utrNumber: 'UTR987654321',
      channel: 'Bank Transfer',
      createdAt: new Date().toISOString()
    }
  ];

  const mockStats = [
    { _id: { type: 'DEPOSIT', status: 'PENDING' }, count: 5, totalAmount: 15000 },
    { _id: { type: 'WITHDRAWAL', status: 'PENDING' }, count: 3, totalAmount: 7500 },
    { _id: { type: 'DEPOSIT', status: 'COMPLETED' }, count: 12, totalAmount: 45000 },
    { _id: { type: 'WITHDRAWAL', status: 'COMPLETED' }, count: 8, totalAmount: 22000 }
  ];

  useEffect(() => {
    setTransactions(mockTransactions);
    setStats(mockStats);
  }, []);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleActionClick = (transaction, action) => {
    setSelectedTransaction(transaction);
    setActionType(action);
    setActionDialog(true);
  };

  const handleActionSubmit = () => {
    // Simulate API call
    const updatedTransactions = transactions.map(t => 
      t._id === selectedTransaction._id 
        ? { ...t, status: actionType === 'approve' ? 'PROCESSING' : actionType === 'complete' ? 'COMPLETED' : 'REJECTED' }
        : t
    );
    setTransactions(updatedTransactions);
    
    setSnackbar({
      open: true,
      message: `Transaction ${actionType}d successfully`,
      severity: 'success'
    });
    
    setActionDialog(false);
    setRemarks('');
    setPaymentDetails('');
  };

  const handleRefresh = () => {
    // Simulate refresh
    setSnackbar({
      open: true,
      message: 'Data refreshed successfully',
      severity: 'success'
    });
  };

  const handleFilter = () => {
    // Simulate filter
    setSnackbar({
      open: true,
      message: 'Filters applied successfully',
      severity: 'info'
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AdminHeader onRefresh={handleRefresh} />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Tabs value={currentTab} onChange={handleTabChange} sx={{ mb: 3 }}>
          <Tab label="Dashboard" />
          <Tab label="Transactions" />
          <Tab label="Statistics" />
        </Tabs>

        {currentTab === 0 && (
          <Box>
            <DashboardStats stats={stats} />
            <Box mt={4}>
              <Typography variant="h5" gutterBottom>
                Recent Transactions
              </Typography>
              <TransactionTable 
                transactions={transactions} 
                onActionClick={handleActionClick}
              />
            </Box>
          </Box>
        )}

        {currentTab === 1 && (
          <Box>
            <TransactionFilters 
              transactionType={transactionType}
              setTransactionType={setTransactionType}
              dateRange={dateRange}
              setDateRange={setDateRange}
              onFilter={handleFilter}
            />
            
            <TransactionTable 
              transactions={transactions} 
              onActionClick={handleActionClick}
            />
            
            <Box display="flex" justifyContent="center" mt={3}>
              <Pagination 
                count={10} 
                page={page} 
                onChange={(e, value) => setPage(value)} 
                color="primary" 
              />
            </Box>
          </Box>
        )}

        {currentTab === 2 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Transaction Statistics
            </Typography>
            <DashboardStats stats={stats} />
          </Box>
        )}
      </Container>

      <ActionDialog
        open={actionDialog}
        onClose={() => setActionDialog(false)}
        actionType={actionType}
        selectedTransaction={selectedTransaction}
        remarks={remarks}
        setRemarks={setRemarks}
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
        onSubmit={handleActionSubmit}
      />

      <NotificationSnackbar 
        snackbar={snackbar}
        onClose={handleSnackbarClose}
      />
    </Box>
  );
}

export default AdminPanel;