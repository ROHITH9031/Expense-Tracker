import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  ReceiptText,
  TrendingUp,
  BarChart3,
  Wallet,
  LogOut,
} from "lucide-react";

import toast from "react-hot-toast";

import { useAuth } from "../context/useAuth";

function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: ReceiptText,
    },
    {
      name: "Income",
      path: "/income",
      icon: TrendingUp,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: BarChart3,
    },
  ];

  const handleLogout = () => {
    logout();

    toast.success("Logged out successfully");

    navigate("/login");
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Wallet size={22} />
        </div>

        <div>
          <h2>ExpenseFlow</h2>
          <span>Finance Manager</span>
        </div>
      </div>

      <div className="sidebar-menu">
        <p className="menu-label">
          MAIN MENU
        </p>

        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive
                    ? "active"
                    : ""
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="sidebar-bottom">
        <button
          className="logout-sidebar-button"
          onClick={handleLogout}
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;