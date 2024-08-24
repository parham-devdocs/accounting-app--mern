import React from "react";

import { Typography } from "@mui/material";
import DataGridDemo from "../components/Table";
import { get_incomes } from "../axios";

const Expenses = () => {
  return <DataGridDemo getFn={get_incomes} />
};

export default Expenses;
 