import api from "./axios";

export const getActivities = () => api.get("/api/activities");

export const addActivity = (data) => api.post("/api/activities", data);

export const updateActivity = (id, data) => api.put(`/api/activities/${id}`, data);

export const deleteActivity = (id) => api.delete(`/api/activities/${id}`);