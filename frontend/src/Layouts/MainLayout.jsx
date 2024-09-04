import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
import { tokens, useMode } from "../Theme";

const MainLayout = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <Navbar />
      <Box display="flex">
        
        <Box flex={1} bgcolor={colors.primary[400]} p={2} overflow="hidden">
          
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default MainLayout;
