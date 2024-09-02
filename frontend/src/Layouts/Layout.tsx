import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Box, Button } from "@mui/material";
import { tokens, useMode } from "../Theme";
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import OutlinedButton from './../components/UI/OutlinedButton';

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
