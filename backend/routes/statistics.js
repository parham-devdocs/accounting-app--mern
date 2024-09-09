import express from "express";
import { compare_expenses_incomes } from "../controlers/statistics.js";

const router = express.Router();

router.get('/comparison', compare_expenses_incomes)
export default router;
