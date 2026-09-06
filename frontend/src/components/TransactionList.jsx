import {
  Trash2,
  Calendar,
  Tag,
} from "lucide-react";

function TransactionList({
  transactions = [],
  type = "expense",
  onDelete,
}) {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <Tag size={32} />
        </div>

        <h3>
          No {type}s found
        </h3>

        <p>
          Add your first {type} to
          start tracking your finances.
        </p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      {transactions.map((item) => (
        <div
          className="transaction-item"
          key={item._id}
        >
          <div
            className={`transaction-type-icon ${type}`}
          >
            {type === "expense"
              ? "−"
              : "+"}
          </div>

          <div className="transaction-details">
            <h3>
              {item.title ||
                item.description ||
                "Transaction"}
            </h3>

            <div className="transaction-meta">
              <span>
                <Tag size={14} />

                {item.category ||
                  item.source ||
                  "Other"}
              </span>

              <span>
                <Calendar size={14} />

                {item.date
                  ? new Date(
                      item.date
                    ).toLocaleDateString(
                      "en-IN"
                    )
                  : "No date"}
              </span>
            </div>
          </div>

          <div className="transaction-right">
            <strong
              className={`transaction-amount ${type}`}
            >
              {type === "expense"
                ? "-"
                : "+"}
              ₹
              {Number(
                item.amount || 0
              ).toLocaleString("en-IN")}
            </strong>

            <button
              className="delete-transaction"
              onClick={() =>
                onDelete(item._id)
              }
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TransactionList;