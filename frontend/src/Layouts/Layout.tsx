import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Box } from "@mui/material";
import { tokens, useMode } from "../Theme";

const Layout = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <div>
      <Navbar />
      <Box display="flex">
        <SideBar />
        <Box flex={1} bgcolor={colors.primary[400]} p={2} overflow="hidden">
          {" "}
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default Layout;
