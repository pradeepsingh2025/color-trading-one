import { useState, useEffect, useCallback, useRef } from "react";
import { Container } from "@mui/material";
import { io } from "socket.io-client";
import { useUser } from "../../context/UserContext";

// Import all components
import GameTypeSelector from "../GameTypeSelector/GameTypeSelector";
import GameInfo from "../GameInfo/GameInfo";
import ColorSelection from "../BettingOptions/ColorSelection";
import NumberSelection from "../BettingOptions/NumberSelection";
import SizeSelection from "../BettingOptions/SizeSelection";
import GameStatus from "../GameStatus/GameStatus";
import BetConfirmationDialog from "../Dialogs/BetConfirmationDialog";
import HowToPlayDialog from "../Dialogs/HowToPlayDialog";
import HistoryDialog from "../Dialogs/HistoryDialog";

// Import utilities and constants
import { GAME_PERIODS } from "../../constants/GameConstants";

const Game = () => {
  // Socket connection
  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const { user } = useUser();

  //game states
  const [gameStates, setGameStates] = useState({
    "30s": null,
    "1m": null,
    "3m": null,
    "5m": null,
  });

  const [selectedPeriod, setSelectedPeriod] = useState("3m");
  const [timeRemaining, setTimeRemaining] = useState(
    GAME_PERIODS["3m"].duration
  );
  const [selectedBet, setSelectedBet] = useState(null);
  const [currentBet, setCurrentBet] = useState(null);

  const [betAmount, setBetAmount] = useState(1);
  const [betQuantity, setBetQuantity] = useState(1);
  const [gameResults, setGameResults] = useState({
    "30s": [],
    "1m": [],
    "3m": [],
    "5m": [],
  });
  const [currentPeriod, setCurrentPeriod] = useState("");

  const [balance, setBalance] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showBetPopup, setShowBetPopup] = useState(false);

  const [gamePhase, setGamePhase] = useState("betting");
  const [lastResult, setLastResult] = useState(null);

  const [userId] = useState(user.userID);

  useEffect(() => {
    socket.current = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
    });

    // Connection event handlers
    socket.current.on("connect", () => {
      console.log("Connected to server:", socket.current.id);
      setIsConnected(true);

      // Request user balance on connection
      // getUserBalance();
    });

    socket.current.on("disconnect", () => {
      console.log("Disconnected from server");
      setIsConnected(false);
    });

    // Game state listeners
    socket.current.on("gameState30s", (state) => {
      console.log("Received 30s game state:", state);
      setGameStates((prev) => ({ ...prev, "30s": state }));
      updateUIFromGameState("30s", state);
    });

    socket.current.on("gameState1m", (state) => {
      console.log("Received 1m game state:", state);
      setGameStates((prev) => ({ ...prev, "1m": state }));
      updateUIFromGameState("1m", state);
    });

    socket.current.on("gameState3m", (state) => {
      console.log("Received 3m game state:", state);
      setGameStates((prev) => ({ ...prev, "3m": state }));
      updateUIFromGameState("3m", state);
    });

    socket.current.on("gameState5m", (state) => {
      console.log("Received 5m game state:", state);
      setGameStates((prev) => ({ ...prev, "5m": state }));
      updateUIFromGameState("5m", state);
    });

    // Timer updates
    socket.current.on("timer", (data) => {
      const { gameType, timeRemaining: time, phase } = data;

      // Update only if this is the selected period
      if (gameType === selectedPeriod) {
        setTimeRemaining(time);
        setGamePhase(phase);
      }
    });

    // Game result
    socket.current.on("gameResult", (data) => {
      const { gameType, result, round } = data;
      console.log("Game result received:", data);

      setLastResult(result);
      setGameResults((prev) => ({
        ...prev,
        [gameType]: [{ ...result, round }, ...prev[gameType].slice(0, 9)],
      }));

      // If this is the selected period, update phase
      if (gameType === selectedPeriod) {
        setGamePhase("result");
      }
    });

    // New round started
    socket.current.on("newRound", (data) => {
      const { gameType, newState } = data;
      console.log("New round started:", data);

      setGameStates((prev) => ({ ...prev, [gameType]: newState }));

      // If this is the selected period, reset UI
      if (gameType === selectedPeriod) {
        setGamePhase("betting");
        setSelectedBet(null);
        setCurrentBet(null);
        setShowBetPopup(false);
        setCurrentPeriod(newState.currentRound);
        setTimeRemaining(newState.timeRemaining);
      }
    });

    // Bet placed confirmation
    socket.current.on("betPlaced", (data) => {
      console.log("Bet placed confirmation:", data);
      setCurrentBet(data.bet);
      setShowBetPopup(false);

      // Update balance after bet
      // getUserBalance();
    });

    // User balance
    socket.current.on("userBalance", (data) => {
      console.log("User balance received:", data);
      setBalance(data.balance);
    });

    // Current bet
    socket.current.on("currentBet", (data) => {
      console.log("Current bet received:", data);
      if (data.bet) {
        setCurrentBet(data.bet);
      }
    });

    // Error handling
    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
      alert("Error: " + error.message);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  // Update UI when selected period changes

  useEffect(() => {
    const currentGameState = gameStates[selectedPeriod];
    if (currentGameState) {
      updateUIFromGameState(selectedPeriod, currentGameState);
    }

    // Get current bet for the selected period
    getCurrentBet();
  }, [selectedPeriod, gameStates]);

  const updateUIFromGameState = (gameType, state) => {
    if (gameType === selectedPeriod) {
      setTimeRemaining(state.timeRemaining);
      setGamePhase(state.phase);
      setCurrentPeriod(state.currentRound);
      setGameResults((prev) => ({
        ...prev,
        [gameType]: [
          { ...lastResult, round: state.currentRound },
          ...prev[gameType],
        ],
      }));
      setLastResult(state.lastResult);
    }
  };

  const getUserBalance = () => {
    if (socket.current && socket.current.connected) {
      socket.current.emit("getUserBalance", {
        userId: userId,
      });
    }
  };

  const getCurrentBet = () => {
    if (socket.current && socket.current.connected) {
      socket.current.emit("getCurrentBet", {
        userId: userId,
        gameType: selectedPeriod,
      });
    }
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setSelectedBet(null);
    setCurrentBet(null);
    setShowBetPopup(false);

    // Update UI from the new period's game state
    const newGameState = gameStates[period];
    if (newGameState) {
      updateUIFromGameState(period, newGameState);
    }
  };

  const handleSelection = (type, value, displayName) => {
    if (gamePhase === "betting") {
      setSelectedBet({ type, value, displayName });
      setShowBetPopup(true);
    }
  };

  const startNewRound = useCallback(() => {
    const duration = GAME_PERIODS[selectedPeriod].duration;
    setTimeRemaining(duration);
    setGamePhase("betting");
    setSelectedBet(null);
    setShowBetPopup(false);
    setCurrentPeriod(Date.now().toString());
  }, [selectedPeriod]);

  const confirmBet = () => {
    if (!socket.current || !socket.current.connected) {
      alert("Not connected to server");
      return;
    }

    if (!selectedBet) {
      alert("No bet selected");
      return;
    }

    // Create bet object based on selection type
    let betData = {
      userId: userId,
      gameType: selectedPeriod,
      bet: {
        amount: betAmount,
        quantity: betQuantity,
        totalAmount: betAmount * betQuantity,
        type: selectedBet.type,
        selection: selectedBet.value,
        displayName: selectedBet.displayName,
      },
    };

    // Format bet data based on type
    if (selectedBet.type === "color") {
      betData.bet.color = selectedBet.value;
    } else if (selectedBet.type === "number") {
      betData.bet.number = selectedBet.value;
    } else if (selectedBet.type === "big" || selectedBet.type === "small") {
      betData.bet.size = selectedBet.type;
    }

    console.log("Placing bet:", betData);
    socket.current.emit("placeBet", betData);
  };

  const cancelBet = () => {
    setSelectedBet(null);
    setShowBetPopup(false);
  };

  // Mock numbers array for NumberSelection component
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeRemaining((prev) => {
  //       if (prev <= 1) {
  //         if (gamePhase === "betting") {
  //           setGamePhase("revealing");
  //           const result = game.generateResult();
  //           setLastResult(result);
  //           setGameResults((prevResults) => ({
  //             ...prevResults,
  //             [selectedPeriod]: [
  //               result,
  //               ...prevResults[selectedPeriod].slice(0, 9),
  //             ],
  //           }));

  //           let winnings = 0;
  //           if (selectedBet) {
  //             if (
  //               selectedBet.type === "color" &&
  //               selectedBet.value === result.color.name
  //             ) {
  //               winnings += betAmount * betQuantity * result.color.payout;
  //             } else if (
  //               selectedBet.type === "number" &&
  //               selectedBet.value === result.number
  //             ) {
  //               winnings += betAmount * betQuantity * 9;
  //             } else if (selectedBet.type === "big" && result.number >= 5) {
  //               winnings += betAmount * betQuantity * 2;
  //             } else if (selectedBet.type === "small" && result.number <= 4) {
  //               winnings += betAmount * betQuantity * 2;
  //             }
  //           }

  //           if (winnings > 0) {
  //             setBalance((prev) => prev + winnings - betAmount * betQuantity);
  //           } else if (selectedBet) {
  //             setBalance((prev) => prev - betAmount * betQuantity);
  //           }

  //           setTimeout(() => {
  //             startNewRound();
  //           }, 3000);

  //           return 3;
  //         } else {
  //           startNewRound();
  //           return GAME_PERIODS[selectedPeriod].duration;
  //         }
  //       }
  //       return prev - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [
  //   gamePhase,
  //   selectedBet,
  //   betAmount,
  //   betQuantity,
  //   game,
  //   startNewRound,
  //   selectedPeriod,
  // ]);

  return (
    <Container
      maxWidth="sm"
      sx={{ bgcolor: "grey.50", minHeight: "100vh", py: 2 }}
    >
      {/* Connection Status */}
      {!isConnected && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            textAlign: "center",
            marginBottom: "10px",
            borderRadius: "4px",
          }}
        >
          Connecting to server...
        </div>
      )}

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
        numbers={numbers}
      />

      <SizeSelection
        selectedBet={selectedBet}
        gamePhase={gamePhase}
        onSelection={handleSelection}
      />

      {/* Current Bet Section */}
      {currentBet && (
        <div
          style={{
            margin: "16px 0",
            padding: "12px",
            background: "#e3f2fd",
            borderRadius: "6px",
            color: "#1565c0",
          }}
        >
          <strong>Current Bet:</strong>
          <div>Type: {currentBet.type}</div>
          <div>
            Selection:{" "}
            {currentBet.displayName ||
              currentBet.selection ||
              currentBet.color ||
              currentBet.number ||
              currentBet.size}
          </div>
          <div>Amount: {currentBet.amount}</div>
          <div>Quantity: {currentBet.quantity}</div>
          <div>Total: {currentBet.totalAmount}</div>
        </div>
      )}

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
