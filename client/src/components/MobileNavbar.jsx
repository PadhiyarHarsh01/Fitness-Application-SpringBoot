import React, { useState } from "react";
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Activity,
  TrendingUp,
  Sparkles,
  User,
  MessageSquare,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/auth";

export default function MobileNavbar({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
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

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* TOP BAR */}
      <nav className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">FitTrack</span>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* DROPDOWN MENU */}
        {isOpen && (
          <div className="bg-white border-t border-slate-200 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition"
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}

            {/* LOGOUT */}
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4 border-t border-slate-200 pt-4"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>

            {isAdmin && (
              <button
                onClick={() => handleNavigate("/admin")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              >
                <User className="w-5 h-5" />
                <span className="font-medium">Admin Panel</span>
              </button>
            )}
          </div>
        )}
      </nav>

      {/* SPACE FOR FIXED NAVBAR */}
      <div className="md:hidden h-16" />
    </>
  );
}
