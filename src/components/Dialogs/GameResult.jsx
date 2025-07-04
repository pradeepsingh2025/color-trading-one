import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Slide,
  IconButton,
} from "@mui/material";
import { Close, TrendingUp, TrendingDown } from "@mui/icons-material";
import { ResultCircle } from "../styled/StyledComponents";
import { GAME_PERIODS } from "../../constants/GameConstants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GameResultDialog = ({
  open,
  onClose,
  lastResult,
  selectedPeriod,
  currentPeriod,
  userWon = null, // null, true, or false
  winAmount = 0,
}) => {
  const currentPeriodData = GAME_PERIODS[selectedPeriod];

  const getResultColor = (color) => {
    switch (color?.toLowerCase()) {
      case "red":
        return "#f44336";
      case "green":
        return "#4caf50";
      case "violet":
        return "#9c27b0";
      default:
        return "#666";
    }
  };

  const getResultSize = (number) => {
    return number >= 5 ? "Big" : "Small";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1, position: "relative" }}>
        <Typography variant="h6" component="div" textAlign="center" fontWeight="bold">
          🎯 Game Result
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {currentPeriodData?.label} {currentPeriodData?.sublabel} • Period {currentPeriod}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.500",
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ textAlign: "center", py: 3 }}>
        {lastResult ? (
          <Box>
            {/* Result Circle */}
            <Box sx={{ mb: 3 }}>
              <ResultCircle
                color={lastResult.color}
                sx={{
                  width: 80,
                  height: 80,
                  fontSize: "2rem",
                  fontWeight: "bold",
                  mx: "auto",
                  boxShadow: 3,
                  border: `4px solid ${getResultColor(lastResult.color)}`,
                }}
              >
                {lastResult.number}
              </ResultCircle>
            </Box>

            {/* Result Details */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
                {lastResult.number}
              </Typography>
              
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 2 }}>
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: getResultColor(lastResult.color),
                    color: "white",
                    minWidth: 60,
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {lastResult.color}
                  </Typography>
                </Box>
                
                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: lastResult.number >= 5 ? "success.main" : "warning.main",
                    color: "white",
                    minWidth: 60,
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {getResultSize(lastResult.number)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Win/Loss Status */}
            {userWon !== null && (
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  bgcolor: userWon ? "success.light" : "error.light",
                  color: userWon ? "success.dark" : "error.dark",
                  mb: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}>
                  {userWon ? <TrendingUp /> : <TrendingDown />}
                  <Typography variant="h6" fontWeight="bold">
                    {userWon ? "🎉 You Won!" : "😔 You Lost"}
                  </Typography>
                </Box>
                {userWon && winAmount > 0 && (
                  <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                    +₹{winAmount}
                  </Typography>
                )}
              </Box>
            )}

            {/* Additional Info */}
            <Typography variant="body2" color="text.secondary">
              Next round starting soon...
            </Typography>
          </Box>
        ) : (
          <Box sx={{ py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              Loading result...
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1,
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GameResultDialog;