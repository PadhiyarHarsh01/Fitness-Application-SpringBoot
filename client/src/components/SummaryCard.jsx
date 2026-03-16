import React from "react";

export default function SummaryCard({ title, value, icon: Icon, gradient }) {
  const gradients = {
    emerald: "from-emerald-500 to-emerald-700",
    orange: "from-orange-500 to-orange-700",
    indigo: "from-indigo-500 to-indigo-700",
    purple: "from-purple-500 to-purple-700",
  };

  return (
    <div className="relative group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradients[gradient]} opacity-90`} />
      <div className="relative p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">{title}</p>
            <p className="text-3xl font-bold mt-2">{value}</p>
          </div>
          <div className="p-3 bg-white/20 rounded-2xl">
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}