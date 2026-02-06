"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

interface Farmer {
  id: number;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export default function FarmersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [farmers] = useState<Farmer[]>([
    {
      id: 1,
      fullName: "Chiljoke Okafor",
      email: "Chukwudi@gmail.com",
      address: "No.14 Idumagbo, Lagos",
      phoneNumber: "0803234xxxx",
    },
    {
      id: 2,
      fullName: "Adaobi Nwosu",
      email: "Ikenna@gmail.com",
      address: "7 Olumo Rock Rd, Abeokuta",
      phoneNumber: "090987xxxx",
    },
    {
      id: 3,
      fullName: "Tunde Adebayo",
      email: "Ebele@gmail.com",
      address: "12 Eko Bridge, Lagos",
      phoneNumber: "0706123xxxx",
    },
    {
      id: 4,
      fullName: "Ifeoma Eze",
      email: "Ifeanyi@gmail.com",
      address: "23 Zuma Rock, Abuja",
      phoneNumber: "0812345xxxx",
    },
    {
      id: 5,
      fullName: "Emeka Nwachukwu",
      email: "Obioma@gmail.com",
      address: "9 Aso Rock, Abuja",
      phoneNumber: "0903456xxxx",
    },
    {
      id: 6,
      fullName: "Ngozi Uche",
      email: "Chinwe@gmail.com",
      address: "15 Lekki Conservation Centre, Lagos",
      phoneNumber: "0708901xxxx",
    },
    {
      id: 7,
      fullName: "Chinedu Obi",
      email: "Nnamdi@gmail.com",
      address: "3 Yankari Game Reserve, Bauchi",
      phoneNumber: "0814567xxxx",
    },
    {
      id: 8,
      fullName: "Amara Nnebe",
      email: "Somto@gmail.com",
      address: "10 Obudu Mountain Resort, Cross River",
      phoneNumber: "0905678xxxx",
    },
    {
      id: 9,
      fullName: "Obinna Chukwu",
      email: "Kehinde@gmail.com",
      address: "20 Kainji National Park, Niger",
      phoneNumber: "0701789xxxx",
    },
    {
      id: 10,
      fullName: "Zainab Bello",
      email: "Talwo@gmail.com",
      address: "5 Ogbunike Cave, Anambra",
      phoneNumber: "0816890xxxx",
    },
  ]);

  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.phoneNumber.includes(searchTerm),
  );

  const handleViewDetails = (farmer: Farmer) => {
    console.log("View details:", farmer);
    setActiveMenu(null);
    // Implement view details logic
  };

  const handleDelete = (farmer: Farmer) => {
    console.log("Delete:", farmer);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Farmers</h1>
          <p className="text-gray-600 mt-1">Manage all registered farmers</p>
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
                placeholder="Search farmers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Full name
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Email address
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Address
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Phone number
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredFarmers.map((farmer, index) => (
                <tr
                  key={farmer.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-medium text-sm">
                          {farmer.fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {farmer.fullName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{farmer.email}</td>
                  <td className="py-4 px-6 text-gray-600">{farmer.address}</td>
                  <td className="py-4 px-6 text-gray-600">
                    {farmer.phoneNumber}
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
                        onClick={() => toggleMenu(farmer.id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenu === farmer.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewDetails(farmer)}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Eye size={16} />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => handleDelete(farmer)}
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
        {filteredFarmers.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-3">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500">
              No farmers found matching your search.
            </p>
          </div>
        )}

        {/* Pagination (if needed) */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing 1 to {filteredFarmers.length} of {farmers.length} farmers
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
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
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
