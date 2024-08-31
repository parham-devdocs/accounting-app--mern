import { tokens, useMode } from "../Theme";
import { Box, Typography } from "@mui/material";
import TypeEffect from "./UI/TypeEffect.jsx";
const list =[
          "User-friendly interface ",
          "Real time financial tracking",
          "Automated Reports",
          "Secure Data Protection",
          "Expense Management",
          "Customer Support",
        ]
const AuthHero = () => {
  const [theme] = useMode(); // Ensure useMode returns the correct theme
  const colors = tokens(theme.palette.mode); // Make sure tokens function is defined properly

  return (
    <Box
      bgcolor={colors.primary[700]}
      display="flex"
      width="50vw"
      height="100vh"
      p={10}
      flexDirection="column"
      gap={2}
    >
      <Typography
        variant="h2"
        color={colors.greenAccent[500]}
        className=" animate-fadeIn"
      >
        Simplify Your Finances
      </Typography>
      <TypeEffect
     list={list}
      />
    </Box>
  );
};

export default AuthHero;
