import React from "react";
import { Container, Box } from "@mui/material";
import ProfileHeader from "../../components/ProfileComponents/ProfileHeader/ProfileHeader";
import WalletBalance from "../../components/ProfileComponents/WalletBalance/WalletBalance";
import QuickStats from "../../components/ProfileComponents/StatisticComponents/StatisticComponents";
import Histories from "../../components/ProfileComponents/DifferentHistories/DifferentHistories";
import NotificationCard from "../../components/ProfileComponents/Notifications/Notifications";
import LogoutButton from "../../components/ProfileComponents/LogoutButton/LogoutButton";
import { useUser } from "../../context/UserContext";

import { useNavigate } from "react-router";

const Profile = ({
  // Profile Header Props
  username = "MEMBERNNGGN9NP",
  uid = "2721518",
  avatarUrl = "https://via.placeholder.com/80x80",
  lastLogin = "2025-06-03 01:14:09",

  // Wallet Props
  balance = "₹0.66",

  // Stats Props
  totalDeposits = 0,
  totalWithdrawals = 0,

  // Event Handlers
  onDeposit,
  onWithdraw,
  onMenuItemClick,
  onNotificationClick,
}) => {
  const navigate = useNavigate();
  const user = useUser();
  console.log("user data from profile component", user);

  const handleDeposit = () => {
    if (onDeposit) onDeposit();
  };

  const handleWithdraw = () => {
    if (onWithdraw) onWithdraw();
  };

  const handleMenuItemClick = (item) => {
    if (onMenuItemClick) onMenuItemClick(item);
  };

  const handleNotificationClick = () => {
    if (onNotificationClick) onNotificationClick();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          justifyItems: "center",
        }}
      >
        {/* Profile Header */}
        <ProfileHeader
          username={username}
          uid={uid}
          avatarUrl={avatarUrl}
          lastLogin={lastLogin}
        />
        {/* Notification Card */}
        <NotificationCard onClick={handleNotificationClick} />

        {/* Wallet Balance */}
        <WalletBalance
          balance={balance}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
        />

        {/* Quick Stats */}
        <QuickStats
          totalDeposits={totalDeposits}
          totalWithdrawals={totalWithdrawals}
        />

        {/* Menu Grid */}
        <Histories onMenuItemClick={handleMenuItemClick} />

        <LogoutButton onLogout={handleLogout} />
      </Box>
    </Container>
  );
};

export default Profile;
