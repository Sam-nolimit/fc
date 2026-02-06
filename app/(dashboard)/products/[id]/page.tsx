"use client";

import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = params.id;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Product Details</h1>
        <p className="text-gray-600 mt-1">Product ID: {id}</p>
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <p className="text-gray-600">Product details coming soon...</p>
      </div>
    </div>
  );
}
