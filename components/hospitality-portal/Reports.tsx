// app/admin/components/Reports.tsx
import { useState } from "react";
import { Download, FileSpreadsheet, Filter } from "lucide-react";

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState<string>("");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [localGovernment, setLocalGovernment] = useState("all");
  const [entityType, setEntityType] = useState("all");

  const reportTypes = [
    {
      id: "all_entities",
      title: "All Entities Report",
      description: "Complete list of all registered hospitality entities",
      format: "Excel"
    },
    {
      id: "hotels_only",
      title: "Hotels Only Report",
      description: "Detailed report of all registered hotels",
      format: "Excel"
    },
    {
      id: "hotels_per_lga",
      title: "Hotels per Local Government",
      description: "Breakdown of hotels distributed across local governments",
      format: "Excel"
    },
    {
      id: "monthly_registrations",
      title: "Monthly Registration Report",
      description: "New entity registrations for selected period",
      format: "Excel"
    },
    {
      id: "entity_type_distribution",
      title: "Entity Type Distribution",
      description: "Statistical breakdown by entity type",
      format: "Excel"
    },
    {
      id: "compliance_report",
      title: "Compliance Status Report",
      description: "Entities compliance status and renewal tracking",
      format: "Excel"
    }
  ];

  const handleExport = async (reportId: string) => {
    // Simulate export process
    console.log("Exporting report:", reportId, {
      dateRange,
      localGovernment,
      entityType
    });
    
    // In a real application, you would:
    // 1. Make an API call to generate the report
    // 2. Return a download link or trigger download
    // 3. Use libraries like exceljs or xlsx for Excel generation
    
    alert(`Exporting ${reportTypes.find(r => r.id === reportId)?.title}...`);
  };

  return (
    <div className="pt-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2a2523] mb-2">
          Reports & Exports
        </h1>
        <p className="text-[#78716e]">
          Generate and download comprehensive reports in Excel format
        </p>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-[#78716e]" />
          <h3 className="text-lg font-semibold text-[#2a2523]">Report Filters</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#2a2523] mb-2">
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="px-3 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="px-3 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2a2523] mb-2">
              Local Government
            </label>
            <select
              value={localGovernment}
              onChange={(e) => setLocalGovernment(e.target.value)}
              className="w-full px-3 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
            >
              <option value="all">All Local Governments</option>
              <option value="Uyo">Uyo</option>
              <option value="Eket">Eket</option>
              <option value="Ikot Ekpene">Ikot Ekpene</option>
              {/* Add more options */}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2a2523] mb-2">
              Entity Type
            </label>
            <select
              value={entityType}
              onChange={(e) => setEntityType(e.target.value)}
              className="w-full px-3 py-2 border border-[#e9e1d7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00563b] focus:border-transparent"
            >
              <option value="all">All Entity Types</option>
              <option value="hotel">Hotels</option>
              <option value="restaurant">Restaurants</option>
              <option value="bar">Bars</option>
              <option value="lounge">Lounges</option>
            </select>
          </div>
        </div>
      </div>

      {/* Report Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTypes.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#00563b] flex items-center justify-center">
                <FileSpreadsheet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-[#2a2523]">{report.title}</h3>
                <p className="text-xs text-[#78716e]">{report.format} Format</p>
              </div>
            </div>

            <p className="text-sm text-[#78716e] mb-4 line-clamp-2">
              {report.description}
            </p>

            <button
              onClick={() => handleExport(report.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#00563b] text-white rounded-lg hover:bg-[#004a32] transition-colors font-medium"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        ))}
      </div>

      {/* Bulk Export Section */}
      <div className="mt-8 bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#2a2523] mb-4">
          Bulk Data Export
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleExport("all_data")}
            className="flex items-center justify-between p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#00563b] hover:bg-[#00563b]/5 transition-all group"
          >
            <div>
              <p className="font-medium text-[#2a2523] text-left">
                Export Complete Dataset
              </p>
              <p className="text-sm text-[#78716e] text-left">
                All entities with full details
              </p>
            </div>
            <Download className="w-5 h-5 text-[#78716e] group-hover:text-[#00563b]" />
          </button>

          <button
            onClick={() => handleExport("custom_report")}
            className="flex items-center justify-between p-4 border-2 border-[#e9e1d7] rounded-lg hover:border-[#e77818] hover:bg-[#e77818]/5 transition-all group"
          >
            <div>
              <p className="font-medium text-[#2a2523] text-left">
                Custom Report Builder
              </p>
              <p className="text-sm text-[#78716e] text-left">
                Create custom reports with selected fields
              </p>
            </div>
            <FileSpreadsheet className="w-5 h-5 text-[#78716e] group-hover:text-[#e77818]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;