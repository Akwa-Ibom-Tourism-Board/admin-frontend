/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/components/Entities.tsx
import { useEffect, useState } from "react";
import {
  Search,
  Filter,
  Building2,
  Utensils,
  Wine,
  Sofa,
  MapPin,
  Compass,
  Briefcase,
  Users,
} from "lucide-react";
import {
  useApproveEstablishmentRegistration,
  useGetEstablishments,
} from "@/services/establishments/mutation";
import EntityModal from "./EntityModal";
import { Alerts, useAlert } from "next-alert";
import StatusModal from "../StatusModal";

const Entities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterLGA, setFilterLGA] = useState<string>("all");
  const [entitiesData, setEntitiesData] = useState<any[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusModal, setStatusModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });

  const { addAlert } = useAlert();

  const { data: allEntities, isPending: entitiesLoading } =
    useGetEstablishments();

  const { mutate: approveEntity, isPending: approvalLoading } =
    useApproveEstablishmentRegistration();

  console.log("data", allEntities);

  useEffect(() => {
    if (allEntities?.data) {
      setEntitiesData(allEntities.data);
    }
  }, [allEntities]);

  const filteredEntities = entitiesData.filter((entity) => {
    const matchesSearch =
      entity.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entity.localGovernment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      filterType === "all" || entity.entityType === filterType;
    const matchesLGA =
      filterLGA === "all" || entity.localGovernment === filterLGA;

    return matchesSearch && matchesType && matchesLGA;
  });

  const getTypeIcon = (type: string) => {
    const iconProps = { className: "w-4 h-4", color: "black" };

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

  const handleApproveEntity = (entityId: string) => {
    approveEntity(entityId, {
      onSuccess: () => {
        setStatusModal({
          isOpen: true,
          type: "success",
          title: "Success!",
          message: "Process completed successfully.",
        });
      },
      onError: (error) => {
        console.error("Error approving entity:", error);
        setStatusModal({
          isOpen: true,
          type: "error",
          title: "Error",
          message:
            error?.response?.data?.message ||
            "An error occurred during approval, please try again. If error persists, please contact IT Team.",
        });
      },
    });
  };

  const getStatusColor = (status: string) => {
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

  return (
    <div className="pt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2a2523] mb-2">
          Entity Management
        </h1>
        <p className="text-[#78716e]">
          Manage and view all registered hospitality entities
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#78716e] w-4 h-4" />
            <input
              type="text"
              placeholder="Search entities by name or local government..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-black border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border text-black border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="hotel">Hotels</option>
            <option value="restaurant">Restaurants</option>
            <option value="bar">Bars</option>
            <option value="lounge">Lounges</option>
            <option value="tour_operator">Tour Operators</option>
            <option value="travel_agent">Travel Agents</option>
            <option value="hospitality_org">Hospitality Organizations</option>
            <option value="other">Other</option>
          </select>

          <select
            value={filterLGA}
            onChange={(e) => setFilterLGA(e.target.value)}
            className="px-4 py-2 border text-black border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
          >
            <option value="all">All LGAs</option>
            <option value="Abak">Abak</option>
            <option value="Eastern Obolo">Eastern Obolo</option>
            <option value="Eket">Eket</option>
            <option value="Esit Eket">Esit Eket</option>
            <option value="Essien Udim">Essien Udim</option>
            <option value="Etim Ekpo">Etim Ekpo</option>
            <option value="Etinan">Etinan</option>
            <option value="Ibeno">Ibeno</option>
            <option value="Ibesikpo Asutan">Ibesikpo Asutan</option>
            <option value="Ibiono Ibom">Ibiono Ibom</option>
            <option value="Ika">Ika</option>
            <option value="Ikono">Ikono</option>
            <option value="Ikot Abasi">Ikot Abasi</option>
            <option value="Ikot Ekpene">Ikot Ekpene</option>
            <option value="Ini">Ini</option>
            <option value="Itu">Itu</option>
            <option value="Mbo">Mbo</option>
            <option value="Mkpat Enin">Mkpat Enin</option>
            <option value="Nsit Atai">Nsit Atai</option>
            <option value="Nsit Ibom">Nsit Ibom</option>
            <option value="Nsit Ubium">Nsit Ubium</option>
            <option value="Obot Akara">Obot Akara</option>
            <option value="Okobo">Okobo</option>
            <option value="Onna">Onna</option>
            <option value="Oron">Oron</option>
            <option value="Oruk Anam">Oruk Anam</option>
            <option value="Udung Uko">Udung Uko</option>
            <option value="Ukanafun">Ukanafun</option>
            <option value="Uruan">Uruan</option>
            <option value="Urue-Offong/Oruko">Urue-Offong/Oruko</option>
            <option value="Uyo">Uyo</option>
          </select>
        </div>
      </div>

      {/* Entities Table */}
      <div className="hidden lg:block bg-white rounded-xl border border-[#e9e1d7] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#fdf8f4] border-b border-[#e9e1d7]">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#2a2523]">
                  Entity
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#2a2523]">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#2a2523]">
                  Local Government
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#2a2523]">
                  Registration Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#2a2523]">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#2a2523]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e9e1d7]">
              {filteredEntities.map((entity) => (
                <tr
                  key={entity.id}
                  className="hover:bg-[#fdf8f4] transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#2a2523]">
                        {entity.businessName}
                      </p>
                      <p className="text-sm text-[#78716e]">
                        {entity.businessEmail}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(entity.entityType)}
                      <span className="capitalize text-black">
                        {entity.entityType.replace("_", " ")}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#2a2523]">
                    {entity.localGovernment}
                  </td>
                  <td className="px-6 py-4 text-[#78716e]">
                    {new Date(entity.submittedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        entity.registrationStatus
                      )}`}
                    >
                      {entity.registrationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center gap-6">
                    <button
                      onClick={() => {
                        setSelectedEntity(entity);
                        setIsModalOpen(true);
                      }}
                      disabled={approvalLoading || entitiesLoading}
                      className="text-[#00563b] hover:cursor-pointer hover:text-[#e77818] font-medium text-sm"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleApproveEntity(entity.id)}
                      disabled={approvalLoading || entitiesLoading}
                      className={`font-medium text-sm hover:cursor-pointer transition-colors
    ${
      entity.registrationStatus === "approved"
        ? "text-red-600 hover:text-red-800"
        : "text-green-600 hover:text-green-800"
    }
    ${approvalLoading || entitiesLoading ? "opacity-50 cursor-not-allowed" : ""}
  `}
                    >
                      {approvalLoading
                        ? "Processing..."
                        : entity.registrationStatus === "approved"
                        ? "Cancel Approval"
                        : "Approve Entity"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="lg:hidden space-y-4">
        {filteredEntities.map((entity) => (
          <div
            key={entity.id}
            className="bg-white rounded-xl border border-[#e9e1d7] shadow-sm p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                {getTypeIcon(entity.entityType)}
                <div>
                  <p className="font-medium text-[#2a2523]">
                    {entity.businessName}
                  </p>
                  <p className="text-xs text-[#78716e] capitalize">
                    {entity.entityType.replace("_", " ")}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  entity.registrationStatus
                )}`}
              >
                {entity.registrationStatus}
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <p className="text-sm text-[#78716e] break-all">
                {entity.businessEmail}
              </p>
              <p className="text-sm text-[#2a2523]">
                <span className="text-[#78716e]">LGA:</span>{" "}
                {entity.localGovernment}
              </p>
              <p className="text-sm text-[#78716e]">
                Registered: {new Date(entity.submittedAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-6">
              <button
                onClick={() => {
                  setSelectedEntity(entity);
                  setIsModalOpen(true);
                }}
                disabled={approvalLoading || entitiesLoading}
                className="text-[#00563b] hover:cursor-pointer hover:text-[#e77818] font-medium text-sm"
              >
                View Details
              </button>

              <button
                onClick={() => handleApproveEntity(entity.id)}
                disabled={approvalLoading || entitiesLoading}
                className={`font-medium text-sm hover:cursor-pointer transition-colors
    ${
      entity.registrationStatus === "approved"
        ? "text-red-600 hover:text-red-800"
        : "text-green-600 hover:text-green-800"
    }
    ${approvalLoading || entitiesLoading ? "opacity-50 cursor-not-allowed" : ""}
  `}
              >
                {approvalLoading
                  ? "Processing..."
                  : entity.registrationStatus === "approved"
                  ? "Cancel Approval"
                  : "Approve Entity"}
              </button>
            </div>
          </div>
        ))}
      </div>

      <EntityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        entity={selectedEntity}
        getTypeIcon={getTypeIcon}
        getStatusColor={getStatusColor}
      />
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

export default Entities;
