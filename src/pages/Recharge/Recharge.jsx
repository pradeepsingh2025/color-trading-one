import React from 'react'
import { Container, Box } from '@mui/material';
import WalletBalance from '../../components/ProfileComponents/WalletBalance/WalletBalance'

const Recharge = ({ balance = '₹0.66' }) => {


  const handleDeposit = () => {
    console.log("deposition")
  }
  const handleWithdraw = () => {
    console.log("deposition")
  }
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, justifyItems: 'center' }}>
        <WalletBalance
          balance={balance}
          onDeposit={handleDeposit}
          onWithdraw={handleWithdraw}
        />
      </Box>
    </Container>
  )
}

export default Recharge