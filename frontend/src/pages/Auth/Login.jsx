import { Box } from "@mui/material";
import React, { useState } from "react";
import { tokens, useMode } from "../../Theme";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/OutlinedButton";
const Login = () => {
  const [theme] = useMode(); // Ensure useMode returns the correct theme
  const colors = tokens(theme.palette.mode); // Make sure tokens function is defined properly
  const [inputRecieved, setInputRecieved] = useState(false);
  return (
    <Box
      component="div"
      className=" animate-fadeIn"
      display="flex"
      flexDirection="column"
      p={5}
      width="500px"
      minHeight="100px"
      border={`2px solid ${colors.greenAccent[600]} `}
      borderRadius="10px"
      gap={5}
    >
      <Input
        label="Email"
        labelColor={colors.greenAccent[600]}
        labelFont="15px"
        focusedBorderColor={colors.greenAccent[600]}
        hoverBorderColor={colors.greenAccent[600]}
      />
      <Input
        label="Password"
        type="password"
        labelColor={colors.greenAccent[600]}
        labelFont="15px"
        focusedBorderColor={colors.greenAccent[600]}
        hoverBorderColor={colors.greenAccent[600]}
      />
      <Button
        sx={{
          color: inputRecieved ? colors.greenAccent[500] : colors.grey[500],

          borderColor: inputRecieved
            ? colors.greenAccent[500]
            : colors.grey[500],
          "&:hover": {
            backgroundColor: "transparent", // Keep background transparent
            color: inputRecieved ? colors.greenAccent[500] : colors.grey[500],

            borderColor: inputRecieved
              ? colors.greenAccent[500]
              : colors.grey[500], // Keep border color fixed
          },
          p: "10px",
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
