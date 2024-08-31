import { Box } from "@mui/material";
import { tokens, useMode } from "../Theme";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  const [theme] = useMode(); // Ensure useMode returns the correct theme
  const colors = tokens(theme.palette.mode); // Make sure tokens function is defined properly

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor={colors.blueAccent[900]}
      width={900}
      height={900}
    >
      <Outlet /> {/* This will render the child routes */}
    </Box>
  );
};

export default AuthLayout;
