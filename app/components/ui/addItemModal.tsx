"use client";

import { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  Check,
  Search,
} from "lucide-react";
import { FarmService } from "@/services/farmer.service";
import { CategoryService } from "@/services/category.service";
import { ProductService } from "@/services/product.service";

type ModalStep = 'main' | 'selectFarm' | 'selectCategory' | 'selectProduct' | 'selectUnit' | 'preview' | 'success';

const unitCategories = [
  {
    name: "WEIGHT",
    items: ["KG", "Gram", "Ton", "Pound", "Ounce"]
  },
  {
    name: "COUNT/QUANTITY",
    items: ["Piece", "Pack", "Dozen", "Bundle", "Set"]
  },
  {
    name: "FARM/PRODUCE SPECIFIC",
    items: ["Bunch", "Crate", "Basket", "Sack", "Bag", "Heap"]
  },
  {
    name: "LIQUID",
    items: ["Liter", "Milliliter", "Gallon", "Jerry can", "Keg"]
  },
  {
    name: "LENGTH/SIZE",
    items: ["Meter", "Centimetre"]
  },
  {
    name: "PROCESSED/MARKET UNITS",
    items: ["Trays", "Carton", "Can", "Bottle"]
  },
  {
    name: "FARM HARVEST",
    items: ["Tuber (Yam, Cassava)", "Cob (Maize)", "Cluster (Plantain)"]
  }
];

interface Farm {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  stockQuantity: number;
  unit: string;
  categoryId: number;
  categoryName: string;
  farmId: number;
  farmName: string;
  productGalleryId: number;
}

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const [modalStep, setModalStep] = useState<ModalStep>('main');
  const [formData, setFormData] = useState({
    farmId: "",
    farmName: "",
    categoryId: "",
    categoryName: "",
    productId: "",
    productName: "",
    productDescription: "",
    productImageUrl: "",
    productPrice: "",
    productGalleryId: "",
    unit: "",
    quantity: "",
    price: ""
  });
  const [farms, setFarms] = useState<Farm[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState({
    farms: false,
    categories: false,
    products: false,
    submitting: false
  });
  const [searchQuery, setSearchQuery] = useState({
    farm: "",
    category: "",
    product: "",
    unit: ""
  });

  useEffect(() => {
    if (isOpen) {
      fetchFarms();
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    if (formData.categoryId) {
      fetchProductsByCategory();
    }
  }, [formData.categoryId]);

  const fetchFarms = async () => {
    setLoading(prev => ({ ...prev, farms: true }));
    try {
      const response = await FarmService.getAllFarms({ limit: 50 });
      if (response.status && response.data) {
        setFarms(response.data);
      }
    } catch (error) {
      console.error("Error fetching farms:", error);
    } finally {
      setLoading(prev => ({ ...prev, farms: false }));
    }
  };

  const fetchCategories = async () => {
    setLoading(prev => ({ ...prev, categories: true }));
    try {
      const response = await CategoryService.getAllCategoriesList();
      if (response.status && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(prev => ({ ...prev, categories: false }));
    }
  };

  const fetchProductsByCategory = async () => {
    if (!formData.categoryId) return;
    
    setLoading(prev => ({ ...prev, products: true }));
    try {
      const response = await ProductService.getAllProducts({
        categoryId: parseInt(formData.categoryId),
        limit: 50
      });
      if (response.status && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  if (!isOpen) return null;

  const handleNextStep = () => {
    switch (modalStep) {
      case 'main':
        setModalStep('preview');
        break;
      case 'preview':
        handlePublishItem();
        break;
    }
  };

  const handlePrevStep = () => {
    switch (modalStep) {
      case 'selectFarm':
        setModalStep('main');
        break;
      case 'selectCategory':
        setModalStep('main');
        break;
      case 'selectProduct':
        setModalStep('main');
        break;
      case 'selectUnit':
        setModalStep('main');
        break;
      case 'preview':
        setModalStep('main');
        break;
    }
  };

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePublishItem = async () => {
    if (!formData.farmId || !formData.categoryId || !formData.productId || !formData.productGalleryId) {
      console.error("Required fields are missing");
      alert("Please fill in all required fields");
      return;
    }

    setLoading(prev => ({ ...prev, submitting: true }));
    try {
      const payload = {
        price: parseFloat(formData.price || formData.productPrice),
        stockQuantity: parseInt(formData.quantity),
        unit: formData.unit,
        productGalleryId: parseInt(formData.productGalleryId),
        farmId: parseInt(formData.farmId),
      };

      const response = await ProductService.createProduct(payload);
      
      if (response.status) {
        console.log("Product created successfully");
        setModalStep('success');
      } else {
        console.error("Failed to create product:", response.message);
        alert(`Failed to create product: ${response.message}`);
      }
    } catch (error) {
      console.error("Error publishing item:", error);
      alert("An error occurred while publishing the item.");
    } finally {
      setLoading(prev => ({ ...prev, submitting: false }));
    }
  };

  const getSelectedFarm = () => {
    return farms.find(farm => farm.id === parseInt(formData.farmId));
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.id === parseInt(formData.categoryId));
  };

  const getSelectedProduct = () => {
    return products.find(product => product.id === parseInt(formData.productId));
  };

  const resetModal = () => {
    setModalStep('main');
    setFormData({
      farmId: "",
      farmName: "",
      categoryId: "",
      categoryName: "",
      productId: "",
      productName: "",
      productDescription: "",
      productImageUrl: "",
      productPrice: "",
      productGalleryId: "",
      unit: "",
      quantity: "",
      price: ""
    });
    setProducts([]);
    setSearchQuery({
      farm: "",
      category: "",
      product: "",
      unit: ""
    });
  };

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(searchQuery.farm.toLowerCase())
  );

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.category.toLowerCase())
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.product.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.product.toLowerCase())
  );

  const filteredUnits = () => {
    const allUnits = unitCategories.flatMap(category => category.items);
    if (!searchQuery.unit) return allUnits;
    return allUnits.filter(unit => 
      unit.toLowerCase().includes(searchQuery.unit.toLowerCase())
    );
  };

  const renderModalContent = () => {
    switch (modalStep) {
      case 'main':
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Farm *
                </label>
                <div 
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setModalStep('selectFarm')}
                >
                  <div className="flex items-center justify-between">
                    <span className={formData.farmName ? "text-gray-900" : "text-gray-500"}>
                      {formData.farmName || "Select Farm"}
                    </span>
                    <ChevronLeft size={18} className="text-gray-900 -rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category *
                </label>
                <div 
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setModalStep('selectCategory')}
                >
                  <div className="flex items-center justify-between">
                    <span className={formData.categoryName ? "text-gray-900" : "text-gray-500"}>
                      {formData.categoryName || "Select Category"}
                    </span>
                    <ChevronLeft size={18} className="text-gray-900 -rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product *
                </label>
                <div 
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => formData.categoryId && setModalStep('selectProduct')}
                  style={{ cursor: formData.categoryId ? 'pointer' : 'not-allowed' }}
                >
                  <div className="flex items-center justify-between">
                    <span className={formData.productName ? "text-gray-900" : "text-gray-500"}>
                      {formData.productName || (formData.categoryId ? "Select Product" : "Select category first")}
                    </span>
                    {formData.categoryId && (
                      <ChevronLeft size={18} className="text-gray-900 -rotate-90" />
                    )}
                  </div>
                </div>
                {!formData.categoryId && (
                  <p className="mt-1 text-xs text-gray-500">Please select a category first</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product Unit *
                </label>
                <div 
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setModalStep('selectUnit')}
                >
                  <div className="flex items-center justify-between">
                    <span className={formData.unit ? "text-gray-900" : "text-gray-500"}>
                      {formData.unit || "Select Unit"}
                    </span>
                    <ChevronLeft size={18} className="text-gray-900 -rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  placeholder="100"
                  value={formData.quantity}
                  onChange={(e) => handleFormChange('quantity', e.target.value)}
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white text-gray-900 placeholder:text-gray-500"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Price per unit (₦) *
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 font-medium">
                    ₦
                  </span>
                  <input
                    type="number"
                    placeholder={formData.productPrice ? formData.productPrice : "12000"}
                    value={formData.price || formData.productPrice}
                    onChange={(e) => handleFormChange('price', e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white text-gray-900 placeholder:text-gray-500"
                    min="0"
                    step="0.01"
                  />
                </div>
                {formData.productPrice && !formData.price && (
                  <p className="mt-1 text-xs text-gray-500">
                    Default price from product: ₦{parseFloat(formData.productPrice).toLocaleString()}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleNextStep}
              disabled={!formData.farmId || !formData.categoryId || !formData.productId || !formData.unit || !formData.quantity || !(formData.price || formData.productPrice) || loading.submitting}
              className={`w-full mt-8 py-4 font-semibold rounded-full transition-colors uppercase tracking-wide ${
                formData.farmId && formData.categoryId && formData.productId && formData.unit && formData.quantity && (formData.price || formData.productPrice) && !loading.submitting
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {loading.submitting ? 'PROCESSING...' : 'PREVIEW ITEM'}
            </button>
          </div>
        );

      case 'selectFarm':
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search farms..."
                value={searchQuery.farm}
                onChange={(e) => setSearchQuery(prev => ({ ...prev, farm: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-0 max-h-[65vh] overflow-y-auto">
              {loading.farms ? (
                <div className="py-8 text-center text-gray-500">
                  Loading farms...
                </div>
              ) : filteredFarms.length > 0 ? (
                filteredFarms.map((farm) => (
                  <div
                    key={farm.id}
                    className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    onClick={() => {
                      handleFormChange('farmId', farm.id.toString());
                      handleFormChange('farmName', farm.name);
                      setModalStep('main');
                      setSearchQuery(prev => ({ ...prev, farm: "" }));
                    }}
                  >
                    <span className="text-gray-900 font-normal">
                      {farm.name}
                    </span>
                    {formData.farmId === farm.id.toString() && (
                      <Check size={18} className="text-green-600" />
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  {searchQuery.farm ? "No farms found" : "No farms available"}
                </div>
              )}
            </div>
          </div>
        );

      case 'selectCategory':
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery.category}
                onChange={(e) => setSearchQuery(prev => ({ ...prev, category: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-0 max-h-[65vh] overflow-y-auto">
              {loading.categories ? (
                <div className="py-8 text-center text-gray-500">
                  Loading categories...
                </div>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    onClick={() => {
                      handleFormChange('categoryId', category.id.toString());
                      handleFormChange('categoryName', category.name);
                      handleFormChange('productId', "");
                      handleFormChange('productName', "");
                      handleFormChange('productDescription', "");
                      handleFormChange('productImageUrl', "");
                      handleFormChange('productPrice', "");
                      handleFormChange('productGalleryId', "");
                      setModalStep('main');
                      setSearchQuery(prev => ({ ...prev, category: "" }));
                    }}
                  >
                    <span className="text-gray-900 font-normal">
                      {category.name}
                    </span>
                    {formData.categoryId === category.id.toString() && (
                      <Check size={18} className="text-green-600" />
                    )}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  {searchQuery.category ? "No categories found" : "No categories available"}
                </div>
              )}
            </div>
          </div>
        );

      case 'selectProduct':
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery.product}
                onChange={(e) => setSearchQuery(prev => ({ ...prev, product: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-0 max-h-[65vh] overflow-y-auto">
              {loading.products ? (
                <div className="py-8 text-center text-gray-500">
                  Loading products...
                </div>
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                    onClick={() => {
                      handleFormChange('productId', product.id.toString());
                      handleFormChange('productName', product.name);
                      handleFormChange('productDescription', product.description);
                      handleFormChange('productImageUrl', product.imageUrl);
                      handleFormChange('productPrice', product.price.toString());
                      handleFormChange('productGalleryId', product.productGalleryId.toString());
                      if (product.unit && !formData.unit) {
                        handleFormChange('unit', product.unit);
                      }
                      setModalStep('main');
                      setSearchQuery(prev => ({ ...prev, product: "" }));
                    }}
                  >
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546470427-227a6b6b2cdf?w=100';
                      }}
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm">
                          {product.name}
                        </span>
                        {formData.productId === product.id.toString() && (
                          <Check size={18} className="text-green-600 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-medium text-gray-700">
                          ₦{product.price.toLocaleString()}/{product.unit.toLowerCase()}
                        </span>
                        <span className="text-xs text-gray-500">
                          Stock: {product.stockQuantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-gray-500">
                  {searchQuery.product 
                    ? "No products found" 
                    : formData.categoryId 
                    ? "No products in this category" 
                    : "Please select a category first"}
                </div>
              )}
            </div>
          </div>
        );

      case 'selectUnit':
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="relative mb-6">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search units..."
                value={searchQuery.unit}
                onChange={(e) => setSearchQuery(prev => ({ ...prev, unit: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-lg outline-none text-sm placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-6 max-h-[65vh] overflow-y-auto">
              {unitCategories.map((category) => {
                const filteredItems = category.items.filter(item =>
                  item.toLowerCase().includes(searchQuery.unit.toLowerCase())
                );

                if (filteredItems.length === 0) return null;

                return (
                  <div key={category.name}>
                    <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">
                      {category.name}
                    </h3>
                    <div className="space-y-0">
                      {filteredItems.map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                          onClick={() => {
                            handleFormChange('unit', item);
                            setModalStep('main');
                            setSearchQuery(prev => ({ ...prev, unit: "" }));
                          }}
                        >
                          <span className="text-gray-900 font-normal">
                            {item}
                          </span>
                          {formData.unit === item ? (
                            <Check size={18} className="text-green-600" />
                          ) : (
                            <ChevronLeft size={18} className="text-gray-400 rotate-180" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'preview':
        const selectedFarm = getSelectedFarm();
        const selectedCategory = getSelectedCategory();
        const selectedProduct = getSelectedProduct();
        
        return (
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Preview Item</h2>

            <div className="mb-6">
              {selectedProduct?.imageUrl && (
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={formData.productName}
                    className="w-full h-48 object-contain rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1546470427-227a6b6b2cdf?w=400';
                    }}
                  />
                </div>
              )}
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {formData.productName} ({formData.unit})
              </h3>
              
              {selectedFarm && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-xs font-medium text-gray-600">F</span>
                  </div>
                  <span className="text-sm text-gray-600">{selectedFarm.name}</span>
                </div>
              )}

              {selectedCategory && (
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {selectedCategory.name}
                  </span>
                </div>
              )}

              {formData.productDescription && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                    DESCRIPTION
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {formData.productDescription}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    PRICE
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ₦{parseFloat(formData.price || formData.productPrice || "0").toLocaleString()}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                    STOCK
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {formData.quantity} {formData.unit}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handlePublishItem}
              disabled={loading.submitting}
              className="w-full py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.submitting ? 'PUBLISHING...' : 'PUBLISH ITEM'}
            </button>
          </div>
        );

      case 'success':
        return (
          <div className="w-full max-w-md mx-auto text-center py-12">
            <div className="w-24 h-24 border-4 border-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={48} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Item Published</h2>
            <p className="text-gray-600 mb-8 px-8">
              Your item has been published and customers can now see and order from your farm
            </p>
            <button
              onClick={() => {
                resetModal();
                onClose();
              }}
              className="w-full py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors uppercase tracking-wide mb-4"
            >
              VIEW ITEM
            </button>
            <button
              onClick={() => {
                resetModal();
              }}
              className="w-full py-4 text-green-600 font-semibold hover:text-green-700 transition-colors uppercase tracking-wide"
            >
              ADD ANOTHER ITEM
            </button>
          </div>
        );
    }

    return null;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          {modalStep !== 'success' && modalStep !== 'main' && (
            <button
              onClick={handlePrevStep}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              disabled={loading.submitting}
            >
              <ChevronLeft size={20} className="text-gray-900" />
            </button>
          )}
          {modalStep === 'main' && <div className="w-10"></div>}
          {modalStep === 'success' && <div className="w-10"></div>}
          <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide">
            {modalStep === 'main' && 'ADD ITEM'}
            {modalStep === 'selectFarm' && 'Select Farm'}
            {modalStep === 'selectCategory' && 'Select Category'}
            {modalStep === 'selectProduct' && 'Select Product'}
            {modalStep === 'selectUnit' && 'Product Unit'}
            {modalStep === 'preview' && 'ADD ITEM'}
            {modalStep === 'success' && ''}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            disabled={loading.submitting}
          >
            <X size={20} className="text-gray-900" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderModalContent()}
        </div>
      </div>
    </div>
  );
}