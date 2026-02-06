"use client";

import { useState, useMemo, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  Bell,
  TrendingUp,
} from "lucide-react";
import AddItemModal from "@/app/components/ui/addItemModal";
import { ProductService } from "@/services/product.service";

// Keep your existing interface but update to match API
interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  status: 'Active' | 'Out of Stock' | 'Low Stock';
  sold: number;
  categoryName?: string;
  imageUrl?: string;
  stockQuantity?: number;
  unit?: string;
  farmName?: string;
}

export default function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState('all');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await ProductService.getAllProducts({ 
        page: 0, 
        size: 100 
      });
      
      if (response.status && response.data) {
        const apiProducts = response.data.map(product => ({
          id: product.id,
          name: product.name,
          category: product.categoryName || "Uncategorized",
          price: product.price,
          stock: product.stockQuantity,
          image: product.imageUrl || getDefaultImage(product.name),
          status: getProductStatus(product.stockQuantity),
          sold: Math.floor(Math.random() * 200), 
          categoryName: product.categoryName,
          imageUrl: product.imageUrl,
          stockQuantity: product.stockQuantity,
          unit: product.unit,
          farmName: product.farmName
        }));
        
        setProducts(apiProducts);
      } else {
        setProducts(getMockProducts());
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts(getMockProducts());
    } finally {
      setLoading(false);
    }
  };

  const getProductStatus = (stockQuantity: number): 'Active' | 'Out of Stock' | 'Low Stock' => {
    if (stockQuantity === 0) return 'Out of Stock';
    if (stockQuantity < 20) return 'Low Stock';
    return 'Active';
  };

  const getDefaultImage = (productName: string): string => {
    const imageMap: Record<string, string> = {
      'tomato': 'https://images.unsplash.com/photo-1546470427-227a6b6b2cdf?w=400',
      'corn': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400',
      'pepper': 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400',
      'carrot': 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
      'onion': 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400',
      'spinach': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      'cucumber': 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400',
      'broccoli': 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400',
      'potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400',
      'turmeric': 'https://images.unsplash.com/photo-1592478411180-4b9b6b26c1f9?w=400',
      'ginger': 'https://images.unsplash.com/photo-1584735353935-48c5b8d91c5e?w=400',
      'garlic': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
    };

    const lowerName = productName.toLowerCase();
    for (const [key, image] of Object.entries(imageMap)) {
      if (lowerName.includes(key)) {
        return image;
      }
    }

    return 'https://images.unsplash.com/photo-1546470427-227a6b6b2cdf?w=400';
  };

  const getMockProducts = (): Product[] => [
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
    {
      id: 3,
      name: 'Sweet Corn',
      category: 'Vegetables',
      price: 1200,
      stock: 85,
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400',
      status: 'Active',
      sold: 156
    },
    {
      id: 4,
      name: 'Green Bell Peppers',
      category: 'Vegetables',
      price: 1800,
      stock: 45,
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400',
      status: 'Low Stock',
      sold: 92
    },
    {
      id: 5,
      name: 'Fresh Carrots',
      category: 'Vegetables',
      price: 1100,
      stock: 200,
      image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400',
      status: 'Active',
      sold: 178
    },
    {
      id: 6,
      name: 'Red Onions',
      category: 'Vegetables',
      price: 1400,
      stock: 120,
      image: 'https://images.unsplash.com/photo-1508747703725-719777637510?w=400',
      status: 'Active',
      sold: 134
    },
    {
      id: 7,
      name: 'Fresh Spinach',
      category: 'Vegetables',
      price: 900,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400',
      status: 'Low Stock',
      sold: 67
    },
    {
      id: 8,
      name: 'Cucumbers',
      category: 'Vegetables',
      price: 1300,
      stock: 95,
      image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=400',
      status: 'Active',
      sold: 111
    },
    {
      id: 9,
      name: 'Fresh Broccoli',
      category: 'Vegetables',
      price: 2200,
      stock: 60,
      image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=400',
      status: 'Active',
      sold: 45
    },
    {
      id: 10,
      name: 'Sweet Bananas',
      category: 'Fruits',
      price: 800,
      stock: 180,
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
      status: 'Active',
      sold: 234
    }
  ];

  const filteredByTab = useMemo(() => {
    switch (activeTab) {
      case 'purchased':
        return [...products]
          .sort((a, b) => b.sold - a.sold)
          .slice(0, 10);
      case 'vegetables':
        return products.filter(product => 
          product.category.toLowerCase() === 'vegetables'
        );
      case 'fruits':
        return products.filter(product => 
          product.category.toLowerCase() === 'fruits'
        );
      case 'tubers':
        return products.filter(product => 
          product.category.toLowerCase() === 'tubers'
        );
      case 'all':
      default:
        return products;
    }
  }, [activeTab, products]);

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
    const totalProducts = products.length;
    const totalSold = products.reduce((sum, product) => sum + product.sold, 0);
    const totalVegetables = products.filter(p => p.category === 'Vegetables').length;
    const totalFruits = products.filter(p => p.category === 'Fruits').length;
    const totalTubers = products.filter(p => p.category === 'Tubers').length;
    
    return {
      totalProducts,
      totalSold,
      totalVegetables,
      totalFruits,
      totalTubers
    };
  }, [products]);

  const handleAddItemClick = () => {
    setShowAddItemModal(true);
  };

  const handleCloseModal = () => {
    setShowAddItemModal(false);
    fetchProducts();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Products</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your inventory and track product performance
            </p>
          </div>
          
        </div>
      </div>

      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
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

          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter size={18} />
            Filters
          </button>

          <button 
            onClick={handleAddItemClick}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            <Plus size={18} />
            ADD NEW ITEM
          </button>
        </div>
      </div>

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
            {/* <span className="ml-2 px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">
              Top 10
            </span> */}
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

      {/* Tab Description */}
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

      {/* Products Grid */}
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
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = getDefaultImage(product.name);
                  }}
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

      {/* Add Item Modal */}
      {showAddItemModal && (
        <AddItemModal 
          isOpen={showAddItemModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}