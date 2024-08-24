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
  ...props
}) => {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      sx={{
        backgroundColor: { bgColor },
        transition: "all",
        transitionTimingFunction: "ease-in-out",
        transitionDuration: 500,
        color: { color },
        height: "2rem",
        borderRadius: { borderRadius },
        border:  `1px solid ${borderColor}`, // No border if disabled
        "&:hover": {
          backgroundColor: "white", // Keep background transparent
          color: hovercolor,
          borderColor: hovercolor, // Keep border color fixed
        },
      }}
      {...props} // Spread other props
    >
      <Typography>{children}</Typography>
    </Button>
  );
};

export default Btn;
