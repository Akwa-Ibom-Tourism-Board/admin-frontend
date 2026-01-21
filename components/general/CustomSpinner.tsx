import React from "react";

interface CustomSpinnerProps {
  spinnerColor?: string;
  title?: string;
  isShowTitle?: boolean;
  spinnerHeight?: string;
  spinnerWidth?:string;
}

export const CustomSpinner: React.FC<CustomSpinnerProps> = ({
  spinnerColor = "white",
  title = "Processing...",
  isShowTitle = true,
  spinnerHeight="16px",
  spinnerWidth="16px"
}) => {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className={`w-4 h-4 border-2 rounded-full animate-spin`}
        style={{ borderColor: spinnerColor, borderTopColor: "transparent", height: spinnerHeight, width:spinnerWidth}}
      ></div>
      {isShowTitle && (
        <span className="font-medium" style={{ color: spinnerColor }}>
          {title}
        </span>
      )}
    </div>
  );
};
