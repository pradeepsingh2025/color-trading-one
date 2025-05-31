import React from 'react';
import { Grid } from '@mui/material';
import { NumberButton } from '../styled/StyledComponents';

const NumberSelection = ({ selectedBet, gamePhase, onSelection, numbers }) => {
  return (
    <Grid container spacing={1} mb={2}>
      {numbers.map((number) => (
        <Grid item xs={2.4} key={number}>
          <NumberButton
            fullWidth
            number={number}
            selected={selectedBet?.type === 'number' && selectedBet?.value === number}
            disabled={gamePhase !== 'betting'}
            onClick={() => onSelection('number', number, `Number ${number}`)}
          >
            {number}
          </NumberButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default NumberSelection;