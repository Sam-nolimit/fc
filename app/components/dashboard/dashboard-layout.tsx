"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/cn";

interface NavItem {
  name: string;
  href: string;
  icon: string; // Changed from React component to string path
  guestAllowed?: boolean;
}

const navigationItems: NavItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: "/images/home.png", guestAllowed: true },
  { name: "Farmers", href: "/farmers", icon: "/images/farmer.png", guestAllowed: true },
  { name: "Customers", href: "/customers", icon: "/images/customer.png", guestAllowed: true },
  { name: "Logistics", href: "/logistics", icon: "/images/logistics.png", guestAllowed: true },
  { name: "Orders", href: "/orders", icon: "/images/order.png", guestAllowed: true },
  { name: "Payments", href: "/payments", icon: "/images/payment.png", guestAllowed: false },
  { name: "Products", href: "/products", icon: "/images/product.png", guestAllowed: true },
//   { name: "Reports", href: "/reports", icon: "/images/report.png", guestAllowed: true },
  { name: "Settings", href: "/settings", icon: "/images/setting.png", guestAllowed: false },
];

interface DashboardLayoutProps {
  children: ReactNode;
  user: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  isGuest?: boolean;
}

export default function DashboardLayout({
  children,
  user,
  isGuest = false,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const pathname = usePathname();

  const displayedNavItems = isGuest
    ? navigationItems.filter((item) => item.guestAllowed)
    : navigationItems;

  const handleSignInClick = () => {
    window.location.href = "/login";
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    setIsLoggingOut(true);
    // Simulate logout process
    setTimeout(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }, 1000);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in zoom-in duration-200">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-6">
              {isLoggingOut ? (
                <svg
                  className="w-8 h-8 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              )}
            </div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {isLoggingOut ? "Signing Out..." : "Sign Out"}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {isLoggingOut
                ? "Please wait while we sign you out of your account."
                : "Are you sure you would like to sign out of your account, a password will be required to sign back in."}
            </p>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={handleLogoutCancel}
                disabled={isLoggingOut}
                className="px-6 py-3 text-green-700 font-semibold hover:bg-green-50 rounded-lg transition-colors uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleLogoutConfirm}
                disabled={isLoggingOut}
                className="px-8 py-3 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-full transition-colors uppercase text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoggingOut && (
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                )}
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300",
          collapsed ? "w-20" : "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            {!collapsed ? (
              <Image
                src="/images/farmcitylogo.svg"
                alt="Farm City"
                width={140}
                height={40}
                priority
              />
            ) : (
              <Image
                src="/images/farmcitylogo.svg"
                alt="Farm City"
                width={36}
                height={36}
              />
            )}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* User info */}
          <div
            className={cn(
              "p-4 border-b border-gray-200",
              collapsed
                ? "flex flex-col items-center gap-1.5"
                : "flex items-center gap-3"
            )}
          >
            <div className="w-11 h-11 bg-green-100 rounded-full flex items-center justify-center ring-1 ring-green-200">
              <span className="text-green-700 font-semibold text-lg">
                {user.name
                  .split(" ")
                  .map((n) => n[0]?.toUpperCase())
                  .join("")}
              </span>
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-sm text-gray-500 truncate">
                  {isGuest ? "Preview Mode" : user.role}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {displayedNavItems.map((item) => {
              const isActive =
                pathname === item.href ||
                pathname?.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                    isActive
                      ? "bg-green-50 text-green-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50",
                    collapsed && "justify-center"
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  {/* Image icon */}
                  <div className="relative w-5 h-5">
                    <Image
                      src={item.icon}
                      alt={`${item.name} icon`}
                      fill
                      className={cn(
                        "object-contain",
                        isActive ? "filter-green" : "filter-gray-500"
                      )}
                      style={{
                        filter: isActive 
                          ? 'invert(40%) sepia(64%) saturate(1200%) hue-rotate(100deg) brightness(90%) contrast(90%)'
                          : 'invert(40%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(90%) contrast(80%)'
                      }}
                    />
                  </div>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Bottom action */}
          <div className="p-4 border-t border-gray-200">
            {isGuest ? (
              <button
                onClick={handleSignInClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
              >
                {/* User icon as image */}
                <div className="relative w-5 h-5">
                  <Image
                    src="/images/icons/user.svg"
                    alt="User"
                    fill
                    className="object-contain invert brightness-0"
                  />
                </div>
                {!collapsed && <span>Sign in</span>}
              </button>
            ) : (
              <button
                onClick={handleLogoutClick}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50"
              >
                {/* Logout icon as image */}
                <div className="relative w-5 h-5">
                  <Image
                    src="/images/icons/logout.svg"
                    alt="Logout"
                    fill
                    className="object-contain"
                    style={{
                      filter: 'invert(31%) sepia(100%) saturate(7483%) hue-rotate(350deg) brightness(90%) contrast(94%)'
                    }}
                  />
                </div>
                {!collapsed && <span className="font-medium">Log Out</span>}
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-300 min-h-screen",
          collapsed ? "lg:pl-20" : "lg:pl-64"
        )}
      >
        {/* Top bar */}
        <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
          <div className="flex items-center px-5 py-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-700 hover:text-gray-900"
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Preview banner */}
        {isGuest && (
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-b border-amber-200 px-6 py-3">
            <div className="flex items-center gap-3 text-amber-800 text-sm">
              <AlertTriangle size={18} />
              <span>
                <strong>Preview Mode</strong> — Some features are disabled.
              </span>
              <button
                onClick={handleSignInClick}
                className="ml-auto underline font-medium"
              >
                Sign in →
              </button>
            </div>
          </div>
        )}

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}