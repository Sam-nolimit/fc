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

export interface AdminRegisterResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    otp: string;
    role: string;
    userId: number;
  };
  message: string;
  status: boolean;
  timeCreated: string;
}

export interface UserRegisterResponse {
  data: {
    userId: number;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
  };
  message: string;
  status: boolean;
  timeCreated: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string; // Only used for frontend validation
  phone?: string;
  businessName?: string;
  role: string;
}

export interface AdminRegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
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
        email: payload.email,
        role: response.data.roles[0] || "USER",
        roles: response.data.roles,
      },
    };
  },

  async register(payload: RegisterPayload) {
    // Determine endpoint based on role
    const isAdmin = payload.role.toLowerCase() === "admin";
    const endpoint = isAdmin ? "/admins/register" : "/users/register";
    
    // Prepare payload based on role
    let registrationPayload: any;
    
    if (isAdmin) {
      registrationPayload = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
      } as AdminRegisterPayload;
    } else {
      registrationPayload = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        password: payload.password,
        phone: payload.phone,
        businessName: payload.businessName,
        role: payload.role.toUpperCase(),
      };
    }

    if (isAdmin) {
      const response = await api<AdminRegisterResponse>(endpoint, {
        method: "POST",
        auth: false,
        body: JSON.stringify(registrationPayload),
      });

      // For admin registration that returns OTP
      return {
        message: response.message,
        user: {
          id: response.data.userId.toString(),
          email: payload.email,
          role: response.data.role,
          roles: [response.data.role],
          otp: response.data.otp,
        },
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    } else {
      const response = await api<UserRegisterResponse>(endpoint, {
        method: "POST",
        auth: false,
        body: JSON.stringify(registrationPayload),
      });

      // For regular user registration
      return {
        message: response.message,
        user: {
          id: response.data.userId.toString(),
          email: response.data.email,
          role: response.data.role,
          roles: [response.data.role],
          firstName: response.data.firstName,
          lastName: response.data.lastName,
        },
      };
    }
  },

  async verifyOtp(userId: number, otp: string) {
    return api<{
      data: {
        verified: boolean;
        message: string;
      };
      message: string;
      status: boolean;
      timeCreated: string;
    }>("/admins/verify-otp", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ userId, otp }),
    });
  },

  async getUserProfile(token: string) {
    return api<{
      data: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string;
        userType: string;
        roles: string[];
      };
      message: string;
      status: boolean;
    }>("/users/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async refreshToken(refreshToken: string) {
    return api<{
      data: {
        accessToken: string;
        refreshToken: string;
      };
      message: string;
      status: boolean;
    }>("/users/refresh-token", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ refreshToken }),
    });
  },

  async forgotPassword(email: string) {
    return api<{
      data: {
        resetToken: string;
      };
      message: string;
      status: boolean;
    }>("/users/forgot-password", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ email }),
    });
  },

  async resetPassword(token: string, newPassword: string) {
    return api<{
      message: string;
      status: boolean;
    }>("/users/reset-password", {
      method: "POST",
      auth: false,
      body: JSON.stringify({ token, newPassword }),
    });
  },

  async updateProfile(userId: number, updates: any, token: string) {
    return api<{
      data: any;
      message: string;
      status: boolean;
    }>(`/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
  },

  logout() {
    // Clear all auth-related items from localStorage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user_id");
    localStorage.removeItem("temp_email");
    localStorage.removeItem("temp_user_id");
    
    // Optional: Clear sessionStorage as well
    sessionStorage.clear();
  },

  getCurrentUser() {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  },

  getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("access_token");
    }
    return null;
  },

  setUser(user: any) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  },

  setToken(token: string, refreshToken?: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", token);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }
    }
  },

  isAuthenticated(): boolean {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("access_token");
    }
    return false;
  },

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "ADMIN" || user?.roles?.includes("ADMIN");
  },

  isFarmer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "FARMER" || user?.roles?.includes("FARMER");
  },

  isBuyer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "BUYER" || user?.roles?.includes("BUYER");
  },

  isDistributor(): boolean {
    const user = this.getCurrentUser();
    return user?.role === "DISTRIBUTOR" || user?.roles?.includes("DISTRIBUTOR");
  },
};