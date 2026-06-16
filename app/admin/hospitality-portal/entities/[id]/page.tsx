"use client";

import { useParams, useRouter } from "next/navigation";
import { Building2, Utensils, Wine, Sofa, Compass, MapPin, Briefcase, Users, ArrowLeft, Edit } from "lucide-react";
import { useGetSingleEstablishment } from "@/services/establishments/mutation";
import { JSX } from "react";
import { SkeletonLoader } from "@/components/hospitality-portal/SkeletonLoader";


const EntityDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: entityData, isPending: entityLoading } = useGetSingleEstablishment(id);

  const getTypeIcon = (type: string): JSX.Element => {
    const iconProps = { className: "w-6 h-6", color: "#2a2523" };

    switch (type) {
      case "hotel":
        return <Building2 {...iconProps} />;
      case "restaurant":
        return <Utensils {...iconProps} />;
      case "bar":
        return <Wine {...iconProps} />;
      case "lounge":
        return <Sofa {...iconProps} />;
      case "tour_operator":
        return <Compass {...iconProps} />;
      case "travel_agent":
        return <MapPin {...iconProps} />;
      case "hospitality_org":
        return <Briefcase {...iconProps} />;
      case "other":
      default:
        return <Users {...iconProps} />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "under_review":
        return "bg-blue-100 text-blue-800";
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (entityLoading) {
    return (
      <div className="pt-16">
        <SkeletonLoader count={1} variant="row" />
      </div>
    );
  }

  if (!entityData?.data) {
    return (
      <div className="pt-16">
        <div className="bg-white rounded-xl border border-[#e9e1d7] p-8 text-center">
          <p className="text-[#78716e]">Entity not found</p>
          <button
            onClick={() => router.push("/admin/hospitality-portal/entities")}
            className="mt-4 text-[#00563b] hover:text-[#e77818]"
          >
            Back to Entities
          </button>
        </div>
      </div>
    );
  }

  const entity = entityData.data;

  return (
    <div className="mt-40">
      {/* Header with Navigation */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex cursor-pointer items-center gap-2 text-[#78716e] hover:text-[#00563b] transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
          
          <button
            onClick={() => router.push(`/admin/hospitality-portal/edit-entity/${id}`)}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-[#00563b] text-white rounded-lg hover:bg-[#004a32] transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit Entity
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-[#2a2523] mb-2">
          Entity Details
        </h1>
        <p className="text-[#78716e]">
          View complete information about the registered entity
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-xl border border-[#e9e1d7] overflow-hidden shadow-sm">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left - Icon Section */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="w-32 h-32 bg-[#fdf8f4] rounded-2xl flex items-center justify-center border-2 border-[#e9e1d7]">
                <div className="scale-[2.5]">
                  {getTypeIcon(entity.entityType)}
                </div>
              </div>
              <span
                className={`mt-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  entity.registrationStatus
                )}`}
              >
                {entity.registrationStatus.replace("_", " ")}
              </span>
            </div>

            {/* Right - Details Section */}
            <div className="flex-1 space-y-6">
              {/* Business Information */}
              <div>
                <h4 className="text-lg font-semibold text-[#2a2523] mb-3 border-b border-[#e9e1d7] pb-2">
                  Business Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Business Name</p>
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
                      {entity.entityType.replace(/_/g, " ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Year Established</p>
                    <p className="text-sm font-medium text-[#2a2523]">
                      {entity.yearEstablished || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-[#2a2523] mb-3 border-b border-[#e9e1d7] pb-2">
                  Contact Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Business Email</p>
                    <p className="text-sm font-medium text-[#2a2523] break-all">
                      {entity.businessEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Business Phone</p>
                    <p className="text-sm font-medium text-[#2a2523]">
                      {entity.businessPhoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Contact Name</p>
                    <p className="text-sm font-medium text-[#2a2523]">
                      {entity.contactName}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Contact Email</p>
                    <p className="text-sm font-medium text-[#2a2523] break-all">
                      {entity.contactEmail}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Contact Phone</p>
                    <p className="text-sm font-medium text-[#2a2523]">
                      {entity.contactPhoneNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Website</p>
                    <p className="text-sm font-medium text-[#2a2523] break-all">
                      {entity.hasWebsite && entity.website ? (
                        <a 
                          href={entity.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[#00563b] hover:text-[#e77818]"
                        >
                          {entity.website}
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div>
                <h4 className="text-lg font-semibold text-[#2a2523] mb-3 border-b border-[#e9e1d7] pb-2">
                  Location Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <p className="text-xs text-[#78716e] mb-1">Address</p>
                    <p className="text-sm font-medium text-[#2a2523] break-words">
                      {entity.address}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Local Government</p>
                    <p className="text-sm font-medium text-[#2a2523]">
                      {entity.localGovernment}
                    </p>
                  </div>
                </div>
              </div>

              {/* Facility Information */}
              {(entity.roomCount || entity.bedSpaces || entity.seatingCapacity || 
                entity.facilities?.length > 0 || entity.serviceTypes?.length > 0) && (
                <div>
                  <h4 className="text-lg font-semibold text-[#2a2523] mb-3 border-b border-[#e9e1d7] pb-2">
                    Facility Information
                  </h4>
                  <div className="space-y-4">
                    {(entity.roomCount || entity.bedSpaces || entity.seatingCapacity) && (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {entity.roomCount && (
                          <div>
                            <p className="text-xs text-[#78716e] mb-1">Room Count</p>
                            <p className="text-sm font-medium text-[#2a2523]">
                              {entity.roomCount}
                            </p>
                          </div>
                        )}
                        {entity.bedSpaces && (
                          <div>
                            <p className="text-xs text-[#78716e] mb-1">Bed Spaces</p>
                            <p className="text-sm font-medium text-[#2a2523]">
                              {entity.bedSpaces}
                            </p>
                          </div>
                        )}
                        {entity.seatingCapacity && (
                          <div>
                            <p className="text-xs text-[#78716e] mb-1">Seating Capacity</p>
                            <p className="text-sm font-medium text-[#2a2523]">
                              {entity.seatingCapacity}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {entity.facilities?.length > 0 && (
                      <div>
                        <p className="text-xs text-[#78716e] mb-2">Facilities</p>
                        <div className="flex flex-wrap gap-2">
                          {entity.facilities.map((facility: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {entity.serviceTypes?.length > 0 && (
                      <div>
                        <p className="text-xs text-[#78716e] mb-2">Service Types</p>
                        <div className="flex flex-wrap gap-2">
                          {entity.serviceTypes.map((service: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Registration Information */}
              <div>
                <h4 className="text-lg font-semibold text-[#2a2523] mb-3 border-b border-[#e9e1d7] pb-2">
                  Registration Information
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Submitted At</p>
                    <p className="text-sm font-medium text-[#2a2523]">
                      {new Date(entity.submittedAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#78716e] mb-1">Phone Verified</p>
                    <p className="text-sm font-medium text-[#2a2523]">
                      {entity.phoneVerified ? "Yes" : "No"}
                    </p>
                  </div>
                  {entity.approvedAt && (
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">Approved At</p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {new Date(entity.approvedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                  {entity.approvedBy && (
                    <div>
                      <p className="text-xs text-[#78716e] mb-1">Approved By</p>
                      <p className="text-sm font-medium text-[#2a2523]">
                        {entity.approvedBy}
                      </p>
                    </div>
                  )}
                  {entity.rejectionReason && (
                    <div className="sm:col-span-2">
                      <p className="text-xs text-[#78716e] mb-1">Rejection Reason</p>
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
      </div>
    </div>
  );
};

export default EntityDetailsPage;