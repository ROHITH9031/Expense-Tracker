import {
  useEffect,
  useState,
} from "react";

import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Tag,
  Calendar,
  Receipt,
  TrendingDown,
  Search,
  Utensils,
  Plane,
  ShoppingBag,
  Bus,
  GraduationCap,
  Clapperboard,
  Dumbbell,
  HeartPulse,
  CircleEllipsis,
  FileText,
} from "lucide-react";

import toast from "react-hot-toast";

import API from "../services/api";

import Layout from "../components/Layout";

const CATEGORY_ICONS = {
  Food: Utensils,
  Travel: Plane,
  Transport: Bus,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Health: HeartPulse,
  Education: GraduationCap,
  Entertainment: Clapperboard,
  Fitness: Dumbbell,
  Other: CircleEllipsis,
};

function Reports() {
  const [monthlyGroups, setMonthlyGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMonths, setExpandedMonths] = useState({});
  const [selectedYear, setSelectedYear] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMonthlyExpenses = async () => {
    try {
      setLoading(true);

      const response = await API.get("/reports/monthly-expenses");

      const data = response.data.data || [];

      setMonthlyGroups(data);

      // Auto-expand the first month
      if (data.length > 0) {
        setExpandedMonths({ [data[0].label]: true });
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load expense records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.resolve().then(fetchMonthlyExpenses);
  }, []);

  const toggleMonth = (label) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Get unique years for filter
  const availableYears = [
    ...new Set(monthlyGroups.map((g) => g.year)),
  ].sort((a, b) => b - a);

  // Filter by year
  const filteredGroups = monthlyGroups.filter((group) => {
    if (selectedYear !== "all" && group.year !== Number(selectedYear)) {
      return false;
    }
    return true;
  });

  // Filter expenses within groups by search
  const displayGroups = searchQuery.trim()
    ? filteredGroups
        .map((group) => {
          const q = searchQuery.toLowerCase();
          const filtered = group.expenses.filter(
            (e) =>
              e.title.toLowerCase().includes(q) ||
              e.category.toLowerCase().includes(q) ||
              (e.description && e.description.toLowerCase().includes(q))
          );

          if (filtered.length === 0) return null;

          return {
            ...group,
            expenses: filtered,
            count: filtered.length,
            total: filtered.reduce((sum, e) => sum + e.amount, 0),
          };
        })
        .filter(Boolean)
    : filteredGroups;

  // Grand totals
  const grandTotal = displayGroups.reduce((sum, g) => sum + g.total, 0);
  const grandCount = displayGroups.reduce((sum, g) => sum + g.count, 0);

  return (
    <Layout>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Expense Records
          </h1>

          <p className="page-description">
            Browse all your expenses organized by month and year.
          </p>
        </div>

        <div className="report-date">
          <CalendarDays size={18} />
          Monthly Breakdown
        </div>
      </div>

      {loading ? (
        <div className="page-loader">
          <div className="loader" />
          <p>Loading expense records...</p>
        </div>
      ) : (
        <>
          {/* Summary Stats */}
          <div className="report-summary-grid">
            <div className="report-stat">
              <div className="report-stat-icon expense">
                <TrendingDown size={22} />
              </div>
              <div>
                <span>Total Expenses</span>
                <h3>
                  ₹{Number(grandTotal).toLocaleString("en-IN")}
                </h3>
              </div>
            </div>

            <div className="report-stat">
              <div className="report-stat-icon balance">
                <Receipt size={22} />
              </div>
              <div>
                <span>Total Records</span>
                <h3>{grandCount}</h3>
              </div>
            </div>

            <div className="report-stat">
              <div className="report-stat-icon income">
                <CalendarDays size={22} />
              </div>
              <div>
                <span>Months Tracked</span>
                <h3>{displayGroups.length}</h3>
              </div>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="records-filter-bar">
            <div className="records-search-wrapper">
              <Search size={18} className="records-search-icon" />
              <input
                type="text"
                placeholder="Search expenses by title, category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="records-search-input"
              />
            </div>

            <div className="records-year-filter">
              <CalendarDays size={16} />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="records-year-select"
              >
                <option value="all">All Years</option>
                {availableYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Monthly Accordion */}
          {displayGroups.length === 0 ? (
            <div className="content-card">
              <div className="empty-state">
                <div className="empty-icon">
                  <FileText size={32} />
                </div>
                <h3>No expenses found</h3>
                <p>
                  {searchQuery
                    ? "Try adjusting your search query."
                    : "Start adding expenses to see them organized here."}
                </p>
              </div>
            </div>
          ) : (
            <div className="records-accordion">
              {displayGroups.map((group) => {
                const isExpanded = expandedMonths[group.label];

                return (
                  <div
                    className={`records-month-card ${isExpanded ? "expanded" : ""}`}
                    key={group.label}
                  >
                    <button
                      className="records-month-header"
                      onClick={() => toggleMonth(group.label)}
                    >
                      <div className="records-month-left">
                        <div className="records-month-icon">
                          <CalendarDays size={20} />
                        </div>

                        <div className="records-month-info">
                          <h3>{group.monthName}</h3>
                          <span className="records-month-year">{group.year}</span>
                        </div>
                      </div>

                      <div className="records-month-right">
                        <div className="records-month-stats">
                          <span className="records-month-total">
                            ₹{Number(group.total).toLocaleString("en-IN")}
                          </span>
                          <span className="records-month-count">
                            {group.count} expense{group.count !== 1 ? "s" : ""}
                          </span>
                        </div>

                        <div className="records-chevron">
                          {isExpanded ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </div>
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="records-month-body">
                        {group.expenses.map((expense) => {
                          const Icon =
                            CATEGORY_ICONS[expense.category] || CircleEllipsis;
                          return (
                            <div
                              className="records-expense-row"
                              key={expense._id}
                            >
                              <div className="records-expense-icon-wrap">
                                <Icon size={18} />
                              </div>

                              <div className="records-expense-details">
                                <h4>{expense.title}</h4>
                                <div className="records-expense-meta">
                                  <span>
                                    <Tag size={13} />
                                    {expense.category}
                                  </span>
                                  <span>
                                    <Calendar size={13} />
                                    {new Date(expense.date).toLocaleDateString(
                                      "en-IN",
                                      {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                      }
                                    )}
                                  </span>
                                </div>
                                {expense.description && (
                                  <p className="records-expense-desc">
                                    {expense.description}
                                  </p>
                                )}
                              </div>

                              <strong className="records-expense-amount">
                                -₹{Number(expense.amount).toLocaleString("en-IN")}
                              </strong>
                            </div>
                          );
                        })}

                        <div className="records-month-footer">
                          <span>Month Total</span>
                          <strong>
                            ₹{Number(group.total).toLocaleString("en-IN")}
                          </strong>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </Layout>
  );
}

export default Reports;