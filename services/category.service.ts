import { api } from "@/lib/axios-api";

export interface Category {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface PaginatedCategories {
  content: Category[];
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
}

export const CategoryService = {
  async getAllCategoriesList() {
    try {
      console.log("CategoryService - Calling API...");
      const response = await api.get<PaginatedCategories>("/admin/categories", {
        params: {
          page: 0,
          size: 100
        }
      });

      console.log("CategoryService - API Response:", response);
      
      const categories = response?.content || [];
      
      return {
        data: categories,
        message: "Categories retrieved successfully",
        status: true,
        timeCreated: new Date().toISOString()
      };
    } catch (error: any) {
      console.error("CategoryService - Error details:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get categories";
      
      return {
        data: [],
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },
};