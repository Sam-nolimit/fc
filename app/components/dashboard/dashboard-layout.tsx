"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  ShoppingCart, 
  Truck, 
  Package, 
  CreditCard, 
  Settings, 
  LogOut,
  User,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/cn";
// import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Farmers", href: "/farmers", icon: Users },
  { name: "Customers", href: "/customers", icon: User },
  { name: "Logistics", href: "/logistics", icon: Truck },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Payments", href: "/payments", icon: CreditCard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Reports", href: "/reports", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

export default function DashboardLayout({ children, user }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    // Implement logout logic
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300 lg:translate-x-0",
        collapsed ? "w-20" : "w-64",
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {!collapsed && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">F</span>
                </div>
                <span className="text-xl font-bold text-gray-800">Farm City</span>
              </div>
            )}
            {collapsed && (
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-lg">F</span>
              </div>
            )}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100"
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X size={24} />
            </button>
          </div>

          {/* User Profile */}
          <div className={cn(
            "p-4 border-b border-gray-200",
            collapsed ? "flex flex-col items-center" : "flex items-center gap-3"
          )}>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-700 font-semibold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-gray-700 hover:bg-gray-50",
                    collapsed ? "justify-center" : ""
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={20} className={isActive ? "text-green-600" : "text-gray-500"} />
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors",
                collapsed ? "justify-center" : ""
              )}
            >
              <LogOut size={20} />
              {!collapsed && <span className="font-medium">Log Out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "lg:pl-20" : "lg:pl-64"
      )}>
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <span className="text-gray-600">Help</span>
                </button>
                <div className="w-8 h-8 bg-gray-100 rounded-full" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}