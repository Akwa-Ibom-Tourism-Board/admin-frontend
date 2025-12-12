// app/admin/components/StatCard.tsx
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  change: string;
  loading?: boolean;
}

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  change, 
  loading = false 
}: StatCardProps) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-[#f2f0ed] rounded w-1/2"></div>
          <div className="w-10 h-10 bg-[#f2f0ed] rounded-lg"></div>
        </div>
        <div className="h-8 bg-[#f2f0ed] rounded mb-2"></div>
        <div className="h-4 bg-[#f2f0ed] rounded w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#78716e] uppercase tracking-wide">
          {title}
        </h3>
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}15` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      
      <div className="mb-2">
        <p className="text-3xl font-bold text-[#2a2523]">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
      
      <p className="text-sm" style={{ color }}>
        {change}
      </p>
    </div>
  );
};

export default StatCard;