"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Filter, Download, Eye, Trash2, MoreVertical, Truck } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface LogisticsCompany {
  id: number;
  companyName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [logisticsCompanies] = useState<LogisticsCompany[]>([
    { id: 1, companyName: "Chijioike Okafor", email: "Chukwudi@gmail.com", address: "No. 14 Idumagbo, Lagos", phoneNumber: "0803 234 xxxx" },
    { id: 2, companyName: "Adaobi Nwosu", email: "Ikennia@gmail.com", address: "7 Olumo Rock Rd, Abeokuta", phoneNumber: "0909 876 xxxx" },
    { id: 3, companyName: "Tunde Adebayo", email: "Ebele@gmail.com", address: "12 Eko Bridge, Lagos", phoneNumber: "0706 123 xxxx" },
    { id: 4, companyName: "Ifeoma Eze", email: "Ifeanyi@gmail.com", address: "23 Zuma Rock, Abuja", phoneNumber: "0812 345 xxxx" },
    { id: 5, companyName: "Emeka Nwachukwu", email: "Obioma@gmail.com", address: "9 Aso Rock, Abuja", phoneNumber: "0903 456 xxxx" },
    { id: 6, companyName: "Ngazi Uche", email: "Chinwe@gmail.com", address: "15 Lekki Conservation Centre, Lagos", phoneNumber: "0708 901 xxxx" },
    { id: 7, companyName: "Chinedu Obi", email: "Namadi@gmail.com", address: "3 Yankari Game Reserve, Bauchi", phoneNumber: "0814 567 xxxx" },
    { id: 8, companyName: "Amara Nnebe", email: "Somto@gmail.com", address: "10 Obudu Mountain Resort, Cross River", phoneNumber: "0905 678 xxxx" },
    { id: 9, companyName: "Obinna Chukwu", email: "Kehinde@gmail.com", address: "20 Kainji National Park, Niger", phoneNumber: "0701 789 xxxx" },
    { id: 10, companyName: "Zainab Bello", email: "Talwo@gmail.com", address: "5 Ogbunike Cave, Anambra", phoneNumber: "0816 890 xxxx" },
  ]);

  const filteredCompanies = logisticsCompanies.filter(company =>
    company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.phoneNumber.includes(searchTerm)
  );

  const handleViewDetails = (company: LogisticsCompany) => {
    console.log("View details:", company);
    setActiveMenu(null);
    // Implement view details logic
  };

  const handleDelete = (company: LogisticsCompany) => {
    console.log("Delete:", company);
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
      if (!menuRefs.current.some(ref => ref && ref.contains(event.target as Node))) {
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
          <h1 className="text-2xl font-bold text-gray-900">Logistics</h1>
          <p className="text-gray-600 mt-1">Manage logistics companies and partners</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          Add New Logistics
        </Button>
      </div>

      {/* Search and Filters Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by company name, email, address, or phone number..."
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

      {/* Logistics Companies Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-700 uppercase tracking-wider">
                  Company name
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
              {filteredCompanies.map((company, index) => (
                <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <Truck className="text-orange-600" size={16} />
                      </div>
                      <span className="font-medium text-gray-900">{company.companyName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600">{company.email}</td>
                  <td className="py-4 px-6 text-gray-600">{company.address}</td>
                  <td className="py-4 px-6 text-gray-600">{company.phoneNumber}</td>
                  <td className="py-4 px-6">
                    <div className="relative" ref={el => menuRefs.current[index] = el}>
                      <button
                        onClick={() => toggleMenu(company.id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeMenu === company.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button
                              onClick={() => handleViewDetails(company)}
                              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Eye size={16} />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => handleDelete(company)}
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
        {filteredCompanies.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-3">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500">No logistics companies found matching your search.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing 1 to {filteredCompanies.length} of {logisticsCompanies.length} companies
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-green-50 text-green-700 border-green-200">
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