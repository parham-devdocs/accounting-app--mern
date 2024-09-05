import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
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

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Typography color={colors.greenAccent[500]} variant="h3">
          {title}
        </Typography>

        <OutlinedButton
          hovercolor={btnHoverColor}
          color={btnColor}
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

        <Box display="flex" gap={3}>
          {" "}
          <BasicDatePicker onDateChangeHandler={(e) => console.log(e)} />
          <BasicDatePicker onDateChangeHandler={(e) => console.log(e)} />
          <Button
            color={colors.greenAccent[500]}
            bgColor={colors.primary[500]}
            hoverBgColor={colors.greenAccent[200]}
            borderColor={colors.greenAccent[500]}
            borderRadius="9px"
            hovercolor={colors.primary[500]}
          >
            {" "}
            <Typography variant="h6">
              <SearchIcon />
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
