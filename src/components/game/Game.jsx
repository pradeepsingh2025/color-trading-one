import { useState, useEffect, useRef } from "react";
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
import GameResultDialog from "../Dialogs/GameResult";

const Game = () => {
  // Socket connection
  const socket = useRef(null);
  const [isConnected, setIsConnected] = useState(false);

  const { user } = useUser();

  //game states
  const [gameStates, setGameStates] = useState({
    "30s": null, // state = {phase, timeRemaining, round, lastResult}
    "1m": null,
    "3m": null,
    "5m": null,
  });

  const [selectedPeriod, setSelectedPeriod] = useState("3m");

  //gameType(backend) and selectedPeriod(frontend) is same thing

  const [timeRemaining, setTimeRemaining] = useState();
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

  //currentPeriod(frontend) and round(backend) is same thing
  const [currentPeriod, setCurrentPeriod] = useState("");

  const [balance, setBalance] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showBetPopup, setShowBetPopup] = useState(false);

  const [gamePhase, setGamePhase] = useState();
  const [lastResult, setLastResult] = useState(null);

  // const [userId] = useState(user.userID);

  const selectedPeriodRef = useRef(selectedPeriod);
  useEffect(() => {
    selectedPeriodRef.current = selectedPeriod;
  }, [selectedPeriod]);

  useEffect(() => {
    socket.current = io("http://localhost:3001", {
      transports: ["websocket", "polling"],
    });

    // Connection event handlers
    socket.current.on("connect", () => {
      setIsConnected(true);

      // Request user balance on connection
      getUserBalance();
    });

    socket.current.on("disconnect", () => {
      setIsConnected(false);
    });

    // Game state listeners
    socket.current.on("gameState30s", (state) => {
      //state from backend has the following structure
      // state = {phase, timeRemaining, round, lastResult}

      setGameStates((prev) => ({ ...prev, "30s": state }));
      updateUIFromGameState("30s", state);
    });

    socket.current.on("gameState1m", (state) => {
      //state from backend has the following structure
      // state = {phase, timeRemaining, round, lastResult}

      setGameStates((prev) => ({ ...prev, "1m": state }));
      updateUIFromGameState("1m", state);
    });

    socket.current.on("gameState3m", (state) => {
      //state from backend has the following structure
      // state = {phase, timeRemaining, round, lastResult}

      setGameStates((prev) => ({ ...prev, "3m": state }));
      updateUIFromGameState("3m", state);
    });

    socket.current.on("gameState5m", (state) => {
      //state from backend has the following structure
      // state = {phase, timeRemaining, round, lastResult}

      setGameStates((prev) => ({ ...prev, "5m": state }));
      updateUIFromGameState("5m", state);
    });

    // Timer updates
    socket.current.on("timer", (data) => {
      const { gameType, timeRemaining, phase } = data;

      // Always update gameStates for the correct period
      setGameStates((prev) => ({
        ...prev,
        [gameType]: {
          ...(prev[gameType] || {}),
          phase,
          timeRemaining,
        },
      }));

      // Update only if this is the selected period
      if (gameType === selectedPeriodRef.current) {
        setTimeRemaining(timeRemaining);
        setGamePhase(phase);
      }
    });

    // Game result
    socket.current.on("gameResult", (data) => {
      const { gameType, result, round } = data;

      // update game history via http

      setGameResults((prev) => ({
        ...prev,
        [gameType]: [{ gameType, result, round }, ...prev[gameType]],
      }));

      // If this is the selected period, update phase
      if (gameType === selectedPeriodRef.current) {
        console.log("check");
        setLastResult(result);

        // setGamePhase("result")

        setGamePhase((prevPhase) => {
          if (prevPhase === "result") {
            console.log(
              "Keeping result phase from gameresult, ignoring timer phase:",
              phase
            );
            return prevPhase; // Don't override result phase
          }
          return "betting";
        });
      }
      getUserBalance();
    });

    // New round started
    socket.current.on("newRound", (data) => {
      const { gameType, newState } = data;

      //newState = {phase, timeRemaining, round, lastResult}

      setGameStates((prev) => ({ ...prev, [gameType]: newState }));

      // If this is the selected period, reset UI
      if (gameType === selectedPeriodRef.current) {
        setGamePhase("betting");
        setSelectedBet(null);
        setCurrentBet(null);
        setShowBetPopup(false);
        setCurrentPeriod(newState.round); //currentPeriod == round
        setTimeRemaining(newState.timeRemaining);
      }
    });

    // Bet placed confirmation
    socket.current.on("betPlaced", (data) => {
      console.log(data);
      setCurrentBet({
        gameType: data.gameType,
        displayName: data.bet.displayName,
      });
      setShowBetPopup(false);

      // Update balance after bet
      getUserBalance();
    });

    // User balance
    socket.current.on("userBalance", (data) => {
      setBalance(data.balance);
    });

    // Current bet
    // socket.current.on("currentBet", (data) => {
    //   if (data.bet) {
    //     setCurrentBet(data);
    //   }
    // });

    // Error handling
    socket.current.on("error", (error) => {
      console.error("Socket error:", error);
      alert("Error: " + error.message);
    });

    return () => {
      if (socket.current) {
        socket.current.off();
        socket.current.disconnect();
      }
    };
  }, []);

  //fetches game history via http req

  useEffect(() => {
    fetch(
      `http://localhost:3001/api/game/history?gameType=${selectedPeriod}&limit=${50}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then(async (res) => {
        const history = await res.json();

        if (res.ok) {
          setGameResults((prev) => ({
            ...prev,
            [history[0].gameType]: history,
          }));
        } else {
          return;
        }
      })
      .catch((error) => {
        console.error("Error fetching game history:", error);
      });
  }, [selectedPeriod]);

  // Update UI when selected period changes
  useEffect(() => {
    const currentGameState = gameStates[selectedPeriod];
    if (currentGameState) {
      updateUIFromGameState(selectedPeriodRef.current, currentGameState);
    }
    // Get current bet for the selected period
    // getCurrentBet();
  }, [selectedPeriod, gameResults]);

  const updateUIFromGameState = (gameType, state) => {
    if (gameType === selectedPeriodRef.current) {
      setTimeRemaining(state.timeRemaining);
      setGamePhase(state.phase);
      setCurrentPeriod(state.round); //current period === round
      // setLastResult(state.lastResult); //this causing second lasresult in lastresult
    }
  };

  const getUserBalance = () => {
    if (socket.current && socket.current.connected) {
      socket.current.emit("getUserBalance", {
        userId: user.userId,
      });
    }
  };

  // const getCurrentBet = () => {
  //   if (socket.current && socket.current.connected) {
  //     socket.current.emit("getCurrentBet", {
  //       userId: user.userId,
  //       gameType: selectedPeriod,
  //     });
  //   }
  // };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
    setSelectedBet(null);
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
      userId: user.userId,
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
    } else if (selectedBet.type === "size") {
      betData.bet.size = selectedBet.value;
    }
    socket.current.emit("placeBet", betData);
  };

  const cancelBet = () => {
    setSelectedBet(null);
    setShowBetPopup(false);
  };

  // Mock numbers array for NumberSelection component
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

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
        onSelection={handleSelection} //{type, value, displayName}
      />

      <NumberSelection
        selectedBet={selectedBet}
        gamePhase={gamePhase}
        onSelection={handleSelection} //{type, value, displayName}
        numbers={numbers}
      />

      <SizeSelection
        selectedBet={selectedBet}
        gamePhase={gamePhase}
        onSelection={handleSelection} //{type, value, displayName}
      />

      <GameStatus
        balance={balance}
        onShowHistory={() => setShowHistory(true)}
        selectedBet={selectedBet}
        currentBet={currentBet}
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

      {/* Game Result Dialog */}
      <GameResultDialog
        open={gamePhase === "result"}
        onClose={() => {}} // Prevent manual closing
        lastResult={lastResult}
        selectedPeriod={selectedPeriod}
        currentPeriod={currentPeriod}
        userWon={null} // Set to true/false if you track win/loss
        winAmount={0}
      />
    </Container>
  );
};

export default Game;
