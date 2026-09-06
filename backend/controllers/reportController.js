import Expense from "../models/Expense.js";
import Income from "../models/Income.js";

// ============================================
// DASHBOARD SUMMARY
// GET /api/reports/dashboard
// ============================================
export const getDashboardSummary = async (req, res) => {
try {
const userId = req.user._id;


const incomeData = await Income.aggregate([
  {
    $match: {
      user: userId,
    },
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" },
    },
  },
]);

const expenseData = await Expense.aggregate([
  {
    $match: {
      user: userId,
    },
  },
  {
    $group: {
      _id: null,
      total: { $sum: "$amount" },
    },
  },
]);

const totalIncome = incomeData.length
  ? incomeData[0].total
  : 0;

const totalExpense = expenseData.length
  ? expenseData[0].total
  : 0;

const balance = totalIncome - totalExpense;

res.status(200).json({
  success: true,
  data: {
    totalIncome,
    totalExpense,
    balance,
  },
});


} catch (error) {
console.error("Dashboard report error:", error);

```
res.status(500).json({
  success: false,
  message: "Failed to fetch dashboard report",
  error: error.message,
});
```

}
};

// ============================================
// CATEGORY-WISE EXPENSE REPORT
// GET /api/reports/category-expenses
// ============================================
export const getCategoryExpenses = async (req, res) => {
try {
const categoryExpenses = await Expense.aggregate([
{
$match: {
user: req.user._id,
},
},
{
$group: {
_id: "$category",
amount: {
$sum: "$amount",
},
},
},
{
$sort: {
amount: -1,
},
},
]);


const formattedData = categoryExpenses.map((item) => ({
  category: item._id,
  amount: item.amount,
}));

res.status(200).json({
  success: true,
  data: formattedData,
});


} catch (error) {
console.error("Category report error:", error);


res.status(500).json({
  success: false,
  message: "Failed to fetch category expense report",
  error: error.message,
});


}
};

// ============================================
// MONTHLY INCOME AND EXPENSE REPORT
// GET /api/reports/monthly
// ============================================
export const getMonthlyReport = async (req, res) => {
try {
const userId = req.user._id;


const monthlyIncome = await Income.aggregate([
  {
    $match: {
      user: userId,
    },
  },
  {
    $group: {
      _id: {
        year: { $year: "$date" },
        month: { $month: "$date" },
      },
      income: {
        $sum: "$amount",
      },
    },
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.month": 1,
    },
  },
]);

const monthlyExpenses = await Expense.aggregate([
  {
    $match: {
      user: userId,
    },
  },
  {
    $group: {
      _id: {
        year: { $year: "$date" },
        month: { $month: "$date" },
      },
      expense: {
        $sum: "$amount",
      },
    },
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.month": 1,
    },
  },
]);

// Combine income and expense data month-wise
const monthlyMap = {};

monthlyIncome.forEach((item) => {
  const key = `${item._id.year}-${item._id.month}`;

  if (!monthlyMap[key]) {
    monthlyMap[key] = {
      year: item._id.year,
      month: item._id.month,
      income: 0,
      expense: 0,
    };
  }

  monthlyMap[key].income = item.income;
});

monthlyExpenses.forEach((item) => {
  const key = `${item._id.year}-${item._id.month}`;

  if (!monthlyMap[key]) {
    monthlyMap[key] = {
      year: item._id.year,
      month: item._id.month,
      income: 0,
      expense: 0,
    };
  }

  monthlyMap[key].expense = item.expense;
});

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const result = Object.values(monthlyMap)
  .sort((a, b) => {
    if (a.year === b.year) {
      return a.month - b.month;
    }

    return a.year - b.year;
  })
  .map((item) => ({
    month: `${monthNames[item.month - 1]} ${item.year}`,
    income: item.income,
    expense: item.expense,
  }));

res.status(200).json({
  success: true,
  data: result,
});

} catch (error) {
console.error("Monthly report error:", error);


res.status(500).json({
  success: false,
  message: "Failed to fetch monthly report",
  error: error.message,
});


}
};

// ============================================
// MONTHLY EXPENSE DETAILS (all expenses per month/year)
// GET /api/reports/monthly-expenses
// ============================================
export const getMonthlyExpenseDetails = async (req, res) => {
  try {
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId }).sort({ date: -1 });

    // Group expenses by year and month
    const grouped = {};

    expenses.forEach((expense) => {
      const d = new Date(expense.date);
      const year = d.getFullYear();
      const month = d.getMonth(); // 0-indexed

      const key = `${year}-${month}`;

      if (!grouped[key]) {
        grouped[key] = {
          year,
          month,
          expenses: [],
          total: 0,
        };
      }

      grouped[key].expenses.push({
        _id: expense._id,
        title: expense.title,
        amount: expense.amount,
        category: expense.category,
        date: expense.date,
        description: expense.description,
      });

      grouped[key].total += expense.amount;
    });

    const monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December",
    ];

    // Convert to sorted array (newest first)
    const result = Object.values(grouped)
      .sort((a, b) => {
        if (a.year === b.year) return b.month - a.month;
        return b.year - a.year;
      })
      .map((group) => ({
        year: group.year,
        month: group.month,
        monthName: monthNames[group.month],
        label: `${monthNames[group.month]} ${group.year}`,
        total: group.total,
        count: group.expenses.length,
        expenses: group.expenses.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        ),
      }));

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Monthly expense details error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch monthly expense details",
      error: error.message,
    });
  }
};
