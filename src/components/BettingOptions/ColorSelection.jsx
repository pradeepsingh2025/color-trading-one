import React from 'react';
import { Stack } from '@mui/material';
import { ColorButton } from '../styled/StyledComponents';

const ColorSelection = ({ selectedBet, gamePhase, onSelection }) => {
  const colors = ['green', 'violet', 'red'];

  return (
    <Stack direction="row" spacing={1} mb={2}>
      {colors.map((color) => (
        <ColorButton
          key={color}
          fullWidth
          variant="contained"
          color={color}
          selected={selectedBet?.type === 'color' && selectedBet?.value === color}
          disabled={gamePhase !== 'betting'}
          onClick={() => onSelection('color', color, color.charAt(0).toUpperCase() + color.slice(1))}
        >
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </ColorButton>
      ))}
    </Stack>
  );
};

export default ColorSelection;