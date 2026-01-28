"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface OrdersLineChartProps {
  data?: number[];
  labels?: string[];
}

export default function OrdersLineChart({
  data = [250, 300, 200, 350, 280, 420, 380],
  labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}: OrdersLineChartProps) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Orders",
        data: data,
        borderColor: "#06C949",
        backgroundColor: "rgba(6, 201, 73, 0.1)",
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: "#06C949",
        pointBorderColor: "#FFFFFF",
        pointBorderWidth: 2,
        pointHoverRadius: 8,
      },
    ],
  };

const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      padding: 12,
      titleFont: {
        size: 14,
        family: "Inter, sans-serif",
      },
      bodyFont: {
        size: 13,
        family: "Inter, sans-serif",
      },
      callbacks: {
        label: (context) => {
          return `Orders: ${context.parsed.y}`;
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        font: {
          size: 12,
          family: "Inter, sans-serif",
          weight: "500",
        },
        color: "#374151",
        padding: 10,
      },
      border: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      max: 500,
      grid: {
        color: "rgba(0, 0, 0, 0.05)",
        drawBorder: false,
      },
      ticks: {
        font: {
          size: 11,
          family: "Inter, sans-serif",
        },
        color: "#6B7280",
        callback: function(value) {
          // Show all Y-axis labels like in screenshot
          return value.toString();
        },
        stepSize: 50,
        padding: 8,
        // Show all tick values
        count: 11, // 0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500
      },
      border: {
        display: false,
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
  elements: {
    line: {
      borderWidth: 3,
    },
  },
};

return (
  <div className="h-72">
    <Line data={chartData} options={options} />
  </div>
);
}