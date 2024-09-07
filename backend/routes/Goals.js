import express from "express";

import { AddGoal, getGoals } from "../controlers/Goals.js";

const router = express.Router();

router.post("/", AddGoal)
router.get("/",getGoals)
export default router;
