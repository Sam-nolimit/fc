// app/dashboard/layout.tsx
"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    console.log(
      "🔵 [DASHBOARD LAYOUT] User data:",
      storedUser ? "✅ Present" : "❌ Missing",
    );

    if (!storedUser) {
      setLoading(false);
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);

      const fullName =
        parsed.name ||
        `${parsed.firstName || ""} ${parsed.lastName || ""}`.trim() ||
        parsed.email?.split("@")[0] ||
        "User";

      setUser({
        name: fullName,
        email: parsed.email || "unknown@example.com",
        role: parsed.role || "User",
        avatar: parsed.avatar,
      });

    } catch (err) {
      console.error(
        "❌ [DASHBOARD LAYOUT] Invalid user data in localStorage",
        err,
      );
    }

    setLoading(false);
  }, []);

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

  return (
    <DashboardLayout
      user={user || { name: "User", email: "", role: "User" }}
      isGuest={!user}
    >
      {children}
    </DashboardLayout>
  );
}
