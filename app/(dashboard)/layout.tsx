// app/dashboard/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import DashboardLayout from "../components/dashboard/dashboard-layout";

interface DashboardUser {
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    console.log("🔵 [DASHBOARD LAYOUT] Checking authentication...");
    console.log("🔵 [DASHBOARD LAYOUT] Token:", token ? "✅ Present" : "❌ Missing");
    console.log("🔵 [DASHBOARD LAYOUT] User data:", storedUser ? "✅ Present" : "❌ Missing");

    // If no token or user data, redirect to login
    if (!token || !storedUser) {
      console.log("❌ [DASHBOARD LAYOUT] No authentication found, redirecting to login");
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      console.log("🔵 [DASHBOARD LAYOUT] Parsed user data:", parsed);

      const fullName =
        parsed.name ||
        `${parsed.firstName || ""} ${parsed.lastName || ""}`.trim() ||
        parsed.email?.split("@")[0] || // Use email username as fallback
        "User";

      setUser({
        name: fullName,
        email: parsed.email || "unknown@example.com",
        role: parsed.role || "User",
        avatar: parsed.avatar,
      });

      console.log("✅ [DASHBOARD LAYOUT] User authenticated:", fullName);

    } catch (err) {
      console.error("❌ [DASHBOARD LAYOUT] Invalid user data in localStorage", err);
      // Clear invalid data and redirect to login
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      localStorage.removeItem("refresh_token");
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-green-600" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout user={user} isGuest={false}>
      {children}
    </DashboardLayout>
  );
}