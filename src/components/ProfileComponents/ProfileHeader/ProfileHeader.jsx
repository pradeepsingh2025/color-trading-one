import React, { useState } from 'react';
import {
    Card,
    CardContent,
    Avatar,
    Typography,
    Box,
    Chip,
    IconButton,
    Fade,
    useTheme
} from '@mui/material';
import {
    ContentCopy,
    AccessTime
} from '@mui/icons-material';

const ProfileHeader = ({
    username = "MEMBERNNGGN9NP",
    uid = "2721518",
    avatarUrl = "https://via.placeholder.com/80x80",
    lastLogin = "2025-06-03 01:14:09"
}) => {
    const [copied, setCopied] = useState(false);
    const theme = useTheme();

    const handleCopyUID = () => {
        navigator.clipboard.writeText(uid);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
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
                        src={avatarUrl}
                        sx={{
                            width: 64,
                            height: 64,
                            border: '3px solid rgba(255,255,255,0.2)',
                            boxShadow: theme.shadows[4]
                        }}
                    />
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 500, mb: 1, fontSize: '0.875rem' }}>
                            {username}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                            <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                UID: {uid}
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
                                Last login: {lastLogin}
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
    );
};

export default ProfileHeader;