// services/farmer.service.ts
import { api } from "@/lib/axios-api";

export interface Farm {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string | null;
    latitude: number;
    longitude: number;
  };
  distanceKm: number | null;
  rating: number;
  createdAt: string;
}

export interface PaginatedFarms {
  content: Farm[];
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

export const FarmService = {
  async getAllFarms(params?: { limit?: number; page?: number }) {
    try {
      console.log("FarmService - Calling API...");
      const response = await api.get<PaginatedFarms>("/farms", {
        params: {
          page: params?.page || 0,
          size: params?.limit || 50
        }
      });

      console.log("FarmService - API Response:", response);
      
      const farms = response?.content || [];
      
      console.log("FarmService - Extracted farms:", farms);
      console.log("Farm names:", farms.map(f => f.name));

      return {
        data: farms,
        message: "Farms retrieved successfully", 
        status: true,
        timeCreated: new Date().toISOString()
      };
    } catch (error: any) {
      console.error("FarmService - Error details:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get farms";
      
      return {
        data: [],
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },
};