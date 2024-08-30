import { Button, Typography } from "@mui/material";
import React from "react";

const OutlinedButton = ({ children, color, hovercolor,type="button",...props }) => {
  return (
    <Button
      variant="outlined"
      type={type}
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
      {...props}
    >
      <Typography>{children}</Typography>
    </Button>
  );
};

export default OutlinedButton;
