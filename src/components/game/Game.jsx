import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  IconButton,
  Chip,
  FormControlLabel,
  Checkbox,
  Stack,
  Avatar,
  Divider,
  Container,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  Timer,
  TrendingUp,
  History,
  Info,
  PlayArrow,
  Add,
  Remove,
  Close
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Custom styled components
const GameCard = styled(Card)(({ theme, active }) => ({
  minWidth: 80,
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: active ? theme.palette.primary.main : theme.palette.grey[100],
  color: active ? 'white' : 'inherit',
  '&:hover': {
    backgroundColor: active ? theme.palette.primary.dark : theme.palette.grey[200],
  }
}));

const ColorButton = styled(Button)(({ theme, color: colorName, selected }) => {
  const colors = {
    green: theme.palette.success.main,
    violet: theme.palette.secondary.main,
    red: theme.palette.error.main
  };
  
  return {
    backgroundColor: selected ? colors[colorName] : 'white',
    color: selected ? 'white' : colors[colorName],
    border: `2px solid ${colors[colorName]}`,
    '&:hover': {
      backgroundColor: selected ? colors[colorName] : `${colors[colorName]}10`,
    }
  };
});

const NumberButton = styled(Button)(({ theme, number, selected }) => {
  const getColor = (num) => {
    if ([1, 3, 7, 9].includes(num)) return theme.palette.success.main;
    if ([0, 5].includes(num)) return theme.palette.secondary.main;
    return theme.palette.error.main;
  };
  
  const color = getColor(number);
  
  return {
    minWidth: 0,
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: selected ? color : 'white',
    color: selected ? 'white' : color,
    border: `2px solid ${color}`,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: selected ? color : `${color}10`,
    }
  };
});

const SizeButton = styled(Button)(({ theme, size, selected }) => {
  const colors = {
    big: theme.palette.warning.main,
    small: theme.palette.info.main
  };
  
  const color = colors[size];
  
  return {
    backgroundColor: selected ? color : 'white',
    color: selected ? 'white' : color,
    border: `2px solid ${color}`,
    '&:hover': {
      backgroundColor: selected ? color : `${color}10`,
    }
  };
});

const TimerBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

const ResultCircle = styled(Avatar)(({ theme, color }) => {
  const colors = {
    green: theme.palette.success.main,
    violet: theme.palette.secondary.main,
    red: theme.palette.error.main
  };
  
  return {
    backgroundColor: colors[color],
    width: 64,
    height: 64,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };
});

// Game Logic Class
class ColorTradingGame {
  constructor() {
    this.colors = {
      GREEN: { name: 'green', probability: 0.333, payout: 2.0 },
      VIOLET: { name: 'violet', probability: 0.333, payout: 4.5 },
      RED: { name: 'red', probability: 0.334, payout: 2.0 }
    };
    this.numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  generateResult() {
    const random = Math.random();
    const randomNumber = Math.floor(Math.random() * 10);
    
    let cumulativeProbability = 0;
    let winningColor;
    
    for (const [key, color] of Object.entries(this.colors)) {
      cumulativeProbability += color.probability;
      if (random <= cumulativeProbability) {
        winningColor = color;
        break;
      }
    }
    
    return {
      number: randomNumber,
      color: winningColor,
      timestamp: Date.now()
    };
  }
}

const ColorTradingUI = () => {
  const [game] = useState(new ColorTradingGame());
  const [timeRemaining, setTimeRemaining] = useState(180);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState(1);
  const [betQuantity, setBetQuantity] = useState(1);
  const [gameResults, setGameResults] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState('20250530100020435');
  const [balance, setBalance] = useState(1000);
  const [showHistory, setShowHistory] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showBetPopup, setShowBetPopup] = useState(false);
  const [gamePhase, setGamePhase] = useState('betting');
  const [lastResult, setLastResult] = useState(null);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startNewRound = useCallback(() => {
    setTimeRemaining(180);
    setGamePhase('betting');
    setSelectedBet(null);
    setShowBetPopup(false);
    setCurrentPeriod(Date.now().toString());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (gamePhase === 'betting') {
            setGamePhase('revealing');
            const result = game.generateResult();
            setLastResult(result);
            setGameResults(prev => [result, ...prev.slice(0, 9)]);
            
            let winnings = 0;
            if (selectedBet) {
              if (selectedBet.type === 'color' && selectedBet.value === result.color.name) {
                winnings += betAmount * betQuantity * result.color.payout;
              } else if (selectedBet.type === 'number' && selectedBet.value === result.number) {
                winnings += betAmount * betQuantity * 9;
              } else if (selectedBet.type === 'big' && result.number >= 5) {
                winnings += betAmount * betQuantity * 2;
              } else if (selectedBet.type === 'small' && result.number <= 4) {
                winnings += betAmount * betQuantity * 2;
              }
            }
            
            if (winnings > 0) {
              setBalance(prev => prev + winnings - (betAmount * betQuantity));
            } else if (selectedBet) {
              setBalance(prev => prev - (betAmount * betQuantity));
            }
            
            setTimeout(() => {
              startNewRound();
            }, 3000);
            
            return 3;
          } else {
            startNewRound();
            return 180;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase, selectedBet, betAmount, betQuantity, game, startNewRound]);

  const handleSelection = (type, value, displayName) => {
    if (gamePhase === 'betting') {
      setSelectedBet({ type, value, displayName });
      setShowBetPopup(true);
    }
  };

  const confirmBet = () => {
    setShowBetPopup(false);
  };

  const cancelBet = () => {
    setSelectedBet(null);
    setShowBetPopup(false);
  };

  const GameTypeCard = ({ title, time, isActive, icon: Icon }) => (
    <GameCard active={isActive}>
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
          <Icon sx={{ fontSize: 16 }} />
        </Box>
        <Typography variant="caption" component="div">
          {title}
        </Typography>
        <Typography variant="caption" component="div">
          {time}
        </Typography>
      </CardContent>
    </GameCard>
  );

  return (
    <Container maxWidth="sm" sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
      {/* Game Type Selector */}
      <Stack direction="row" spacing={1} mb={2}>
        <GameTypeCard title="WinGo" time="30sec" icon={Timer} />
        <GameTypeCard title="WinGo 1" time="1 Min" icon={Timer} />
        <GameTypeCard title="WinGo 3" time="3 Min" isActive icon={Timer} />
        <GameTypeCard title="WinGo 5" time="5 Min" icon={Timer} />
      </Stack>

      {/* Game Info Card */}
      <TimerBox mb={2}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<Info />}
              onClick={() => setShowHowToPlay(true)}
              sx={{ color: 'white', borderColor: 'white', mb: 1 }}
            >
              How to play
            </Button>
            <Typography variant="body2" color="inherit">
              WinGo 3 Min
            </Typography>
            <Stack direction="row" spacing={0.5} mt={1}>
              {gameResults.slice(0, 5).map((result, index) => (
                <Avatar
                  key={index}
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    bgcolor: result.color.name === 'green' ? 'success.main' :
                            result.color.name === 'violet' ? 'secondary.main' : 'error.main'
                  }}
                >
                  {result.number}
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

      {/* Color Selection */}
      <Stack direction="row" spacing={1} mb={2}>
        <ColorButton
          fullWidth
          variant="contained"
          color="green"
          selected={selectedBet?.type === 'color' && selectedBet?.value === 'green'}
          disabled={gamePhase !== 'betting'}
          onClick={() => handleSelection('color', 'green', 'Green')}
        >
          Green
        </ColorButton>
        <ColorButton
          fullWidth
          variant="contained"
          color="violet"
          selected={selectedBet?.type === 'color' && selectedBet?.value === 'violet'}
          disabled={gamePhase !== 'betting'}
          onClick={() => handleSelection('color', 'violet', 'Violet')}
        >
          Violet
        </ColorButton>
        <ColorButton
          fullWidth
          variant="contained"
          color="red"
          selected={selectedBet?.type === 'color' && selectedBet?.value === 'red'}
          disabled={gamePhase !== 'betting'}
          onClick={() => handleSelection('color', 'red', 'Red')}
        >
          Red
        </ColorButton>
      </Stack>

      {/* Number Selection */}
      <Grid container spacing={1} mb={2}>
        {game.numbers.map((number) => (
          <Grid item xs={2.4} key={number}>
            <NumberButton
              fullWidth
              number={number}
              selected={selectedBet?.type === 'number' && selectedBet?.value === number}
              disabled={gamePhase !== 'betting'}
              onClick={() => handleSelection('number', number, `Number ${number}`)}
            >
              {number}
            </NumberButton>
          </Grid>
        ))}
      </Grid>

      {/* Big/Small Selection */}
      <Stack direction="row" spacing={1} mb={2}>
        <SizeButton
          fullWidth
          variant="contained"
          size="big"
          selected={selectedBet?.type === 'big'}
          disabled={gamePhase !== 'betting'}
          onClick={() => handleSelection('big', 'big', 'Big (5-9)')}
        >
          Big (5-9)
        </SizeButton>
        <SizeButton
          fullWidth
          variant="contained"
          size="small"
          selected={selectedBet?.type === 'small'}
          disabled={gamePhase !== 'betting'}
          onClick={() => handleSelection('small', 'small', 'Small (0-4)')}
        >
          Small (0-4)
        </SizeButton>
      </Stack>

      {/* Balance and Actions */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold">
            Balance: ${balance}
          </Typography>
          <Button
            variant="contained"
            startIcon={<History />}
            onClick={() => setShowHistory(true)}
          >
            History
          </Button>
        </Stack>
      </Paper>

      {/* Current Selection Display */}
      {selectedBet && (
        <Paper sx={{ p: 2, mb: 2, borderLeft: 4, borderColor: 'primary.main' }}>
          <Typography variant="body2" color="text.secondary">
            Current Selection:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {selectedBet.displayName}
          </Typography>
        </Paper>
      )}

      {/* Game Status */}
      {gamePhase === 'revealing' && lastResult && (
        <Paper sx={{ p: 3, mb: 2, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Result
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

      {/* Bet Confirmation Dialog */}
      <Dialog 
        open={showBetPopup} 
        onClose={cancelBet}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle sx={{ bgcolor: 'secondary.main', color: 'white', textAlign: 'center' }}>
          <Typography variant="h6">WinGo 3 Min</Typography>
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
                onClick={cancelBet}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                onClick={confirmBet}
              >
                Total amount ₹{betAmount * betQuantity}.00
              </Button>
            </Stack>
          </Box>
        </DialogContent>
      </Dialog>

      {/* How to Play Dialog */}
      <Dialog open={showHowToPlay} onClose={() => setShowHowToPlay(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          How to Play
          <IconButton
            onClick={() => setShowHowToPlay(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List dense>
            <ListItem>
              <ListItemText primary="• Choose ONE option: a color, number, or big/small" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Select your bet amount and quantity" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Confirm your bet" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Wait for the result" />
            </ListItem>
            <ListItem>
              <ListItemText primary="• Win based on: Color (2x-4.5x), Number (9x), or Big/Small (2x)" />
            </ListItem>
          </List>
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={showHistory} onClose={() => setShowHistory(false)} maxWidth="xs" fullWidth>
        <DialogTitle>
          Game History
          <IconButton
            onClick={() => setShowHistory(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <List>
            {gameResults.map((result, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      fontSize: '0.875rem',
                      fontWeight: 'bold',
                      bgcolor: result.color.name === 'green' ? 'success.main' :
                              result.color.name === 'violet' ? 'secondary.main' : 'error.main'
                    }}
                  >
                    {result.number}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={`Number: ${result.number}`}
                  secondary={`Color: ${result.color.name}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ColorTradingUI;