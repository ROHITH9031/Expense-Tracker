import { useState } from "react";

import {
  Check,
  Plus,
  ReceiptText,
  X,
} from "lucide-react";

function ExpenseForm({
  onAddExpense,
  onUpdateExpense,
  editingExpense,
  onCancelEdit,
}) {
  const getEmptyForm = () => ({
    title: "",
    amount: "",
    category: "Food",
    date: new Date()
      .toISOString()
      .split("T")[0],
    description: "",
  });

  const getInitialForm = () =>
    editingExpense
      ? {
          title: editingExpense.title || "",
          amount: editingExpense.amount || "",
          category: editingExpense.category || "Food",
          date: editingExpense.date
            ? new Date(editingExpense.date)
                .toISOString()
                .split("T")[0]
            : getEmptyForm().date,
          description: editingExpense.description || "",
        }
      : getEmptyForm();

  const [formData, setFormData] =
    useState(getInitialForm);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      amount: Number(formData.amount),
    };

    if (editingExpense) {
      onUpdateExpense(editingExpense._id, payload);
    } else {
      onAddExpense(payload);
      setFormData(getEmptyForm());
    }
  };

  return (
    <div className="content-card">
      <div className="section-title-row">
        <div>
            <h2>
              {editingExpense ? "Edit Expense" : "Add Expense"}
            </h2>

          <p>
              {editingExpense
                ? "Update the details of this expense."
                : "Record your latest spending."}
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

          <div className="form-group form-group-full">
            <label>Description</label>

            <textarea
              name="description"
              placeholder="Add notes about this expense"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="add-transaction-button expense-button"
          >
            {editingExpense ? <Check size={19} /> : <Plus size={19} />}

            {editingExpense ? "Update Expense" : "Add Expense"}
          </button>

          {editingExpense && (
            <button
              type="button"
              className="cancel-transaction-button"
              onClick={onCancelEdit}
            >
              <X size={18} />
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ExpenseForm;