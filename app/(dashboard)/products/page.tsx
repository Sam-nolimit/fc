"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Bell,
  TrendingUp,
  X,
  ChevronLeft,
  Check,
} from "lucide-react";
import AddItemModal from "@/app/components/ui/addItemModal";

// Import the existing modal components

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'Active' | 'Out of Stock' | 'Low Stock';
  sold: number;
}

const productsData: Product[] = [
  // ... your existing products data remains the same
  {
    id: 1,
    name: 'Fresh Tomatoes (Big)',
    category: 'Vegetables',
    price: 1500,
    stock: 150,
    image: 'https://images.unsplash.com/photo-1546470427-227a6b6b2cdf?w=400',
    status: 'Active',
    sold: 89
  },
  {
    id: 2,
    name: 'Fresh Potatoes',
    category: 'Tubers',
    price: 1500,
    stock: 0,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
    status: 'Out of Stock',
    sold: 125
  },
  // ... rest of your products data
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('all');
  const [showAddItemModal, setShowAddItemModal] = useState(false); // Add this state

  // Keep all your existing filtering logic
  const filteredByTab = useMemo(() => {
    switch (activeTab) {
      case 'purchased':
        return [...productsData]
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10);
      case 'vegetables':
        return productsData.filter(product => 
          product.category.toLowerCase() === 'vegetables'
        );
      case 'fruits':
        return productsData.filter(product => 
          product.category.toLowerCase() === 'fruits'
        );
      case 'tubers':
        return productsData.filter(product => 
          product.category.toLowerCase() === 'tubers'
        );
      case 'all':
      default:
        return productsData;
    }
  }, [activeTab]);

  const filteredProducts = filteredByTab.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const tabStats = useMemo(() => {
    const totalProducts = productsData.length;
    const totalSold = productsData.reduce((sum, product) => sum + product.sold, 0);
    const totalVegetables = productsData.filter(p => p.category === 'Vegetables').length;
    const totalFruits = productsData.filter(p => p.category === 'Fruits').length;
    const totalTubers = productsData.filter(p => p.category === 'Tubers').length;
    
    return {
      totalProducts,
      totalSold,
      totalVegetables,
      totalFruits,
      totalTubers
    };
  }, []);

  // Function to handle Add New Item click
  const handleAddItemClick = () => {
    setShowAddItemModal(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setShowAddItemModal(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Keep as is */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Products</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your inventory and track product performance
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters - Modified button only */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {/* Search Bar - Keep as is */}
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'all' ? 'all products' : activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
            />
          </div>

          {/* Filters Button - Keep as is */}
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            Filters
          </button>

          {/* Add New Item Button - Now triggers modal */}
          <button 
            onClick={handleAddItemClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Plus size={18} />
            ADD NEW ITEM
          </button>
        </div>
      </div>

      {/* Tabs - Keep all your existing tab code */}
      <div className="px-6 border-b border-gray-200">
        <div className="flex gap-8">
          <button
            className={`pb-3 pt-4 text-sm border-b-2 transition-colors ${
              activeTab === 'all'
                ? 'text-green-600 border-green-600 font-medium'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Products
            <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {tabStats.totalProducts}
            </span>
          </button>
          <button
            className={`pb-3 pt-4 text-sm border-b-2 transition-colors ${
              activeTab === 'purchased'
                ? 'text-green-600 border-green-600 font-medium'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('purchased')}
          >
            <div className="flex items-center gap-2">
              <TrendingUp size={16} />
              Most Purchased
            </div>
            <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
              Top 10
            </span>
          </button>
          <button
            className={`pb-3 pt-4 text-sm border-b-2 transition-colors ${
              activeTab === 'vegetables'
                ? 'text-green-600 border-green-600 font-medium'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('vegetables')}
          >
            Vegetables
            <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {tabStats.totalVegetables}
            </span>
          </button>
          <button
            className={`pb-3 pt-4 text-sm border-b-2 transition-colors ${
              activeTab === 'fruits'
                ? 'text-green-600 border-green-600 font-medium'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('fruits')}
          >
            Fruits
            <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {tabStats.totalFruits}
            </span>
          </button>
          <button
            className={`pb-3 pt-4 text-sm border-b-2 transition-colors ${
              activeTab === 'tubers'
                ? 'text-green-600 border-green-600 font-medium'
                : 'text-gray-600 border-transparent hover:text-gray-900'
            }`}
            onClick={() => setActiveTab('tubers')}
          >
            Tubers
            <span className="ml-2 px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
              {tabStats.totalTubers}
            </span>
          </button>
        </div>
      </div>

      {/* Tab Description - Keep as is */}
      <div className="px-6 py-3 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            {activeTab === 'purchased' ? (
              <p className="text-sm text-gray-600">
                Showing top 10 most purchased products based on sales volume
              </p>
            ) : activeTab === 'all' ? (
              <p className="text-sm text-gray-600">
                Showing all products in inventory
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Showing {activeTab.toLowerCase()} products
              </p>
            )}
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">{filteredProducts.length}</span> products found
          </div>
        </div>
      </div>

      {/* Products Grid - Keep all your existing product grid code */}
      <div className="px-6 py-6">
        {activeTab === 'purchased' && filteredProducts.length > 0 && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Top Seller</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {filteredProducts[0].name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {filteredProducts[0].sold.toLocaleString()} units sold
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} className="text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-2">Total Sales Volume</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredProducts.reduce((sum, product) => sum + product.sold, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">units across top products</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm text-gray-600 mb-2">Average Price</p>
              <p className="text-2xl font-bold text-gray-900">
                ₦{Math.round(filteredProducts.reduce((sum, product) => sum + product.price, 0) / filteredProducts.length).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">per product</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group"
            >
              <div className="relative bg-gray-50 aspect-square">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor(product.status)}`}
                  >
                    {product.status === 'Active' ? 'ACTIVE' : 
                     product.status === 'Low Stock' ? 'LOW STOCK' : 'OUT OF STOCK'}
                  </span>
                </div>
                
                {activeTab === 'purchased' && index < 3 && (
                  <div className="absolute top-3 left-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-400' :
                      'bg-amber-700'
                    }`}>
                      #{index + 1}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  {activeTab === 'purchased' && (
                    <div className="flex items-center text-xs text-gray-500">
                      <TrendingUp size={12} className="mr-1" />
                      {product.sold}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      ₦{product.price.toLocaleString()}/kg
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Stock: {product.stock} units
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {product.category}
                    </p>
                    {product.status === 'Low Stock' && product.stock > 0 && (
                      <p className="text-xs text-amber-600 mt-1">
                        Only {product.stock} left
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-400 mb-3">
              <Search size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-sm">
              No products found {searchTerm ? 'matching your search' : `in ${activeTab}`}
            </p>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="mt-3 px-4 py-2 text-sm text-green-600 hover:text-green-700 font-medium"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add Item Modal - This is the only new addition */}
      {showAddItemModal && (
        <AddItemModal 
          isOpen={showAddItemModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}