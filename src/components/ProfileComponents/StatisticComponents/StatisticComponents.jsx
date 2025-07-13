import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const QuickStats = ({ totalBets, totalWins }) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Card
        elevation={1}
        sx={{
          flex: 1,
          borderRadius: 2,
          transition: "all 0.2s",
          "&:hover": {
            elevation: 3,
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent sx={{ p: 2, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "primary.main", mb: 0.5 }}
          >
            {totalBets}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Bets
          </Typography>
        </CardContent>
      </Card>

      <Card
        elevation={1}
        sx={{
          flex: 1,
          borderRadius: 2,
          transition: "all 0.2s",
          "&:hover": {
            elevation: 3,
            transform: "translateY(-2px)",
          },
        }}
      >
        <CardContent sx={{ p: 2, textAlign: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: "secondary.main", mb: 0.5 }}
          >
            {totalWins}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Total Wins
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuickStats;
