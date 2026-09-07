import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import Layout from "../components/Layout";
import ExpenseForm from "../components/ExpenseForm";
import TransactionList from "../components/TransactionList";

function Expenses() {
  const [expenses, setExpenses] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingExpense, setEditingExpense] =
    useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/expenses"
      );

      setExpenses(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load expenses"
      );
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const response = await API.post(
        "/expenses",
        expenseData
      );

      const newExpense = response.data.data;

      setExpenses((prev) => [
        newExpense,
        ...prev,
      ]);

      toast.success(
        "Expense added successfully 💸"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add expense"
      );
    }
  };

  const deleteExpense = async (id) => {
    try {
      await API.delete(
        `/expenses/${id}`
      );

      setExpenses((prev) =>
        prev.filter(
          (expense) =>
            expense._id !== id
        )
      );

      toast.success(
        "Expense deleted successfully"
      );
    } catch {
      toast.error(
        "Failed to delete expense"
      );
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const response = await API.put(
        `/expenses/${id}`,
        expenseData
      );

      const updatedExpense = response.data.data;

      setExpenses((prev) =>
        prev.map((expense) =>
          expense._id === id
            ? updatedExpense
            : expense
        )
      );
      setEditingExpense(null);
      toast.success("Expense updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update expense"
      );
    }
  };

  useEffect(() => {
    Promise.resolve().then(fetchExpenses);
  }, []);

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Expenses
          </h1>

          <p className="page-description">
            Track and manage your spending.
          </p>
        </div>
      </div>

      <ExpenseForm
        key={editingExpense?._id || "new-expense"}
        onAddExpense={addExpense}
        onUpdateExpense={updateExpense}
        editingExpense={editingExpense}
        onCancelEdit={() => setEditingExpense(null)}
      />

      <div className="content-card">
        <div className="section-title-row">
          <div>
            <h2>
              Recent Expenses
            </h2>

            <p>
              Your latest transactions
            </p>
          </div>

          <span className="transaction-count">
            {expenses.length} Records
          </span>
        </div>

        {loading ? (
          <div className="page-loader">
            <div className="loader" />
          </div>
        ) : (
          <TransactionList
            transactions={expenses}
            type="expense"
            onDelete={deleteExpense}
            onEdit={setEditingExpense}
          />
        )}
      </div>
    </Layout>
  );
}

export default Expenses;