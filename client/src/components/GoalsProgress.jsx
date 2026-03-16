import React from "react";
import { addWaterIntake } from "../api/dashboardApi";
import { toast } from "react-toastify";

export default function GoalsProgress({goals, onWaterAdded}) {

  if (!goals) return null;

  const clamp = (v) => Math.min(100, Math.max(0, v));

  const items = [
    {
      label: "Calories",
      value: `${goals.calories.current} / ${goals.calories.goal}`,
      progress: clamp(goals.calories.progress)
    },
    {
      label: "Steps",
      value: `${goals.steps.current} / ${goals.steps.goal}`,
      progress: clamp(goals.steps.progress)
    }
  ];

  const addWater = async () => {
    try {
      await addWaterIntake();
      onWaterAdded();
    } catch (error) {
      toast.error("Error adding water intake");
    }
  }

  return (
     <div className="bg-gradient-to-br from-emerald-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl overflow-hidden">
      <h3 className="text-xl font-bold mb-6">Today’s Goals</h3>

      {items.map((g) => (
        <div key={g.label} className="mb-5">
          <div className="flex justify-between text-sm mb-2">
            <span>{g.label}</span>
            <span className="font-semibold">{g.value}</span>
          </div>

          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${g.progress}%` }}
            />
          </div>
        </div>
      ))}

      {/* WATER SECTION */}
      <div className="mt-6">
        <div className="flex justify-between items-center text-sm mb-2">
          <span>Water</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold">
              {goals.water.current} / {goals.water.goal} glasses
            </span>
            <button
              onClick={addWater}
              className="bg-white text-indigo-600 font-bold rounded-full w-7 h-7 flex items-center justify-center hover:scale-105 transition"
            >
              +
            </button>
          </div>
        </div>

        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-white h-2 rounded-full transition-all duration-500"
            style={{ width: `${clamp(goals.water.progress)}%` }}
          />
        </div>
      </div>
    </div>
  );
}