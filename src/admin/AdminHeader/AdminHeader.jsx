import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Dashboard, Refresh } from "@mui/icons-material";

const AdminHeader = ({ onRefresh }) => {
  return (
    <AppBar position="static" sx={{ background: 'grey'}}>
      <Toolbar>
        <Dashboard sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          68LOTTERY - Admin Dashboard
        </Typography>
        <IconButton color="inherit" onClick={onRefresh}>
          <Refresh />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;
