import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";
import SiteFooter from "./SiteFooter";

function Layout({ children }) {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (
    <div className="app-layout">
      <div
        className={`sidebar-overlay ${
          mobileOpen
            ? "show"
            : ""
        }`}
        onClick={() =>
          setMobileOpen(false)
        }
      />

      <div
        className={`sidebar-container ${
          mobileOpen
            ? "mobile-open"
            : ""
        }`}
      >
        <Sidebar />
      </div>

      <main className="main-content">
        <Header
          onMenuClick={() =>
            setMobileOpen(true)
          }
        />

        <div className="page-content page-animation">
          {children}
        </div>

        <SiteFooter />
      </main>
    </div>
  );
}

export default Layout;