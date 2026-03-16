import api from "./axios";

const getDashboardSummary = () => {
  return api.get("/api/dashboard/summary");
};

const getRecentActivities = () => {
  return api.get("/api/dashboard/recent-activities");
};

const getDashboardGoals = () => {
  return api.get("/api/dashboard/goals");
}

const addWaterIntake = () => {
  return api.post("/api/water/add")
}

export { getDashboardSummary, getRecentActivities, getDashboardGoals, addWaterIntake };
