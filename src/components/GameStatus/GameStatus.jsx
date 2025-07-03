import React from 'react';
import { Paper, Typography, Stack, Button } from '@mui/material';
import { History } from '@mui/icons-material';
import { ResultCircle } from '../styled/StyledComponents';
import { GAME_PERIODS } from '../../constants/GameConstants';

const GameStatus = ({ 
  balance, 
  onShowHistory, 
  selectedBet, 
  selectedPeriod, 
  gamePhase, 
  lastResult 
}) => {
  const currentPeriodData = GAME_PERIODS[selectedPeriod];

  return (
    <>
      {/* Period Change Notice */}
      {gamePhase === 'revealing' && (
        <Paper sx={{ p: 2, mb: 2, bgcolor: 'warning.light', textAlign: 'center' }}>
          <Typography variant="body2">
            Game period cannot be changed during result phase
          </Typography>
        </Paper>
      )}

      {/* Balance and Actions */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Balance: ₹{balance}
          </Typography>
          <Button
            variant="contained"
            startIcon={<History />}
            onClick={onShowHistory}
          >
            History
          </Button>
        </Stack>
      </Paper>

      {/* Current Selection Display */}
      {selectedBet && (
        <Paper sx={{ p: 2, mb: 2, borderLeft: 4, borderColor: 'primary.main' }}>
          <Typography variant="body2" color="text.secondary">
            Current Selection ({currentPeriodData.label} {currentPeriodData.sublabel}):
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {selectedBet.displayName}
          </Typography>
        </Paper>
      )}

      {/* Game Result */}
      {gamePhase === 'revealing' && lastResult && (
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Result - {currentPeriodData.label} {currentPeriodData.sublabel}
          </Typography>
          <ResultCircle 
            color={lastResult.color.name} 
            sx={{ mx: 'auto', mb: 2 }}
          >
            {lastResult.number}
          </ResultCircle>
          <Typography variant="body1">
            Number: {lastResult.number} | Color: {lastResult.color.name}
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default GameStatus;