import React, { useEffect, useState } from "react";
import { Activity, Flame, Zap, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

import MotivationBanner from "../components/MotivationBanner";
import SummaryCard from "../components/SummaryCard";
import ActivityTable from "../components/ActivityTable";
import MilestoneCard from "../components/MilestoneCard";
import GoalsProgress from "../components/GoalsProgress";
import {
  getDashboardGoals,
  getDashboardSummary,
  getRecentActivities,
} from "../api/dashboardApi";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState(null);
  const navigate = useNavigate();
  const [profileRequired, setProfileRequired] = useState(false);

  useEffect(() => {
    const handleProfileRequired = () => {
      setProfileRequired(true);
      setLoading(false);
    };

    window.addEventListener("profile-required", handleProfileRequired);

    return () => {
      window.removeEventListener("profile-required", handleProfileRequired);
    };
  }, []);

  const refreshGoals = async () => {
    try {
      const res = await getDashboardGoals();
      setGoals(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        setStats(null); // trigger profile message
        return;
      }

      toast.error("Error loading dashboard goals");
    }
  };

  // useEffect(() => {
  //   refreshGoals();
  // }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [summaryRes, activitiesRes, goalsRes] = await Promise.all([
          getDashboardSummary(),
          getRecentActivities(),
          getDashboardGoals(),
        ]);

        if (summaryRes?.data) {
          setStats(summaryRes.data);
        }

        if (activitiesRes?.data) {
          setActivities(activitiesRes.data);
        }

        if (goalsRes?.data) {
          setGoals(goalsRes.data);
        }
      } catch (err) {
        if (err.response?.status === 403) {
          setStats(null);
          setLoading(false);
          return;
        }

        toast.error("Error loading dashboard data");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-500 text-lg">
        Loading dashboard...
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center py-32">
        <div className="bg-white shadow-lg rounded-xl p-10 text-center max-w-md">
          <h2 className="text-2xl font-bold mb-3">Complete Your Profile</h2>

          <p className="text-slate-500 mb-6">
            Please complete your profile to unlock your fitness dashboard.
          </p>

          <button
            onClick={() => navigate("/profile")}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition"
          >
            Complete Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-14">
      {/* HERO / MOTIVATION */}
      <MotivationBanner />

      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold">Welcome back👋</h1>
        <p className="text-slate-500 mt-2 text-lg">
          Here’s a snapshot of your fitness journey
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Workouts"
          value={stats.totalWorkouts}
          icon={Activity}
          gradient="emerald"
        />
        <SummaryCard
          title="Calories Burned"
          value={(stats.caloriesBurned ?? 0).toLocaleString()}
          icon={Flame}
          gradient="orange"
        />
        <SummaryCard
          title="Weekly Activities"
          value={stats.weeklyActivities}
          icon={Zap}
          gradient="indigo"
        />
        <SummaryCard
          title="Current Streak"
          value={`${stats.currentStreak} days`}
          icon={TrendingUp}
          gradient="purple"
        />
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2">
          <ActivityTable activities={activities} />
        </div>

        <div className="space-y-8">
          <MilestoneCard streak={stats.currentStreak} />
          {goals && (
            <GoalsProgress
              goals={{
                calories: {
                  current: goals.caloriesCurrent,
                  goal: goals.caloriesGoal,
                  progress: goals.caloriesGoal
                    ? Math.round(
                        (goals.caloriesCurrent * 100) / goals.caloriesGoal,
                      )
                    : 0,
                },
                steps: {
                  current: goals.stepsCurrent,
                  goal: goals.stepsGoal,
                  progress: goals.stepsGoal
                    ? Math.round((goals.stepsCurrent * 100) / goals.stepsGoal)
                    : 0,
                },
                water: {
                  current: goals.waterCurrent,
                  goal: goals.waterGoal,
                  progress: goals.waterGoal
                    ? Math.round((goals.waterCurrent * 100) / goals.waterGoal)
                    : 0,
                },
              }}
              onWaterAdded={refreshGoals}
            />
          )}
        </div>
      </div>
    </div>
  );
}
