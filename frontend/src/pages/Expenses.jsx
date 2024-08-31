import DataGridDemo from "../components/Table";
import { apiRequest } from "../axios";
import Header from "../components/Header";
import { useMode, tokens } from "../Theme";
import { useState } from "react";
import Modal from "../components/UI/Modal";

const Expenses = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const [expenses, setExpenses] = useState([]);
  const [shoeModal, setShowModal] = useState(false)
  

  /////// delete an expense
  const delete_expenses = (id) => {
    apiRequest.delete(`/transactions/delete-expense/${id}`);
    get_expenses();
  };

  ////// get all the expenses
  const get_expenses = () => {
    apiRequest
      .get(`transactions/get-expenses`)
      .then((res) => {
        const transformedData = res.data.map((item, index) => ({
          id: index + 1,
          ...item,
        }));
        setExpenses(transformedData);
        console.log(expenses)
      })
      .catch((err) => console.log(err));
  };

  /////// update an expense
  const update_expense = (row) => {
    console.log(`/transactions/update-expense/${row._id}`);
    apiRequest
      .put(`/transactions/update-expense/${row._id}`, row)
      .then(() => get_expenses())
      .catch((err) => console.log(err.message));
  };

///// add expense
   const add_expense = (values) => {
     apiRequest
       .post(`transactions/add-expense`, values)
       .then((res) => console.log(res))
       .catch((err) => console.log(err));
     get_expenses()
     console.log(expenses)
    
   };
  return (
    <>
      <Header
        title="Expenses"
        subtitle="Track & Analyze Your Spending"
        btnColor={colors.greenAccent[400]}
        btnText="Add Expense"
        btnHoverColor={colors.greenAccent[600]}
        onShowModalHandler={() => setShowModal((prev) => !prev)}
      />

      <DataGridDemo
        deleteFn={(id) => delete_expenses(id)}
        getFn={get_expenses}
        updateFn={update_expense}
        data={expenses}
      />
      <Modal
        showModal={shoeModal}
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
        onCloseModalHandler={() => setShowModal(false)}
        
        handleFormSubmit={add_expense}
      />
    </>
  );
};

export default Expenses;
