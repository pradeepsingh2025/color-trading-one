import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { GAME_PERIODS } from '../../constants/GameConstants';

const HistoryDialog = ({ open, onClose, selectedPeriod, gameResults }) => {
  const currentPeriodData = GAME_PERIODS[selectedPeriod];
  const currentResults = gameResults[selectedPeriod];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        Game History - {currentPeriodData.label}, {currentPeriodData.sublabel}
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List>
          {currentResults.map((result, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    fontSize: '0.875rem',
                    fontWeight: 'bold',
                    bgcolor: result.result.color === 'green' ? 'success.main' :
                            result.result.color === 'violet' ? 'secondary.main' : 'error.main'
                  }}
                >
                  {result.result.number}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={`Number: ${result.result.number} | Color: ${result.result.color} | Size: ${result.result.size}`}
                secondary={`Round: ${result.round}`}
              />
            </ListItem>
          ))}
          {currentResults.length === 0 && (
            <ListItem>
              <ListItemText primary="No game history available for this time period" />
            </ListItem>
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default HistoryDialog;