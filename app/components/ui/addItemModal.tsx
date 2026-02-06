"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  ChevronLeft,
  Check,
  Search,
} from "lucide-react";

type ModalStep = 'main' | 'selectUnit' | 'preview' | 'success';

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

const availableItems = [
  {
    id: 1,
    name: "Fresh Tomatoes",
    description: "Grown with care by our dedicated farmers, these tomatoes are plucked...",
    image: "https://images.unsplash.com/photo-1546470427-227a6b6b2cdf?w=100",
  },
  {
    id: 2,
    name: "Sweet Corn",
    description: "Fresh sweet corn harvested at peak ripeness for maximum sweetness...",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=100",
  },
  {
    id: 3,
    name: "Green Bell Peppers",
    description: "Crisp and fresh bell peppers perfect for salads and cooking...",
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=100",
  },
  {
    id: 4,
    name: "Fresh Carrots",
    description: "Crunchy organic carrots rich in vitamins and natural sweetness...",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=100",
  },
  {
    id: 5,
    name: "Red Onions",
    description: "Premium red onions with a mild, sweet flavor ideal for any dish...",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=100",
  },
  {
    id: 6,
    name: "Fresh Spinach",
    description: "Tender leafy greens packed with nutrients and fresh flavor...",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=100",
  },
  {
    id: 7,
    name: "Cucumbers",
    description: "Crisp and refreshing cucumbers perfect for salads and snacking...",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=100",
  },
  {
    id: 8,
    name: "Fresh Broccoli",
    description: "Nutrient-rich broccoli florets harvested at their freshest...",
    image: "https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=100",
  },
];

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddItemModal({ isOpen, onClose }: AddItemModalProps) {
  const [modalStep, setModalStep] = useState<ModalStep>('main');
  const [formData, setFormData] = useState({
    category: "",
    product: "",
    unit: "",
    quantity: "",
    amount: ""
  });
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const productDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productDropdownRef.current && !productDropdownRef.current.contains(event.target as Node)) {
        setShowProductDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleNextStep = () => {
    switch (modalStep) {
      case 'main':
        setModalStep('preview');
        break;
      case 'preview':
        setModalStep('success');
        break;
    }
  };

  const handlePrevStep = () => {
    switch (modalStep) {
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

  const handlePublishItem = () => {
    console.log("Publishing item:", formData);
    handleNextStep();
  };

  const resetModal = () => {
    setModalStep('main');
    setFormData({
      category: "",
      product: "",
      unit: "",
      quantity: "",
      amount: ""
    });
  };

  const filteredProducts = availableItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderModalContent = () => {
    switch (modalStep) {
      case 'main':
        return (
          <div className="w-full max-w-md mx-auto">
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Category
                </label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none appearance-none bg-white text-gray-900"
                    value={formData.category}
                    onChange={(e) => handleFormChange('category', e.target.value)}
                  >
                    <option value="">Select Category</option>
                    <option value="Fresh Tomatoes">Fresh Tomatoes</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Tubers">Tubers</option>
                  </select>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <ChevronLeft size={18} className="text-gray-900 -rotate-90" />
                  </div>
                </div>
              </div>

              <div className="relative" ref={productDropdownRef}>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product
                </label>
                
                {/* Product dropdown trigger */}
                <div 
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setShowProductDropdown(!showProductDropdown)}
                >
                  <div className="flex items-center justify-between">
                    <span className={formData.product ? "text-gray-900" : "text-gray-500"}>
                      {formData.product || "Select product"}
                    </span>
                    <ChevronLeft size={18} className={`text-gray-900 transition-transform ${showProductDropdown ? 'rotate-90' : '-rotate-90'}`} />
                  </div>
                </div>

                {/* Product dropdown content */}
                {showProductDropdown && (
                  <div className="absolute z-20 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-xl max-h-80 overflow-hidden flex flex-col">
                    {/* Search bar */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 p-3">
                      <div className="relative">
                        <Search
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    </div>

                    {/* Scrollable product list */}
                    <div className="flex-1 overflow-y-auto">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                            onClick={() => {
                              handleFormChange('product', item.name);
                              setShowProductDropdown(false);
                              setSearchQuery("");
                            }}
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-900 text-sm">
                                  {item.name}
                                </span>
                                {formData.product === item.name && (
                                  <Check size={16} className="text-green-600 flex-shrink-0 ml-2" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-8 text-center text-gray-500">
                          No products found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Product Unit
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
                  Stock Quantity
                </label>
                <input
                  type="number"
                  placeholder="100"
                  value={formData.quantity}
                  onChange={(e) => handleFormChange('quantity', e.target.value)}
                  className="w-full px-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 placeholder:text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Amount/unit
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-900 font-medium">
                    ₦
                  </span>
                  <input
                    type="number"
                    placeholder="12,000"
                    value={formData.amount}
                    onChange={(e) => handleFormChange('amount', e.target.value)}
                    className="w-full pl-10 pr-4 py-3.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none bg-gray-50 placeholder:text-gray-500"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNextStep}
              disabled={!formData.category || !formData.product || !formData.unit || !formData.quantity || !formData.amount}
              className={`w-full mt-8 py-4 font-semibold rounded-full transition-colors uppercase tracking-wide ${
                formData.category && formData.product && formData.unit && formData.quantity && formData.amount
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              PREVIEW ITEM
            </button>
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
                placeholder="Search Items"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-lg outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            <div className="space-y-6 max-h-[65vh] overflow-y-auto">
              {unitCategories.map((category) => (
                <div key={category.name}>
                  <h3 className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">
                    {category.name}
                  </h3>
                  <div className="space-y-0">
                    {category.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between py-3.5 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
                        onClick={() => {
                          handleFormChange('unit', item);
                          setModalStep('main');
                        }}
                      >
                        <span className="text-gray-900 font-normal">
                          {item}
                        </span>
                        <ChevronLeft size={18} className="text-gray-400 rotate-180" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Preview Item</h2>

            {/* Product Image */}
            <div className="bg-gray-50 rounded-2xl p-8 mb-6 relative">
              <img
                src="https://images.unsplash.com/photo-1546470427-227a6b6b2cdf?w=400"
                alt="Fresh Tomatoes"
                className="w-full h-64 object-contain"
              />
              <div className="flex justify-center gap-2 mt-4">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>
            </div>

            {/* Product Info */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {formData.product} ({formData.unit})
              </h3>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1546470427-227a6b6b2cdf?w=50" 
                    alt="AJT FARMS"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-gray-600">AJT FARMS</span>
                <div className="flex items-center gap-1 ml-auto">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-medium">4.5</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                  DESCRIPTION
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Grown with care by our dedicated farmers, these tomatoes are plucked at their prime for unrivaled freshness and flavor.{' '}
                  <span className="text-green-600 font-medium cursor-pointer">Read More</span>
                </p>
              </div>
            </div>

            <button
              onClick={handlePublishItem}
              className="w-full py-4 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors uppercase tracking-wide"
            >
              PUBLISH
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
          {modalStep !== 'success' && modalStep !== 'main' && (
            <button
              onClick={handlePrevStep}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft size={20} className="text-gray-900" />
            </button>
          )}
          {modalStep === 'main' && <div className="w-10"></div>}
          {modalStep === 'success' && <div className="w-10"></div>}
          <h3 className="text-base font-semibold text-gray-900 uppercase tracking-wide">
            {modalStep === 'main' && 'ADD ITEM'}
            {modalStep === 'selectUnit' && 'Product Unit'}
            {modalStep === 'preview' && 'ADD ITEM'}
            {modalStep === 'success' && ''}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
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