import React from "react";
import { Paper, Typography, Stack, Button } from "@mui/material";
import { History } from "@mui/icons-material";
import { ResultCircle } from "../styled/StyledComponents";
import { GAME_PERIODS } from "../../constants/GameConstants";

const GameStatus = ({
  balance,
  onShowHistory,
  currentBet,
  selectedPeriod,
  gamePhase,
}) => {
  const currentPeriodData = GAME_PERIODS[selectedPeriod];

  return (
    <>
      {/* Period Change Notice */}
      {gamePhase === "result" && (
        <Paper
          sx={{ p: 2, mb: 2, bgcolor: "warning.light", textAlign: "center" }}
        >
          <Typography variant="body2">
            Game period cannot be changed during result phase
          </Typography>
        </Paper>
      )}

      {/* Balance and Actions */}
      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
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

      {/* Current bet display */}
      {currentBet?.gameType && (
        <Paper sx={{ p: 2, mb: 2, borderLeft: 4, borderColor: "primary.main" }}>
          <Typography variant="body2" color="text.secondary">
            Current Selection | Win Go {currentBet.gameType}:
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {currentBet.displayName}
          </Typography>
        </Paper>
      )}
    </>
  );
};

export default GameStatus;
