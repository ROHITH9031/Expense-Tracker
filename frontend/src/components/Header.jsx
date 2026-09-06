import {
  Bell,
  Menu,
} from "lucide-react";

import { useAuth } from "../context/useAuth";

function Header({ onMenuClick }) {
  const { user } = useAuth();

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <header className="top-header">
      <button
        className="mobile-menu-button"
        onClick={onMenuClick}
      >
        <Menu size={22} />
      </button>

      <div className="header-spacer" />

      <div className="header-actions">
        <button className="notification-button">
          <Bell size={20} />
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            {initials}
          </div>

          <div className="user-info">
            <strong>
              {user?.name || "User"}
            </strong>

            <span>
              {user?.email || ""}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;