"use client";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Pie } from "react-chartjs-2";

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  options?: ChartOptions<"pie">;
}

export default function PieChart({ data, options }: PieChartProps) {
  const defaultOptions: ChartOptions<"pie"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          boxWidth: 12,
          padding: 15,
          font: {
            size: 12,
            family: "Inter, sans-serif",
          },
          color: "#374151",
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
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
            const label = context.label || "";
            const value = context.raw as number;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value}% (${percentage}% of total)`;
          },
        },
      },
    },
    cutout: "0%", // Makes it a doughnut chart, remove for regular pie
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="relative h-64">
      <Pie data={data} options={mergedOptions} />
    </div>
  );
}