import { Box, Typography } from "@mui/material";
import { tokens, useMode } from "../../theme";

const ChartLayout = ({ children, height, minWidth,header,padding=3, ...props }) => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      padding={padding}
      height={height}
      minWidth={minWidth}
      bgcolor={colors.primary[500]}
      borderRadius={5}
      {...props}
    >
      <Typography variant="h3" color={colors.greenAccent[500]}>
        {header}
      </Typography>
      {children}
    </Box>
  );
};

export default ChartLayout;
