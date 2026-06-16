// app/admin/hospitality/layout.tsx
"use client";

import { useState } from "react";
import DashboardHeader from "@/components/hospitality-portal/DashboardHeader";
import Sidebar from "@/components/hospitality-portal/Sidebar";

export default function HospitalityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] to-[#fff7ec]">
      <DashboardHeader
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        portalName="Hospitality Management"
      />
      
      <div className="flex">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          portalType="hospitality"
        />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}