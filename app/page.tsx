"use client";

import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Logo */}
      <header className="p-6">
        <div className="flex justify-center">
          <Image
            src="/images/farmcitylogo.svg"
            alt="Farm City"
            width={188}
            height={188}
          />
        </div>
      </header>

      {/* Centered Welcome Card */}
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm text-center">
          <h1 className="text-2xl font-semibold mb-2">Welcome to Farm City</h1>
          <p className="text-gray-500 text-sm mb-8">
            Manage your farm, track your crops, and grow your business.
          </p>

          <div className="space-y-4">
            {/* Login Button */}
            <Button
              onClick={() => router.push("/login")}
              className="w-full h-12 rounded-full bg-green-700 hover:bg-green-800 text-white font-medium"
            >
              LOG IN
            </Button>

            {/* Create Account Button */}
            <Button
              onClick={() => router.push("/signup")}
              className="w-full h-12 rounded-full bg-slate-100 hover:bg-slate-200 text-gray-700 font-medium"
            >
              CREATE ACCOUNT
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
