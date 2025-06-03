import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Stack
} from '@mui/material';
import { NavLink } from 'react-router';
import {
  Headphones
} from '@mui/icons-material';

// Custom Telegram Logo Component
const TelegramLogo = ({ sx = {} }) => (
  <Box
    component="svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    sx={sx}
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121L9.864 13.17l-2.91-.918c-.64-.203-.658-.64.135-.954L19.702 7.21c.538-.196 1.006.128.192.011z"/>
  </Box>
);

// 18+ Icon Component
const AgeRestrictionIcon = ({ sx = {} }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 24,
      height: 24,
      bgcolor: '#FE7743',
      color: 'white',
      borderRadius: '50%',
      fontSize: '14px',
      fontWeight: 'bold',
      ...sx
    }}
  >
    18+
  </Box>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#2A4759',
        color: 'white',
        py: 2
      }}
    >
      <Container maxWidth="lg">
        {/* Warning Instructions */}
        <Box sx={{ mb: 2, textAlign: 'center' }}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center" sx={{ mb: 1 }}>
            <AgeRestrictionIcon />
            <Typography variant="caption" sx={{ color: '#ff5722', fontWeight: 'bold' }}>
              RESPONSIBLE GAMING
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 0.5, sm: 2 }} justifyContent="center">
            <Typography variant="caption" sx={{ color: '#ffa726' }}>
              • Gambling can be addictive - Play responsibly
            </Typography>
            <Typography variant="caption" sx={{ color: '#ffa726' }}>
              • Set limits and stick to them
            </Typography>
            <Typography variant="caption" sx={{ color: '#ffa726' }}>
              • Never bet more than you can afford to lose
            </Typography>
          </Stack>
        </Box>

       
          {/* Left side - Links */}
          <Stack 
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-evenly"
          spacing={2}>
           <NavLink
              to='#'
              style={{
                textDecoration: 'none',
                color: 'white',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <TelegramLogo sx={{width: '30px', height: '30px'}}/>
              Support
            </NavLink>
           <NavLink
              to='#'
              style={{
                textDecoration: 'none',
                color: 'white',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Headphones fontSize='large'/>
              Customer service
            </NavLink>
          </Stack>

      </Container>
    </Box>
  );
};

export default Footer;