import axios from "axios";
import { removeToken } from "../utils/jwt";

const api = axios.create({
  baseURL: import.meta.env.VITE_SPRING_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}); 

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url;
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = "/login";
    }

    if (error.response?.status === 403 && (url.includes("/api/dashboard") || url.includes("/api/user"))) {
      window.dispatchEvent(new Event("profile-required"));
    }
    
    return Promise.reject(error);
  }
);

export default api;