import React from 'react';
import {
  Card,
  CardContent,
  Button,
  Box
} from '@mui/material';
import {
  ExitToApp
} from '@mui/icons-material';

const LogoutButton = ({ onLogout }) => {
  return (
    <Card 
      elevation={1}
      sx={{ 
        borderRadius: 2,
        border: '1px solid #f44336',
        backgroundColor: 'rgba(244, 67, 54, 0.05)'
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Button
          variant="outlined"
          color="error"
          fullWidth
          startIcon={<ExitToApp />}
          onClick={onLogout}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 500,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
              backgroundColor: 'rgba(244, 67, 54, 0.08)'
            }
          }}
        >
          Logout
        </Button>
      </CardContent>
    </Card>
  );
};

export default LogoutButton;