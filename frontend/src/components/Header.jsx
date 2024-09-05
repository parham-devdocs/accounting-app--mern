import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { tokens, useMode } from "../Theme";
import OutlinedButton from "./UI/OutlinedButton";
import BasicDatePicker from "./UI/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../components/UI/Button";
const Header = ({
  title,
  subtitle,
  btnHoverColor,
  btnColor,
  btnText,
  onShowModalHandler,
  ...props
}) => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [dates, setDates] = useState({
    startDate: "",
    endDate: "",
  });
  const mobileMode = useMediaQuery("(max-width:1000px)");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography color={colors.greenAccent[500]} variant="h3">
          {title}
        </Typography>

        <OutlinedButton
          hovercolor={colors.greenAccent[600]}
          color={colors.greenAccent[500]}
          onClick={onShowModalHandler}
          {...props}
        >
          {btnText}
        </OutlinedButton>
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography color={colors.greenAccent[500]} variant="h3">
          {subtitle}
        </Typography>

        {mobileMode ? (
          <Box display="flex" gap={3} alignItems="center">
            {" "}
            <BasicDatePicker
              label="start date"
              onDateChangeHandler={(e) =>
                setDates((prev) => ({ ...prev, startDate: e.$d }))
              }
            />
            <BasicDatePicker
              label="end date"
              onDateChangeHandler={(e) =>
                setDates((prev) => ({ ...prev, endDate: e.$d }))
              }
            />
            <Button
              color={colors.greenAccent[500]}
              bgColor={colors.primary[500]}
              hoverBgColor={colors.greenAccent[200]}
              borderColor={colors.greenAccent[500]}
              borderRadius="9px"
              hovercolor={colors.primary[500]}
              onClick={() => console.log(dates)}
            >
              {" "}
              <Typography variant="h6">
                <SearchIcon />
              </Typography>
            </Button>
          </Box>
        ) : (
          <>
            <OutlinedButton
              color={colors.greenAccent[500]}
              hovercolor={colors.greenAccent[600]}
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              pick the period
            </OutlinedButton>
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
              <MenuItem
                disableRipple
                sx={{ ":hover": { bgcolor: "transparent" } }}
              >
                <BasicDatePicker
                  label="start date"
                  onDateChangeHandler={(e) =>
                    setDates((prev) => ({ ...prev, startDate: e.$d }))
                  }
                />
              </MenuItem>
              <MenuItem
                disableRipple
                sx={{ ":hover": { bgcolor: "transparent" } }}
              >
                <BasicDatePicker
                  label="end date"
                  onDateChangeHandler={(e) =>
                    setDates((prev) => ({ ...prev, endDate: e.$d }))
                  }
                />
              </MenuItem>
              <Box
                sx={{
                  marginY: "10px",
                  paddingX: "1rem",
                  display: "flex",
                  justifyContent: "end",
                }}
              >
                <Button
                  color={colors.greenAccent[500]}
                  bgColor={colors.primary[500]}
                  hoverBgColor={colors.greenAccent[200]}
                  borderColor={colors.greenAccent[500]}
                  borderRadius="9px"
                  hovercolor={colors.primary[500]}
                  onClick={() => console.log(dates)}
                  // sx={{marginTop:"10px"}}
                >
                  {" "}
                  <Typography variant="h6">Explore</Typography>
                </Button>
              </Box>
            </Menu>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
