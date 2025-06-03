import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  alpha
} from '@mui/material';
import {
  SportsEsports,
  Receipt,
  Download,
  Upload
} from '@mui/icons-material';

const Histories = ({ onMenuItemClick }) => {
  const menuItems = [
    {
      title: 'Game History',
      subtitle: 'My game history',
      icon: <SportsEsports />,
      color: '#2196f3',
      bgColor: alpha('#2196f3', 0.1),
      id: 'game-history'
    },
    {
      title: 'Transaction',
      subtitle: 'My transaction history',
      icon: <Receipt />,
      color: '#4caf50',
      bgColor: alpha('#4caf50', 0.1),
      id: 'transaction'
    },
    {
      title: 'Deposit',
      subtitle: 'My deposit history',
      icon: <Download />,
      color: '#f44336',
      bgColor: alpha('#f44336', 0.1),
      id: 'deposit'
    },
    {
      title: 'Withdraw',
      subtitle: 'My withdraw history',
      icon: <Upload />,
      color: '#ff9800',
      bgColor: alpha('#ff9800', 0.1),
      id: 'withdraw'
    }
  ];

  const handleItemClick = (item) => {
    if (onMenuItemClick) {
      onMenuItemClick(item);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* First Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {menuItems.slice(0, 2).map((item, index) => (
          <Card 
            key={index}
            elevation={1}
            onClick={() => handleItemClick(item)}
            sx={{ 
              flex: 1,
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box 
                  sx={{ 
                    p: 1,
                    borderRadius: 1.5,
                    backgroundColor: item.bgColor,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {React.cloneElement(item.icon, { fontSize: 'medium' })}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.80rem' }}>
                    {item.subtitle}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      
      {/* Second Row */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {menuItems.slice(2, 4).map((item, index) => (
          <Card 
            key={index + 2}
            elevation={1}
            onClick={() => handleItemClick(item)}
            sx={{ 
              flex: 1,
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box 
                  sx={{ 
                    p: 1,
                    borderRadius: 1.5,
                    backgroundColor: item.bgColor,
                    color: item.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {React.cloneElement(item.icon, { fontSize: 'medium' })}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.2 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.80rem' }}>
                    {item.subtitle}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Histories;