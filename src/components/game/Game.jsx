import React, { useState, useEffect, useCallback } from 'react';
import { Container } from '@mui/material';

// Import all components
import GameTypeSelector from '../GameTypeSelector/GameTypeSelector';
import GameInfo from '../GameInfo/GameInfo';
import ColorSelection from '../BettingOptions/ColorSelection';
import NumberSelection from '../BettingOptions/NumberSelection';
import SizeSelection from '../BettingOptions/SizeSelection';
import GameStatus from '../GameStatus/GameStatus';
import BetConfirmationDialog from '../Dialogs/BetConfirmationDialog';
import HowToPlayDialog from '../Dialogs/HowToPlayDialog';
import HistoryDialog from '../Dialogs/HistoryDialog';

// Import utilities and constants
import { ColorTradingGame } from '../../utils/GameLogic';
import { GAME_PERIODS } from '../../constants/GameConstants';

const Game = () => {
  const [game] = useState(new ColorTradingGame());
  const [selectedPeriod, setSelectedPeriod] = useState('3min');
  const [timeRemaining, setTimeRemaining] = useState(GAME_PERIODS['3min'].duration);
  const [selectedBet, setSelectedBet] = useState(null);
  const [betAmount, setBetAmount] = useState(1);
  const [betQuantity, setBetQuantity] = useState(1);
  const [gameResults, setGameResults] = useState({
    '30sec': [],
    '1min': [],
    '3min': [],
    '5min': []
  });
  const [currentPeriod, setCurrentPeriod] = useState('20250530100020435');
  const [balance, setBalance] = useState(1000);
  const [showHistory, setShowHistory] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showBetPopup, setShowBetPopup] = useState(false);
  const [gamePhase, setGamePhase] = useState('betting');
  const [lastResult, setLastResult] = useState(null);

  const startNewRound = useCallback(() => {
    const duration = GAME_PERIODS[selectedPeriod].duration;
    setTimeRemaining(duration);
    setGamePhase('betting');
    setSelectedBet(null);
    setShowBetPopup(false);
    setCurrentPeriod(Date.now().toString());
  }, [selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setTimeRemaining(GAME_PERIODS[period].duration);
    setSelectedBet(null);
    setShowBetPopup(false);
    setCurrentPeriod(Date.now().toString());
  };

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

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          if (gamePhase === 'betting') {
            setGamePhase('revealing');
            const result = game.generateResult();
            setLastResult(result);
            setGameResults(prevResults => ({
              ...prevResults,
              [selectedPeriod]: [result, ...prevResults[selectedPeriod].slice(0, 9)]
            }));
            
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
            return GAME_PERIODS[selectedPeriod].duration;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gamePhase, selectedBet, betAmount, betQuantity, game, startNewRound, selectedPeriod]);

  return (
    <Container maxWidth="sm" sx={{ bgcolor: 'grey.50', minHeight: '100vh', py: 2 }}>
      <GameTypeSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        gamePhase={gamePhase}
      />

      <GameInfo
        selectedPeriod={selectedPeriod}
        timeRemaining={timeRemaining}
        currentPeriod={currentPeriod}
        gameResults={gameResults}
        onShowHowToPlay={() => setShowHowToPlay(true)}
      />

      <ColorSelection
        selectedBet={selectedBet}
        gamePhase={gamePhase}
        onSelection={handleSelection}
      />

      <NumberSelection
        selectedBet={selectedBet}
        gamePhase={gamePhase}
        onSelection={handleSelection}
        numbers={game.numbers}
      />

      <SizeSelection
        selectedBet={selectedBet}
        gamePhase={gamePhase}
        onSelection={handleSelection}
      />

      <GameStatus
        balance={balance}
        onShowHistory={() => setShowHistory(true)}
        selectedBet={selectedBet}
        selectedPeriod={selectedPeriod}
        gamePhase={gamePhase}
        lastResult={lastResult}
      />

      {/* Bet Confirmation Dialog */}
      <BetConfirmationDialog
        open={showBetPopup}
        onClose={cancelBet}
        selectedBet={selectedBet}
        selectedPeriod={selectedPeriod}
        betAmount={betAmount}
        setBetAmount={setBetAmount}
        betQuantity={betQuantity}
        setBetQuantity={setBetQuantity}
        onConfirm={confirmBet}
      />

      {/* How to Play Dialog */}
      <HowToPlayDialog
        open={showHowToPlay}
        onClose={() => setShowHowToPlay(false)}
      />

      {/* History Dialog */}
      <HistoryDialog
        open={showHistory}
        onClose={() => setShowHistory(false)}
        selectedPeriod={selectedPeriod}
        gameResults={gameResults}
      />
    </Container>
  );
};

export default Game;