import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; // Import Typography for text

import { tokens, useMode } from "../Theme";
import { Button, IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import OutlinedButton from "./UI/OutlinedButton";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
const navigate=useNavigate()
  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100%",
        background: colors.blueAccent[900],
        height: "70px",
        display: "flex", // Use flexbox for centering
        justifyContent: "space-between", // Center horizontally
        alignItems: "center", // Center vertically
        padding: "1rem",
      }}
    >
      <Typography variant="h3" color={colors.blueAccent[400]}>
        accountify
      </Typography>
      <Box display="flex">
        {" "}
        {/* Added gap here */}
        <IconButton size="large" onClick={()=>{colorMode.toggleColorMode()}}>
          <LightModeIcon sx={{ color: colors.blueAccent[400] }} />
        </IconButton>
        <IconButton size="large">
          <NotificationsIcon sx={{ color: colors.blueAccent[400] }} />
        </IconButton>
        <IconButton size="large">
          <HelpIcon sx={{ color: colors.blueAccent[400] }} />
        </IconButton>
        <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <OutlinedButton
            color={colors.blueAccent[400]}
            hovercolor={colors.blueAccent[600]}
            onClick={()=>navigate('/auth/login')}
          >
            Sign In
          </OutlinedButton>
          <OutlinedButton
            color={colors.blueAccent[400]}
            hovercolor={colors.blueAccent[600]}
          >
            Sign Up
          </OutlinedButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
