"use client";

import { useState } from "react";
import { MoreVertical, Filter } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Order {
  id: string;
  date: string;
  customer: string;
  items: number;
  orderNumber: string;
  farm: string;
  payment: string;
  amount: number;
  status: "paid" | "processing" | "cancelled";
}

const orders: Order[] = [
  {
    id: "1",
    date: "Nov 12, 2025",
    customer: "Chijoke Okafor",
    items: 1,
    orderNumber: "1234567ABCD",
    farm: "Sunny Acres",
    payment: "Interswitch",
    amount: 18950,
    status: "paid",
  },
  {
    id: "2",
    date: "Oct 29, 2025",
    customer: "Adaobi Nwosu",
    items: 4,
    orderNumber: "4567890MNOP",
    farm: "Green Pastures",
    payment: "Debit Card",
    amount: 22300,
    status: "paid",
  },
  {
    id: "3",
    date: "Sep 04, 2025",
    customer: "Tunde Adebayo",
    items: 8,
    orderNumber: "2345678QRST",
    farm: "Whispering Pines",
    payment: "Apple Pay",
    amount: 27480,
    status: "processing",
  },
  {
    id: "4",
    date: "Aug 15, 2025",
    customer: "Ifeoma Eze",
    items: 3,
    orderNumber: "9876543IJKL",
    farm: "Golden Fields",
    payment: "Debit Card",
    amount: 31750,
    status: "paid",
  },
  {
    id: "5",
    date: "Jul 23, 2025",
    customer: "Emeka Nwachukwu",
    items: 4,
    orderNumber: "7654321EFGH",
    farm: "Clover Hill",
    payment: "Debit Card",
    amount: 36900,
    status: "processing",
  },
];

const statusColors = {
  paid: "bg-green-100 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function RecentOrders() {
  const [filter, setFilter] = useState("today");

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
        <div className="flex items-center gap-2">
          <select
            aria-label="Filter orders"
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <Button variant="outline" size="sm">
            <Filter size={16} />
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Customer
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Item(s)
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Order Number
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Farm
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Payment
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Amount (₦)
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-sm">{order.date}</td>
                <td className="py-3 px-4 text-sm font-medium">
                  {order.customer}
                </td>
                <td className="py-3 px-4 text-sm">{order.items}</td>
                <td className="py-3 px-4 text-sm text-gray-500">
                  {order.orderNumber}
                </td>
                <td className="py-3 px-4 text-sm">{order.farm}</td>
                <td className="py-3 px-4 text-sm">{order.payment}</td>
                <td className="py-3 px-4 text-sm font-medium">
                  {order.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm">
                  <button
                    aria-label="More actions"
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-500">Showing 1-5 of 8 orders</div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            3
          </button>
          <span className="px-2">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100">
            10
          </button>
        </div>
      </div>
    </div>
  );
}
