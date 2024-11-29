// app/admin/dashboard.js
"use client";

import { useUser } from "@/app/context/UserContext";
import Navigation from "@/app/components/Navigation";
import SuperAdminPanel from "@/app/components/SuperAdminPanel";
import AdministratorPanel from "@/app/components/AdministratorPanel";
import TechnicianPanel from "@/app/components/TechnicianPanel";
import ViewerPanel from "@/app/components/ViewerPanel";
import NavbarDashboard from "@/app/components/NavbarDashboard";

const Dashboard = () => {
  const { role } = useUser();

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarDashboard />
      <Navigation />
      <div className="p-6">
        {/* Render fitur berdasarkan role */}
        {role === "super-admin" && <SuperAdminPanel />}
        {role === "administrator" && <AdministratorPanel />}
        {role === "teknisi" && <TechnicianPanel />}
        {role === "viewer" && <ViewerPanel />}
      </div>
    </div>
  );
};

export default Dashboard;
