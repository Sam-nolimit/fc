// @/services/auth.ts
import { api } from "@/lib/api";

export const AuthService = {
  async login(payload: { email: string; password: string }) {
    return api<{
      token: string;
      user: {
        id: string;
        email: string;
        role: string;
        firstName: string;
        lastName: string;
      };
    }>("/users/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify(payload),
    });
  },

  async register(payload: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    businessName?: string;
    role: string;
  }) {
    return api<{
      message: string;
      user: {
        id: string;
        email: string;
        role: string;
        firstName: string;
        lastName: string;
      };
    }>("/users/signup", {
      method: "POST",
      auth: false,
      body: JSON.stringify(payload),
    });
  },

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },

  getCurrentUser() {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
};