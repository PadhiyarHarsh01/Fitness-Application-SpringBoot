import React from "react";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import Progress from "./pages/Progress";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import { Routes, Route, useNavigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";
import useAuthCheck from "./hooks/useAuthCheck";
import RoleRoute from "./routes/RoleRoute";
import AdminLayout from "./layouts/AdminLayout";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminAIInsights from "./pages/AdminAIInsights";
import AdminUsers from "./pages/AdminUsers";
import Feedback from "./pages/Feedback";
import AdminFeedback from "./pages/AdminFeedback";
import { ToastContainer } from "react-toastify";

const App = () => {
  useAuthCheck();
  const navigate = useNavigate();
  return (
    <>
    <Routes>
      {/* Landing Page */}
      <Route
        path="/"
        element={
          <LandingPage
            onLoginClick={() => navigate("/login")}
            onRegisterClick={() => navigate("/register")}
          />
        }
      />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/feedback" element={<Feedback />} />
        </Route>

          <Route
            element={<RoleRoute allowedRoles={["ADMIN", "SUPER_ADMIN"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="feedback" element={<AdminFeedback />} />
              {/* <Route path="analytics" element={<AdminAnalytics />} /> */}
              <Route path="ai-insights" element={<AdminAIInsights />} />
            </Route>
          </Route>
      </Route>
      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
      
    <ToastContainer
     position="top-right"
     autoClose={3000}
     hideProgressBar={false}
     newestOnTop
     closeOnClick
     pauseOnHover
     draggable
     theme="colored"/>
    </>
  );
};

export default App;
