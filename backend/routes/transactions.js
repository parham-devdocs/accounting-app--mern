import express from "express";
import { addIncome, deleteIncome, editIncome, getIncomes } from "../controlers/income.js";
import { addExpense, deleteExpense, getExpense,editExpense, aggregateExpenses } from "../controlers/expenses.js";

const router = express.Router()

router.post('/add-income',addIncome)

router.get('/get-incomes',getIncomes)

router.delete("/delete-income/:id", deleteIncome);

router.put("/update-income/:id", editIncome);

router.post("/add-expense", addExpense);

router.get("/get-expenses", getExpense);

router.delete("/delete-expense/:id", deleteExpense);

router.put("/update-expense/:id",editExpense)
 router.get("/aggregate-expenses",aggregateExpenses)
export default router