import React, { useState, useMemo, useEffect } from "react";
import { TrendingUp, BarChart3 } from "lucide-react";
import { getMonthlyProgress, getWeeklyProgress } from "../api/progressApi";
import { toast } from "react-toastify";

export default function Progress() {
  const [filterPeriod, setFilterPeriod] = useState("weekly");
  const [data, setData] = useState([]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const res = filterPeriod === "weekly" 
          ? await getWeeklyProgress()
          : await getMonthlyProgress();

        setData(res.data);
      } catch (error) {
        toast.error("Failed to load progress data");
      }
    };

    loadProgress()
  }, [filterPeriod]);

  /* =======================
     STATS (DERIVED)
     ======================= */
  const stats = useMemo(() => {
    const totalCalories = data.reduce((s, d) => s + d.calories, 0);
    const totalWorkouts = data.reduce((s, d) => s + d.workouts, 0);
    const avgCalories = Math.round(totalCalories / data.length);

    return { totalCalories, totalWorkouts, avgCalories };
  }, [data]);

  const maxCalories = Math.max(...data.map((d) => d.calories)) || 1;

  const motivationalMessages = [
    "Consistency beats intensity every time.",
    "Your effort today shapes your tomorrow.",
    "Progress over perfection.",
    "You're stronger than yesterday.",
    "Small steps lead to big results.",
  ];

  const message =
    motivationalMessages[
      Math.floor(Math.random() * motivationalMessages.length)
    ];

  return (
    <div className="space-y-16">
      {/* =======================
          HERO / MOTIVATION
          ======================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-xl bg-white">
        <img
          src="/images/progress-motivation.jpg"
          alt="Progress"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="relative py-20 px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow mb-6">
            <TrendingUp size={16} className="text-emerald-600" />
            <span className="text-sm font-semibold">Progress Tracker</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{message}</h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Visualize your fitness journey and stay motivated
          </p>
        </div>
      </div>

      {/* =======================
          STATS OVERVIEW
          ======================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-6">
          <p className="text-sm text-slate-500 mb-2">Total Calories</p>
          <p className="text-4xl font-bold text-emerald-600">
            {stats.totalCalories} kcal
          </p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-3xl shadow-md hover:shadow-xl transition p-6">
          <p className="text-sm text-slate-500 mb-2">Total Workouts</p>
          <p className="text-4xl font-bold text-indigo-700">
            {stats.totalWorkouts}
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-3xl shadow-md hover:shadow-xl transition p-6">
          <p className="text-sm text-slate-500 mb-2">Avg Calories / Period</p>
          <p className="text-4xl font-bold text-emerald-700">
            {stats.avgCalories}
          </p>
        </div>
      </div>

      {/* =======================
          FILTER TOGGLE
          ======================= */}
      <div className="flex gap-4 justify-center md:justify-start">
        {["weekly", "monthly"].map((p) => (
          <button
            key={p}
            onClick={() => setFilterPeriod(p)}
            className={`px-6 py-2 rounded-full font-semibold transition shadow ${
              filterPeriod === p
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-white hover:bg-slate-100"
            }`}
          >
            {p === "weekly" ? "This Week" : "This Month"}
          </button>
        ))}
      </div>

      {/* =======================
    CALORIES BAR CHART (FIXED)
    ======================= */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold">Calories Burned</h2>
            <p className="text-slate-500 text-sm mt-1">
              {filterPeriod === "weekly" ? "Daily trend" : "Weekly trend"}
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-100">
            <BarChart3 className="text-emerald-600" />
          </div>
        </div>

        {/* CHART AREA */}
        <div className="flex items-end gap-4 h-64">
          {data.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center">
              {/* BAR CONTAINER (FIXED HEIGHT) */}
              <div className="relative w-full h-56 flex items-end">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-emerald-600 to-emerald-300 transition-all duration-500"
                  style={{
                    height: `${(d.calories / maxCalories) * 100}%`,
                  }}
                />
              </div>

              {/* LABEL */}
              <span className="text-xs text-slate-500 mt-2">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* =======================
          WORKOUT SESSIONS
          ======================= */}
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6">Workout Sessions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((d, i) => (
            <div
              key={i}
              className="bg-slate-50 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition"
            >
              <p className="text-sm text-slate-500">{d.label}</p>
              <p className="text-3xl font-bold text-indigo-600 mt-2">
                {d.workouts}
              </p>
              <p className="text-xs text-slate-400">sessions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
