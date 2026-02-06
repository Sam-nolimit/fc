"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Truck,
  CreditCard,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Order {
  id: number;
  orderNumber: string;
  orderDate: string;
  farmName: string;
  deliveryDate: string;
  address: string;
  items: number;
  paymentMethod: string;
  amount: string;
  status: "delivered" | "pending" | "processing" | "cancelled" | "on-hold";
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [orders] = useState<Order[]>([
    {
      id: 1,
      orderNumber: "1234567ABCD",
      orderDate: "Nov 12, 2025",
      farmName: "Chijoke Okafor",
      deliveryDate: "Nov 12, 2025",
      address: "No. 14 Idumagbo, Laq",
      items: 1,
      paymentMethod: "Interswitch",
      amount: "18,950",
      status: "delivered",
    },
    {
      id: 2,
      orderNumber: "4567890MNOP",
      orderDate: "Oct 29, 2025",
      farmName: "Adaobi Nwosu",
      deliveryDate: "Oct 29, 2025",
      address: "7 Olumo Rock Rd, Ab",
      items: 4,
      paymentMethod: "Debit Card",
      amount: "22,300",
      status: "delivered",
    },
    {
      id: 3,
      orderNumber: "2345678ORST",
      orderDate: "Sep 04, 2025",
      farmName: "Tunde Adebayo",
      deliveryDate: "Sep 04, 2025",
      address: "12 Eko Bridge, Lagos",
      items: 8,
      paymentMethod: "Apple Pay",
      amount: "27,480",
      status: "pending",
    },
    {
      id: 4,
      orderNumber: "9876543IJKL",
      orderDate: "Aug 15, 2025",
      farmName: "Ifeoma Eze",
      deliveryDate: "Aug 15, 2025",
      address: "23 Zuma Rock, Abuja",
      items: 3,
      paymentMethod: "Debit Card",
      amount: "31,750",
      status: "delivered",
    },
    {
      id: 5,
      orderNumber: "7654321EFGH",
      orderDate: "Jul 23, 2025",
      farmName: "Emeka Nwachukwu",
      deliveryDate: "Jul 23, 2025",
      address: "9 Aso Rock, Abuja",
      items: 4,
      paymentMethod: "Debit Card",
      amount: "36,900",
      status: "processing",
    },
    {
      id: 6,
      orderNumber: "3456789UVWX",
      orderDate: "Jun 07, 2025",
      farmName: "Ngozi Uche",
      deliveryDate: "Jun 07, 2025",
      address: "15 Lekki Conservatii",
      items: 7,
      paymentMethod: "Interswitch",
      amount: "42,150",
      status: "delivered",
    },
    {
      id: 7,
      orderNumber: "8765432YZAB",
      orderDate: "May 19, 2025",
      farmName: "Chinedu Obi",
      deliveryDate: "May 19, 2025",
      address: "3 Yankari Game Res",
      items: 2,
      paymentMethod: "Interswitch",
      amount: "47,880",
      status: "cancelled",
    },
    {
      id: 8,
      orderNumber: "5432101CDEF",
      orderDate: "Apr 11, 2025",
      farmName: "Amara Nnebe",
      deliveryDate: "Apr 11, 2025",
      address: "10 Obudu Mountain F",
      items: 1,
      paymentMethod: "Debit Card",
      amount: "53,200",
      status: "delivered",
    },
    {
      id: 9,
      orderNumber: "6543210GHIJ",
      orderDate: "Mar 28, 2025",
      farmName: "Obinna Chukwu",
      deliveryDate: "Mar 28, 2025",
      address: "20 Kainji National Pa",
      items: 2,
      paymentMethod: "Financing Pl",
      amount: "58,990",
      status: "on-hold",
    },
    {
      id: 10,
      orderNumber: "7890123KLMN",
      orderDate: "Feb 02, 2025",
      farmName: "Zainab Bello",
      deliveryDate: "Feb 02, 2025",
      address: "5 Ogbinike Cave, An",
      items: 5,
      paymentMethod: "Debit Card",
      amount: "64,500",
      status: "delivered",
    },
  ]);

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.amount.includes(searchTerm) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (order) => order.status === "delivered",
  ).length;

  const handleViewDetails = (order: Order) => {
    console.log("View details:", order);
    setActiveMenu(null);
    // Implement view details logic
  };

  const handleDelete = (order: Order) => {
    console.log("Delete:", order);
    setActiveMenu(null);
    // Implement delete logic
  };

  const handleExport = () => {
    console.log("Export data");
    // Implement export logic
  };

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !menuRefs.current.some(
          (ref) => ref && ref.contains(event.target as Node),
        )
      ) {
        setActiveMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="text-green-600" size={16} />;
      case "pending":
        return <Clock className="text-yellow-600" size={16} />;
      case "processing":
        return <Package className="text-blue-600" size={16} />;
      case "cancelled":
        return <XCircle className="text-red-600" size={16} />;
      case "on-hold":
        return <AlertCircle className="text-orange-600" size={16} />;
      default:
        return <Clock className="text-gray-600" size={16} />;
    }
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "on-hold":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatStatus = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "Delivered";
      case "pending":
        return "Pending";
      case "processing":
        return "Processing";
      case "cancelled":
        return "Cancelled";
      case "on-hold":
        return "On Hold";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">
            Manage and track all customer orders
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Completed Orders
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {completedOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="text-green-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search orders by order number, farm name, address, or status..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {/* Filter and Export Buttons */}
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2">
              <Filter size={18} />
              Filters
            </Button>
            <Button variant="outline" className="gap-2" onClick={handleExport}>
              <Download size={18} />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Order number
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Farm Name
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Address
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Item(s)
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Payment
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Amount (₦)
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{order.orderDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-medium text-xs">
                          {order.farmName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {order.farmName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">
                    {order.deliveryDate}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{order.address}</td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
                      {order.items}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <CreditCard className="text-gray-400" size={16} />
                      <span className="text-gray-600">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900">
                      ₦{order.amount}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                      >
                        {formatStatus(order.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className="relative"
                      ref={(el) => {
                        menuRefs.current[index] = el;
                      }}
                    >
                      <button
                        aria-label="More actions"
                        onClick={() => toggleMenu(order.id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenu === order.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewDetails(order)}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Eye size={16} />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => handleDelete(order)}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={16} />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-3">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500">
              No orders found matching your search.
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing 1 to {filteredOrders.length} of {orders.length} orders
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                <span className="sr-only">Previous</span>
                &lt;
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-green-50 text-green-700 border-green-200"
              >
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                ...
              </Button>
              <Button variant="outline" size="sm">
                10
              </Button>
              <Button variant="outline" size="sm">
                <span className="sr-only">Next</span>
                &gt;
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
