// app/admin/components/Analytics.tsx
import { useState } from "react";
import Chart from "./Chart";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );

  const registrationData = {
    week: [65, 78, 90, 81, 56, 55, 40],
    month: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 80, 90],
    year: [
      1200, 1900, 3000, 5000, 2000, 3000, 4500, 3200, 4800, 5200, 6000, 7500,
    ],
  };

  const entityDistribution = {
    labels: [
      "Hotels",
      "Restaurants",
      "Bars",
      "Lounges",
      "Tour Operators",
      "Others",
    ],
    data: [543, 389, 215, 100, 150, 250],
  };

  const localGovernmentData = {
    // labels: ["Uyo", "Eket", "Ikot Ekpene", "Oron", "Abak", "Others"],
    labels: [
      "Abak",
      "Eastern Obolo",
      "Eket",
      "Esit Eket",
      "Essien Udim",
      "Etim Ekpo",
      "Etinan",
      "Ibeno",
      "Ibesikpo Asutan",
      "Ibiono Ibom",
      "Ika",
      "Ikono",
      "Ikot Abasi",
      "Ikot Ekpene",
      "Ini",
      "Itu",
      "Mbo",
      "Mkpat Enin",
      "Nsit Atai",
      "Nsit Ibom",
      "Nsit Ubium",
      "Obot Akara",
      "Okobo",
      "Onna",
      "Oron",
      "Oruk Anam",
      "Udung Uko",
      "Ukanafun",
      "Uruan",
      "Urue-Offong/Oruko",
      "Uyo",
    ],
    data: [
      320, 180, 150, 120, 80, 397, 210, 160, 240, 185, 305, 90, 175, 200, 130,
      260, 310, 145, 170, 95, 400, 225, 115, 135, 190, 165, 155, 285, 140, 250,
      300,
    ],
  };

  return (
    <div className="pt-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2a2523] mb-2">
            Analytics & Insights
          </h1>
          <p className="text-[#78716e]">
            Detailed analysis of registration trends and distributions
          </p>
        </div>

        <div className="flex gap-2 bg-white rounded-lg border border-[#e9e1d7] p-1">
          {(["week", "month", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                timeRange === range
                  ? "bg-[#00563b] text-white"
                  : "text-[#78716e] hover:text-[#2a2523]"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Registration Trends */}
        <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#2a2523] mb-4">
            Registration Trends
          </h3>
          <Chart
            data={registrationData[timeRange]}
            labels={
              timeRange === "week"
                ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                : timeRange === "month"
                ? Array.from({ length: 12 }, (_, i) => `Week ${i + 1}`)
                : [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ]
            }
            type="line"
            color="#00563b"
          />
        </div>

        {/* Entity Distribution */}
        <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm">
          <h3 className="text-lg font-bold text-[#2a2523] mb-4">
            Entity Type Distribution
          </h3>
          <Chart
            data={entityDistribution.data}
            labels={entityDistribution.labels}
            type="doughnut"
            colors={[
              "#00563b",
              "#e77818",
              "#dc2626",
              "#7c3aed",
              "#059669",
              "#0369a1",
            ]}
          />
        </div>

        {/* Local Government Distribution */}
        <div className="bg-white rounded-xl border border-[#e9e1d7] p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-[#2a2523] mb-4">
            Distribution by Local Government
          </h3>
          <Chart
            data={localGovernmentData.data}
            labels={localGovernmentData.labels}
            type="bar"
            // color="#e77818"
            color="#059669"
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
