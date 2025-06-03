import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  Chip,
  IconButton,
  Fade,
  Grid,
  Paper,
  useTheme,
  alpha,
  Divider
} from '@mui/material';
import {
  AccountBalanceWallet,
  Download,
  Upload,
  Visibility,
  VisibilityOff,
  ContentCopy,
  AccessTime,
  SportsEsports,
  Receipt,
  Notifications,
  ChevronRight
} from '@mui/icons-material';

const ProfileDashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  const handleCopyUID = () => {
    navigator.clipboard.writeText('2721518');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  const menuItems = [
    {
      title: 'Game History',
      subtitle: 'My game history',
      icon: <SportsEsports />,
      color: '#2196f3',
      bgColor: alpha('#2196f3', 0.1)
    },
    {
      title: 'Transaction',
      subtitle: 'My transaction history',
      icon: <Receipt />,
      color: '#4caf50',
      bgColor: alpha('#4caf50', 0.1)
    },
    {
      title: 'Deposit',
      subtitle: 'My deposit history',
      icon: <Download />,
      color: '#f44336',
      bgColor: alpha('#f44336', 0.1)
    },
    {
      title: 'Withdraw',
      subtitle: 'My withdraw history',
      icon: <Upload />,
      color: '#ff9800',
      bgColor: alpha('#ff9800', 0.1)
    }
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        
        {/* Profile Header Card */}
        <Card 
          elevation={3}
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            position: 'relative',
            overflow: 'visible'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src="https://via.placeholder.com/80x80"
                sx={{ 
                  width: 64, 
                  height: 64,
                  border: '3px solid rgba(255,255,255,0.2)',
                  boxShadow: theme.shadows[4]
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 500, mb: 1 }}>
                  MEMBERNNGGN9NP
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    UID: 2721518
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={handleCopyUID}
                    sx={{ 
                      color: 'white', 
                      opacity: 0.8,
                      '&:hover': { 
                        opacity: 1,
                        backgroundColor: 'rgba(255,255,255,0.1)'
                      }
                    }}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccessTime fontSize="small" sx={{ opacity: 0.8 }} />
                  <Typography variant="body2" sx={{ opacity: 0.9 }}>
                    Last login: 2025-06-03 01:14:09
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Fade in={copied}>
              <Chip
                label="UID Copied!"
                size="small"
                sx={{ 
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  display: copied ? 'flex' : 'none'
                }}
              />
            </Fade>
          </CardContent>
        </Card>
         {/* Notification Section */}
        <Card 
          elevation={1}
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

        {/* Wallet Balance Card */}
        <Card elevation={2} sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceWallet sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 500 }}>
                  Wallet Balance
                </Typography>
              </Box>
              <IconButton onClick={toggleBalanceVisibility} size="small">
                {showBalance ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </Box>
            
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px'
              }}
            >
              {showBalance ? '₹0.66' : '₹***'}
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                  boxShadow: theme.shadows[3],
                  '&:hover': {
                    background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                    boxShadow: theme.shadows[6],
                  }
                }}
              >
                Deposit
              </Button>
              <Button
                variant="outlined"
                startIcon={<Upload />}
                fullWidth
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 500,
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2
                  }
                }}
              >
                Withdraw
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Paper 
              elevation={1}
              sx={{ 
                p: 2, 
                borderRadius: 2,
                textAlign: 'center',
                transition: 'all 0.2s',
                '&:hover': {
                  elevation: 3,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main', mb: 0.5 }}>
                0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Deposits
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper 
              elevation={1}
              sx={{ 
                p: 2, 
                borderRadius: 2,
                textAlign: 'center',
                transition: 'all 0.2s',
                '&:hover': {
                  elevation: 3,
                  transform: 'translateY(-2px)'
                }
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main', mb: 0.5 }}>
                0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Withdrawals
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Menu Sections */}
        <Grid container spacing={2}>
          {menuItems.map((item, index) => (
            <Grid item xs={6} key={index}>
              <Card 
                elevation={1}
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
                      {React.cloneElement(item.icon, { fontSize: 'small' })}
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {item.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                        {item.subtitle}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default ProfileDashboard;