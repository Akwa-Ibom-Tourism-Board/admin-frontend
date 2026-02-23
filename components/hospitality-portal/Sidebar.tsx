// /* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/components/Sidebar.tsx
import {
  LayoutDashboard,
  BarChart3,
  Building2,
  Download,
  FileText,
  Calendar,
  Globe,
  X,
  LogOut,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAlert } from "next-alert";

type DashboardView =
  | "create-entity"
  | "overview"
  | "analytics"
  | "entities"
  | "reports";
type CoreView = "overview" | "content" | "news" | "events" | "analytics";

interface SidebarProps {
  isOpen: boolean;
  activeView: DashboardView | CoreView;
  onViewChange: (view: DashboardView | CoreView) => void;
  onClose: () => void;
  portalType?: "hospitality" | "core";
}

const Sidebar = ({
  isOpen,
  activeView,
  onViewChange,
  onClose,
  portalType = "hospitality",
}: SidebarProps) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { addAlert } = useAlert();
  const router = useRouter();
  const hospitalityMenu = [
    {
      id: "overview" as DashboardView,
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "create-entity" as DashboardView,
      label: "Register Entity",
      icon: FileText,
    },
    { id: "analytics" as DashboardView, label: "Analytics", icon: BarChart3 },
    { id: "entities" as DashboardView, label: "Entities", icon: Building2 },
    { id: "reports" as DashboardView, label: "Reports", icon: Download },
  ];

  const coreMenu = [
    { id: "overview" as CoreView, label: "Overview", icon: LayoutDashboard },
    { id: "content" as CoreView, label: "Content", icon: FileText },
    { id: "news" as CoreView, label: "News", icon: Globe },
    { id: "events" as CoreView, label: "Events", icon: Calendar },
    { id: "analytics" as CoreView, label: "Analytics", icon: BarChart3 },
  ];

  const menuItems = portalType === "hospitality" ? hospitalityMenu : coreMenu;

  const handleLogout = () => {
    setLogoutLoading(true);
    localStorage.clear();
    addAlert("Goodbye", `See you again soon`, "success");
    return router.push("/");
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
  fixed left-0 top-0 h-full w-64 bg-white border-r border-[#e9e1d7] shadow-lg
  transform transition-transform duration-300 z-50
  ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
`}
      >
        <div className="p-6 border-b border-[#e9e1d7] lg:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#2a2523]">
              {portalType === "hospitality" ? "Hospitality" : "Core Website"}{" "}
              Menu
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-[#fdf8f4] transition-colors"
            >
              <X className="w-5 h-5 text-[#78716e]" />
            </button>
          </div>
        </div>

        <nav className="p-4">
          <div className="mb-4 px-2">
            <p className="text-xs font-medium text-[#78716e] uppercase tracking-wide">
              {portalType === "hospitality"
                ? "Hospitality Management"
                : "Website Management"}
            </p>
          </div>

          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onViewChange(item.id);
                      onClose();
                    }}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200 text-left
                      ${
                        isActive
                          ? "bg-[#00563b] text-white shadow-md"
                          : "text-[#2a2523] hover:bg-[#fdf8f4] hover:cursor-pointer hover:text-[#00563b]"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              );
            })}
            <li className="text-[#2a2523]">
              <button
                className="hover:bg-[#fdf8f4] hover:cursor-pointer hover:text-[#00563b] text-left w-full flex items-center gap-3 px-4 py-3 rounded-lg"
                onClick={() => setShowLogoutModal(true)}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 flex flex-col gap-6">
            {/* Message */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Logout
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Are you sure you want to log out?
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                disabled={logoutLoading}
                className="w-full hover:cursor-pointer py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleLogout}
                disabled={logoutLoading}
                className="w-full hover:cursor-pointer py-2 rounded-md bg-red-700 text-white hover:bg-red-900 transition"
              >
                {logoutLoading ? "Loading..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
