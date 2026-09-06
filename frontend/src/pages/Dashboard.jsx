import { useEffect, useState } from "react";
import API from "../services/api";

import Layout from "../components/Layout";
import SummaryCard from "../components/SummaryCard";
import Charts from "../components/Charts";
import { useAuth } from "../context/useAuth";
import {
  ArrowUpRight,
  ArrowDownRight,
  WalletCards,
  CalendarDays,
  Utensils,
  Plane,
  ShoppingBag,
  Receipt,
  HeartPulse,
  CircleEllipsis,
  Home,
  Car,
  GraduationCap,
  Film,
  Dumbbell,
  Smartphone,
  Gift,
  Coffee,
  Shirt,
  Gamepad2,
  Music,
  Wifi,
  Lightbulb,
  Landmark,
  CircleDollarSign,
  Baby,
  PawPrint,
  BookOpen,
  Bus,
  Fuel,
  CreditCard,
} from "lucide-react";

const CATEGORY_ICONS = {
  // Existing Categories
  Food: Utensils,
  Travel: Plane,
  Shopping: ShoppingBag,
  Bills: Receipt,
  Health: HeartPulse,
  Other: CircleEllipsis,

  // Home & Living
  Home: Home,
  Rent: Home,
  Utilities: Lightbulb,

  // Transportation
  Transport: Bus,
  Transportation: Bus,
  Car: Car,
  Fuel: Fuel,

  // Education
  Education: GraduationCap,
  Books: BookOpen,

  // Entertainment
  Entertainment: Film,
  Movies: Film,
  Games: Gamepad2,
  Music: Music,

  // Lifestyle
  Fitness: Dumbbell,
  Gym: Dumbbell,
  Clothing: Shirt,
  Coffee: Coffee,

  // Technology
  Technology: Smartphone,
  Internet: Wifi,

  // Finance
  EMI: CreditCard,
  Insurance: Landmark,
  Investment: CircleDollarSign,

  // Personal
  Gifts: Gift,
  Baby: Baby,
  Pets: PawPrint,
};

function Dashboard() {
const { user } = useAuth();
const [summary, setSummary] = useState({
totalIncome: 0,
totalExpense: 0,
balance: 0,
});

const [categoryData, setCategoryData] = useState([]);
const [monthlyData, setMonthlyData] = useState([]);
const [loading, setLoading] = useState(true);

const fetchDashboardData = async () => {
try {
setLoading(true);


  const [summaryRes, categoryRes, monthlyRes] =
    await Promise.all([
      API.get("/reports/dashboard"),
      API.get("/reports/category-expenses"),
      API.get("/reports/monthly"),
    ]);

  setSummary(summaryRes.data.data);
  setCategoryData(categoryRes.data.data || []);
  setMonthlyData(monthlyRes.data.data || []);
} catch (error) {
  console.error(
    "Dashboard error:",
    error.response?.data || error.message
  );
} finally {
  setLoading(false);
}


};

useEffect(() => {
Promise.resolve().then(fetchDashboardData);
}, []);

if (loading) {
return <h2>Loading dashboard...</h2>;
}

return (
<Layout>
  <div className="dashboard-hero">
    <div>
      <p className="eyebrow">YOUR MONEY, IN FOCUS</p>
      <h1 className="page-title">Good to see you, {user?.name?.split(" ")[0] || "there"}.</h1>
      <p className="page-description">Here is the shape of your finances today.</p>
    </div>
    <div className="dashboard-date"><CalendarDays size={17} /><span>{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span></div>
  </div>

  <main className="container dashboard-container">

    <div className="summary-grid">
      <SummaryCard
        title="Total Income"
        amount={summary.totalIncome}
        icon={ArrowUpRight}
        type="income"
      />

      <SummaryCard
        title="Total Expenses"
        amount={summary.totalExpense}
        icon={ArrowDownRight}
        type="expense"
      />

      <SummaryCard
        title="Current Balance"
        amount={summary.balance}
        icon={WalletCards}
        type="balance"
      />
    </div>

    <section className="category-strip">
      <div className="section-intro">
        <p className="eyebrow">SPENDING MAP</p>
        <h2>Where it goes</h2>
      </div>
      <div className="category-grid">
        {categoryData.length ? categoryData.map((item) => {
          const Icon = CATEGORY_ICONS[item.category] || CircleEllipsis;
          return (
            <div className="category-chip" key={item.category}>
              <span className="category-icon"><Icon size={18} /></span>
              <span><strong>{item.category}</strong><small>₹{Number(item.amount).toLocaleString("en-IN")}</small></span>
            </div>
          );
        }) : <p className="empty-category">Add an expense to see your spending map.</p>}
      </div>
    </section>

    <section className="dashboard-section">
      <h2>Financial Overview</h2>

      <Charts
        categoryData={categoryData}
        monthlyData={monthlyData}
      />
    </section>
  </main>
</Layout>


);
}

export default Dashboard;
