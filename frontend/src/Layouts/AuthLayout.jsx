import { Box } from "@mui/material";
import { tokens, useMode } from "../Theme";
import { Outlet } from "react-router-dom";
import AuthHero from "../components/AuthHero";

const AuthLayout = () => {
  const [theme] = useMode(); // Ensure useMode returns the correct theme
  const colors = tokens(theme.palette.mode); // Make sure tokens function is defined properly

  return (
    <Box display="flex">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor={colors.blueAccent[900]}
        width="50vw"
        height="100vh"
      >
        <Outlet /> {/* This will render the child routes */}
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <AuthHero />
      </Box>
    </Box>
  );
};

export default AuthLayout;
