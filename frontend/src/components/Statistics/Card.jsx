import { Box, Typography } from "@mui/material";
import React from "react";
import { tokens, useMode } from "../../theme";

const Card = ({ header, amount, textColor }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1}
      bgcolor={colors.primary[600]}
      p={2}
      borderRadius={3}
    >
      <Typography variant="h3" color={colors.greenAccent[500]}>
        {header}
      </Typography>
      <Typography variant="p" color={textColor} fontSize="30px">
        {amount}
        <Box component="span">$</Box>
      </Typography>
    </Box>
  );
};

export default Card;
