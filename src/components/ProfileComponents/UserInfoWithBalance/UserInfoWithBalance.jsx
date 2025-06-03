import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Box,
  Container,
  Paper,
  Chip,
  IconButton,
  Fade,
  useTheme,
  alpha
} from '@mui/material';
import {
  AccountBalanceWallet,
  Download,
  Upload,
  Visibility,
  VisibilityOff,
  ContentCopy,
  AccessTime
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

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {/* Profile Header Card */}
        <Card 
          elevation={0}
          sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            borderRadius: 3,
            overflow: 'visible'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Avatar
                src="/api/placeholder/80/80"
                sx={{ 
                  width: 64, 
                  height: 64,
                  border: '3px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
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
                      '&:hover': { opacity: 1 }
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
            
            {copied && (
              <Fade in={copied}>
                <Chip
                  label="UID Copied!"
                  size="small"
                  sx={{ 
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: 'white'
                  }}
                />
              </Fade>
            )}
          </CardContent>
        </Card>

        {/* Wallet Balance Card */}
        <Card 
          elevation={0}
          sx={{ 
            borderRadius: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <AccountBalanceWallet sx={{ color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
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
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                  boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #388e3c, #4caf50)',
                    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.4)',
                  }
                }}
              >
                Deposit
              </Button>
              <Button
                variant="outlined"
                startIcon={<Upload />}
                sx={{
                  flex: 1,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  borderWidth: 2,
                  '&:hover': {
                    borderWidth: 2,
                    background: alpha(theme.palette.primary.main, 0.04),
                  }
                }}
              >
                Withdraw
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Deposits
            </Typography>
          </Paper>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              borderRadius: 2,
              border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              textAlign: 'center'
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
              0
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Withdrawals
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileDashboard;