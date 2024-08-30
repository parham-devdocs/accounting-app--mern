import { Box, Typography } from "@mui/material";
import React from "react";
import { tokens, useMode } from "../Theme";
import OutlinedButton from './UI/OutlinedButton';

const Header = ({title,subtitle,btnHoverColor,btnColor,btnText,onShowModalHandler,...props}) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

    return (
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" flexDirection="column" gap="1rem">
          <Typography color={colors.greenAccent[500]} variant="h3">
            {title}
          </Typography>
          <Typography color={colors.greenAccent[500]} variant="h5">
            {subtitle}
          </Typography>
            </Box>
            <OutlinedButton hovercolor={btnHoverColor} color={btnColor} onClick={onShowModalHandler} {...props} >{btnText }</OutlinedButton>
      </Box>
    );
};

export default Header;
