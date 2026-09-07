import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import API from "../services/api";

import Layout from "../components/Layout";
import IncomeForm from "../components/IncomeForm";
import TransactionList from "../components/TransactionList";

function Income() {
  const [income, setIncome] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [editingIncome, setEditingIncome] =
    useState(null);

  const fetchIncome = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        "/income"
      );

      setIncome(response.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Unable to load income"
      );
    } finally {
      setLoading(false);
    }
  };

  const addIncome = async (incomeData) => {
    try {
      const response = await API.post(
        "/income",
        incomeData
      );

      const newIncome = response.data.data;

      setIncome((prev) => [
        newIncome,
        ...prev,
      ]);

      toast.success(
        "Income added successfully 💰"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add income"
      );
    }
  };

  const deleteIncome = async (id) => {
    try {
      await API.delete(
        `/income/${id}`
      );

      setIncome((prev) =>
        prev.filter(
          (item) =>
            item._id !== id
        )
      );

      toast.success(
        "Income deleted successfully"
      );
    } catch {
      toast.error(
        "Failed to delete income"
      );
    }
  };

  const updateIncome = async (id, incomeData) => {
    try {
      const response = await API.put(
        `/income/${id}`,
        incomeData
      );

      const updatedIncome = response.data.data;

      setIncome((prev) =>
        prev.map((item) =>
          item._id === id
            ? updatedIncome
            : item
        )
      );
      setEditingIncome(null);
      toast.success("Income updated successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to update income"
      );
    }
  };

  useEffect(() => {
    Promise.resolve().then(fetchIncome);
  }, []);

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Income
          </h1>

          <p className="page-description">
            Keep track of all your earnings.
          </p>
        </div>
      </div>

      <IncomeForm
        key={editingIncome?._id || "new-income"}
        onAddIncome={addIncome}
        onUpdateIncome={updateIncome}
        editingIncome={editingIncome}
        onCancelEdit={() => setEditingIncome(null)}
      />

      <div className="content-card">
        <div className="section-title-row">
          <div>
            <h2>
              Income History
            </h2>

            <p>
              Your recent earnings
            </p>
          </div>

          <span className="transaction-count">
            {income.length} Records
          </span>
        </div>

        {loading ? (
          <div className="page-loader">
            <div className="loader" />
          </div>
        ) : (
          <TransactionList
            transactions={income}
            type="income"
            onDelete={deleteIncome}
            onEdit={setEditingIncome}
          />
        )}
      </div>
    </Layout>
  );
}

export default Income;