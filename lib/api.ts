import { api } from "@/lib/api";

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
    const response = await api<LoginResponse>("/users/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify(payload),
    });

    // Return formatted data that matches your frontend expectations
    return {
      token: response.data.accessToken,
      refreshToken: response.data.refreshToken,
      user: {
        id: response.data.userId.toString(),
        email: payload.email, // You might need to get email from a different endpoint
        role: response.data.roles[0] || "USER", // Take first role or default
        roles: response.data.roles,
      },
    };
  },

  // Add this method to get user details
  async getUserProfile(token: string) {
    return api<{
      data: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        userType: string;
        // Add other user fields as needed
      };
    }>("/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // Rest of your methods...
  register(payload: any) {
    // Your registration logic
  },

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
  },

  getCurrentUser() {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
};