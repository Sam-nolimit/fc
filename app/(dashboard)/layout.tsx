// app/dashboard/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import DashboardLayout from "../components/dashboard/dashboard-layout";
// import DashboardLayout from "@/components/dashboard/dashboard-layout";  // ← adjust path to where you saved the component

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
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);

        const fullName =
          parsed.name ||
          `${parsed.firstName || ""} ${parsed.lastName || ""}`.trim() ||
          "User";

        setUser({
          name: fullName,
          email: parsed.email || "unknown@example.com",
          role: parsed.role || "User",
          avatar: parsed.avatar,
        });

        setIsGuest(false);
      } catch (err) {
        console.error("Invalid user data in localStorage", err);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
      }
    } else {
      // Guest / preview mode
      setUser({
        name: "Guest Preview",
        email: "preview@demo.app",
        role: "Viewer",
        avatar: undefined,
      });
      setIsGuest(true);
      console.log("[Dashboard] Running in guest / preview mode");
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

  // We always render — guest or logged-in
  if (!user) {
    return null; // safety fallback (should not happen)
  }

  return (
    <DashboardLayout user={user} isGuest={isGuest}>
      {children}
    </DashboardLayout>
  );
}