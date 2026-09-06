import Income from "../models/Income.js";

// @desc    Get all income records for logged-in user
// @route   GET /api/income
// @access  Private
export const getIncome = async (req, res) => {
try {
const income = await Income.find({
user: req.user._id,
}).sort({ date: -1 });


res.status(200).json({
  success: true,
  count: income.length,
  data: income,
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to fetch income",
});
}
};

// @desc    Add new income
// @route   POST /api/income
// @access  Private
export const addIncome = async (req, res) => {
try {
const { title, amount, category, date, description } = req.body;


if (!title || !amount || !category) {
  return res.status(400).json({
    success: false,
    message: "Title, amount and category are required",
  });
}

const income = await Income.create({
  user: req.user._id,
  title,
  amount,
  category,
  date,
  description,
});

res.status(201).json({
  success: true,
  message: "Income added successfully",
  data: income,
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to add income",
});
}
};

// @desc    Update income
// @route   PUT /api/income/:id
// @access  Private
export const updateIncome = async (req, res) => {
try {
let income = await Income.findById(req.params.id);


if (!income) {
  return res.status(404).json({
    success: false,
    message: "Income record not found",
  });
}

// Check ownership
if (income.user.toString() !== req.user._id.toString()) {
  return res.status(403).json({
    success: false,
    message: "Not authorized to update this income",
  });
}

const { title, amount, category, date, description } = req.body;

income = await Income.findByIdAndUpdate(
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
  message: "Income updated successfully",
  data: income,
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to update income",
});
}
};

// @desc    Delete income
// @route   DELETE /api/income/:id
// @access  Private
export const deleteIncome = async (req, res) => {
try {
const income = await Income.findById(req.params.id);


if (!income) {
  return res.status(404).json({
    success: false,
    message: "Income record not found",
  });
}

// Check ownership
if (income.user.toString() !== req.user._id.toString()) {
  return res.status(403).json({
    success: false,
    message: "Not authorized to delete this income",
  });
}

await income.deleteOne();

res.status(200).json({
  success: true,
  message: "Income deleted successfully",
});


} catch (error) {
res.status(500).json({
success: false,
message: "Failed to delete income",
});
}
};
