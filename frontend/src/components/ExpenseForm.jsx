import { useState } from "react";

import {
  Plus,
  ReceiptText,
} from "lucide-react";

function ExpenseForm({
  onAddExpense,
}) {
  const [formData, setFormData] =
    useState({
      title: "",
      amount: "",
      category: "Food",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddExpense({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: "",
      amount: "",
      category: "Food",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });
  };

  return (
    <div className="content-card">
      <div className="section-title-row">
        <div>
          <h2>Add Expense</h2>

          <p>
            Record your latest spending.
          </p>
        </div>

        <div className="section-icon expense-icon">
          <ReceiptText size={22} />
        </div>
      </div>

      <form
        className="transaction-form"
        onSubmit={handleSubmit}
      >
        <div className="form-grid">
          <div className="form-group">
            <label>Expense Title</label>

            <input
              type="text"
              name="title"
              placeholder="Example: Grocery shopping"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Amount (₹)</label>

            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Food</option>
              <option>Transport</option>
              <option>Shopping</option>
              <option>Bills</option>
              <option>Entertainment</option>
              <option>Health</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="add-transaction-button expense-button"
        >
          <Plus size={19} />

          Add Expense
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;