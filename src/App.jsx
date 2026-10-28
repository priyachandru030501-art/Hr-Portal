import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import LeaveManagement from "./pages/LeaveManagement";
import Payroll from "./pages/Payroll";

import "./App.css";

function AppLayout() {
  const menu = [
    { path: "/", label: "Dashboard", icon: "bi-grid" },
    { path: "/employees", label: "Employees", icon: "bi-people" },
    { path: "/attendance", label: "Attendance", icon: "bi-calendar-check" },
    { path: "/leaves", label: "Leave Management", icon: "bi-calendar2-week" },
    { path: "/payroll", label: "Payroll", icon: "bi-wallet2" },
  ];

  return (
    <div className="hr-layout">
      <aside className="hr-sidebar">
        <div className="hr-brand">
          <i className="bi bi-buildings"></i> HR PORTAL
        </div>

        <p className="sidebar-heading">MAIN MENU</p>

        <nav className="sidebar-menu">
          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <i className="bi bi-person-circle"></i>
          <div>
            <strong>HR Admin</strong>
            <small>Administrator</small>
          </div>
        </div>
      </aside>

      <div className="hr-main">
        <header className="hr-topbar">
          <div>
            <span className="topbar-label">WORKSPACE</span>
            <h5>Human Resources</h5>
          </div>
          <div className="topbar-profile">
            <i className="bi bi-bell"></i>
            <span className="profile-avatar">A</span>
            <span>Admin</span>
          </div>
        </header>

        <main className="hr-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/leaves" element={<LeaveManagement />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="hr-footer">
          © {new Date().getFullYear()} HR Portal. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}