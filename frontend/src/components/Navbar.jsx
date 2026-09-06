import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
logout();
navigate("/login");
};

return ( <nav className="navbar"> <div className="navbar-brand">
Expense Tracker </div>


  <div className="navbar-links">
    <NavLink to="/dashboard">
      Dashboard
    </NavLink>

    <NavLink to="/expenses">
      Expenses
    </NavLink>

    <NavLink to="/income">
      Income
    </NavLink>

    <NavLink to="/reports">
      Reports
    </NavLink>

    <button
      className="logout-button"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
</nav>


);
}

export default Navbar;
