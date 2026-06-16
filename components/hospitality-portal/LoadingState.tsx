import React from "react";
import { CustomSpinner } from "@/components/general/CustomSpinner";

interface LoadingStateProps {
  title?: string;
  message?: string;
  fullHeight?: boolean;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  title = "Loading",
  message = "Please wait...",
  fullHeight = false,
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${
        fullHeight ? "min-h-screen" : "py-12"
      }`}
    >
      <CustomSpinner
        spinnerColor="#00563b"
        title=""
        isShowTitle={false}
        spinnerHeight="32px"
        spinnerWidth="32px"
      />
      <div className="text-center">
        <h3 className="text-lg font-medium text-[#2a2523] mb-2">{title}</h3>
        <p className="text-sm text-[#78716e]">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
