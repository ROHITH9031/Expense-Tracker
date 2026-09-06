import { useState } from "react";

import {
  Plus,
  TrendingUp,
} from "lucide-react";

function IncomeForm({
  onAddIncome,
}) {
  const [formData, setFormData] =
    useState({
      title: "",
      amount: "",
      category: "Salary",
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

    onAddIncome({
      ...formData,
      amount: Number(formData.amount),
    });

    setFormData({
      title: "",
      amount: "",
      category: "Salary",
      date: new Date()
        .toISOString()
        .split("T")[0],
    });
  };

  return (
    <div className="content-card">
      <div className="section-title-row">
        <div>
          <h2>Add Income</h2>

          <p>
            Record your latest earnings.
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
        </div>

        <button
          type="submit"
          className="add-transaction-button income-button"
        >
          <Plus size={19} />

          Add Income
        </button>
      </form>
    </div>
  );
}

export default IncomeForm;