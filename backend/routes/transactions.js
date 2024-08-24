import express from "express";
import { addIncome, deleteIncome, getIncomes } from "../controlers/income.js";
import { addExpense, deleteExpense, getExpense } from "../controlers/expenses.js";

const router = express.Router()

router.post('/add-income',addIncome)

router.get('/get-incomes',getIncomes)

router.delete("/delete-income/:id", deleteIncome);

router.post("/add-expense", addExpense);

router.get("/get-expenses", getExpense);

router.delete("/delete-expense/:id", deleteExpense);

export default router