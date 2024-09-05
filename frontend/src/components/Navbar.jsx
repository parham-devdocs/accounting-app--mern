import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography"; // Import Typography for text

import { tokens, useMode } from "../Theme";
import { IconButton, Tooltip, Menu, MenuItem, Fade, Link } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HelpIcon from "@mui/icons-material/Help";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../redux/reducers/userInfo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Contact us", href: "/contact" },
  { label: "Contribute", href: "/Contribute" },
];
function Navbar() {
  ///////  hooks for theme
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  ////// hook for redirection
  const navigate = useNavigate();

  ////// hook for reading user data from redux store
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const { user } = useSelector((state) => state.user_info);
  /////// hook for dispatching redux store
  const dispatch = useDispatch(user);
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

  const logoutHandler = () => {
    handleClose();
    dispatch(logout());
    navigate("/auth/login");
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
      <Typography
        variant="h3"
        color={colors.greenAccent[500]}
        fontFamily="monospace"
        display="flex"
      >
        <Typography color={colors.blueAccent[500]} variant="h3">
          Acc
        </Typography>
        ountify
      </Typography>
      {/* middle part */}
      {!isLoggedin && (
        <Box display="flex" gap={5} >
          {navItems.map((item, index) => {
            return (
              <Link
                underline="none"
                sx={{ cursor: "pointer" }}
                key={index}
                href={item.href}
                className=" animate-fadeIn"
              >
                <Typography
                  variant="h5"
                  fontWeight={500}
                  fontSize={18}
                  color={colors.greenAccent[500]}
                  className=" hover:animate-scale-up"
                >
                  {item.label}
                </Typography>
              </Link>
            );
          })}
        </Box>
      )}
      <Box display="flex">
        {/* Added gap here */}

        <Tooltip
          title={theme.palette.mode === "dark" ? "light" : "dark"}
          placement="top-start"
          TransitionComponent={Fade}
        >
          <IconButton
            size="large"
            onClick={() => {
              colorMode.toggleColorMode();
            }}
          >
            <LightModeIcon sx={{ color: colors.greenAccent[500] }} />
          </IconButton>
        </Tooltip>
        {isLoggedin && (
          <Tooltip
            title="notifications"
            placement="top-start"
            TransitionComponent={Fade}
          >
            <IconButton size="large">
              <NotificationsIcon sx={{ color: colors.greenAccent[500] }} />
            </IconButton>
          </Tooltip>
        )}
        <Tooltip title="FAQ" placement="top-start" TransitionComponent={Fade}>
          <IconButton size="large">
            <HelpIcon sx={{ color: colors.greenAccent[500] }} />
          </IconButton>
        </Tooltip>
        {isLoggedin ? (
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
                  borderColor: colors.blueAccent[500],
                  border: "2px solid", // Adjust the border thickness as needed
                  borderRadius: "50%",
                  height: "100%",
                  width: "30px",
                  backgroundColor: "transparent", // Ensures the background is transparent
                  color: colors.blueAccent[500], // Ensures the text color is white
                }}
                alt="Remy Sharp"
              >
                {Avatar}
              </Box>
            </Box>
            <Menu
              transitionDuration={700}
              sx={{
                "& .MuiMenu-paper": {
                  bgcolor: colors.primary[500],
                  color: colors.greenAccent[500],
                  marginTop: "5px",
                },
              }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={()=>navigate('/dashboard/profile')}>Profile</MenuItem>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <IconButton
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ color: colors.greenAccent[500] }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              transitionDuration={700}
              sx={{
                "& .MuiMenu-paper": {
                  color: colors.blueAccent[500],
                  marginTop: "5px",
                },
              }}
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={() => navigate("/auth/login")}>Login</MenuItem>
              <MenuItem onClick={() => navigate("/auth/register")}>
                Sign up
              </MenuItem>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
