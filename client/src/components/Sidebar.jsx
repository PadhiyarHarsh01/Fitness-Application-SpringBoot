import React from "react";
import {
  LogOut,
  LayoutDashboard,
  Activity,
  TrendingUp,
  Sparkles,
  User,
  Menu,
  MessageSquare,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function Sidebar({ onLogout }) {
  const role = getUserRole();
  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/activities", label: "Activities", icon: Activity },
    { path: "/progress", label: "Progress", icon: TrendingUp },
    { path: "/reports", label: "AI Reports", icon: Sparkles },
    { path: "/profile", label: "Profile", icon: User },
    { path: "/feedback", label: "Feedback", icon: MessageSquare }
  ];
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 h-screen">
      {/* LOGO */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-emerald-700 rounded-lg flex items-center justify-center">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold">FitTrack</span>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-emerald-700 text-white"
                    : "text-slate-700 hover:bg-slate-100"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          );
        })}
        {isAdmin && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-700 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`
            }
          >
            <User className="w-5 h-5" />
            Admin Panel
          </NavLink>
        )}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-slate-200">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}
