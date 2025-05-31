import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { Close } from '@mui/icons-material';

const HowToPlayDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        How to Play
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <List dense>
          <ListItem>
            <ListItemText primary="• Select your preferred time period (30sec, 1min, 3min, or 5min)" />
          </ListItem>
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
          <ListItem>
            <ListItemText primary="• Note: Time period cannot be changed during result phase" />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default HowToPlayDialog;