import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
getIncome,
addIncome,
updateIncome,
deleteIncome,
} from "../controllers/incomeController.js";

const router = express.Router();

router
.route("/")
.get(protect, getIncome)
.post(protect, addIncome);

router
.route("/:id")
.put(protect, updateIncome)
.delete(protect, deleteIncome);

export default router;
