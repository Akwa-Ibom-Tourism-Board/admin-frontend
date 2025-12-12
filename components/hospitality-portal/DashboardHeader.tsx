// app/admin/components/DashboardHeader.tsx
import { Building2, Menu, ArrowLeft } from "lucide-react";

interface DashboardHeaderProps {
  onMenuToggle: () => void;
  portalName?: string;
}

const DashboardHeader = ({
  onMenuToggle,
  portalName = "Hospitality",
}: DashboardHeaderProps) => {
  const handleBackToPortal = () => {
    window.location.href = "/";
  };

  return (
    <header className="w-full bg-white border-b border-[#e9e1d7] shadow-sm fixed top-0 z-40 lg:pl-64">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuToggle}
              className="p-2 rounded-lg hover:bg-[#fdf8f4] transition-colors lg:hidden"
            >
              <Menu className="w-6 h-6 text-[#2a2523]" />
            </button>

            {/* Back to Portal Selector */}
            <button
              onClick={handleBackToPortal}
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#fdf8f4] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-[#78716e] group-hover:text-[#00563b]" />
              <span className="text-sm text-[#78716e] group-hover:text-[#00563b]">
                Switch Portal
              </span>
            </button>

            {/* Logo and Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00563b] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-[#2a2523]">
                  {portalName} Portal
                </h1>
                <p className="text-xs text-[#78716e]">Admin Dashboard</p>
              </div>
            </div>
          </div>

          {/* Desktop Title */}
          {/* <div className="hidden lg:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#00563b] flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2a2523]">
                Akwa Ibom State {portalName} Board
              </h1>
              <p className="text-sm text-[#78716e]">Administration Portal</p>
            </div>
          </div> */}

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-[#2a2523]">Admin User</p>
              <p className="text-xs text-[#78716e]">Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#e77818] flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
