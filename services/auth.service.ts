import { AdminRegisterPayload, AdminRegisterResponse, RegisterPayload, UserRegisterResponse } from "@/lib/api";
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

   async register(payload: any) {
      const isAdmin = payload?.role && String(payload.role).toLowerCase() === "admin";
      const endpoint = isAdmin ? "/admins/register" : "/users/register";

      let registrationPayload: any;
      if (isAdmin) {
        registrationPayload = {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
          phone: payload.phone,
        };
      } else {
        registrationPayload = {
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
          phone: payload.phone,
          businessName: payload.businessName,
          role: payload.role ? String(payload.role).toUpperCase() : undefined,
        };
      }

      if (isAdmin) {
        const response = await api.post<any>(endpoint, registrationPayload);

        return {
          message: response?.message ?? response?.data?.message,
          user: {
            id: String(response?.data?.userId ?? response?.userId ?? ""),
            email: payload.email,
            role: response?.data?.role ?? response?.role,
            roles: [response?.data?.role ?? response?.role],
            otp: response?.data?.otp ?? null,
          },
          token: response?.data?.accessToken ?? response?.accessToken,
          refreshToken: response?.data?.refreshToken ?? response?.refreshToken,
        };
      } else {
        const response = await api.post<any>(endpoint, registrationPayload);

        return {
          message: response?.message ?? response?.data?.message,
          user: {
            id: String(response?.data?.userId ?? response?.userId ?? ""),
            email: response?.data?.email ?? response?.email,
            role: response?.data?.role ?? response?.role,
            roles: [response?.data?.role ?? response?.role],
            firstName: response?.data?.firstName ?? response?.firstName,
            lastName: response?.data?.lastName ?? response?.lastName,
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
        }>("/users/verify-otp", {
          method: "POST",
          auth: false,
          body: JSON.stringify({ userId, otp }),
        });
      },

      async resendOtp(email: string) {  
        return api<{
            data: {
                message: string;
            };
            message: string;
            status: boolean;
            timeCreated: string;
        }>("/users/resend-otp", {
            method: "POST",
            auth: false,
            body: JSON.stringify({ email }),
        });
      }
};