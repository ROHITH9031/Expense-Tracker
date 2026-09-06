import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
getDashboardSummary,
getCategoryExpenses,
getMonthlyReport,
getMonthlyExpenseDetails,
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboardSummary);

router.get(
"/category-expenses",
protect,
getCategoryExpenses
);

router.get("/monthly", protect, getMonthlyReport);

router.get("/monthly-expenses", protect, getMonthlyExpenseDetails);

export default router;
