import { Button, Typography } from "@mui/material";
import React from "react";

const OutlinedButton = ({ children, color, hovercolor,...props }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        color,
        height: "2rem",

        borderColor: color,
        "&:hover": {
          backgroundColor: "transparent", // Keep background transparent
          color: hovercolor,

          borderColor: hovercolor, // Keep border color fixed
        },
      }}
    >
      <Typography>{children}</Typography>
    </Button>
  );
};

export default OutlinedButton;
