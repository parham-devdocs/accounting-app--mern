import React, { useState } from "react";

import { Typography } from "@mui/material";
import DataGridDemo from "../components/Table";
import { apiRequest } from "../axios";
import Header from "../components/Header";
import { useMode,tokens } from "../Theme"
const Expenses = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
    const [incomes, setIncomes] = useState([]);
    const delete_income = (id) => {
      apiRequest.delete(`/transactions/delete-income/${id}`);
      get_incomes();
    };
    const get_incomes = () => {
      apiRequest
        .get(`transactions/get-incomes`)
        .then((res) => {
          const transformedData = res.data.map((item, index) => ({
            id: index + 1,
            ...item,
          }));
          setIncomes(transformedData);
        })
        .catch((err) => console.log(err));
    };
  return (
    <>
            <Header title="Incomes" subtitle="Track & Analyze Your Incomes" btnColor={ colors.greenAccent[400] } btnText="Add Income" btnHoverColor={colors.greenAccent[600]} />

    <DataGridDemo getFn={get_incomes} deleteFn={(id)=>delete_income(id)} data={incomes} />
    </>
  )
};

export default Expenses;
 