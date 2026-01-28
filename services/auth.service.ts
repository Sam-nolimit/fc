import { api } from "@/lib/axios-api";

export interface LoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    otp: string | null;
    roles: string[];
    userId: number;
  };
  message: string;
  status: boolean;
  timeCreated: string;
}

export const AuthService = {
  async login(payload: { email: string; password: string }) {
    const response = await api.post<LoginResponse>("/users/login", payload);
    
    // Return formatted data
    return {
      token: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      user: {
        id: response.data.userId.toString(),
        email: payload.email,
        role: response.data.roles[0] || "USER",
        roles: response.data.roles,
      },
    };
  },

  // Rest of the methods...
};