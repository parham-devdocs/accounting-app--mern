import { Button, Typography } from "@mui/material";
import React from "react";
import  KeyboardDoubleArrowRightIcon  from '@mui/icons-material/KeyboardDoubleArrowRight';

const OutlinedButton = ({
  children,
  color,
  hovercolor,
  type = "button",
  endIcon,
  startIcon,
  ...props
}) => {
  return (
    <Button
      
      variant="outlined"
      type={type}
      sx={{
        ...props,
        color,
        height: "2rem",

        borderColor: color,
        "&:hover": {
          backgroundColor: "transparent", // Keep background transparent
          color: hovercolor,

          borderColor: hovercolor, // Keep border color fixed
        },
      }}
      endIcon={endIcon}
    startIcon={startIcon}
      {...props}
    >
      <Typography>{children}</Typography>
    </Button>
  );
};

export default OutlinedButton;
