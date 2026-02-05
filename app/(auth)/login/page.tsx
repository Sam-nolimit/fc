"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { AuthService } from "@/services/auth.service";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await AuthService.login({
        email: formData.email,
        password: formData.password,
      });

      if (response.token) {
        localStorage.setItem("access_token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        if (response.user.role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/dashboard";
        }
      }
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6">
        <div className="flex items-center gap-2">
          <Image
            src="/images/farmcitylogo.svg"
            alt="Farm City"
            width={188}
            height={188}
          />
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-semibold mb-2">Welcome Admin</h1>
          <p className="text-gray-500 text-sm mb-8">
            Enter your login email and password to access your account
          </p>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="text-left">
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="Enter your email here"
                className="h-12 rounded-xl"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="text-left">
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="h-12 rounded-xl"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            {/* Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-green-700 hover:bg-green-800 text-white font-medium"
              disabled={loading}
            >
              {loading ? "LOGGING IN..." : "LOG IN"}
            </Button>

            {/* Create Account Link */}
            <div className="pt-4 border-t">
              <p className="text-gray-600 text-sm mb-4">
                Don't have an account?
              </p>
              <Link href="/signup">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-12 rounded-full border-gray-300 hover:bg-gray-50"
                >
                  CREATE ACCOUNT
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
