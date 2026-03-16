import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { monthlyGrowth } from "../api/adminApi";
import { toast } from "react-toastify";

export default function AdminAnalytics() {
  const [growthData, setGrowthData] = useState([]);

  useEffect(() => {
    fetchGrowth();
  }, []);

  const fetchGrowth = async () => {
    try {
        const res = await monthlyGrowth();
        setGrowthData(res.data);
        toast.success("Growth data fetched successfully");
    } catch (error) {
        toast.error("Failed to fetch growth data");
    }
  };

  return (
    <div className="ml-65">
      <h1 className="text-2xl font-bold mb-6">
        Monthly User Growth
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow">
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