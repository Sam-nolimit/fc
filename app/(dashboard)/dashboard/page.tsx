"use client";

import { useEffect, useState } from "react";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  CreditCard,
  Download,
  Filter,
} from "lucide-react";
import StatCard from "@/app/components/dashboard/stat-card";
import ChartCard from "@/app/components/dashboard/chart-card";
import RecentOrders from "@/app/components/dashboard/recent-orders";
import { Button } from "@/app/components/ui/button";
import PieChart from "@/app/components/charts/piechart";
import OrdersLineChart from "@/app/components/charts/orders-line-chart";

export default function DashboardPage() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const fullName =
          parsed.name ||
          `${parsed.firstName || ""} ${parsed.lastName || ""}`.trim() ||
          parsed.email?.split("@")[0] ||
          "User";
        setUserName(fullName);
      } catch (err) {
        console.error("Error parsing user data:", err);
      }
    }
  }, []);

  const categories = [
    { name: "Veggies", value: 67, color: "#FEA821" },
    { name: "Dairy", value: 27, color: "#002D00" },
    { name: "Fruits", value: 11, color: "#04792C" },
    { name: "Livestock", value: 21, color: "#06C949" },
  ];

  const pieChartData = {
    labels: categories.map((cat) => cat.name),
    datasets: [
      {
        data: categories.map((cat) => cat.value),
        backgroundColor: categories.map((cat) => cat.color),
        borderColor: categories.map(() => "#FFFFFF"),
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome {userName},
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your store today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Sales" value="₦200,567.09" />
        <StatCard title="Customers" value="45,609" change="+2.5%" trend="up" />
        <StatCard title="Farmers" value="1,609" change="-1.8%" trend="down" />
        <StatCard title="Total Orders" value="678" change="+2.5%" trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Orders">
          <div className="h-72">
            <OrdersLineChart />
          </div>
        </ChartCard>

        <ChartCard title="Product Categories">
          <div className="h-64">
            <PieChart
              data={pieChartData}
              options={{
                plugins: {
                  legend: {
                    position: "right",
                    labels: {
                      usePointStyle: true,
                      pointStyle: "circle",
                      padding: 20,
                      font: {
                        size: 12,
                        weight: 500,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || "";
                        const value = context.parsed;
                        const total = context.dataset.data.reduce(
                          (a: number, b: number) => a + b,
                          0,
                        );
                        const percentage = Math.round((value / total) * 100);
                        return `${label}: ${value}% (${percentage}% of total)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </ChartCard>
      </div>

      <RecentOrders />
    </div>
  );
}
