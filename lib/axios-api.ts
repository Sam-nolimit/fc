import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.status === 201 || response.status === 200) {
      if (response.data && typeof response.data === "object") {
        if (response.config.url?.includes("/login")) {
          return response.data;
        }
        if ("data" in response.data) {
          return response.data.data;
        }
        return response.data;
      }
      return response.data;
    }
    
    return Promise.reject(response);
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 201) {
        return Promise.resolve(error.response.data);
      }
      
      const errorMessage = error.response.data?.message || 
                          error.response.data?.error || 
                          "Request failed";
      return Promise.reject(new Error(errorMessage));
    } else if (error.request) {
      return Promise.reject(new Error("Network error. Please check your connection."));
    } else {
      return Promise.reject(error);
    }
  }
);

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get<T>(url, config).then((res) => res as T),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post<T>(url, data, config).then((res) => res as T),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put<T>(url, data, config).then((res) => res as T),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete<T>(url, config).then((res) => res as T),

  patch: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.patch<T>(url, data, config).then((res) => res as T),
};