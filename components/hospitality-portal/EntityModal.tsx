/* eslint-disable @typescript-eslint/no-explicit-any */
import { X } from "lucide-react";
import { JSX, useEffect } from "react";

interface EntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  entity: any;
  getTypeIcon: (type: string) => JSX.Element;
  getStatusColor: (status: string) => string;
}

const EntityModal = ({
  isOpen,
  onClose,
  entity,
  getTypeIcon,
  getStatusColor,
}: EntityModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !entity) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Backdrop */}
         <div
      className="fixed inset-0 bg-gray-900/50 bg-opacity-75 z-40"
      onClick={onClose}
    />

        {/* Modal */}
           <div className="relative z-50 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
      {/* Header */}
          <div className="bg-[#fdf8f4] px-4 sm:px-6 py-4 border-b border-[#e9e1d7] flex justify-between items-center">
            <h3 className="text-lg sm:text-xl font-bold text-[#2a2523]">
              Entity Details
            </h3>
            <button
              onClick={onClose}
              className="text-[#78716e] hover:cursor-pointer hover:text-[#2a2523] transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-4 sm:px-6 py-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left - Icon Section */}
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-[#fdf8f4] rounded-2xl flex items-center justify-center border-2 border-[#e9e1d7]">
                  <div className="scale-[2] sm:scale-[2.5]">
                    {getTypeIcon(entity.entityType)}
                  </div>
                </div>
                <span
                  className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    entity.registrationStatus
                  )}`}
                >
                  {entity.registrationStatus}
                </span>
              </div>

              {/* Right - Details Section */}
              <div className="flex-1 space-y-6">
                {/* Business Information */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#2a2523] mb-3">
                    Business Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Business Name
                      </p>
                      <p className="text-sm font-medium text-[#2a2523] break-words">
                        {entity.businessName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">Business ID</p>
                      <p className="text-sm font-medium text-[#2a2523] break-all">
                        {entity.uniqueBusinessId}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">Entity Type</p>
                      <p className="text-sm font-medium text-[#2a2523] capitalize">
                        {entity.entityType.replace("_", " ")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Year Established
                      </p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {entity.yearEstablished || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#2a2523] mb-3">
                    Contact Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Business Email
                      </p>
                      <p className="text-sm font-medium text-[#2a2523] break-all">
                        {entity.businessEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Business Phone
                      </p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {entity.businessPhoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Contact Name
                      </p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {entity.contactName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Contact Email
                      </p>
                      <p className="text-sm font-medium text-[#2a2523] break-all">
                        {entity.contactEmail}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Contact Phone
                      </p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {entity.contactPhoneNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">Website</p>
                      <p className="text-sm font-medium text-[#2a2523] break-all">
                        {entity.hasWebsite && entity.website
                          ? entity.website
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#2a2523] mb-3">
                    Location Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">Address</p>
                      <p className="text-sm font-medium text-[#2a2523] break-words">
                        {entity.address}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Local Government
                      </p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {entity.localGovernment}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Facility Information */}
                {(entity.roomCount ||
                  entity.bedSpaces ||
                  entity.seatingCapacity) && (
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-[#2a2523] mb-3">
                      Facility Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {entity.roomCount && (
                        <div>
                          <p className="text-xs text-[#78716e] mb-1">
                            Room Count
                          </p>
                          <p className="text-sm font-medium text-[#2a2523]">
                            {entity.roomCount}
                          </p>
                        </div>
                      )}
                      {entity.bedSpaces && (
                        <div>
                          <p className="text-xs text-[#78716e] mb-1">
                            Bed Spaces
                          </p>
                          <p className="text-sm font-medium text-[#2a2523]">
                            {entity.bedSpaces}
                          </p>
                        </div>
                      )}
                      {entity.seatingCapacity && (
                        <div>
                          <p className="text-xs text-[#78716e] mb-1">
                            Seating Capacity
                          </p>
                          <p className="text-sm font-medium text-[#2a2523]">
                            {entity.seatingCapacity}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Registration Information */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-[#2a2523] mb-3">
                    Registration Information
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Submitted At
                      </p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {new Date(entity.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">
                        Phone Verified
                      </p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {entity.phoneVerified ? "Yes" : "No"}
                      </p>
                    </div>
                    {entity.approvedAt && (
                      <div>
                        <p className="text-xs text-[#78716e] mb-1">
                          Approved At
                        </p>
                        <p className="text-sm font-medium text-[#2a2523]">
                          {new Date(entity.approvedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                    {entity.rejectionReason && (
                      <div className="sm:col-span-2">
                        <p className="text-xs text-[#78716e] mb-1">
                          Rejection Reason
                        </p>
                        <p className="text-sm font-medium text-red-600 break-words">
                          {entity.rejectionReason}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#fdf8f4] px-4 sm:px-6 py-4 border-t border-[#e9e1d7] flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full hover:cursor-pointer sm:w-auto px-6 py-2 border border-[#e9e1d7] text-[#2a2523] rounded-lg hover:bg-white transition-colors"
            >
              Close
            </button>
            {/* <button className="w-full sm:w-auto px-6 py-2 bg-[#00563b] text-white rounded-lg hover:bg-[#004730] transition-colors">
              Edit Entity
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntityModal;
