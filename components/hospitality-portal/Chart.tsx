// app/admin/components/Chart.tsx
"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: number[];
  labels: string[];
  type: "line" | "bar" | "doughnut";
  color?: string;
  colors?: string[];
}

const Chart = ({ data, labels, type, color = "#00563b", colors }: ChartProps) => {
  const getChartOptions = (): ChartOptions<"bar" | "line" | "doughnut"> => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
    scales: type === "doughnut" ? undefined : {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#f3f4f6",
        },
      },
    },
  });

  const getChartData = (): ChartData<"bar" | "line" | "doughnut"> => {
    if (type === "doughnut") {
      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: colors || [color],
            borderColor: "#ffffff",
            borderWidth: 2,
            hoverOffset: 8,
          },
        ],
      };
    }

    return {
      labels,
      datasets: [
        {
          label: "Count",
          data,
          backgroundColor: type === "bar" ? color : "transparent",
          borderColor: color,
          borderWidth: type === "line" ? 3 : 0,
          pointBackgroundColor: color,
          pointBorderColor: "#ffffff",
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          fill: type === "line",
          tension: type === "line" ? 0.1 : 0,
        },
      ],
    };
  };

  const renderChart = () => {
    if (type === "bar") {
      const chartData = getChartData() as ChartData<"bar">;
      const chartOptions = getChartOptions() as ChartOptions<"bar">;
      return <Bar data={chartData} options={chartOptions} />;
    }
    if (type === "line") {
      const chartData = getChartData() as ChartData<"line">;
      const chartOptions = getChartOptions() as ChartOptions<"line">;
      return <Line data={chartData} options={chartOptions} />;
    }
    if (type === "doughnut") {
      const chartData = getChartData() as ChartData<"doughnut">;
      const chartOptions = getChartOptions() as ChartOptions<"doughnut">;
      return <Doughnut data={chartData} options={chartOptions} />;
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      {renderChart()}
    </div>
  );
};

export default Chart;