import React from "react";
import { NavLink } from "react-router-dom";

import {
  Home,
  LayoutDashboard,
  Package,
  Folder,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  MessageCircle,
  ExternalLink,
} from "lucide-react";

export default function Sidebar() {
  const navItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: Home,
    },

    {
      label: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      label: "Categories",
      path: "/admin/categories",
      icon: Folder,
    },
    {
      label: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      label: "Reports",
      path: "/admin/reports",
      icon: BarChart3,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const bottomItems = [];

  return (
    <aside
      className="bg-white border-end d-flex flex-column"
      style={{
        width: "260px",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <div className="px-4 py-4 border-bottom">
        <h5 className="fw-bold mb-0">
          Execlusive
          <span className="text-danger"> Admin</span>
        </h5>
      </div>

      {/* Main Navigation */}
      <div className="flex-grow-1 p-3 overflow-auto">
        <div className="text-uppercase text-muted small fw-semibold px-2 mb-2">
          Main
        </div>

        <nav className="d-flex flex-column gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `d-flex align-items-center gap-3 text-decoration-none rounded-3 px-3 py-2 ${
                    isActive ? "bg-danger text-white" : "text-dark"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Admin Profile */}
      <div className="border-top p-3">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center fw-semibold"
            style={{
              width: "40px",
              height: "40px",
            }}
          >
            A
          </div>

          <div>
            <div className="fw-semibold">Admin</div>
            <small className="text-muted">Administrator</small>
          </div>
        </div>

        <NavLink
          to="/"
          className="d-flex align-items-center gap-2 text-decoration-none text-muted small mt-3 px-1"
        >
          <ExternalLink size={16} />
          Open Store
        </NavLink>
      </div>
    </aside>
  );
}
