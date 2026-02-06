import { api } from "@/lib/axios-api";

export interface Product {
  id: number;
  productGalleryId: number;
  price: number;
  stockQuantity: number;
  unit: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductPayload {
  productGalleryId: number;
  price: number;
  stockQuantity: number;
  unit: string;
}

export interface UpdateProductPayload {
  productGalleryId?: number;
  price?: number;
  stockQuantity?: number;
  unit?: string;
}

export interface ProductResponse {
  data: Product | null;
  message: string;
  status: boolean;
  timeCreated: string;
}

export interface ProductsResponse {
  data: Product[] | null;
  message: string;
  status: boolean;
  timeCreated: string;
}

export interface DeleteProductResponse {
  data: any | null;
  message: string;
  status: boolean;
  timeCreated: string;
}

export const ProductService = {
  /**
   * Create a new product
   * POST {{baseUrl}}api/v1/products
   */
  async createProduct(payload: CreateProductPayload) {
    try {
      const response = await api.post<ProductResponse>("/products", payload);
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "Product created successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Create product error:", error);
      
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

  /**
   * Get a product by ID
   * GET {{baseUrl}}api/v1/products/:id
   */
  async getProductById(id: number) {
    try {
      const response = await api.get<ProductResponse>(`/products/${id}`);
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "Product retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Get product error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get product";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Get products by farm ID
   * GET {{baseUrl}}api/v1/products/farm/:farmId
   */
  async getProductsByFarm(farmId: number) {
    try {
      const response = await api.get<ProductsResponse>(`/products/farm/${farmId}`);
      
      return {
        data: response.data?.data || response.data || [],
        message: response.data?.message || response.message || "Products retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Get products by farm error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get products by farm";
      
      return {
        data: [],
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Update a product
   * PUT {{baseUrl}}api/v1/products/:id
   */
  async updateProduct(id: number, payload: UpdateProductPayload) {
    try {
      const response = await api.put<ProductResponse>(`/products/${id}`, payload);
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "Product updated successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Update product error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to update product";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Delete a product
   * DELETE {{baseUrl}}api/v1/products/:id
   */
  async deleteProduct(id: number) {
    try {
      const response = await api.delete<DeleteProductResponse>(`/products/${id}`);
      
      return {
        data: response.data?.data || null,
        message: response.data?.message || response.message || "Product deleted successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Delete product error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to delete product";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Get recently added products
   * GET {{baseUrl}}api/v1/products/recent
   */
  async getRecentProducts() {
    try {
      const response = await api.get<ProductsResponse>("/products/recent");
      
      return {
        data: response.data?.data || response.data || [],
        message: response.data?.message || response.message || "Recent products retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Get recent products error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get recent products";
      
      return {
        data: [],
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  }
};