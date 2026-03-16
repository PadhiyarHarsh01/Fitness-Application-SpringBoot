import React from "react";
import AdminSidebar from "../components/AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // remove token + user
    navigate("/login");
  };

  return (
    <div className="flex">
      <AdminSidebar onLogout={handleLogout} />
      <main className="flex-1 p-8 bg-slate-50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}