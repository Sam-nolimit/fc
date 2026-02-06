"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, User, Phone, Mail, Download, CircleSlash, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface PaymentDetailsPageProps {
  params: {
    id: string;
  };
}

export default function PaymentDetailsPage({ params }: PaymentDetailsPageProps) {
  const router = useRouter();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Mock data - replace with actual API call based on params.id
  const paymentData = {
    orderNumber: "1234567ABCD",
    amountPayed: 17000,
    amountHeld: 15500,
    outstandingPayment: 15500,
    paymentStatus: "Paid",
    customer: {
      name: "Chijioke Okafor",
      phone: "09067876543",
      email: "Chukwudi@gmail.com",
    },
    totalAmount: 32500,
    numberOfItems: 4,
    discountAmount: 0,
    deliveryFee: 2000,
    serviceFee: 500,
    netAmount: 30000,
    items: [
      { id: 1, name: "Fresh Tomatoes (5kg)", quantity: "5kg", price: 1500, total: 7500 },
      { id: 2, name: "Fresh Tomatoes (5kg)", quantity: "5kg", price: 1500, total: 7500 },
      { id: 3, name: "Fresh Tomatoes (5kg)", quantity: "5kg", price: 1500, total: 7500 },
    ],
  };

  const handleCancelOrder = () => {
    setShowCancelConfirm(true);
  };

  const confirmCancelOrder = () => {
    console.log("Order cancelled");
    // TODO: API call to cancel order
    setShowCancelConfirm(false);
    router.push("/dashboard/payments");
  };

  const handleDelete = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    console.log("Order deleted");
    // TODO: API call to delete order
    setShowDeleteConfirm(false);
    router.push("/dashboard/payments");
  };

  const handleDownloadReceipt = () => {
    console.log("Download receipt");
    // TODO: Generate and download receipt
  };

  const handleMakePayment = () => {
    console.log("Make payment");
    // TODO: Open payment modal or redirect to payment page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Payment Details</h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
            onClick={handleCancelOrder}
          >
            <CircleSlash size={18} />
            Cancel Order
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-red-300 text-red-600 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 size={18} />
            Delete
          </Button>
        </div>
      </div>

      {/* Order Number */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-1">Order number</p>
        <p className="text-xl font-bold text-gray-900">{paymentData.orderNumber}</p>
      </div>

      {/* Amount Cards and Outstanding Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {/* Amount Payed */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Amount Payed</p>
              <p className="text-2xl font-bold text-gray-900">₦{paymentData.amountPayed.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Amount Held */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Amount Held</p>
              <p className="text-2xl font-bold text-gray-900">₦{paymentData.amountHeld.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Outstanding Payment */}
        <div className="bg-green-50 rounded-xl p-6 shadow-sm border border-green-100">
          <div>
            <p className="text-sm text-gray-700 mb-2">Outstanding Payment</p>
            <p className="text-2xl font-bold text-gray-900 mb-4">₦{paymentData.outstandingPayment.toLocaleString()}</p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              onClick={handleMakePayment}
            >
              MAKE PAYMENT
            </Button>
          </div>
        </div>
      </div>

      {/* Customer Information and Payment Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Customer Information */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Information</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <User size={18} />
                <span className="text-sm">Name</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{paymentData.customer.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <Phone size={18} />
                <span className="text-sm">Phone number</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{paymentData.customer.phone}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-gray-500">
                <Mail size={18} />
                <span className="text-sm">Email Address</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{paymentData.customer.email}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Payment Details</h2>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Payment Status</span>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                {paymentData.paymentStatus}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">₦{paymentData.totalAmount.toLocaleString()}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 gap-2 text-xs"
                  onClick={handleDownloadReceipt}
                >
                  <Download size={14} />
                  Download Receipt
                </Button>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Number of Items</span>
                <span className="font-semibold text-gray-900">{paymentData.numberOfItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Discount Amount</span>
                <span className="font-semibold text-gray-900">₦{paymentData.discountAmount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold text-gray-900">₦{paymentData.deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-semibold text-gray-900">₦{paymentData.serviceFee.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <span className="text-gray-600">Net Amount</span>
                <span className="font-bold text-gray-900">₦{paymentData.netAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            Items <span className="ml-2 px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">{paymentData.items.length}</span>
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left py-4 px-6 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paymentData.items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm text-gray-900">{item.name}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">{item.quantity}</td>
                  <td className="py-4 px-6 text-sm text-gray-900">₦{item.price.toLocaleString()}/kg</td>
                  <td className="py-4 px-6 text-sm font-semibold text-gray-900">₦{item.total.toLocaleString()}</td>
                </tr>
              ))}
              <tr className="bg-gray-50">
                <td colSpan={3} className="py-4 px-6"></td>
                <td className="py-4 px-6 text-lg font-bold text-gray-900">₦{paymentData.totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Cancel Order Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Cancel Order</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel this order? This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowCancelConfirm(false)}>
                No, Keep Order
              </Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={confirmCancelOrder}>
                Yes, Cancel Order
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Order</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this order? This action cannot be undone.</p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}