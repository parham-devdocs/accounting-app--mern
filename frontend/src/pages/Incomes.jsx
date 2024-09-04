import React, { useState } from "react";

import {  Typography } from "@mui/material";
import DataGridDemo from "../components/Table";
import { apiRequest } from "../axios";
import Header from "../components/Header";
import { useMode, tokens } from "../Theme";
import Modal from "../components/UI/Modal";


const Expenses = () => {
  const [theme] = useMode();
  const colors = tokens(theme.palette.mode);
  const [incomes, setIncomes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  ///////  delete an income

  const delete_income = (id) => {
    apiRequest.delete(`/transactions/delete-income/${id}`);
    get_incomes();
  };

  /////// get all incomes

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
  //////// update an income

  
   const update_income = (row) => {
     console.log(`/transactions/update-expense/${row._id}`);
     apiRequest
       .put(`/transactions/update-income/${row._id}`, row)
       .then((res) => { get_incomes(); console.log(res.data) })
       .catch((err) => console.log(err.message));
   };
  /////// add an income

  const add_income = (values) => {
    apiRequest
      .post(`transactions/add-income`, values)
      .then((res) => get_incomes())
      .catch((err) => console.log(err));
    get_incomes();
    console.log(incomes);
    setShowModal(prev=>!prev)
  };


  const closeModalHandler = (e) => {
    setShowModal((prev)=>!prev)

    console.log(showModal)
  }
  return (
    <>
      <Header
        title="Incomes"
        subtitle="Track & Analyze Your Incomes"
        btnColor={colors.greenAccent[400]}
        btnText="Add Income"
        btnHoverColor={colors.greenAccent[600]}
        onShowModalHandler={() => setShowModal((prev) => !prev)}
      />

      <DataGridDemo
        getFn={get_incomes}
        deleteFn={(id) => delete_income(id)}
        data={incomes}
        updateFn={update_income}
      />
      <Modal
        showModal={showModal}
        categories={[
          "Housing",
          "Transportation",
          "Food",
          "Health care",
          "Personal care",
          "Entertainment",
          "Clothing",
          "Education",
          "Insurance",
          "bussiness Expenses",
          "Others",
        ]}
        onCloseModalHandler={closeModalHandler}
        handleFormSubmit={add_income}
      />
    </>
  );
};

export default Expenses;
