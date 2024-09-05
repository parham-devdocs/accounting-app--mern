import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Box } from "@mui/material";
import { tokens, useMode } from "../Theme";

const DashboardLayout = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Navbar />
      <Box display="flex" sx={{ width: "100%" }}>
        {" "}
        {/* Adjust height based on Navbar height */}
        <SideBar />
        <Box
          flex={1}
          bgcolor={colors.primary[400]}
          p={2}
         overflow="hidden"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
