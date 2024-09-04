import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; // Import Typography for text

import { tokens, useMode } from "../Theme";
import { IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import OutlinedButton from "./UI/OutlinedButton";

function Navbar() {
  ///////  hooks for theme
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  ////// hook for redirection
  const navigate = useNavigate();

  ////// hook for reading user data from redux store
  const isLiggedin = useSelector((state) => state.isLoggedin);
  const { user } = useSelector((state) => state.user_info);

  let Avatar = "";
  if (user.profileImage) {
    Avatar = <Box component="img" src={user.profileImage} borderRadius="50%" />;
  } else {
    Avatar = <PersonIcon sx={{ fontSize: "26px" }} />;
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
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
      <Typography variant="h3" color={colors.greenAccent[500]}>
        accountify
      </Typography>
      <Box display="flex">
        {/* Added gap here */}

        <IconButton
          size="large"
          onClick={() => {
            colorMode.toggleColorMode();
          }}
        >
          <LightModeIcon sx={{ color: colors.greenAccent[500] }} />
        </IconButton>
        {isLiggedin ? (
          <IconButton size="large">
            <NotificationsIcon sx={{ color: colors.greenAccent[500] }} />
          </IconButton>
        ) : (
          <IconButton size="large">
            <ChatIcon sx={{ color: colors.greenAccent[500] }} />
          </IconButton>
        )}
        <IconButton size="large">
          <HelpIcon sx={{ color: colors.greenAccent[500] }} />
        </IconButton>

        {!isLiggedin ? (
          <>
            <Box
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ cursor: "pointer" }}
              display="flex"
              gap={1}
              alignItems="center"
              borderRadius={50}
              minWidth={100}
              height={40}
              p="3px"
              border={`2px solid ${colors.greenAccent[500]}`}
              marginTop="auto"
              marginBottom="auto"
            >
              <Typography
                variant="p"
                color={colors.greenAccent[500]}
                fontWeight={600}
                ml={1}
              >
                {user.username}
              </Typography>
              <Box
                sx={{
                  borderColor: colors.greenAccent[500],
                  border: "2px solid", // Adjust the border thickness as needed
                  borderRadius: "50%",
                  height: "100%",
                  width: "30px",
                  backgroundColor: "transparent", // Ensures the background is transparent
                  color: colors.greenAccent[500], // Ensures the text color is white
                }}
                alt="Remy Sharp"
              >
                {Avatar}
              </Box>
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Tooltip title="Add" placement="top-start">
            <IconButton size="large">
              <LogoutIcon sx={{ color: colors.redAccent[500] }} />
            </IconButton>
            </Tooltip>
            
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
