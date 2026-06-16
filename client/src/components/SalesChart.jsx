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
      },
    ],
  };

  return <Bar data={data} />;
}

export default SalesChart;