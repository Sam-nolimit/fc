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

export interface DirectOtpVerificationResponse {
  verified: boolean;
}

export interface StandardOtpVerificationResponse {
  data: {
    verified?: boolean;
  } | null;
  message: string;
  status: boolean;
  timeCreated: string;
}

export interface OtpResendResponse {
  data: any | null;
  message: string;
  status: boolean;
  timeCreated: string;
}

export const AuthService = {
  async login(payload: { email: string; password: string }) {
    const response = await api.post<LoginResponse>("/users/login", payload);
    
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

  async verifyOtp(email: string, otp: string) {
    try {
      const response = await api.post<DirectOtpVerificationResponse>("/users/verify-otp", { email, otp });
      
      console.log("OTP verification response:", response.data);
      
      if (response.data && typeof response.data === 'object' && 'verified' in response.data) {
        return {
          data: { verified: response.data.verified },
          message: response.data.verified ? "OTP verified successfully" : "OTP verification failed",
          status: response.data.verified === true,
          timeCreated: new Date().toISOString()
        };
      }
      
      const data = response.data as any;
      if (data && typeof data === 'object') {
        return {
          data: data.data || null,
          message: data.message || "OTP verification completed",
          status: data.status === true,
          timeCreated: data.timeCreated || new Date().toISOString()
        };
      }
      
      return {
        data: response.data || null,
        message: "OTP verified successfully",
        status: true,
        timeCreated: new Date().toISOString()
      };
      
    } catch (error: any) {
      console.error("OTP verification error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error ||
                          error.message || 
                          "Failed to verify OTP";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  },

  async resendOtp(email: string) {  
    try {
      const response = await api.post<any>("/users/resend-otp", { email });
      
      const apiResponse = response.data;
      
      return {
        data: apiResponse?.data || null,
        message: apiResponse?.message || "OTP sent successfully",
        status: apiResponse?.status === true,
        timeCreated: apiResponse?.timeCreated || new Date().toISOString()
      };
      
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to resend OTP";
      
      return {
        data: null,
        message: errorMessage,
        status: false,
        timeCreated: new Date().toISOString()
      };
    }
  }
};