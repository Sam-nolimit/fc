"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/app/components/layout/dashboard-layout";
import { Loader2 } from "lucide-react";

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
    // Check authentication
    const checkAuth = () => {
      const token = localStorage.getItem("access_token");
      const userData = localStorage.getItem("user");

      if (!token || !userData) {
        router.push("/login");
        return;
      }

      try {
        const parsedUser = JSON.parse(userData);
        setUser({
          name: parsedUser.name || parsedUser.firstName + " " + parsedUser.lastName || "User",
          email: parsedUser.email,
          role: parsedUser.role || "Admin",
          avatar: parsedUser.avatar
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}