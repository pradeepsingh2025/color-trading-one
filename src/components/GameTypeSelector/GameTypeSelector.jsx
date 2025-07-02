import { Stack, CardContent, Box, Typography } from '@mui/material';
import { Timer } from '@mui/icons-material';
import { GameCard } from '../styled/StyledComponents';
import { GAME_PERIODS } from '../../constants/GameConstants';

const GameTypeCard = ({ periodKey, isActive, onPeriodChange }) => {
  const period = GAME_PERIODS[periodKey];
  return (
    <GameCard 
      active={isActive} 
      onClick={() => onPeriodChange(periodKey)}
    >
      <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 1,
            bgcolor: isActive ? 'rgba(255,255,255,0.2)' : 'grey.300'
          }}
        >
          <Timer sx={{ fontSize: 16 }} />
        </Box>
        <Typography variant="caption" component="div">
          {period.label}
        </Typography>
        <Typography variant="caption" component="div">
          {period.sublabel}
        </Typography>
      </CardContent>
    </GameCard>
  );
};

const GameTypeSelector = ({ selectedPeriod, onPeriodChange, gamePhase }) => {
  const handlePeriodChange = (periodKey) => {
    if (gamePhase === 'betting') {
      onPeriodChange(periodKey);
    }
  };

  return (
    <Stack direction="row" spacing={1} mb={2}>
      {Object.keys(GAME_PERIODS).map(periodKey => (
        <GameTypeCard
          key={periodKey}
          periodKey={periodKey}
          isActive={selectedPeriod === periodKey}
          onPeriodChange={handlePeriodChange}
        />
      ))}
    </Stack>
  );
};

export default GameTypeSelector;
