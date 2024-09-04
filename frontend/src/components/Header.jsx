import { Box, Typography } from "@mui/material";
import React from "react";
import { tokens, useMode } from "../Theme";
import OutlinedButton from "./UI/OutlinedButton";
import DatePicker from "./UI/DatePicker";
import BasicDatePicker from "./UI/DatePicker";

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
          <BasicDatePicker onDateChangeHandler={(e)=>console.log(e)} />
          <BasicDatePicker onDateChangeHandler={(e)=>console.log(e)}/>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
