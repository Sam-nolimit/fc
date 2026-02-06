"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MoreVertical,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { useRouter } from "next/navigation";

interface Payment {
  id: number;
  date: string;
  orderNumber: string;
  customer: string;
  items: number;
  amountHeld: number;
  amountPayed: number;
  status: "Delivered" | "Pending" | "Processing" | "Cancelled" | "On Hold";
}

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState<number | null>(null);
  const router = useRouter();
  
  const itemsPerPage = 10; // Items to show per page

  const [payments] = useState<Payment[]>([
    {
      id: 1,
      date: "Nov 12, 2025",
      orderNumber: "123456TABCD",
      customer: "Chijioke Okafor",
      items: 1,
      amountHeld: 18950,
      amountPayed: 18950,
      status: "Delivered",
    },
    {
      id: 2,
      date: "Oct 29, 2025",
      orderNumber: "4567890MNOP",
      customer: "Adaobi Nwosu",
      items: 4,
      amountHeld: 22300,
      amountPayed: 22300,
      status: "Delivered",
    },
    {
      id: 3,
      date: "Sep 04, 2025",
      orderNumber: "234567890RST",
      customer: "Tunde Adebayo",
      items: 8,
      amountHeld: 27480,
      amountPayed: 27480,
      status: "Pending",
    },
    {
      id: 4,
      date: "Aug 15, 2025",
      orderNumber: "9876543IJKL",
      customer: "Ifeoma Eze",
      items: 3,
      amountHeld: 31750,
      amountPayed: 31750,
      status: "Delivered",
    },
    {
      id: 5,
      date: "Jul 23, 2025",
      orderNumber: "7654321EFGH",
      customer: "Emeka Nwachukwu",
      items: 4,
      amountHeld: 36900,
      amountPayed: 36900,
      status: "Processing",
    },
    {
      id: 6,
      date: "Jun 07, 2025",
      orderNumber: "3456789UVWX",
      customer: "Ngozi Uche",
      items: 7,
      amountHeld: 42150,
      amountPayed: 42150,
      status: "Delivered",
    },
    {
      id: 7,
      date: "May 19, 2025",
      orderNumber: "8765432YZA8",
      customer: "Chinedu Obi",
      items: 2,
      amountHeld: 47880,
      amountPayed: 47880,
      status: "Cancelled",
    },
    {
      id: 8,
      date: "Apr 11, 2025",
      orderNumber: "543210ICDEF",
      customer: "Amara Nnebe",
      items: 1,
      amountHeld: 53200,
      amountPayed: 53200,
      status: "Delivered",
    },
    {
      id: 9,
      date: "Mar 28, 2025",
      orderNumber: "6543210GHIJ",
      customer: "Obinna Chukwu",
      items: 2,
      amountHeld: 58990,
      amountPayed: 58990,
      status: "On Hold",
    },
    {
      id: 10,
      date: "Feb 02, 2025",
      orderNumber: "7890123KLMN",
      customer: "Zainab Bello",
      items: 5,
      amountHeld: 64500,
      amountPayed: 64500,
      status: "Delivered",
    },
    // Additional payment records
    {
      id: 11,
      date: "Jan 15, 2025",
      orderNumber: "8901234OPQR",
      customer: "David Okoro",
      items: 3,
      amountHeld: 71200,
      amountPayed: 71200,
      status: "Delivered",
    },
    {
      id: 12,
      date: "Dec 28, 2024",
      orderNumber: "9012345STUV",
      customer: "Grace Eze",
      items: 6,
      amountHeld: 78500,
      amountPayed: 78500,
      status: "Pending",
    },
    {
      id: 13,
      date: "Nov 10, 2024",
      orderNumber: "0123456WXYZ",
      customer: "Samuel Adeyemi",
      items: 2,
      amountHeld: 84200,
      amountPayed: 84200,
      status: "Processing",
    },
    {
      id: 14,
      date: "Oct 22, 2024",
      orderNumber: "1234567ABCD",
      customer: "Peace Uba",
      items: 4,
      amountHeld: 91500,
      amountPayed: 91500,
      status: "Delivered",
    },
    {
      id: 15,
      date: "Sep 05, 2024",
      orderNumber: "2345678EFGH",
      customer: "Michael Chukwu",
      items: 1,
      amountHeld: 102300,
      amountPayed: 102300,
      status: "Cancelled",
    },
    {
      id: 16,
      date: "Aug 18, 2024",
      orderNumber: "3456789IJKL",
      customer: "Sarah Musa",
      items: 5,
      amountHeld: 110500,
      amountPayed: 110500,
      status: "Delivered",
    },
    {
      id: 17,
      date: "Jul 01, 2024",
      orderNumber: "4567890MNOP",
      customer: "John Okafor",
      items: 3,
      amountHeld: 118700,
      amountPayed: 118700,
      status: "On Hold",
    },
    {
      id: 18,
      date: "Jun 14, 2024",
      orderNumber: "5678901QRST",
      customer: "Mercy Alabi",
      items: 7,
      amountHeld: 126900,
      amountPayed: 126900,
      status: "Delivered",
    },
    {
      id: 19,
      date: "May 27, 2024",
      orderNumber: "6789012UVWX",
      customer: "Peter Okonkwo",
      items: 2,
      amountHeld: 135100,
      amountPayed: 135100,
      status: "Pending",
    },
    {
      id: 20,
      date: "Apr 09, 2024",
      orderNumber: "7890123YZAB",
      customer: "Joy Nwankwo",
      items: 4,
      amountHeld: 143300,
      amountPayed: 143300,
      status: "Delivered",
    },
    {
      id: 21,
      date: "Mar 22, 2024",
      orderNumber: "8901234CDEF",
      customer: "Daniel Ibrahim",
      items: 6,
      amountHeld: 151500,
      amountPayed: 151500,
      status: "Processing",
    },
    {
      id: 22,
      date: "Feb 03, 2024",
      orderNumber: "9012345GHIJ",
      customer: "Blessing Adeleke",
      items: 3,
      amountHeld: 159700,
      amountPayed: 159700,
      status: "Delivered",
    },
    {
      id: 23,
      date: "Jan 16, 2024",
      orderNumber: "0123456KLMN",
      customer: "Victor Onyeka",
      items: 5,
      amountHeld: 167900,
      amountPayed: 167900,
      status: "Cancelled",
    },
    {
      id: 24,
      date: "Dec 29, 2023",
      orderNumber: "1234567OPQR",
      customer: "Patience Ojo",
      items: 2,
      amountHeld: 176100,
      amountPayed: 176100,
      status: "Delivered",
    },
    {
      id: 25,
      date: "Nov 11, 2023",
      orderNumber: "2345678STUV",
      customer: "Festus Bello",
      items: 4,
      amountHeld: 184300,
      amountPayed: 184300,
      status: "On Hold",
    },
    {
      id: 26,
      date: "Oct 24, 2023",
      orderNumber: "3456789WXYZ",
      customer: "Ruth Mohammed",
      items: 3,
      amountHeld: 192500,
      amountPayed: 192500,
      status: "Delivered",
    },
    {
      id: 27,
      date: "Sep 06, 2023",
      orderNumber: "4567890ABCD",
      customer: "Andrew Yakubu",
      items: 7,
      amountHeld: 200700,
      amountPayed: 200700,
      status: "Pending",
    },
    {
      id: 28,
      date: "Aug 19, 2023",
      orderNumber: "5678901EFGH",
      customer: "Deborah Suleiman",
      items: 2,
      amountHeld: 208900,
      amountPayed: 208900,
      status: "Delivered",
    },
    {
      id: 29,
      date: "Jul 02, 2023",
      orderNumber: "6789012IJKL",
      customer: "Solomon Okeke",
      items: 5,
      amountHeld: 217100,
      amountPayed: 217100,
      status: "Processing",
    },
    {
      id: 30,
      date: "Jun 15, 2023",
      orderNumber: "7890123MNOP",
      customer: "Esther Bala",
      items: 3,
      amountHeld: 225300,
      amountPayed: 225300,
      status: "Delivered",
    },
  ]);

  const filteredPayments = payments.filter(
    (payment) =>
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.status.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  
  // Calculate which payments to show on current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPayments = filteredPayments.slice(startIndex, endIndex);

  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Processing":
        return "bg-orange-100 text-orange-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "On Hold":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleExport = () => {
    console.log("Export payments");
  };

  const handleViewPayment = (paymentId: number) => {
    router.push(`/payments/${paymentId}`);
  };

  // Generate pagination numbers
  const getPaginationNumbers = () => {
    const numbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      if (currentPage <= 3) {
        // Near the start
        for (let i = 1; i <= 4; i++) {
          numbers.push(i);
        }
        numbers.push("...");
        numbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        numbers.push(1);
        numbers.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          numbers.push(i);
        }
      } else {
        // In the middle
        numbers.push(1);
        numbers.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          numbers.push(i);
        }
        numbers.push("...");
        numbers.push(totalPages);
      }
    }
    
    return numbers;
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setShowActions(null);
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen" onClick={handleClickOutside}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Total Transaction */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-2">
            <span className="text-sm text-gray-600 font-normal">
              Total Transaction
            </span>
            <p className="text-3xl font-bold text-gray-900">
              ₦{payments.reduce((sum, payment) => sum + payment.amountHeld, 0).toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp size={16} className="text-green-600" />
              <span className="text-green-600 font-medium">3.9%</span>
              <span className="text-gray-500">Last Month</span>
            </div>
          </div>
        </div>

        {/* Total Payment */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-2">
            <span className="text-sm text-gray-600 font-normal">
              Total Payment
            </span>
            <p className="text-3xl font-bold text-gray-900">
              ₦{payments.reduce((sum, payment) => sum + payment.amountPayed, 0).toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingDown size={16} className="text-red-600" />
              <span className="text-red-600 font-medium">3.5%</span>
              <span className="text-gray-500">Last Month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment History Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Payment History</h2>
        <div className="flex items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by name, order number, or status"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm w-64"
            />
          </div>

          {/* Filters Button */}
          <Button
            variant="outline"
            className="gap-2 border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            <Filter size={18} />
            Filters
          </Button>

          {/* Export Button */}
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

      {/* Payment History Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order number
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item(s)
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Held (₦)
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Payed (₦)
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {payment.date}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                    {payment.orderNumber}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {payment.customer}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {payment.items}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {payment.amountHeld.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-900">
                    {payment.amountPayed.toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowActions(showActions === payment.id ? null : payment.id);
                        }}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {showActions === payment.id && (
                        <div 
                          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() => {
                              handleViewPayment(payment.id);
                              setShowActions(null);
                            }}
                            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors rounded-t-lg"
                          >
                            <Eye size={16} />
                            <span>View Details</span>
                          </button>
                          
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
        {filteredPayments.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-3">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-sm">
              No payments found matching your search.
            </p>
          </div>
        )}

        {/* Pagination */}
        {filteredPayments.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(endIndex, filteredPayments.length)}
                </span>{" "}
                of <span className="font-medium">{filteredPayments.length}</span>{" "}
                results
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="First Page"
                >
                  <ChevronsLeft size={18} />
                </button>
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Previous Page"
                >
                  <ChevronLeft size={18} />
                </button>

                {getPaginationNumbers().map((page, index) => (
                  page === "..." ? (
                    <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page as number)}
                      className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-green-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )
                ))}

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Next Page"
                >
                  <ChevronRight size={18} />
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Last Page"
                >
                  <ChevronsRight size={18} />
                </button>
              </div>

              {/* Items per page selector (optional) */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Rows per page:</span>
                <select 
                  className="border border-gray-200 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  value={itemsPerPage}
                  onChange={(e) => {
                    // You can implement changing items per page here
                    console.log("Change items per page to:", e.target.value);
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}