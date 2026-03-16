import MobileNavbar from "../components/MobileNavbar";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export default function AppLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", {replace : true});
  };

  return (
     <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col">
        <MobileNavbar onLogout={handleLogout} />
      
      {/* PAGE CONTENT */}
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
      </div>
    </div>
  );
}
