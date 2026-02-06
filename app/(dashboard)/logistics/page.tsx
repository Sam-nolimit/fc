"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  ShoppingBag,
  Truck,
  DollarSign,
  XCircle,
  X,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface LogisticsCompany {
  id: number;
  companyName: string;
  email: string;
  address: string;
  phoneNumber: string;
  isActive?: boolean;
}

export default function LogisticsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState("This year");
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] =
    useState<LogisticsCompany | null>(null);
  const menuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [logisticsCompanies, setLogisticsCompanies] = useState<
    LogisticsCompany[]
  >([
    {
      id: 1,
      companyName: "Chijioke Okafor",
      email: "Chukwudi@gmail.com",
      address: "No. 14 Idumagbo, Lagos",
      phoneNumber: "0803 234 xxxx",
      isActive: true,
    },
    {
      id: 2,
      companyName: "Adaobi Nwosu",
      email: "Ikenna@gmail.com",
      address: "7 Olumo Rock Rd, Abeokuta",
      phoneNumber: "0909 876 xxxx",
      isActive: false,
    },
    {
      id: 3,
      companyName: "Tunde Adebayo",
      email: "Ebele@gmail.com",
      address: "12 Eko Bridge, Lagos",
      phoneNumber: "0706 123 xxxx",
      isActive: true,
    },
    {
      id: 4,
      companyName: "Ifeoma Eze",
      email: "Ifeanyi@gmail.com",
      address: "23 Zuma Rock, Abuja",
      phoneNumber: "0812 345 xxxx",
      isActive: false,
    },
    {
      id: 5,
      companyName: "Emeka Nwachukwu",
      email: "Obioma@gmail.com",
      address: "9 Aso Rock, Abuja",
      phoneNumber: "0903 456 xxxx",
      isActive: true,
    },
    {
      id: 6,
      companyName: "Ngozi Uche",
      email: "Chinwe@gmail.com",
      address: "15 Lekki Conservation Centre, Lagos",
      phoneNumber: "0708 901 xxxx",
      isActive: true,
    },
    {
      id: 7,
      companyName: "Chinedu Obi",
      email: "Nnamdi@gmail.com",
      address: "3 Yankari Game Reserve, Bauchi",
      phoneNumber: "0814 567 xxxx",
      isActive: false,
    },
    {
      id: 8,
      companyName: "Amara Nnebe",
      email: "Somto@gmail.com",
      address: "10 Obudu Mountain Resort, Cross River",
      phoneNumber: "0905 678 xxxx",
      isActive: true,
    },
    {
      id: 9,
      companyName: "Obinna Chukwu",
      email: "Kehinde@gmail.com",
      address: "20 Kainji National Park, Niger",
      phoneNumber: "0701 789 xxxx",
      isActive: true,
    },
    {
      id: 10,
      companyName: "Zainab Bello",
      email: "Taiwo@gmail.com",
      address: "5 Ogbunike Cave, Anambra",
      phoneNumber: "0816 890 xxxx",
      isActive: false,
    },
  ]);

  // Chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "April", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Earnings",
        data: [200, 350, 280, 450, 520, 930, 650],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#10B981",
        borderWidth: 2,
      },
      {
        label: "Previous",
        data: [150, 280, 320, 380, 420, 480, 550],
        borderColor: "#60A5FA",
        backgroundColor: "rgba(96, 165, 250, 0.05)",
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointBackgroundColor: "#60A5FA",
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        backgroundColor: "#fff",
        titleColor: "#000",
        bodyColor: "#666",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: $${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: "#F3F4F6",
          drawBorder: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          callback: function (value: any) {
            if (value >= 1000) {
              return value / 1000 + "k+";
            }
            return value;
          },
        },
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
  };

  const filteredCompanies = logisticsCompanies.filter(
    (company) =>
      company.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.phoneNumber.includes(searchTerm),
  );

  const handleViewDetails = (company: LogisticsCompany) => {
    setSelectedCompany(company);
    setShowModal(true);
    setActiveMenu(null);
  };

  const handleActivate = (company: LogisticsCompany) => {
    setLogisticsCompanies((prev) =>
      prev.map((c) => (c.id === company.id ? { ...c, isActive: true } : c)),
    );
    setActiveMenu(null);
  };

  const handleDeactivate = (company: LogisticsCompany) => {
    setLogisticsCompanies((prev) =>
      prev.map((c) => (c.id === company.id ? { ...c, isActive: false } : c)),
    );
    setActiveMenu(null);
  };

  const handleExport = () => {
    console.log("Export data");
  };

  const toggleMenu = (id: number) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCompany(null);
  };

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
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Logistics</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show:</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option>This year</option>
            <option>Last year</option>
            <option>Last 6 months</option>
          </select>
        </div>
      </div>

      {/* Stats Cards and Chart Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Stats Cards Column - 2x2 Grid */}
        <div className="lg:col-span-1 grid grid-cols-2 gap-4">
          {/* Total Orders */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-8">
              <span className="text-xs text-gray-600 font-normal">
                Total Orders
              </span>
              <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="text-green-600" size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">2500</p>
          </div>

          {/* Total Delivery */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-8">
              <span className="text-xs text-gray-600 font-normal">
                Total Delivery
              </span>
              <div className="w-9 h-9 bg-orange-100 rounded-lg flex items-center justify-center">
                <Truck className="text-orange-600" size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">20</p>
          </div>

          {/* Total Amount Made */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-8">
              <span className="text-xs text-gray-600 font-normal">
                Total Amount Made
              </span>
              <div className="w-9 h-9 bg-cyan-100 rounded-lg flex items-center justify-center">
                <DollarSign className="text-cyan-600" size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">₦250,000</p>
          </div>

          {/* Total Rejected Orders */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between mb-8">
              <span className="text-xs text-gray-600 font-normal">
                Total Rejected Orders
              </span>
              <div className="w-9 h-9 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="text-red-600" size={18} />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">10</p>
          </div>
        </div>

        {/* Earnings Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Earnings</h2>
          <div className="h-[400px]">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
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
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* Filter and Export Buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Filter size={18} />
              Filters
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50"
              onClick={handleExport}
            >
              <Download size={18} />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company name
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email address
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone number
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCompanies.map((company, index) => (
                <tr
                  key={company.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    <span className="font-medium text-gray-900 text-sm">
                      {company.companyName}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {company.email}
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {company.address}
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">
                    {company.phoneNumber}
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
                        onClick={() => toggleMenu(company.id)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Dropdown Menu */}
                      {activeMenu === company.id && (
                        <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-10">
                          <div className="py-2">
                            <button
                              onClick={() => handleViewDetails(company)}
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <Eye size={18} className="text-gray-600" />
                              <span>View Details</span>
                            </button>
                            <button
                              onClick={() => handleActivate(company)}
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-green-600 hover:bg-green-50 transition-colors"
                            >
                              <div className="relative w-5 h-5">
                                <div className="w-5 h-3 bg-green-600 rounded-full flex items-center px-0.5">
                                  <div className="w-2 h-2 bg-white rounded-full ml-auto"></div>
                                </div>
                              </div>
                              <span>Activate</span>
                            </button>
                            <button
                              onClick={() => handleDeactivate(company)}
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-400 hover:bg-gray-50 transition-colors"
                            >
                              <div className="relative w-5 h-5">
                                <div className="w-5 h-3 bg-gray-300 rounded-full flex items-center px-0.5">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              </div>
                              <span>Deactivate</span>
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
            <p className="text-gray-500 text-sm">
              No logistics companies found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* View Details Modal */}
      {showModal && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">
                Company Details
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Company Name
                  </label>
                  <p className="mt-1 text-sm text-gray-900 font-medium">
                    {selectedCompany.companyName}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Email Address
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedCompany.email}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Phone Number
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedCompany.phoneNumber}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Status
                  </label>
                  <div className="mt-1">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        selectedCompany.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {selectedCompany.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                    Address
                  </label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedCompany.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={closeModal}>
                Close
              </Button>
              {selectedCompany.isActive ? (
                <Button
                  className="bg-gray-600 hover:bg-gray-700"
                  onClick={() => {
                    handleDeactivate(selectedCompany);
                    closeModal();
                  }}
                >
                  Deactivate
                </Button>
              ) : (
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleActivate(selectedCompany);
                    closeModal();
                  }}
                >
                  Activate
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
