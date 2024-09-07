import express from "express";

import { AddGoal } from "../controlers/Goals.js";

const router = express.Router();

router.post("/",AddGoal)
export default router;
