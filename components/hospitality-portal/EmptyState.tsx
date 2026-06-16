/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  message,
  action,
}: any) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {Icon && (
        <div className="mb-4 p-3 bg-[#00563b]/10 rounded-full">
          <Icon className="w-8 h-8 text-[#00563b]" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-[#2a2523] mb-2">{title}</h3>
      <p className="text-sm text-[#78716e] text-center max-w-md mb-6">
        {message}
      </p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-[#00563b] text-white rounded-lg hover:bg-[#004430] transition-colors text-sm font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
