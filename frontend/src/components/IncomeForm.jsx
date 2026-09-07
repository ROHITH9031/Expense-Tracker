import { useState } from "react";

import {
  Check,
  Plus,
  TrendingUp,
  X,
} from "lucide-react";

function IncomeForm({
  onAddIncome,
  onUpdateIncome,
  editingIncome,
  onCancelEdit,
}) {
  const getEmptyForm = () => ({
    title: "",
    amount: "",
    category: "Salary",
    date: new Date()
      .toISOString()
      .split("T")[0],
    description: "",
  });

  const getInitialForm = () =>
    editingIncome
      ? {
          title: editingIncome.title || "",
          amount: editingIncome.amount || "",
          category: editingIncome.category || "Salary",
          date: editingIncome.date
            ? new Date(editingIncome.date)
                .toISOString()
                .split("T")[0]
            : getEmptyForm().date,
          description: editingIncome.description || "",
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

    if (editingIncome) {
      onUpdateIncome(editingIncome._id, payload);
    } else {
      onAddIncome(payload);
      setFormData(getEmptyForm());
    }
  };

  return (
    <div className="content-card">
      <div className="section-title-row">
        <div>
          <h2>
            {editingIncome ? "Edit Income" : "Add Income"}
          </h2>

          <p>
            {editingIncome
              ? "Update the details of this income."
              : "Record your latest earnings."}
          </p>
        </div>

        <div className="section-icon income-icon">
          <TrendingUp size={22} />
        </div>
      </div>

      <form
        className="transaction-form"
        onSubmit={handleSubmit}
      >
        <div className="form-grid">
          <div className="form-group">
            <label>Income Title</label>

            <input
              type="text"
              name="title"
              placeholder="Example: Monthly salary"
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
            <label>Source</label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Salary</option>
              <option>Freelancing</option>
              <option>Business</option>
              <option>Investment</option>
              <option>Gift</option>
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
              placeholder="Add notes about this income"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="add-transaction-button income-button"
          >
            {editingIncome ? <Check size={19} /> : <Plus size={19} />}

            {editingIncome ? "Update Income" : "Add Income"}
          </button>

          {editingIncome && (
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

export default IncomeForm;