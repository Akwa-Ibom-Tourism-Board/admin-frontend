/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/core/page.tsx
"use client";

import { useState } from "react";
import DashboardHeader from "@/components/hospitality-portal/DashboardHeader";
import Sidebar from "@/components/hospitality-portal/Sidebar";
// import Cookies from "js-cookie";

// type CoreView = "overview" | "content" | "news" | "events" | "analytics";

const CoreWebsiteDashboard = () => {
  const [activeView, setActiveView] = useState<any>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  //   const handleLogout = () => {
  //   Cookies.remove("access_token");
  //   // Cookies.remove("userProfile");
  //   window.location.href = "/";
  // };

  const renderContent = () => {
    return (
      <div className="pt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2a2523] mb-2">
            Core Website Administration
          </h1>
          <p className="text-[#78716e]">
            Manage main website content, news, events, and public information
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2523] mb-2">Published Pages</h3>
            <p className="text-3xl font-bold text-[#00563b]">47</p>
            <p className="text-sm text-[#78716e]">Active pages</p>
          </div>

          <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2523] mb-2">News Articles</h3>
            <p className="text-3xl font-bold text-[#e77818]">128</p>
            <p className="text-sm text-[#78716e]">This year</p>
          </div>

          <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-[#2a2523] mb-2">Upcoming Events</h3>
            <p className="text-3xl font-bold text-[#dc2626]">12</p>
            <p className="text-sm text-[#78716e]">Next 30 days</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
          <h2 className="text-xl font-bold text-[#2a2523] mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button className="p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#00563b] hover:bg-[#00563b]/5 transition-all text-left">
              <h3 className="font-semibold text-[#2a2523] mb-1">Create News</h3>
              <p className="text-sm text-[#78716e]">Publish new article</p>
            </button>
            
            <button className="p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#e77818] hover:bg-[#e77818]/5 transition-all text-left">
              <h3 className="font-semibold text-[#2a2523] mb-1">Add Event</h3>
              <p className="text-sm text-[#78716e]">Schedule new event</p>
            </button>
            
            <button className="p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all text-left">
              <h3 className="font-semibold text-[#2a2523] mb-1">Manage Pages</h3>
              <p className="text-sm text-[#78716e]">Edit website content</p>
            </button>
            
            <button className="p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#059669] hover:bg-[#059669]/5 transition-all text-left">
              <h3 className="font-semibold text-[#2a2523] mb-1">View Analytics</h3>
              <p className="text-sm text-[#78716e]">Website performance</p>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] to-[#fff7ec]">
      <DashboardHeader 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)} 
        portalName="Core Website"
      />
      
      <div className="flex">
        {/* <Sidebar
          isOpen={sidebarOpen}
          activeView={activeView}
          onViewChange={setActiveView}
          onClose={() => setSidebarOpen(false)}
          portalType="core"
          // onLogout={handleLogout}
        /> */}
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CoreWebsiteDashboard;