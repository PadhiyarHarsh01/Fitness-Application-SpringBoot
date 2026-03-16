import React from "react";

export default function MilestoneCard({ streak }) {
  if (streak < 7) return null;

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl">
      <img
        src="/images/success-celebration.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative bg-gradient-to-br from-black/70 to-black/40 p-8 text-center text-white">
        <p className="text-sm uppercase tracking-wide">Milestone Achieved</p>
        <p className="text-3xl font-bold mt-2">{streak} Day Streak 🔥</p>
      </div>
    </div>
  );
}