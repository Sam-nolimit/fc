"use client";

import { TrendingUp, Users, ShoppingBag, CreditCard } from "lucide-react";
import StatCard from "@/app/components/dashboard/stat-card";
import ChartCard from "@/app/components/dashboard/chart-card";
import RecentOrders from "@/app/components/dashboard/recent-orders";
import { Button } from "@/app/components/ui/button";
import { Download, Filter } from "lucide-react";

export default function DashboardPage() {
  const weeklyData = [100, 200, 150, 300, 250, 400, 350];
  const categories = [
    { name: "Veggies", value: 35, color: "bg-green-500" },
    { name: "Dairy", value: 25, color: "bg-blue-500" },
    { name: "Fruits", value: 20, color: "bg-orange-500" },
    { name: "Livestock", value: 20, color: "bg-red-500" },
  ];

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
          icon={<CreditCard className="text-gray-600" size={24} />}
        />
        <StatCard
          title="Customers"
          value="45,609"
          change="+2.5%"
          trend="up"
          icon={<Users className="text-gray-600" size={24} />}
        />
        <StatCard
          title="Farmers"
          value="1,609"
          change="-1.8%"
          trend="down"
          icon={<Users className="text-gray-600" size={24} />}
        />
        <StatCard
          title="Total Orders"
          value="678"
          change="+2.5% from yesterday"
          trend="up"
          icon={<ShoppingBag className="text-gray-600" size={24} />}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Orders Chart */}
        <ChartCard
          title="Orders"
          action={
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download size={16} className="mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Filter size={16} />
              </Button>
            </div>
          }
        >
          <div className="h-64">
            <div className="flex items-end h-48 gap-1">
              {weeklyData.map((value, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-green-500 rounded-t-lg"
                    style={{ height: `${(value / 500) * 100}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-2">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-500">
              <span>1k+</span>
              <span>500</span>
              <span>150</span>
              <span>100</span>
              <span>50</span>
              <span>10</span>
            </div>
          </div>
        </ChartCard>

        {/* Product Categories */}
        <ChartCard title="Product Categories">
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <span className="text-sm font-medium">{category.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${category.color}`}
                      style={{ width: `${category.value}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-8">{category.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  );
}