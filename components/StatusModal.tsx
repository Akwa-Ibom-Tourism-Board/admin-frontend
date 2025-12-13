// components/modals/StatusModal.tsx
import { CheckCircle, XCircle, X } from "lucide-react";

interface StatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "success" | "error";
  title: string;
  message: string;
}

const StatusModal = ({ isOpen, onClose, type, title, message }: StatusModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 bg-opacity-50 z-[100]"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Icon */}
          <div className="flex justify-center mb-4">
            {type === "success" ? (
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-center text-[#2a2523] mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-center text-[#78716e] mb-6">
            {message}
          </p>

          {/* Button */}
          <button
            onClick={onClose}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              type === "success"
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default StatusModal;