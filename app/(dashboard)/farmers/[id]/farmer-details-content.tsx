"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Edit, Download, Printer, Share2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface Order {
  id: number;
  date: string;
  time: string;
  customer: string;
  quantity: number;
  amount: string;
  status: "Paid" | "Pending" | "Processing" | "Cancelled";
}

interface FarmerDetailsContentProps {
  farmerId: string;
}

export default function FarmerDetailsContent({ farmerId }: FarmerDetailsContentProps) {
  const router = useRouter();
  
  // Mock data - in real app, fetch based on farmerId
  const [farmer] = useState({
    id: farmerId,
    firstName: "Chijioke",
    lastName: "Okafor",
    dateOfBirth: "09/05/1996",
    gender: "Male",
    farmsOwned: 3,
    farmNames: ["Christian Valley Farms", "Valley Land Farms", "Valley Vee Farms"],
    phoneNumber: "09067876543",
    email: "Chukwudi@gmail.com",
    houseNumber: "14",
    street: "Idumagbo",
    city: "Lagos",
    state: "Lagos",
    country: "Nigeria",
    farmDescription: "Organic Vegetables and fruit farm"
  });

  const [orders] = useState<Order[]>([
    { id: 1, date: "Nov 21, 2025", time: "09:20 AM", customer: "Chijioke Okafor", quantity: 4, amount: "18,950", status: "Paid" },
    { id: 2, date: "Nov 19, 2025", time: "09:50 AM", customer: "Adaobi Nwosu", quantity: 4, amount: "22,300", status: "Paid" },
    { id: 3, date: "Nov 18, 2025", time: "10:15 AM", customer: "Tunde Adebayo", quantity: 8, amount: "27,480", status: "Pending" },
    { id: 4, date: "Nov 14, 2025", time: "12:05 PM", customer: "Ifeoma Eze", quantity: 3, amount: "31,750", status: "Paid" },
    { id: 5, date: "Nov 12, 2025", time: "11:45 AM", customer: "Emeka Nwachukwu", quantity: 4, amount: "36,900", status: "Processing" },
    { id: 6, date: "Nov 8, 2025", time: "09:55 AM", customer: "Ngozi Uche", quantity: 7, amount: "42,150", status: "Paid" },
    { id: 7, date: "Nov 1, 2025", time: "08:30 AM", customer: "Chinedu Obi", quantity: 2, amount: "47,880", status: "Cancelled" },
  ]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Paid": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleEdit = () => {
    console.log("Edit farmer details");
    // Implement edit logic
  };

  const handleExport = () => {
    console.log("Export farmer data");
    // Implement export logic
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    console.log("Share farmer profile");
    // Implement share logic
  };

  const handleBack = () => {
    router.push("/farmers");
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2" onClick={handleBack}>
            <ArrowLeft size={16} />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Christian Valley Farms</h1>
            <p className="text-gray-600 mt-1">{farmer.farmDescription}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2" onClick={handleEdit}>
            <Edit size={18} />
            Edit
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleExport}>
            <Download size={18} />
            Export
          </Button>
          <Button variant="outline" className="gap-2" onClick={handlePrint}>
            <Printer size={18} />
            Print
          </Button>
          <Button variant="outline" className="gap-2" onClick={handleShare}>
            <Share2 size={18} />
            Share
          </Button>
        </div>
      </div>

      {/* Contact Info Banner */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-700 text-2xl font-bold">
                {farmer.firstName[0]}{farmer.lastName[0]}
              </span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{farmer.firstName} {farmer.lastName}</h2>
              <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Mail size={16} />
                  <a href={`mailto:${farmer.email}`} className="hover:text-green-600">{farmer.email}</a>
                </div>
                <div className="flex items-center gap-1">
                  <Phone size={16} />
                  <span>{farmer.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>No. {farmer.houseNumber} {farmer.street}, {farmer.city}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Farmer ID</p>
            <p className="font-medium">{farmer.id}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Personal Information */}
        <div className="space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">First Name</p>
                  <p className="font-medium">{farmer.firstName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Last Name</p>
                  <p className="font-medium">{farmer.lastName}</p>
                </div>
              </div>
              
              {/* DOB & Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Date Of Birth</p>
                  <p className="font-medium">{farmer.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Gender</p>
                  <p className="font-medium">{farmer.gender}</p>
                </div>
              </div>

              {/* Farms Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Farms Owned</p>
                    <p className="text-2xl font-bold text-gray-900">{farmer.farmsOwned}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 text-right">Number of farms owned</p>
                    <p className="text-2xl font-bold text-gray-900 text-right">{farmer.farmsOwned}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {farmer.farmNames.map((farm, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <p className="font-medium">{farm}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">Phone Number</p>
                  <p className="font-medium">{farmer.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Email Address</p>
                  <p className="font-medium">{farmer.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">House Number</p>
                  <p className="font-medium">{farmer.houseNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Street</p>
                  <p className="font-medium">{farmer.street}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-500 mb-2">State</p>
                  <p className="font-medium">{farmer.state}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">Country</p>
                  <p className="font-medium">{farmer.country}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Order History */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
              <p className="text-gray-600 mt-1">Recent orders from this farmer</p>
            </div>
            <Button variant="outline" size="sm">
              View All Orders
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Date/Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Qty</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount (₦)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium">{order.date}</p>
                        <p className="text-sm text-gray-500">{order.time}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-medium">{order.customer}</td>
                    <td className="py-4 px-4">{order.quantity}</td>
                    <td className="py-4 px-4 font-medium">₦{order.amount}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Stats Summary */}
          <div className="mt-8 pt-6 border-t border-gray-200 grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">7</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₦227,410</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Avg Order</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">₦32,487</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}