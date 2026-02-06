import { api } from "@/lib/axios-api";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName?: string;
  role: string;
  roles?: string[];
  createdAt?: string;
  updatedAt?: string;
  isVerified?: boolean;
}

export interface GetUsersParams {
  id?: number;
  email?: string;
  role?: string;
  page?: number;
  limit?: number;
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  businessName?: string;
  role?: string;
}

export interface UserResponse {
  data: User | null;
  message: string;
  status: boolean;
  timeCreated: string;
}

export interface UsersResponse {
  data: User[] | null;
  message: string;
  status: boolean;
  timeCreated: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

export const CustomerService = {
  /**
   * Get a user by ID
   * GET {{baseUrl}}api/v1/users/:id
   */
  async getUserById(id: number) {
    try {
      const response = await api.get<UserResponse>(`/users/${id}`);
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "User retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Get user error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get user";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Get all users with optional filters
   * GET {{baseUrl}}api/v1/users?id=1
   */
  async getAllUsers(params?: GetUsersParams) {
    try {
      const response = await api.get<UsersResponse>("/users", { params });
      
      return {
        data: response.data?.data || response.data || [],
        message: response.data?.message || response.message || "Users retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString(),
        pagination: response.data?.pagination
      };
    } catch (error: any) {
      console.error("Get all users error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get users";
      
      return {
        data: [],
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Update a user
   * PUT {{baseUrl}}api/v1/users/:id
   */
  async updateUser(id: number, payload: UpdateUserPayload) {
    try {
      const response = await api.put<UserResponse>(`/users/${id}`, payload);
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "User updated successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Update user error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to update user";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  /**
   * Get current authenticated user profile
   * GET {{baseUrl}}api/v1/users/me
   */
  async getCurrentUser() {
    try {
      const response = await api.get<UserResponse>("/users/me");
      
      return {
        data: response.data?.data || response.data || null,
        message: response.data?.message || response.message || "User profile retrieved successfully",
        status: response.data?.status ?? true,
        timeCreated: response.data?.timeCreated || new Date().toISOString()
      };
    } catch (error: any) {
      console.error("Get current user error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to get user profile";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  }
};