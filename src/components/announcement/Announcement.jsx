import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

export default function AnnouncementSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#2A4759',
        maxWidth: "600px",
        width: '80%',
        padding: '12px 16px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '16px auto',
        gap: '12px'
      }}
    >
      {/* Speaker Icon */}
      <VolumeUpIcon 
        sx={{ 
          color: 'white',
          fontSize: '24px',
          flexShrink: 0
        }} 
      />
      
      {/* Announcement Text */}
      <Typography
        variant="body2"
        sx={{
          flex: 1,
          color: 'white',
          fontSize: '14px',
          lineHeight: 1
        }}
      >
        Welcome to 68lottery game platform, we will serve you wholeheartedly!
      </Typography>
     
    </Box>
  );
}