// services/product.service.ts
import { api } from "@/lib/axios-api";

export interface Product {
  id: number;
  productGalleryId: number;
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
  distanceKm: number | null;
}

export interface ProductsApiResponse {
  data: {
    content: Product[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: any;
    size: number;
    sort: any;
    totalElements: number;
    totalPages: number;
  };
  message: string;
  status: boolean;
  timeCreated: string;
}

export const ProductService = {
  async getAllProducts(params?: { 
    categoryId?: number; 
    farmId?: number; 
    page?: number; 
    size?: number;
    search?: string;
  }) {
    try {
      console.log("ProductService - Calling API with params:", params);
      
      const response = await api.get<ProductsApiResponse>("/products/all", {
        params: {
          page: params?.page || 0,
          size: params?.size || 200,
          categoryId: params?.categoryId,
          farmId: params?.farmId,
          search: params?.search
        }
      });

      console.log("ProductService - Raw response:", response);
      
      // The interceptor already returns the content directly
      const products = response?.content || [];
      
      console.log("ProductService - Extracted products:", products);
      console.log("Product names:", products.map(p => p.name));

      return {
        data: products,
        message: "Products retrieved successfully",
        status: true,
        timeCreated: new Date().toISOString()
      };
    } catch (error: any) {
      console.error("ProductService - Error details:", error);
      console.error("Error response:", error.response);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get products";
      
      return {
        data: [],
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  async createProduct(payload: any) {
    try {
      console.log("ProductService - Creating product:", payload);
      
      const response = await api.post("/products", payload);
      
      console.log("ProductService - Create response:", response);

      return {
        data: response,
        message: "Product created successfully",
        status: true,
        timeCreated: new Date().toISOString()
      };
    } catch (error: any) {
      console.error("ProductService - Create error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to create product";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  // ... other methods
};