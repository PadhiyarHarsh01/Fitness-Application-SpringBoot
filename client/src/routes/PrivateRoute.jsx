import { Navigate, Outlet } from "react-router-dom";
import { getToken, isTokenExpired } from "../utils/jwt";

export default function PrivateRoute() {
  const token = getToken();

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
