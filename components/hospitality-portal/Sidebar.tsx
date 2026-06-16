"use client";

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
import { useRouter, usePathname } from "next/navigation";
import { useAlert } from "next-alert";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  portalType?: "hospitality" | "core";
}

const Sidebar = ({ isOpen, onClose, portalType = "hospitality" }: SidebarProps) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { addAlert } = useAlert();
  const router = useRouter();
  const pathname = usePathname();

  const hospitalityMenu = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      href: "/admin/hospitality-portal",
    },
    {
      id: "create-entity",
      label: "Register Entity",
      icon: FileText,
      href: "/admin/hospitality-portal/register-entity",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/hospitality-portal/analytics",
    },
    {
      id: "entities",
      label: "Entities",
      icon: Building2,
      href: "/admin/hospitality-portal/entities",
    },
    {
      id: "reports",
      label: "Reports",
      icon: Download,
      href: "/admin/hospitality-portal/reports",
    },
  ];

  const coreMenu = [
    {
      id: "overview",
      label: "Overview",
      icon: LayoutDashboard,
      href: "/admin/core",
    },
    {
      id: "content",
      label: "Content",
      icon: FileText,
      href: "/admin/core/content",
    },
    {
      id: "news",
      label: "News",
      icon: Globe,
      href: "/admin/core/news",
    },
    {
      id: "events",
      label: "Events",
      icon: Calendar,
      href: "/admin/core/events",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      href: "/admin/core/analytics",
    },
  ];

  const menuItems = portalType === "hospitality" ? hospitalityMenu : coreMenu;

  const handleLogout = () => {
    setLogoutLoading(true);
    localStorage.clear();
    addAlert("Goodbye", `See you again soon`, "success");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  // const isActive = (href: string) => {
  //   if (href === "/admin/hospitality" && pathname === "/admin/hospitality") {
  //     return true;
  //   }
  //   if (href === "/admin/core" && pathname === "/admin/core") {
  //     return true;
  //   }
  //   return pathname === href || pathname?.startsWith(`${href}/`);
  // };

  const isActive = (href: string) => {
  // Exact match for overview/home page
  if (href === "/admin/hospitality-portal" || href === "/admin/core") {
    return pathname === href;
  }
  
  // For other routes, check exact match or if it's a child route
  return pathname === href || pathname?.startsWith(`${href}/`);
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
              {portalType === "hospitality" ? "Hospitality" : "Core Website"} Menu
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
              const active = isActive(item.href);

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-all duration-200 text-left
                      ${
                        active
                          ? "bg-[#00563b] text-white shadow-md"
                          : "text-[#2a2523] hover:bg-[#fdf8f4] hover:text-[#00563b]"
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                className="hover:bg-[#fdf8f4] hover:cursor-pointer hover:text-[#00563b] text-left w-full flex items-center gap-3 px-4 py-3 rounded-lg text-[#2a2523]"
                onClick={() => setShowLogoutModal(true)}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 flex flex-col gap-6">
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Confirm Logout
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Are you sure you want to log out?
              </p>
            </div>

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