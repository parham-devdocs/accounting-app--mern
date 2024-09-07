import { Box } from '@mui/material'
import React from 'react'
import Card from '../components/Statistics/Card'
import { tokens, useMode } from '../Theme';

const FinancialGoals = () => {
      const [theme] = useMode();
    const colors = tokens(theme.palette.mode);
    
  return (
      <Box display="flex" justifyContent="center" alignItems="center">
         <Box bgcolor={colors.blueAccent[900]} minHeight="400px" minWidth="250px" borderRadius={10}></Box>
          
 </Box>
  )
}

export default FinancialGoals
