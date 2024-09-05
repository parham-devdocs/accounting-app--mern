import { Button, Typography } from "@mui/material";
import React from "react";

const Btn = ({
  children,
  color,
  hovercolor,
  bgColor,
  borderRadius,
  borderColor,
  disabled,
  hoverBgColor,
  ...props
}) => {
  return (
    <Button
      
      variant="contained"
      disabled={disabled}
      sx={{
        
        backgroundColor: bgColor,
        transition:
          "background-color 400ms ease-in-out, color 400ms ease-in-out, border-color 400ms ease-in-out",
        color: color,
        height: "2rem",
        borderRadius: borderRadius,
        border: `1px solid ${borderColor}`,
        "&:hover": {
          backgroundColor: hoverBgColor,
          color: hovercolor,
          borderColor: hovercolor,
        },
        ...(disabled && {
          border: "none", // Optional: No border if disabled
          backgroundColor: "lightgray", // Optional: Change background if disabled
        }),
      }}
      {...props} // Spread other props
    >
      <Typography>{children}</Typography>
    </Button>
  );
};

export default Btn;
