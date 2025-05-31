import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Stack,
  Button,
  Divider,
  IconButton,
  Chip,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { GAME_PERIODS } from '../../constants/GameConstants';

const BetConfirmationDialog = ({
  open,
  onClose,
  selectedBet,
  selectedPeriod,
  betAmount,
  setBetAmount,
  betQuantity,
  setBetQuantity,
  onConfirm
}) => {
  const currentPeriodData = GAME_PERIODS[selectedPeriod];

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white', textAlign: 'center' }}>
        <Typography variant="h6">{currentPeriodData.label} {currentPeriodData.sublabel}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Select {selectedBet?.displayName}
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ p: 0 }}>
        {/* Balance Section */}
        <Box p={2}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Balance
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            {[1, 10, 100, 1000].map((amount) => (
              <Button
                key={amount}
                variant={betAmount === amount ? "contained" : "outlined"}
                color="secondary"
                size="small"
                onClick={() => setBetAmount(amount)}
              >
                {amount}
              </Button>
            ))}
          </Stack>
        </Box>

        <Divider />

        {/* Quantity Section */}
        <Box p={2}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Quantity
          </Typography>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={2}>
            <IconButton
              color="secondary"
              onClick={() => setBetQuantity(Math.max(1, betQuantity - 1))}
            >
              <Remove />
            </IconButton>
            <Typography variant="h6" fontWeight="bold" sx={{ minWidth: 48, textAlign: 'center' }}>
              {betQuantity}
            </Typography>
            <IconButton
              color="secondary"
              onClick={() => setBetQuantity(betQuantity + 1)}
            >
              <Add />
            </IconButton>
          </Stack>
          
          {/* Multiplier Options */}
          <Stack direction="row" spacing={1} justifyContent="center" flexWrap="wrap">
            {[1, 5, 10, 20, 50, 100].map((multiplier) => (
              <Chip
                key={multiplier}
                label={`X${multiplier}`}
                size="small"
                variant={betQuantity === multiplier ? "filled" : "outlined"}
                onClick={() => setBetQuantity(multiplier)}
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Box>

        <Divider />

        {/* Agreement and Total */}
        <Box p={2}>
          <FormControlLabel
            control={<Checkbox defaultChecked size="small" />}
            label={
              <Typography variant="caption">
                I agree <span style={{ color: 'red' }}>(Pre-sale rules)</span>
              </Typography>
            }
            sx={{ mb: 2 }}
          />
          
          {/* Action Buttons */}
          <Stack direction="row" spacing={1}>
            <Button
              fullWidth
              variant="outlined"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={onConfirm}
            >
              Total amount ₹{betAmount * betQuantity}.00
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BetConfirmationDialog;