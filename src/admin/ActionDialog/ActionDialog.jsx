import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const ActionDialog = ({
  open,
  onClose,
  actionType,
  selectedTransaction,
  remarks,
  setRemarks,
  paymentDetails,
  setPaymentDetails,
  onSubmit
}) => {
  const getDialogTitle = () => {
    switch (actionType) {
      case 'approve': return 'Approve Transaction';
      case 'reject': return 'Reject Transaction';
      case 'complete': return 'Complete Transaction';
      default: return 'Transaction Action';
    }
  };

  const getSubmitButtonText = () => {
    switch (actionType) {
      case 'approve': return 'Approve';
      case 'reject': return 'Reject';
      case 'complete': return 'Complete';
      default: return 'Submit';
    }
  };

  const getSubmitButtonColor = () => {
    return actionType === 'reject' ? 'error' : 'primary';
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{getDialogTitle()}</DialogTitle>
      <DialogContent>
        {selectedTransaction && (
          <Box>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Order ID: {selectedTransaction.orderId}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Amount: ₹{selectedTransaction.amount}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Type: {selectedTransaction.type}
            </Typography>
            
            {actionType === 'complete' && (
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Payment Details"
                value={paymentDetails}
                onChange={(e) => setPaymentDetails(e.target.value)}
                margin="normal"
                placeholder="Enter payment confirmation details..."
              />
            )}
            
            <TextField
              fullWidth
              multiline
              rows={3}
              label={actionType === 'reject' ? 'Rejection Reason' : 'Remarks'}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              margin="normal"
              placeholder={
                actionType === 'reject' 
                  ? 'Enter reason for rejection...' 
                  : 'Enter any remarks...'
              }
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={onSubmit} 
          variant="contained"
          color={getSubmitButtonColor()}
        >
          {getSubmitButtonText()}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ActionDialog;