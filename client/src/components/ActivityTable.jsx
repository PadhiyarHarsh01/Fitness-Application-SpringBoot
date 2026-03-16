import React from "react";

export default function ActivityTable({ activities }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>

      <div className="space-y-4">
        {activities.map((a) => (
          <div
            key={a.id}
            className="flex items-center justify-between bg-slate-50 rounded-2xl p-5 hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-slate-500">{a.type}</p>
            </div>
            <div className="text-right">
              <p className="font-bold">{a.duration} min</p>
              <p className="text-sm text-emerald-600">{a.calories} kcal</p>
              <p className="text-xs text-slate-400">{a.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}