import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";

// Registered once for every chart this feature renders (doughnut + bar).
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);
