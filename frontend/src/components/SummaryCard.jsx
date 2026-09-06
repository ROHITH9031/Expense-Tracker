function SummaryCard({
  title,
  amount,
  icon: Icon,
  type = "default",
}) {
  return (
    <div
      className={`summary-card ${type}`}
    >
      <div className="summary-card-top">
        <div>
          <p className="summary-card-label">
            {title}
          </p>

          <h3 className="summary-card-amount">
            ₹
            {Number(
              amount || 0
            ).toLocaleString("en-IN")}
          </h3>
        </div>

        <div className="summary-icon">
          {Icon && <Icon size={22} />}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;