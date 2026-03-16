import React, { useEffect, useState } from "react";
import { Users, Activity, Flame } from "lucide-react";
import { getAdminStats, monthlyGrowth } from "../api/adminApi";
import { toast } from "react-toastify";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function AdminDashboard() {

  const [stats, setStats] = useState(null);
  const [growthData, setGrowthData] = useState([]);

  const fetchStats = async () => {
    try {

      const statsRes = await getAdminStats();
      setStats(statsRes.data);

      const growthRes = await monthlyGrowth();
      setGrowthData(growthRes.data);

    } catch (error) {
      toast.error("Admin dashboard data fetch error");
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="space-y-10 ml-65">

      {/* HEADER */}
      <div className="bg-linear-to-r from-indigo-600 to-emerald-500 text-white p-8 rounded-2xl shadow">
        <h1 className="text-3xl font-bold">Admin Control Center</h1>
        <p className="opacity-90">
          Monitor users, activities and platform growth
        </p>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          icon={Users}
          color="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Total Activities"
          value={stats?.totalActivities || 0}
          icon={Activity}
          color="bg-emerald-100 text-emerald-600"
        />

        <StatCard
          title="Total Calories"
          value={stats?.totalCalories || 0}
          icon={Flame}
          color="bg-orange-100 text-orange-600"
        />
      </div>

      {/* MONTHLY GROWTH CHART */}
      <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg hover:-translate-y-1 transition">

        <h2 className="text-xl font-semibold mb-4">
          Monthly User Growth
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">

      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>

      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6" />
      </div>

    </div>
  );
}