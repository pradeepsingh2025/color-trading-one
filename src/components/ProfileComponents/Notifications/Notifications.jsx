import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  alpha
} from '@mui/material';
import {
  Notifications,
  ChevronRight
} from '@mui/icons-material';

const NotificationCard = ({ onClick }) => {
  return (
    <Card 
      elevation={1}
      onClick={onClick}
      sx={{ 
        borderRadius: 2,
        cursor: 'pointer',
        transition: 'all 0.2s',
        '&:hover': {
          elevation: 4,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box 
              sx={{ 
                p: 1,
                borderRadius: 1.5,
                backgroundColor: alpha('#9c27b0', 0.1),
                color: '#9c27b0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Notifications fontSize="small" />
            </Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
              Notification
            </Typography>
          </Box>
          <ChevronRight sx={{ color: 'text.secondary' }} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;