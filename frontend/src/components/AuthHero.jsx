import { tokens, useMode } from "../Theme";
import { Box, Typography } from "@mui/material";
import TypeEffect from "./UI/TypeEffect.jsx";
import Slider from "./UI/Slider.jsx";
import OutlinedButton from "./UI/OutlinedButton";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import {
  dashboard_1,
  dashboard_2,
  dashboard_3,
  dashboard_4,
  dashboard_5,
} from "../assets/dashboard-imgs/dashboards.js";
const list = [
  "User-friendly interface ",
  "Real time financial tracking",
  "Automated Reports",
  "Secure Data Protection",
  "Expense Management",
  "Customer Support",
];
const AuthHero = () => {
  const [theme] = useMode(); // Ensure useMode returns the correct theme
  const colors = tokens(theme.palette.mode); // Make sure tokens function is defined properly

  return (
    <Box
      bgcolor={colors.primary[700]}
      display="flex"
      width="50vw"
      height="100vh"
      p={10}
      flexDirection="column"
      gap={1}
    >
      <Box
        component="section"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h2"
          color={colors.greenAccent[600]}
          className=" animate-fadeIn"
        >
          Simplify Your Finances
        </Typography>
        <OutlinedButton
          color={colors.greenAccent[500]}
          hovercolor={colors.greenAccent[700]}
          
          endIcon={<KeyboardDoubleArrowRightIcon className=" animate-pulse"/>}
        >
          Testimonials
        </OutlinedButton>
      </Box>

      <TypeEffect
        list={list}
        textFontColor="wheat"
        cursorFontColor="wheat"
        fontSize="25px"
      />
      <Slider
        className=" animate-fadeIn"
        spaceBetween={10}
        SlidesPerView={1}
        autoplay={{ delay: 3000 }}
        style={{ width: "600px", borderRadius: "10px", marginTop: "3rem" }}
        slides={[
          { src: dashboard_1, label: "Dashboard 1" },
          { src: dashboard_2, label: "Dashboard 2" },
          { src: dashboard_3, label: "Dashboard 3" },
          { src: dashboard_4, label: "Dashboard 4" },
          { src: dashboard_5, label: "Dashboard 5" },
        ]}
      />
    </Box>
  );
};

export default AuthHero;
