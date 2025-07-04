import React from 'react';
import { Box, Button, Typography, Stack, Avatar } from '@mui/material';
import { Info } from '@mui/icons-material';
import { TimerBox } from '../styled/StyledComponents';
import { GAME_PERIODS } from '../../constants/GameConstants';

const GameInfo = ({ 
  selectedPeriod, 
  timeRemaining, 
  currentPeriod, 
  gameResults, 
  onShowHowToPlay 
}) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentPeriodData = GAME_PERIODS[selectedPeriod];
  const currentResults = gameResults[selectedPeriod];

  // console.log("gameresults from gameInfo", gameResults)

  return (
    <TimerBox mb={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Info />}
            onClick={onShowHowToPlay}
            sx={{ color: 'white', borderColor: 'white', mb: 1 }}
          >
            How to play
          </Button>
          <Typography variant="body2" color="inherit">
            {currentPeriodData.label} {currentPeriodData.sublabel}
          </Typography>
          <Stack direction="row" spacing={0.5} mt={1}>
            {currentResults.slice(0, 5).map((result, index) => (
              <Avatar
                key={index}
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: '0.75rem',
                  fontWeight: 'bold',
                  bgcolor: result.result.color === 'green' ? 'success.main' :
                          result.result.color === 'violet' ? 'secondary.main' : 'error.main'
                }}
              >
                {result.result.number}
              </Avatar>
            ))}
          </Stack>
        </Box>
        
        <Box textAlign="center">
          <Typography variant="body2" color="inherit">
            Time remaining
          </Typography>
          <Typography variant="h4" fontFamily="monospace" fontWeight="bold" color="inherit">
            {formatTime(timeRemaining)}
          </Typography>
          <Typography variant="caption" fontFamily="monospace" color="inherit">
            {currentPeriod}
          </Typography>
        </Box>
      </Stack>
    </TimerBox>
  );
};

export default GameInfo;