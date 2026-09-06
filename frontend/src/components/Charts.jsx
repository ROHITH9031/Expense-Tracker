import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
];

function Charts({
  categoryData = [],
  monthlyData = [],
}) {
  return (
    <div className="charts-grid">
      <div className="chart-card">
        <div className="chart-heading">
          <h3>Expenses by Category</h3>
          <p>
            Where your money goes
          </p>
        </div>

        <div className="chart-container">
          {categoryData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="amount"
                  nameKey="category"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {categoryData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">
              No expense data available
            </div>
          )}
        </div>
      </div>

      <div className="chart-card">
        <div className="chart-heading">
          <h3>Monthly Overview</h3>
          <p>
            Income and expenses
          </p>
        </div>

        <div className="chart-container">
          {monthlyData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={280}
            >
              <BarChart
                data={monthlyData}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#334155"
                />

                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                />

                <YAxis
                  stroke="#94a3b8"
                />

                <Tooltip />

                <Bar
                  dataKey="income"
                  fill="#10b981"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="expense"
                  fill="#ef4444"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">
              No monthly data available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Charts;