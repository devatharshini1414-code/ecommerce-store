import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SalesChart({ stats }) {
  const data = {
    labels: [
      "Products",
      "Users",
      "Orders",
    ],

    datasets: [
  {
    label: "Analytics",
    data: [
      stats.totalProducts,
      stats.totalUsers,
      stats.totalOrders,
    ],
     backgroundColor: [
      "#3b82f6",
      "#10b981",
      "#f59e0b"
    ],
    borderRadius: 8
  },
],
  };
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
  },
};
 return <Bar data={data} options={options} />;
}

export default SalesChart;