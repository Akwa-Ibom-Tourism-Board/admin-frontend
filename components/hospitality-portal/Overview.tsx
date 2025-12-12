// app/admin/components/Overview.tsx
import { useState, useEffect } from "react";
import StatCard from "./StatCard";
import { 
  Building2, 
  Utensils, 
  Wine, 
  Users,
  TrendingUp,
  MapPin,
  Download,
  BarChart3
} from "lucide-react";

interface DashboardStats {
  totalEntities: number;
  hotels: number;
  restaurants: number;
  bars: number;
  lounges: number;
  registrationsThisMonth: number;
  topLocalGovernment: string;
}

const Overview = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalEntities: 0,
    hotels: 0,
    restaurants: 0,
    bars: 0,
    lounges: 0,
    registrationsThisMonth: 0,
    topLocalGovernment: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchStats = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalEntities: 1247,
        hotels: 543,
        restaurants: 389,
        bars: 215,
        lounges: 100,
        registrationsThisMonth: 47,
        topLocalGovernment: "Uyo"
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Entities",
      value: stats.totalEntities,
      icon: Building2,
      color: "#00563b",
      change: "+12% from last month"
    },
    {
      title: "Hotels",
      value: stats.hotels,
      icon: Building2,
      color: "#e77818",
      change: "+8% from last month"
    },
    {
      title: "Restaurants",
      value: stats.restaurants,
      icon: Utensils,
      color: "#dc2626",
      change: "+15% from last month"
    },
    {
      title: "Bars & Lounges",
      value: stats.bars + stats.lounges,
      icon: Wine,
      color: "#7c3aed",
      change: "+5% from last month"
    },
    {
      title: "Registrations This Month",
      value: stats.registrationsThisMonth,
      icon: TrendingUp,
      color: "#059669",
      change: "Current month progress"
    },
    {
      title: "Top Local Government",
      value: stats.topLocalGovernment,
      icon: MapPin,
      color: "#0369a1",
      change: "Most registrations"
    }
  ];

  return (
    <div className="pt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2a2523] mb-2">
          Dashboard Overview
        </h1>
        <p className="text-[#78716e]">
          Welcome to your administration dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
            change={card.change}
            loading={loading}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
        <h2 className="text-xl font-bold text-[#2a2523] mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#00563b] hover:bg-[#00563b]/5 transition-all group">
            <Download className="w-8 h-8 text-[#78716e] group-hover:text-[#00563b] mb-2" />
            <p className="font-medium text-[#2a2523]">Export All Data</p>
            <p className="text-sm text-[#78716e]">Excel format</p>
          </button>
          
          <button className="p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#e77818] hover:bg-[#e77818]/5 transition-all group">
            <Building2 className="w-8 h-8 text-[#78716e] group-hover:text-[#e77818] mb-2" />
            <p className="font-medium text-[#2a2523]">Hotel Reports</p>
            <p className="text-sm text-[#78716e]">Detailed analysis</p>
          </button>
          
          <button className="p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#dc2626] hover:bg-[#dc2626]/5 transition-all group">
            <Users className="w-8 h-8 text-[#78716e] group-hover:text-[#dc2626] mb-2" />
            <p className="font-medium text-[#2a2523]">User Management</p>
            <p className="text-sm text-[#78716e]">Admin controls</p>
          </button>
          
          <button className="p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#059669] hover:bg-[#059669]/5 transition-all group">
            <BarChart3 className="w-8 h-8 text-[#78716e] group-hover:text-[#059669] mb-2" />
            <p className="font-medium text-[#2a2523]">Generate Reports</p>
            <p className="text-sm text-[#78716e]">Custom reports</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overview;