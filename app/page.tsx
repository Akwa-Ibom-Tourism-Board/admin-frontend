// app/admin/page.tsx
"use client";

import { useState } from "react";
import { Building2, Globe, ArrowRight, Shield } from "lucide-react";

const AdminLanding = () => {
  const [selectedPortal, setSelectedPortal] = useState<string>("");

  const handlePortalSelect = (portal: string) => {
    setSelectedPortal(portal);

    // Redirect after selection with a slight delay for better UX
    setTimeout(() => {
      if (portal === "hospitality") {
        window.location.href = "/admin/hospitality-portal";
      } else if (portal === "core") {
        window.location.href = "/admin/core-website";
      }
    }, 500);
  };

  const portals = [
    {
      id: "hospitality",
      title: "Hospitality Portal",
      description:
        "Manage hotels, restaurants, bars, and tourism businesses registration and compliance",
      icon: Building2,
      color: "#00563b",
      gradient: "from-[#00563b] to-[#004a32]",
      features: [
        "Entity Registration Management",
        "Compliance Monitoring",
        "Tourism Business Analytics",
        "License & Permit Processing",
      ],
      path: "/admin/hospitality-portal",
    },
    {
      id: "core",
      title: "Core Website Admin",
      description:
        "Manage main website content, news, events, and public-facing information",
      icon: Globe,
      color: "#e77818",
      gradient: "from-[#e77818] to-[#d4690f]",
      features: [
        "Content Management System",
        "News & Article Publishing",
        "Event Management",
        "Website Analytics",
      ],
      path: "/admin/core-website",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf8f4] to-[#fff7ec]">
      {/* Header */}
      <header className="w-full bg-white border-b border-[#e9e1d7] shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#00563b] shadow-glow">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#2a2523]">
                  Akwa Ibom State Hotel and Tourism Board
                </h1>
                <p className="text-sm text-[#78716e]">
                  Secure Admin Portal Access
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-[#2a2523]">
                  Administrator
                </p>
                <p className="text-xs text-[#78716e]">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#00563b] flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#00563b] to-[#e77818] flex items-center justify-center shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2a2523] mb-4">
            Admin Portal Access
          </h1>
          <p className="text-xl text-[#78716e] max-w-2xl mx-auto leading-relaxed">
            Select the administration portal you want to access. Each portal
            provides specialized tools for managing different aspects of the
            Akwa Ibom State digital ecosystem.
          </p>
        </div>

        {/* Portal Selection Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {portals.map((portal) => {
            const Icon = portal.icon;
            const isSelected = selectedPortal === portal.id;

            return (
              <div
                key={portal.id}
                className={`
                  relative bg-white rounded-2xl border-2 p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group
                  ${
                    isSelected
                      ? "border-[#00563b] scale-105 shadow-xl"
                      : "border-[#e9e1d7] hover:border-[#00563b]"
                  }
                `}
                onClick={() => handlePortalSelect(portal.id)}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00563b] rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}

                {/* Portal Icon */}
                <div
                  className={`
                  w-16 h-16 rounded-xl mb-6 flex items-center justify-center transition-all duration-300
                  ${
                    isSelected
                      ? "bg-gradient-to-br " + portal.gradient + " shadow-lg"
                      : "bg-[#fdf8f4] group-hover:bg-gradient-to-br group-hover:" +
                        portal.gradient
                  }
                `}
                >
                  <Icon
                    className={`
                    w-8 h-8 transition-colors duration-300
                    ${
                      isSelected
                        ? "text-white"
                        : "text-[#78716e] group-hover:text-white"
                    }
                  `}
                  />
                </div>

                {/* Portal Content */}
                <div className="text-left">
                  <h3
                    className={`
                    text-2xl font-bold mb-3 transition-colors duration-300
                    ${
                      isSelected
                        ? "text-[#00563b]"
                        : "text-[#2a2523] group-hover:text-[#00563b]"
                    }
                  `}
                  >
                    {portal.title}
                  </h3>

                  <p className="text-[#78716e] mb-6 leading-relaxed">
                    {portal.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-8">
                    {portal.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-sm text-[#78716e]"
                      >
                        <div
                          className={`
                          w-2 h-2 rounded-full transition-colors duration-300
                          ${
                            isSelected
                              ? "bg-[#00563b]"
                              : "bg-[#e9e1d7] group-hover:bg-[#00563b]"
                          }
                        `}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Action Button */}
                  <div
                    className={`
                    flex items-center justify-between p-4 rounded-lg border transition-all duration-300
                    ${
                      isSelected
                        ? "bg-[#00563b] text-white border-[#00563b]"
                        : "bg-[#fdf8f4] border-[#e9e1d7] group-hover:bg-[#00563b] group-hover:text-white group-hover:border-[#00563b]"
                    }
                  `}
                  >
                    <span className="font-medium">
                      {isSelected ? "Redirecting..." : "Access Portal"}
                    </span>
                    <ArrowRight
                      className={`
                      w-5 h-5 transition-transform duration-300
                      ${
                        isSelected
                          ? "translate-x-1"
                          : "group-hover:translate-x-1"
                      }
                    `}
                    />
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div
                  className={`
                  absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 transition-opacity duration-300 pointer-events-none
                  ${portal.gradient}
                  ${isSelected ? "opacity-5" : "group-hover:opacity-5"}
                `}
                />
              </div>
            );
          })}
        </div>

        {/* Security Notice */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-[#fdf8f4] border border-[#e9e1d7] rounded-xl p-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Shield className="w-5 h-5 text-[#00563b]" />
              <span className="font-semibold text-[#2a2523]">
                Secure Access
              </span>
            </div>
            <p className="text-sm text-[#78716e]">
              All admin activities are logged and monitored for security
              purposes. Ensure you log out after completing your administrative
              tasks.
            </p>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {selectedPortal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-[#00563b] border-t-transparent animate-spin" />
            <h3 className="text-lg font-semibold text-[#2a2523] mb-2">
              Redirecting to{" "}
              {portals.find((p) => p.id === selectedPortal)?.title}
            </h3>
            <p className="text-[#78716e]">
              Please wait while we securely redirect you...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLanding;
