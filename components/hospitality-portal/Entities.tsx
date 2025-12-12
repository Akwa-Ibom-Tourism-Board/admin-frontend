// app/admin/components/Entities.tsx
import { useState } from "react";
import { Search, Filter, Building2, Utensils, Wine, Users } from "lucide-react";

interface Entity {
  id: string;
  name: string;
  type: "hotel" | "restaurant" | "bar" | "lounge" | "tour_operator" | "other";
  localGovernment: string;
  registrationDate: string;
  status: "active" | "pending" | "suspended";
  contactEmail: string;
  phone: string;
}

const Entities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterLGA, setFilterLGA] = useState<string>("all");

  // Mock data - replace with actual API call
  const entities: Entity[] = [
    {
      id: "1",
      name: "Grand Uyo Hotel",
      type: "hotel",
      localGovernment: "Uyo",
      registrationDate: "2024-01-15",
      status: "active",
      contactEmail: "info@granduyo.com",
      phone: "08031234567"
    },
    // Add more mock data as needed
  ];

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entity.localGovernment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || entity.type === filterType;
    const matchesLGA = filterLGA === "all" || entity.localGovernment === filterLGA;
    
    return matchesSearch && matchesType && matchesLGA;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotel": return <Building2 className="w-4 h-4" />;
      case "restaurant": return <Utensils className="w-4 h-4" />;
      case "bar": return <Wine className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "suspended": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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
              className="w-full pl-10 pr-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
            />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="hotel">Hotels</option>
            <option value="restaurant">Restaurants</option>
            <option value="bar">Bars</option>
            <option value="lounge">Lounges</option>
            <option value="tour_operator">Tour Operators</option>
          </select>

          <select
            value={filterLGA}
            onChange={(e) => setFilterLGA(e.target.value)}
            className="px-4 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
          >
            <option value="all">All LGAs</option>
            <option value="Uyo">Uyo</option>
            <option value="Eket">Eket</option>
            <option value="Ikot Ekpene">Ikot Ekpene</option>
            {/* Add more LGA options */}
          </select>
        </div>
      </div>

      {/* Entities Table */}
      <div className="bg-white rounded-xl border border-[#e9e1d7] shadow-sm overflow-hidden">
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
                <tr key={entity.id} className="hover:bg-[#fdf8f4] transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-[#2a2523]">{entity.name}</p>
                      <p className="text-sm text-[#78716e]">{entity.contactEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(entity.type)}
                      <span className="capitalize">{entity.type.replace('_', ' ')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#2a2523]">
                    {entity.localGovernment}
                  </td>
                  <td className="px-6 py-4 text-[#78716e]">
                    {new Date(entity.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(entity.status)}`}>
                      {entity.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-[#00563b] hover:text-[#e77818] font-medium text-sm">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Entities;