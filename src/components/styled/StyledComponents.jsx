import { styled } from '@mui/material/styles';
import { Card, Button, Box, Avatar } from '@mui/material';

export const GameCard = styled(Card)(({ theme, active }) => ({
  minWidth: '24%',
  cursor: 'pointer',
  textAlign: 'center',
  backgroundColor: active ? '#F79B72' : theme.palette.grey[100],
  color: active ? 'white' : 'inherit',
  '&:hover': {
    backgroundColor: active ? '#FF9149' : theme.palette.grey[200],
  }
}));

export const ColorButton = styled(Button)(({ theme, color: colorName, selected }) => {
  const colors = {
    green: theme.palette.success.main,
    violet: theme.palette.secondary.main,
    red: theme.palette.error.main
  };
  
  return {
    backgroundColor: selected ? colors[colorName] : 'white',
    color: selected ? 'white' : colors[colorName],
    border: `5px solid ${colors[colorName]}`,
    '&:hover': {
      backgroundColor: selected ? colors[colorName] : `${colors[colorName]}10`,
    }
  };
});

export const NumberButton = styled(Button)(({ theme, number, selected }) => {
  const getColor = (num) => {
    if ([1, 3, 7, 9].includes(num)) return theme.palette.success.main;
    if ([0, 5].includes(num)) return theme.palette.secondary.main;
    return theme.palette.error.main;
  };
  
  const color = getColor(number);
  
  return {
    minWidth: 0,
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: selected ? color : 'white',
    color: selected ? 'white' : color,
    border: `8px solid ${color}`,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: selected ? color : `${color}10`,
    }
  };
});

export const SizeButton = styled(Button)(({ theme, size, selected }) => {
  const colors = {
    big: theme.palette.warning.main,
    small: theme.palette.info.main
  };
  
  const color = colors[size];
  
  return {
    backgroundColor: selected ? color : 'white',
    color: selected ? 'white' : color,
    border: `5px solid ${color}`,
    '&:hover': {
      backgroundColor: selected ? color : `${color}10`,
    }
  };
});

export const TimerBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#2A4759',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

export const ResultCircle = styled(Avatar)(({ theme, color }) => {
  const colors = {
    green: theme.palette.success.main,
    violet: theme.palette.secondary.main,
    red: theme.palette.error.main
  };
  
  return {
    backgroundColor: colors[color],
    width: 64,
    height: 64,
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };
});