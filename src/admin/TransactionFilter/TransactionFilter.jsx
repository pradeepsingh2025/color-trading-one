import React from 'react';
import {
  Card,
  CardContent,
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { Refresh } from '@mui/icons-material';

const TransactionFilters = ({ 
  transactionType, 
  setTransactionType, 
  dateRange, 
  setDateRange, 
  onFilter 
}) => {
  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Box display="flex" flexWrap="wrap" gap={2} alignItems="center">
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={transactionType}
              label="Type"
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="DEPOSIT">Deposit</MenuItem>
              <MenuItem value="WITHDRAWAL">Withdrawal</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="date"
            label="Start Date"
            InputLabelProps={{ shrink: true }}
            value={dateRange.start}
            onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          />
          <TextField
            type="date"
            label="End Date"
            InputLabelProps={{ shrink: true }}
            value={dateRange.end}
            onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          />
          <Button variant="outlined" startIcon={<Refresh />} onClick={onFilter}>
            Filter
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransactionFilters;