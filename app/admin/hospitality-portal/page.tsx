// app/admin/page.tsx
"use client";

import React, { useState } from "react";
import DashboardHeader from "@/components/hospitality-portal/DashboardHeader";
import Sidebar from "@/components/hospitality-portal/Sidebar";
import Overview from "@/components/hospitality-portal/Overview";
import Analytics from "@/components/hospitality-portal/Analytics";
import Entities from "@/components/hospitality-portal/Entities";
import Reports from "@/components/hospitality-portal/Reports";

type DashboardView = "overview" | "analytics" | "entities" | "reports";

const HospitalityDashboard = () => {
  const [activeView, setActiveView] = useState<DashboardView>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeView) {
      case "overview":
        return <Overview />;
      case "analytics":
        return <Analytics />;
      case "entities":
        return <Entities />;
      case "reports":
        return <Reports />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] to-[#fff7ec]">
      <DashboardHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        portalName="Hospitality"
      />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          activeView={activeView}
          onViewChange={setActiveView}
          onClose={() => setSidebarOpen(false)}
          portalType="hospitality"
        />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HospitalityDashboard;