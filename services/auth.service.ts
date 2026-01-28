import { api } from "@/lib/api";

export const AuthService = {
  login(payload: { email: string; password: string }) {
    return api<{
      token: string;
      user: {
        id: string;
        email: string;
        role: string;
      };
    }>("/users/login", {
      method: "POST",
      auth: false,
      body: JSON.stringify(payload),
    });
  },
};
