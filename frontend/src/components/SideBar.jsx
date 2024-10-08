import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import AddCardOutlinedIcon from "@mui/icons-material/AddCardOutlined";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";

import { Box, Link, Tooltip } from "@mui/material";
import { tokens, useMode } from "../Theme";
import { useEffect, useState } from "react";
import useWindowResize from "../hooks/useResizer";
import { useLocation } from "react-router-dom";

const sidebar = [
  { label: "Profile", href: "/dashboard/Profile", icon: <AccountCircleIcon /> },
  {
    label: "Statistics",
    href: "/dashboard/Statistics",
    icon: <StackedLineChartIcon />,
  },
  {
    label: "Expenses",
    href: "/dashboard/Expenses",
    icon: <PaymentOutlinedIcon />,
  },
  {
    label: "Incomes",
    href: "/dashboard/Incomes",
    icon: <AddCardOutlinedIcon />,
  },
  {
    label: "Financial Goals",
    href: "/dashboard/Goals",
    icon: <EventAvailableOutlinedIcon />,
  },
  {
    label: "Currency Converter",
    href: "/dashboard/converter",
    icon: <CurrencyExchangeOutlinedIcon />,
  },
];

const SideBar = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [collapseSideBar] = useWindowResize();

  const collapseHandler = () => {
    setCollapsed((prev) => !prev);
  };

  useEffect(() => {
    if (location.pathname === "/dashboard/Statistics") {
      setCollapsed(true);
    } else {
      collapseSideBar ? setCollapsed(true) : setCollapsed(false);
    }
  }, [collapseSideBar]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh", // Minimum height of the screen
      }}
    >
      <Sidebar collapsed={collapsed} style={{ height: "100%" }}>
        <Menu
          style={{ backgroundColor: colors.blueAccent[900], height: "100%" }} // Ensure Menu takes full height
        >
          {sidebar.map((item) => {
            return (
             
                <Link
                  href={item.href} // Add href for navigation
                  variant="h2"
                  fontSize={17}
                  underline="none"
                color={colors.greenAccent[600]}
                key={item.label}
                >
                  <MenuItem
                    icon={item.icon}
                    style={{ color: colors.greenAccent[600] }}
                  >
                    {collapsed ? "" : item.label}{" "}
                  </MenuItem>
                </Link>
            );
          })}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default SideBar;
