/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/edit-entity/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Building2,
  Utensils,
  Wine,
  Sofa,
  Compass,
  MapPin,
  Briefcase,
  Users,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";
import {
  useGetSingleEstablishment,
  useUpdateEstablishment,
} from "@/services/establishments/mutation";
import SkeletonLoader from "@/components/hospitality-portal/SkeletonLoader";
import StatusModal from "@/components/StatusModal";

const EditEntityPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { mutateAsync: updateEstablishment, isPending: isUpdating } =
    useUpdateEstablishment(id);

  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const { data: entityData, isPending: entityLoading } =
    useGetSingleEstablishment(id);

  useEffect(() => {
    if (entityData?.data) {
      setFormData(entityData.data);
    }
  }, [entityData]);

  const getTypeIcon = (type: string) => {
    const iconProps = { className: "w-5 h-5", color: "#2a2523" };
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
      default:
        return <Users {...iconProps} />;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleArrayInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value.split(",").map((item) => item.trim()),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateEstablishment(formData);

      setStatusModal({
        isOpen: true,
        type: "success",
        title: "Success!",
        message: "Entity has been successfully updated.",
      });

      setTimeout(() => {
        router.push("/admin/hospitality-portal/entities");
      }, 2000);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Unable to update entity. Please try again.";

      setStatusModal({
        isOpen: true,
        type: "error",
        title: "Update Failed",
        message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (entityLoading) {
    return (
      <div className="pt-16">
        <SkeletonLoader count={1} />
      </div>
    );
  }

  if (!formData) {
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

  return (
    <div className="mt-40">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="flex cursor-pointer items-center gap-2 text-[#78716e] hover:text-[#00563b] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2a2523] mb-2">
              Edit Entity
            </h1>
            <div className="flex items-center gap-3">
              {getTypeIcon(formData.entityType)}
              <p className="text-[#78716e]">
                Editing:{" "}
                <span className="font-medium text-[#2a2523]">
                  {formData.businessName}
                </span>
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() =>
                router.push(`/admin/hospitality-portal/entities/${id}`)
              }
              className="px-4 cursor-pointer py-2 rounded-lg border border-[#e9e1d7] text-[#2a2523] hover:bg-[#fdf8f4] transition-colors"
            >
              View Entity
            </button>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#2a2523] mb-4">
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Business Name *
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Entity Type *
              </label>
              <select
                name="entityType"
                value={formData.entityType}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              >
                <option value="hotel">Hotel</option>
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar</option>
                <option value="lounge">Lounge</option>
                <option value="tour_operator">Tour Operator</option>
                <option value="travel_agent">Travel Agent</option>
                <option value="hospitality_org">
                  Hospitality Organization
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Business Email *
              </label>
              <input
                type="email"
                name="businessEmail"
                value={formData.businessEmail}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Business Phone Number *
              </label>
              <input
                type="tel"
                name="businessPhoneNumber"
                value={formData.businessPhoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Address *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Local Government *
              </label>
              <select
                name="localGovernment"
                value={formData.localGovernment}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              >
                <option value="Abak">Abak</option>
                <option value="Eket">Eket</option>
                <option value="Uyo">Uyo</option>
                {/* Add all LGAs */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Year Established *
              </label>
              <input
                type="number"
                name="yearEstablished"
                value={formData.yearEstablished}
                onChange={handleInputChange}
                required
                min="1900"
                max={new Date().getFullYear()}
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Has Website?
              </label>
              <select
                name="hasWebsite"
                value={formData.hasWebsite ? "true" : "false"}
                onChange={(e) => {
                  setFormData((prev: any) => ({
                    ...prev,
                    hasWebsite: e.target.value === "true",
                  }));
                }}
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            {formData.hasWebsite && (
              <div>
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
                />
              </div>
            )}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#2a2523] mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Contact Name *
              </label>
              <input
                type="text"
                name="contactName"
                value={formData.contactName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Contact Phone *
              </label>
              <input
                type="tel"
                name="contactPhoneNumber"
                value={formData.contactPhoneNumber}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Contact Email *
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              />
            </div>
          </div>
        </div>

        {/* Entity-Specific Fields */}
        {formData.entityType === "hotel" && (
          <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#2a2523] mb-4">
              Hotel Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Number of Rooms
                </label>
                <input
                  type="number"
                  name="roomCount"
                  value={formData.roomCount || ""}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Bed Spaces
                </label>
                <input
                  type="number"
                  name="bedSpaces"
                  value={formData.bedSpaces || ""}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Facilities (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.facilities?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayInputChange("facilities", e.target.value)
                  }
                  placeholder="e.g., WiFi, Parking, Pool, Restaurant"
                  className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
                />
              </div>
            </div>
          </div>
        )}

        {(formData.entityType === "restaurant" ||
          formData.entityType === "lounge" ||
          formData.entityType === "bar") && (
          <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[#2a2523] mb-4">
              Establishment Details
            </h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Seating Capacity
                </label>
                <input
                  type="number"
                  name="seatingCapacity"
                  value={formData.seatingCapacity || ""}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Service Types (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.serviceTypes?.join(", ") || ""}
                  onChange={(e) =>
                    handleArrayInputChange("serviceTypes", e.target.value)
                  }
                  placeholder="e.g., Dine-in, Takeaway, Delivery, Catering"
                  className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
                />
              </div>
            </div>
          </div>
        )}

        {/* Status Section */}
        {/* <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-[#2a2523] mb-4">
            Registration Status
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#2a2523] mb-2">
                Status
              </label>
              <select
                name="registrationStatus"
                value={formData.registrationStatus}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
              >
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {formData.registrationStatus === "rejected" && (
              <div>
                <label className="block text-sm font-medium text-[#2a2523] mb-2">
                  Rejection Reason
                </label>
                <textarea
                  name="rejectionReason"
                  value={formData.rejectionReason || ""}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] text-black"
                />
              </div>
            )}
          </div>
        </div> */}

        {/* Form Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 rounded-lg border border-[#e9e1d7] text-[#2a2523] hover:bg-[#fdf8f4] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading || isUpdating}
            className="px-6 py-2 rounded-lg bg-[#00563b] text-white hover:bg-[#004a32] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isLoading || isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>

      <StatusModal
        isOpen={statusModal.isOpen}
        onClose={() => setStatusModal({ ...statusModal, isOpen: false })}
        type={statusModal.type}
        title={statusModal.title}
        message={statusModal.message}
      />
    </div>
  );
};

export default EditEntityPage;
