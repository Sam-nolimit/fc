import { api } from "@/lib/axios-api";

export interface Location {
  street: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface Farm {
  id: number;
  name: string;
  description: string;
  location: Location;
  createdAt?: string;
  updatedAt?: string;
  distance?: number; // For nearby farms
}

export interface CreateFarmPayload {
  name: string;
  description: string;
  location: Location;
}

export interface UpdateFarmPayload {
  name?: string;
  description?: string;
  location?: Partial<Location>;
}

export interface GetFarmsParams {
  id?: number;
  name?: string;
  page?: number;
  limit?: number;
}

export interface FarmResponse {
  data: Farm | null;
  message: string;
  status: boolean;
  timeCreated: string;
}

export interface FarmsResponse {
  data: Farm[] | null;
  message: string;
  status: boolean;
  timeCreated: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export interface DeleteFarmResponse {
  data: any | null;
  message: string;
  status: boolean;
  timeCreated: string;
}

export const FarmService = {
  /**
   * Create a new farm
   * POST {{baseUrl}}api/v1/farms
   */
  async createFarm(payload: CreateFarmPayload) {
    try {
      const response = await api.post<FarmResponse>("/farms", payload);
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "Farm created successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Create farm error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to create farm";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Get all farms with optional filters
   * GET {{baseUrl}}api/v1/farms?id=2&name=Green Valley Farm 1
   */
  async getAllFarms(params?: GetFarmsParams) {
    try {
      const response = await api.get<FarmsResponse>("/farms", { params });
      
      return {
        data: response.data?.data || response.data || [],
        message: response.data?.message || response.message || "Farms retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString(),
        pagination: response.data?.pagination
      };
    } catch (error: any) {
      console.error("Get all farms error:", error);
      
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

  /**
   * Get a farm by ID
   * GET {{baseUrl}}api/v1/farms/:id
   */
  async getFarmById(id: number) {
    try {
      const response = await api.get<FarmResponse>(`/farms/${id}`);
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "Farm retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Get farm error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get farm";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Get farm by farmer (user ID)
   * GET {{baseUrl}}api/v1/farms/farmer/:farmerId
   */
  async getFarmByFarmer(farmerId: number) {
    try {
      const response = await api.get<FarmsResponse>(`/farms/farmer/${farmerId}`);
      
      return {
        data: response.data?.data || response.data || [],
        message: response.data?.message || response.message || "Farmer's farms retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Get farm by farmer error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get farmer's farms";
      
      return {
        data: [],
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Update a farm
   * PUT {{baseUrl}}api/v1/farms/:id
   */
  async editFarm(id: number, payload: UpdateFarmPayload) {
    try {
      const response = await api.put<FarmResponse>(`/farms/${id}`, payload);
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "Farm updated successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Update farm error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to update farm";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Delete a farm
   * DELETE {{baseUrl}}api/v1/farms/:id
   */
  async deleteFarm(id: number) {
    try {
      const response = await api.delete<DeleteFarmResponse>(`/farms/${id}`);
      
      return {
        data: response.data?.data || null,
        message: response.data?.message || response.message || "Farm deleted successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Delete farm error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to delete farm";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Get farms near the user's location
   * GET {{baseUrl}}api/v1/farms/near-me
   */
  async getFarmsNearMe(latitude?: number, longitude?: number, radius?: number) {
    try {
      const params: any = {};
      if (latitude !== undefined) params.latitude = latitude;
      if (longitude !== undefined) params.longitude = longitude;
      if (radius !== undefined) params.radius = radius;

      const response = await api.get<FarmsResponse>("/farms/near-me", { params });
      
      return {
        data: response.data?.data || response.data || [],
        message: response.data?.message || response.message || "Nearby farms retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Get farms near me error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get nearby farms";
      
      return {
        data: [],
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  }
};