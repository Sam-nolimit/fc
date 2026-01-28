"use client";

import { TrendingUp, Users, ShoppingBag, CreditCard, Download, Filter } from "lucide-react";
import StatCard from "@/app/components/dashboard/stat-card";
import ChartCard from "@/app/components/dashboard/chart-card";
import RecentOrders from "@/app/components/dashboard/recent-orders";
import { Button } from "@/app/components/ui/button";
import PieChart from "@/app/components/charts/piechart";
import OrdersLineChart from "@/app/components/charts/orders-line-chart";
// or use the simple version:
// import SimpleLineChart from "@/app/components/charts/simple-line-chart";

export default function DashboardPage() {
  // Orders data - matching typical order patterns
//   const weeklyOrders = [250, 300, 200, 350, 280, 420, 380];
  
  // Product Categories Data for Pie Chart
  const categories = [
    { name: "Veggies", value: 67, color: "#FEA821" }, 
    { name: "Dairy", value: 27, color: "#002D00" },   
    { name: "Fruits", value: 11, color: "#04792C" }, 
    { name: "Livestock", value: 21, color: "#06C949" }, 
  ];

  // Prepare data for pie chart
  const pieChartData = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: categories.map(cat => cat.value),
        backgroundColor: categories.map(cat => cat.color),
        borderColor: "#FFFFFF",
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Sharon,</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your store today</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value="₦200,567.09"
          icon={<CreditCard className="text-green-600" size={20} />}
        />
        <StatCard
          title="Customers"
          value="45,609"
          change="+2.5%"
          trend="up"
          icon={<Users className="text-blue-600" size={20} />}
        />
        <StatCard
          title="Farmers"
          value="1,609"
          change="-1.8%"
          trend="down"
          icon={<Users className="text-orange-600" size={20} />}
        />
        <StatCard
          title="Total Orders"
          value="678"
          change="+2.5%"
          trend="up"
          icon={<ShoppingBag className="text-purple-600" size={20} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Line Chart */}
        <ChartCard
          title="Orders"
      
        >
          <div className="h-72">
            {/* Using Chart.js version */}
            <OrdersLineChart 
            //   data={weeklyOrders}
            />
            
            {/* Or use the simple SVG version */}
            {/* <SimpleLineChart 
              data={weeklyOrders}
              lineColor="#06C949"
              fillColor="rgba(6, 201, 73, 0.1)"
            /> */}
          </div>
        </ChartCard>

        {/* Product Categories with Pie Chart */}
        <ChartCard title="Product Categories">
          <div className="h-64">
            <PieChart
              data={pieChartData}
              options={{
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                      font: {
                        size: 12,
                        weight: '500' as const,
                      },
                    },
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
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

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}