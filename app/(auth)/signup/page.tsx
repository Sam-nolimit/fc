"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { AuthService } from "@/services/auth";
import { AuthService } from "@/services/auth.service";


export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "admin" 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!formData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password.trim()) {
      setError("Password is required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");

    try {
      // Call AuthService.register
      const result = await AuthService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined,
        role: formData.role
      });

      // Handle admin registration (requires OTP verification)
      if (formData.role.toLowerCase() === "admin") {
        // Note: The AuthService will return OTP in the response for admin registration
        setSuccess("Admin account created! Please check your email for OTP verification.");
        
        // Store temporary data for OTP verification page
        if (typeof window !== "undefined") {
          localStorage.setItem("temp_user_id", (result as any).user?.id || "");
          localStorage.setItem("temp_email", formData.email);
        }
        
        // Redirect to OTP verification after 2 seconds
        setTimeout(() => {
          router.push("/verify-otp");
        }, 2000);
      } else {
        // Handle regular user registration
        setSuccess("Account created successfully! Redirecting to login...");
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }

    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Logo and Back Button */}
      <header className="p-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/images/farmcitylogo.svg"
            alt="Farm City"
            width={188}
            height={188}
          />
        </div>
        <Link href="/login" className="text-gray-600 hover:text-gray-800">
          ← Back to Login
        </Link>
      </header>

      {/* Create Account Form */}
      <main className="flex flex-1 items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold mb-2">Create Account</h1>
            <p className="text-gray-500 text-sm">
              Fill in your details to create a new account
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Two-column layout for name */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">
                  First Name *
                </label>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  className="h-12 rounded-xl"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">
                  Last Name *
                </label>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  className="h-12 rounded-xl"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="text-left">
              <label className="block text-sm font-medium mb-2">
                Email Address *
              </label>
              <Input
                type="email"
                name="email"
                placeholder="john@example.com"
                className="h-12 rounded-xl"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div className="text-left">
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <Input
                type="tel"
                name="phone"
                placeholder="0816 1596 789"
                className="h-12 rounded-xl"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            

            {/* Passwords */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">
                  Password *
                </label>
                <Input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="h-12 rounded-xl"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="text-left">
                <label className="block text-sm font-medium mb-2">
                  Confirm Password *
                </label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className="h-12 rounded-xl"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Password must be at least 6 characters long
            </p>

            {/* Buttons */}
            <div className="pt-6 space-y-4">
              <Button
                type="submit"
                className="w-full h-12 rounded-full bg-green-700 hover:bg-green-800 text-white font-medium"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    CREATING ACCOUNT...
                  </span>
                ) : "CREATE ACCOUNT"}
              </Button>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="text-green-700 hover:text-green-800 font-medium">
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          </form>

          {/* Terms and Conditions */}
          <div className="mt-8 pt-6 border-t text-center">
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-green-700 hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-green-700 hover:underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}