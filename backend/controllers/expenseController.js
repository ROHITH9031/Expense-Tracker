import Expense from "../models/Expense.js";

// @desc    Get all expenses for logged-in user
// @route   GET /api/expenses
// @access  Private
export const getExpenses = async (req, res) => {
try {
const expenses = await Expense.find({
user: req.user._id,
}).sort({ date: -1 });


res.status(200).json({
  success: true,
  count: expenses.length,
  data: expenses,
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to fetch expenses",
});
}
};

// @desc    Add new expense
// @route   POST /api/expenses
// @access  Private
export const addExpense = async (req, res) => {
try {
const { title, amount, category, date, description } = req.body;


if (!title || !amount || !category) {
  return res.status(400).json({
    success: false,
    message: "Title, amount and category are required",
  });
}

const expense = await Expense.create({
  user: req.user._id,
  title,
  amount,
  category,
  date,
  description,
});

res.status(201).json({
  success: true,
  message: "Expense added successfully",
  data: expense,
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to add expense",
});
}
};

// @desc    Update expense
// @route   PUT /api/expenses/:id
// @access  Private
export const updateExpense = async (req, res) => {
try {
let expense = await Expense.findById(req.params.id);


if (!expense) {
  return res.status(404).json({
    success: false,
    message: "Expense not found",
  });
}

// Check ownership
if (expense.user.toString() !== req.user._id.toString()) {
  return res.status(403).json({
    success: false,
    message: "Not authorized to update this expense",
  });
}

const { title, amount, category, date, description } = req.body;

expense = await Expense.findByIdAndUpdate(
  req.params.id,
  {
    title,
    amount,
    category,
    date,
    description,
  },
  {
    new: true,
    runValidators: true,
  }
);

res.status(200).json({
  success: true,
  message: "Expense updated successfully",
  data: expense,
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to update expense",
});
}
};

// @desc    Delete expense
// @route   DELETE /api/expenses/:id
// @access  Private
export const deleteExpense = async (req, res) => {
try {
const expense = await Expense.findById(req.params.id);

if (!expense) {
  return res.status(404).json({
    success: false,
    message: "Expense not found",
  });
}

// Check ownership
if (expense.user.toString() !== req.user._id.toString()) {
  return res.status(403).json({
    success: false,
    message: "Not authorized to delete this expense",
  });
}

await expense.deleteOne();

res.status(200).json({
  success: true,
  message: "Expense deleted successfully",
});

} catch (error) {
res.status(500).json({
success: false,
message: "Failed to delete expense",
});
}
};
