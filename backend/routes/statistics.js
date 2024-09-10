import express from "express";
import { compare_expenses_incomes,lastMonthStatistics } from "../controlers/statistics.js";

const router = express.Router();

router.get('/comparison', compare_expenses_incomes)

router.get('/lastMonthStatistics',lastMonthStatistics)
export default router;
